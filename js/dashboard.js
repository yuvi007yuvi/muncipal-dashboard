/* ===== Central Dashboard Module ===== */

window.DashboardPage = (function () {

  function render(container) {
    const stats = DATA.computeStats(DATA.WORKS);
    const schemeStats = DATA.computeSchemeStats();
    const wardStats = DATA.computeWardStats();

    // Top wards for chart (pick wards with works)
    const topWards = Object.values(wardStats)
      .filter(w => w.total > 0)
      .sort((a, b) => b.total - a.total)
      .slice(0, 8);

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Central Dashboard</h1>
            <p class="page-subtitle">नगर निगम मथुरा-वृन्दावन • Development Works Overview</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-outline" onclick="Router.navigate('reports')"><i class="hgi-stroke hgi-analytics-02"></i> Reports</button>
            <button class="btn btn-primary" onclick="Router.navigate('works')"><i class="hgi-stroke hgi-clipboard"></i> All Works</button>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="kpi-grid">
          ${kpiCard('kpi-total', '<i class="hgi-stroke hgi-building-04"></i>', 'Total Works / कुल कार्य', stats.total, '')}
          ${kpiCard('kpi-amount', '<i class="hgi-stroke hgi-wallet-01"></i>', 'Sanctioned Amount', Utils.formatCurrency(stats.totalAmount), '')}
          ${kpiCard('kpi-not-started', '<i class="hgi-stroke hgi-pause-circle"></i>', 'Not Started', stats.byStatus.not_started || 0, '')}
          ${kpiCard('kpi-progress', '<i class="hgi-stroke hgi-refresh"></i>', 'In Progress / प्रगति पर', stats.byStatus.in_progress || 0, '')}
          ${kpiCard('kpi-completed', '<i class="hgi-stroke hgi-checkmark-circle-02"></i>', 'Completed / पूर्ण', stats.byStatus.completed || 0, '')}
          ${kpiCard('kpi-delayed', '<i class="hgi-stroke hgi-alert-01"></i>', 'Delayed / विलंबित', stats.byStatus.delayed || 0, '')}
          ${kpiCard('kpi-hold', '<i class="hgi-stroke hgi-hourglass"></i>', 'On Hold / रुका हुआ', stats.byStatus.on_hold || 0, '')}
          ${kpiCard('kpi-avg', '<i class="hgi-stroke hgi-chart-bar-line"></i>', 'Avg. Progress %', stats.avgProgress + '%', '')}
        </div>

        <!-- Quick Actions -->
        <div class="quick-actions">
          <button class="quick-action-btn" onclick="Router.navigate('works')"><i class="hgi-stroke hgi-clipboard"></i> View All Works</button>
          <button class="quick-action-btn" onclick="filterDelayed()"><i class="hgi-stroke hgi-alert-01"></i> Delayed Works (${stats.byStatus.delayed || 0})</button>
          <button class="quick-action-btn" onclick="Router.navigate('ward-analytics')"><i class="hgi-stroke hgi-map"></i> Ward Analytics</button>
          <button class="quick-action-btn" onclick="Router.navigate('scheme-analytics')"><i class="hgi-stroke hgi-chart-bar-line"></i> Scheme Analytics</button>
          <button class="quick-action-btn" onclick="Router.navigate('reports')"><i class="hgi-stroke hgi-analytics-02"></i> Generate Report</button>
        </div>

        <!-- Charts Row -->
        <div class="charts-grid">
          <!-- Status Distribution Donut -->
          <div class="chart-card">
            <h3><i class="hgi-stroke hgi-analytics-02"></i> Work Status Distribution</h3>
            ${renderStatusDonut(stats)}
            <div class="chart-legend">
              ${statusLegend()}
            </div>
          </div>

          <!-- Ward-wise Works Bar Chart -->
          <div class="chart-card">
            <h3><i class="hgi-stroke hgi-map"></i> Top Wards by Works</h3>
            ${Utils.hBarChart(topWards.map(w => ({
              label: w.ward.nameEn,
              value: w.total,
              color: 'var(--primary-600)'
            })))}
          </div>
        </div>

        <!-- Second Charts Row -->
        <div class="charts-grid">
          <!-- Scheme-wise Distribution -->
          <div class="chart-card">
            <h3><i class="hgi-stroke hgi-chart-bar-line"></i> Scheme-wise Distribution</h3>
            ${Utils.hBarChart(schemeStats.map(s => ({
              label: s.scheme.short,
              value: s.total,
              color: s.scheme.color
            })))}
          </div>

          <!-- Scheme-wise Amount -->
          <div class="chart-card">
            <h3><i class="hgi-stroke hgi-wallet-01"></i> Scheme-wise Sanctioned Amount</h3>
            ${Utils.hBarChart(schemeStats.map(s => ({
              label: s.scheme.short,
              value: Math.round(s.totalAmount / 100000),
              color: s.scheme.color
            })))}
            <p style="font-size:var(--text-xs); color:var(--text-tertiary); margin-top:var(--space-3); margin-bottom:0; text-align:center;">Values in Lakhs (₹)</p>
          </div>
        </div>

        <!-- Recent Delayed Works -->
        <div class="card" style="margin-bottom:var(--space-6)">
          <div class="card-header">
            <h3><i class="hgi-stroke hgi-alert-01"></i> Delayed Works / विलंबित कार्य</h3>
            <button class="btn btn-sm btn-outline" onclick="filterDelayed()">View All →</button>
          </div>
          <div class="card-body" style="padding:0">
            ${renderDelayedTable()}
          </div>
        </div>

        <!-- Recent Updates -->
        <div class="card">
          <div class="card-header">
            <h3><i class="hgi-stroke hgi-note-edit"></i> Recent Progress Updates</h3>
            <button class="btn btn-sm btn-outline" onclick="Router.navigate('audit')">Audit Log →</button>
          </div>
          <div class="card-body" style="padding:0">
            ${renderRecentUpdates()}
          </div>
        </div>
      </div>
    `;
  }

  function kpiCard(cls, icon, label, value, change) {
    return `
      <div class="kpi-card ${cls}">
        <div class="kpi-icon">${icon}</div>
        <div class="kpi-content">
          <div class="kpi-label">${label}</div>
          <div class="kpi-value">${value}</div>
          ${change ? `<div class="kpi-change">${change}</div>` : ''}
        </div>
      </div>`;
  }

  function renderStatusDonut(stats) {
    const total = stats.total || 1;
    const segments = [
      { percent: (stats.byStatus.in_progress || 0) / total * 100, color: 'var(--info)' },
      { percent: (stats.byStatus.completed || 0) / total * 100, color: 'var(--success)' },
      { percent: (stats.byStatus.delayed || 0) / total * 100, color: 'var(--danger)' },
      { percent: (stats.byStatus.not_started || 0) / total * 100, color: 'var(--status-not-started)' },
      { percent: (stats.byStatus.on_hold || 0) / total * 100, color: 'var(--warning)' },
      { percent: (stats.byStatus.under_verification || 0) / total * 100, color: 'var(--status-verification)' },
      { percent: (stats.byStatus.cancelled || 0) / total * 100, color: 'var(--status-cancelled)' }
    ];
    return Utils.donutChart(segments, 'Total Works', stats.total);
  }

  function statusLegend() {
    const items = [
      { label: 'In Progress', color: 'var(--info)' },
      { label: 'Completed', color: 'var(--success)' },
      { label: 'Delayed', color: 'var(--danger)' },
      { label: 'Not Started', color: 'var(--status-not-started)' },
      { label: 'On Hold', color: 'var(--warning)' },
      { label: 'Verification', color: 'var(--status-verification)' }
    ];
    return items.map(i => `
      <div class="legend-item">
        <span class="legend-dot" style="background:${i.color}"></span>
        ${i.label}
      </div>
    `).join('');
  }

  function renderDelayedTable() {
    const delayed = DATA.WORKS.filter(w => w.status === 'delayed').slice(0, 5);
    if (delayed.length === 0) return '<div class="empty-state"><p>No delayed works</p></div>';

    const headers = ['Work ID', 'Work Name', 'Ward', 'Progress', 'Delay Reason', 'JE'];
    const rows = delayed.map(w => `
      <tr class="clickable" onclick="Router.navigate('work-detail/${w.id}')">
        <td><span class="work-id">${w.id}</span></td>
        <td class="truncate" style="max-width:200px">${w.name}</td>
        <td>${w.ward.nameEn}</td>
        <td>${Utils.progressBar(w.progress, 'sm')}</td>
        <td style="color:var(--danger);font-size:var(--text-xs)">${w.delayReason}</td>
        <td>${w.assignedJE.name}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  function renderRecentUpdates() {
    const recent = DATA.AUDIT_LOG.slice(0, 5);
    const headers = ['Time', 'User', 'Action', 'Work ID', 'Details'];
    const rows = recent.map(a => `
      <tr>
        <td style="font-size:var(--text-xs);color:var(--text-tertiary);white-space:nowrap">${a.timestamp}</td>
        <td>${a.user}</td>
        <td>${a.action}</td>
        <td><span class="work-id">${a.workId}</span></td>
        <td style="font-size:var(--text-xs)">${a.oldValue} → ${a.newValue}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  // Global function for delayed works filter
  window.filterDelayed = function () {
    Router.navigate('works');
    setTimeout(() => {
      const statusFilter = document.getElementById('filterStatus');
      if (statusFilter) {
        statusFilter.value = 'delayed';
        statusFilter.dispatchEvent(new Event('change'));
      }
    }, 100);
  };

  return { render };
})();
