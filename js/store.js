const CART_KEY = "billvault.cart.v1";
const SALE_KEY = "billvault.sales.v1";
const CATALOG = [
  { id: "pwr-500", cat: "electricity", title: "State Power credit", denom: 500, blurb: "Pay any state electricity board bill.", logo: "P", bg: "linear-gradient(135deg,#0b3a82,#1b6ef3)", issuer: "State Power Pool" },
  { id: "pwr-1000", cat: "electricity", title: "State Power credit", denom: 1000, blurb: "Rs 1000 board credit. Valid 12 months.", logo: "P", bg: "linear-gradient(135deg,#082a5e,#2b7cff)", issuer: "State Power Pool" },
  { id: "pwr-2000", cat: "electricity", title: "State Power credit", denom: 2000, blurb: "High-value board credit for quarterly bills.", logo: "P", bg: "linear-gradient(135deg,#071427,#1b6ef3)", issuer: "State Power Pool" },
  { id: "lpg-900", cat: "gas", title: "LPG cylinder voucher", denom: 900, blurb: "Domestic cylinder refill credit.", logo: "G", bg: "linear-gradient(135deg,#7a1d12,#e04545)", issuer: "National LPG Grid" },
  { id: "lpg-1800", cat: "gas", title: "LPG twin voucher", denom: 1800, blurb: "Two-cylinder household pack.", logo: "G", bg: "linear-gradient(135deg,#5a120c,#c24141)", issuer: "National LPG Grid" },
  { id: "h2o-300", cat: "water", title: "Municipal water credit", denom: 300, blurb: "Water board bill credit.", logo: "W", bg: "linear-gradient(135deg,#0b4f63,#2bbbad)", issuer: "City Jal Board" },
  { id: "h2o-750", cat: "water", title: "Municipal water credit", denom: 750, blurb: "Quarterly water + sewerage credit.", logo: "W", bg: "linear-gradient(135deg,#083b4b,#1b9a5a)", issuer: "City Jal Board" },
  { id: "mob-299", cat: "mobile", title: "Nationwide prepaid", denom: 299, blurb: "Any-operator prepaid wallet.", logo: "M", bg: "linear-gradient(135deg,#3b0a78,#7c3aed)", issuer: "Nationwide Mobile" },
  { id: "mob-666", cat: "mobile", title: "Nationwide prepaid", denom: 666, blurb: "84-day prepaid pack credit.", logo: "M", bg: "linear-gradient(135deg,#2a0658,#1b6ef3)", issuer: "Nationwide Mobile" },
  { id: "bb-999", cat: "broadband", title: "Fibre 30-day pass", denom: 999, blurb: "ISP wallet top-up.", logo: "F", bg: "linear-gradient(135deg,#12324a,#2bbbad)", issuer: "Fibre Connect" },
  { id: "tag-500", cat: "fastag", title: "FASTag reload", denom: 500, blurb: "FASTag wallet reload PIN.", logo: "T", bg: "linear-gradient(135deg,#3a2a08,#f2c94c)", issuer: "Highway Tag" },
  { id: "tag-1000", cat: "fastag", title: "FASTag reload", denom: 1000, blurb: "Long-route FASTag credit.", logo: "T", bg: "linear-gradient(135deg,#2a1e06,#f2994a)", issuer: "Highway Tag" }
];
const CATS = [
  { id: "all", label: "All cards" },
  { id: "electricity", label: "Electricity" },
  { id: "gas", label: "LPG" },
  { id: "water", label: "Water" },
  { id: "mobile", label: "Mobile" },
  { id: "broadband", label: "Broadband" },
  { id: "fastag", label: "FASTag" }
];
function money(n) { return fmtINR(n); }
function readCart() { try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch (e) { return []; } }
function writeCart(c) { localStorage.setItem(CART_KEY, JSON.stringify(c)); }
function readSales() { try { return JSON.parse(localStorage.getItem(SALE_KEY) || "[]"); } catch (e) { return []; } }
function writeSales(s) { localStorage.setItem(SALE_KEY, JSON.stringify(s)); }
function cartCount() { return readCart().reduce(function (s, i) { return s + i.qty; }, 0); }
function cartTotal() {
  return readCart().reduce(function (s, i) {
    var p = CATALOG.find(function (x) { return x.id === i.id; });
    return s + (p ? p.denom * i.qty : 0);
  }, 0);
}
function addToCart(id) {
  var cart = readCart();
  var row = cart.find(function (x) { return x.id === id; });
  if (row) row.qty += 1; else cart.push({ id: id, qty: 1 });
  writeCart(cart);
}
function setQty(id, qty) {
  writeCart(readCart().map(function (x) { return x.id === id ? { id: x.id, qty: qty } : x; }).filter(function (x) { return x.qty > 0; }));
}
function issueVouchers(order) {
  var items = (order.notes && order.notes.items) || [];
  var vouchers = [];
  items.forEach(function (line) {
    for (var i = 0; i < line.qty; i++) {
      vouchers.push({ sku: line.id, title: line.title, amount: line.denom, pin: "BV-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + Math.random().toString(36).slice(2, 6).toUpperCase() });
    }
  });
  var sale = { id: order.id, payment_id: order.payment_id, method: order.method, amount: order.amount, status: "issued", created_at: Date.now(), vouchers: vouchers };
  writeSales(readSales().filter(function (s) { return s.id !== sale.id; }).concat([sale]).reverse().concat([]));
  var sales = readSales().filter(function (s) { return s.id !== sale.id; });
  sales.unshift(sale);
  writeSales(sales);
  return sale;
}
function art(p) {
  return '<div class="bv-card-art" style="background:' + p.bg + '"><div style="display:flex;justify-content:space-between"><div class="bv-logo">' + p.logo + '</div><span class="brand">BillVault</span></div><div><div style="opacity:.9">' + p.issuer + '</div><div style="font-size:28px;font-weight:800">' + money(p.denom) + '</div></div></div>';
}
function navCart() { var el = document.getElementById("nav-cart"); if (el) el.textContent = "Cart " + cartCount(); }
function shop(cat) {
  var list = cat && cat !== "all" ? CATALOG.filter(function (p) { return p.cat === cat; }) : CATALOG;
  return '<section class="bv-hero"><div class="bv-hero-inner"><div><div class="badge blue">Paid with Buckzy</div><h1>Gift cards for every utility bill</h1><p>Electricity, LPG, water, mobile, fibre and FASTag. PIN issued after Buckzy captures payment.</p><div class="bv-cats">' + CATS.map(function (c) { return '<a class="bv-chip ' + (c.id === (cat || "all") ? "on" : "") + '" href="store.html#/' + (c.id === "all" ? "" : "c/" + c.id) + '">' + c.label + '</a>'; }).join("") + '</div></div>' + art(CATALOG[0]) + '</div></section><div class="section"><h2>Featured cards</h2><div class="bv-grid" style="margin-top:16px">' + list.map(function (p) { return '<article class="bv-item">' + art(p) + '<div class="meta"><b>' + p.title + '</b><div class="muted">' + p.blurb + '</div><div class="price">' + money(p.denom) + '</div><div style="display:flex;gap:8px"><button class="btn" data-add="' + p.id + '">Add</button><a class="btn btn-primary" href="store.html#/p/' + p.id + '">Buy now</a></div></div></article>'; }).join("") + '</div></div>';
}
function productPage(id) {
  var p = CATALOG.find(function (x) { return x.id === id; });
  if (!p) return shop();
  return '<div class="section"><a href="store.html">Back</a><div class="bv-hero-inner" style="margin-top:16px">' + art(p) + '<div><div class="muted">' + p.issuer + '</div><h2>' + p.title + '</h2><p>' + p.blurb + '</p><div class="price" style="font-size:28px">' + money(p.denom) + '</div><div style="display:flex;gap:8px"><button class="btn" data-add="' + p.id + '">Add to cart</button><button class="btn btn-primary" data-buy="' + p.id + '">Checkout with Buckzy</button></div></div></div></div>';
}
function cartPage() {
  var rows = readCart();
  if (!rows.length) return '<div class="section"><h2>Cart is empty</h2><a href="store.html">Browse cards</a></div>';
  return '<div class="section"><h2>Cart</h2><div class="card panel">' + rows.map(function (r) { var p = CATALOG.find(function (x) { return x.id === r.id; }); return '<div class="cart-row"><div><b>' + p.title + '</b><div class="muted">' + money(p.denom) + '</div></div><div><button class="btn" data-qty="' + p.id + '" data-n="' + (r.qty - 1) + '">-</button> ' + r.qty + ' <button class="btn" data-qty="' + p.id + '" data-n="' + (r.qty + 1) + '">+</button> <b>' + money(p.denom * r.qty) + '</b></div></div>'; }).join("") + '<div class="cart-row"><b>To pay</b><b>' + money(cartTotal()) + '</b></div></div><button class="btn btn-primary" id="checkout" style="margin-top:14px">Pay with Buckzy</button></div>';
}
function ordersPage() {
  var sales = readSales();
  return '<div class="section"><h2>My cards</h2>' + (sales.length ? sales.map(function (s) { return '<a class="card panel" style="display:block;margin-bottom:10px" href="store.html#/o/' + s.id + '"><div class="stat-row"><span>' + s.id + '</span><span class="badge success">' + s.status + '</span></div><div class="muted">' + money(s.amount) + ' \u00b7 ' + s.vouchers.length + ' PIN(s)</div></a>'; }).join("") : '<p class="muted">No cards yet.</p>') + '</div>';
}
function orderPage(id) {
  var sale = readSales().find(function (s) { return s.id === id; });
  var pending = Buckzy.getOrder(id);
  if (!sale && pending) return '<div class="section"><h2>Order ' + id + '</h2><p>Status: <b>' + pending.status + '</b></p><div class="life"><div class="s on">1. Placed</div><div class="s">2. Paid</div><div class="s">3. Issued</div><div class="s">4. Ready</div></div></div>';
  if (!sale) return '<div class="section"><p>Order not found.</p></div>';
  return '<div class="section"><a href="store.html#/orders">My cards</a><h2>Cards issued</h2><p class="muted">' + sale.id + ' \u00b7 ' + money(sale.amount) + '</p><div class="life"><div class="s on">1. Placed</div><div class="s on">2. Paid</div><div class="s on">3. Issued</div><div class="s on">4. Ready</div></div>' + sale.vouchers.map(function (v) { return '<div class="card panel" style="margin-bottom:10px"><div class="muted">' + v.title + ' \u00b7 ' + money(v.amount) + '</div><div class="voucher">' + v.pin + '</div><p class="muted">Demo PIN — not live utility credit.</p></div>'; }).join("") + '<a href="index.html">Buckzy dashboard</a></div>';
}
function startCheckout() {
  var rows = readCart();
  if (!rows.length) return alert("Cart is empty.");
  var items = rows.map(function (r) { var p = CATALOG.find(function (x) { return x.id === r.id; }); return { id: p.id, title: p.title, denom: p.denom, qty: r.qty }; });
  var order = Buckzy.createOrder({ amount: cartTotal(), currency: "INR", receipt: "BV-" + Date.now().toString().slice(-6), customer: { name: "BillVault shopper", email: "shopper@billvault.test" }, notes: { title: items.map(function (i) { return i.qty + " x " + i.title; }).join(", "), items: items }, callback_url: "store.html" });
  location.href = order.checkout_url;
}
function bind() {
  document.querySelectorAll("[data-add]").forEach(function (b) { b.onclick = function () { addToCart(b.dataset.add); navCart(); render(); }; });
  document.querySelectorAll("[data-buy]").forEach(function (b) { b.onclick = function () { addToCart(b.dataset.buy); startCheckout(); }; });
  document.querySelectorAll("[data-qty]").forEach(function (b) { b.onclick = function () { setQty(b.dataset.qty, Number(b.dataset.n)); render(); }; });
  var ck = document.getElementById("checkout"); if (ck) ck.onclick = startCheckout;
}
function route() {
  var hash = location.hash.replace(/^#\/?/, "");
  var parts = hash.split("/");
  var a = parts[0], b = parts[1];
  if (a === "c") return shop(b);
  if (a === "p") return productPage(b);
  if (a === "cart") return cartPage();
  if (a === "orders") return ordersPage();
  if (a === "o") return orderPage(b);
  return shop();
}
function fulfillReturn() {
  var id = new URLSearchParams(location.search).get("order");
  if (!id) return;
  var order = Buckzy.getOrder(id);
  if (order && order.status === "paid") { issueVouchers(order); writeCart([]); history.replaceState({}, "", "store.html#/o/" + id); }
}
function render() { fulfillReturn(); document.getElementById("app").innerHTML = route(); navCart(); bind(); }
window.addEventListener("hashchange", render);
render();
