const ICONS = {
  overview: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
  tx: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18"/></svg>',
  settle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19V5m0 14h16M8 16V8m4 8V11m4 5v-3"/></svg>',
  refund: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 14 4 9l5-5"/><path d="M20 20v-7a4 4 0 0 0-4-4H4"/></svg>',
  dispute: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v4m0 4h.01M10.3 3.3 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.3a2 2 0 0 0-3.4 0z"/></svg>',
  link: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.07 0l2.12-2.12a5 5 0 0 0-7.07-7.07L10.7 5.2"/><path d="M14 11a5 5 0 0 0-7.07 0L4.8 13.12a5 5 0 0 0 7.07 7.07L13.3 18.8"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
  report: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/></svg>',
  recon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
  hook: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
  risk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
  code: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m8 9-4 3 4 3M16 9l4 3-4 3M13 6l-2 12"/></svg>',
  gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9c.3.7.9 1.2 1.6 1.4H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
};

const NAV = [
  ["overview", "Overview", ICONS.overview],
  ["transactions", "Transactions", ICONS.tx],
  ["settlements", "Settlements", ICONS.settle],
  ["refunds", "Refunds & Chargebacks", ICONS.refund],
  ["disputes", "Disputes", ICONS.dispute],
  ["links", "Payment Links", ICONS.link],
  ["customers", "Customers", ICONS.users],
  ["reports", "Reports", ICONS.report],
  ["reconciliation", "Reconciliation", ICONS.recon],
  ["webhooks", "Webhooks", ICONS.hook],
  "sec:Risk & Compliance",
  ["risk", "Risk & Compliance", ICONS.risk],
  ["developer", "Developer", ICONS.code],
  ["settings", "Settings", ICONS.gear],
];

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 2200);
}

