const ORDER_KEY = "buckzy.orders.v1";

function readOrders() {
  try { return JSON.parse(localStorage.getItem(ORDER_KEY) || "[]"); }
  catch { return []; }
}
function writeOrders(list) {
  localStorage.setItem(ORDER_KEY, JSON.stringify(list));
}

window.Buckzy = {
  key: "rz_test_bckz_live_demo",
  createOrder(payload) {
    const amount = Math.round(Number(payload.amount) * 100) / 100;
    const order = {
      id: "order_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      entity: "order",
      amount,
      currency: payload.currency || "INR",
      receipt: payload.receipt || ("rcpt_" + Date.now().toString().slice(-8)),
      status: "created",
      notes: payload.notes || {},
      customer: payload.customer || {},
      methods: payload.methods || ["upi_intent", "upi_collect", "upi_qr", "card", "netbanking", "wallet"],
      callback_url: payload.callback_url || "store.html",
      created_at: Date.now(),
      payment_id: null,
    };
    const list = readOrders();
    list.unshift(order);
    writeOrders(list);
    order.checkout_url = "checkout.html?order=" + encodeURIComponent(order.id);
    return order;
  },
  getOrder(id) {
    return readOrders().find((o) => o.id === id) || null;
  },
  listOrders() {
    return readOrders();
  },
  markPaid(orderId, payment) {
    const list = readOrders();
    const order = list.find((o) => o.id === orderId);
    if (!order) return null;
    order.status = payment.status === "SUCCESS" ? "paid" : "attempted";
    order.payment_id = payment.id;
    order.method = payment.method;
    order.paid_at = Date.now();
    writeOrders(list);
    return order;
  },
};
