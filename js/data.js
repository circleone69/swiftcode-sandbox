const INR = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
});
const INRn = new Intl.NumberFormat("en-IN");

function nowIST() {
  return new Date();
}

function fmtDayLong(d = new Date()) {
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function fmtDayShort(d = new Date()) {
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
}

function fmtStamp(d = new Date()) {
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }) + " IST";
}

function addCalendarDaysIST(days) {
  const ymd = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + days, 6, 30));
}

function businessDates() {
  const today = addCalendarDaysIST(0);
  const yday = addCalendarDaysIST(-1);
  return {
    today,
    yesterday: yday,
    long: fmtDayLong(today),
    short: fmtDayShort(today),
    ydayShort: fmtDayShort(yday),
    stamp: fmtStamp(new Date()),
  };
}

const BASE = {
  merchant: {
    name: "Jason Software Solutions Pvt Ltd",
    mid: "BCKZ00001234",
    am: "Rohit Mehta",
    amPhone: "+91 98191 24489",
    amEmail: "rohith.mehta@buckzy.com",
    admin: "Abdul Naushad",
    adminEmail: "admin@buckzy.com",
    settlementBank: "HDFC Bank · XXXXXXXX4521",
    vpa: "buckzy@okhdfcbank",
  },
  day: {
    date: businessDates().long,
    lastUpdated: businessDates().stamp,
    openingBalance: 1872453.21,
    gross: 8500000,
    successfulAmount: 8457820.15,
    refunds: 42179.85,
    fees: 138756.45,
    netSettlement: 8319063.7,
    available: 10191516.91,
    tx: 3842,
    successTx: 3820,
    failedTx: 22,
    successRateAmt: 99.5,
    successRateTx: 99.43,
    refundRate: 0.5,
    avgTicket: 2211.63,
    yday: {
      gross: 8235764.67,
      successRateAmt: 99.41,
      tx: 3721,
      successTx: 3695,
      failedTx: 26,
      refundRate: 0.58,
      avgTicket: 2215.36,
    },
  },
  methods: [
    { name: "UPI Intent", tx: 3074, ok: 3063, fail: 11, amount: 7226530.45, refunds: 35902.45, net: 7190628.0, color: "#2F80ED" },
    { name: "UPI Collect", tx: 231, ok: 228, fail: 3, amount: 610845.3, refunds: 3120.3, net: 607725.0, color: "#2BBBAD" },
    { name: "Debit Cards", tx: 199, ok: 198, fail: 1, amount: 342112.15, refunds: 2112.15, net: 340000.0, color: "#F2C94C" },
    { name: "Credit Cards", tx: 169, ok: 166, fail: 3, amount: 245867.25, refunds: 950.95, net: 244916.3, color: "#F2994A" },
    { name: "Net Banking", tx: 89, ok: 88, fail: 1, amount: 74645.85, refunds: 74.85, net: 74571.0, color: "#F5D76E" },
    { name: "Wallets", tx: 80, ok: 77, fail: 3, amount: 18999.0, refunds: 19.15, net: 18979.85, color: "#EB5757" },
  ],
  hourly: [
    121000, 89000, 76000, 68000, 88000, 145000, 271000, 431000, 710000, 874000,
    765000, 656000, 583000, 643000, 756000, 831000, 887000, 764000, 621000, 456000,
    321000, 214000, 128000, 90000,
  ],
  batches: [
    { id: "BCKZ260812001", time: "01:30 AM", tx: 142, amount: 312450.25, status: "Settled" },
    { id: "BCKZ260812002", time: "05:30 AM", tx: 196, amount: 485792.4, status: "Settled" },
    { id: "BCKZ260812003", time: "09:30 AM", tx: 512, amount: 1178342.55, status: "Settled" },
    { id: "BCKZ260812004", time: "01:30 PM", tx: 684, amount: 1654782.3, status: "Settled" },
    { id: "BCKZ260812005", time: "05:30 PM", tx: 752, amount: 1872856.75, status: "Settled" },
    { id: "BCKZ260812006", time: "09:30 PM", tx: 1556, amount: 2995775.75, status: "Settled" },
  ],
  psps: [
    { name: "Google Pay", amount: 2345880.35, count: 1024, color: "#2F80ED" },
    { name: "PhonePe", amount: 1987653.2, count: 876, color: "#2BBBAD" },
    { name: "Paytm", amount: 1326541.6, count: 598, color: "#1B9A5A" },
    { name: "BHIM", amount: 892456.45, count: 392, color: "#E04545" },
    { name: "Amazon Pay", amount: 423998.85, count: 184, color: "#64748B" },
    { name: "Cred", amount: 250000.0, count: 92, color: "#94A3B8" },
  ],
  failures: [
    { reason: "Insufficient Funds", tx: 9, amount: 15487, code: "U05" },
    { reason: "User Cancelled", tx: 5, amount: 6120, code: "U16" },
    { reason: "Bank Decline", tx: 4, amount: 8560, code: "U30" },
    { reason: "Timeout", tx: 3, amount: 4753, code: "U28" },
    { reason: "Technical Error", tx: 1, amount: 1002, code: "U17" },
  ],
  transactions: [
    ["BCKZ120826235912801", "23:58:47", "UPI Intent (GPay)", "gauravsingh@okhdfcbank", 1876.45, "SUCCESS", "00", "-"],
    ["BCKZ120826235912802", "23:58:41", "UPI Intent (PhonePe)", "rahul.k@ybl", 487.35, "SUCCESS", "00", "-"],
    ["BCKZ120826235912803", "23:58:34", "UPI Intent (Paytm)", "9139123456@paytm", 2843.17, "SUCCESS", "00", "-"],
    ["BCKZ120826235912804", "23:58:28", "Debit Card", "XXXXXXXXXXXX3456", 5126.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235912805", "23:58:21", "UPI Collect", "neha.verma@okicici", 279.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235912806", "23:58:15", "UPI Intent (GPay)", "karthik.r@okhdfcbank", 1999.0, "FAILED", "U05", "Insufficient Funds"],
    ["BCKZ120826235912807", "23:58:09", "UPI Intent (PhonePe)", "amit.p@ibl", 3560.75, "SUCCESS", "00", "-"],
    ["BCKZ120826235912808", "23:58:02", "Credit Card", "XXXXXXXXXXXX1111", 7890.5, "SUCCESS", "00", "-"],
    ["BCKZ120826235911979", "23:57:59", "Wallet (MobiKwik)", "9876543210@ikwik", 159.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235911978", "23:57:52", "UPI Intent (Paytm)", "vijay@paytm", 1120.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235911977", "23:57:44", "UPI Intent (BHIM)", "pooja@upi", 640.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235911976", "23:57:31", "Net Banking", "HDFC Bank", 12500.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235911975", "23:57:18", "UPI Intent (GPay)", "sanjay.sharma@okaxis", 320.0, "FAILED", "U16", "User Cancelled"],
    ["BCKZ120826235911974", "23:57:02", "Credit Card", "XXXXXXXXXXXX8821", 4499.0, "SUCCESS", "00", "-"],
    ["BCKZ120826235911973", "23:56:48", "UPI Collect", "store@okhdfcbank", 89.0, "SUCCESS", "00", "-"],
  ],
  links: [
    { id: "PL-88421", title: "Q2 Invoice — Apex Retail", amount: 125000, status: "Paid", created: "11 Aug 2026" },
    { id: "PL-88418", title: "Onboarding fee — Nova Labs", amount: 15000, status: "Open", created: "12 Aug 2026" },
    { id: "PL-88402", title: "Workshop seats x40", amount: 80000, status: "Expired", created: "04 Aug 2026" },
  ],
  customers: [
    { name: "Apex Retail Pvt Ltd", email: "finance@apexretail.in", volume: 1842300, tx: 612 },
    { name: "Nova Labs", email: "ops@novalabs.io", volume: 642110, tx: 88 },
    { name: "GreenCart Stores", email: "pay@greencart.in", volume: 2210450, tx: 1402 },
    { name: "Mehta Diagnostics", email: "accounts@mehtadx.com", volume: 318900, tx: 240 },
  ],
  webhooks: [
    { event: "payment.captured", url: "https://api.jasonsoft.in/webhooks/buckzy", status: "200", time: "23:58:47" },
    { event: "payment.failed", url: "https://api.jasonsoft.in/webhooks/buckzy", status: "200", time: "23:58:15" },
    { event: "settlement.processed", url: "https://api.jasonsoft.in/webhooks/buckzy", status: "200", time: "21:31:02" },
    { event: "refund.processed", url: "https://api.jasonsoft.in/webhooks/buckzy", status: "500", time: "19:12:44" },
  ],
};

