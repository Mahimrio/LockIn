# AGENTS.md — LockIn Project Context

> **Read this file first** before making any changes to this project. It contains the full project context, conventions, and mandatory workflow rules for AI agents and human contributors.

---

## 1. Project Overview

**Name:** LockIn — The Daily Standard
**Purpose:** A semester routine tracker for an AUST CSE student (A1 group, Pattern A/B alternating weeks).
**Type:** Static single-page website (SPA), deployed to GitHub Pages.
**Repo:** https://github.com/Mahimrio/LockIn
**Base path:** `/LockIn/` (configured in `vite.config.js` and `public/404.html`)

The app has two main views:
1. **University view** — full class schedule with theory/lab distinction, rooms, teachers, and notes
2. **Tracker view** — 98-day (14-week) progress grid with circular completion rings, stats, and the 4-pillars framework

---

## 2. Tech Stack (DO NOT change without user approval)

| Layer | Tool | Version |
|---|---|---|
| Build tool | Vite | latest |
| Framework | React | 18 |
| Styling | Tailwind CSS | **v3** (pinned — v4 has a different config flow) |
| CSS pipeline | PostCSS + Autoprefixer | latest |
| Persistence | `localStorage` (key: `routine-progress-v4`) | browser native |

> **Historical note:** The original `routine_v4.jsx` used `window.storage.get/set` (a Claude.ai artifact API). The conversion to Tailwind preserved the call sites but the storage layer should be migrated to plain `localStorage` for production use. The current `try/catch` blocks will silently swallow the error and fall back to `SEED_CHECKED`.

---

## 3. File Structure

```
lockin/
├── public/
│   ├── 404.html              # SPA routing fallback for GitHub Pages
│   └── favicon.ico           # 62-byte placeholder
├── src/
│   ├── App.jsx               # ALL component logic & data (single-file)
│   ├── index.css             # Tailwind directives + base styles
│   └── main.jsx              # React 18 createRoot entry
├── index.html                # HTML entry + sessionStorage redirect script
├── tailwind.config.js        # content paths, font family extension
├── postcss.config.js         # tailwindcss + autoprefixer
├── vite.config.js            # base: '/LockIn/', react plugin
├── .gitignore                # node_modules, dist
├── .oxlintrc.json            # default Vite scaffold
├── package.json
├── package-lock.json
└── README.md
```

---

## 4. Key Constants & Data (in `src/App.jsx`)

When modifying logic, **preserve these exactly**:

- `SEMESTER_START` — `new Date("2026-06-15")` — day 1 of the semester
- `TOTAL_DAYS` — `98` (14 weeks × 7 days)
- `SCHEDULE_LEN` — `23` (used by progress calculations)
- `SEED_CHECKED` — auto-generated object; marks days 1–14 (first 2 weeks) as fully checked
- `uniSchedule` — nested object with `week1` / `week2` patterns, indexed by day-of-week (0=Sun … 6=Sat)
- `DAY_NAMES` / `DAY_FULL` — short and long weekday names

Helper functions: `getDayInfo(dayNumber)`, `getUniClasses(dayNumber)`. Both rely on `SEMESTER_START`.

**Pattern logic:** `semesterWeek % 2 === 1` → `week1` / "A", else `week2` / "B".

---

## 5. Design Conventions

### Theme
- **Background:** `#0a0a0f` (near-black)
- **Surface:** `#0e0e18`, `#0c0c14`
- **Borders:** `#1e1e2e`, `#2a2a3a`
- **Accent colors:**
  - Purple `#7c3aed` (in-progress)
  - Green `#059669` / `#34d399` (complete)
  - Amber `#d97706` / `#fbbf24` (warnings, prayer pillar)
  - Blue `#38bdf8` (theory classes)
- **Text:** primary `#e8e4d9`, secondary `#888`, muted `#555` / `#666`

### Typography
- Body: Georgia, serif (set globally in `index.css`)
- Code/monospace: ui-monospace, Consolas, monospace
- Tailwind utility: `font-serif`, `font-mono`

### Styling rules
- **Tailwind classes only** — no inline `style={{...}}` except for dynamic values that can't be expressed as a class (e.g., SVG `strokeDasharray`, percentage widths, dynamic background colors from the data)
- Use arbitrary-value classes for one-off colors: `bg-[#0e0e18]`, `text-[#555]`, `border-[#1e1e2e]`
- For complex conditional className logic, **extract to a `const` variable** — do not nest template literals in JSX (causes parser issues with some bundlers)

