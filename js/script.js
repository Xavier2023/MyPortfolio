const resumeBtns = document.querySelectorAll('.resume-btn');
const resumeDetails = document.querySelectorAll('.resume-details');
const arrowRight = document.querySelector('.portfolio-box .navigation .arrow-right');
const arrowLeft = document.querySelector('.portfolio-box .navigation .arrow-left');
const lightMode = document.querySelector('#light-mode');
const menuIcon = document.querySelector('#menu-icon');
const navBar = document.querySelector('header nav');
const Link = document.querySelector('a');


emailjs.init("z0XhFgiiMVOB6Nc7R");

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



// Contact form initialization
function initializeContactForm() {
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const status = document.getElementById("status");

  if (contactForm) {
    // DON'T clone the form - just add the event listener directly
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Form submission started");

      // Get form values from THIS form (not global document)
      const name = this.querySelector("#name").value.trim();
      const email = this.querySelector("#email").value.trim();
      const phone = this.querySelector("#phone").value.trim();
      const subject = this.querySelector("#subject").value.trim();
      const message = this.querySelector("#message").value.trim();

      // Validate form
      if (!name || !email || !subject || !message) {
        showToast("Please fill in all required fields", "error");
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showToast("Please enter a valid email address", "error");
        return;
      }

      // Show loading state
      submitBtn.classList.add("btn-loading");
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="bx bx-loader-alt"></i> Sending...';

      try {
        // Prepare template parameters
        const templateParams = {
          name: name,
          email: email,
          phone: phone || "Not provided",
          message: message,
          date: new Date().toLocaleString(),
          subject: subject,
        };

        console.log("Sending email with params:", templateParams);

        // Send email using EmailJS
        const response = await emailjs.send(
          "service_lr83vhf",
          "template_2dfbv1r",
          templateParams
        );

        console.log("EmailJS response:", response);

        // Show success message
        showToast(
          "Message sent successfully! I'll get back to you soon.",
          "success"
        );

        // Clear form
        this.reset();

        // Update status element
        if (status) {
          status.textContent = "Message sent successfully!";
          status.style.color = "#4CAF50";
          setTimeout(() => {
            status.textContent = "";
          }, 5000);
        }
      } catch (error) {
        console.error("Error sending email:", error);
        showToast("Failed to send message. Please try again later.", "error");

        if (status) {
          status.textContent = "Error sending message. Please try again.";
          status.style.color = "#FF5252";
        }
      } finally {
        // Reset button state
        submitBtn.classList.remove("btn-loading");
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="bx bx-send"></i> Send Message';
      }
    });

    // Optional: Add input validation
    document
      .querySelectorAll("#contact-form input, #contact-form textarea")
      .forEach((input) => {
        input.addEventListener("input", function () {
          this.classList.remove("error");
          if (status) status.textContent = "";
        });
      });
  }
}

// Toast notification function
function showToast(message, type = "info") {
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