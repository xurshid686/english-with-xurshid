# English with Xurshid

A minimalistic English learning website for students.

## Features

- **Student Login** - Each student has their own username and password
- **Progress Tracking** - Students can mark tasks, information, and tests as complete
- **Dashboard** - Each student sees their own progress statistics
- **Three Sections**:
  - **Tasks** - Controlled exercises and writing tasks
  - **Information** - Reading materials and class notes
  - **Tests** - Quizzes and downloadable test files

## How to Add New Students

Edit `data/students.json` and add a new student entry:

```json
{
  "username": "student2",
  "password": "password123",
  "fullName": "Student Name",
  "progress": {
    "tasks": [],
    "tests": [],
    "lastLogin": null
  }
}
```

## How to Add New Content

Edit the corresponding file in the `data/` folder:

- `data/tasks.json` - for new tasks
- `data/information.json` - for new information items
- `data/tests.json` - for new tests

Each item should have: `id`, `title`, `description`, and optionally `image`, `file`, or `link`.

## Deployment

This site is deployed on Vercel. Every push to the `main` branch automatically triggers a redeployment.
