const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-details');
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const lightMode = document.querySelector('#light-mode');
const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('header nav');
const Link = document.querySelector('a');

// Prevent default behavior for all anchor clicks (adjust if needed)
Link.addEventListener('click', (e) => {
    e.preventDefault();
});

// Load saved theme preference from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        lightMode.classList.remove('bx-moon');
        lightMode.classList.add('bx-sun');
    } else {
        document.body.classList.remove('light-mode');
        lightMode.classList.remove('bx-sun');
        lightMode.classList.add('bx-moon');
    }
});

// Toggle light/dark mode and store preference
lightMode.addEventListener('click', () => {
    lightMode.classList.toggle('bx-moon');
    lightMode.classList.toggle('bx-sun');
    document.body.classList.toggle('light-mode');

    const isLightMode = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
});

// Toggle mobile nav
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
});

// Resume section toggle
resumeBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        resumeDetails.forEach(detail => detail.classList.remove('active'));
        resumeBtns.forEach(btn => btn.classList.remove('active'));

        btn.classList.add('active');
        resumeDetails[index].classList.add('active');
    });
});

// Portfolio carousel functionality
let index = 0;

const activePortfolio = () => {
    const imgSlide = document.querySelector('.portfolio-carousel .img-slide');
    const portfolioDetails = document.querySelectorAll('.portfolio-detail');

    imgSlide.style.transform = `translateX(calc(${index * -100}% - ${index * 2}rem))`;

    portfolioDetails.forEach(detail => detail.classList.remove('active'));
    portfolioDetails[index].classList.add('active');
};

arrowRight.addEventListener('click', () => {
    if (index < 5) {
        index++;
        arrowLeft.classList.remove('disabled');
    } else {
        index = 6;
        arrowRight.classList.add('disabled');
    }
    activePortfolio();
});

arrowLeft.addEventListener('click', () => {
    if (index > 1) {
        index--;
        arrowRight.classList.remove('disabled');
    } else {
        index = 0;
        arrowLeft.classList.add('disabled');
    }
    activePortfolio();
});


const contactForm = document.getElementById("contact-form");
const statusMsg = document.getElementById("status");

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusMsg.textContent = "Sending message...";
    statusMsg.style.color = "var(--text-color)";

    const formData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      subject: document.getElementById("subject").value,
      message: document.getElementById("message").value,
    };

    try {
      const res = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        statusMsg.textContent = "✅ Message sent successfully!";
        statusMsg.style.color = "green";
        contactForm.reset();
      } else {
        statusMsg.textContent =
          "❌ Failed to send message. Please try again later.";
        statusMsg.style.color = "red";
      }
    } catch (err) {
      statusMsg.textContent = "⚠️ Network error. Please check your connection.";
      statusMsg.style.color = "orange";
      console.error(err);
    }
  });
}
