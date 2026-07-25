# SHG Analytics Pro Dashboard

Interactive analytics dashboard for Self Help Group (SHG) data under the National Rural Livelihoods Mission (NRLM) with charts, Excel import, and PDF export.

[![HTML](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?logo=chart.js&logoColor=white)](https://www.chartjs.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## Features

- **Excel Upload & Processing** — Upload .xlsx files for automatic analysis
- **Interactive Charts** — Data visualization using Chart.js
- **PDF Report Generation** — Export reports as PDF with jsPDF + AutoTable
- **Member-Level Analytics** — Drill down into individual member data
- **Clean 3D UI** — Modern interface built with Tailwind CSS
- **Map Support** — Geographic visualization with Leaflet
- **Fully Client-Side** — No backend required, works offline after loading

## Getting Started

1. Clone or download this repository
2. Open `index.html` in your browser
3. Upload an Excel file to start analysis

## Project Structure

```
├── index.html               # Main dashboard (Hub)
├── Member_Dashboard.html    # Detailed member analytics view
├── New Version Dashboard/   # Updated dashboard version
├── LICENSE
└── README.md
```

## Technologies

- HTML5
- Tailwind CSS (CDN)
- Chart.js
- SheetJS (xlsx)
- jsPDF + AutoTable
- Leaflet (map visualization)

## Deployment

This is a fully static site and can be hosted on GitHub Pages, Netlify, or any static file server.

## License

MIT
