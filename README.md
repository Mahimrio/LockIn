# LockIn — The Daily Standard

A semester routine tracker for AUST CSE students. Built as a static React site.

## Features

- **University schedule view** — full A1 group class schedule with Pattern A / B alternating weeks, theory vs. lab distinction, room numbers, and teacher names
- **98-day (14-week) semester tracker** — visual progress grid with circular day-completion rings, week-by-week breakdown, and 4-pillars discipline framework
- **Local progress persistence** — checkbox state survives page reloads via `localStorage`
- **Responsive dark theme** — mobile-first, dark UI with purple / green / amber accents

## Tech Stack

- [Vite](https://vite.dev/) + React 18
- [Tailwind CSS](https://tailwindcss.com/) v3
- Static site — deploys to GitHub Pages with SPA routing support

## Getting Started

```bash
npm install
npm run dev
```

Vite will print a local URL (default `http://localhost:5173/`).

### Build

```bash
npm run build
```

Outputs static files to `dist/`.

### Preview production build

```bash
npm run preview
```

## Deployment

This project is configured for **GitHub Pages** under the `/LockIn/` base path.

1. Push to the `main` branch of `Mahimrio/LockIn`
2. In repo settings → Pages → Source: **GitHub Actions**
3. The build will publish from `dist/`

The included `public/404.html` and the redirect snippet in `index.html` handle SPA client-side routing on Pages.

## Project Structure

```
lockin/
├── public/
│   ├── 404.html          # SPA routing fallback
│   └── favicon.ico
├── src/
│   ├── App.jsx           # All component logic & data
│   ├── index.css         # Tailwind directives + base styles
│   └── main.jsx          # React entry point
├── index.html            # HTML entry + redirect script
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## The 4 Pillars

- **Prayer** — 5 daily prayers are your anchor. Never skip them.
- **Fitness & Health** — Move your body daily. Eat clean. Sleep 8 hours.
- **Study & Career** — CP + Web Dev + University subjects. Every single day.
- **Mental Discipline** — Journal, plan, reflect. Win the morning, win the day.

---

*Discipline is the bridge between goals and greatness.*
