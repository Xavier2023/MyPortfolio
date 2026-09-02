// Source of truth: Onyedikachi_Orjinta_CV_2026.pdf

export const experience = [
  {
    year: "Jun 2025 - Present",
    role: "Software Engineer, Frontend",
    company: "Clearer Limited",
    location: "Lagos, Nigeria",
    points: [
      "Lead frontend engineer on ClearerPay Business, a multi-currency payments application, and sole frontend engineer on ClearerPay Admin, the internal operations and compliance portal behind it.",
      "Raised Lighthouse performance scores by more than 50 points using code splitting and bundle optimisation, reducing load time by about 30 percent.",
      "Build and maintain the group's five public websites in React, Next.js and TypeScript, reusing components and design language across them.",
      "Deliver KYB onboarding, multi-currency wallets, transfers and FX conversion against a REST backend, using Zod and react-hook-form for validation and a server-side proxy for authentication.",
      "Work from Figma with designers and product managers, and review pull requests across the frontend team.",
    ],
  },
  {
    year: "Jul 2023 - Jun 2025",
    role: "Frontend Engineer",
    company: "Freelance",
    location: "Lagos, Nigeria",
    points: [
      "Delivered more than 15 responsive websites and web applications for clients in retail, logistics and professional services, with a 95 percent client satisfaction rate.",
      "Converted UI and UX designs into responsive React and Next.js implementations across desktop, tablet and mobile breakpoints.",
      "Reduced delivery time by roughly 25 percent by building a reusable component library shared between client projects.",
    ],
  },
  {
    year: "Feb 2023 - Jun 2023",
    role: "Frontend Developer Intern",
    company: "KPMG Nigeria",
    location: "Lagos, Nigeria",
    points: [
      "Contributed to KPMG ACE, a web application connecting manufacturers with suppliers for sourcing and exhibitions.",
      "Built accessible, cross-browser interfaces with HTML, CSS, JavaScript, Flexbox and CSS Grid.",
    ],
  },
];

export const education = [
  {
    year: "Oct 2018 - Jan 2024",
    title: "B.Eng, Computer Engineering",
    school: "Olabisi Onabanjo University, Ogun, Nigeria",
    description: "First Class Honours, CGPA 4.63 of 5.00.",
  },
  {
    year: "Jan 2023 - Mar 2023",
    title: "React Course",
    school: "Udemy (Online)",
    description:
      "Deep dive into React fundamentals, hooks and state management, applied across a set of build-along projects.",
  },
  {
    year: "Jan 2022 - Jul 2022",
    title: "Frontend Development Career Path",
    school: "Scrimba (Online)",
    description:
      "Full frontend curriculum covering HTML, CSS, JavaScript and React, with continuous project work and code reviews.",
  },
];

// Core stack shown as the icon grid.
export const skills = [
  { icon: "bx bxl-typescript", name: "TypeScript" },
  { icon: "bx bxl-javascript", name: "JavaScript" },
  { icon: "bx bxl-react", name: "React 19" },
  { icon: "bxl bx-next-js", name: "Next.js" },
  { icon: "bx bxl-redux", name: "Redux Toolkit" },
  { icon: "bx bxl-tailwind-css", name: "Tailwind CSS" },
  { icon: "bx bxl-html5", name: "HTML5" },
  { icon: "bx bxl-css3", name: "CSS3" },
  { icon: "bxl bx-vite-js", name: "Vite" },
  { icon: "bx bx-test-tube", name: "Vitest" },
  { icon: "bx bxl-git", name: "Git" },
  { icon: "bx bxl-figma", name: "Figma" },
];

// Full skill list from the CV, grouped.
export const skillGroups = [
  {
    title: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "SQL"],
  },
  {
    title: "Frameworks & libraries",
    items: [
      "React 19",
      "Next.js App Router",
      "Redux Toolkit",
      "React Router",
      "TanStack Query",
      "Framer Motion",
      "GSAP",
    ],
  },
  {
    title: "Styling",
    items: [
      "Tailwind CSS",
      "CSS Modules",
      "Responsive design",
      "Accessibility",
      "Cross-browser testing",
    ],
  },
  {
    title: "Forms & validation",
    items: ["react-hook-form", "Zod", "Formik", "Yup"],
  },
  {
    title: "APIs & data",
    items: [
      "REST APIs",
      "Axios",
      "Server-side API proxies",
      "JWT authentication",
      "Supabase",
    ],
  },
  {
    title: "Testing & tooling",
    items: [
      "Vitest",
      "Unit testing",
      "Git & GitHub",
      "Vite",
      "Webpack",
      "npm",
      "Agile / Scrum",
      "Code review",
    ],
  },
  {
    title: "Practices",
    items: [
      "Web performance optimisation",
      "Code splitting",
      "Bundle analysis",
      "Lighthouse",
      "CI checks",
      "semgrep",
      "trivy",
    ],
  },
];

export const about = [
  { label: "Name", value: "Onyedikachi Anthony Orjinta" },
  { label: "Role", value: "Frontend Engineer" },
  { label: "Location", value: "Lagos, Nigeria" },
  { label: "Nationality", value: "Nigerian" },
  { label: "Experience", value: "3+ Years" },
  { label: "Full Time", value: "Available" },
  { label: "Freelance", value: "Available" },
  { label: "Phone", value: "+234 816 559 9988" },
  { label: "Email", value: "orjintaxavier@gmail.com" },
  { label: "Language", value: "English" },
];
