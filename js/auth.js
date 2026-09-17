/* ===== Auth Module (Mock) ===== */

window.Auth = (function () {
  let currentUser = null;

  function renderLogin() {
    document.getElementById('appShell').classList.add('hidden');
    document.getElementById('loginPage').classList.remove('hidden');
    document.getElementById('loginPage').innerHTML = `
      <div class="login-card animate-fade">
        <div class="login-brand">
          <img src="Logo.png" alt="NNMV Logo" class="login-logo">
          <h1 class="login-title">नगर निगम मथुरा-वृन्दावन</h1>
          <p class="login-subtitle">Development Works Monitoring System</p>
        </div>

        <form id="loginForm">
          <div class="form-group">
            <label for="loginRole">Login As / भूमिका चुनें</label>
            <select id="loginRole" required>
              <option value="">— Select Role —</option>
              <option value="admin">Super Admin</option>
              <option value="officer">Municipal Officer</option>
              <option value="je">Junior Engineer (JE)</option>
              <option value="councillor">Councillor / पार्षद</option>
            </select>
          </div>

          <div class="form-group">
            <label for="loginUser">Username / उपयोगकर्ता</label>
            <input type="text" id="loginUser" placeholder="Enter username" value="admin" required>
          </div>

          <div class="form-group">
            <label for="loginPass">Password / पासवर्ड</label>
            <input type="password" id="loginPass" placeholder="Enter password" value="admin123" required>
          </div>

          <button type="submit" class="btn btn-primary" id="loginBtn">
            <i class="hgi-stroke hgi-lock"></i> Login / लॉगिन करें
          </button>
        </form>

        <div class="login-footer">
          <p style="margin:0">© 2026 Nagar Nigam Mathura-Vrindavan</p>
          <p style="margin:4px 0 0">nnmv.online | Development Works Monitoring</p>
        </div>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const role = document.getElementById('loginRole').value;
      if (!role) { alert('Please select a role'); return; }
      login(role);
    });
  }

  function login(role) {
    currentUser = DATA.USERS.find(u => u.role === role) || DATA.USERS[0];

    document.getElementById('loginPage').classList.add('hidden');
    document.getElementById('appShell').classList.remove('hidden');

    // Update user info in sidebar
    const userNameEl = document.getElementById('sidebarUserName');
    const userRoleEl = document.getElementById('sidebarUserRole');
    const userAvatarEl = document.getElementById('sidebarUserAvatar');
    if (userNameEl) userNameEl.textContent = currentUser.name;
    if (userRoleEl) userRoleEl.textContent = currentUser.roleName;
    if (userAvatarEl) userAvatarEl.textContent = currentUser.name.charAt(0);

    // Adjust sidebar based on role
    updateNavForRole(role);

    // Navigate to appropriate dashboard
    if (role === 'je') {
      Router.navigate('je-dashboard');
    } else if (role === 'councillor') {
      Router.navigate('councillor-dashboard');
    } else {
      Router.navigate('dashboard');
    }
    // Ensure route renders even if hash didn't change
    Router.handleRoute();
  }

  function logout() {
    currentUser = null;
    window.location.hash = '';
    renderLogin();
  }

  function getUser() {
    return currentUser;
  }

  function updateNavForRole(role) {
    const navItems = document.querySelectorAll('.nav-item[data-role]');
    navItems.forEach(item => {
      const allowedRoles = item.dataset.role.split(',');
      if (allowedRoles.includes('all') || allowedRoles.includes(role)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  return { renderLogin, login, logout, getUser };
})();
