import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useTheme from "../hooks/useTheme.js";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/resume", label: "Resume" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/contact", label: "Contact" },
];

const linkClass = ({ isActive }) =>
  [
    "block rounded-full px-5 py-2 text-center text-[15px] font-medium transition-colors duration-300 md:text-sm",
    isActive
      ? "bg-accent text-on-accent shadow-[0_4px_16px_var(--accent-glow)]"
      : "text-muted hover:bg-surface-hover hover:text-fg",
  ].join(" ");

export default function Header() {
  const { isLight, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-100 flex items-center justify-between gap-4 border-b border-line bg-[color-mix(in_srgb,var(--ink)_72%,transparent)] px-[5%] py-4 backdrop-blur-xl">
      <Link
        to="/"
        onClick={closeMenu}
        className="font-display text-2xl font-bold tracking-tight transition-opacity hover:opacity-70"
      >
        Anthony
        <span className="ml-1 inline-block size-2 rounded-full bg-accent align-middle shadow-[0_0_12px_var(--accent-glow)]" />
      </Link>

      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
        className="order-3 text-3xl leading-none text-fg md:hidden"
      >
        <i className={`bx ${menuOpen ? "bx-x" : "bx-menu"}`} />
      </button>

      <nav
        className={[
          "absolute inset-x-[4%] top-[calc(100%+0.75rem)] flex-col gap-1 rounded-2xl border border-line bg-[color-mix(in_srgb,var(--panel)_94%,transparent)] p-2 shadow-2xl backdrop-blur-xl",
          "md:static md:inset-auto md:flex md:w-auto md:flex-row md:gap-1 md:rounded-full md:bg-[color-mix(in_srgb,var(--surface)_60%,transparent)] md:p-1 md:shadow-none",
          menuOpen ? "flex animate-rise" : "hidden",
        ].join(" ")}
      >
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink key={to} to={to} end className={linkClass} onClick={closeMenu}>
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        className="grid size-10 shrink-0 place-items-center rounded-full border border-line bg-surface text-xl text-fg transition duration-300 hover:-rotate-12 hover:scale-110 hover:border-accent hover:text-accent"
      >
        <i className={`bx ${isLight ? "bx-sun" : "bx-moon"}`} />
      </button>
    </header>
  );
}
