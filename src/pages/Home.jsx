import { Link } from "react-router-dom";
import { profile, socials } from "../data/profile.js";

export default function Home() {
  return (
    <section className="mx-auto flex min-h-screen w-full max-w-7xl animate-rise flex-col-reverse items-center gap-12 px-[5%] pt-28 pb-16 md:flex-row md:gap-16 md:pt-28">
      <div className="flex-1 text-center md:text-left">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-accent-tint px-4 py-1.5 text-xs font-semibold tracking-wide text-accent">
          <span className="size-2 animate-ping-soft rounded-full bg-accent shadow-[0_0_0_0_var(--accent-glow)]" />
          {profile.availability}
        </span>

        <h1 className="bg-gradient-to-b from-fg to-[color-mix(in_srgb,var(--fg)_55%,transparent)] bg-clip-text text-4xl font-extrabold text-balance text-transparent sm:text-5xl lg:text-6xl">
          {profile.name}
        </h1>

        <h2 className="role-cycle mt-3 block min-h-10 font-display text-xl font-semibold text-muted sm:text-2xl">
          I'm a{" "}
          {profile.roles.map((role, index) => (
            <span
              key={role}
              style={{ "--i": profile.roles.length - index }}
              data-text={role}
            >
              {role}
            </span>
          ))}
        </h2>

        <p className="mx-auto mt-5 max-w-[58ch] text-[15px] text-muted md:mx-0">
          {profile.bio}
        </p>

        <div className="mt-7 flex flex-col items-center gap-4 sm:flex-row md:justify-start">
          <a
            href={profile.cv}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-semibold whitespace-nowrap text-on-accent shadow-[0_8px_24px_var(--accent-glow)] transition duration-300 hover:-translate-y-1 hover:brightness-110 sm:w-auto"
          >
            <i className="bx bx-download text-lg" />
            Download CV
          </a>
          <Link
            to="/portfolio"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-sm font-semibold whitespace-nowrap transition duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent sm:w-auto"
          >
            View my work
            <i className="bx bx-right-arrow-alt text-lg" />
          </Link>

          <div className="flex gap-2.5 sm:ml-2">
            {socials.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                title={label}
                className="grid size-11 place-items-center rounded-xl border border-line bg-surface text-xl text-muted transition duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent-tint hover:text-accent"
              >
                <i className={`bx ${icon}`} />
              </a>
            ))}
          </div>
        </div>

        <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 md:max-w-lg">
          {profile.stats.map(({ value, label }) => (
            <div key={label}>
              <dt className="font-display text-2xl font-bold text-accent sm:text-3xl">
                {value}
              </dt>
              <dd className="mt-1 text-xs leading-snug text-muted sm:text-sm">
                {label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="grid flex-1 place-items-center">
        <div className="avatar-ring relative grid aspect-square w-[min(22rem,70vw)] place-items-center overflow-hidden rounded-full p-1 shadow-[0_0_80px_var(--accent-glow)]">
          <div className="relative z-1 flex size-[calc(100%-0.5rem)] items-end justify-center overflow-hidden rounded-full bg-panel">
            <img
              src={profile.photo}
              alt={profile.name}
              className="w-[88%] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
