<script setup lang="ts">
import LlmWorker from '~/assets/workers/llm.worker?worker'
import { onMounted, ref } from "vue";

// No script logic is needed for just styling
const items = [0, 1, 2, 3]

const webWorker = ref()

const handleClick = () => {
    // Prepare a JSON object
    const message = {
        greeting: 'Hello',
        target: 'World',
        data: 'the packaging was really hard to open and directions unclear'
    }

    // Convert the object to a JSON string and post it to the worker
    webWorker.value.postMessage(JSON.stringify(message))
}

const { data, error, loading, metadata, fetchData } = useFetchParquetData();

onMounted(() => {
    // const worker = new LlmWorker()

    // webWorker.value = worker

    // // Optionally, handle messages from the worker
    // worker.onmessage = (event) => {
    //   console.log(event.data) // Log the message from the worker
    // }

    const cardsContainer = document.getElementById('cards');
    const scrollLeftBtn = document.getElementById('scroll-left');
    const scrollRightBtn = document.getElementById('scroll-right');
    if (cardsContainer && scrollLeftBtn && scrollRightBtn) {
        // Calculate the width of a single card to scroll by
        const card = cardsContainer.querySelector('.scrollable-cards_item');
        // The scroll amount is the card's width plus the gap
        const scrollAmount = card ? card.offsetWidth + 15 : 215;
        scrollLeftBtn.addEventListener('click', () => {
            cardsContainer.scrollLeft -= scrollAmount;
        });
        scrollRightBtn.addEventListener('click', () => {
            cardsContainer.scrollLeft += scrollAmount;
        });
    }

    fetchData({
        url: 'https://hyperparam-public.s3.amazonaws.com/wiki-en-00000-of-00041.parquet',//'https://huggingface.co/datasets/codeparrot/github-code/resolve/main/data/train-00000-of-01126.parquet', // 'https://hyperparam-public.s3.amazonaws.com/bunnies.parquet',
        //    filter: {
        //       'Average Weight': '>3', // Fetch bunnies heavier than 3
        //       'Origin Country': 'USA',   // Fetch bunnies from the USA (defaults to equality)
        //    },
        rowStart: 0,
        rowEnd: 1000
    });
});

watchEffect(() => console.log(data.value, loading.value))
</script>

<template>
    <div class="column">
        <div class="intro-card">
            <h1 @click="handleClick">lukapuka</h1>
            <h2>Creative Developer & Visual Designer</h2>
            <p>
                A little portfolio, some writing, mostly data and infographics of both real and fictional tales.
            </p>
            <Socials />
        </div>
        <div class="hr-title-container">
            <hr class="style-infographics">
            <div class="title-wrapper">
                <span class="title-lang lang-jp">情報グラフィック</span>
                <span class="title-lang lang-en">Infographics</span>
            </div>
        </div>
        <div class="scroller-wrapper">
            <div id="cards" class="scroll-test">
                <ScrollableCards />
            </div>
        </div>
        <hr class="style-other" />
        <div class="notepaper">
            <p class="reveal-text">This is some text on the notepaper. ahfkfJSOIJFVNOV SVIJNVOISVJSOVN LZAVNLK
                svkabdioganvbdobndob </p>
            <p class="reveal-text">Each line should align with the background lines.</p>
            <p class="reveal-text">Each line should align with the background lines.</p>
            <p class="reveal-text">Each line should align with the background lines.</p>
            <p class="reveal-text">This is some text on the notepaper. ahfkfJSOIJFVNOV SVIJNVOISVJSOVN LZAVNLK
                svkabdioganvbdobndob </p>
            <p class="reveal-text">Each line should align with the background lines.</p>
            <p class="reveal-text">Each line should align with the background lines.</p>
            <p class="reveal-text">Each line should align with the background lines.</p>
        </div>
        <div>
        </div>
    </div>
</template>

<style scoped>
@keyframes reveal {
    from {
        opacity: 0.05;
    }

    to {
        opacity: 1;
    }
}

.hr-title-container {
    position: relative;
    /* This is the anchor for the absolute-positioned title */
    text-align: center;
    /* This will center the title wrapper */
    margin-bottom: 15px;
    /* Spacing below the title/hr */
}

.title-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* Perfectly centers the element */
    padding: 0 0.25em;
    /* Restored your original padding for a tighter fit */
    background-color: var(--clr-bg-primary);
    /* Changed to match card background */
    cursor: default;

    /* NEW: Use Grid to stack the text and auto-size the wrapper */
    display: grid;
    place-items: center;
}

.title-lang {
    /* NEW: Both text elements occupy the same grid cell */
    grid-area: 1 / 1;

    /* REMOVED: absolute positioning and manual centering */
    transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
    white-space: nowrap;
    /* Prevents text from wrapping */
    font-size: 14px;
    color: var(--text-color);
    font-weight: normal;
}

.lang-jp {
    opacity: 0.7;
    transform: translateY(0);
}

.lang-en {
    opacity: 0;
    transform: translateY(5px);
}

.title-wrapper:hover .lang-jp {
    opacity: 0;
    transform: translateY(-5px);
}

.title-wrapper:hover .lang-en {
    opacity: 1;
    transform: translateY(0);
}

.notepaper {
    height: 20rem;
    overflow-y: scroll;
    background-image:
        linear-gradient(to bottom, transparent 24px, var(--clr-border) 25px, var(--clr-border) 26px, transparent 27px);
    /* Horizontal lines (blue) */
    background-size: 100% 27px, 25px 100%;
    /* Spacing for lines and margin */
    background-position: 0 0, 40px 0;
    /* Position of lines and margin */
    /* padding: 6px 10px; Padding for content */
    line-height: 27px;
    /* Align text with lines */
    background-attachment: local;
}

.notepaper p {
    margin: 0;
}

.notepaper::-webkit-scrollbar {
    display: none;
}

.column {
    display: flex;
}

@supports (animation-timeline: view()) {
    .reveal-text {
        /* Create View Timeline */
        view-timeline-name: --revealing-text;
        view-timeline-axis: block;

        /* Attach animation, linked to the  View Timeline */
        animation: linear reveal both;
        animation-timeline: --revealing-text;

        /* Tweak range when effect should run*/
        animation-range: entry 15% cover 30%;
    }
}

.style-infographics,
.style-other {
    width: 100%;
    overflow: visible;
    /* For IE */
    padding: 0;
    border: none;
    border-top: medium double var(--clr-border);
    color: #333;
    text-align: center;
}

.style-infographics:after,
.style-other:after {
    height: 100%;
    color: var(--clr-text-primary);
    /* content: "情報グラフィック"; */
    display: inline-block;
    position: relative;
    border-radius: 50%;
    top: -0.8em;
    font-size: 1em;
    background-color: var(--clr-bg-primary);
    padding: 0 0.25em;
}

.style-other:after {
    content: "他の情報";
}

@keyframes slide-fade-in {
    from {
        opacity: 0;
        box-shadow: none;
        transform: scale(.8) translateY(15vh);
    }
}


.scroller-wrapper {
    position: relative;
}

.scroll-test {
    overflow-y: scroll;
    width: 100%;
    height: 15rem;
    scrollbar-width: 0;
    scrollbar-color: transparent;
}

.scroll-test::-webkit-scrollbar {
    display: none;
}
</style>