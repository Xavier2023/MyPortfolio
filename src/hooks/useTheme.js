import { useCallback, useEffect, useState } from "react";

// Applies the saved light/dark preference to <body> and keeps it in localStorage.
export default function useTheme() {
  const [isLight, setIsLight] = useState(
    () => localStorage.getItem("theme") === "light"
  );

  useEffect(() => {
    document.body.classList.toggle("light-mode", isLight);
    localStorage.setItem("theme", isLight ? "light" : "dark");
  }, [isLight]);

  const toggleTheme = useCallback(() => setIsLight((light) => !light), []);

  return { isLight, toggleTheme };
}