### Layout
- Max content width: `680px` (centered, with `px-4` padding)
- Sticky day selector at the top of each view
- Mobile-first; use `clamp()` for the H1 size

---

## 6. The 4 Pillars (immutable content)

1. **Prayer** — 5 daily prayers are your anchor. Never skip them.
2. **Fitness & Health** — Move your body daily. Eat clean. Sleep 8 hours.
3. **Study & Career** — CP + Web Dev + University subjects. Every single day.
4. **Mental Discipline** — Journal, plan, reflect. Win the morning, win the day.

---

## 7. Development Commands

```bash
npm install          # install deps
npm run dev          # start dev server (default: http://localhost:5173/)
npm run build        # production build to dist/
npm run preview      # preview the production build locally
```

---

## 8. GitHub Pages Deployment

- **Base path:** `/LockIn/` (matches repo name casing)
- **SPA routing:** `public/404.html` + sessionStorage redirect in `index.html` work together
- **Workflow:** push to `main` → GitHub Actions builds `dist/` and publishes

---

## 9. MANDATORY WORKFLOW RULES (for all agents)

> ⚠️ These rules are non-negotiable. Violating them is grounds for immediate task termination.

### Rule 1: Update `AGENTS.md` after every work session
After completing **any** non-trivial change (feature, fix, refactor, dependency change, file restructure), update this file to reflect the new state of the project. Specifically:
- Add new files to the file structure (Section 3)
- Add new constants/data to Section 4
- Update conventions in Section 5 if design patterns change
- Add new commands to Section 7
- Document any architectural decisions in a new section if needed

### Rule 2: Always ask before pushing to GitHub
**Never** push to GitHub without explicit user confirmation. After completing work, the agent MUST ask:

> *"Do you want me to push these changes to GitHub?"*

Wait for a clear yes/no before running any `git push` command.

### Rule 3: Create a separate branch with professional naming
When the user approves a push, do **not** commit directly to `main` (unless explicitly told to). Create a feature branch using one of these prefixes:

- `feat/` — new feature (e.g., `feat/dark-mode-toggle`)
- `fix/` — bug fix (e.g., `fix/tracker-day-15-completion`)
- `refactor/` — code restructuring (e.g., `refactor/extract-class-card-component`)
- `docs/` — documentation only (e.g., `docs/update-agents-md`)
- `style/` — visual/UI changes without logic (e.g., `style/improve-mobile-spacing`)
- `chore/` — tooling, deps, config (e.g., `chore/upgrade-tailwind-v4`)
- `test/` — adding tests (e.g., `test/progress-calc-units`)

The branch name should be **kebab-case**, **descriptive**, and **scoped** to the change.

### Rule 4: Write professional commit messages
Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>

[optional body — explain the "why", not the "what"]

[optional footer — breaking changes, issue refs]
```

**Types:** `feat`, `fix`, `refactor`, `docs`, `style`, `chore`, `test`, `perf`, `build`, `ci`
**Scope (optional):** the area affected (e.g., `tracker`, `schedule`, `storage`, `deps`)
**Summary:** imperative mood, lowercase, no period, ≤72 chars

**Examples:**

```
feat(tracker): add month-grouped view to progress grid

fix(schedule): correct Thursday Pattern A room number to 7A06

docs(agents): update workflow rules for branch + commit conventions

chore(deps): pin tailwindcss to v3 for config compatibility
```

### Rule 5: End-of-task checklist
Before considering any task complete, the agent must:
1. ✅ Run `npm run build` and confirm it passes with no errors
2. ✅ Update `AGENTS.md` if any structural or convention change was made
3. ✅ Ask the user: *"Do you want me to push these changes to GitHub?"*
4. ✅ If yes: create the branch, commit with a conventional message, and push
5. ✅ Provide the user with the branch name, commit hash, and PR-ready summary

---

## 10. Change Log

| Date | Change | Author |
|---|---|---|
| 2026-07-03 | Initial Vite + React + Tailwind v3 scaffold; converted `routine_v4.jsx` to `App.jsx` with Tailwind classes; added GitHub Pages config (base path, 404.html, redirect script); pinned Tailwind to v3 | opencode |
| 2026-07-03 | Created `README.md` and `AGENTS.md` | opencode |
| 2026-07-03 | Added `.github/workflows/deploy.yml` for automated GitHub Pages deployment on push to `main` | opencode |

---

*This file is the single source of truth for project context. When in doubt, update it.*
