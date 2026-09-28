# Buckzy sandbox — payment APIs for ecommerce

Start here: **home.html**

| Page | Role |
| --- | --- |
| `home.html` | Buckzy product site for ecommerce companies |
| `docs.html` | Order / checkout / webhook API |
| `store.html` | Atlas Market — a merchant that uses Buckzy |
| `checkout.html` | Hosted checkout: UPI Intent, Collect, QR, cards, netbanking, wallets |
| `index.html` | Merchant ops dashboard (ledger, settlement, recon) |

## Demo path

1. Open `home.html`
2. Go to the demo store
3. Add items → Pay with Buckzy
4. Pay on hosted checkout (or simulate a decline)
5. Return to the store (order marked paid)
6. Open the dashboard — the capture is on Overview and Transactions

Same ledger is shared in the browser via `localStorage`.
