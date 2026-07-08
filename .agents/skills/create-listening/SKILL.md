---
name: create-listening
description: Create a new audio-visual listening log entry in content/listenings from a YouTube URL. Automatically fetches metadata, collaborates on a personalized writeup, and writes the markdown file.
---

# Create Listening Log Entry (`create-listening`)

Use this skill when the user wants to add a new audio-visual listening log entry to `content/listenings/`, typically by pasting a YouTube URL or providing a track/artist name.

## 1. Extract YouTube ID & Fetch Metadata

1. **Extract `youtubeId`**:
   - Parse the 11-character video ID from any YouTube URL format:
     - `https://www.youtube.com/watch?v=Ykfhn1gAzzc` -> `Ykfhn1gAzzc`
     - `https://youtu.be/Ykfhn1gAzzc` -> `Ykfhn1gAzzc`

2. **Fetch Video Metadata via oEmbed**:
   - Run a quick `curl -s` query against YouTube's free public oEmbed API:
     ```bash
     curl -s "https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=<VIDEO_ID>&format=json"
     ```
   - Extract `title` (video title) and `author_name` (channel/artist name).

3. **Prepare Proposed Frontmatter**:
   - `title`: Cleaned-up track or performance title (e.g., `"Julian Lage - Omission"`).
   - `subtitle`: Primary artist or performer (e.g., `"Julian Lage"`).
   - `description`: 1-2 sentence concise overview of the performance or song.
   - `type`: Must be strictly one of:
     - `"song"`
     - `"live performance"`
     - `"interview"`
   - `youtubeId`: The 11-character YouTube video ID.
   - `tags`: Array of 3-5 relevant genre, instrument, or vibe tags (e.g., `["Acoustic", "Instrumental", "Solo Guitar"]`).
   - **Important**: Do NOT include a `date` field in frontmatter.

---

## 2. Collaborate on the Writeup

Before creating the file, present the extracted metadata to the user and ask for their input on the writeup:

1. **Present Proposed Metadata**:
   - Show a clear summary of the proposed frontmatter values (`title`, `subtitle`, `type`, `tags`, `description`).

2. **Solicit Personal Notes**:
   - Ask the user if they have specific thoughts, favorite moments/timestamps, or personal impressions they'd like included in the logbook entry.
   - If the user already provided notes in their prompt, immediately draft the writeup combining their notes with an engaging, warm naturalist observation style.

---

## 3. Format & Write Markdown File

1. **Determine Slug Filename**:
   - Use lowercase kebab-case format based on artist and track name:
     - `content/listenings/<artist>-<track-title>.md`
     - Example: `content/listenings/julian-lage-omission.md`

2. **File Structure Template**:
   ```markdown
   ---
   title: "Artist Name - Song Title"
   subtitle: "Artist Name"
   description: "A concise 1-2 sentence description."
   type: "live performance"
   youtubeId: "VIDEO_ID"
   tags: ["Tag1", "Tag2", "Tag3"]
   ---

   Personalized writeup body reflecting the user's thoughts and observation notes...
   ```

3. **Create File**:
   - Use `write_to_file` to save the entry to `/usr/local/google/home/maluka/lukapuka-dev/content/listenings/<slug>.md`.
   - Inform the user that the file is created and remind them that committing and pushing to `main` will publish it automatically via GitHub Pages deployment.
