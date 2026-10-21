# Jia Web Application Extraction & Replica

This repository contains the extracted production frontend bundle and complete reverse-engineered architecture of the **Jia Partner Web Portal** (`https://app.jia-technologies.com`), analyzed using **REA (Reverse Engineer Anything)**.

## Quick Start

Run the extracted application locally:

```bash
npm start
```

Then open [http://localhost:3030/map](http://localhost:3030/map) in your browser.

## Extracted Structure

- `public/`:
  - `index.html`: Application entrypoint with canvas buffer preservation and font shims.
  - `static/js/main.07a82f92.js`: Core 7.74 MB React, MUI, and Mapbox GL production bundle.
  - `static/css/main.e699ab20.css`: Complete portal theme stylesheets.
- `server.mjs`: Lightweight Node.js server with SPA client-side routing fallback.
- `analysis_summary.json`: Machine-readable extraction of all 40 client routes, 70+ API endpoints, Mapbox credentials, and Firebase database URLs.
- `REVERSE_ENGINEERING_DOSSIER.md`: Complete architectural dossier covering Mapbox layers, Urban CRM graph, 311 municipal sync, and data schemas.

## Tech Stack (Recovered)
- **Frontend**: React 18, React Router v6, Material-UI (MUI X Pro), Redux Toolkit.
- **Geospatial Engine**: Mapbox GL JS with custom district vector styles and drawing tools.
- **Backend Infrastructure**: Firebase Realtime DB & Auth (`https://jia-technologies.firebaseio.com`).
- **Billing**: Stripe Elements & Customer Portal.
