import { useState } from "react";
import {
  experience,
  education,
  skills,
  skillGroups,
  about,
} from "../data/resume.js";

const TABS = [
  { label: "Experience", icon: "bx-briefcase-alt-2" },
  { label: "Education", icon: "bx-book-open" },
  { label: "Skills", icon: "bx-code-alt" },
  { label: "About Me", icon: "bx-user" },
];

const CARD =
  "rounded-2xl border border-line bg-surface transition duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)] hover:shadow-2xl";

const PANEL = "animate-rise";

const SCROLLER =
  "grid max-h-[32rem] gap-5 overflow-y-auto pr-2 md:grid-cols-2 lg:max-h-[34rem]";

function PanelHeading({ lead, accent, desc }) {
  return (
    <>
      <h2 className="font-display text-3xl font-bold sm:text-4xl">
        {lead} <span className="text-accent">{accent}</span>
      </h2>
      <p className="mt-3 mb-7 max-w-[65ch] text-muted">{desc}</p>
    </>
  );
}

export default function Resume() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="mx-auto min-h-screen w-full max-w-7xl animate-rise px-[5%] pt-28 pb-16">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-14">
        <div>
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            Why Hire Me?
          </h2>
          <p className="mt-3 mb-7 text-muted">
            I own frontends end to end — architecture, delivery and test
            coverage — and I have done it on a live payments platform where
            correctness, performance and security reviews are part of the job.
          </p>

          <div className="flex flex-col gap-2.5">
            {TABS.map((tab, index) => {
              const isActive = index === activeTab;
              return (
                <button
                  key={tab.label}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveTab(index)}
                  className={[
                    "group relative flex items-center gap-3 overflow-hidden rounded-xl border px-5 py-4 text-left text-[15px] font-medium transition duration-300",
                    isActive
                      ? "border-[color-mix(in_srgb,var(--accent)_45%,transparent)] bg-accent-tint text-fg"
                      : "border-line bg-surface text-muted hover:translate-x-1 hover:bg-surface-hover hover:text-fg",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "absolute inset-y-0 left-0 w-1 origin-center bg-accent transition-transform duration-300",
                      isActive ? "scale-y-100" : "scale-y-0",
                    ].join(" ")}
                  />
                  <i
                    className={`bx ${tab.icon} text-xl ${
                      isActive ? "text-accent" : ""
                    }`}
                  />
                  {tab.label}
                  <i className="bx bx-chevron-right ml-auto text-xl opacity-0 transition group-hover:opacity-60" />
                </button>
              );
            })}
          </div>
        </div>

        <div>
          {activeTab === 0 && (
            <div className={PANEL}>
              <PanelHeading
                lead="My"
                accent="Experience"
                desc="Three years of shipping production frontends — currently leading a multi-currency payments platform and maintaining five public sites in the same group."
              />
              <div className={SCROLLER}>
                {experience.map((job) => (
                  <article
                    key={job.role + job.year}
                    className={`${CARD} flex flex-col p-6`}
                  >
                    <span className="mb-3 w-fit rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold text-accent">
                      {job.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {job.role}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 font-medium">
                      <span className="size-2 rounded-full bg-accent" />
                      {job.company}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
                      <i className="bx bxs-location-alt-2 text-base text-accent" />
                      {job.location}
                    </p>
                    <ul className="mt-4 grid gap-2.5 border-t border-line pt-4">
                      {job.points.map((point) => (
                        <li
                          key={point}
                          className="relative pl-5 text-sm leading-relaxed text-muted"
                        >
                          <span className="absolute top-2.5 left-0 h-0.5 w-2.5 rounded-full bg-accent" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 1 && (
            <div className={PANEL}>
              <PanelHeading
                lead="My"
                accent="Education"
                desc="A Computer Engineering degree backed by focused frontend training, and a habit of learning in public through project work."
              />
              <div className={SCROLLER}>
                {education.map((item) => (
                  <article key={item.title} className={`${CARD} p-6`}>
                    <span className="mb-3 inline-block rounded-full bg-accent-tint px-3 py-1 text-xs font-semibold text-accent">
                      {item.year}
                    </span>
                    <h3 className="font-display text-xl font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-2 font-medium">
                      <span className="size-2 rounded-full bg-accent" />
                      {item.school}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          )}

          {activeTab === 2 && (
            <div className={PANEL}>
              <PanelHeading
                lead="My"
                accent="Skills"
                desc="The stack I reach for day to day, and the wider toolset I have shipped production work with."
              />
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
                {skills.map((skill) => (
                  <div
                    key={skill.name}
                    className={`${CARD} group grid place-items-center gap-1.5 px-2 py-4 text-center`}
                  >
                    <i
                      className={`${skill.icon} text-3xl text-muted transition duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:text-accent`}
                    />
                    <span className="text-xs font-medium">{skill.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid max-h-[26rem] gap-5 overflow-y-auto pr-2 sm:grid-cols-2">
                {skillGroups.map((group) => (
                  <div key={group.title} className="rounded-2xl border border-line bg-surface p-5">
                    <h4 className="mb-3 text-xs font-semibold tracking-[0.12em] text-accent uppercase">
                      {group.title}
                    </h4>
                    <ul className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="rounded-full border border-line bg-ink px-3 py-1 text-xs font-medium text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 3 && (
            <div className={PANEL}>
              <PanelHeading
                lead="About"
                accent="Me"
                desc="Comfortable owning a codebase from architecture through to test coverage, and used to working from Figma with designers and product."
              />
              <div className="grid gap-3 sm:grid-cols-2">
                {about.map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-4 rounded-xl border border-line bg-surface px-5 py-3.5 text-sm transition duration-300 hover:border-[color-mix(in_srgb,var(--accent)_40%,transparent)]"
                  >
                    <span className="text-muted">{label}</span>
                    <span className="text-right font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
