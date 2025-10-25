const sidebar = document.getElementById('sidebar'); 
const overlay = document.getElementById('overlay');
const hamburger = document.getElementById('hamburger');
const closeSidebar = document.getElementById('closeSidebar');
const minimizeBtn = document.getElementById('minimizeBtn');
const expandBtn = document.getElementById('expandSidebar');

// Mobile sidebar toggle
hamburger.addEventListener('click', () => {
  sidebar.classList.add('active');
  overlay.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

overlay.addEventListener('click', () => {
  sidebar.classList.remove('active');
  overlay.classList.remove('active');
});

// Minimize sidebar
minimizeBtn.addEventListener('click', () => {
  sidebar.classList.toggle('minimized');
  document.body.classList.toggle('sidebar-minimized');

  if (sidebar.classList.contains('minimized')) {
    document.querySelectorAll('.submenu-wrapper.active').forEach(wrapper => {
      wrapper.classList.remove('active');
      wrapper.querySelector('.submenu').style.maxHeight = null;
    });
  }
});

// Expand sidebar
expandBtn.addEventListener('click', () => {
  sidebar.classList.remove('minimized');
  document.body.classList.remove('sidebar-minimized');
});

// Submenu toggle
document.querySelectorAll('.submenu-toggle').forEach(button => {
  button.addEventListener('click', () => {
    if (sidebar.classList.contains('minimized')) return;

    const wrapper = button.parentElement;
    const submenu = wrapper.querySelector('.submenu');

    if (wrapper.classList.contains('active')) {
      wrapper.classList.remove('active');
      submenu.style.maxHeight = null;
      return;
    }

    // Close other submenus
    document.querySelectorAll('.submenu-wrapper.active').forEach(other => {
      if (other === wrapper) return;
      other.classList.remove('active');
      other.querySelector('.submenu').style.maxHeight = null;
    });

    // Open clicked submenu
    wrapper.classList.add('active');
    submenu.style.maxHeight = submenu.scrollHeight + 'px';
  });
});

// Dynamic navbar 
function updateNavbarTitle(title) {
  const h1 = document.querySelector('.navbar h1');
  if (!h1) return;
  h1.textContent = title;
  document.title = title + ' - NTSBook Dashboard';
}

function titleFromElement(el) {
  if (!el) return null;
  if (el.dataset && el.dataset.tooltip) return el.dataset.tooltip;
  const label = el.querySelector && el.querySelector('.label');
  if (label) return label.textContent.trim();
  return el.textContent.trim();
}

// Update title only when menu links or submenu links are clicked
document.querySelectorAll('.menu a, .submenu a').forEach(node => {
  node.addEventListener('click', (e) => {
    const t = titleFromElement(node);
    if (t) updateNavbarTitle(t);
  });
});

// Set initial navbar title on load: prefer any active menu item, otherwise Dashboard
document.addEventListener('DOMContentLoaded', () => {
  const active = document.querySelector('.menu a.active') || document.querySelector('.menu a');
  const initial = titleFromElement(active) || 'Dashboard';
  updateNavbarTitle(initial);

  // Handle menu item clicks to load different pages
  const mainContent = document.getElementById('main-content');
  
  // Map of data-tooltip values to page IDs
  const pageMap = {
    'Dashboard': 'dashboard',
    'Organisation': 'organisation',
    'Branch': 'branch',
    'Location': 'location',
    'Customer': 'customer',
    'Supplier': 'supplier',
    'Inventory': 'inventory',
    'Estimation': 'estimation',
    'Day Books': 'daybooks',
    'Delivery': 'delivery',
    'Invoice': 'invoice',
    'Returns': 'returns',
    'Reports': 'reports',
    'Online Store': 'onlinestore',
    'Dairy Shop': 'dairyshop',
    'Dairy List': 'dairylist',
    'Create User': 'createuser',
    'User List': 'userlist',
    'Role Access': 'roleaccess',
    'User Access': 'useraccess',
    'Tractor': 'tractor',
    'Tractor Rent': 'tractorrent',
    'Tractor Rent by Customer': 'tractorbycustomer',
    'Membership': 'membership'
  };

  // Function to update active menu item
  function setActiveMenuItem(clickedLink) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu a').forEach(link => link.classList.remove('active'));
    // Add active class to clicked item
    clickedLink.classList.add('active');
  }

  // Handle clicks on menu items
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default link behavior
      
      // Get the page ID from the tooltip
      const pageId = pageMap[link.getAttribute('data-tooltip')];
      if (pageId) {
        // Update data-page attribute
        mainContent.setAttribute('data-page', pageId);
        // Set this item as active
        setActiveMenuItem(link);
        // Close mobile sidebar if open
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
      }
    });
  });
});

// Profile dropdown (right side)
const profile = document.getElementById('profileMenu');
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

