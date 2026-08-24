# E-Commerce Landing Assessment

## Overview
This is a practical frontend assessment based on the following Figma design:
[E-commerce Website Template: Freebie (Community)](https://www.figma.com/design/kv3N9qFU5HEi72YF4t2tYs/E-commerce-Website-Template--Freebie---Community-?node-id=0-1&p=f&t=3FWMsx3k8SuvlIAk-0)

The goal isn't just to match the UI. This task is meant to show how you think about **component structure, code cleanliness, DRY principles, and version control**: the same things we care about when reviewing real PRs on the team.

## Scope

Build section by section, in the order below.

**For now, you're expected to complete the Nav and Hero sections.** The rest of the checklist is there so you know what's coming next: don't start on later sections until the current one is reviewed.

### Landing Page Checklist

- [ ] Navigation bar
- [ ] Hero section
- [ ] New Arrivals
- [ ] Top Selling
- [ ] Browse by Dress Style
- [ ] Our Happy Customers
- [ ] Newsletter
- [ ] Footer

Product listing, product detail, and cart pages are **not** part of this task: those may come in a later round depending on how this goes.

## Tech Requirements

- **React + TypeScript**
- **Tailwind CSS** for styling
- State management: **React's built-in state (useState/useReducer/Context)**
- Responsiveness
- No backend needed: hardcode a small products dataset (JSON file or a constants file is fine)
- Routing: React Router (or Next.js routing if you set it up as a Next app: your call)

## What We're Evaluating

- **Component structure**: are components broken down sensibly? Is there a clear separation between presentational and logic-heavy components?
- **DRY-ness**: are repeated UI patterns (product cards, buttons, price tags, etc.) extracted into reusable components instead of copy-pasted?
- **Code cleanliness**: consistent naming, no dead code, no commented-out blocks left in, sensible file/folder structure
- **Responsiveness**: the design should hold up reasonably on mobile and desktop
- **Git practices**: this matters as much as the code itself:
  - Work on a feature branch, not directly on `main`
  - Commit in logical, meaningful chunks (not one giant "final commit")
  - Write clear commit messages
  - Open a PR when done, with a short description of what you built and any decisions/tradeoffs you made

## Deliverables

- Open PR(s) once done with a implementation
- This README, updated with:
  - Setup instructions (`npm install`, `npm run dev`, etc.)
  - Any assumptions you made about ambiguous parts of the design
  - Anything you'd do differently with more time

## Timeline

Aim to have this done within **3-5 working days**, alongside your existing tasks. Quality over speed: this isn't a race.

## Notes

- It's fine to ask questions if something in the Figma file is unclear or missing (e.g. hover states, empty states, error states). Use your best judgement and document the assumption rather than guessing silently.
- Don't worry about pixel-perfect matching on every spacing value: focus on getting the structure, hierarchy, and interactions right.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) **20.19+** or **22.12+** (required by Vite 8)
- npm (bundled with Node.js)

### Installation

1. Clone the repository and move into the project directory:

   ```bash
   git clone <repo-url>
   cd ecommerce-assessment
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open the URL printed in the terminal (usually `http://localhost:5173`) in your browser.

### Available Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the Vite dev server with HMR   |
| `npm run build`   | Type-check and build for production  |
| `npm run preview` | Serve the production build locally   |
| `npm run lint`    | Run Oxlint across the codebase       |

### Tech Stack

- **Vite** — build tool and dev server
- **React 19 + TypeScript**
- **Tailwind CSS v4** — configured via `@import "tailwindcss"` in `src/index.css`
- **React Router** — client-side routing (see `src/main.tsx`)
