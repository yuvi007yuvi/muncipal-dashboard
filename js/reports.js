/* ===== Reports & Exports Module ===== */

window.ReportsPage = (function () {

  let selectedReport = 'ward';

  function render(container) {
    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Reports & Exports</h1>
            <p class="page-subtitle">रिपोर्ट एवं निर्यात • Generate and download reports</p>
          </div>
        </div>

        <!-- Report Type Selector -->
        <div class="card" style="margin-bottom:var(--space-5)">
          <div class="card-body">
            <div class="form-row" style="grid-template-columns: 1fr 1fr 1fr; align-items:end">
              <div class="form-group" style="margin:0">
                <label>Report Type / रिपोर्ट प्रकार</label>
                <select id="reportType" onchange="ReportsPage.changeReport()">
                  <option value="ward" ${selectedReport === 'ward' ? 'selected' : ''}>Ward-wise Work Report</option>
                  <option value="scheme" ${selectedReport === 'scheme' ? 'selected' : ''}>Scheme-wise Work Report</option>
                  <option value="department" ${selectedReport === 'department' ? 'selected' : ''}>Department-wise Report</option>
                  <option value="je" ${selectedReport === 'je' ? 'selected' : ''}>JE-wise Report</option>
                  <option value="delayed" ${selectedReport === 'delayed' ? 'selected' : ''}>Delayed Works Report</option>
                  <option value="completed" ${selectedReport === 'completed' ? 'selected' : ''}>Completed Works Report</option>
                  <option value="financial" ${selectedReport === 'financial' ? 'selected' : ''}>Financial Source Report</option>
                  <option value="monthly" ${selectedReport === 'monthly' ? 'selected' : ''}>Monthly Progress Report</option>
                  <option value="photo" ${selectedReport === 'photo' ? 'selected' : ''}>Photo Progress Report</option>
                </select>
              </div>
              <div class="form-group" style="margin:0">
                <label>Date Range (optional)</label>
                <div style="display:flex;gap:var(--space-2)">
                  <input type="date" id="reportFrom" value="2026-01-01">
                  <input type="date" id="reportTo" value="2026-09-18">
                </div>
              </div>
              <div style="display:flex;gap:var(--space-2)">
                <button class="btn btn-primary" onclick="ReportsPage.generateReport()"><i class="hgi-stroke hgi-analytics-02"></i> Generate</button>
                <button class="btn btn-accent" onclick="ReportsPage.exportReport()"><i class="hgi-stroke hgi-download-04"></i> Export CSV</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Report Preview -->
        <div class="card" id="reportPreview">
          <div class="card-header">
            <h3 id="reportTitle"><i class="hgi-stroke hgi-analytics-02"></i> Ward-wise Work Report</h3>
            <span style="font-size:var(--text-xs);color:var(--text-tertiary)">Generated: ${new Date().toLocaleDateString('en-IN')}</span>
          </div>
          <div class="card-body" style="padding:0" id="reportBody">
            ${generateReportContent('ward')}
          </div>
        </div>
      </div>
    `;
  }

  function changeReport() {
    selectedReport = document.getElementById('reportType').value;
    generateReport();
  }

  function generateReport() {
    const type = document.getElementById('reportType').value;
    selectedReport = type;

    const titleMap = {
      ward: '<i class="hgi-stroke hgi-analytics-02"></i> Ward-wise Work Report / वार्ड अनुसार रिपोर्ट',
      scheme: '<i class="hgi-stroke hgi-chart-bar-line"></i> Scheme-wise Work Report / योजना अनुसार रिपोर्ट',
      department: '<i class="hgi-stroke hgi-office"></i> Department-wise Report / विभाग अनुसार रिपोर्ट',
      je: '<i class="hgi-stroke hgi-wrench"></i> JE-wise Report / JE अनुसार रिपोर्ट',
      delayed: '<i class="hgi-stroke hgi-alert-01"></i> Delayed Works Report / विलंबित कार्य रिपोर्ट',
      completed: '<i class="hgi-stroke hgi-checkmark-circle-02"></i> Completed Works Report / पूर्ण कार्य रिपोर्ट',
      financial: '<i class="hgi-stroke hgi-wallet-01"></i> Financial Source Report / वित्तीय स्रोत रिपोर्ट',
      monthly: '<i class="hgi-stroke hgi-calendar-01"></i> Monthly Progress Report / मासिक प्रगति रिपोर्ट',
      photo: '<i class="hgi-stroke hgi-camera-01"></i> Photo Progress Report / फोटो प्रगति रिपोर्ट'
    };

    document.getElementById('reportTitle').innerHTML = titleMap[type] || '';
    document.getElementById('reportBody').innerHTML = generateReportContent(type);
  }

  function generateReportContent(type) {
    switch (type) {
      case 'ward': return wardReport();
      case 'scheme': return schemeReport();
      case 'department': return deptReport();
      case 'je': return jeReport();
      case 'delayed': return delayedReport();
      case 'completed': return completedReport();
      case 'financial': return financialReport();
      case 'monthly': return monthlyReport();
      case 'photo': return photoReport();
      default: return wardReport();
    }
  }

  function wardReport() {
    const wardStats = Object.values(DATA.computeWardStats()).filter(w => w.total > 0).sort((a, b) => a.ward.id - b.ward.id);
    const headers = ['Ward', 'Total', 'In Progress', 'Completed', 'Delayed', 'On Hold', 'Avg %', 'Amount'];
    const rows = wardStats.map(w => `
      <tr>
        <td><strong>${w.ward.nameEn}</strong></td>
        <td>${w.total}</td>
        <td style="color:var(--info)">${w.byStatus.in_progress || 0}</td>
        <td style="color:var(--success)">${w.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${w.byStatus.delayed || 0}</td>
        <td>${w.byStatus.on_hold || 0}</td>
        <td>${Utils.progressBar(w.avgProgress, 'sm')}</td>
        <td style="font-size:var(--text-xs)">${Utils.formatCurrency(w.totalAmount)}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  function schemeReport() {
    const data = DATA.computeSchemeStats();
    const headers = ['Scheme', 'Category', 'Total', 'Completed', 'Delayed', 'Amount', 'Avg %'];
    const rows = data.map(s => `
      <tr>
        <td><strong>${s.scheme.name}</strong></td>
        <td style="font-size:var(--text-xs)">${s.scheme.category}</td>
        <td>${s.total}</td>
        <td style="color:var(--success)">${s.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${s.byStatus.delayed || 0}</td>
        <td>${Utils.formatCurrency(s.totalAmount)}</td>
        <td>${Utils.progressBar(s.avgProgress, 'sm')}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  function deptReport() {
    const data = DATA.computeDeptStats();
    const headers = ['Department', 'Total', 'Completed', 'Delayed', 'Amount', 'Avg %'];
    const rows = data.map(d => `
      <tr>
        <td><strong>${d.department.icon} ${d.department.name}</strong></td>
        <td>${d.total}</td>
        <td style="color:var(--success)">${d.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${d.byStatus.delayed || 0}</td>
        <td>${Utils.formatCurrency(d.totalAmount)}</td>
        <td>${Utils.progressBar(d.avgProgress, 'sm')}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  function jeReport() {
    const data = DATA.computeJEStats();
    const headers = ['JE ID', 'Name', 'Dept', 'Assigned', 'Completed', 'Delayed', 'Avg %'];
    const rows = data.map(j => `
      <tr>
        <td><span class="work-id">${j.je.id}</span></td>
        <td><strong>${j.je.name}</strong></td>
        <td>${j.je.department}</td>
        <td>${j.total}</td>
        <td style="color:var(--success)">${j.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${j.byStatus.delayed || 0}</td>
        <td>${Utils.progressBar(j.avgProgress, 'sm')}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  function delayedReport() {
    const delayed = DATA.WORKS.filter(w => w.status === 'delayed');
    const headers = ['Work ID', 'Work Name', 'Ward', 'Scheme', 'Progress', 'Delay Reason', 'JE', 'Amount'];
    const rows = delayed.map(w => `
      <tr>
        <td><span class="work-id">${w.id}</span></td>
        <td class="truncate" style="max-width:200px">${w.name}</td>
        <td>${w.ward.nameEn}</td>
        <td style="font-size:var(--text-xs)">${w.scheme.short}</td>
        <td>${Utils.progressBar(w.progress, 'sm')}</td>
        <td style="font-size:var(--text-xs);color:var(--danger)">${w.delayReason}</td>
        <td style="font-size:var(--text-xs)">${w.assignedJE.name}</td>
        <td style="font-size:var(--text-xs)">${Utils.formatCurrency(w.sanctionedAmount)}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows, { emptyMsg: 'No delayed works' });
  }

  function completedReport() {
    const completed = DATA.WORKS.filter(w => w.status === 'completed');
    const headers = ['Work ID', 'Work Name', 'Ward', 'Scheme', 'JE', 'Completion Date', 'Amount'];
    const rows = completed.map(w => `
      <tr>
        <td><span class="work-id">${w.id}</span></td>
        <td class="truncate" style="max-width:200px">${w.name}</td>
        <td>${w.ward.nameEn}</td>
        <td style="font-size:var(--text-xs)">${w.scheme.short}</td>
        <td style="font-size:var(--text-xs)">${w.assignedJE.name}</td>
        <td style="font-size:var(--text-xs)">${w.actualCompletionDate}</td>
        <td style="font-size:var(--text-xs)">${Utils.formatCurrency(w.sanctionedAmount)}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows, { emptyMsg: 'No completed works' });
  }

  function financialReport() {
    return schemeReport(); // Same data, financial focus
  }

  function monthlyReport() {
    const stats = DATA.computeStats(DATA.WORKS);
    return `<div style="padding:var(--space-5)">
      <h4 style="margin-bottom:var(--space-4)">Summary — September 2026</h4>
      <div class="info-grid">
        ${Utils.infoItem('Total Works', stats.total)}
        ${Utils.infoItem('Total Sanctioned', Utils.formatCurrency(stats.totalAmount))}
        ${Utils.infoItem('Completed', stats.byStatus.completed || 0)}
        ${Utils.infoItem('In Progress', stats.byStatus.in_progress || 0)}
        ${Utils.infoItem('Delayed', stats.byStatus.delayed || 0)}
        ${Utils.infoItem('On Hold', stats.byStatus.on_hold || 0)}
        ${Utils.infoItem('Not Started', stats.byStatus.not_started || 0)}
        ${Utils.infoItem('Average Progress', stats.avgProgress + '%')}
      </div>
    </div>`;
  }

  function photoReport() {
    const headers = ['Work ID', 'Work Name', 'Before', 'Progress', 'Completion', 'Total'];
    const rows = DATA.WORKS.slice(0, 20).map(w => {
      const photos = DATA.ALL_PHOTOS[w.id] || [];
      const before = photos.filter(p => p.category === 'Before').length;
      const progress = photos.filter(p => p.category === 'Progress').length;
      const completion = photos.filter(p => p.category === 'Completion').length;
      return `
        <tr>
          <td><span class="work-id">${w.id}</span></td>
          <td class="truncate" style="max-width:200px">${w.name}</td>
          <td>${before > 0 ? '<i class="hgi-stroke hgi-checkmark-circle-02" style="color:var(--success)"></i> ' + before : '<i class="hgi-stroke hgi-cancel-01" style="color:var(--danger)"></i> 0'}</td>
          <td>${progress > 0 ? '<i class="hgi-stroke hgi-checkmark-circle-02" style="color:var(--success)"></i> ' + progress : '<i class="hgi-stroke hgi-cancel-01" style="color:var(--danger)"></i> 0'}</td>
          <td>${completion > 0 ? '<i class="hgi-stroke hgi-checkmark-circle-02" style="color:var(--success)"></i> ' + completion : '<i class="hgi-stroke hgi-cancel-01" style="color:var(--danger)"></i> 0'}</td>
          <td><strong>${photos.length}</strong></td>
        </tr>
      `;
    });
    return Utils.dataTable(headers, rows);
  }

  function exportReport() {
    const type = selectedReport;
    let headers, rows;

    switch (type) {
      case 'delayed':
        headers = ['Work ID', 'Work Name', 'Ward', 'Scheme', 'Progress', 'Delay Reason', 'JE', 'Amount'];
        rows = DATA.WORKS.filter(w => w.status === 'delayed').map(w =>
          [w.id, w.name, w.ward.nameEn, w.scheme.short, w.progress + '%', w.delayReason, w.assignedJE.name, w.sanctionedAmount]);
        break;
      case 'completed':
        headers = ['Work ID', 'Work Name', 'Ward', 'Scheme', 'JE', 'Completion Date', 'Amount'];
        rows = DATA.WORKS.filter(w => w.status === 'completed').map(w =>
          [w.id, w.name, w.ward.nameEn, w.scheme.short, w.assignedJE.name, w.actualCompletionDate, w.sanctionedAmount]);
        break;
      default:
        headers = ['Work ID', 'Work Name', 'Ward', 'Scheme', 'Department', 'Status', 'Progress', 'JE', 'Amount'];
        rows = DATA.WORKS.map(w =>
          [w.id, w.name, w.ward.nameEn, w.scheme.name, w.department.name, w.status, w.progress + '%', w.assignedJE.name, w.sanctionedAmount]);
    }
    Utils.exportCSV(headers, rows, `NNMV_${type}_Report.csv`);
  }

  return { render, changeReport, generateReport, exportReport };
})();
