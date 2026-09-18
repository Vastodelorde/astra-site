import test from "node:test";
import assert from "node:assert/strict";
import worker from "./index.js";

const env = {
  ALLOWED_ORIGINS: "https://astra.in.ua,http://127.0.0.1:4321",
  TG_BOT_TOKEN: "test-token",
  TG_CHAT_ID: "-100123",
  TURNSTILE_SECRET_KEY: "test-secret",
};
const lead = {
  name: "Тестова компанія",
  phone: "+38 (067) 123-45-67",
  address: "Львів",
  message: "Потрібен інтернет",
  source: "Середній бізнес",
  tariff: "Бізнес 250",
  turnstileToken: "test-response",
};
const request = (data = lead, origin = "https://astra.in.ua") => new Request("https://worker.example/", {
  method: "POST",
  headers: { Origin: origin, "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

test("valid lead is delivered with source and tariff", async () => {
  const originalFetch = globalThis.fetch;
  let sent;
  globalThis.fetch = async (url, options) => {
    if (url.includes("siteverify")) return Response.json({ success: true, hostname: "astra.in.ua" });
    sent = JSON.parse(options.body);
    return Response.json({ ok: true });
  };
  try {
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get("Access-Control-Allow-Origin"), "https://astra.in.ua");
    assert.equal(sent.chat_id, env.TG_CHAT_ID);
    assert.match(sent.text, /Сторінка: Середній бізнес/);
    assert.match(sent.text, /Тариф: Бізнес 250/);
    assert.match(sent.text, /Телефон: \+38 \(067\) 123-45-67/);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects unapproved origins and malformed phone before calling providers", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = () => { throw new Error("Unexpected provider call"); };
  try {
    assert.equal((await worker.fetch(request(lead, "https://other.example"), env)).status, 403);
    assert.equal((await worker.fetch(request({ ...lead, phone: "123" }), env)).status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("rejects an invalid Turnstile response", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => Response.json({ success: false });
  try {
    assert.equal((await worker.fetch(request(), env)).status, 400);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("does not claim success when Telegram rejects delivery", async () => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url) => url.includes("siteverify")
    ? Response.json({ success: true, hostname: "astra.in.ua" })
    : Response.json({ ok: false });
  try {
    assert.equal((await worker.fetch(request(), env)).status, 502);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("answers preflight only for allowed origins", async () => {
  const preflight = new Request("https://worker.example/", {
    method: "OPTIONS",
    headers: { Origin: "http://127.0.0.1:4321" },
  });
  const response = await worker.fetch(preflight, env);
  assert.equal(response.status, 204);
  assert.equal(response.headers.get("Access-Control-Allow-Origin"), "http://127.0.0.1:4321");
});
