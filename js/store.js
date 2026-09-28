const PRODUCTS = [
  { id: "buds", title: "Sonic buds", price: 2499, blurb: "ANC earbuds", color: "linear-gradient(135deg,#1b6ef3,#6aa4ff)" },
  { id: "lamp", title: "North desk lamp", price: 1899, blurb: "USB-C, dimmable", color: "linear-gradient(135deg,#f2c94c,#f2994a)" },
  { id: "notebook", title: "Field notebooks ×3", price: 499, blurb: "A5, dotted", color: "linear-gradient(135deg,#2bbbad,#1b9a5a)" },
  { id: "bottle", title: "Steel bottle 1L", price: 899, blurb: "Keeps cold 18h", color: "linear-gradient(135deg,#64748b,#94a3b8)" },
  { id: "mat", title: "Desk mat", price: 1299, blurb: "Wool felt", color: "linear-gradient(135deg,#e04545,#f2994a)" },
  { id: "mug", title: "Studio mug", price: 650, blurb: "Stoneware", color: "linear-gradient(135deg,#7c3aed,#1b6ef3)" },
];

const cart = [];

function money(n) { return fmtINR(n); }

function renderGrid() {
  document.getElementById("grid").innerHTML = PRODUCTS.map((p) => `
    <div class="product">
      <div class="swatch" style="background:${p.color}"></div>
      <b>${p.title}</b>
      <div class="muted">${p.blurb}</div>
      <div class="price">${money(p.price)}</div>
      <button class="btn" data-add="${p.id}">Add to cart</button>
    </div>`).join("");
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.onclick = () => {
      const item = PRODUCTS.find((x) => x.id === btn.dataset.add);
      cart.push(item);
      syncCart();
    };
  });
}

function syncCart() {
  const total = cart.reduce((s, i) => s + i.price, 0);
  document.getElementById("cart-label").textContent = cart.length
    ? `${cart.length} item${cart.length > 1 ? "s" : ""} · ${money(total)}`
    : "Cart empty";
  document.getElementById("cart-sub").textContent = cart.length
    ? cart.map((i) => i.title).join(", ")
    : "Add an item to create a Buckzy order";
}

document.getElementById("pay").onclick = () => {
  if (!cart.length) return alert("Add at least one item.");
  const total = cart.reduce((s, i) => s + i.price, 0);
  const order = Buckzy.createOrder({
    amount: total,
    currency: "INR",
    receipt: "ATLAS-" + Date.now().toString().slice(-6),
    customer: { name: "Walk-in shopper", email: "shopper@atlas.test" },
    notes: { title: cart.map((i) => i.title).join(", ") },
    callback_url: "store.html",
    methods: ["upi_intent", "upi_collect", "upi_qr", "card", "netbanking", "wallet"],
  });
  location.href = order.checkout_url;
};

async function showThanks() {
  const id = new URLSearchParams(location.search).get("order");
  if (!id) return;
  const order = Buckzy.getOrder(id);
  if (!order) return;
  const box = document.getElementById("thanks");
  box.style.display = "block";
  const hook = BuckzyWebhooks.readLog().find((w) => w.order_id === id);
  let verifyLine = "No signed webhook found yet.";
  if (hook) {
    const result = await BuckzyWebhooks.verifyWebhook({ body: hook.body, header: hook.header });
    verifyLine = result.ok
      ? `Webhook signature valid · <span class="mono">${hook.header}</span>`
      : `Webhook rejected (${result.reason}). Store will not fulfill on an unsigned payload.`;
    if (!result.ok && order.status === "paid") {
      document.getElementById("thanks-copy").innerHTML =
        `Order <b>${order.id}</b> came back as paid from the redirect, but <b>signature verification failed</b>. Atlas will not fulfill.<br>${verifyLine}`;
      return;
    }
  }
  document.getElementById("thanks-copy").innerHTML = order.status === "paid"
    ? `Fulfilled after verifying <span class="mono">payment.captured</span>. <b>${order.id}</b> · ${money(order.amount)} · ${order.method || ""} · ${order.payment_id || ""}<br>${verifyLine}`
    : `Order <b>${order.id}</b> is <b>${order.status}</b>. ${verifyLine}`;
}

renderGrid();
syncCart();
showThanks();
