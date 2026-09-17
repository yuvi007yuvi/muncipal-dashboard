/* ===== Auth Module (Mock) ===== */

window.Auth = (function () {
  let currentUser = null;

  function renderLogin() {
    document.getElementById('appShell').classList.add('hidden');
    const loginPage = document.getElementById('loginPage');
    loginPage.classList.remove('hidden');
    
    // Split layout with canvases
    loginPage.innerHTML = `
      <div class="login-split">
        <div class="login-left">
          <canvas id="particles-left"></canvas>
          <div class="login-left-content animate-fade">
            <img src="Logo.png" alt="NNMV Logo" class="split-logo">
            <h1>DEVELOPMENT WORKS</h1>
            <p class="subtitle">MONITORING SYSTEM</p>
            <hr>
            <p class="desc">Centralized monitoring and tracking portal for Nagar Nigam Mathura-Vrindavan. Authorized personnel only.</p>
            <div style="margin-top: 3rem; display: flex; align-items: center; color: var(--success); font-size: 0.8rem;">
              <i class="hgi-stroke hgi-shield-check" style="margin-right: 8px;"></i> Secure Administrator Terminal
            </div>
          </div>
        </div>
        <div class="login-right">
          <canvas id="particles-right"></canvas>
          <div class="login-card animate-fade" style="position: relative; z-index: 2; margin: 0; box-shadow: 0 20px 40px rgba(0,0,0,0.08); border: none;">
            <div class="login-brand" style="text-align: left; margin-bottom: 2rem;">
              <h2 style="font-size: 1.5rem; color: var(--neutral-900); margin-bottom: 0.5rem; font-weight: 700;">Secure Login</h2>
              <p style="color: var(--neutral-500); font-size: 0.875rem; margin-bottom: 0;">Enter your assigned credentials to continue.</p>
            </div>
            <form id="loginForm">
              <!-- Removed role select -->

              <div class="form-group">
                <label for="loginUser" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--neutral-600); font-weight: 600;">Username / उपयोगकर्ता</label>
                <input type="text" id="loginUser" placeholder="Enter username" value="admin" required>
              </div>

              <div class="form-group">
                <label for="loginPass" style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.5px; color: var(--neutral-600); font-weight: 600;">Password / पासवर्ड</label>
                <input type="password" id="loginPass" placeholder="Enter password" value="admin123" required>
              </div>

              <button type="submit" class="btn btn-primary" id="loginBtn" style="width: 100%; margin-top: 1rem; padding: 12px; font-weight: 600; background-color: var(--success); border-color: var(--success);">
                <i class="hgi-stroke hgi-lock"></i> SECURE SIGN IN
              </button>
            </form>
            
            <div style="text-align: center; margin-top: 2rem;">
              <a href="#" style="color: var(--text-tertiary); font-size: 0.75rem; text-decoration: underline;">Installation Guide & System Requirements</a>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('loginForm').addEventListener('submit', async function (e) {
      e.preventDefault();
      const username = document.getElementById('loginUser').value.trim();
      const password = document.getElementById('loginPass').value.trim();
      if (!username || !password) { alert('Please enter username and password'); return; }
      
      const btn = document.getElementById('loginBtn');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Signing in...';
      btn.disabled = true;

      try {
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        
        if (response.ok) {
          const user = await response.json();
          localStorage.setItem('nnmv_user', JSON.stringify(user));
          login(user);
        } else {
          alert('Invalid username or password');
          btn.innerHTML = originalText;
          btn.disabled = false;
        }
      } catch (err) {
        alert('Could not connect to the server. Please ensure the backend is running.');
        btn.innerHTML = originalText;
        btn.disabled = false;
      }
    });

    // Initialize particles slightly delayed to ensure DOM is ready and styled
    setTimeout(() => {
      initParticles('particles-left', 'rgba(21, 153, 87, 0.85)'); // Brighter Teal/Green dots on dark background
      initParticles('particles-right', 'rgba(21, 153, 87, 0.25)'); // Brighter faint green dots on white background
    }, 50);
  }

  function initParticles(canvasId, color) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    const particles = [];
    const count = window.innerWidth < 768 ? 30 : 90; // Increased particle count

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1.5
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < count; i++) {
        let p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();

        for (let j = i + 1; j < count; j++) {
          let p2 = particles[j];
          let dx = p.x - p2.x;
          let dy = p.y - p2.y;
          let dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) { // Increased connection distance
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alphaMatch = color.match(/[0-9.]+\)/);
            if (alphaMatch) {
              const baseAlpha = parseFloat(alphaMatch[0]);
              const dynamicAlpha = Math.max(0, baseAlpha * (1 - dist / 180));
              ctx.strokeStyle = color.replace(/[0-9.]+\)$/, dynamicAlpha + ')');
            } else {
              ctx.strokeStyle = color; // fallback
            }
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
    }
    draw();

    window.addEventListener('resize', () => {
      if(!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    });
  }

  function login(user) {
    currentUser = user;

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
    updateNavForRole(currentUser.role);

    // Navigate to appropriate dashboard
    if (currentUser.role === 'je') {
      Router.navigate('je-dashboard');
    } else if (currentUser.role === 'councillor') {
      Router.navigate('councillor-dashboard');
    } else {
      Router.navigate('dashboard');
    }
    // Ensure route renders even if hash didn't change
    Router.handleRoute();
  }

  function checkSession() {
    const savedUser = localStorage.getItem('nnmv_user');
    if (savedUser) {
      try {
        login(JSON.parse(savedUser));
        return true;
      } catch(e) {
        localStorage.removeItem('nnmv_user');
      }
    }
    return false;
  }

  function logout() {
    currentUser = null;
    localStorage.removeItem('nnmv_user');
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

  return { renderLogin, login, logout, getUser, checkSession };
})();
