# English with Xurshid

A minimalistic English learning website for students.

## Sections
- 📝 **Tasks** — Controlled exercises and writing tasks
- ℹ️ **Information** — Reading materials and class notes
- 📋 **Tests** — Quizzes and downloadable test files

## How to Add New Content

To add new material to any section, edit the corresponding file in the `data/` folder:

- `data/tasks.json` — for new tasks
- `data/information.json` — for new information items
- `data/tests.json` — for new tests

### Example: Adding a new task
```json
{
  "id": 2,
  "title": "Task 2: Describing Your Room",
  "description": "Write 8 sentences describing your room using adjectives.",
  "type": "text",
  "file": null,
  "link": null,
  "image": null
}
```

- To add a **PDF**: upload it to `public/files/` and set `"file": "/files/yourfile.pdf"`
- To add an **image**: upload it to `public/images/` and set `"image": "/images/yourimage.jpg"`
- To add a **link**: set `"link": "https://example.com"`

## Deployment
This site is deployed on [Vercel](https://vercel.com). Every push to `main` auto-deploys.
