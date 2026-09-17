/* ===== App Initialization ===== */

(function () {
  'use strict';

// Wait for DOM
  document.addEventListener('DOMContentLoaded', async function () {
    
    // Initialize data from API
    await window.DATA.init();

    // ── Register Routes ──
    Router.register('dashboard', function (el) { DashboardPage.render(el); });
    Router.register('works', function (el) { WorksPage.renderList(el); });
    Router.register('work-detail', function (el, params) { WorksPage.renderDetail(el, params); });
    Router.register('ward-analytics', function (el) { ProgressPage.renderWardAnalytics(el); });
    Router.register('scheme-analytics', function (el) { ProgressPage.renderSchemeAnalytics(el); });
    Router.register('dept-analytics', function (el) { ProgressPage.renderDeptAnalytics(el); });
    Router.register('masters', function (el) { MastersPage.render(el); });
    Router.register('reports', function (el) { ReportsPage.render(el); });
    Router.register('audit', function (el) { AuditPage.render(el); });
    Router.register('je-dashboard', function (el) { ProgressPage.renderJEDashboard(el); });
    Router.register('councillor-dashboard', function (el) { ProgressPage.renderCouncillorDashboard(el); });

    // 404 fallback
    Router.register('404', function (el) {
      el.innerHTML = `
        <div class="empty-state" style="padding:80px 20px">
          <div class="empty-icon">🔍</div>
          <h3>Page Not Found</h3>
          <p>The page you're looking for doesn't exist</p>
          <a href="#dashboard" class="btn btn-primary" style="margin-top:16px">← Back to Dashboard</a>
        </div>`;
    });

    // ── Auth guard ──
    Router.setBeforeHook(function (route) {
      if (!Auth.getUser()) {
        Auth.renderLogin();
        return false;
      }
      return true;
    });

    // ── Sidebar Navigation Event Delegation ──
    document.querySelector('.sidebar-nav')?.addEventListener('click', function (e) {
      const navItem = e.target.closest('.nav-item');
      if (navItem && navItem.dataset.route) {
        e.preventDefault();
        Router.navigate(navItem.dataset.route);
      }
    });

    // ── Hamburger Toggle ──
    document.getElementById('hamburgerBtn')?.addEventListener('click', function () {
      document.querySelector('.sidebar')?.classList.toggle('open');
      document.querySelector('.sidebar-overlay')?.classList.toggle('show');
    });

    document.querySelector('.sidebar-overlay')?.addEventListener('click', function () {
      document.querySelector('.sidebar')?.classList.remove('open');
      this.classList.remove('show');
    });

    // ── Notification Toggle ──
    document.getElementById('notifBtn')?.addEventListener('click', function (e) {
      e.stopPropagation();
      const dropdown = document.getElementById('notifDropdown');
      dropdown?.classList.toggle('show');
    });

    document.addEventListener('click', function () {
      document.getElementById('notifDropdown')?.classList.remove('show');
    });

    // ── Populate Notification Dropdown ──
    const notifList = document.getElementById('notifList');
    if (notifList) {
      notifList.innerHTML = DATA.NOTIFICATIONS.map(n => `
        <div class="notif-item" style="${n.read ? 'opacity:0.6' : ''}">
          <div class="notif-icon ${n.type}">${n.icon}</div>
          <div>
            <div class="notif-text">${n.message}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        </div>
      `).join('');
    }

    // ── Logout ──
    document.getElementById('logoutBtn')?.addEventListener('click', function () {
      Auth.logout();
    });

    // ── Start ──
    // Initialize router (registers hashchange listener)
    Router.init();

    // Show login first (before hook will block until logged in)
    Auth.renderLogin();
  });

})();
