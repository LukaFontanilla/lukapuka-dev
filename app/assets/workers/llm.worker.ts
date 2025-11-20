const MODEL_URL =
  'https://storage.googleapis.com/jmstore/kaggleweb/grader/g-2b-it-gpu-int4.bin';

  const MEDIAPIPE_WASM =
  'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai/wasm';

const MESSAGE_CODE = {
  PREPARING_MODEL: 'preparing-model',
  MODEL_READY: 'model-ready',
  GENERATING_RESPONSE: 'generating-response',
  RESPONSE_READY: 'response-ready',
  MODEL_ERROR: 'model-error',
  INFERENCE_ERROR: 'inference-error',
};

const MODEL_STATUS = {
  NOT_STARTED: 'not-started',
  PREPARING: 'preparing',
  READY: 'ready',
  GENERATING: 'generating-response',
  ERROR: 'error',
};

import { FilesetResolver, LlmInference } from '@mediapipe/tasks-genai';

let llmInference = null;

function generatePrompt(userInput) {
  return `You will be provided with a product review written by a user. Your task is to analyze the review and determine if other potential buyers will find it helpful. 
A helpful review should fulfill two main criteria:
1. Provides details about the product itself. This means mentioning specific aspects or qualities of the product, like its fit, comfort, material, durability, etc.
2. Explains the user\'s opinion. This means the user gives reasons for why they like or dislike the product, or for pricing issues they explain why the price seems fair or not.
If the review meets both of these criteria, mark it as "Helpful: Yes." Otherwise, mark it as "Helpful: No". If the review is not helpful, suggest to the user a fix for how to improve their review, and give an example review that is more helpful and applies your suggested fix. Your example review should focus solely on making the review more informative, detailed and useful to others. It should focus on the review itself, not suggest any changes to the product. If the review is helpful, leave the "Fix" and "Example" sections blank.
Adhere strictly to the following output format (absolutely do NOT change the structure):
Helpful: [Yes/No]
Fix: [Your suggestion on how to improve the review text]
Example: [An example review that is more helpful and applies your suggested fix, or leave blank]

I'll give you example reviews and outputs, and then give you one review to analyze. Let's go:


Examples:

Review: "These socks are not as warm as I expected."
Helpful: Yes
Fix:
Example:

Review: "I love these."
Helpful: No
Fix: Be more specific, explain why you like the socks.
Example: "I love the blend of wool in these socks. Warm and not too heavy."

Review: "Too expensive."
Helpful: No
Fix: Provide more context.
Example: "The price is higher than similar products I've tried in the past, with no difference in quality."

Review: "Perfect fit, no blisters."
Helpful: Yes
Fix:
Example:


Review to analyze:

Review: "${userInput}"         
`;
}

function isLlmResponseUseful(response) {
  const { isHelpful, fix, example } = response;
  if (isHelpful === null || fix === null || example === null) {
    // Llm response isn't formatted correctly
    return false;
  }
  // helpful: false, fix: '', example: ''
  // helpful: false, fix: '', example: 'bla'
  // helpful: false, fix: 'bla', example: ''
  if (
    !isHelpful &&
    (fix.toLowerCase() === '' || example.toLowerCase() === '')
  ) {
    // LLM doesn't have any suggestion despite marking the review as not helpful
    return false;
  }
  return true;
}

function generateReviewHelperOutput(response) {
  const parsedResponse = parseLlmResponse(response);
  if (!isLlmResponseUseful(parsedResponse)) {
    console.info('Llm response is not useful');
    return null;
  }
  const { isHelpful, fix, example } = parsedResponse;
  const output = isHelpful
    ? '👍 Your review is helpful!'
    : `💡 Tip: ${fix} For example, ${example}`;

  console.log('parsedResponse', parsedResponse);
  console.log('RESPONSE', response);

  return `${output}`;
}

function parseLlmResponse(response) {
  const result = {
    isHelpful: null,
    fix: null,
    example: null,
  };
  const helpfulStringIndex = response.indexOf('Helpful:');
  const fixStringIndex = response.indexOf('Fix:');
  if (helpfulStringIndex === -1 || fixStringIndex === -1) {
    return result;
  }
  const startIndex = response.indexOf('Helpful:') + 'Helpful:'.length;
  const endIndex = response.indexOf('Fix:', startIndex);
  const isHelpfulString = response.substring(startIndex, endIndex).trim();
  console.log('isHelpfulString', isHelpfulString);
  if (isHelpfulString.toLowerCase() === 'yes') {
    result.isHelpful = true;
  } else if (isHelpfulString.toLowerCase() === 'no') {
    result.isHelpful = false;
  }

  const startIndexExample = response.indexOf('Example:') + 'Example:'.length;

  const fixString = response
    .substring(endIndex + 'Fix:'.length, startIndexExample - 'Example:'.length)
    .trim();
  result.fix = fixString;

  const exampleString = response.substring(startIndexExample).trim();
  result.example = exampleString;

  return result;
}

// Trigger model preparation *before* the first message arrives
(async function () {
  console.info('[Worker] Preparing model...');
  self.postMessage({ code: MESSAGE_CODE.PREPARING_MODEL, payload: null });
  try {
    const genai = await FilesetResolver.forGenAiTasks(MEDIAPIPE_WASM);
    const response = await fetch(genai.wasmLoaderPath);
    // This sets globalThis.ModuleFactory
    eval?.(await response.text());
    delete genai.wasmLoaderPath;
    llmInference = await LlmInference.createFromOptions(genai, {
        baseOptions: {
            modelAssetPath: '../gemma-3n-E4B-it-int4-Web.litertlm'
        },
        maxTokens: 1000,
        topK: 40,
        temperature: 0.4,
        randomSeed: 101
    });
    self.postMessage({ code: MESSAGE_CODE.MODEL_READY, payload: null });
  } catch (error) {
    console.error('[Worker] Error preparing model:', error);
    self.postMessage({ code: MESSAGE_CODE.MODEL_ERROR, payload: null });
  }
})();

// Trigger inference upon receiving a message from the main script
self.onmessage = async function (message) {
  if (!llmInference) {
    // Just in case. This condition shouldn't normally be hit because the inference UI button is disabled until the model is ready
    self.postMessage({ code: MESSAGE_CODE.INFERENCE_ERROR });
    throw new Error("Can't run inference, the model is not ready yet");
  }
  console.info('[Worker] 📬 Message from main thread: ', message);
  console.info('[Worker] Generating response...');
  self.postMessage({ code: MESSAGE_CODE.GENERATING_RESPONSE, payload: null });
  // Run inference = Generate an LLM response
  let response = null;
  try {
    response = await llmInference.generateResponse(
      generatePrompt(message.data)
    );
  } catch (error) {
    console.error('[Worker] Error during inference:', error);
    self.postMessage({ code: MESSAGE_CODE.INFERENCE_ERROR, payload: null });
    return;
    // TODO Better handle errors (e.g. an inference error can happen when the input is too long). A simple try/catch isn't sufficient, we also need to terminate the previous/failing inference ("Previous invocation or loading is still ongoing.")
  }
  // Parse and process the output
  const reviewHelperOutput = generateReviewHelperOutput(response);
  console.info('[Worker] Response generated', reviewHelperOutput);
  self.postMessage({
    code: MESSAGE_CODE.RESPONSE_READY,
    payload: reviewHelperOutput,
  });
};