if (profileBtn && profileDropdown && profile) {
  // Toggle dropdown
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = profile.classList.toggle('open');
    profileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    profileDropdown.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
  });

  // Prevent clicks inside dropdown from closing
  profileDropdown.addEventListener('click', (e) => e.stopPropagation());

  // Close when clicking outside
  document.addEventListener('click', () => {
    if (profile.classList.contains('open')) {
      profile.classList.remove('open');
      profileBtn.setAttribute('aria-expanded', 'false');
      profileDropdown.setAttribute('aria-hidden', 'true');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && profile.classList.contains('open')) {
      profile.classList.remove('open');
      profileBtn.setAttribute('aria-expanded', 'false');
      profileDropdown.setAttribute('aria-hidden', 'true');
    }
  });

  // Close dropdown when a menu item is clicked (optional behavior)
  profileDropdown.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      profile.classList.remove('open');
      profileBtn.setAttribute('aria-expanded', 'false');
      profileDropdown.setAttribute('aria-hidden', 'true');
    });
  });
}
// ============================
// Dynamic Page Loader
// ============================

document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main-content');

  const pages = {
    dashboard: 'pages/dashboard.html',
    organisation: 'pages/organisation.html',
    branch: 'pages/branch.html',
    location: 'pages/location.html',
    customer: 'pages/customer.html',
    supplier: 'pages/supplier.html',
    inventory: 'pages/inventory.html',
    estimation: 'pages/estimation.html',
    daybooks: 'pages/daybooks.html',
    delivery: 'pages/delivery.html',
    invoice: 'pages/invoice.html',
    returns: 'pages/returns.html',
    reports: 'pages/reports.html',
    onlinestore: 'pages/onlinestore.html',
    dairyshop: 'pages/dairyshop.html',
    dairylist: 'pages/dairylist.html',
    createuser: 'pages/createuser.html',
    userlist: 'pages/userlist.html',
    roleaccess: 'pages/roleaccess.html',
    useraccess: 'pages/useraccess.html',
    tractor: 'pages/tractor.html',
    tractorrent: 'pages/tractorrent.html',
    tractorbycustomer: 'pages/tractorbycustomer.html',
    membership: 'pages/membership.html'
  };

  const cssFiles = {
    dashboard: 'assets/css/pages/dashboard.css',
    organisation: 'assets/css/pages/organisation.css',
    branch: 'assets/css/pages/branch.css',
    location: 'assets/css/pages/location.css',
    customer: 'assets/css/pages/customer.css',
    supplier: 'assets/css/pages/supplier.css',
    inventory: 'assets/css/pages/inventory.css',
    estimation: 'assets/css/pages/estimation.css',
    daybooks: 'assets/css/pages/daybooks.css',
    delivery: 'assets/css/pages/delivery.css',
    invoice: 'assets/css/pages/invoice.css',
    returns: 'assets/css/pages/returns.css',
    reports: 'assets/css/pages/reports.css',
    onlinestore: 'assets/css/pages/onlinestore.css',
    dairyshop: 'assets/css/pages/dairyshop.css',
    dairylist: 'assets/css/pages/dairylist.css',
    createuser: 'assets/css/pages/createuser.css',
    userlist: 'assets/css/pages/userlist.css',
    roleaccess: 'assets/css/pages/roleaccess.css',
    useraccess: 'assets/css/pages/useraccess.css',
    tractor: 'assets/css/pages/tractor.css',
    tractorrent: 'assets/css/pages/tractorrent.css',
    tractorbycustomer: 'assets/css/pages/tractorbycustomer.css',
    membership: 'assets/css/pages/membership.css'
  };

  // Show loading animation
  function showLoading() {
    main.innerHTML = `
      <div class="loading">
        <div class="spinner"></div>
        <p>Loading...</p>
      </div>`;
  }

  // Load HTML + CSS
  function loadPageContent(page) {
    if (!pages[page]) {
      main.innerHTML = `<p style="color:red;">Page not found</p>`;
      return;
    }

    showLoading();

    // Remove previous page CSS
    const oldCss = document.getElementById('page-style');
    if (oldCss) oldCss.remove();

    // Inject new CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFiles[page];
    link.id = 'page-style';
    document.head.appendChild(link);

    // Fetch HTML
    fetch(pages[page])
      .then(res => {
        if (!res.ok) throw new Error('Development in progress...');
        return res.text();
      })
      .then(html => {
        main.innerHTML = html;
      })
      .catch(err => {
        main.innerHTML = `<p style="color:red;">${err.message}</p>`;
      });
  }

  // Observe when data-page changes
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.attributeName === 'data-page') {
        const newPage = main.getAttribute('data-page');
        loadPageContent(newPage);
      }
    });
  });

  observer.observe(main, { attributes: true });

  // Initial load (Dashboard)
  const initialPage = main.getAttribute('data-page') || 'dashboard';
  loadPageContent(initialPage);
});
