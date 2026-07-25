# Long Term Memory

**Last Updated:** 2026-06-09
**Project:** SHG Dashboard

---

## User Preferences

- Tamil Nadu SHG data dashboard
- Excel/CSV file upload
- Dark theme, premium UI
- Single-file HTML + JS + CSS
- Mobile-first, bilingual (Tamil/English)

---

## Known Decisions

| Decision | Date | Reasoning | Impact |
|----------|------|-----------|--------|
| Agent v2 Setup | 2026-06-09 | Adopted 10-stage pipeline with 7 specialized agents | Structured dev workflow |

---

## Project Patterns

- Vanilla JS (no frameworks)
- ExcelJS library for XLSX parsing
- Chart.js for data visualization
- CSS custom properties for theming
- Total rows with gold-accent styling

---

## Common Issues & Solutions

- Excel serial dates need day-month swap logic
- CSV files parsed via readAsText with sheet range: 0
- FY filter scoped to FY Formation section only

---

## Session Summaries

### Session 1 (2026-06-09)
- Agent v2 framework initialized
- 10-stage pipeline configured
- 7 specialized agents set up with free models
- Project-level config in D:\Projects\SHG Dasboard
