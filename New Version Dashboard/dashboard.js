// ============ SHARED DASHBOARD UTILITIES ============

// Theme Toggle
(function() {
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const sunIcon = document.getElementById('sunIcon');
    const moonIcon = document.getElementById('moonIcon');

    function setTheme(isDark) {
      document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
      document.body.classList.toggle('dark', isDark);
      document.body.classList.toggle('light', !isDark);
      if (sunIcon) sunIcon.classList.toggle('hidden', isDark);
      if (moonIcon) moonIcon.classList.toggle('hidden', !isDark);
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme === 'dark');

    themeToggle.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') !== 'dark';
      setTheme(isDark);
      if (typeof updateChartsTheme === 'function') updateChartsTheme();
    });
  }
})();

// Toast Notification System
function showToast(message, type) {
  type = type || 'success';
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  const bgColor = type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#d4a853';
  const icon = type === 'success' ? 'check' : type === 'error' ? 'close' : 'warning';

  toast.className = 'toast show';
  toast.style.cssText = `background: ${bgColor}; color: white; padding: 12px 20px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 10px; margin-bottom: 8px; animation: slideIn 0.3s ease;`;
  toast.innerHTML = `
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style="width:20px;height:20px;flex-shrink:0;">
      ${icon === 'check'
        ? '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>'
        : '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>'}
    </svg>
    <span style="font-weight:500;">${message}</span>
  `;
  container.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// Number Formatting
function formatNumber(num) {
  if (num >= 10000000) return (num / 10000000).toFixed(2) + ' Cr';
  if (num >= 100000) return (num / 100000).toFixed(2) + ' L';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return (num || 0).toLocaleString();
}

function parseNumber(val) {
  if (val === null || val === undefined || val === '' || val === '-') return 0;
  if (typeof val === 'number') return val;
  return parseFloat(String(val).replace(/[^0-9.-]/g, '')) || 0;
}

function parseDate(val) {
  if (!val) return null;
  if (typeof val === "number") {
    const d = new Date(Math.round((val - 25569) * 86400 * 1000));
    return new Date(d.getFullYear(), d.getDate() - 1, d.getMonth() + 1);
  }
  const str = String(val).trim();
  if (/^\d{4,5}$/.test(str)) {
    const num = parseInt(str, 10);
    if (num > 10000) {
      const d = new Date(Math.round((num - 25569) * 86400 * 1000));
      return new Date(d.getFullYear(), d.getDate() - 1, d.getMonth() + 1);
    }
  }
  const parts = str.split(/[-/]/);
  if (parts.length === 3) {
    let day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    let year = parseInt(parts[2], 10);
    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      if (day > 31) { const tmp = day; day = year; year = tmp; }
      if (year < 100) year += 2000;
      return new Date(year, month, day);
    }
  }
  const parsed = new Date(str);
  return isNaN(parsed) ? null : parsed;
}

function normalizeStatus(val) {
  if (!val) return 'Unknown';
  const s = String(val).toUpperCase().trim();
  if (s === 'ACTIVE' || s === 'A' || s === '1' || s === 'Y') return 'Active';
  if (s === 'INACTIVE' || s === 'I' || s === '0' || s === 'N') return 'Inactive';
  if (s.includes('ACTIVE') && !s.includes('IN')) return 'Active';
  if (s.includes('INACTIVE') || s.includes('CLOSED') || s.includes('DROP')) return 'Inactive';
  return 'Unknown';
}

function normalizeGender(val) {
  if (!val) return 'Not Specified';
  const s = String(val).toUpperCase().trim();
  if (s === 'FEMALE' || s === 'F') return 'Female';
  if (s === 'MALE' || s === 'M') return 'Male';
  if (s === 'TRANSGENDER' || s === 'T' || s === 'OTHER') return 'Other';
  return 'Not Specified';
}

