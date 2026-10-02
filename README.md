# falconvision.fpv

Single-page marketing and booking website for **falconvision.fpv**, a cinematic FPV and aerial videography service flown with the DJI Avata 360. Built with React 19 and Vite 7. Visitors browse services, pick a package, and send a pre-filled booking inquiry straight to WhatsApp. There is no backend.

## Features

- **Dark and light themes**, persisted in `localStorage` (`falconvision_theme`)
- **Sections:** Hero, Approach (interactive 3D-style drone card), Services, Pricing, Why Us, Selected Work, Booking, Footer
- **WhatsApp-first booking:** the form validates input and opens `wa.me` with the inquiry pre-filled
- **Location auto-detect:** browser GPS plus OpenStreetMap Nominatim reverse geocoding (no API key, nothing stored)
- **Portfolio videos:** inline player and theater modal using privacy-friendly `youtube-nocookie.com` embeds
- **Selection flow:** choosing a service scrolls to Pricing, and choosing a package scrolls to Booking with both pre-selected
- **Accessibility:** skip link, ARIA labels, focus management, Esc-to-close modal, `prefers-reduced-motion` support
- **SEO and sharing:** meta description, Open Graph and Twitter card tags, favicon

## Tech stack

| Area | Tool |
| --- | --- |
| UI | React 19 |
| Build | Vite 7 with `@vitejs/plugin-react` |
| Icons | lucide-react |
| Styling | Plain CSS (`src/index.css`), no framework |
| Fonts | DM Sans and Manrope via Google Fonts |

## Getting started

Requires Node.js 18 or newer.

```bash
npm install
npm run dev       # dev server on http://localhost:3000
npm run build     # production build into dist/
npm run preview   # serve the production build on port 3000
```

## Project structure

```
├── index.html              # Meta tags, fonts, root element
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── og-image.jpg        # 1200x630 social share image
└── src/
    ├── main.jsx            # Entry point
    ├── App.jsx             # Theme + shared selection/playback state
    ├── data.js             # All business content (see below)
    ├── hooks.js            # useReveal, usePrefersReducedMotion
    ├── index.css           # All styles
    ├── assets/images/      # Hero images (1280 and 2048 webp)
    └── components/
        ├── Navbar.jsx  Hero.jsx  Intro.jsx  IntroDroneModel.jsx
        ├── Services.jsx  Pricing.jsx  WhyUs.jsx  Work.jsx
        ├── Booking.jsx  Footer.jsx  Reveal.jsx
```

## Editing content

Most content lives in **`src/data.js`**, so components stay presentational:

| Export | Controls |
| --- | --- |
| `WHATSAPP_NUMBER` | Booking destination and footer contact. Use country code, no `+`, spaces or hyphens (for example `916369090002`) |
| `services` | The eight service rows and the booking "shoot type" dropdown |
| `pricingPackages` | Pricing cards and the booking "package" dropdown |
| `whyChooseUs` | The "Why Us" list |
| `portfolio` | Selected Work videos (`youtubeId`, `wide` for a double-width tile) |

Some copy is written directly in components: footer details (email, HQ, equipment specs) in `Footer.jsx`, and the stats in `Intro.jsx`.

## Deployment

`npm run build` produces a static site in `dist/` that works on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3). Use build command `npm run build` and publish directory `dist`.

Before going live:

1. Confirm `WHATSAPP_NUMBER` in `src/data.js`.
2. Replace the placeholder email `contact@falconvision.fpv` in `Footer.jsx` with a working address, or remove it.
3. Make `og:image` an absolute URL (for example `https://yourdomain.com/og-image.jpg`) and add `og:url` in `index.html`, otherwise WhatsApp and Instagram previews may not show the image.
4. Check that the claims in the footer and stats (8K, DGCA compliant, certified pilot) match your actual gear and credentials.
5. Check that you have the right to feature the YouTube videos in `portfolio`, ideally by swapping in your own footage.

## External services

The site loads these at runtime, and they need internet access:

- Google Fonts (`fonts.googleapis.com`)
- Unsplash (service images)
- YouTube thumbnails and embeds (`i.ytimg.com`, `youtube-nocookie.com`)
- OpenStreetMap Nominatim (location auto-detect only, when the visitor clicks it)

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server (port 3000) |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build locally |
