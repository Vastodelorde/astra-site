import { spawn } from 'node:child_process';

const baseUrl = new URL(process.argv[2] || process.env.PREFLIGHT_BASE_URL || 'http://localhost:4321/');
const routes = [
  '/',
  '/maliy.html',
  '/seredniy.html',
  '/velykyi.html',
  '/operators.html',
  '/isp.html',
  '/install.html',
  '/cloud.html',
  '/poslugy.html',
  '/taryfy.html',
  '/pro.html',
  '/kontakty.html',
  '/blog/',
  '/blog/rezervnyi-internet-dlia-biznesu/',
  '/blog/videonagliad-na-skladi/',
  '/blog/vps-chy-kolokatsiia/',
  '/en/',
  '/en/maliy.html',
  '/en/seredniy.html',
  '/en/velykyi.html',
  '/en/operators.html',
  '/en/isp.html',
  '/en/install.html',
  '/en/cloud.html',
  '/en/poslugy.html',
  '/en/taryfy.html',
  '/en/pro.html',
  '/en/kontakty.html',
  '/en/blog/',
  '/en/blog/backup-internet-for-business/',
  '/en/blog/warehouse-video-surveillance/',
  '/en/blog/vps-or-colocation/',
];

const failures = [];
const fetched = new Map();
let devServer;
const isLocal = ['localhost', '127.0.0.1'].includes(baseUrl.hostname);

function resolveLocalRoute(url) {
  const resolved = new URL(url);
  if (!isLocal || resolved.origin !== baseUrl.origin) return resolved;
  if (resolved.pathname === '/index.html') resolved.pathname = '/';
  else if (/^\/(?:operators|isp|install|cloud|poslugy|taryfy|pro|kontakty)\.html$/.test(resolved.pathname)) {
    resolved.pathname = resolved.pathname.replace(/\.html$/, '/');
  }
  return resolved;
}

function check(condition, route, message) {
  if (!condition) failures.push(`${route}: ${message}`);
}

async function request(url, timeout = 20000) {
  const key = url.href;
  if (!fetched.has(key)) {
    fetched.set(key, fetch(resolveLocalRoute(url), { signal: AbortSignal.timeout(timeout), redirect: 'follow' }));
  }
  return fetched.get(key);
}

async function serverReady() {
  try {
    const response = await fetch(baseUrl, { signal: AbortSignal.timeout(12000) });
    return response.ok;
  } catch {
    return false;
  }
}

async function startServer() {
  if (await serverReady()) return;
  devServer = spawn(process.execPath, ['node_modules/astro/astro.js', 'dev', '--host', baseUrl.hostname], {
    cwd: process.cwd(),
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  const deadline = Date.now() + 45000;
  while (Date.now() < deadline) {
    if (await serverReady()) return;
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
  throw new Error(`Dev server did not start at ${baseUrl.href}`);
}

function attributes(tag) {
  return Object.fromEntries([...tag.matchAll(/([\w:-]+)(?:\s*=\s*["']([^"']*)["'])?/g)].map((match) => [match[1].toLowerCase(), match[2] ?? '']));
}

function values(html, regex) {
  return [...html.matchAll(regex)].map((match) => match[1]);
}

async function auditPage(route) {
  const url = new URL(route, baseUrl);
  let response;
  try {
    response = await request(url);
  } catch (error) {
    failures.push(`${route}: request failed (${error.message})`);
    return;
  }
  check(response.ok, route, `HTTP ${response.status}`);
  check((response.headers.get('content-type') || '').includes('text/html'), route, 'not HTML');
  if (!response.ok) return;

  const html = await response.text();
  const expectedLang = route.startsWith('/en/') ? 'en' : 'uk';
  const htmlLang = html.match(/<html\b[^>]*\blang=["']([^"']+)["']/i)?.[1];
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
  const description = html.match(/<meta\b[^>]*\bname=["']description["'][^>]*\bcontent=["']([^"']+)["']/i)?.[1];
  const canonical = html.match(/<link\b[^>]*\brel=["']canonical["'][^>]*\bhref=["']([^"']+)["']/i)?.[1];
  const ids = values(html, /\bid=["']([^"']+)["']/gi);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  const controls = [...html.matchAll(/<(input|textarea|select)\b[^>]*>/gi)].map((match) => match[0]);

  check(htmlLang === expectedLang, route, `expected lang=${expectedLang}, got ${htmlLang || 'none'}`);
  check(Boolean(title), route, 'missing title');
  check(Boolean(description), route, 'missing meta description');
  check(Boolean(canonical), route, 'missing canonical');
  check((html.match(/<h1\b/gi) || []).length === 1, route, 'must contain exactly one h1');
  check(duplicateIds.length === 0, route, `duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);
  check((html.match(/hreflang=["']uk["']/gi) || []).length === 1, route, 'missing Ukrainian hreflang');
  check((html.match(/hreflang=["']en["']/gi) || []).length === 1, route, 'missing English hreflang');

  for (const tag of controls) {
    const attrs = attributes(tag);
    if (attrs.type === 'hidden' || attrs.type === 'submit' || attrs.type === 'button') continue;
    check(Boolean(attrs.id), route, `form control without id: ${attrs.name || tag.slice(0, 30)}`);
    if (attrs.id) check(new RegExp(`<label\\b[^>]*\\bfor=["']${attrs.id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(html), route, `missing label for #${attrs.id}`);
  }

  for (const tag of html.match(/<a\b[^>]*>/gi) || []) {
    const attrs = attributes(tag);
    if (attrs.target === '_blank') check(/\bnoopener\b/.test(attrs.rel || ''), route, 'target=_blank without rel=noopener');
  }

  const resources = [
    ...values(html, /<a\b[^>]*\bhref=["']([^"']+)["']/gi),
    ...values(html, /<(?:img|script)\b[^>]*\bsrc=["']([^"']+)["']/gi),
    ...values(html, /<link\b[^>]*\b(?:rel=["'](?:stylesheet|icon)["'][^>]*\bhref|href)=["']([^"']+)["']/gi),
  ];
  for (const resource of resources) {
    if (!resource || resource.startsWith('#') || /^(?:mailto:|tel:|viber:|javascript:)/i.test(resource)) continue;
    const resourceUrl = new URL(resource.replace(/&amp;/g, '&'), url);
    if (resourceUrl.origin !== baseUrl.origin) continue;
    resourceUrl.hash = '';
    try {
      const assetResponse = await request(resourceUrl);
      check(assetResponse.ok, route, `broken internal URL ${resourceUrl.pathname} (HTTP ${assetResponse.status})`);
    } catch (error) {
      failures.push(`${route}: failed internal URL ${resourceUrl.pathname} (${error.message})`);
    }
  }
}

async function mapLimit(items, limit, task) {
  let index = 0;
  await Promise.all(Array.from({ length: limit }, async () => {
    while (index < items.length) {
      const item = items[index++];
      await task(item);
    }
  }));
}

try {
  await startServer();
  await mapLimit(routes, 4, auditPage);
  if (failures.length) {
    console.error(`Preflight failed with ${failures.length} issue(s):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exitCode = 1;
  } else {
    console.log(`Preflight passed: ${routes.length} pages and ${fetched.size - routes.length} linked resources checked.`);
  }
} finally {
  if (devServer) devServer.kill();
}
