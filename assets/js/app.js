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
