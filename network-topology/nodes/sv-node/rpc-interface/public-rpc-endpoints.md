---
description: >-
  Hosted, no-auth JSON-RPC endpoints for the BSV mainnet — when to use them,
  when not to, and how to call them.
---

# Public RPC Endpoints

A _public RPC endpoint_ is a hosted SV Node JSON-RPC interface that anyone can call over HTTPS without running their own node, registering an account, or supplying an API key. Public endpoints lower the barrier to building on BSV: you can prototype against mainnet in minutes, run a one-shot script, or fall back to a hosted node when your own infrastructure is unavailable.

This page is a **companion to [RPC Interface](README.md)**. The methods, parameters, and JSON shapes documented there apply unchanged to public endpoints — what differs is _where_ you send the request and _what_ you can expect from a shared, hosted node.

<!-- prettier-ignore-start -->
{% hint style="info" %}
**About this service.** The default endpoint below is an SV Node operated by [Allnodes](https://www.allnodes.com/) under their [PublicNode](https://www.publicnode.com/) brand and is **powered by the BSV Association** as a free, open, unauthenticated entry point to BSV mainnet. It is intentionally a _shared_ service — please use it accordingly: it is not a replacement for running your own node when you handle user funds, need deep historical data, require an SLA, or have privacy-sensitive workloads. See [When _not_ to use a public endpoint](#when-not-to-use-a-public-endpoint).
{% endhint %}
<!-- prettier-ignore-end -->

---

## Available endpoints

| Operator                                             | Powered by      | Network | Endpoint URL                     | Auth | Notes                                     |
| ---------------------------------------------------- | --------------- | ------- | -------------------------------- | ---- | ----------------------------------------- |
| Allnodes ([PublicNode](https://www.publicnode.com/)) | BSV Association | mainnet | `https://bsv-rpc.publicnode.com` | None | CORS-enabled, HTTP/2, pruned with txindex |

The PublicNode landing page lives at <https://bsv.publicnode.com/> and reports live request statistics for the gateway. The actual JSON-RPC URL is the one in the table above.

---

## Use cases

Public endpoints are well-suited to read-mostly, low-trust, or low-volume workloads where the cost of running a full node is not justified.

### 1. Prototyping & developer onboarding

The single biggest reason public endpoints exist. A developer evaluating BSV can fetch the chain tip, decode a transaction, or push a test broadcast within minutes — no Bitcoin SV binary, no `bitcoin.conf`, no UTXO sync, no firewall changes.

```bash
curl -s https://bsv-rpc.publicnode.com \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"1.0","id":"hello","method":"getblockcount","params":[]}'
```

### 2. Lightweight read clients & dashboards

Status pages, "current block height" widgets, fee dashboards, and similar read-only UIs typically need a handful of cheap RPC calls (`getblockcount`, `getblockchaininfo`, `getdifficulty`, `getmempoolinfo`). A public endpoint covers this without operational overhead. Note: a full **block explorer** is _not_ a good fit — explorers need historical block and transaction data which a pruned node cannot serve. Use an unpruned node for that.

Because the PublicNode endpoint sets `Access-Control-Allow-Origin: *`, it can be called **directly from a browser** — useful for static sites and client-side dashboards. (Note: calling any RPC from the browser exposes your usage pattern to the operator. Don't do this for anything sensitive.)

### 3. SPV-style verification helpers

SPV wallets and applications using the [BSV TypeScript SDK](https://github.com/bitcoin-sv/ts-sdk) sometimes need a node round-trip — for example, to validate a parent transaction referenced by a BEEF, fetch a block header by hash, or sanity-check that a broadcast tx is in the mempool. A public endpoint is a reasonable secondary source for these checks alongside ARC and miner APIs.

### 4. Transaction broadcast fallback

If your primary broadcast path (ARC, a miner submission API, your own node) is degraded, `sendrawtransaction` against a public endpoint is a useful last-resort fan-out target. Public endpoints relay the transaction into the P2P mesh just like any other node.

```bash
curl -s https://bsv-rpc.publicnode.com \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"1.0","id":"bcast","method":"sendrawtransaction","params":["<rawtx hex>"]}'
```

### 5. CI / ephemeral environments

Test pipelines that need to validate against a real chain tip — e.g., "does this tx I just built deserialize cleanly?" or "is fee policy still X?" — can hit a public endpoint instead of standing up a full node in CI.

### 6. Research & data exploration

One-off scripts that walk recent blocks, compute fee statistics, or pull transaction shapes for analysis. The pruned-node caveat (below) matters here: deep historical traversal is _not_ what public endpoints are for.

---

## When _not_ to use a public endpoint

Public endpoints are a convenience, not infrastructure. Move to your own node — or a paid, SLA-backed provider — when any of the following apply:

- **You handle user funds.** Exchanges, custodians, payment processors, and merchant gateways must run their own validating node. Any hosted service — however well-operated — can serve a stale or partial view of the chain, and you should be the one validating the blocks that move your customers' money.
- **You need historical block or transaction data.** The public node is _pruned_ — it retains only ~2–3 days of block data. `getblock` and `getrawtransaction` against older blocks/transactions will fail. Block _headers_ remain available for all heights, but for full historical data use your own unpruned node, an explorer API, or an archival service.
- **You need wallet, peer, or admin RPCs.** Methods such as `getwalletinfo`, `listunspent`, `dumpprivkey`, `getpeerinfo`, `setban`, `addnode`, `stop`, and similar are blocked on the shared endpoint — and rightly so. They expose either the operator's node state or operator-only authority.
- **You need a strict SLA, predictable latency, or guaranteed throughput.** The public endpoint is best-effort. The CDN in front of it can return 5xx, rate limits can tighten without notice, and the service is sized for community use — not for one consumer's burst traffic.
- **You need privacy.** Every call you make is visible to the operator and to whatever CDN sits in front of them. If the _pattern_ of your queries is sensitive (e.g. monitoring a specific address), assume it is being observed.
- **You need mining or block-template flows.** Use a node you control. Mining RPCs reflect _that node's_ mempool view — not yours.

---

## Calling the endpoint

The wire protocol is the standard SV Node JSON-RPC 1.0 over HTTPS, identical to the local interface documented in [RPC Interface](README.md). The only differences are:

- The URL is the public hostname instead of `http://127.0.0.1:8332`.
- There is **no `Authorization` header** — public endpoints accept anonymous requests.
- Requests must be HTTPS.

### `curl`

```bash
curl -s https://bsv-rpc.publicnode.com \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"1.0","id":"1","method":"getblockchaininfo","params":[]}'
```

### Node.js (`fetch`)

```js
const res = await fetch("https://bsv-rpc.publicnode.com", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "1.0",
    id: "1",
    method: "getblockchaininfo",
    params: [],
  }),
});
const { result, error } = await res.json();
if (error) throw new Error(error.message);
console.log(result.blocks, result.bestblockhash);
```

### Python (`requests`)

```python
import requests

r = requests.post(
    "https://bsv-rpc.publicnode.com",
    json={"jsonrpc": "1.0", "id": "1", "method": "getblockchaininfo", "params": []},
    timeout=10,
)
r.raise_for_status()
payload = r.json()
if payload["error"]:
    raise RuntimeError(payload["error"]["message"])
print(payload["result"]["blocks"])
```

### Browser (CORS-enabled)

```js
// Works from any origin — the PublicNode endpoint sends Access-Control-Allow-Origin: *
const res = await fetch("https://bsv-rpc.publicnode.com", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    jsonrpc: "1.0",
    id: 1,
    method: "getblockcount",
    params: [],
  }),
});
console.log((await res.json()).result);
```

### Batch requests

The SV Node accepts JSON-RPC batches — send an array of request objects and receive an array of responses. This is the most efficient way to fan out cheap reads from a public endpoint.

```bash
curl -s https://bsv-rpc.publicnode.com \
  -H 'Content-Type: application/json' \
  -d '[
    {"jsonrpc":"1.0","id":1,"method":"getblockcount","params":[]},
    {"jsonrpc":"1.0","id":2,"method":"getbestblockhash","params":[]},
    {"jsonrpc":"1.0","id":3,"method":"getmempoolinfo","params":[]}
  ]'
```

---

## What's allowed and what isn't

The following snapshot reflects the PublicNode endpoint at the time of writing. Other operators may apply different policies; always probe before depending on a method.

### Allowed (verified working)

| Category     | Methods                                                                                                                                 |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Chain state  | `getblockchaininfo`, `getblockcount`, `getbestblockhash`, `getblockhash`, `getblockheader`, `getblock`, `getchaintips`, `getdifficulty` |
| Transactions | `getrawtransaction` (raw + verbose), `gettxout`, `sendrawtransaction`                                                                   |
| Mempool      | `getmempoolinfo`, `getrawmempool`, `getmempoolancestors`                                                                                |
| Network      | `getnetworkinfo`, `getconnectioncount`, `getinfo`, `getnetworkhashps`                                                                   |
| Utilities    | `verifymessage`                                                                                                                         |

### Restricted (returns `-32701 Method ... is not allowed`)

`help`, `getpeerinfo`, `getwalletinfo`, `listunspent`, `dumpprivkey`, `setban`, `addnode`, `uptime`, and other wallet/peer/admin RPCs. These are operator-only on shared infrastructure.

### Not implemented on this build

`estimatefee`, `generate`, `stop`, `invalidateblock` — these return `-32601 Method not found` either because the method has been removed from SV Node or is disabled on the gateway.

### Pruned node with transaction index

The PublicNode node runs in **pruned mode with `txindex=1`**. This combination means:

- **Block data is deleted** outside a rolling window of roughly 2–3 days (~400 blocks, size-dependent). Check `pruneheight` in `getblockchaininfo` for the current cutoff.
- **Block headers are always available.** `getblockheader` works for any block, regardless of pruning.
- **Transaction lookups work within the prune window.** `getrawtransaction` succeeds for transactions in retained blocks thanks to the transaction index. For transactions in pruned blocks, it returns _"No such mempool or blockchain transaction"_.
- **The UTXO set is complete.** `gettxout` works for any unspent output regardless of whether its block has been pruned — the UTXO set is maintained independently.

In short: the node knows _what_ the chain tip is and can prove headers all the way back to genesis, but it can only serve full block and transaction data for the most recent ~400 blocks. If you need deep historical data, run your own unpruned node.

---

## Error handling

Public endpoints surface three error families on top of the standard SV Node error codes:

| Code     | Meaning                                    | Example trigger                                                              |
| -------- | ------------------------------------------ | ---------------------------------------------------------------------------- |
| `-32601` | Method not found / removed                 | Calling `estimatefee`                                                        |
| `-32701` | Method blocked by gateway policy           | Calling `getpeerinfo`                                                        |
| `-22`    | TX decode failed                           | `sendrawtransaction` with invalid hex                                        |
| `-26`    | TX rejected by mempool policy or consensus | Double-spend, low fee, non-final, oversized                                  |
| HTTP 429 | Rate-limited by the gateway                | Too many requests from one IP — back off and retry                           |
| HTTP 5xx | Upstream node or CDN problem               | Retry with jitter; consider failing over to a different endpoint or your own |

For full error semantics see the _Error Handling_ section in [RPC Interface](README.md).

---

## Operational guidance

A few practical rules for building against a public endpoint:

1. **Treat it as untrusted infrastructure.** Validate everything you can locally. Hashes, merkle proofs, and signatures should be checked client-side — never assume the endpoint is honest. SPV verification with the [BSV TypeScript SDK](https://github.com/bitcoin-sv/ts-sdk) is the right pattern.
2. **Cache aggressively.** Block headers, confirmed transactions, and chain-tip-derived values are cheap to cache and reduce both your latency and the operator's load.
3. **Back off and jitter.** Honour `429`s and 5xxs with exponential backoff. Don't hammer a shared service.
4. **Have a fallback.** Configure at least one alternative source — your own node, a different public endpoint, ARC, or an explorer API — and fail over on repeated errors.
5. **Don't leak addresses you care about.** Every `gettxout` / `getrawtransaction` call you make tells the operator which UTXOs and txids you're interested in. For privacy-sensitive workloads, run your own node.
6. **Keep your usage well-mannered.** Public endpoints exist because operators choose to subsidize them. Hammering one with a scrape job is the fastest way to get them taken down for everybody.

---

## Quickstart: machine-readable specs

Two ready-to-use artefacts ship alongside this page so you don't have to retype the same JSON-RPC envelopes by hand.

**OpenAPI 3.1 spec** — drop into Swagger UI, Redoc, Mintlify's API playground, or any OpenAPI-aware client. Documents the JSON-RPC envelope, all verified-allowed methods as named request/response examples, and the gateway-specific error codes.

<!-- prettier-ignore-start -->
{% file src="/.gitbook/assets/bsv-public-rpc.openapi.yaml" %}
<!-- prettier-ignore-end -->

**Postman collection** — import via **File > Import > Upload Files** in Postman (also accepted by Insomnia, Bruno, and Hoppscotch). Pre-filled with working example bodies and sample responses captured from the live endpoint.

<!-- prettier-ignore-start -->
{% file src="/.gitbook/assets/BSV-Public-RPC.postman_collection.json" %}
<!-- prettier-ignore-end -->

Both ship with the endpoint URL as a variable (`rpcUrl` / the OpenAPI `server`) defaulting to `https://bsv-rpc.publicnode.com`, so you can repoint either at a self-hosted node without editing individual requests.

---

## See also

- [RPC Interface](README.md) — full reference for SV Node JSON-RPC
- [RPC Methods](rpc-methods.md) — complete method list with sensitivity classifications
- [BSV TypeScript SDK](https://github.com/bitcoin-sv/ts-sdk) — SPV verification client-side