function downloadCsv(name, rows) {
  const csv = rows.map((r) => r.map((c) => `"${String(c).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
  toast("Report downloaded");
}

function statusBadge(s) {
  if (s === "SUCCESS" || s === "Settled" || s === "Paid" || s === "Reconciled") return `<span class="badge success">${s}</span>`;
  if (s === "FAILED" || s === "500") return `<span class="badge fail">${s}</span>`;
  if (s === "Open" || s === "Pending") return `<span class="badge warn">${s}</span>`;
  return `<span class="badge neutral">${s}</span>`;
}

function pageOverview() {
  const d = BZ.day;
  const maxH = Math.max(...BZ.hourly);
  const bars = BZ.hourly
    .map((v, i) => {
      const h = Math.max(4, (v / maxH) * 148);
      const lakhs = v / 100000;
      const label = lakhs >= 1 ? lakhs.toFixed(2) + "L" : (v / 1000).toFixed(0) + "k";
      const show = [0, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22].includes(i);
      return `<div class="bar-col"><div class="amt">${show ? label : ""}</div><div class="bar" style="height:${h}px"></div><div class="hr">${String(i).padStart(2, "0")}</div></div>`;
    })
    .join("");

  const methodRows = BZ.methods
    .map((m) => {
      const rate = ((m.ok / m.tx) * 100).toFixed(2);
      return `<tr>
        <td>${m.name}</td>
        <td class="tright mono">${fmtN(m.tx)}</td>
        <td class="tright mono">${fmtN(m.ok)}</td>
        <td class="tright mono">${fmtN(m.fail)}</td>
        <td class="tright">${rate}%</td>
        <td class="tright mono">${fmtINR(m.amount)}</td>
        <td class="tright mono">${fmtINR(m.refunds)}</td>
        <td class="tright mono">${fmtINR(m.net)}</td>
      </tr>`;
    })
    .join("");

  const legend = BZ.methods
    .map((m) => `<li><span><span class="dot" style="background:${m.color}"></span>${m.name}</span><span class="amt">${fmtINR(m.amount)} (${pct(m.amount, d.gross)})</span></li>`)
    .join("");

  const batches = BZ.batches
    .map((b) => `<tr><td class="mono">${b.id}</td><td>${b.time}</td><td class="tright">${fmtN(b.tx)}</td><td class="tright mono">${fmtINR(b.amount)}</td><td><span class="badge success">${b.status}</span></td></tr>`)
    .join("");

  const pspTotalAmt = BZ.psps.reduce((s, p) => s + p.amount, 0);
  const pspTotalN = BZ.psps.reduce((s, p) => s + p.count, 0);
  const psps = BZ.psps
    .map((p) => `<tr><td>${p.name}</td><td class="tright mono">${fmtINR(p.amount)}</td><td class="tright">${fmtN(p.count)}</td></tr>`)
    .join("");

  const recent = BZ.transactions
    .slice(0, 10)
    .map((t, i) => `<tr class="${i === 0 && t[0].startsWith("BCKZLIVE") ? "live-row" : ""}">
      <td class="mono">${t[0]}</td><td>${t[1]}</td><td>${t[2]}</td><td class="mono">${t[3]}</td>
      <td class="tright mono">${fmtINR(t[4])}</td><td>${statusBadge(t[5])}</td><td>${t[6]}</td><td class="muted">${t[7]}</td>
    </tr>`)
    .join("");

  const failTotalTx = BZ.failures.reduce((s, f) => s + f.tx, 0);
  const failTotalAmt = BZ.failures.reduce((s, f) => s + f.amount, 0);
  const fails = BZ.failures
    .map((f) => `<tr><td>${f.reason}</td><td class="tright">${f.tx}</td><td class="tright mono">${fmtINR(f.amount)}</td></tr>`)
    .join("");

  const failPct = d.tx ? ((d.failedTx / d.tx) * 100).toFixed(2) : "0.00";
  const okPct = d.successRateTx;

  return `
    <div class="kpis">
      <div class="card kpi"><div class="label">Total Pay-In (Gross)</div><div class="val">${fmtINR(d.gross)}</div><div class="hint">Yesterday: ${fmtINR(d.yday.gross)} ${delta(d.gross, d.yday.gross)}</div></div>
      <div class="card kpi"><div class="label">Successful Amount</div><div class="val">${fmtINR(d.successfulAmount)}</div><div class="hint">Success Rate <b class="ok">${d.successRateAmt.toFixed(2)}%</b> &nbsp; Yesterday: ${d.yday.successRateAmt}%</div></div>
      <div class="card kpi"><div class="label">Total Transactions</div><div class="val">${fmtN(d.tx)}</div><div class="hint">Yesterday: ${fmtN(d.yday.tx)} ${delta(d.tx, d.yday.tx)}</div></div>
      <div class="card kpi"><div class="label">Successful Transactions</div><div class="val">${fmtN(d.successTx)}</div><div class="hint">Yesterday: ${fmtN(d.yday.successTx)} ${delta(d.successTx, d.yday.successTx)}</div></div>
      <div class="card kpi"><div class="label">Failed Transactions</div><div class="val">${fmtN(d.failedTx)}</div><div class="hint">Yesterday: ${fmtN(d.yday.failedTx)} ${delta(d.failedTx, d.yday.failedTx, true)}</div></div>
      <div class="card kpi"><div class="label">Refunds / Chargebacks</div><div class="val">${fmtINR(d.refunds)}</div><div class="hint">Refund Rate ${d.refundRate.toFixed(2)}% &nbsp; Yesterday: ${d.yday.refundRate}%</div></div>
      <div class="card kpi"><div class="label">Avg. Ticket Size</div><div class="val">${fmtINR(d.avgTicket)}</div><div class="hint">Yesterday: ${fmtINR(d.yday.avgTicket)} ${delta(d.avgTicket, d.yday.avgTicket)}</div></div>
    </div>

    <div class="card settle">
      <div style="flex:1">
        <div class="title">${ICONS.settle} Settlement Summary</div>
        <div class="settle-flow">
          <div class="sbox"><div class="k">Opening Balance (${d.ydayShort})</div><div class="v">${fmtINR(d.openingBalance)}</div></div>
          <div class="op">+</div>
          <div class="sbox"><div class="k">+ Gross Pay-In</div><div class="v">${fmtINR(d.gross)}</div></div>
          <div class="op">−</div>
          <div class="sbox"><div class="k">− Refunds</div><div class="v">${fmtINR(d.refunds)}</div></div>
          <div class="op">−</div>
          <div class="sbox"><div class="k">− Fees & Charges</div><div class="v">${fmtINR(d.fees)}</div></div>
          <div class="op">=</div>
          <div class="sbox"><div class="k">= Net Settlement</div><div class="v">${fmtINR(d.netSettlement)}</div></div>
        </div>
      </div>
      <div class="avail">
        <div class="k">Available Balance (${d.dateShort})</div>
        <div class="v">${fmtINR(d.available)}</div>
        <button class="linkish" onclick="location.hash='#/settlements'">View Settlement Details</button>
      </div>
    </div>

    <div class="grid-3">
      <div class="card panel">
        <h3>Pay-In Volume Over Time (Hourly)</h3>
        <div class="chart-box">
          <div class="y-axis"><span>10L</span><span>7.5L</span><span>5L</span><span>2.5L</span><span>0</span></div>
          <div class="chart-wrap">${bars}</div>
        </div>
      </div>
      <div class="card panel">
        <h3>Payment Method Distribution (Amount)</h3>
        <div class="donut-row">
          <div class="donut" style="background:conic-gradient(${BZ_API.conicFrom(BZ.methods)})"><div class="donut-inner"><b>${fmtINR(d.gross)}</b><span>Total</span></div></div>
          <ul class="legend">${legend}</ul>
        </div>
      </div>
      <div class="card panel">
        <h3>Success vs Failure</h3>
        <div class="ring" style="background:conic-gradient(#22a35a 0 ${okPct}%, #e04545 ${okPct}% 100%)"><div class="ring-inner"></div></div>
        <ul class="legend">
          <li><span><span class="dot" style="background:#22a35a"></span>Successful</span><span>${fmtN(d.successTx)} (${okPct}%)</span></li>
          <li><span><span class="dot" style="background:#e04545"></span>Failed</span><span>${fmtN(d.failedTx)} (${failPct}%)</span></li>
        </ul>
      </div>
    </div>

    <div class="grid-tables">
      <div class="card panel">
        <h3>Payment Method Performance</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>Payment Method</th><th class="tright">Transactions</th><th class="tright">Success</th><th class="tright">Failed</th><th class="tright">Success Rate</th><th class="tright">Amount (₹)</th><th class="tright">Refunds (₹)</th><th class="tright">Net Amount (₹)</th></tr></thead>
          <tbody>${methodRows}
            <tr><td><b>Total</b></td><td class="tright"><b>${fmtN(d.tx)}</b></td><td class="tright"><b>${fmtN(d.successTx)}</b></td><td class="tright"><b>${fmtN(d.failedTx)}</b></td><td class="tright"><b>${d.successRateTx}%</b></td><td class="tright"><b>${fmtINR(d.gross)}</b></td><td class="tright"><b>${fmtINR(d.refunds)}</b></td><td class="tright"><b>${fmtINR(d.successfulAmount)}</b></td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card panel">
        <h3>Settlement Batches (${d.dateShort})</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>Batch ID</th><th>Settlement Time</th><th class="tright">Transactions</th><th class="tright">Amount (₹)</th><th>Status</th></tr></thead>
          <tbody>${batches}
            <tr><td><b>Total</b></td><td></td><td class="tright"><b>${fmtN(d.tx)}</b></td><td class="tright"><b>${fmtINR(d.gross)}</b></td><td></td></tr>
          </tbody>
        </table></div>
      </div>
      <div class="card panel">
        <h3>Top Payer PSPs (UPI Intent)</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>Payer PSP</th><th class="tright">Amount (₹)</th><th class="tright">Txn Count</th></tr></thead>
          <tbody>${psps}
            <tr><td><b>Total</b></td><td class="tright"><b>${fmtINR(pspTotalAmt)}</b></td><td class="tright"><b>${fmtN(pspTotalN)}</b></td></tr>
          </tbody>
        </table></div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card panel">
        <h3>Recent Transactions</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>Txn ID</th><th>Time</th><th>Payment Method</th><th>Payer Details</th><th class="tright">Amount (₹)</th><th>Status</th><th>Resp. Code</th><th>Remark</th></tr></thead>
          <tbody>${recent}</tbody>
        </table></div>
      </div>
      <div class="card panel">
        <h3>Failure Summary</h3>
        <div class="table-wrap"><table>
          <thead><tr><th>Reason</th><th class="tright">Transactions</th><th class="tright">Amount (₹)</th></tr></thead>
          <tbody>${fails}
            <tr><td><b>Total</b></td><td class="tright"><b>${failTotalTx}</b></td><td class="tright"><b>${fmtINR(failTotalAmt)}</b></td></tr>
          </tbody>
        </table></div>
        <p class="muted" style="margin:10px 0 0">All amounts are INR</p>
      </div>
    </div>
  `;
}

function filterState() {
  return {
    q: document.getElementById("q")?.value.toLowerCase() || "",
    method: document.getElementById("method")?.value || "all",
    status: document.getElementById("status")?.value || "all",
  };
}

function pageTransactions() {
  const rows = BZ.transactions
    .map((t) => `<tr>
      <td class="mono">${t[0]}</td><td>${BZ.day.dateShort} ${t[1]}</td><td>${t[2]}</td>
      <td class="mono">${t[3]}</td><td class="tright mono">${fmtINR(t[4])}</td>
      <td>${statusBadge(t[5])}</td><td>${t[6]}</td><td class="muted">${t[7]}</td>
    </tr>`)
    .join("");
  return `
    <div class="page-head">
      <div>
        <h3 style="margin:0">Transactions</h3>
        <div class="muted">Authorizations, captures and declines for ${BZ.day.dateShort}</div>
      </div>
      <div class="toolbar">
        <input class="search" id="q" placeholder="Search txn id, VPA, PAN mask…">
        <select class="pill" id="method">
          <option value="all">All methods</option>
          <option>UPI Intent</option><option>UPI Collect</option><option>Debit Card</option>
          <option>Credit Card</option><option>Net Banking</option><option>Wallet</option>
        </select>
        <select class="pill" id="status">
          <option value="all">All status</option><option>SUCCESS</option><option>FAILED</option>
        </select>
        <button class="btn btn-primary" onclick="downloadCsv('buckzy-transactions-2026-08-12.csv', [['Txn ID','Time','Method','Payer','Amount','Status','Code','Remark'], ...BZ.transactions])">Export</button>
      </div>
    </div>
    <div class="card panel">
      <div class="table-wrap"><table id="tx-table">
        <thead><tr><th>Txn ID</th><th>Time</th><th>Payment Method</th><th>Payer Details</th><th class="tright">Amount</th><th>Status</th><th>Resp. Code</th><th>Remark</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
}

function pageSettlements() {
  const d = BZ.day;
  const rows = BZ.batches
    .map((b) => `<tr><td class="mono">${b.id}</td><td>${d.dateShort} ${b.time}</td><td class="tright">${fmtN(b.tx)}</td><td class="tright mono">${fmtINR(b.amount)}</td><td>NEFT / IMPS</td><td>${statusBadge(b.status)}</td><td class="mono">UTR${b.id.slice(-6)}9261</td></tr>`)
    .join("");
  return `
    <div class="kpis">
      <div class="card kpi"><div class="label">Gross captured</div><div class="val">${fmtINR(d.gross)}</div></div>
      <div class="card kpi"><div class="label">Fees & GST</div><div class="val">${fmtINR(d.fees)}</div></div>
      <div class="card kpi"><div class="label">Refunds withheld</div><div class="val">${fmtINR(d.refunds)}</div></div>
      <div class="card kpi"><div class="label">Net to merchant</div><div class="val">${fmtINR(d.netSettlement)}</div></div>
      <div class="card kpi"><div class="label">Opening float</div><div class="val">${fmtINR(d.openingBalance)}</div></div>
      <div class="card kpi"><div class="label">Available balance</div><div class="val">${fmtINR(d.available)}</div></div>
      <div class="card kpi"><div class="label">Batches settled</div><div class="val">6 / 6</div></div>
    </div>
    <div class="card panel" style="margin-top:12px">
      <h3>Settlement batches</h3>
      <p class="muted">T+0 cycling every 4 hours against the sponsor bank nodal account. Formula used: opening + gross − refunds − fees = available.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Batch ID</th><th>Cut-off</th><th class="tright">Txns</th><th class="tright">Gross</th><th>Rail</th><th>Status</th><th>Bank UTR</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>`;
}

function pageRefunds() {
  return `
    <div class="kpis">
      <div class="card kpi"><div class="label">Refund volume</div><div class="val">${fmtINR(42179.85)}</div></div>
      <div class="card kpi"><div class="label">Refund rate</div><div class="val">0.50%</div></div>
      <div class="card kpi"><div class="label">Chargebacks open</div><div class="val">2</div></div>
      <div class="card kpi"><div class="label">Chargeback liability</div><div class="val">${fmtINR(18640)}</div></div>
    </div>
    <div class="card panel" style="margin-top:12px">
      <h3>Refund register</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>Refund ID</th><th>Original Txn</th><th>Method</th><th class="tright">Amount</th><th>Reason</th><th>Status</th></tr></thead>
        <tbody>
          <tr><td class="mono">RF-26081201</td><td class="mono">BCKZ120826184412201</td><td>UPI Intent</td><td class="tright">${fmtINR(2499)}</td><td>Customer cancelled order</td><td>${statusBadge("SUCCESS")}</td></tr>
          <tr><td class="mono">RF-26081202</td><td class="mono">BCKZ120826151102881</td><td>Credit Card</td><td class="tright">${fmtINR(7890.5)}</td><td>Duplicate capture</td><td>${statusBadge("Pending")}</td></tr>
          <tr><td class="mono">CB-26080911</td><td class="mono">BCKZ090826102211004</td><td>Debit Card</td><td class="tright">${fmtINR(18640)}</td><td>Visa reason 83 — fraud</td><td><span class="badge fail">Chargeback</span></td></tr>
        </tbody>
      </table></div>
    </div>`;
}

function applyReconFilter() {
  const raw = Number(String(document.getElementById("apply-amt").value || "0").replace(/,/g, ""));
  const expected = Number.isFinite(raw) ? raw : 0;
  const actual = BZ.day.gross;
  const diff = +(actual - expected).toFixed(2);
  const status = Math.abs(diff) < 1 ? "Reconciled" : "Break";
  const badge = document.getElementById("recon-badge");
  const expectedEl = document.getElementById("recon-expected");
  const diffEl = document.getElementById("recon-diff");
  if (badge) {
    badge.className = "badge " + (status === "Reconciled" ? "success" : "fail");
    badge.textContent = status;
  }
  if (expectedEl) expectedEl.textContent = fmtINR(expected);
  if (diffEl) {
    diffEl.textContent = fmtINR(diff);
    diffEl.className = Math.abs(diff) < 1 ? "ok" : "down";
  }
  toast(status === "Reconciled" ? "Expected gross matches ledger" : "Break: ledger vs expected do not match");
}

function pageRecon() {
  const d = BZ.day;
  const mix = [
    { name: "Google Pay", amount: BZ.psps[0].amount, color: "#2F80ED" },
    { name: "PhonePe", amount: BZ.psps[1].amount, color: "#2BBBAD" },
    { name: "Paytm", amount: BZ.psps[2].amount, color: "#1B9A5A" },
    { name: "BHIM", amount: BZ.psps[3].amount, color: "#E04545" },
    { name: "Other UPI Apps", amount: BZ.psps.slice(4).reduce((s, p) => s + p.amount, 0), color: "#64748B" },
  ];
  const slices = mix
    .map((p) => `<li><span><span class="dot" style="background:${p.color}"></span>${p.name}</span><span class="amt">${fmtINR(p.amount)}</span></li>`)
    .join("");
  return `
    <div class="recon-grid">
      <div class="card panel">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <div>
            <div class="muted">Buckzy · Payment Gateway Operations</div>
            <h3 style="margin:4px 0 0">UPI Channel Mix</h3>
          </div>
          <span class="badge success" id="recon-badge">Reconciled</span>
        </div>
        <div class="muted" style="margin-top:12px">Expected gross pay-in</div>
        <div class="amount-box" style="margin:6px 0 4px">
          <span>₹</span>
          <input id="apply-amt" value="${Math.round(d.gross)}" />
          <button class="btn btn-primary" onclick="applyReconFilter()">Apply</button>
        </div>
        <p class="muted" style="margin:0 0 12px">Ops check: type the amount finance expected for the day, then Apply. It is compared with ledger gross. This is not a payment box.</p>
        <div class="pie-lg" style="background:conic-gradient(${BZ_API.conicFrom(mix)})"></div>
        <ul class="legend">${slices}</ul>
      </div>
      <div class="card panel">
        <h3>Reconciliation Status</h3>
        <div class="stat-row"><span class="muted">Expected gross (from box)</span><b id="recon-expected">${fmtINR(d.gross)}</b></div>
        <div class="stat-row"><span class="muted">Gross Pay-in (ledger)</span><b>${fmtINR(d.gross)}</b></div>
        <div class="stat-row"><span class="muted">Difference</span><b id="recon-diff" class="ok">${fmtINR(0)}</b></div>
        <div class="stat-row"><span class="muted">Batches Total</span><b>${fmtINR(BZ.batches.reduce((s,b)=>s+b.amount,0))}</b></div>
        <div class="stat-row"><span class="muted">Refunds</span><b>${fmtINR(d.refunds)}</b></div>
        <div class="stat-row"><span class="muted">MDR + GST + switch fee</span><b>${fmtINR(d.fees)}</b></div>
        <div class="stat-row"><span class="muted">Net Settlement</span><b>${fmtINR(d.netSettlement)}</b></div>
        <div class="stat-row"><span class="muted">Bank statement matched</span><b class="ok">6 / 6 UTRs</b></div>
        <p class="muted" style="margin-top:16px">A day stays Reconciled only when expected gross = ledger gross = batch total, and every UTR sits on the nodal statement.</p>
      </div>
    </div>`;
}

function pageWebhooks() {
  const live = typeof BuckzyWebhooks !== "undefined" ? BuckzyWebhooks.readLog() : [];
  const rows = (live.length ? live : BZ.webhooks).map((w) => {
    const sig = w.header || "unsigned / legacy";
    const badge = w.verified === false ? statusBadge("401") : statusBadge(w.status || "200");
    const why = w.verified === false ? w.reason || "bad_signature" : (w.header ? "valid" : "legacy");
    return `<tr>
      <td class="mono">${w.event}</td>
      <td class="mono">${w.url || "https://api.jasonsoft.in/webhooks/buckzy"}</td>
      <td>${badge}</td>
      <td>${w.time || ""}</td>
      <td class="mono">${sig}</td>
      <td>${why}</td>
    </tr>`;
  }).join("") || `<tr><td colspan="6" class="muted">No live signed webhooks yet. Complete a checkout to mint one.</td></tr>`;

  return `
    <div class="page-head">
      <div>
        <h3 style="margin:0">Webhooks</h3>
        <div class="muted">HMAC-SHA256 over <span class="mono">t + "." + raw JSON body</span> · header <span class="mono">X-Buckzy-Signature</span></div>
      </div>
    </div>
    <div class="card panel">
      <div class="stat-row"><span>Endpoint</span><span class="mono">https://api.jasonsoft.in/webhooks/buckzy</span></div>
      <div class="stat-row"><span>Secret</span><span class="mono">${typeof BuckzyWebhooks !== "undefined" ? BuckzyWebhooks.secret() : "whsec_bckz_sandbox_4e2f9a"}</span></div>
      <div class="stat-row"><span>Tolerance</span><span>300 seconds</span></div>
      <p class="muted">Merchant must recompute the HMAC and reject a 401 if it does not match. Redirect success is ignored until this passes.</p>
      <div class="table-wrap"><table>
        <thead><tr><th>Event</th><th>Endpoint</th><th>HTTP</th><th>Time</th><th>X-Buckzy-Signature</th><th>Verify</th></tr></thead>
        <tbody>${rows}</tbody>
      </table></div>
    </div>
    <div class="card panel" style="margin-top:12px">
      <h3>Signature playground</h3>
      <p class="muted">Paste a body and header, or load the latest event. Tamper the body to watch verification fail.</p>
      <textarea class="field" id="wh-body" rows="7" placeholder="raw JSON body"></textarea>
      <input class="field" id="wh-header" placeholder="t=…,v1=…" />
      <input class="field" id="wh-secret" value="${typeof BuckzyWebhooks !== "undefined" ? BuckzyWebhooks.secret() : ""}" />
      <div class="toolbar" style="margin-top:10px">
        <button class="btn" onclick="loadLatestWebhook()">Load latest</button>
        <button class="btn" onclick="document.getElementById('wh-body').value = document.getElementById('wh-body').value + ' '">Tamper body</button>
        <button class="btn btn-primary" onclick="runWebhookVerify()">Verify</button>
      </div>
      <p id="wh-result" class="muted" style="margin-top:10px"></p>
    </div>`;
}

window.loadLatestWebhook = function () {
  const latest = BuckzyWebhooks.readLog()[0];
  if (!latest) return toast("No signed webhook yet");
  document.getElementById("wh-body").value = latest.body;
  document.getElementById("wh-header").value = latest.header;
  document.getElementById("wh-secret").value = BuckzyWebhooks.secret();
  toast("Loaded " + latest.event);
};

window.runWebhookVerify = async function () {
  const result = await BuckzyWebhooks.verifyWebhook({
    body: document.getElementById("wh-body").value,
    header: document.getElementById("wh-header").value,
    secret: document.getElementById("wh-secret").value,
  });
  const el = document.getElementById("wh-result");
  el.innerHTML = result.ok
    ? `<span class="badge success">valid</span> HMAC matched. Timestamp ${result.t}.`
    : `<span class="badge fail">${result.reason}</span> Reject this event. Do not fulfill.`;
};

function simpleTablePage(title, sub, headers, rows) {
  return `
    <div class="page-head"><div><h3 style="margin:0">${title}</h3><div class="muted">${sub}</div></div></div>
    <div class="card panel"><div class="table-wrap"><table>
      <thead><tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table></div></div>`;
}

function render(route) {
  const titles = {
    overview: ["Transaction Dashboard", "Real-time payment monitoring and settlement overview"],
    transactions: ["Transactions", "Full authorization log"],
    settlements: ["Settlements", "Nodal account batches and available balance"],
    refunds: ["Refunds & Chargebacks", "Reversals, RRN matching and scheme claims"],
    disputes: ["Disputes", "Open representment queue"],
    links: ["Payment Links", "Shareable collection requests"],
    customers: ["Customers", "Merchant sub-accounts and volume"],
    reports: ["Reports", "MIS extracts for finance"],
    reconciliation: ["Reconciliation", "Ledger vs bank vs PSP switch"],
    webhooks: ["Webhooks", "Outbound event delivery"],
    risk: ["Risk & Compliance", "Velocity, velocity lists and KYC"],
    developer: ["Developer", "Keys, callbacks and sandbox"],
    settings: ["Settings", "Merchant profile and settlement account"],
  };

  document.querySelectorAll(".nav a").forEach((a) => a.classList.toggle("active", a.dataset.route === route));
  const [t, s] = titles[route] || titles.overview;
  document.getElementById("page-title").textContent = t;
  document.getElementById("page-sub").textContent = s;
  const dates = businessDates();
  const dateEl = document.getElementById("biz-date");
  if (dateEl) dateEl.textContent = "📅 " + dates.long;
  const upd = document.getElementById("last-updated");
  if (upd) upd.textContent = "Last updated " + dates.stamp;
  const gen = document.getElementById("report-gen");
  if (gen) gen.textContent = `Report generated on ${dates.stamp} · System generated. No signature required.`;

  const root = document.getElementById("view");
  if (route === "overview") root.innerHTML = pageOverview();
  else if (route === "transactions") root.innerHTML = pageTransactions();
  else if (route === "settlements") root.innerHTML = pageSettlements();
  else if (route === "refunds") root.innerHTML = pageRefunds();
  else if (route === "reconciliation") root.innerHTML = pageRecon();
  else if (route === "disputes")
    root.innerHTML = simpleTablePage("Open disputes", "2 cases awaiting evidence pack", ["Case", "Txn", "Scheme", "Amount", "Due", "State"],
      `<tr><td class="mono">DP-4412</td><td class="mono">BCKZ090826102211004</td><td>Visa</td><td>${fmtINR(18640)}</td><td>28 Aug 2026</td><td><span class="badge warn">Evidence due</span></td></tr>
       <tr><td class="mono">DP-4398</td><td class="mono">BCKZ080826171100221</td><td>RuPay</td><td>${fmtINR(2100)}</td><td>22 Aug 2026</td><td><span class="badge blue">Represented</span></td></tr>`);
  else if (route === "links")
    root.innerHTML = simpleTablePage("Payment links", "Open a link to collect on the hosted checkout", ["Link ID", "Title", "Amount", "Created", "Status", ""],
      BZ.links.map((l) => `<tr><td class="mono">${l.id}</td><td>${l.title}</td><td class="tright">${fmtINR(l.amount)}</td><td>${l.created}</td><td>${statusBadge(l.status)}</td><td>${l.status === "Open" ? `<button class="btn btn-primary" onclick="openCheckout(${l.amount}, '${l.title.replace(/'/g, "")}')">Pay now</button>` : "—"}</td></tr>`).join(""));
  else if (route === "customers")
    root.innerHTML = simpleTablePage("Customers", `Volume on ${BZ.day.dateShort} roll-up`, ["Customer", "Email", "Txns", "Volume"],
      BZ.customers.map((c) => `<tr><td>${c.name}</td><td>${c.email}</td><td class="tright">${fmtN(c.tx)}</td><td class="tright">${fmtINR(c.volume)}</td></tr>`).join(""));
  else if (route === "reports")
    root.innerHTML = `<div class="card panel"><h3>Downloadable MIS</h3>
      <p class="muted">Same extracts a finance team would pull from a live gateway.</p>
      <div class="toolbar">
        <button class="btn btn-primary" onclick="downloadCsv('payin-mis.csv', [['Method','Tx','Success','Fail','Amount','Refunds','Net'], ...BZ.methods.map(m=>[m.name,m.tx,m.ok,m.fail,m.amount,m.refunds,m.net])])">Payment method MIS</button>
        <button class="btn" onclick="downloadCsv('settlement-batches.csv', [['Batch','Time','Tx','Amount','Status'], ...BZ.batches.map(b=>[b.id,b.time,b.tx,b.amount,b.status])])">Settlement register</button>
        <button class="btn" onclick="downloadCsv('failures.csv', [['Reason','Tx','Amount','Code'], ...BZ.failures.map(f=>[f.reason,f.tx,f.amount,f.code])])">Failure codes</button>
      </div></div>`;
  else if (route === "webhooks")
    root.innerHTML = pageWebhooks();
  else if (route === "risk")
    root.innerHTML = `<div class="kpis">
      <div class="card kpi"><div class="label">Velocity blocks</div><div class="val">3</div></div>
      <div class="card kpi"><div class="label">Watchlist hits</div><div class="val">0</div></div>
      <div class="card kpi"><div class="label">3DS challenged</div><div class="val">84.2%</div></div>
      <div class="card kpi"><div class="label">KYC status</div><div class="val">Active</div></div>
    </div>
    <div class="card panel" style="margin-top:12px"><h3>Rules in force</h3>
      <ul>
        <li>UPI: max ₹1,00,000 per txn · 20 txns / VPA / hour</li>
        <li>Cards: 3DS2 required above ₹2,000 · BIN country must match billing</li>
        <li>Same PAN + new device in 10 minutes → step-up</li>
        <li>Chargeback ratio alert at 0.7% of monthly count</li>
      </ul></div>`;
  else if (route === "developer")
    root.innerHTML = `<div class="card panel"><h3>API access</h3>
      <div class="stat-row"><span>Sandbox key</span><span class="mono">rz_test_bckz_live_demo</span></div>
      <div class="stat-row"><span>Webhook secret</span><span class="mono">whsec_bckz_sandbox_4e2f9a</span></div>
      <div class="stat-row"><span>Callback URL</span><span class="mono">https://api.jasonsoft.in/webhooks/buckzy</span></div>
      <div class="stat-row"><span>Environment</span><span class="badge blue">Sandbox</span></div>
      <p class="muted">Ecommerce sites call create order, then send the shopper to hosted checkout. Webhook <span class="mono">payment.captured</span> is the source of truth.</p>
      <div class="toolbar">
        <a class="btn btn-primary" href="docs.html">Open API docs</a>
        <a class="btn" href="store.html">Run demo store</a>
      </div>
      <pre style="background:#0b1728;color:#d6e4f7;padding:12px;border-radius:10px;overflow:auto;margin-top:12px">POST /v1/orders
{ "amount": 2499, "currency": "INR", "receipt": "ATLAS-1042",
  "methods": ["upi_intent","upi_collect","upi_qr","card","netbanking","wallet"] }</pre>
    </div>`;
  else if (route === "settings")
    root.innerHTML = `<div class="card panel"><h3>Merchant profile</h3>
      <div class="stat-row"><span>Legal name</span><b>${BZ.merchant.name}</b></div>
      <div class="stat-row"><span>MID</span><b class="mono">${BZ.merchant.mid}</b></div>
      <div class="stat-row"><span>Settlement account</span><b>HDFC · XXXXXXXX4521 · IFSC HDFC0000123</b></div>
      <div class="stat-row"><span>Cycle</span><b>T+0 · 6 batches / day</b></div>
      <div class="stat-row"><span>Account manager</span><b>${BZ.merchant.am} · ${BZ.merchant.amPhone}</b></div>
      <div class="stat-row"><span>Collect VPA</span>
        <span style="display:flex;gap:8px;align-items:center">
          <input class="field" id="set-vpa" value="${typeof BuckzyUpi !== "undefined" ? BuckzyUpi.merchantVpa() : (BZ.merchant.vpa || "")}" style="margin:0;min-width:220px">
          <button class="btn btn-primary" onclick="BuckzyUpi.setMerchantVpa(document.getElementById('set-vpa').value); toast('VPA saved')">Save</button>
        </span>
      </div>
      <p class="muted">UPI Intent on checkout opens Google Pay / PhonePe using this VPA as the payee. Use an ID you own.</p>
    </div>`;

  document.getElementById("sidebar").classList.remove("open");
}

function openCheckout(amount, note) {
  const q = new URLSearchParams({
    amount: String(amount || 1876.45),
    note: note || "Demo order",
  });
  location.href = "checkout.html?" + q.toString();
}

function boot() {
  document.getElementById("nav").innerHTML = NAV.map((item) => {
    if (typeof item === "string") return `<div class="nav-sec">${item.replace("sec:", "")}</div>`;
    const [id, label, icon] = item;
    return `<a href="#/${id}" data-route="${id}">${icon}<span>${label}</span></a>`;
  }).join("");

  const go = () => {
    BZ_API.loadState();
    render(location.hash.replace("#/", "") || "overview");
  };
  window.addEventListener("hashchange", go);
  window.addEventListener("focus", go);
  go();

  document.getElementById("dl").onclick = () =>
    downloadCsv("buckzy-dashboard-2026-08-12.csv", [
      ["Metric", "Value"],
      ["Gross", BZ.day.gross],
      ["Successful amount", BZ.day.successfulAmount],
      ["Net settlement", BZ.day.netSettlement],
      ["Transactions", BZ.day.tx],
    ]);

  const reset = document.getElementById("reset-live");
  if (reset) reset.onclick = () => {
    BZ_API.resetLive();
    render(location.hash.replace("#/", "") || "overview");
    toast("Live payments cleared");
  };
}

document.addEventListener("DOMContentLoaded", boot);
