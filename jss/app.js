// DOM Element Nodes Retrieval Core
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");
const navButtons = document.querySelectorAll(".nav-link-btn");
const searchInput = document.getElementById("searchInput");
const mobileQuery = window.matchMedia("(max-width: 991px)");

// Views Mapping System Elements
const viewsList = document.querySelectorAll(".dashboard-view");
const viewIds = ["overview-view", "fleet-view", "alerts-view", "missions-view"];

// Toggle Map Elements 
const toggleMapBtn = document.getElementById("toggleMap");
const mapColumnContainer = document.getElementById("mapColumnContainer");
const missionColumnContainer = document.getElementById("missionColumnContainer");

/* ----------------------------------------------------
   Navigation Router Engine Implementation
------------------------------------------------------- */
function switchDashboardView(targetIndex) {
  // 1. Deactivate current active statuses everywhere
  viewsList.forEach(view => {
    view.classList.remove("active-view");
  });
  navButtons.forEach(btn => btn.classList.remove("active"));

  // 2. Activate target paths
  const targetViewId = viewIds[targetIndex];
  const targetViewNode = document.getElementById(targetViewId);
  
  if (targetViewNode) {
    targetViewNode.classList.add("active-view");
    navButtons[targetIndex].classList.add("active");
  }
}

// Map click handlers across Sidebar Button matrices arrays
navButtons.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    switchDashboardView(index);
    if (mobileQuery.matches) {
      closeSidebar();
    }
  });
});

/* ----------------------------------------------------
   Mobile Layer Controllers
------------------------------------------------------- */
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

function syncLayoutForScreen() {
  if (!mobileQuery.matches) {
    closeSidebar();
  }
}
mobileQuery.addEventListener("change", syncLayoutForScreen);
syncLayoutForScreen();

/* ----------------------------------------------------
   Interactive Core Features (Premium Touch-ups)
------------------------------------------------------- */

// A. Map Expansion Mechanics System
if (toggleMapBtn) {
  toggleMapBtn.addEventListener("click", () => {
    const isExpanded = mapColumnContainer.classList.contains("map-expanded-fullscreen");
    
    if (!isExpanded) {
      // Transition view to layout mode configuration wide
      missionColumnContainer.style.display = "none";
      mapColumnContainer.classList.add("map-expanded-fullscreen");
      toggleMapBtn.innerHTML = '<i class="bi bi-fullscreen-exit me-1"></i> Restore Context';
    } else {
      // Revert mapping layout tracking systems context blocks
      missionColumnContainer.style.display = "block";
      mapColumnContainer.classList.remove("map-expanded-fullscreen");
      toggleMapBtn.innerHTML = '<i class="bi bi-fullscreen me-1"></i> Expand Context';
    }
  });
}

// B. Live Local Search Table Filtering Engine
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchVal = e.target.value.toLowerCase().trim();
    const tableRows = document.querySelectorAll("#droneTableBody tr");
    const noResultsNode = document.getElementById("noResults");
    let visibleCount = 0;

    tableRows.forEach(row => {
      const rowContent = row.textContent.toLowerCase();
      if (rowContent.includes(searchVal)) {
        row.style.display = "";
        visibleCount++;
      } else {
        row.style.display = "none";
      }
    });

    // Handle exception feedback rendering metrics
    if (visibleCount === 0 && tableRows.length > 0) {
      noResultsNode.classList.remove("d-none");
    } else {
      noResultsNode.classList.add("d-none");
    }
  });
}

// C. Keyboard Shortcut Listener (Ctrl + K Focus Mapping)
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
    e.preventDefault();
    searchInput.focus();
  }
});

/* ----------------------------------------------------
   Step 4 Additions: Tactical Modals Interaction Engine
------------------------------------------------------- */

// Initialize Bootstraps native Modal construct linkages
const intelModal = new bootstrap.Modal(document.getElementById('intelModal'));
const utilityModal = new bootstrap.Modal(document.getElementById('utilityModal'));

const intelTitle = document.getElementById('intelTitle');
const intelBody = document.getElementById('intelBody');
const utilityTitle = document.getElementById('utilityTitle');
const utilityBody = document.getElementById('utilityBody');

// A. Intercept clicks on any system alert items dynamically
document.addEventListener('click', (e) => {
  const alertNode = e.target.closest('.alert-item');
  if (alertNode) {
    const boldText = alertNode.querySelector('strong')?.innerText || "System Alert Exception";
    const subText = alertNode.querySelector('p')?.innerText || alertNode.querySelector('.text-muted')?.innerText || "No auxiliary data strings returned.";
    
    intelTitle.innerHTML = `<i class="bi bi-exclamation-octagon-fill me-2 text-danger"></i> ${boldText}`;
    intelBody.innerText = subText;
    intelModal.show();
  }
});

// B. Profile Icon Interface Interaction Link
const profileBtn = document.querySelector('button[aria-label="Profile"]');
if (profileBtn) {
  profileBtn.addEventListener('click', () => {
    utilityTitle.innerText = "Command Operator Terminal";
    utilityBody.innerText = "Console ID: HQ-SECURE-09 // Active Duty Fleet Controller";
    utilityModal.show();
  });
}

// C. Notifications Icon Interface Interaction Link
const notificationBtn = document.querySelector('button[aria-label="Notifications"]');
if (notificationBtn) {
  notificationBtn.addEventListener('click', () => {
    intelTitle.innerHTML = `<i class="bi bi-bell-fill me-2 text-warning"></i> Incident Feed Summary`;
    intelBody.innerText = "There are currently 3 unacknowledged hardware warning signals streaming from perimeter tracking boundaries.";
    intelModal.show();
  });
}

// D. Sidebar Footer System Status Widget Click Event
const sidebarFooterStatus = document.querySelector('.sidebar-footer');
if (sidebarFooterStatus) {
  sidebarFooterStatus.style.cursor = 'pointer';
  sidebarFooterStatus.addEventListener('click', () => {
    utilityTitle.innerText = "System Health Core Diagnostics";
    utilityBody.innerText = "All local subsystem processes, Leaflet mapping clusters, and telemetry parsers are operating inside normal parameters. Latency: 12ms.";
    utilityModal.show();
  });
}
