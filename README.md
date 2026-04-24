# Kanban Antigravity

Modern Kanban project management MVP built with Next.js, TypeScript, and a premium drag-and-drop interface.

This project is part of a practical experimentation workflow focused on testing different AI models, comparing generation quality, and improving project structure from an initial forked version.

The objective is not only to build the final product, but also to optimize how different models interpret instructions, structure code, handle UI/UX consistency, and maintain production-ready logic.

This repository represents an iteration based on the original project, with improvements in:

- prompt engineering quality
- generation consistency
- drag-and-drop reliability
- editable UI architecture
- component structure
- code cleanliness
- visual polish
- execution stability

## Project Goal

Build a clean, professional Kanban board application with:

- single board architecture
- fixed 5-column layout
- editable project title and description
- editable column titles
- editable card titles and details
- stable drag-and-drop between columns
- add and delete card actions
- premium UI/UX with strong readability
- no unnecessary features

The goal is simplicity executed properly.

## Learning Purpose

This repository is also used for:

- comparing AI model output quality
- testing instruction precision in `agents.md`
- improving generation reliability from one model to another
- understanding where structure breaks during autonomous code generation
- refining workflows for future larger projects

This allows progressive optimization of both the product and the development process itself.

## Model Used

Primary generation and optimization performed with:

**Google Gemini 3.1**

Model comparison and iteration logic based on testing outputs from multiple models and improving the execution strategy from the initial fork.

## Tech Stack

Frontend:

- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui
- dnd-kit
- lucide-react

Development approach:

- client-rendered architecture
- no backend
- no persistence
- no authentication
- no unnecessary complexity

## Project Structure

```text
kanban/
├── .agent/
│   └── rules/
│       └── strategy.md
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── ...
└── README.md