const VPA_KEY = "buckzy.merchant.vpa";

function merchantVpa() {
  const saved = localStorage.getItem(VPA_KEY);
  if (saved) return saved.trim();
  return (window.BZ && BZ.merchant && BZ.merchant.vpa) || "buckzy@okhdfcbank";
}

function setMerchantVpa(vpa) {
  localStorage.setItem(VPA_KEY, String(vpa || "").trim());
}

function upiPayQuery({ pa, pn, am, tn, tr }) {
  const q = new URLSearchParams({
    pa,
    pn: pn || "Buckzy Merchant",
    am: Number(am).toFixed(2),
    cu: "INR",
    tn: String(tn || "Buckzy payment").slice(0, 50),
    tr: String(tr || Date.now()),
    mode: "04",
  });
  return q.toString();
}

const UPI_APP_LINKS = {
  "Google Pay": {
    schemes: (q) => [`gpay://upi/pay?${q}`, `tez://upi/pay?${q}`],
    pkg: "com.google.android.apps.nbu.paisa.user",
    store: "https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user",
  },
  PhonePe: {
    schemes: (q) => [`phonepe://pay?${q}`, `ppe://pay?${q}`],
    pkg: "com.phonepe.app",
    store: "https://play.google.com/store/apps/details?id=com.phonepe.app",
  },
  Paytm: {
    schemes: (q) => [`paytmmp://pay?${q}`, `paytm://upi/pay?${q}`],
    pkg: "net.one97.paytm",
    store: "https://play.google.com/store/apps/details?id=net.one97.paytm",
  },
  BHIM: {
    schemes: (q) => [`bhim://pay?${q}`],
    pkg: "in.org.npci.upiapp",
    store: "https://play.google.com/store/apps/details?id=in.org.npci.upiapp",
  },
};

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function genericUpiUrl(q) {
  return `upi://pay?${q}`;
}

function androidIntentUrl(q, pkg, fallback) {
  return `intent://upi/pay?${q}#Intent;scheme=upi;package=${pkg};S.browser_fallback_url=${encodeURIComponent(fallback)};end`;
}

function launchHref(url) {
  const a = document.createElement("a");
  a.href = url;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

function openUpiApp(appName, order) {
  const pa = merchantVpa();
  if (!pa || !pa.includes("@")) {
    alert("Set a real merchant VPA first (example you@okhdfcbank). The app will open, but NPCI needs a valid payee.");
    return { ok: false, url: null };
  }
  const q = upiPayQuery({
    pa,
    pn: (order && order.pn) || "Jason Software Solutions",
    am: order && order.am,
    tn: order && order.tn,
    tr: order && order.tr,
  });
  const spec = UPI_APP_LINKS[appName];
  const generic = genericUpiUrl(q);
  let url = generic;
  if (spec) {
    if (isAndroid()) url = androidIntentUrl(q, spec.pkg, spec.store);
    else url = spec.schemes(q)[0];
  }
  launchHref(url);
  if (!isAndroid() && spec && spec.schemes(q)[1]) {
    setTimeout(() => launchHref(spec.schemes(q)[1]), 350);
  }
  return { ok: true, url, generic, pa };
}

window.BuckzyUpi = {
  merchantVpa,
  setMerchantVpa,
  openUpiApp,
  upiPayQuery,
  genericUpiUrl,
  UPI_APP_LINKS,
  isMobile,
};