const STORE_KEY = "buckzy.live.v1";

function clone(v) {
  return JSON.parse(JSON.stringify(v));
}

function recompute(state) {
  const d = state.day;
  d.netSettlement = +(d.gross - d.refunds - d.fees).toFixed(2);
  d.available = +(d.openingBalance + d.netSettlement).toFixed(2);
  d.successRateAmt = d.gross ? +((d.successfulAmount / d.gross) * 100).toFixed(2) : 0;
  d.successRateTx = d.tx ? +((d.successTx / d.tx) * 100).toFixed(2) : 0;
  d.avgTicket = d.successTx ? +(d.successfulAmount / d.successTx).toFixed(2) : 0;
  d.refundRate = d.gross ? +((d.refunds / d.gross) * 100).toFixed(2) : 0;
  const dates = businessDates();
  d.lastUpdated = dates.stamp;
  d.date = dates.long;
  d.dateShort = dates.short;
  d.ydayShort = dates.ydayShort;
  return state;
}

function loadState() {
  const state = clone(BASE);
  try {
    const extra = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
    extra.forEach((p) => applyPayment(state, p, false));
  } catch (_) {}
  window.BZ = recompute(state);
  return window.BZ;
}

function savePayment(p) {
  const extra = JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  extra.push(p);
  localStorage.setItem(STORE_KEY, JSON.stringify(extra));
}

