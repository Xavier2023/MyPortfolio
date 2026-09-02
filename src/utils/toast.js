import Toastify from "toastify-js";

const BACKGROUNDS = {
  success: "linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)",
  error: "linear-gradient(135deg, #FF5252 0%, #B71C1C 100%)",
  info: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
};

export default function showToast(message, type = "info") {
  Toastify({
    text: message,
    duration: 4000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    className: type === "info" ? "toastify" : `toastify-${type}`,
    style: { background: BACKGROUNDS[type] ?? BACKGROUNDS.info },
  }).showToast();
}
