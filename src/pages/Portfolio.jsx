import { useState } from "react";
import { projects } from "../data/projects.js";
import VideoPlayer from "../components/VideoPlayer.jsx";

const initials = (title) =>
  title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

function MediaPlaceholder({ project }) {
  return (
    <div className="grid size-full place-items-center overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_16%,var(--panel))] to-panel px-6 text-center">
      <div>
        <span className="mx-auto grid size-20 place-items-center rounded-2xl border border-[color-mix(in_srgb,var(--accent)_35%,transparent)] bg-accent-tint font-display text-3xl font-bold text-accent">
          {project.media.logo ? (
            <img
              src={project.media.logo}
              alt=""
              className="size-12 object-contain"
            />
          ) : (
            initials(project.title)
          )}
        </span>
        <p className="mt-5 font-display text-xl font-semibold">
          {project.title}
        </p>
        <p className="mt-1 text-sm text-muted">{project.subtitle}</p>
        {project.media.note && (
          <span className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--accent)_30%,transparent)] bg-accent-tint px-4 py-1.5 text-xs font-semibold text-accent">
            <span className="size-1.5 animate-ping-soft rounded-full bg-accent" />
            {project.media.note}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [index, setIndex] = useState(0);
  const lastIndex = projects.length - 1;
  const project = projects[index];

  const go = (step) =>
    setIndex((current) => Math.min(lastIndex, Math.max(0, current + step)));

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl animate-rise px-[5%] pt-28 pb-16">
      <h2 className="mb-10 text-center font-display text-3xl font-bold sm:text-4xl">
        Latest <span className="text-accent">Projects</span>
      </h2>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        {/* Media first on small screens, second on large ones. */}
        <div className="order-1 lg:order-2">
          <div className="h-[22rem] overflow-hidden rounded-3xl border border-line bg-panel p-3 shadow-2xl sm:h-[26rem]">
            <div
              className="grid h-full auto-cols-[100%] grid-flow-col gap-5 transition-transform duration-600 ease-[var(--ease-out-expo)]"
              style={{
                transform: `translateX(calc(${index * -100}% - ${
                  index * 1.25
                }rem))`,
              }}
            >
              {projects.map((item, i) => {
                if (item.media.type === "video") {
                  return (
                    <VideoPlayer
                      key={item.title}
                      src={item.media.src}
                      isActive={i === index}
                    />
                  );
                }

                if (item.media.type === "image") {
                  return (
                    <div
                      key={item.title}
                      className="size-full overflow-hidden rounded-2xl bg-ink"
                    >
                      <img
                        src={item.media.src}
                        alt={item.title}
                        className="size-full object-contain"
                      />
                    </div>
                  );
                }

                return <MediaPlaceholder key={item.title} project={item} />;
              })}
            </div>
          </div>

          <div className="mt-6 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-4">
              <span className="font-display text-sm font-semibold tabular-nums text-muted">
                <b className="text-fg">
                  {String(index + 1).padStart(2, "0")}
                </b>
                {" / "}
                {String(projects.length).padStart(2, "0")}
              </span>
              <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-[width] duration-500 ease-[var(--ease-out-expo)]"
                  style={{
                    width: `${((index + 1) / projects.length) * 100}%`,
                  }}
                />
              </div>
            </div>

            <div className="flex justify-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={index === 0}
                aria-label="Previous project"
                className="grid size-12 place-items-center rounded-full border border-line-strong bg-surface text-2xl transition duration-300 enabled:hover:-translate-y-0.5 enabled:hover:border-transparent enabled:hover:bg-accent enabled:hover:text-on-accent disabled:cursor-not-allowed disabled:border-line disabled:text-muted/40"
              >
                <i className="bx bx-chevron-left" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                disabled={index === lastIndex}
                aria-label="Next project"
                className="grid size-12 place-items-center rounded-full border border-line-strong bg-surface text-2xl transition duration-300 enabled:hover:-translate-y-0.5 enabled:hover:border-transparent enabled:hover:bg-accent enabled:hover:text-on-accent disabled:cursor-not-allowed disabled:border-line disabled:text-muted/40"
              >
                <i className="bx bx-chevron-right" />
              </button>
            </div>
          </div>
        </div>

        <div key={project.title} className="order-2 animate-rise lg:order-1">
          <p className="mb-2 text-xs font-bold tracking-[0.28em] text-accent">
            {String(index + 1).padStart(2, "0")} — PROJECT
          </p>
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="mt-1.5 text-[15px] font-medium text-accent">
              {project.subtitle}
            </p>
          )}
          <p className="mt-4 max-w-[62ch] text-[15px] text-muted">
            {project.description}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium"
              >
                {tech}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            {[project.live, project.repo].map((link, i) => {
              const isDisabled = !link.href || link.href === "#";
              return (
                <a
                  key={link.label + i}
                  href={isDisabled ? undefined : link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-disabled={isDisabled}
                  className={[
                    "inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium transition duration-300",
                    isDisabled
                      ? "pointer-events-none opacity-50"
                      : "hover:-translate-y-0.5 hover:border-accent hover:bg-accent-tint hover:text-accent",
                  ].join(" ")}
                >
                  <i
                    className={`bx ${
                      i === 0 ? "bx-link-external" : "bxl-github"
                    } text-lg`}
                  />
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
