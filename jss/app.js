const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const navButtons = document.querySelectorAll(".nav-link-btn");
const searchInput = document.getElementById("searchInput");
const mobileQuery = window.matchMedia("(max-width: 991px)");

function openSidebar() {
  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");
}

menuBtn.addEventListener("click", () => {
  if (sidebar.classList.contains("open")) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

sidebarOverlay.addEventListener("click", closeSidebar);

navButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    navButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");

    if (mobileQuery.matches) {
      closeSidebar();
    }
  });
});

function syncLayoutForScreen() {
  if (!mobileQuery.matches) {
    closeSidebar();
  }
}

mobileQuery.addEventListener("change", syncLayoutForScreen);
syncLayoutForScreen();

// Premium Touchup: Global Keyboard shortcut focus for Search Container (Ctrl + K)
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});