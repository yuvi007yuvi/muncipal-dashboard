/* ===== Utility Functions ===== */

window.Utils = (function () {

  // Format currency (INR)
  function formatCurrency(amount) {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} L`;
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`;
    return `₹${amount.toLocaleString('en-IN')}`;
  }

  // Format number with commas (Indian)
  function formatNumber(num) {
    return num.toLocaleString('en-IN');
  }

  // Get status badge HTML
  function statusBadge(statusId) {
    const s = DATA.STATUSES.find(st => st.id === statusId);
    if (!s) return `<span class="badge">${statusId}</span>`;
    const cls = `badge-${statusId.replace(/_/g, '-')}`;
    return `<span class="badge ${cls}">${s.label}</span>`;
  }

  // Progress bar HTML
  function progressBar(percent, size) {
    const colorClass = percent >= 80 ? 'green' : percent >= 40 ? 'orange' : percent > 0 ? 'red' : '';
    const h = size === 'sm' ? 'height:6px' : size === 'lg' ? 'height:12px' : '';
    return `
      <div class="progress-inline">
        <div class="progress-bar" style="${h}">
          <div class="progress-fill ${colorClass}" style="width:${percent}%"></div>
        </div>
        <span class="progress-text">${percent}%</span>
      </div>`;
  }

  // Donut chart (CSS conic-gradient)
  function donutChart(segments, centerLabel, centerValue) {
    let gradientParts = [];
    let cumulative = 0;
    segments.forEach(seg => {
      const start = cumulative;
      cumulative += seg.percent;
      gradientParts.push(`${seg.color} ${start}% ${cumulative}%`);
    });
    if (cumulative < 100) {
      gradientParts.push(`#e0e0e0 ${cumulative}% 100%`);
    }
    return `
      <div class="donut-chart" style="background: conic-gradient(${gradientParts.join(', ')})">
        <div class="donut-center">
          <span class="donut-value">${centerValue}</span>
          <span class="donut-label">${centerLabel}</span>
        </div>
      </div>`;
  }

  // Horizontal bar chart
  function hBarChart(items, maxVal) {
    const max = maxVal || Math.max(...items.map(i => i.value), 1);
    return `<div class="h-bar-chart">
      ${items.map(item => `
        <div class="h-bar-item">
          <span class="h-bar-label" title="${item.label}">${item.label}</span>
          <div class="h-bar-track">
            <div class="h-bar-fill" style="width:${(item.value / max * 100).toFixed(1)}%; background:${item.color || 'var(--primary-600)'}">
              ${item.value > max * 0.15 ? item.value : ''}
            </div>
          </div>
          <span class="h-bar-value">${item.value}</span>
        </div>
      `).join('')}
    </div>`;
  }

  // Create table HTML
  function dataTable(headers, rows, options = {}) {
    const { clickable, emptyMsg } = options;
    if (rows.length === 0) {
      return `<div class="empty-state">
        <div class="empty-icon"><i class="hgi-stroke hgi-folder-minus"></i></div>
        <h3>${emptyMsg || 'No data found'}</h3>
        <p>Try adjusting your filters</p>
      </div>`;
    }
    return `
      <div style="overflow-x:auto">
        <table class="data-table">
          <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows.join('')}</tbody>
        </table>
      </div>`;
  }

  // Photo placeholder card
  function photoCard(photo) {
    const categoryColors = { Before: 'var(--text-secondary)', Progress: 'var(--info)', Completion: 'var(--success)' };
    return `
      <div class="photo-card">
        <div class="photo-img" style="background:${categoryColors[photo.category] || '#9e9e9e'}22; color:${categoryColors[photo.category] || '#9e9e9e'}">
          ${photo.placeholder || '<i class="hgi-stroke hgi-camera-01"></i>'}
        </div>
        <div class="photo-meta">
          <strong style="color:${categoryColors[photo.category]}">${photo.category}</strong><br>
          ${photo.date} • ${photo.remarks || ''}
        </div>
      </div>`;
  }

  // Info grid item
  function infoItem(label, value) {
    return `<div class="info-item">
      <span class="info-label">${label}</span>
      <span class="info-value">${value || '—'}</span>
    </div>`;
  }

  // Create select options HTML
  function selectOptions(items, valueKey, labelKey, selectedVal, allLabel) {
    let html = allLabel ? `<option value="">${allLabel}</option>` : '';
    items.forEach(item => {
      const val = typeof item === 'string' ? item : item[valueKey];
      const label = typeof item === 'string' ? item : item[labelKey];
      html += `<option value="${val}" ${val == selectedVal ? 'selected' : ''}>${label}</option>`;
    });
    return html;
  }

  // CSV export
  function exportCSV(headers, rows, filename) {
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',') + '\n';
    });
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'export.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  // Debounce
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  return {
    formatCurrency, formatNumber, statusBadge, progressBar,
    donutChart, hBarChart, dataTable, photoCard, infoItem,
    selectOptions, exportCSV, debounce
  };
})();
