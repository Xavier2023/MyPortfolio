// portfolio.js
document.addEventListener("DOMContentLoaded", () => {
  console.log("Initializing portfolio page...");

  const arrowRight = document.querySelector(
    ".portfolio-box .navigation .arrow-right"
  );
  const arrowLeft = document.querySelector(
    ".portfolio-box .navigation .arrow-left"
  );

  // Initialize video controls
  initializeVideoControls();

  if (arrowRight && arrowLeft) {
    console.log("Found portfolio navigation arrows");

    let index = 0;
    const portfolioDetails = document.querySelectorAll(".portfolio-detail");
    const totalItems = portfolioDetails.length;

    console.log(`Total portfolio items: ${totalItems}`);

    const activePortfolio = () => {
      const imgSlide = document.querySelector(".portfolio-carousel .img-slide");

      if (imgSlide) {
        // Calculate the transform with gap
        const gap = 2; // rem
        const translateX = index * -100;
        imgSlide.style.transform = `translateX(calc(${translateX}% - ${
          index * gap
        }rem))`;
        console.log(
          `Transform: translateX(calc(${translateX}% - ${index * gap}rem))`
        );
      }

      // Update active portfolio detail
      portfolioDetails.forEach((detail, i) => {
        if (i === index) {
          detail.classList.add("active");
        } else {
          detail.classList.remove("active");
        }
      });

      // Update arrow states
      arrowLeft.classList.toggle("disabled", index === 0);
      arrowRight.classList.toggle("disabled", index === totalItems - 1);

      console.log(
        `Current index: ${index}, Left disabled: ${
          index === 0
        }, Right disabled: ${index === totalItems - 1}`
      );
    };

    arrowRight.addEventListener("click", () => {
      console.log("Right arrow clicked");
      if (index < totalItems - 1) {
        index++;
        activePortfolio();
      }
    });

    arrowLeft.addEventListener("click", () => {
      console.log("Left arrow clicked");
      if (index > 0) {
        index--;
        activePortfolio();
      }
    });

    // Initialize active state
    activePortfolio();

    // Log the elements for debugging
    console.log("Arrow Right:", arrowRight);
    console.log("Arrow Left:", arrowLeft);
    console.log(
      "Image Slide:",
      document.querySelector(".portfolio-carousel .img-slide")
    );
    console.log("Portfolio Details:", portfolioDetails);
  } else {
    console.error("Could not find portfolio navigation arrows");
    console.log("Arrow Right found:", !!arrowRight);
    console.log("Arrow Left found:", !!arrowLeft);
  }
});

// Video Player Controls
function initializeVideoControls() {
  console.log("Initializing video controls...");

  // Get all videos in the carousel
  const videos = document.querySelectorAll(".img-item video");

  videos.forEach((video, index) => {
    console.log(`Setting up video ${index + 1}`);

    // Remove autoplay and loop attributes
    video.removeAttribute("autoplay");
    video.removeAttribute("loop");
    video.controls = false; // We'll use our own controls

    // Create video container if it doesn't exist
    let videoContainer = video.parentElement;
    if (!videoContainer.classList.contains("video-container")) {
      videoContainer.classList.add("video-container");

      // Create play/pause button
      const playButton = document.createElement("button");
      playButton.className = "video-play-btn";
      playButton.innerHTML = '<i class="bx bx-play"></i>';
      playButton.setAttribute("aria-label", "Play video");

      // Create loading spinner
      const spinner = document.createElement("div");
      spinner.className = "video-loading";
      spinner.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i>';

      // Create video overlay
      const overlay = document.createElement("div");
      overlay.className = "video-overlay";
      const progressBar = document.createElement("div");
      progressBar.className = "video-progress";
      const progressBarInner = document.createElement("div");
      progressBarInner.className = "video-progress-bar";
      progressBar.appendChild(progressBarInner);
      videoContainer.appendChild(progressBar);

      // Append elements
      videoContainer.appendChild(overlay);
      videoContainer.appendChild(playButton);
      videoContainer.appendChild(spinner);

      // Add click event to play button
      playButton.addEventListener("click", () => {
        togglePlayPause(video, playButton, spinner);
      });

      // Add click event to video overlay
      overlay.addEventListener("click", () => {
        togglePlayPause(video, playButton, spinner);
      });

      // Video event listeners
      video.addEventListener("play", () => {
        playButton.innerHTML = '<i class="bx bx-pause"></i>';
        playButton.classList.add("playing");
        overlay.classList.add("hidden");
      });

      video.addEventListener("pause", () => {
        playButton.innerHTML = '<i class="bx bx-play"></i>';
        playButton.classList.remove("playing");
        overlay.classList.remove("hidden");
      });

      video.addEventListener("ended", () => {
        playButton.innerHTML = '<i class="bx bx-play"></i>';
        playButton.classList.remove("playing");
        overlay.classList.remove("hidden");
        video.currentTime = 0; // Reset to beginning
      });

      video.addEventListener("waiting", () => {
        spinner.style.display = "block";
        playButton.style.display = "none";
      });

      video.addEventListener("canplay", () => {
        spinner.style.display = "none";
        playButton.style.display = "flex";
      });

      video.addEventListener("timeupdate", () => {
        // Update progress if needed
        updateVideoProgress(video);
      });
    }
  });

  console.log(`Video controls initialized for ${videos.length} videos`);
}

function togglePlayPause(video, playButton, spinner) {
  if (video.paused || video.ended) {
    video.play().catch((error) => {
      console.error("Error playing video:", error);
      spinner.style.display = "none";
      playButton.style.display = "flex";
    });
  } else {
    video.pause();
  }
}

// Update the updateVideoProgress function
function updateVideoProgress(video) {
  const progressBar = video.parentElement.querySelector(".video-progress-bar");
  if (progressBar) {
    const progress = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
  }
}

// Optional: Add keyboard controls
document.addEventListener("keydown", (e) => {
  const activeVideo = document.querySelector(
    ".portfolio-detail.active .img-item video"
  );
  if (!activeVideo) return;

  const playButton = activeVideo.parentElement.querySelector(".video-play-btn");
  const spinner = activeVideo.parentElement.querySelector(".video-loading");

  if (e.code === "Space" || e.code === "KeyK") {
    e.preventDefault();
    togglePlayPause(activeVideo, playButton, spinner);
  } else if (e.code === "KeyM") {
    e.preventDefault();
    activeVideo.muted = !activeVideo.muted;
  }
});
