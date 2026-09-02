# Onyedikachi Orjinta — Portfolio

Personal portfolio built with **React 19 + Vite + Tailwind CSS v4**.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Structure

```
index.html            Vite entry (fonts, boxicons CDN, favicons)
public/               Served as-is: images/, videos/, CV/, site.webmanifest, _redirects
src/
  main.jsx            React root + BrowserRouter
  App.jsx             Routes: / /resume /portfolio /contact
  index.css           Tailwind entry: theme tokens + the few custom animations
  components/
    Header.jsx        Nav, mobile menu, light/dark toggle
    VideoPlayer.jsx   Carousel video with overlay, spinner, progress bar
  pages/              Home, Resume, Portfolio, Contact
  data/               All site copy (profile, projects, resume)
  hooks/useTheme.js   Theme preference, persisted to localStorage
  utils/toast.js      Toastify wrapper
```

## Editing content

Every string on the site lives in `src/data/` — no JSX edits needed:

| file | drives |
|---|---|
| `profile.js` | name, availability badge, rotating roles, bio, stats, socials, contact details |
| `projects.js` | the portfolio carousel (title, description, `tech` array, links, image/video) |
| `resume.js`   | experience, education, skills, about rows |

Add or remove entries freely — the counters, progress bar and grid sizes are all
derived from the array lengths.

## Theming

Colours are CSS variables in `src/index.css`: `:root` holds the dark palette and
`.light-mode` overrides it, and `@theme inline` maps them to Tailwind utilities
(`bg-surface`, `text-muted`, `border-line`, `bg-accent`, ...). Change the accent
in one place and the whole site follows, in both themes. `useTheme` toggles the
`light-mode` class on `<body>` and remembers the choice in `localStorage`.

## Contact form (Resend)

Submissions POST to `/api/contact`, which runs server-side and calls Resend.
The API key never reaches the browser — it is a secret, and Resend rejects
browser requests anyway.

```
server/send-contact.js      validation + Resend call (shared)
api/contact.js              Vercel entrypoint
netlify/functions/contact.mjs   Netlify entrypoint
vite.config.js              mounts the same handler for `npm run dev`
```

Copy `.env.example` to `.env` and set:

| var | meaning |
|---|---|
| `RESEND_API_KEY` | Resend key. **No `VITE_` prefix** — that would inline it into the public bundle. |
| `CONTACT_TO` | where submissions are delivered |
| `CONTACT_FROM` | verified Resend sender |

Set the same three in your host's dashboard (Netlify: Site settings →
Environment variables; Vercel: Project → Settings → Environment variables).
`.env` is gitignored and is not read in production.

**Sender domain:** until a domain is verified in Resend, `CONTACT_FROM` must stay
`onboarding@resend.dev`, which can only deliver to the Resend account's own
address. Verify a domain to send from your own address and to anyone.

## Deploying

Build command `npm run build`, publish directory `dist`.

`public/_redirects` (Netlify) and `vercel.json` (Vercel) both route `/api/*` to
the function first and everything else to `index.html` for client-side routing.
On another host, reproduce both rules in that order and deploy `server/` with a
POST endpoint at `/api/contact`.