// Export Utilities
function exportTableCSV(tableId, filename) {
  const table = document.getElementById(tableId);
  if (!table) { showToast('Table not found', 'error'); return; }

  let csv = '';
  table.querySelectorAll('thead th').forEach(th => {
    csv += '"' + th.textContent.trim().replace(/↕/g, '').trim() + '",';
  });
  csv = csv.slice(0, -1) + '\n';

  table.querySelectorAll('tbody tr').forEach(tr => {
    tr.querySelectorAll('td').forEach(td => {
      csv += '"' + td.textContent.trim() + '",';
    });
    csv = csv.slice(0, -1) + '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename + '.csv';
  link.click();
  showToast('CSV exported successfully');
}

function exportTablePDF(tableId, title) {
  if (typeof jspdf === 'undefined' || typeof window.jspdf === 'undefined') {
    showToast('PDF library not loaded', 'error');
    return;
  }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const table = document.getElementById(tableId);
  if (!table) { showToast('Table not found', 'error'); return; }

  const headers = [];
  table.querySelectorAll('thead th').forEach(th => {
    headers.push(th.textContent.trim().replace(/↕/g, '').trim());
  });

  const rows = [];
  table.querySelectorAll('tbody tr').forEach(tr => {
    const row = [];
    tr.querySelectorAll('td').forEach(td => row.push(td.textContent.trim()));
    rows.push(row);
  });

  doc.setFontSize(14);
  doc.text(title, 14, 20);
  doc.autoTable({ head: [headers], body: rows, startY: 30, theme: 'grid' });
  doc.save(title.replace(/\s+/g, '_') + '.pdf');
  showToast('PDF exported successfully');
}

function exportChartCSV(chartId, filename) {
  const canvas = document.getElementById(chartId);
  if (!canvas) { showToast('Chart not found', 'error'); return; }

  const chart = Chart.getChart(chartId);
  if (!chart) { showToast('Chart not found', 'error'); return; }

  const labels = chart.data.labels;
  const datasets = chart.data.datasets;
  if (!labels || !datasets) { showToast('No chart data', 'error'); return; }

  let csv = 'Label';
  datasets.forEach(ds => { csv += ',"' + (ds.label || 'Series') + '"'; });
  csv += '\n';
  labels.forEach((label, i) => {
    csv += '"' + label + '"';
    datasets.forEach(ds => { csv += ',' + (ds.data[i] || 0); });
    csv += '\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename + '.csv';
  link.click();
  showToast('CSV exported successfully');
}

// Tab Navigation
function initTabNavigation(tabsContainerSelector, contentPrefix) {
  const container = document.querySelector(tabsContainerSelector);
  if (!container) return;

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-tab]');
    if (!btn) return;

    container.querySelectorAll('[data-tab]').forEach(b => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    document.querySelectorAll('[id$="Tab"], [id$="Section"]').forEach(s => {
      const tabId = btn.dataset.tab;
      if (s.id === tabId + 'Tab' || s.id === tabId + 'Section') {
        s.classList.remove('hidden');
      } else if (s.id.endsWith('Tab') || s.id.endsWith('Section')) {
        s.classList.add('hidden');
      }
    });
  });
}

// Drag-and-Drop File Upload
function setupDragDrop(uploadEl, fileInputEl, callback) {
  if (!uploadEl) return;

  uploadEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadEl.classList.add('drag-over');
  });

  uploadEl.addEventListener('dragleave', () => {
    uploadEl.classList.remove('drag-over');
  });

  uploadEl.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadEl.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0 && fileInputEl) {
      fileInputEl.files = files;
      if (typeof callback === 'function') callback(files[0]);
    }
  });
}

// Legacy toast for backwards compatibility (used in index.html inline)
function legacyShowToast(message, isError) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  const toastMessage = document.getElementById('toastMessage');
  const toastIcon = toast.querySelector('.toast-icon');
  if (toastMessage) toastMessage.textContent = message;
  if (toastIcon) toastIcon.textContent = isError ? '❌' : '✅';
  toast.classList.toggle('error', !!isError);
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Exports for global use
window.showToast = showToast;
window.formatNumber = formatNumber;
window.parseNumber = parseNumber;
window.parseDate = parseDate;
window.normalizeStatus = normalizeStatus;
window.normalizeGender = normalizeGender;
window.exportTableCSV = exportTableCSV;
window.exportTablePDF = exportTablePDF;
window.exportChartCSV = exportChartCSV;
window.initTabNavigation = initTabNavigation;
window.setupDragDrop = setupDragDrop;
