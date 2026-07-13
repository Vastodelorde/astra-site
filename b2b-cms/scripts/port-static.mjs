/**
 * Mechanically port the remaining static b2b pages into Astro pages.
 * Extracts SEO from <head> and the <main> inner HTML, wraps it in Layout.
 * Chrome (header/footer/modal/menu/scripts) comes from the Layout, so the body
 * is only the page-unique <main> content. Run: node scripts/port-static.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(here, '..', '..', 'redesign', 'b2b');
const OUT = resolve(here, '..', 'src', 'pages');

// Segment pages are handled by [segment].astro + Sanity; isp is done manually.
const pages = ['index', 'install', 'cloud', 'operators', 'pro', 'kontakty', 'poslugy', 'taryfy'];

const grab = (re, html) => (html.match(re)?.[1] ?? '').trim();

for (const name of pages) {
  const html = readFileSync(resolve(SRC, `${name}.html`), 'utf8');

  const title = grab(/<title>([\s\S]*?)<\/title>/, html);
  const description = grab(/<meta name="description" content="([\s\S]*?)">/, html);
  const canonical = grab(/<link rel="canonical" href="([\s\S]*?)">/, html);
  const ogTitle = grab(/<meta property="og:title" content="([\s\S]*?)">/, html);
  const ogDescription = grab(/<meta property="og:description" content="([\s\S]*?)">/, html);

  // page-scoped <style> in <head> (before </head>)
  const headStyle = grab(/<\/style>\s*<\/head>/.test(html) ? /<style>([\s\S]*?)<\/style>\s*<\/head>/ : /<style>([\s\S]*?)<\/style>/, html);

  const main = grab(/<main[^>]*>([\s\S]*?)<\/main>/, html);
  if (!main) { console.warn('! no <main> in', name); continue; }

  const attr = (s) => s.replace(/"/g, '&quot;');
  const props = [
    `  title="${attr(title)}"`,
    `  description="${attr(description)}"`,
    `  canonical="${attr(canonical)}"`,
    ogTitle && `  ogTitle="${attr(ogTitle)}"`,
    ogDescription && `  ogDescription="${attr(ogDescription)}"`,
  ].filter(Boolean).join('\n');

  const headSlot = headStyle
    ? `  <style is:global slot="head">\n${headStyle}\n  </style>\n`
    : '';

  const out = `---
import Layout from '../layouts/Layout.astro';
---
<Layout
${props}
>
${headSlot}${main.trim()}
</Layout>
`;

  writeFileSync(resolve(OUT, `${name}.astro`), out);
  console.log('✓ ported', `${name}.astro`, headStyle ? '(+scoped style)' : '');
}
