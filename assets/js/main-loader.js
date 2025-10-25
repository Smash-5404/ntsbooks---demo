document.addEventListener("DOMContentLoaded", () => {
  const main = document.getElementById("main-content");

  // Function to show loading state
  function showLoading() {
    main.innerHTML = `
      <div class="loading-container">
        <div class="loading-spinner"></div>
      </div>
    `;
  }

  // Load page content when data-page attribute changes
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === 'data-page') {
        loadPageContent(main.getAttribute('data-page'));
      }
    });
  });

  // Start observing the main element for data-page changes
  observer.observe(main, { attributes: true });

  // Initial page load
  const page = main.getAttribute("data-page");

  const pages = {
    dashboard: "pages/dashboard.html",
    organisation: "pages/organisation.html",
    branch: "pages/branch.html",
    location: "pages/location.html",
    customer: "pages/customer.html",
    supplier: "pages/supplier.html",
    inventory: "pages/inventory.html",
    estimation: "pages/estimation.html",
    daybooks: "pages/daybooks.html",
    delivery: "pages/delivery.html",
    invoice: "pages/invoice.html",
    returns: "pages/returns.html",
    reports: "pages/reports.html",
    onlinestore: "pages/onlinestore.html",
    dairyshop: "pages/dairyshop.html",
    dairylist: "pages/dairylist.html",
    createuser:"pages/createuser.html",
    userlist:"pages/user-list.html",
    roleaccess:"pages/role-access.html",
    useraccess:"pages/user-access.html",
    tractor:"pages/tractor.html",
    tractorrent:"pages/tractor-rent.html",
    tractorbycustomer:"pages/tractor-rent-by-customer.html",
    membership:"pages/membership.html"
  };

  const cssFiles = {
    dashboard: "assets/css/pages/dashboard.css",
    organisation: "assets/css/pages/organisation.css",
    branch: "assets/css/pages/branch.css",
    location: "assets/css/pages/location.css",
    customer: "assets/css/pages/customer.css",
    supplier: "assets/css/pages/supplier.css",
    inventory: "assets/css/pages/inventory.css",
    estimation: "assets/css/pages/estimation.css",
    daybooks: "assets/css/pages/daybooks.css",
    delivery: "assets/css/pages/delivery.css",
    invoice: "assets/css/pages/invoice.css",
    returns: "assets/css/pages/returns.css",
    reports: "assets/css/pages/reports.css",
    onlinestore: "assets/css/pages/onlinestore.css",
    dairyshop: "assets/css/pages/dairyshop.css",
    dairylist: "assets/css/pages/dairylist.css",
    createuser:"assets/css/pages/createuser.css",
    userlist:"assets/css/pages/user-list.css",
    roleaccess:"assets/css/pages/role-access.css",
    useraccess:"assets/css/pages/user-access.css",
    tractor:"assets/css/pages/tractor.css",
    tractorrent:"assets/css/pages/tractor-rent.css",
    tractorbycustomer:"assets/css/pages/tractor-rent-by-customer.css",
    membership:"assets/css/pages/membership.css"
  };

  // Remove any previously loaded page CSS
  const oldCss = document.getElementById("page-style");
  if (oldCss) oldCss.remove();

  // Load new page CSS
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = cssFiles[page];
  link.id = "page-style";
  document.head.appendChild(link);

  // Function to load page content
  function loadPageContent(page) {
    if (!pages[page]) {
      main.innerHTML = '<p style="color:red;">Page not found</p>';
      return;
    }

    showLoading();

    // Load HTML content
    fetch(pages[page])
      .then(res => {
        if (!res.ok) throw new Error("Development in progress");
        return res.text();
      })
      .then(html => {
        main.innerHTML = html;
      })
      .catch(err => {
        main.innerHTML = `<p style="color:red;">${err.message}</p>`;
      });
  }

  // Initial page load if page is set
  if (page) {
    loadPageContent(page);
  }
});
