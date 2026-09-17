/* ===== Works List + Work Detail Module ===== */

window.WorksPage = (function () {

  let currentFilters = {};

  function renderList(container) {
    const filtered = applyFilters(DATA.WORKS);
    const stats = DATA.computeStats(filtered);

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Development Works</h1>
            <p class="page-subtitle">सभी विकास कार्य • ${filtered.length} of ${DATA.WORKS.length} works</p>
          </div>
          <div class="page-actions">
            <button class="btn btn-outline" onclick="WorksPage.exportWorks()"><i class="hgi-stroke hgi-download-04"></i> Export CSV</button>
          </div>
        </div>

        <!-- Filter Bar -->
        <div class="filter-bar" id="filterBar">
          <div class="filter-group">
            <label>Ward</label>
            <select id="filterWard" onchange="WorksPage.applyFilter()">
              ${Utils.selectOptions(DATA.WARDS.filter(w => DATA.WORKS.some(wk => wk.ward.id === w.id)), 'id', 'nameEn', currentFilters.ward, 'All Wards')}
            </select>
          </div>
          <div class="filter-group">
            <label>Scheme</label>
            <select id="filterScheme" onchange="WorksPage.applyFilter()">
              ${Utils.selectOptions(DATA.SCHEMES, 'id', 'short', currentFilters.scheme, 'All Schemes')}
            </select>
          </div>
          <div class="filter-group">
            <label>Department</label>
            <select id="filterDept" onchange="WorksPage.applyFilter()">
              ${Utils.selectOptions(DATA.DEPARTMENTS, 'id', 'short', currentFilters.dept, 'All Departments')}
            </select>
          </div>
          <div class="filter-group">
            <label>Status</label>
            <select id="filterStatus" onchange="WorksPage.applyFilter()">
              ${Utils.selectOptions(DATA.STATUSES, 'id', 'label', currentFilters.status, 'All Status')}
            </select>
          </div>
          <div class="filter-group">
            <label>JE</label>
            <select id="filterJE" onchange="WorksPage.applyFilter()">
              ${Utils.selectOptions(DATA.JES, 'id', 'name', currentFilters.je, 'All JEs')}
            </select>
          </div>
          <div class="filter-group">
            <label>Search Work ID / Name</label>
            <input type="text" id="filterSearch" placeholder="Search..." value="${currentFilters.search || ''}" oninput="WorksPage.applyFilter()">
          </div>
          <div class="filter-actions">
            <button class="btn btn-sm btn-ghost" onclick="WorksPage.resetFilters()">↻ Reset</button>
          </div>
        </div>

        <!-- Summary mini-stats -->
        <div style="display:flex;gap:var(--space-3);margin-bottom:var(--space-4);flex-wrap:wrap">
          <div class="stat-mini">
            <div class="stat-mini-icon" style="background:#e3f2fd;color:#1976d2"><i class="hgi-stroke hgi-analytics-02"></i></div>
            <div>
              <div class="stat-mini-value">${filtered.length}</div>
              <div class="stat-mini-label">Showing</div>
            </div>
          </div>
          <div class="stat-mini">
            <div class="stat-mini-icon" style="background:#e8f5e9;color:#2e7d32"><i class="hgi-stroke hgi-checkmark-circle-02"></i></div>
            <div>
              <div class="stat-mini-value">${stats.byStatus.completed || 0}</div>
              <div class="stat-mini-label">Completed</div>
            </div>
          </div>
          <div class="stat-mini">
            <div class="stat-mini-icon" style="background:#ffebee;color:#c62828"><i class="hgi-stroke hgi-alert-01"></i></div>
            <div>
              <div class="stat-mini-value">${stats.byStatus.delayed || 0}</div>
              <div class="stat-mini-label">Delayed</div>
            </div>
          </div>
          <div class="stat-mini">
            <div class="stat-mini-icon" style="background:var(--accent-50);color:var(--accent-600)"><i class="hgi-stroke hgi-wallet-01"></i></div>
            <div>
              <div class="stat-mini-value">${Utils.formatCurrency(stats.totalAmount)}</div>
              <div class="stat-mini-label">Sanctioned</div>
            </div>
          </div>
        </div>

        <!-- Works Table -->
        <div class="card">
          <div class="card-body" style="padding:0">
            ${renderWorksTable(filtered)}
          </div>
        </div>
      </div>
    `;
  }

  function renderWorksTable(works) {
    const headers = ['Work ID', 'Work Name', 'Ward', 'Scheme', 'Status', 'Progress', 'JE', 'Amount'];
    const rows = works.map(w => `
      <tr class="clickable" onclick="Router.navigate('work-detail/${w.id}')">
        <td><span class="work-id">${w.id}</span></td>
        <td class="truncate" style="max-width:220px" title="${w.name}">${w.name}</td>
        <td>${w.ward.nameEn}</td>
        <td><span style="font-size:var(--text-xs)">${w.scheme.short}</span></td>
        <td>${Utils.statusBadge(w.status)}</td>
        <td style="min-width:130px">${Utils.progressBar(w.progress, 'sm')}</td>
        <td style="font-size:var(--text-xs)">${w.assignedJE.name}</td>
        <td style="font-size:var(--text-xs);white-space:nowrap">${Utils.formatCurrency(w.sanctionedAmount)}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows, { clickable: true, emptyMsg: 'No works found matching filters' });
  }

  function applyFilters(works) {
    let result = [...works];
    const f = currentFilters;
    if (f.ward) result = result.filter(w => w.ward.id == f.ward);
    if (f.scheme) result = result.filter(w => w.scheme.id == f.scheme);
    if (f.dept) result = result.filter(w => w.department.id == f.dept);
    if (f.status) result = result.filter(w => w.status === f.status);
    if (f.je) result = result.filter(w => w.assignedJE.id === f.je);
    if (f.search) {
      const s = f.search.toLowerCase();
      result = result.filter(w => w.id.toLowerCase().includes(s) || w.name.toLowerCase().includes(s));
    }
    return result;
  }

  function applyFilter() {
    currentFilters = {
      ward: document.getElementById('filterWard')?.value || '',
      scheme: document.getElementById('filterScheme')?.value || '',
      dept: document.getElementById('filterDept')?.value || '',
      status: document.getElementById('filterStatus')?.value || '',
      je: document.getElementById('filterJE')?.value || '',
      search: document.getElementById('filterSearch')?.value || ''
    };
    renderList(document.getElementById('mainContent'));
  }

  function resetFilters() {
    currentFilters = {};
    renderList(document.getElementById('mainContent'));
  }

  function setFilterAndNavigate(key, value) {
    currentFilters = {};
    currentFilters[key] = String(value);
    Router.navigate('works');
  }

  function exportWorks() {
    const filtered = applyFilters(DATA.WORKS);
    const headers = ['Work ID', 'Work Name', 'Ward', 'Zone', 'Scheme', 'Department', 'Status', 'Progress %', 'JE', 'Contractor', 'Sanctioned Amount', 'Start Date', 'Completion Date'];
    const rows = filtered.map(w => [
      w.id, w.name, w.ward.nameEn, w.zone, w.scheme.name, w.department.name,
      w.status, w.progress, w.assignedJE.name, w.contractor.name,
      w.sanctionedAmount, w.startDate, w.originalCompletionDate
    ]);
    Utils.exportCSV(headers, rows, 'NNMV_Development_Works.csv');
  }

  // ── Work Detail Page ──
  function renderDetail(container, params) {
    const workId = params[0];
    const work = DATA.WORKS.find(w => w.id === workId);
    if (!work) {
      container.innerHTML = '<div class="empty-state"><div class="empty-icon"><i class="hgi-stroke hgi-search-01"></i></div><h3>Work not found</h3><p><a href="#works"><i class="hgi-stroke hgi-arrow-left-01"></i> Back to Works</a></p></div>';
      return;
    }

    const milestones = DATA.ALL_MILESTONES[workId] || [];
    const updates = DATA.ALL_PROGRESS_UPDATES[workId] || [];
    const photos = DATA.ALL_PHOTOS[workId] || [];

    container.innerHTML = `
      <div class="animate-fade">
        <div class="breadcrumb">
          <a href="#dashboard">Dashboard</a>
          <span class="separator">›</span>
          <a href="#works">Works</a>
          <span class="separator">›</span>
          <span class="current">${work.id}</span>
        </div>

        <!-- Work Header -->
        <div class="work-detail-header">
          <div class="work-title-area">
            <h2>${work.name}</h2>
            <div class="work-meta">
              <span><i class="hgi-stroke hgi-id-card"></i> ${work.id}</span>
              <span><i class="hgi-stroke hgi-map"></i> ${work.ward.nameEn}</span>
              <span><i class="hgi-stroke hgi-chart-bar-line"></i> ${work.scheme.short}</span>
              <span><i class="hgi-stroke hgi-office"></i> ${work.department.short}</span>
            </div>
          </div>
          <div style="display:flex;gap:var(--space-3);align-items:center">
            ${Utils.statusBadge(work.status)}
            ${Utils.progressBar(work.progress)}
          </div>
        </div>

        <!-- Tabs -->
        <div class="tabs" id="detailTabs">
          <button class="tab-btn active" data-tab="basic">Basic Info</button>
          <button class="tab-btn" data-tab="financial">Financial</button>
          <button class="tab-btn" data-tab="timeline">Timeline</button>
          <button class="tab-btn" data-tab="milestones">Milestones (${milestones.length})</button>
          <button class="tab-btn" data-tab="progress">Progress (${updates.length})</button>
          <button class="tab-btn" data-tab="photos">Photos (${photos.length})</button>
        </div>

        <!-- Tab: Basic Info -->
        <div class="tab-content active" id="tab-basic">
          <div class="card">
            <div class="card-body">
              <div class="info-grid">
                ${Utils.infoItem('Work ID', work.id)}
                ${Utils.infoItem('Work Name', work.name)}
                ${Utils.infoItem('Description', work.description)}
                ${Utils.infoItem('Ward / वार्ड', work.ward.nameEn)}
                ${Utils.infoItem('Zone', work.zone)}
                ${Utils.infoItem('Area / Location', work.area)}
                ${Utils.infoItem('Work Type', work.workType)}
                ${Utils.infoItem('Scheme / योजना', work.scheme.name)}
                ${Utils.infoItem('Financial Source', work.financialSource)}
                ${Utils.infoItem('Department', work.department.name)}
                ${Utils.infoItem('Assigned JE', work.assignedJE.name + ' (' + work.assignedJE.id + ')')}
                ${Utils.infoItem('Contractor', work.contractor.name)}
                ${Utils.infoItem('Approval No.', work.approvalNo)}
                ${Utils.infoItem('Approval Date', work.approvalDate)}
                ${Utils.infoItem('Work Order No.', work.workOrderNo)}
                ${Utils.infoItem('Work Order Date', work.workOrderDate)}
                ${Utils.infoItem('Status / स्थिति', work.status.replace(/_/g, ' ').toUpperCase())}
                ${Utils.infoItem('Progress / प्रगति', work.progress + '%')}
                ${work.delayReason ? Utils.infoItem('Delay Reason / विलंब कारण', work.delayReason) : ''}
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Financial -->
        <div class="tab-content" id="tab-financial">
          <div class="card">
            <div class="card-body">
              <div class="info-grid">
                ${Utils.infoItem('Estimated Cost', Utils.formatCurrency(work.estimatedCost))}
                ${Utils.infoItem('Sanctioned Amount / स्वीकृत राशि', Utils.formatCurrency(work.sanctionedAmount))}
                ${Utils.infoItem('Work Order Amount', Utils.formatCurrency(work.workOrderAmount))}
                ${Utils.infoItem('Expenditure / व्यय', Utils.formatCurrency(work.expenditure))}
                ${Utils.infoItem('Balance', Utils.formatCurrency(work.sanctionedAmount - work.expenditure))}
                ${Utils.infoItem('Utilization %', Math.round(work.expenditure / work.sanctionedAmount * 100) + '%')}
              </div>
              <div style="margin-top:var(--space-5)">
                <h4 style="margin-bottom:var(--space-3)">Expenditure Progress</h4>
                ${Utils.progressBar(Math.round(work.expenditure / work.sanctionedAmount * 100))}
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Timeline -->
        <div class="tab-content" id="tab-timeline">
          <div class="card">
            <div class="card-body">
              <div class="info-grid">
                ${Utils.infoItem('Start Date / प्रारंभ तिथि', work.startDate)}
                ${Utils.infoItem('Original Completion Date', work.originalCompletionDate)}
                ${Utils.infoItem('Revised Completion Date', work.revisedCompletionDate || '—')}
                ${Utils.infoItem('Actual Completion Date', work.actualCompletionDate || '—')}
              </div>
            </div>
          </div>
        </div>

        <!-- Tab: Milestones -->
        <div class="tab-content" id="tab-milestones">
          <div class="card">
            <div class="card-body" style="padding:0">
              ${renderMilestonesTable(milestones)}
            </div>
          </div>
        </div>

        <!-- Tab: Progress Updates -->
        <div class="tab-content" id="tab-progress">
          <div class="card">
            <div class="card-body">
              ${renderProgressTimeline(updates)}
            </div>
          </div>
        </div>

        <!-- Tab: Photos -->
        <div class="tab-content" id="tab-photos">
          ${renderPhotoSections(photos)}
        </div>
      </div>
    `;

    // Tab switching
    container.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        container.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById('tab-' + this.dataset.tab)?.classList.add('active');
      });
    });
  }

  function renderMilestonesTable(milestones) {
    const headers = ['#', 'Milestone', 'Hindi', 'Weight', 'Progress', 'Status', 'Completed'];
    const rows = milestones.map(m => `
      <tr>
        <td>${m.sequence}</td>
        <td><strong>${m.name}</strong></td>
        <td class="text-hindi" style="font-size:var(--text-xs)">${m.nameHi}</td>
        <td>${m.weight}%</td>
        <td style="min-width:120px">${Utils.progressBar(m.progress, 'sm')}</td>
        <td>${Utils.statusBadge(m.status)}</td>
        <td style="font-size:var(--text-xs)">${m.actualDate || '—'}</td>
      </tr>
    `);
    return Utils.dataTable(headers, rows);
  }

  function renderProgressTimeline(updates) {
    if (updates.length === 0) return '<div class="empty-state"><p>No progress updates yet</p></div>';
    return `<div class="timeline">
      ${updates.map(u => `
        <div class="timeline-item">
          <div class="timeline-date">${u.date} • by ${u.updatedBy}</div>
          <div class="timeline-content">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2)">
              <strong>Progress: ${u.progress}%</strong>
              ${Utils.statusBadge(u.status)}
            </div>
            <div style="margin-bottom:var(--space-2)">${Utils.progressBar(u.progress, 'sm')}</div>
            <p style="margin:0;font-size:var(--text-xs);color:var(--text-secondary)">${u.milestone} — ${u.remarks}</p>
          </div>
        </div>
      `).join('')}
    </div>`;
  }

  function renderPhotoSections(photos) {
    const categories = ['Before', 'Progress', 'Completion'];
    return categories.map(cat => {
      const catPhotos = photos.filter(p => p.category === cat);
      if (catPhotos.length === 0) return '';
      return `
        <div class="card" style="margin-bottom:var(--space-4)">
          <div class="card-header"><h3><i class="hgi-stroke hgi-camera-01"></i> ${cat} Photos</h3></div>
          <div class="card-body">
            <div class="photo-grid">
              ${catPhotos.map(p => Utils.photoCard(p)).join('')}
            </div>
          </div>
        </div>`;
    }).join('');
  }

  return { renderList, renderDetail, applyFilter, resetFilters, exportWorks, setFilterAndNavigate };
})();
