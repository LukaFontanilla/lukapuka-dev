---
name: create-writing
description: Create a new writing article in content/writings from a Medium article link and raw markdown/text. Automatically generates frontmatter (title, description, date, tags), formats markdown cleanly, collaborates on any refinements, and saves the article.
---

# Create Writing Article (`create-writing`)

Use this skill when the user wants to publish or add a new writing article to `content/writings/`, typically by providing a Medium article link and the markdown/text of the article.

## 1. Extract Metadata & Analyze Article

1. **Inspect Medium URL & Fetch Optional Page Context**:
   - Parse the provided Medium article URL (e.g., `https://medium.com/@username/article-slug-123` or custom domain).
   - If needed, run a quick `curl -s -L <MEDIUM_URL>` to inspect HTML `<meta>` tags (such as `og:title`, `article:published_time`, or description) to cross-reference with the provided markdown.

2. **Analyze Provided Markdown Content**:
   - Review the provided markdown/text to derive clean frontmatter fields matching existing conventions in `content/writings/`:
     - `title`: The canonical article title (clean up any decorative formatting or duplicate title headers).
     - `description`: A concise 1-2 sentence summary or subtitle that captures the article's core topic and value proposition.
     - `date`: Publication date formatted in uppercase `MMM D, YYYY` format (e.g., `"OCT 15, 2025"`, `"FEB 27, 2026"`, `"JUL 8, 2026"`). Use the article's original Medium publication date if identifiable; otherwise default to today's date.
     - `tags`: An array of 3–6 relevant technical, architectural, or domain tags (e.g., `["Looker", "BQML", "Google Cloud", "Data Analytics"]`).
     - `mediumUrl`: (Optional) Store the original Medium article URL in the frontmatter.

---

## 2. Clean & Standardize Markdown Body

1. **Heading & Structure Polish**:
   - Ensure the article starts cleanly below frontmatter without redundant `# Title` H1 headers (since `app/pages/writings/[path].vue` renders `data.title` as the `<h1>`).
   - Standardize section headers to start at `##` (H2) and subheadings at `###` (H3).
   - Ensure blank lines before and after headings, lists, tables, and code blocks.

2. **Code Blocks & Syntax Highlighting**:
   - Verify all fenced code blocks specify an accurate language identifier (`python`, `ts`, `javascript`, `bash`, `sql`, `yaml`, `json`, `diff`, etc.).

3. **Clean Up Copy-Paste Artifacts**:
   - Remove stray Medium tracking links, promotional footers, "Read more" widgets, or broken placeholder image tags.
   - Preserve all authentic code snippets, callouts, diagrams, and formatting.

---

## 3. Collaborate & Confirm with User

Before creating the file, present the extracted frontmatter and formatting overview:

1. **Present Proposed Frontmatter**:
   - Show a summary table or block with `title`, `description`, `date`, `tags`, `mediumUrl`, and the proposed filename slug.

2. **Solicit Refinements**:
   - Ask the user if they want to tweak any tags, adjust the description, or include any special callout/attribution to the original Medium article.
   - If the user explicitly asked to create/publish immediately, draft and save the file right away while presenting the generated frontmatter clearly.

---

## 4. Format & Write Markdown File

1. **Determine Slug Filename**:
   - Use lowercase kebab-case format derived from the article title:
     - `content/writings/<article-slug>.md`
     - Example: `content/writings/semantic-dashboard-recommendation-engine.md`

2. **File Structure Template**:
   ```markdown
   ---
   title: "Article Title Here"
   description: "A concise 1-2 sentence overview of the article."
   date: "JUL 8, 2026"
   tags: ["Tag1", "Tag2", "Tag3"]
   mediumUrl: "https://medium.com/@user/article-slug"
   ---

   Article markdown body starts here...
   ```

3. **Create File**:
   - Use `write_to_file` to save the article to `/usr/local/google/home/maluka/lukapuka-dev/content/writings/<slug>.md`.

4. **Verify Nuxt Content Compatibility**:
   - Nuxt Content dynamically queries `content/writings/` and parses frontmatter defined in `content.config.ts`.
   - Inform the user that the file is created and remind them that committing and pushing to `main` will publish the article automatically via GitHub Pages deployment.
