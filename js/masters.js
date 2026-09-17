/* ===== Master Management Module ===== */

window.MastersPage = (function () {

  let activeTab = 'wards';

  function render(container) {
    container.innerHTML = `
      <div class="animate-fade">
        <div class="page-header">
          <div>
            <h1>Master Management</h1>
            <p class="page-subtitle">मास्टर डेटा प्रबंधन • Configure system master data</p>
          </div>
        </div>

        <!-- Master Tabs -->
        <div class="tabs" id="masterTabs">
          <button class="tab-btn ${activeTab === 'wards' ? 'active' : ''}" data-tab="wards"><i class="hgi-stroke hgi-map"></i> Wards</button>
          <button class="tab-btn ${activeTab === 'schemes' ? 'active' : ''}" data-tab="schemes"><i class="hgi-stroke hgi-chart-bar-line"></i> Schemes</button>
          <button class="tab-btn ${activeTab === 'departments' ? 'active' : ''}" data-tab="departments"><i class="hgi-stroke hgi-office"></i> Departments</button>
          <button class="tab-btn ${activeTab === 'jes' ? 'active' : ''}" data-tab="jes"><i class="hgi-stroke hgi-wrench"></i> JEs</button>
          <button class="tab-btn ${activeTab === 'contractors' ? 'active' : ''}" data-tab="contractors"><i class="hgi-stroke hgi-hard-hat"></i> Contractors</button>
          <button class="tab-btn ${activeTab === 'worktypes' ? 'active' : ''}" data-tab="worktypes"><i class="hgi-stroke hgi-clipboard"></i> Work Types</button>
          <button class="tab-btn ${activeTab === 'rbac' ? 'active' : ''}" data-tab="rbac"><i class="hgi-stroke hgi-security-lock"></i> Access Control (RBAC)</button>
        </div>

        <div id="masterContent"></div>
      </div>
    `;

    // Tab switching
    container.querySelectorAll('#masterTabs .tab-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        activeTab = this.dataset.tab;
        container.querySelectorAll('#masterTabs .tab-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderTab();
      });
    });

    renderTab();
  }

  function renderTab() {
    const content = document.getElementById('masterContent');
    if (!content) return;

    switch (activeTab) {
      case 'wards': renderWardsTab(content); break;
      case 'schemes': renderSchemesTab(content); break;
      case 'departments': renderDepartmentsTab(content); break;
      case 'jes': renderJEsTab(content); break;
      case 'contractors': renderContractorsTab(content); break;
      case 'worktypes': renderWorkTypesTab(content); break;
      case 'rbac': renderRbacTab(content); break;
    }
  }

  function renderWardsTab(el) {
    const headers = ['Ward No.', 'Ward Name', 'Zone', 'Councillor', 'Party', 'Phone', 'Actions'];
    const rows = DATA.WARDS.map(w => `
      <tr>
        <td><strong>${w.id}</strong></td>
        <td class="text-hindi">${w.nameEn}</td>
        <td>${w.zone}</td>
        <td>${w.councillor}</td>
        <td><span class="badge" style="background:var(--primary-100);color:var(--primary-800)">${w.party || 'N/A'}</span></td>
        <td>${w.phone || 'N/A'}</td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="MastersPage.editWard(${w.id})"><i class="hgi-stroke hgi-edit-02"></i> Edit</button>
        </td>
      </tr>
    `);

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Wards / वार्ड (${DATA.WARDS.length})</h3>
        </div>
        <div class="card-body" style="padding:0; max-height: 60vh; overflow-y: auto;">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>
      
      <!-- Edit Ward Modal -->
      <div id="wardEditModal" style="display:none; position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.5); z-index:9999; align-items:center; justify-content:center;">
        <div class="card" style="width: 400px; padding: 2rem; box-shadow: var(--shadow-lg);">
          <h3 id="wardEditTitle" style="margin-bottom:1.5rem; color:var(--primary-700)">Edit Ward</h3>
          <input type="hidden" id="editWardId">
          <div class="form-group" style="margin-bottom:1rem">
            <label style="display:block; margin-bottom:0.5rem; font-weight:600">Councillor Name</label>
            <input type="text" id="editWardCouncillor" class="form-control" style="width:100%; padding:8px; border:1px solid var(--border-light); border-radius:4px;">
          </div>
          <div class="form-group" style="margin-bottom:1rem">
            <label style="display:block; margin-bottom:0.5rem; font-weight:600">Party</label>
            <input type="text" id="editWardParty" class="form-control" style="width:100%; padding:8px; border:1px solid var(--border-light); border-radius:4px;">
          </div>
          <div class="form-group" style="margin-bottom:1rem">
            <label style="display:block; margin-bottom:0.5rem; font-weight:600">Phone Number</label>
            <input type="text" id="editWardPhone" class="form-control" style="width:100%; padding:8px; border:1px solid var(--border-light); border-radius:4px;">
          </div>
          <div style="display:flex; gap:10px; margin-top:2rem">
            <button class="btn btn-primary" style="flex:1" onclick="MastersPage.saveWard()">Save Changes</button>
            <button class="btn btn-outline" style="flex:1" onclick="document.getElementById('wardEditModal').style.display='none'">Cancel</button>
          </div>
        </div>
      </div>
    `;
  }

  function editWard(id) {
    const ward = DATA.WARDS.find(w => w.id === id);
    if (!ward) return;
    document.getElementById('wardEditTitle').innerText = `Edit Ward ${ward.id} (${ward.nameEn})`;
    document.getElementById('editWardId').value = ward.id;
    document.getElementById('editWardCouncillor').value = ward.councillor || '';
    document.getElementById('editWardParty').value = ward.party || '';
    document.getElementById('editWardPhone').value = ward.phone || '';
    document.getElementById('wardEditModal').style.display = 'flex';
  }

  async function saveWard() {
    const id = parseInt(document.getElementById('editWardId').value);
    const councillor = document.getElementById('editWardCouncillor').value;
    const party = document.getElementById('editWardParty').value;
    const phone = document.getElementById('editWardPhone').value;
    
    try {
      const res = await fetch(`http://localhost:3000/api/wards/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ councillor, party, phone })
      });
      if (res.ok) {
        document.getElementById('wardEditModal').style.display = 'none';
        await window.DATA.init(); // Refresh data from DB
        renderTab(); // Re-render the UI
      } else {
        alert('Failed to save to database.');
      }
    } catch (err) {
      alert('Error connecting to database: ' + err.message);
    }
  }

  function renderSchemesTab(el) {
    const schemeData = DATA.computeSchemeStats();
    const headers = ['Scheme', 'Category', 'Total Works', 'Completed', 'Delayed', 'Sanctioned Amount', 'Avg Progress'];
    const rows = schemeData.map(s => `
      <tr>
        <td><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${s.scheme.color};margin-right:8px"></span><strong>${s.scheme.short}</strong></td>
        <td style="font-size:var(--text-xs)">${s.scheme.category}</td>
        <td><strong>${s.total}</strong></td>
        <td style="color:var(--success)">${s.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${s.byStatus.delayed || 0}</td>
        <td>${Utils.formatCurrency(s.totalAmount)}</td>
        <td>${Utils.progressBar(s.avgProgress, 'sm')}</td>
      </tr>
    `);

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Schemes / Financial Sources (${schemeData.length})</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Add Scheme modal - Demo')">+ Add Scheme</button>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>`;
  }

  function renderDepartmentsTab(el) {
    const deptData = DATA.computeDeptStats();
    const headers = ['Department', 'Icon', 'Total Works', 'Completed', 'Delayed', 'Sanctioned Amount', 'Avg Progress'];
    const rows = deptData.map(d => `
      <tr>
        <td><strong>${d.department.name}</strong></td>
        <td>${d.department.icon}</td>
        <td><strong>${d.total}</strong></td>
        <td style="color:var(--success)">${d.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${d.byStatus.delayed || 0}</td>
        <td>${Utils.formatCurrency(d.totalAmount)}</td>
        <td>${Utils.progressBar(d.avgProgress, 'sm')}</td>
      </tr>
    `);

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Departments / विभाग (${deptData.length})</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Add Department modal - Demo')">+ Add</button>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>`;
  }

  function renderJEsTab(el) {
    const jeData = DATA.computeJEStats();
    const headers = ['JE ID', 'Name', 'Phone', 'Department', 'Assigned Works', 'Completed', 'Delayed', 'Avg Progress'];
    const rows = jeData.map(j => `
      <tr>
        <td><span class="work-id">${j.je.id}</span></td>
        <td><strong>${j.je.name}</strong></td>
        <td style="font-size:var(--text-xs)">${j.je.phone}</td>
        <td>${j.je.department}</td>
        <td><strong>${j.total}</strong></td>
        <td style="color:var(--success)">${j.byStatus.completed || 0}</td>
        <td style="color:var(--danger)">${j.byStatus.delayed || 0}</td>
        <td>${Utils.progressBar(j.avgProgress, 'sm')}</td>
      </tr>
    `);

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Junior Engineers / JE (${jeData.length})</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Add JE modal - Demo')">+ Add JE</button>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>`;
  }

  function renderContractorsTab(el) {
    const headers = ['ID', 'Name', 'Contact', 'Assigned Works'];
    const rows = DATA.CONTRACTORS.map(c => {
      const works = DATA.WORKS.filter(w => w.contractor.id === c.id).length;
      return `
        <tr>
          <td><span class="work-id">${c.id}</span></td>
          <td><strong>${c.name}</strong></td>
          <td>${c.contact}</td>
          <td><strong>${works}</strong></td>
        </tr>
      `;
    });

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Contractors / ठेकेदार (${DATA.CONTRACTORS.length})</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Add Contractor modal - Demo')">+ Add</button>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>`;
  }

  function renderWorkTypesTab(el) {
    const headers = ['#', 'Work Type', 'Total Works'];
    const rows = DATA.WORK_TYPES.map((wt, i) => {
      const count = DATA.WORKS.filter(w => w.workType === wt).length;
      return `
        <tr>
          <td>${i + 1}</td>
          <td><strong>${wt}</strong></td>
          <td>${count}</td>
        </tr>
      `;
    });

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Work Types (${DATA.WORK_TYPES.length})</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Add Work Type modal - Demo')">+ Add</button>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>`;
  }

  function renderRbacTab(el) {
    const roles = [
      { id: 'admin', name: 'Super Admin', permissions: 'Full Access (All Modules, Settings, RBAC, Data Editing)', users: 2 },
      { id: 'officer', name: 'Municipal Officer', permissions: 'View Dashboard, View Works, View Analytics, Generate Reports', users: 15 },
      { id: 'je', name: 'Junior Engineer (JE)', permissions: 'View Assigned Works, Submit Progress Updates, Upload Photos', users: 10 },
      { id: 'councillor', name: 'Councillor', permissions: 'View Ward Works (Read Only)', users: 60 }
    ];

    const headers = ['Role / Level', 'Permissions / Access Rights', 'Assigned Users', 'Actions'];
    const rows = roles.map(r => `
      <tr>
        <td><strong>${r.name}</strong><br><span style="font-size:var(--text-xs);color:var(--text-tertiary)">${r.id}</span></td>
        <td style="font-size:var(--text-sm)">${r.permissions}</td>
        <td><strong>${r.users}</strong></td>
        <td>
          <button class="btn btn-sm btn-outline" onclick="alert('Edit permissions for ${r.name}')"><i class="hgi-stroke hgi-edit-02"></i> Edit</button>
          <button class="btn btn-sm btn-ghost" onclick="alert('View users in ${r.name}')"><i class="hgi-stroke hgi-user-multiple"></i> Users</button>
        </td>
      </tr>
    `);

    el.innerHTML = `
      <div class="card animate-fade">
        <div class="card-header">
          <h3>Role-Based Access Control (RBAC)</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Create Custom Role modal - Demo')">+ Create Custom Role</button>
        </div>
        <div class="card-body">
          <p style="margin-bottom:var(--space-4)">Configure system roles and define access permissions for different features of the dashboard.</p>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(headers, rows)}
        </div>
      </div>
      
      <div class="card animate-fade" style="margin-top:var(--space-5)">
        <div class="card-header">
          <h3>User Management</h3>
          <button class="btn btn-sm btn-primary" onclick="alert('Add User modal - Demo')">+ Add User</button>
        </div>
        <div class="card-body" style="padding:0">
          ${Utils.dataTable(
            ['User Name', 'Login ID', 'Assigned Role', 'Status', 'Actions'],
            DATA.USERS.map(u => `
              <tr>
                <td><strong>${u.name}</strong></td>
                <td>${u.role}</td>
                <td><span class="badge" style="background:var(--primary-100);color:var(--primary-700);border:1px solid var(--primary-200)">${u.roleName}</span></td>
                <td><span style="color:var(--success)">Active</span></td>
                <td><button class="btn btn-sm btn-ghost" onclick="alert('Manage user access')">Manage</button></td>
              </tr>
            `)
          )}
        </div>
      </div>
    `;
  }

  return { 
    render,
    editWard,
    saveWard
  };
})();
