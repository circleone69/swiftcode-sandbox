const params = new URLSearchParams(location.search);
const existing = params.get("order") ? Buckzy.getOrder(params.get("order")) : null;
const amount = existing ? existing.amount : Math.max(1, Number(params.get("amount")) || 1876.45);
const note = existing ? (existing.notes.title || existing.receipt) : (params.get("note") || "Demo order");
const orderId = existing ? existing.id : "ORD" + Date.now().toString().slice(-10);
const callback = existing ? existing.callback_url : "index.html#/overview";

document.getElementById("amt-label").textContent = fmtINR(amount);
document.getElementById("note").textContent = note;
document.getElementById("order-id").textContent = orderId;
if (existing && existing.customer && existing.customer.name) {
  const el = document.getElementById("payer-hint");
  if (el) el.textContent = existing.customer.name + (existing.customer.email ? " · " + existing.customer.email : "");
}

const vpaInput = document.getElementById("merchant-vpa");
if (vpaInput) {
  vpaInput.value = BuckzyUpi.merchantVpa();
  vpaInput.addEventListener("change", () => BuckzyUpi.setMerchantVpa(vpaInput.value));
}

let method = "upi-intent";
let app = "Google Pay";

function orderForUpi() {
  return {
    pn: "Jason Software Solutions",
    am: amount,
    tn: note,
    tr: orderId,
  };
}

function launchSelectedApp(name) {
  if (vpaInput) BuckzyUpi.setMerchantVpa(vpaInput.value);
  const status = document.getElementById("intent-status");
  const result = BuckzyUpi.openUpiApp(name, orderForUpi());
  if (status) {
    status.textContent = result.ok
      ? `Opening ${name}… Pay ₹${Number(amount).toFixed(2)} to ${result.pa}. Come back here and tap Pay now after the app confirms.`
      : `${name} did not launch. Enter a valid VPA and try on a phone with the app installed.`;
  }
}

document.querySelectorAll(".cko-method").forEach((el) => {
  el.onclick = () => {
    document.querySelectorAll(".cko-method").forEach((x) => x.classList.remove("on"));
    el.classList.add("on");
    method = el.dataset.method;
  };
});

document.querySelectorAll(".app-btn").forEach((el) => {
  el.onclick = (e) => {
    e.stopPropagation();
    document.querySelectorAll(".app-btn").forEach((x) => x.classList.remove("on"));
    el.classList.add("on");
    app = el.dataset.app;
    method = "upi-intent";
    document.querySelector('[data-method="upi-intent"]').classList.add("on");
    launchSelectedApp(app);
  };
});

function maskPan(pan) {
  const d = (pan || "").replace(/\D/g, "");
  if (d.length < 4) return "XXXXXXXXXXXX0000";
  return "XXXXXXXXXXXX" + d.slice(-4);
}

function nowParts() {
  const n = new Date();
  const pad = (x) => String(x).padStart(2, "0");
  return {
    time: `${pad(n.getHours())}:${pad(n.getMinutes())}:${pad(n.getSeconds())}`,
    hour: n.getHours(),
  };
}

function describe() {
  if (method === "upi-intent") return { method: `UPI Intent (${app === "Google Pay" ? "GPay" : app})`, payer: sampleVpa(app) };
  if (method === "upi-collect") {
    const vpa = (document.getElementById("vpa").value || "customer@okhdfcbank").trim();
    return { method: "UPI Collect", payer: vpa };
  }
  if (method === "upi-qr") return { method: "UPI QR", payer: "qr@buckzy" };
  if (method === "card") {
    const pan = document.getElementById("pan").value || "";
    const brand = Number((pan.replace(/\D/g, "")[0] || "4")) >= 5 ? "Debit Card" : "Credit Card";
    return { method: brand, payer: maskPan(pan) };
  }
  if (method === "nb") return { method: "Net Banking", payer: document.getElementById("bank").value };
  return { method: `Wallet (${document.getElementById("wallet").value})`, payer: "9876543210@ikwik" };
}

function sampleVpa(name) {
  if (name === "PhonePe") return "demo.user@ybl";
  if (name === "Paytm") return "demo.user@paytm";
  if (name === "BHIM") return "demo.user@upi";
  return "demo.user@okhdfcbank";
}

document.getElementById("pay").onclick = () => {
  const fail = document.getElementById("fail").checked || (document.getElementById("vpa") && (document.getElementById("vpa").value || "").toLowerCase().includes("fail"));
  const { time, hour } = nowParts();
  const info = describe();
  const panel = document.getElementById("panel");
  panel.innerHTML = `<div class="cko-status"><div class="spin"></div><h3>Contacting issuing rail…</h3><p class="muted">${info.method}<br>${fmtINR(amount)}</p></div>`;

  setTimeout(() => {
    const payment = {
      id: "BCKZLIVE" + Date.now().toString().slice(-10),
      time,
      hour,
      method: info.method,
      payer: info.payer,
      amount,
      status: fail ? "FAILED" : "SUCCESS",
      code: fail ? "U05" : "00",
      remark: fail ? "Insufficient Funds" : "-",
      note,
      orderId,
    };
    BZ_API.applyPayment(BZ, payment, true);
    if (existing) Buckzy.markPaid(existing.id, payment);

    BuckzyWebhooks.deliverWebhook({
      event: fail ? "payment.failed" : "payment.captured",
      payload: {
        id: payment.id,
        order_id: orderId,
        amount,
        method: info.method,
        payer: info.payer,
        status: payment.status,
        code: payment.code,
      },
    }).then((wh) => {
    const backStore = existing ? `${callback}${callback.includes("?") ? "&" : "?"}order=${encodeURIComponent(existing.id)}` : callback;
    const sigNote = `<p class="muted">Webhook <span class="mono">${wh.event}</span> · <span class="mono">${wh.status}</span><br>X-Buckzy-Signature <span class="mono">${wh.header}</span><br>Merchant verify: <b>${wh.verified ? "valid" : wh.reason}</b></p>`;
    if (fail) {
      panel.innerHTML = `<div class="cko-status">
        <h3>Payment failed</h3>
        <p class="muted">U05 · Insufficient Funds</p>
        <p><b>${payment.id}</b></p>
        ${sigNote}
        <a class="btn btn-primary" href="${backStore}">Return to merchant</a>
        <div style="margin-top:10px"><a href="index.html#/webhooks">Open webhook log</a></div>
      </div>`;
    } else {
      panel.innerHTML = `<div class="cko-status">
        <div class="badge success">SUCCESS</div>
        <h3 style="margin:12px 0 6px">Payment captured</h3>
        <p class="cko-amt" style="font-size:28px">${fmtINR(amount)}</p>
        <p class="muted">${info.method}<br>${payment.id}</p>
        ${sigNote}
        <a class="btn btn-primary" href="${backStore}">Return to merchant site</a>
        <div style="margin-top:10px"><a href="index.html#/webhooks">See signature on dashboard</a></div>
      </div>`;
    }
    });
  }, 1400);
};
