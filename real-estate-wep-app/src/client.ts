import { AuthUtils } from "./services/state/authUtil";

const isClient = AuthUtils.isClient(window.location.pathname);

if(isClient){
  //Update body tag class name
  document.body.className = "homepage1-body";
  document.body.style.overflow = "inherit";

  // Client-specific styles
  const clientStyles = [
    "/client/css/plugins/bootstrap.min.css",
    "/client/css/plugins/aos.css",
    "/client/css/plugins/fontawesome.css",
    "/client/css/plugins/magnific-popup.css",
    "/client/css/plugins/mobile.css",
    "/client/css/plugins/owlcarousel.min.css",
    "/client/css/plugins/sidebar.css",
    "/client/css/plugins/slick-slider.css",
    "/client/css/plugins/nice-select.css",
    "/client/css/plugins/swiper-slider.css",
    "/client/css/main.css",
  ];

  // Client-specific scripts
  const clientScripts = [
    "/client/js/plugins/bootstrap.min.js",
    "/client/js/plugins/fontawesome.js",
    "/client/js/plugins/aos.js",
    "/client/js/plugins/counter.js",
    "/client/js/plugins/gsap.min.js",
    "/client/js/plugins/ScrollTrigger.min.js",
    "/client/js/plugins/Splitetext.js",
    "/client/js/plugins/sidebar.js",
    "/client/js/plugins/swiper-slider.js",
    "/client//js/plugins/magnific-popup.js",
    "/client/js/plugins/mobilemenu.js",
    "/client/js/plugins/owlcarousel.min.js",
    "/client/js/plugins/nice-select.js",
    "/client/js/plugins/waypoints.js",
    "/client/js/plugins/slick-slider.js",
    "/client/js/plugins/circle-progress.js",
    "/client/js/main.js",
  ];

  // Dynamically add styles
  clientStyles.forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });

  const specialScript = document.createElement("script");
  specialScript.src = "/client/js/plugins/jquery-3-7-1.min.js";
  document.head.appendChild(specialScript);

  // Dynamically add scripts
  clientScripts.forEach((src) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
  });
}
