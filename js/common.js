// Common elements that exist on all pages
const lightMode = document.querySelector("#light-mode");
const menuIcon = document.querySelector("#menu-icon");
const navBar = document.querySelector("header nav");

// Initialize EmailJS with your Public Key (for contact page)
emailjs.init("z0XhFgiiMVOB6Nc7R");

// Load saved theme preference from localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    lightMode.classList.remove("bx-moon");
    lightMode.classList.add("bx-sun");
  } else {
    document.body.classList.remove("light-mode");
    lightMode.classList.remove("bx-sun");
    lightMode.classList.add("bx-moon");
  }

  // Initialize common features
  initializeCommonFeatures();
});

// COMMON FEATURES (work on all pages)
function initializeCommonFeatures() {
  // Toggle light/dark mode and store preference
  if (lightMode) {
    lightMode.addEventListener("click", () => {
      lightMode.classList.toggle("bx-moon");
      lightMode.classList.toggle("bx-sun");
      document.body.classList.toggle("light-mode");

      const isLightMode = document.body.classList.contains("light-mode");
      localStorage.setItem("theme", isLightMode ? "light" : "dark");
    });
  }

  // Toggle mobile nav
  if (menuIcon && navBar) {
    menuIcon.addEventListener("click", () => {
      menuIcon.classList.toggle("bx-x");
      navBar.classList.toggle("active");
    });

    // Close mobile menu when clicking on nav links
    document.querySelectorAll("nav a").forEach((link) => {
      link.addEventListener("click", () => {
        menuIcon.classList.remove("bx-x");
        navBar.classList.remove("active");
      });
    });
  }
}

// Toast notification function (for contact page)
function showToast(message, type = "info") {
  // Check if Toastify is loaded
  if (typeof Toastify === "undefined") {
    console.warn("Toastify not loaded");
    // Fallback to alert
    alert(message);
    return;
  }

  Toastify({
    text: message,
    duration: 4000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className:
      type === "success"
        ? "toastify-success"
        : type === "error"
        ? "toastify-error"
        : "toastify",
    style: {
      background:
        type === "success"
          ? "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)"
          : type === "error"
          ? "linear-gradient(135deg, #FF5252 0%, #B71C1C 100%)"
          : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
  }).showToast();
}
