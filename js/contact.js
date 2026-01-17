document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing contact page...");

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    console.log("Found contact form");

    const submitBtn = document.getElementById("submit-btn");
    const status = document.getElementById("status");

    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      console.log("Contact form submission started");

      // Get form values
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

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
        contactForm.reset();

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

    console.log("Contact form initialized successfully");
  } else {
    console.error("Could not find contact form");
  }
});
