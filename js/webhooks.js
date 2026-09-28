const WH_SECRET_DEFAULT = "whsec_bckz_sandbox_4e2f9a";
const WH_LOG_KEY = "buckzy.webhooks.v1";
const WH_SECRET_KEY = "buckzy.webhook.secret";

function webhookSecret() {
  return localStorage.getItem(WH_SECRET_KEY) || WH_SECRET_DEFAULT;
}

function setWebhookSecret(secret) {
  localStorage.setItem(WH_SECRET_KEY, secret);
}

function readWebhookLog() {
  try { return JSON.parse(localStorage.getItem(WH_LOG_KEY) || "[]"); }
  catch { return []; }
}

function writeWebhookLog(list) {
  localStorage.setItem(WH_LOG_KEY, JSON.stringify(list.slice(0, 50)));
}

async function hmacSha256Hex(secret, message) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const buf = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

function timingSafeEqual(a, b) {
  const left = String(a || "");
  const right = String(b || "");
  if (left.length !== right.length) return false;
  let mix = 0;
  for (let i = 0; i < left.length; i++) mix |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return mix === 0;
}

function parseSignatureHeader(header) {
  const out = {};
  String(header || "")
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean)
    .forEach((part) => {
      const i = part.indexOf("=");
      if (i > 0) out[part.slice(0, i)] = part.slice(i + 1);
    });
  return out;
}

async function signWebhookBody(rawBody, secret = webhookSecret(), ts = Math.floor(Date.now() / 1000)) {
  const v1 = await hmacSha256Hex(secret, `${ts}.${rawBody}`);
  return { t: ts, v1, header: `t=${ts},v1=${v1}` };
}

async function verifyWebhook({ body, header, secret = webhookSecret(), toleranceSec = 300, now = Math.floor(Date.now() / 1000) }) {
  const parsed = parseSignatureHeader(header);
  const t = Number(parsed.t);
  const v1 = parsed.v1 || "";
  if (!t || !v1) return { ok: false, reason: "missing_signature" };
  if (Math.abs(now - t) > toleranceSec) return { ok: false, reason: "timestamp_expired", t, v1 };
  const expected = await hmacSha256Hex(secret, `${t}.${body}`);
  if (!timingSafeEqual(expected, v1)) return { ok: false, reason: "bad_signature", t, v1, expected };
  return { ok: true, reason: "valid", t, v1 };
}

async function deliverWebhook({ event, payload, url = "https://api.jasonsoft.in/webhooks/buckzy" }) {
  const envelope = {
    event,
    id: "evt_" + Date.now().toString(36),
    created_at: Math.floor(Date.now() / 1000),
    payload,
  };
  const body = JSON.stringify(envelope);
  const signed = await signWebhookBody(body);
  const check = await verifyWebhook({ body, header: signed.header });
  const now = new Date();
  const time = now.toLocaleTimeString("en-GB", { hour12: false });
  const record = {
    id: envelope.id,
    event,
    url,
    status: check.ok ? "200" : "401",
    time,
    header: signed.header,
    body,
    t: signed.t,
    v1: signed.v1,
    verified: check.ok,
    reason: check.reason,
    order_id: payload.order_id || null,
    payment_id: payload.id || null,
  };
  const log = readWebhookLog();
  log.unshift(record);
  writeWebhookLog(log);
  if (window.BZ && Array.isArray(BZ.webhooks)) {
    BZ.webhooks.unshift({
      event,
      url,
      status: record.status,
      time,
      header: record.header,
      verified: record.verified,
    });
  }
  return record;
}

window.BuckzyWebhooks = {
  secret: webhookSecret,
  setSecret: setWebhookSecret,
  DEFAULT_SECRET: WH_SECRET_DEFAULT,
  hmacSha256Hex,
  signWebhookBody,
  verifyWebhook,
  deliverWebhook,
  readLog: readWebhookLog,
  parseSignatureHeader,
};
