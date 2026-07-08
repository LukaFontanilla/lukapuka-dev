---
title: Gemini Computer Use & Playwright
description: Playwright Browser Tools for LLM use
date: "FEB 27, 2026"
tags: ["ADK", "Google", "Agents", "Python", "Computer Use"]
mediumUrl: "https://lukafontanilla.medium.com/gemini-computer-use-playwright-dc1c41418dbe"
---

<TransitionHeader transition="heading-writing-jaja">First Page</TransitionHeader>

Wrote this document to outline the use of Playwright (_browser testing library_) with the Gemini Computer Use model. Specifically explaining the structure and behavior of the Playwright tool calls enacted by the Computer Use Agent (_gemini-2.5-computer-use-preview-10–2025_).

I’m following the sample demo the ADK team has provided here -> [https://github.com/google/adk-python/tree/main/contributing/samples/computer_use](https://github.com/google/adk-python/tree/main/contributing/samples/computer_use)

## **Agent Interaction Loop**

When the agent operates the browser to complete a user task, it follows a standard Observation-Thought-Action loop:

1.  **LLM _generateContent_ Call**: The agent sends the current state to the LLM. The LLM processes the prompt, its own internal thoughts, and previous tool outputs, reasoning about the next logical computer action.

2.  **Tool Invocation**: The LLM issues a function call matching one of the Playwright tools (e.g., _click_at_, _type_text_at_).

3.  **Playwright Execution**: The _PlaywrightComputer_ underlying the _ComputerUseToolset_ performs the action natively via Playwright APIs (mouse clicks, keyboard sequences, JavaScript execution).

4.  **Tool Response**: After the action finishes and the page’s load state is settled, the tool grabs the overall context by calling _current_state()_. This returns a _ComputerState_ object to the LLM containing:

- _screenshot_: A Base64-encoded PNG representation of the screen’s updated viewport.
- _url_: The browser’s active URL string.

The agent uses this _screenshot_ and _url_ to verify whether its action succeeded before proposing the next step.

## **Playwright Tool Operations**

In this demo, the _PlaywrightComputer_ class exposes a variety of methods for navigating and manipulating the DOM. Virtually all actions automatically return the newest _ComputerState_.

### **Navigation Tools**

- **_open_web_browser()_**: Initializes or resets the environment, returning the base computer state.
- **_navigate(url: str)_**: Commands Playwright’s _page.goto(url)_ to open a specific webpage.
- **_search()_**: Navigates to the session-configured default search engine.
- **_go_back()_ / _go_forward()_**: Triggers browser history traversal.

### **Interaction Tools**

- **_click_at(x: int, y: int)_**: Places a visual highlight at the target coordinates, fires _page.mouse.click(x, y)_, and awaits document load.
- **_hover_at(x: int, y: int)_**: Triggers _page.mouse.move(x, y)_ to activate CSS hover states or Javascript tooltips.
- **_type_text_at(x: int, y: int, text: str)_**: Combines clicking the target input, optionally clearing the input via _Control+A_ + _Delete_, and using _page.keyboard.type(text)_ to submit strings. Pressing Enter at the end can be toggled via arguments.
- **_key_combination(keys: list[str])_**: Presses a combination of raw inputs mapped directly to canonical Playwright keys (e.g., _[‘Shift’, ‘Tab’]_ or _[‘Control’, ‘C’]_).
- **_drag_and_drop(x: int, y: int, destination_x: int, destination_y: int)_**: Mouses to the origin, fires _mouse.down()_, moves to the destination, and fires _mouse.up()_.

### **Scrolling Tools**

- **_scroll_document(direction)_**: Broadest scroll implementation, mimicking _PageUp_/_PageDown_ keyboard patterns for vertical scrolls, or executing internal JavaScript _window.scrollBy_ for horizontal shifts.
- **_scroll_at(x: int, y: int, direction, magnitude: int)_**: Mouses to a precise coordinate and fires _mouse.wheel(dx, dy)_ to manage targeted scroll containers (like a modal or sidebar).

### **Verification**

- **_wait(seconds: int)_**: Triggers an _asyncio.sleep_ to handle dynamically rendering/AJAX-heavy sites, returning the updated state afterwards.
- **_current_state()_**: At any time, takes a _png_ representation of the page, grabbing both the screenshot chunk and the URL.
