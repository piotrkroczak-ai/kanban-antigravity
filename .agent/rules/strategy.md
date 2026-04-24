---
trigger: always_on
---

# Kanban Project

## Business Requirements

- MVP of a Kanban-style project management web app
- Single board only
- Fixed 5 columns with editable column titles
- Editable project title
- Editable project description
- Each card contains:
  - editable title
  - editable details
- Full drag-and-drop between all columns
- Add new card to any column
- Delete existing cards
- No archive
- No search
- No filters
- No extra workflow features
- Preloaded realistic dummy data on launch
- Premium UI/UX: clean, modern, professional, visually polished
- Bottom-right footer required:
  - `Built with [Model Name + Version]`

## Technical Details

- Modern Next.js app
- Client-rendered
- Project created inside `frontend`
- No backend
- No database
- No persistence
- No authentication
- No user management
- Use stable popular libraries only
- Keep architecture minimal and maintainable

Recommended stack:
- Next.js
- TypeScript
- TailwindCSS
- shadcn/ui
- dnd-kit
- lucide-react

## UI Requirements

Editable directly from UI:
- project title
- project description
- all column titles
- all card titles
- all card details

Editing must be:
- inline first
- instant update
- smooth and native
- no clunky modal dependency

## Drag and Drop

Must be fully stable:
- move within same column
- move across columns
- preserve ordering
- no duplication
- no disappearing cards
- no state desync
- smooth animations
- clear drag feedback

This is a core requirement.

## Color Scheme

Use a softer premium palette with strong readability.

- Warm Gold: `#D4A373`
- Slate Blue: `#3A5A78`
- Muted Indigo: `#5C5470`
- Deep Graphite: `#1F2937`
- Soft Gray: `#6B7280`
- Light Background: `#F8FAFC`
- Card White: `#FFFFFF`

Avoid:
- oversaturated colors
- harsh contrast
- generic startup-template look

## Strategy

1. Write implementation plan with success criteria for each phase:
   scaffolding, folder structure, .gitignore, components, DnD architecture, testing

2. Build MVP strictly to requirements

3. Run integration testing with Playwright or similar and fix defects

4. Only complete when:
   - MVP is fully working
   - drag-and-drop is stable
   - editable fields work correctly
   - UI is polished
   - local server runs and is ready for review

## Coding Standards

1. Use latest stable libraries and current best practices

2. Keep it simple:
   never over-engineer, always simplify, no unnecessary abstractions

3. Strict scope control:
   no extra features, no speculative additions

4. Be concise:
   clean code, minimal README, clear naming, maintainable structure

