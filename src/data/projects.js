// Source of truth: Onyedikachi_Orjinta_CV_2026.pdf
// media.type: "video" | "image" | "placeholder" (a branded tile; `note` explains why)

export const projects = [
  {
    title: "ClearerPay Business",
    subtitle: "Multi-currency payments application",
    description:
      "Lead and sole frontend engineer. Built in Next.js 16 with the App Router, React 19, strict-mode TypeScript, Redux Toolkit and Tailwind CSS v4, calling a REST backend through a server-side proxy that keeps credentials out of the browser. Shipped multi-step KYB and KYC onboarding with per-currency rules and a resubmission flow for flagged documents, BVN, NIN and company registration checks under a configurable enforcement policy, and FX rate locking across up to three currency pairs at once. Covered by 3,300+ Vitest unit tests across 180 files, holding semgrep, trivy and dependency scanning at zero findings.",
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS v4",
      "Zod",
      "react-hook-form",
      "Vitest",
    ],
    live: { href: "#", label: "Private Beta" },
    repo: { href: "#", label: "Private Repo" },
    media: {
      type: "placeholder",
      logo: "/images/clearerpay-logo.png",
      note: "In beta on live environment",
    },
  },
  {
    title: "ClearerPay Admin",
    subtitle: "Internal operations and compliance portal",
    description:
      "Sole frontend engineer. Built the portal end to end in React 19, Vite, Redux Toolkit and Tailwind CSS v4, covering 14 areas of the business including customer onboarding review, wallets, transactions, pay-ins and escalations. Implemented KYB application review and approval with per-field flagging, which drives the document resubmission flow customers see in ClearerPay Business, alongside master wallet and currency administration, payout and pay-in oversight, and a support escalation queue used by the operations team. Structured state as 17 Redux Toolkit slices, each with its own test file, charted operational metrics with Recharts, and wrote roughly 1,500 Vitest unit tests across 108 files.",
    tech: [
      "React 19",
      "Vite",
      "TypeScript",
      "Redux Toolkit",
      "Tailwind CSS v4",
      "Recharts",
      "Vitest",
    ],
    live: { href: "#", label: "Private Beta" },
    repo: { href: "#", label: "Private Repo" },
    media: {
      type: "placeholder",
      logo: "/images/clearerpay-logo.png",
      note: "In beta on live environment",
    },
  },
  {
    title: "Swetche Application",
    subtitle: "Wallet and onboarding web app",
    description:
      "Enhanced an existing multi-step onboarding flow using React, TypeScript and Redux to create distinct registration pathways for Business and Individual users. Implemented conditional form logic, type-safe validation with TypeScript interfaces and centralised state management to handle the different data requirements of each user type. The improved flow reduced onboarding abandonment by 25 percent through context-specific steps and clearer progress tracking.",
    tech: ["React", "TypeScript", "Redux", "Tailwind CSS", "Axios", "Vercel"],
    live: { href: "https://app.swetche.com/login", label: "Live Project" },
    repo: { href: "#", label: "Private Repo" },
    media: { type: "video", src: "/videos/SwetcheApp.mp4" },
  },
  {
    title: "Swetche Affiliate Partner Portal",
    subtitle: "Real-time commissions dashboard",
    description:
      "Real-time affiliate dashboard that lets over 500 users track commissions and referrals, integrating REST APIs for fast, consistent data loads and an auto-updating notification system for real-time alerts.",
    tech: ["React", "JavaScript", "Redux", "Tailwind CSS", "Axios", "Vercel"],
    live: {
      href: "https://affiliate-partners.swetche.com/signin",
      label: "Live Project",
    },
    repo: { href: "#", label: "Private Repo" },
    media: { type: "video", src: "/videos/Affiliate.mp4" },
  },
  {
    title: "Swetche Approval Portal",
    subtitle: "Compliance and account moderation",
    description:
      "Admin portal for user oversight, compliance monitoring and account moderation. Dashboards for reviewing profiles and tracking metrics, plus a streamlined workflow to approve or reject accounts, with role-based access and responsive data tables.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Axios"],
    live: { href: "#", label: "Private Project" },
    repo: { href: "#", label: "Private Repo" },
    media: { type: "video", src: "/videos/Admin.mp4" },
  },
  {
    title: "Swetche Treasury Portal",
    subtitle: "Internal trade operations",
    description:
      "Internal trade operations portal built with React and Vite to replace manual spreadsheet logging. Dashboards for affiliate partners and customers with automated dual-commission calculations and detailed transaction histories, giving management full financial visibility and audit readiness through integrated REST APIs.",
    tech: ["React", "Vite", "JavaScript", "Tailwind CSS", "Axios"],
    live: { href: "#", label: "Private Project" },
    repo: { href: "#", label: "Private Repo" },
    media: { type: "video", src: "/videos/Treasury.mp4" },
  },
  {
    title: "Swetche",
    subtitle: "Multi-currency wallet and collections site",
    description:
      "Primary author of the Swetche public site, from the landing page through to the legal and cookie policy pages. Focused on clean UI, smooth animation and performance so the marketing surface matches the product it sells.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Azure"],
    live: { href: "https://www.swetche.com/", label: "Live Project" },
    repo: {
      href: "https://github.com/Clearer-Pay/Swetche_Website",
      label: "Github Repository",
    },
    media: { type: "video", src: "/videos/Swetche.mp4" },
  },
  {
    title: "ClearerPay Marketing Site",
    subtitle: "Product site for the payments platform",
    description:
      "Rebuilt roughly 70 percent of the site in a redesign, covering product pages, navigation and contact capture for the global payments platform that lets businesses send, receive and manage funds in 40+ currencies.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel", "Azure"],
    live: { href: "https://www.clearerpay.com/", label: "Live Project" },
    repo: {
      href: "https://github.com/Clearer-Pay/ClearerPay",
      label: "Github Repository",
    },
    media: { type: "video", src: "/videos/Clearerpay.mp4" },
  },
  {
    title: "Clearer Corporate Site",
    subtitle: "Group trade and logistics site",
    description:
      "Sole engineer on the United Arab Emirates build of the group trade and logistics site, shipped from a shared codebase deployed per region.",
    tech: ["React", "TypeScript", "Vite", "Framer Motion"],
    live: { href: "https://www.clearer.ae/", label: "Live Project" },
    repo: { href: "#", label: "Private Repo" },
    media: { type: "video", src: "/videos/ClearerGroup.mp4" },
  },
  {
    title: "ClearerMetals",
    subtitle: "Solid minerals and petroleum trading",
    description:
      "Trading site with a searchable catalogue, authenticated listings and transactional email, built on Supabase with Formik-driven forms.",
    tech: ["React", "TypeScript", "Supabase", "Formik"],
    live: { href: "https://www.clearermetals.com/", label: "Live Project" },
    repo: { href: "#", label: "Private Repo" },
    media: { type: "video", src: "/videos/ClearerMetals.mp4" },
  },
];
