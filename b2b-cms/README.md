# ASTRA B2B website

Production website for ASTRA business customers. The project includes Ukrainian and English pages, structured Sanity-managed content, and lead forms delivered to Telegram through a Cloudflare Worker.

## Requirements

- Node.js 22.12 or newer
- npm
- Sanity project access for content editing
- Cloudflare Worker and Turnstile credentials for lead forms

## Local setup

```bash
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:4321/`. Do not commit `.env`; it may contain the private Sanity read token.

## Environment variables

| Variable | Visibility | Purpose |
| --- | --- | --- |
| `PUBLIC_SANITY_PROJECT_ID` | Browser-safe | Sanity project identifier |
| `PUBLIC_SANITY_DATASET` | Browser-safe | Sanity dataset, normally `production` |
| `SANITY_TOKEN` | Secret | Server-side read token for a private dataset |
| `PUBLIC_LEAD_ENDPOINT` | Browser-safe | Cloudflare Worker URL for form delivery |
| `PUBLIC_TURNSTILE_SITE_KEY` | Browser-safe | Cloudflare Turnstile site key |

The Telegram bot token, chat ID, Turnstile secret key, and allowed origins belong in the Cloudflare Worker secrets, not in this website project.

## Commands

```bash
npm run dev          # local development
npm run build        # production build
npm run test:worker  # Cloudflare Worker unit tests
npm run test:syntax  # public JavaScript and Vercel configuration
npm run check        # Astro and TypeScript diagnostics
npm run preflight    # route, metadata, link, asset and form checks
npm test             # complete handoff check: Worker tests, build, preflight
npm run seed:content # seed managed pages, services, tariffs and site settings
```

`npm run preflight` reuses a running local server or starts a temporary one. To test another deployment:

```bash
npm run preflight -- https://example.com/
```

## Content editing

- Blog posts, the home page, service catalog, plans, contacts, site settings and segment pages are edited in Sanity Studio. Ukrainian and English fields live in the same documents.
- Managed pages are server-rendered and fetch published Sanity content without the CDN cache, so published changes appear without a site rebuild.
- Local fallback content lives in `src/data/` and keeps the public site usable if Sanity is temporarily unavailable.
- `npm run seed:content` is idempotent but overwrites the managed singleton pages with the repository fallback content. Use it for initial setup, not routine editing.
- Shared navigation is split between `Header.astro`, `MobileMenu.astro`, and `Footer.astro`; update all three together.
- Product rules and content ownership are documented in `PRODUCT.md`; visual rules are in `DESIGN.md`.

## Deployment

The current adapter and `vercel.json` target Vercel. Set all website environment variables for both Production and Preview before redeploying. The Sanity Studio and Cloudflare Worker are separate deployments.

The site is not locked to Vercel. For a conventional Node.js host, replace `@astrojs/vercel` with `@astrojs/node`, change the adapter in `astro.config.mjs`, set the same environment variables, build the project, and run the generated server behind HTTPS. Confirm the final host supports Node.js SSR because managed pages and the blog are rendered on request.

## Handoff checklist

1. Run `npm test` with a clean install.
2. Verify a real form submission in the production domain and confirm the Telegram notification.
3. Transfer access to the Git repository, hosting project, Sanity project, Cloudflare account, bot ownership, and domain DNS.
4. Rotate secrets if access is changing between organizations.
5. Update canonical URLs and allowed origins before moving from `/b2b/` or to another domain.
