/* ===== Progress Updates / JE Dashboard / Councillor Dashboard ===== */

window.ProgressPage = (function () {

  // ── JE Dashboard ──
  function renderJEDashboard(container) {
    const user = Auth.getUser();
    const jeId = user?.jeId || 'JE001';
    const je = DATA.JES.find(j => j.id === jeId) || DATA.JES[0];
    const myWorks = DATA.WORKS.filter(w => w.assignedJE.id === je.id);
    const stats = DATA.computeStats(myWorks);

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>JE Dashboard</h1>
            <p class="page-subtitle"><i class="hgi-stroke hgi-user-settings"></i> ${je.name} (${je.id}) • ${je.department} Department</p>
          </div>
        </div>

        <!-- JE KPIs -->
        <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr)">
          <div class="kpi-card kpi-total">
            <div class="kpi-icon"><i class="hgi-stroke hgi-clipboard"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Assigned Works</div>
              <div class="kpi-value">${stats.total}</div>
            </div>
          </div>
          <div class="kpi-card kpi-progress">
            <div class="kpi-icon"><i class="hgi-stroke hgi-refresh"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">In Progress</div>
              <div class="kpi-value">${stats.byStatus.in_progress || 0}</div>
            </div>
          </div>
          <div class="kpi-card kpi-completed">
            <div class="kpi-icon"><i class="hgi-stroke hgi-checkmark-circle-02"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Completed</div>
              <div class="kpi-value">${stats.byStatus.completed || 0}</div>
            </div>
          </div>
          <div class="kpi-card kpi-delayed">
            <div class="kpi-icon"><i class="hgi-stroke hgi-alert-01"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Delayed</div>
              <div class="kpi-value">${stats.byStatus.delayed || 0}</div>
            </div>
          </div>
        </div>

        <!-- Progress Update Form -->
        <div class="progress-form-card">
          <h3><i class="hgi-stroke hgi-note-edit"></i> Submit Progress Update / प्रगति अपडेट दर्ज करें</h3>
          <form id="progressForm" onsubmit="ProgressPage.submitUpdate(event)">
            <div class="form-row">
              <div class="form-group">
                <label>Select Work / कार्य चुनें *</label>
                <select id="puWorkId" required>
                  <option value="">— Select Work —</option>
                  ${myWorks.filter(w => w.status !== 'completed').map(w => 
                    `<option value="${w.id}">${w.id} — ${w.name} (${w.progress}%)</option>`
                  ).join('')}
                </select>
              </div>
              <div class="form-group">
                <label>Update Date / तिथि *</label>
                <input type="date" id="puDate" value="${new Date().toISOString().split('T')[0]}" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Current Progress % / प्रगति प्रतिशत *</label>
                <input type="number" id="puProgress" min="0" max="100" placeholder="e.g. 65" required>
              </div>
              <div class="form-group">
                <label>Milestone / चरण *</label>
                <select id="puMilestone" required>
                  <option value="">— Select —</option>
                  <option value="Base Preparation">Base Preparation</option>
                  <option value="Gitti / Sand Work">Gitti / Sand Work</option>
                  <option value="Interlocking / Surface">Interlocking / Surface Work</option>
                  <option value="Finishing">Finishing</option>
                  <option value="Work Completed">Work Completed</option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label>Status / स्थिति *</label>
                <select id="puStatus" required>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="delayed">Delayed</option>
                  <option value="on_hold">On Hold</option>
                  <option value="under_verification">Under Verification</option>
                </select>
              </div>
              <div class="form-group">
                <label>Delay Reason (if delayed)</label>
                <input type="text" id="puDelayReason" placeholder="Reason for delay...">
              </div>
            </div>
            <div class="form-group">
              <label>Remarks / टिप्पणी *</label>
              <textarea id="puRemarks" rows="3" placeholder="Progress details, observations..." required style="width:100%;resize:vertical"></textarea>
            </div>
            <div class="form-group">
              <label><i class="hgi-stroke hgi-camera-01"></i> Photo Upload (Demo)</label>
              <input type="file" id="puPhoto" accept="image/*" style="padding:var(--space-2)">
              <small style="color:var(--text-tertiary)">At least one photo required for field progress update</small>
            </div>
            <div style="display:flex;gap:var(--space-3)">
              <button type="submit" class="btn btn-primary btn-lg"><i class="hgi-stroke hgi-upload-01"></i> Submit Update</button>
              <button type="reset" class="btn btn-outline btn-lg"><i class="hgi-stroke hgi-refresh"></i> Reset</button>
            </div>
          </form>
        </div>

        <!-- Assigned Works Table -->
        <div class="card">
          <div class="card-header">
            <h3><i class="hgi-stroke hgi-clipboard"></i> My Assigned Works / मेरे कार्य</h3>
          </div>
          <div class="card-body" style="padding:0">
            ${renderJEWorksTable(myWorks)}
          </div>
        </div>
      </div>
    `;
  }

  function renderJEWorksTable(works) {
    const headers = ['Work ID', 'Work Name', 'Ward', 'Status', 'Progress', 'Last Update'];
    const rows = works.map(w => {
      const updates = DATA.ALL_PROGRESS_UPDATES[w.id] || [];
      const lastUpdate = updates.length > 0 ? updates[updates.length - 1].date : '—';
      return `
        <tr class="clickable" onclick="Router.navigate('work-detail/${w.id}')">
          <td><span class="work-id">${w.id}</span></td>
          <td class="truncate" style="max-width:180px">${w.name}</td>
          <td>${w.ward.nameEn}</td>
          <td>${Utils.statusBadge(w.status)}</td>
          <td style="min-width:120px">${Utils.progressBar(w.progress, 'sm')}</td>
          <td style="font-size:var(--text-xs)">${lastUpdate}</td>
        </tr>
      `;
    });
    return Utils.dataTable(headers, rows);
  }

  function submitUpdate(e) {
    e.preventDefault();
    const workId = document.getElementById('puWorkId').value;
    const progress = document.getElementById('puProgress').value;
    const status = document.getElementById('puStatus').value;
    const remarks = document.getElementById('puRemarks').value;

    if (!workId || !progress) {
      alert('Please fill all required fields');
      return;
    }

    // Demo: show success
    alert(`✅ Progress Update Submitted!\n\nWork: ${workId}\nProgress: ${progress}%\nStatus: ${status}\nRemarks: ${remarks}\n\n(This is a demo — data is not persisted)`);
    e.target.reset();
  }

  // ── Councillor Dashboard ──
  function renderCouncillorDashboard(container) {
    const user = Auth.getUser();
    const wardId = user?.ward || 15;
    const ward = DATA.WARDS.find(w => w.id === wardId) || DATA.WARDS[14];
    const wardWorks = DATA.WORKS.filter(w => w.ward.id === ward.id);
    const stats = DATA.computeStats(wardWorks);

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Ward Works / वार्ड कार्य</h1>
            <p class="page-subtitle"><i class="hgi-stroke hgi-medal-star"></i> ${ward.name} (${ward.nameEn}) • ${ward.councillor}</p>
          </div>
        </div>

        <!-- Ward KPIs -->
        <div class="kpi-grid" style="grid-template-columns: repeat(4, 1fr)">
          <div class="kpi-card kpi-total">
            <div class="kpi-icon"><i class="hgi-stroke hgi-clipboard"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Ward Works</div>
              <div class="kpi-value">${stats.total}</div>
            </div>
          </div>
          <div class="kpi-card kpi-amount">
            <div class="kpi-icon"><i class="hgi-stroke hgi-wallet-01"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Total Amount</div>
              <div class="kpi-value">${Utils.formatCurrency(stats.totalAmount)}</div>
            </div>
          </div>
          <div class="kpi-card kpi-completed">
            <div class="kpi-icon"><i class="hgi-stroke hgi-checkmark-circle-02"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Completed</div>
              <div class="kpi-value">${stats.byStatus.completed || 0}</div>
            </div>
          </div>
          <div class="kpi-card kpi-avg">
            <div class="kpi-icon"><i class="hgi-stroke hgi-chart-bar-line"></i></div>
            <div class="kpi-content">
              <div class="kpi-label">Avg Progress</div>
              <div class="kpi-value">${stats.avgProgress}%</div>
            </div>
          </div>
        </div>

        <!-- Ward Works Table -->
        <div class="card">
          <div class="card-header">
            <h3><i class="hgi-stroke hgi-clipboard"></i> Works in ${ward.nameEn}</h3>
          </div>
          <div class="card-body" style="padding:0">
            ${renderCouncillorTable(wardWorks)}
          </div>
        </div>
      </div>
    `;
  }

  function renderCouncillorTable(works) {
    if (works.length === 0) {
      return '<div class="empty-state"><div class="empty-icon"><i class="hgi-stroke hgi-folder-minus"></i></div><h3>No works in this ward</h3></div>';
    }
    const headers = ['Work ID', 'Work Name', 'Scheme', 'Status', 'Progress', 'JE', 'Photos'];
    const rows = works.map(w => {
      const photos = DATA.ALL_PHOTOS[w.id] || [];
      return `
        <tr class="clickable" onclick="Router.navigate('work-detail/${w.id}')">
          <td><span class="work-id">${w.id}</span></td>
          <td class="truncate" style="max-width:180px">${w.name}</td>
          <td style="font-size:var(--text-xs)">${w.scheme.short}</td>
          <td>${Utils.statusBadge(w.status)}</td>
          <td style="min-width:120px">${Utils.progressBar(w.progress, 'sm')}</td>
          <td style="font-size:var(--text-xs)">${w.assignedJE.name}</td>
          <td><i class="hgi-stroke hgi-camera-01"></i> ${photos.length}</td>
        </tr>
      `;
    });
    return Utils.dataTable(headers, rows);
  }

  // ── Ward Analytics Page ──
  function renderWardAnalytics(container) {
    const wardStats = Object.values(DATA.computeWardStats()).filter(w => w.total > 0).sort((a, b) => b.total - a.total);

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Ward-wise Analytics</h1>
            <p class="page-subtitle">वार्ड अनुसार विश्लेषण • ${wardStats.length} wards with active works</p>
          </div>
        </div>

        <div class="analytics-grid">
          ${wardStats.map(w => `
            <div class="analytics-card" onclick="WorksPage.setFilterAndNavigate('ward', '${w.ward.id}')">
              <div class="analytics-header">
                <div class="analytics-title">${w.ward.nameEn}</div>
                <div class="analytics-icon"><i class="hgi-stroke hgi-map"></i></div>
              </div>
              <div style="margin-bottom:var(--space-3)">${Utils.progressBar(w.avgProgress)}</div>
              <div class="analytics-stats">
                <div class="stat-item">
                  <span class="stat-value">${w.total}</span>
                  <span class="stat-label">Total Works</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--success)">${w.byStatus.completed || 0}</span>
                  <span class="stat-label">Completed</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--info)">${w.byStatus.in_progress || 0}</span>
                  <span class="stat-label">In Progress</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--danger)">${w.byStatus.delayed || 0}</span>
                  <span class="stat-label">Delayed</span>
                </div>
              </div>
              <div style="margin-top:var(--space-3);font-size:var(--text-xs);color:var(--text-tertiary)">
                <i class="hgi-stroke hgi-wallet-01"></i> ${Utils.formatCurrency(w.totalAmount)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ── Scheme Analytics ──
  function renderSchemeAnalytics(container) {
    const schemeStats = DATA.computeSchemeStats();

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Scheme-wise Analytics</h1>
            <p class="page-subtitle">योजना अनुसार विश्लेषण • Financial source performance</p>
          </div>
        </div>

        <div class="analytics-grid">
          ${schemeStats.map(s => `
            <div class="analytics-card" onclick="WorksPage.setFilterAndNavigate('scheme', '${s.scheme.id}')">
              <div class="analytics-header">
                <div>
                  <div class="analytics-title">${s.scheme.short}</div>
                  <div style="font-size:var(--text-xs);color:var(--text-tertiary)">${s.scheme.category}</div>
                </div>
                <div class="analytics-icon" style="background:${s.scheme.color}15;color:${s.scheme.color}"><i class="hgi-stroke hgi-chart-bar-line"></i></div>
              </div>
              <div style="margin-bottom:var(--space-3)">${Utils.progressBar(s.avgProgress)}</div>
              <div class="analytics-stats">
                <div class="stat-item">
                  <span class="stat-value">${s.total}</span>
                  <span class="stat-label">Total Works</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${Utils.formatCurrency(s.totalAmount)}</span>
                  <span class="stat-label">Sanctioned</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--success)">${s.byStatus.completed || 0}</span>
                  <span class="stat-label">Completed</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--danger)">${s.byStatus.delayed || 0}</span>
                  <span class="stat-label">Delayed</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // ── Department Analytics ──
  function renderDeptAnalytics(container) {
    const deptStats = DATA.computeDeptStats();

    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Department-wise Analytics</h1>
            <p class="page-subtitle">विभाग अनुसार विश्लेषण</p>
          </div>
        </div>

        <div class="analytics-grid">
          ${deptStats.map(d => `
            <div class="analytics-card" onclick="WorksPage.setFilterAndNavigate('dept', '${d.department.id}')">
              <div class="analytics-header">
                <div class="analytics-title"><i class="hgi-stroke hgi-office"></i> ${d.department.name}</div>
              </div>
              <div style="margin-bottom:var(--space-3)">${Utils.progressBar(d.avgProgress)}</div>
              <div class="analytics-stats">
                <div class="stat-item">
                  <span class="stat-value">${d.total}</span>
                  <span class="stat-label">Total Works</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value">${Utils.formatCurrency(d.totalAmount)}</span>
                  <span class="stat-label">Sanctioned</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--success)">${d.byStatus.completed || 0}</span>
                  <span class="stat-label">Completed</span>
                </div>
                <div class="stat-item">
                  <span class="stat-value" style="color:var(--danger)">${d.byStatus.delayed || 0}</span>
                  <span class="stat-label">Delayed</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  return {
    renderJEDashboard, renderCouncillorDashboard,
    renderWardAnalytics, renderSchemeAnalytics, renderDeptAnalytics,
    submitUpdate
  };
})();
