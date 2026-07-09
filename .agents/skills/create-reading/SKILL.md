---
name: create-reading
description: Create a new reading log entry in content/readings from a Wikipedia book URL. Automatically fetches metadata and book summary, collaborates on a personalized writeup, and writes the markdown file.
---

# Create Reading Log Entry (`create-reading`)

Use this skill when the user wants to add a new reading log entry to `content/readings/`, typically by inputting a Wikipedia URL to a book or providing a book title.

## 1. Extract Wikipedia Page Title & Fetch Metadata

1. **Extract Wikipedia Page Title / Slug**:
   - Parse the page title from any Wikipedia URL format:
     - `https://en.wikipedia.org/wiki/Strange_Pictures` -> `Strange_Pictures`
     - `https://en.m.wikipedia.org/wiki/Strange_Pictures` -> `Strange_Pictures`

2. **Fetch Book Metadata, Summary & Cover Image via Wikipedia REST API**:
   - Run a quick `curl -s` query against Wikipedia's free public REST API:
     ```bash
     curl -s -L -A "LukapukaBot/1.0" "https://en.wikipedia.org/api/rest_v1/page/summary/<PAGE_TITLE>"
     ```
   - Parse the returned JSON response to extract:
     - `title`: The canonical or display title of the book.
     - `description`: The short Wikidata description (e.g., `"2022 novel by Uketsu"`).
     - `extract`: The full introductory text summary of the book.
     - `image`: The high-resolution book cover image URL from `originalimage.source` (or fallback to `thumbnail.source`).

3. **Fetch Book Publication Date from Wikipedia Infobox**:
   - Run a query against Wikipedia's Parse API to inspect the page wikitext infobox for publication dates:
     ```bash
     curl -s -L -A "LukapukaBot/1.0" "https://en.wikipedia.org/w/api.php?action=parse&page=<PAGE_TITLE>&prop=wikitext&format=json"
     ```
   - Extract `pub_date` or `release_date` from the `{{Infobox book ...}}` template (e.g., `October 20, 2022`) and convert it to standard `YYYY-MM-DD` format (e.g., `2022-10-20`).

4. **Prepare Proposed Frontmatter & Content**:
   - `title`: Cleaned book title (e.g., `"Strange Pictures"`).
   - `subtitle`: Book author extracted from description or introductory extract (e.g., `"Uketsu"`).
   - `date`: Book publication date fetched from Wikipedia formatted as `YYYY-MM-DD` (e.g., `"2022-10-20"`).
   - `description`: 1-2 sentence concise overview or tagline of the book.
   - `tags`: Array of 2-4 relevant genre, format, or thematic tags (e.g., `["fiction", "mystery", "horror"]`).
   - `image`: The extracted book cover image URL (`https://upload.wikimedia.org/...`).
   - **Prefilled Book Summary**: Use the Wikipedia `extract` text (cleaned of footnote citations or HTML entities) as the prefilled summary of the book.

---

## 2. Collaborate on the Writeup

Before writing the final file, present the extracted metadata, book cover image URL, and prefilled summary to the user:

1. **Present Proposed Metadata & Summary**:
   - Show a clear summary of the proposed frontmatter values (`title`, `subtitle`, `date`, `description`, `tags`) and the cover image URL.
   - Show the prefilled book summary extracted from Wikipedia.

2. **Solicit Personal Notes & Reflections**:
   - Ask the user if they have specific thoughts, favorite passages, takeaways, or personal impressions they'd like included in the reading log entry.
   - If the user already provided notes in their prompt (or asked to create the entry immediately), combine the prefilled book summary with an engaging, well-crafted personal reflections section.

---

## 3. Format & Write Markdown File

1. **Determine Slug Filename**:
   - Use lowercase kebab-case format based on the book title:
     - `content/readings/<book-slug>.md`
     - Example: `content/readings/strange-pictures.md`

2. **File Structure Template**:
   - Always place the book cover image markdown (`![Alt text](image_url)`) as the VERY FIRST line of content immediately after the closing YAML frontmatter `---`. This ensures that on small screens it is rendered by our custom `ProseImg.vue` specimen plate component at the top, and on large screens (≥900px) it automatically positions side-by-side with the reading text like an open book spread.
   ```markdown
   ---
   title: "Strange Pictures"
   subtitle: "Uketsu"
   date: "2022-10-20"
   description: "A chilling mystery novel centered around unsettling architectural floor plans and illustrations."
   tags: ["fiction", "mystery", "horror"]
   ---

   ![Strange Pictures Book Cover](https://upload.wikimedia.org/wikipedia/en/5/5e/%22Strange_Pictures%22_by_Uketsu_book_cover.webp)

   ## Book Summary

   Prefilled summary extracted from Wikipedia...

   ## Personal Reflections

   Personal writeup and notes reflecting on the themes, structure, or impact of the reading...
   ```

3. **Create File**:
   - Use `write_to_file` to save the entry to `/usr/local/google/home/maluka/lukapuka-dev/content/readings/<slug>.md`.
   - The reading log listing (`app/pages/readings.vue`) queries `content/readings/` dynamically via `@nuxt/content`, so any newly created markdown entry will automatically appear on the site.
   - Inform the user that the reading log file has been created.

