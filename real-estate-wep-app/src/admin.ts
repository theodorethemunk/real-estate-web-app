import { AuthUtils } from "./services/state/authUtil";

const isAdmin = AuthUtils.isAdmin(window.location.pathname);

if(isAdmin){
  //Update body tag ID
  document.body.id = "layout-wrapper";
  
  // Admin-specific styles
  const adminStyles = [
    "//admin/css/bootstrap.min.css",
    "//admin/css/icons.min.css",
    "//admin/css/app.min.css",
    "//admin/css/custom.min.css",
    "//admin/libs/jsvectormap/css/jsvectormap.min.css",
  ];

  // Admin-specific scripts
  const adminScripts = [
    "//admin/libs/bootstrap/js/bootstrap.bundle.min.js",
    "//admin/libs/simplebar/simplebar.min.js",
    "//admin/libs/node-waves/waves.min.js",
    "//admin/libs/feather-icons/feather.min.js",
    "//admin/js/plugins.js",
    "//admin/libs/apexcharts/apexcharts.min.js",
    "//admin/libs/jsvectormap/js/jsvectormap.min.js",
    "//admin/libs/jsvectormap/maps/world-merc.js",
    "//admin/js/pages/dashboard-analytics.init.js",
    "//admin/js/app.js",
    "//admin/libs/prismjs/prism.js",
  ];

  // Dynamically add styles
  adminStyles.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });

  // Dynamically add scripts
  adminScripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    script.defer = true; // Ensures scripts load in order without blocking
    document.body.appendChild(script);
  });
}

