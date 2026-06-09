# Project Context

**Status:** Active
**Last Updated:** 2026-06-09

---

## What This Project Does

A single-page dashboard for Tamil Nadu SHG (Self Help Group) data analysis. Users upload Excel/CSV files containing SHG member details, and the dashboard renders interactive charts and tables showing formation trends, financial summaries, block-wise breakdowns, member compliance, livelihood classification, and geo distribution.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Language | JavaScript (Vanilla) |
| Frontend | Vanilla HTML + CSS + JS |
| Styling | Custom CSS with CSS variables |
| State | Global JS variables |
| Backend | None (client-side only) |
| Database | None (file-based input) |

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| ExcelJS | CDN | XLSX file parsing |
| Chart.js | CDN | Data visualization |

---

## File Structure

```
D:\Projects\SHG Dasboard\
├── D01 - Member Details Report - *.xlsx
├── D02 - SHG Details Report - *.xlsx
├── opencode.json
├── AGENTS.md
├── MEMORY.md
├── PROJECT_CONTEXT.md
├── DECISIONS.md
├── TASKS.md
├── CHANGELOG_AI.md
├── .opencode/
│   └── agents/
│       ├── plan.md
│       ├── researcher.md
│       ├── reviewer.md
│       ├── debugger.md
│       ├── tester.md
│       └── documenter.md
└── New Version Dashboard/
    ├── index.html
    ├── dashboard.js
    ├── styles.css
    └── Member_Dashboard.html
```

---

## Scripts

| Command | What it does |
|---------|-------------|
| N/A | No package.json — open index.html directly |

---

## Performance Targets

- LCP: < 2.5s
- FID: < 100ms
- File parse: < 5s for 10K rows
- Bundle size: ~2MB (ExcelJS + Chart.js CDN)

---

## Key APIs & Integrations

| Service | Purpose | Status |
|---------|---------|--------|
| ExcelJS CDN | Parse .xlsx/.xls/.csv files | Active |
| Chart.js CDN | Render charts | Active |

---

## Environment Variables

None — client-side only, no .env needed.