function resetLive() {
  localStorage.removeItem(STORE_KEY);
  loadState();
}

function methodBucket(method) {
  if (method.startsWith("UPI Collect")) return "UPI Collect";
  if (method.startsWith("UPI")) return "UPI Intent";
  if (method.startsWith("Debit")) return "Debit Cards";
  if (method.startsWith("Credit")) return "Credit Cards";
  if (method.startsWith("Net")) return "Net Banking";
  if (method.startsWith("Wallet")) return "Wallets";
  return "UPI Intent";
}

function pspName(method, payer) {
  const m = method.toLowerCase();
  if (m.includes("gpay") || m.includes("google")) return "Google Pay";
  if (m.includes("phonepe")) return "PhonePe";
  if (m.includes("paytm")) return "Paytm";
  if (m.includes("bhim")) return "BHIM";
  if (m.includes("amazon")) return "Amazon Pay";
  if (m.includes("cred")) return "Cred";
  const p = (payer || "").toLowerCase();
  if (p.includes("okhdfc") || p.includes("axs") || p.includes("@ok")) return "Google Pay";
  if (p.includes("ybl") || p.includes("ibl")) return "PhonePe";
  if (p.includes("paytm")) return "Paytm";
  return "Google Pay";
}

function applyPayment(state, p, persist) {
  const amount = +p.amount;
  const ok = p.status === "SUCCESS";
  const fee = ok ? +(amount * 0.016324).toFixed(2) : 0;
  const d = state.day;
  d.tx += 1;
  if (ok) {
    d.gross += amount;
    d.successTx += 1;
    d.successfulAmount = +(d.successfulAmount + amount).toFixed(2);
    d.fees = +(d.fees + fee).toFixed(2);
  } else {
    d.failedTx += 1;
    const row = state.failures.find((f) => f.reason === (p.remark || "User Cancelled")) || state.failures[1];
    row.tx += 1;
    row.amount = +(row.amount + amount).toFixed(2);
  }

  const bucket = methodBucket(p.method);
  const m = state.methods.find((x) => x.name === bucket);
  if (m) {
    m.tx += 1;
    if (ok) {
      m.ok += 1;
      m.amount = +(m.amount + amount).toFixed(2);
      m.net = +(m.net + amount - fee).toFixed(2);
    } else m.fail += 1;
  }

  if (ok) {
    const hour = Math.min(23, Number(p.hour ?? 23));
    state.hourly[hour] += amount;
    const last = state.batches[state.batches.length - 1];
    last.tx += 1;
    last.amount = +(last.amount + amount).toFixed(2);
    last.status = "Settled";
  }

  if (bucket === "UPI Intent" || bucket === "UPI Collect") {
    const psp = pspName(p.method, p.payer);
    const row = state.psps.find((x) => x.name === psp);
    if (row && ok) {
      row.amount = +(row.amount + amount).toFixed(2);
      row.count += 1;
    }
  }

  state.transactions.unshift([p.id, p.time, p.method, p.payer, amount, p.status, p.code, p.remark || "-"]);

  if (persist) savePayment(p);
  return recompute(state);
}

function conicFrom(items, valueKey = "amount") {
  const total = items.reduce((s, i) => s + i[valueKey], 0) || 1;
  let acc = 0;
  return items
    .map((i) => {
      const from = acc;
      acc += (i[valueKey] / total) * 100;
      return `${i.color} ${from.toFixed(2)}% ${acc.toFixed(2)}%`;
    })
    .join(", ");
}

window.fmtINR = (n) => INR.format(n);
window.fmtN = (n) => INRn.format(n);
window.pct = (a, b) => ((a / b) * 100).toFixed(2) + "%";
window.delta = (now, prev, invert = false) => {
  const d = ((now - prev) / prev) * 100;
  const up = invert ? d < 0 : d >= 0;
  const sign = d >= 0 ? "↑" : "↓";
  return `<span class="${up ? "up" : "down"}">${sign} ${Math.abs(d).toFixed(2)}%</span>`;
};

window.BZ_API = { loadState, applyPayment, resetLive, savePayment, conicFrom, STORE_KEY };
loadState();
