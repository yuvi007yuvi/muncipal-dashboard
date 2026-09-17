/* ===== Audit Log Module ===== */

window.AuditPage = (function () {

  let filterAction = '';
  let filterSearch = '';

  function render(container) {
    const filtered = getFilteredLogs();

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Audit Log</h1>
            <p class="page-subtitle">ऑडिट लॉग • Immutable action history (${filtered.length} entries)</p>
          </div>
        </div>

        <!-- Filters -->
        <div class="filter-bar" style="margin-bottom:var(--space-5)">
          <div class="filter-group">
            <label>Action Type</label>
            <select id="auditFilterAction" onchange="AuditPage.applyFilter()">
              <option value="">All Actions</option>
              <option value="Progress Updated" ${filterAction === 'Progress Updated' ? 'selected' : ''}>Progress Updated</option>
              <option value="Status Changed" ${filterAction === 'Status Changed' ? 'selected' : ''}>Status Changed</option>
              <option value="Photo Uploaded" ${filterAction === 'Photo Uploaded' ? 'selected' : ''}>Photo Uploaded</option>
              <option value="Work Created" ${filterAction === 'Work Created' ? 'selected' : ''}>Work Created</option>
              <option value="Milestone Updated" ${filterAction === 'Milestone Updated' ? 'selected' : ''}>Milestone Updated</option>
              <option value="User Login" ${filterAction === 'User Login' ? 'selected' : ''}>User Login</option>
              <option value="JE Assigned" ${filterAction === 'JE Assigned' ? 'selected' : ''}>JE Assigned</option>
              <option value="Work Modified" ${filterAction === 'Work Modified' ? 'selected' : ''}>Work Modified</option>
            </select>
          </div>
          <div class="filter-group">
            <label>Search (User / Work ID)</label>
            <input type="text" id="auditFilterSearch" placeholder="Search..." value="${filterSearch}" oninput="AuditPage.applyFilter()">
          </div>
          <div class="filter-actions">
            <button class="btn btn-sm btn-ghost" onclick="AuditPage.resetFilter()"><i class="hgi-stroke hgi-refresh"></i> Reset</button>
          </div>
        </div>

        <!-- Audit Table -->
        <div class="card">
          <div class="card-header">
            <h3><i class="hgi-stroke hgi-document-attachment"></i> Audit Trail</h3>
            <button class="btn btn-sm btn-outline" onclick="AuditPage.exportAudit()"><i class="hgi-stroke hgi-download-04"></i> Export CSV</button>
          </div>
          <div class="card-body" style="padding:0">
            ${renderAuditTable(filtered)}
          </div>
        </div>
      </div>
    `;
  }

  function getFilteredLogs() {
    let logs = [...DATA.AUDIT_LOG];
    if (filterAction) logs = logs.filter(l => l.action === filterAction);
    if (filterSearch) {
      const s = filterSearch.toLowerCase();
      logs = logs.filter(l => l.user.toLowerCase().includes(s) || l.workId.toLowerCase().includes(s) || l.action.toLowerCase().includes(s));
    }
    return logs;
  }

  function renderAuditTable(logs) {
    const headers = ['ID', 'Timestamp', 'User', 'Action', 'Work ID', 'Old Value', 'New Value', 'Source'];
    const rows = logs.map(a => {
      const actionColors = {
        'Progress Updated': 'var(--info)',
        'Status Changed': 'var(--accent-600)',
        'Photo Uploaded': 'var(--success)',
        'Work Created': 'var(--primary-800)',
        'User Login': 'var(--text-tertiary)'
      };
      const color = actionColors[a.action] || 'var(--text-secondary)';

      return `
        <tr>
          <td style="font-size:var(--text-xs);color:var(--text-tertiary)">${a.id}</td>
          <td style="font-size:var(--text-xs);white-space:nowrap">${a.timestamp}</td>
          <td><strong>${a.user}</strong><br><span style="font-size:10px;color:var(--text-tertiary)">${a.userId}</span></td>
          <td><span style="color:${color};font-weight:var(--font-medium)">${a.action}</span></td>
          <td><span class="work-id">${a.workId}</span></td>
          <td style="font-size:var(--text-xs)">${a.oldValue}</td>
          <td style="font-size:var(--text-xs);font-weight:var(--font-semibold)">${a.newValue}</td>
          <td><span class="badge" style="background:var(--neutral-100);color:var(--text-secondary)">${a.source}</span></td>
        </tr>
      `;
    });
    return Utils.dataTable(headers, rows, { emptyMsg: 'No audit entries found' });
  }

  function applyFilter() {
    filterAction = document.getElementById('auditFilterAction')?.value || '';
    filterSearch = document.getElementById('auditFilterSearch')?.value || '';
    render(document.getElementById('mainContent'));
  }

  function resetFilter() {
    filterAction = '';
    filterSearch = '';
    render(document.getElementById('mainContent'));
  }

  function exportAudit() {
    const logs = getFilteredLogs();
    const headers = ['ID', 'Timestamp', 'User', 'User ID', 'Action', 'Work ID', 'Work Name', 'Old Value', 'New Value', 'Source'];
    const rows = logs.map(a => [a.id, a.timestamp, a.user, a.userId, a.action, a.workId, a.workName, a.oldValue, a.newValue, a.source]);
    Utils.exportCSV(headers, rows, 'NNMV_Audit_Log.csv');
  }

  return { render, applyFilter, resetFilter, exportAudit };
})();
