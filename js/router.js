/* ===== Hash-Based Router ===== */

window.Router = (function () {
  const routes = {};
  let currentRoute = '';
  let beforeHook = null;

  function register(hash, handler) {
    routes[hash] = handler;
  }

  function navigate(hash) {
    window.location.hash = hash;
  }

  function setBeforeHook(fn) {
    beforeHook = fn;
  }

  function handleRoute() {
    const hash = window.location.hash.replace('#', '') || 'dashboard';
    const [route, ...params] = hash.split('/');

    if (beforeHook && !beforeHook(route, params)) return;

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.route === route);
    });

    // Update header title
    const titleMap = {
      dashboard: 'Dashboard',
      works: 'Development Works',
      'work-detail': 'Work Details',
      'ward-analytics': 'Ward-wise Analytics',
      'scheme-analytics': 'Scheme-wise Analytics',
      'dept-analytics': 'Department-wise Analytics',
      masters: 'Master Management',
      reports: 'Reports & Exports',
      audit: 'Audit Log',
      'je-dashboard': 'JE Dashboard',
      'councillor-dashboard': 'Ward Works'
    };
    const headerTitle = document.getElementById('headerTitle');
    if (headerTitle) headerTitle.textContent = titleMap[route] || 'Dashboard';

    // Execute route handler
    const mainContent = document.getElementById('mainContent');
    if (routes[route]) {
      currentRoute = route;
      routes[route](mainContent, params);
    } else if (routes['404']) {
      routes['404'](mainContent, params);
    }

    // Scroll to top
    mainContent?.scrollTo(0, 0);
    window.scrollTo(0, 0);

    // Close sidebar on mobile
    document.querySelector('.sidebar')?.classList.remove('open');
    document.querySelector('.sidebar-overlay')?.classList.remove('show');
  }

  function init() {
    window.addEventListener('hashchange', handleRoute);
    // Initial route
    handleRoute();
  }

  return { register, navigate, init, setBeforeHook, handleRoute };
})();
