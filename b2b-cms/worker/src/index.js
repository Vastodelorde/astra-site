const json = (body, status, headers = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
});

const clean = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin");
    const allowed = (env.ALLOWED_ORIGINS || "").split(",").map((item) => item.trim());
    if (!origin || !allowed.includes(origin)) return json({ error: "forbidden" }, 403);

    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin",
    };
    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors);
    if (!env.TG_BOT_TOKEN || !env.TG_CHAT_ID || !env.TURNSTILE_SECRET_KEY) {
      return json({ error: "unavailable" }, 503, cors);
    }
    if (!request.headers.get("Content-Type")?.startsWith("application/json")) {
      return json({ error: "invalid_request" }, 400, cors);
    }

    let data;
    try {
      const raw = await request.text();
      if (raw.length > 8192) return json({ error: "invalid_request" }, 400, cors);
      data = JSON.parse(raw);
    } catch {
      return json({ error: "invalid_request" }, 400, cors);
    }
    if (!data || typeof data !== "object" || Array.isArray(data)) {
      return json({ error: "invalid_request" }, 400, cors);
    }

    const phone = clean(data.phone, 32);
    const digits = phone.replace(/\D/g, "");
    const token = clean(data.turnstileToken, 2048);
    if (!/^380\d{9}$/.test(digits) || !token) {
      return json({ error: "invalid_request" }, 400, cors);
    }

    let verified;
    try {
      const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token }),
      });
      verified = response.ok ? await response.json() : null;
    } catch {
      return json({ error: "unavailable" }, 503, cors);
    }
    if (!verified?.success || verified.hostname !== new URL(origin).hostname) {
      return json({ error: "verification_failed" }, 400, cors);
    }

    const fields = [
      "Нова заявка з сайту АСТРА B2B",
      `Сторінка: ${clean(data.source, 100) || "Головна"}`,
    ];
    const tariff = clean(data.tariff, 100);
    if (tariff) fields.push(`Тариф: ${tariff}`);
    fields.push(`Телефон: ${phone}`);
    const name = clean(data.name, 120);
    const address = clean(data.address, 200);
    const message = clean(data.message, 1200);
    if (name) fields.push(`Ім'я / компанія: ${name}`);
    if (address) fields.push(`Адреса: ${address}`);
    if (message) fields.push(`Деталі: ${message}`);

    try {
      const response = await fetch(`https://api.telegram.org/bot${env.TG_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: env.TG_CHAT_ID, text: fields.join("\n"), disable_web_page_preview: true }),
      });
      const result = response.ok ? await response.json() : null;
      if (!result?.ok) return json({ error: "delivery_failed" }, 502, cors);
    } catch {
      return json({ error: "delivery_failed" }, 502, cors);
    }
    return json({ ok: true }, 200, cors);
  },
};
