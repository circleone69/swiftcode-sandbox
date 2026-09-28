const VPA_KEY = "buckzy.merchant.vpa";

function merchantVpa() {
  const saved = localStorage.getItem(VPA_KEY);
  if (saved) return saved.trim();
  return (window.BZ && BZ.merchant && BZ.merchant.vpa) || "";
}

function setMerchantVpa(vpa) {
  localStorage.setItem(VPA_KEY, String(vpa || "").trim());
}

function upiPayQuery({ pa, pn, am, tn, tr }) {
  const q = new URLSearchParams({
    pa: pa || "",
    pn: pn || "Swiftcode",
    am: Number(am).toFixed(2),
    cu: "INR",
    tn: String(tn || "Buckzy payment").slice(0, 50),
    tr: String(tr || Date.now()),
  });
  return q.toString();
}

const UPI_APP_LINKS = {
  "Google Pay": {
    schemes: (q) => [`gpay://upi/pay?${q}`, `tez://upi/pay?${q}`],
    pkg: "com.google.android.apps.nbu.paisa.user",
  },
  PhonePe: {
    schemes: (q) => [`phonepe://pay?${q}`, `phonepe://upi/pay?${q}`],
    pkg: "com.phonepe.app",
  },
  Paytm: {
    schemes: (q) => [`paytmmp://pay?${q}`, `paytmmp://upi/pay?${q}`],
    pkg: "net.one97.paytm",
  },
  BHIM: {
    schemes: (q) => [`bhim://pay?${q}`, `bhim://upi/pay?${q}`],
    pkg: "in.org.npci.upiapp",
  },
};

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isMobile() {
  return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function genericUpiUrl(q) {
  return "upi://pay?" + q;
}

function androidIntentUrl(q, pkg) {
  return (
    "intent://upi/pay?" +
    q +
    "#Intent;scheme=upi;package=" +
    pkg +
    ";end"
  );
}

function urlsForApp(appName, order) {
  const pa = merchantVpa();
  const q = upiPayQuery({
    pa,
    pn: (order && order.pn) || "Swiftcode",
    am: order && order.am,
    tn: order && order.tn,
    tr: order && order.tr,
  });
  const generic = genericUpiUrl(q);
  const spec = UPI_APP_LINKS[appName];
  let primary = generic;
  if (spec && isAndroid()) primary = androidIntentUrl(q, spec.pkg);
  else if (spec) primary = spec.schemes(q)[0];
  return { pa, q, generic, primary };
}

function openUpiApp(appName, order) {
  const pa = merchantVpa();
  if (!pa || !pa.includes("@")) {
    alert("Enter a real merchant VPA first, example yourname@okhdfcbank. Then tap the app on a phone.");
    return { ok: false, url: null, pa };
  }
  if (!isMobile()) {
    alert("UPI intent only opens on a phone with Google Pay / PhonePe / Paytm installed. Open checkout on your phone.");
    return { ok: false, url: null, pa };
  }
  const urls = urlsForApp(appName, order);
  window.location.href = urls.primary;
  return { ok: true, url: urls.primary, generic: urls.generic, pa };
}

window.BuckzyUpi = {
  merchantVpa,
  setMerchantVpa,
  openUpiApp,
  urlsForApp,
  upiPayQuery,
  genericUpiUrl,
  UPI_APP_LINKS,
  isMobile,
  isAndroid,
};
