import { useEffect, useRef, useState } from "react";

// Click-to-play video with an overlay, loading spinner and progress bar.
export default function VideoPlayer({ src, isActive }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [progress, setProgress] = useState(0);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().catch((error) => {
        console.error("Error playing video:", error);
        setIsWaiting(false);
      });
    } else {
      video.pause();
    }
  };

  // Keyboard shortcuts apply to the slide currently on screen.
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event) => {
      const video = videoRef.current;
      if (!video) return;

      if (event.code === "Space" || event.code === "KeyK") {
        event.preventDefault();
        togglePlayPause();
      } else if (event.code === "KeyM") {
        event.preventDefault();
        video.muted = !video.muted;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  // Leaving a slide should not leave its video playing behind the scenes.
  useEffect(() => {
    if (!isActive) videoRef.current?.pause();
  }, [isActive]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video?.duration) {
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) videoRef.current.currentTime = 0;
  };

  return (
    <div className="group relative size-full overflow-hidden rounded-2xl bg-ink">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        preload="metadata"
        className="size-full cursor-pointer object-contain"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onWaiting={() => setIsWaiting(true)}
        onCanPlay={() => setIsWaiting(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
      >
        Your browser does not support the video tag.
      </video>

      <div
        onClick={togglePlayPause}
        className={[
          "absolute inset-x-0 top-0 bottom-1 cursor-pointer bg-gradient-to-b from-black/15 to-black/50 transition-opacity duration-300",
          isPlaying ? "pointer-events-none opacity-0" : "opacity-100",
        ].join(" ")}
      />

      <button
        type="button"
        onClick={togglePlayPause}
        tabIndex={isActive ? 0 : -1}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        className={[
          "absolute top-1/2 left-1/2 z-10 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-black/65 text-2xl text-white backdrop-blur-md transition duration-300 hover:scale-110 hover:border-transparent hover:bg-accent hover:text-on-accent",
          isWaiting ? "hidden" : "grid",
          isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100",
        ].join(" ")}
      >
        <i className={`bx ${isPlaying ? "bx-pause" : "bx-play"}`} />
      </button>

      {isWaiting && (
        <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
          <i className="bx bx-loader-alt bx-spin" />
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 z-10 h-1 overflow-hidden bg-white/15">
        <div
          className="h-full bg-accent transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
