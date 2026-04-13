---
description: >-
  The BSV SV Node JSON-RPC API allows developers to interact with the BSV
  blockchain through a set of remote procedure calls. This document outlines the
  available commands and their usage.
---

# RPC Interface

<!-- prettier-ignore-start -->
{% hint style="danger" %}
**The RPC interface gives full administrative control over your node.** It can shut down the node, export private keys, manipulate the blockchain, and move funds. Never expose the RPC port to the public internet. Bind to `127.0.0.1`, use firewall rules, and if you need to provide blockchain data to external clients, place a proxy in front that enforces a strict allowlist of read-only methods. See [Security](#security) below for details.
{% endhint %}
<!-- prettier-ignore-end -->

### Overview

The JSON-RPC API provides a way to communicate with the BSV SV Node to perform various operations such as querying blockchain data, managing transactions, and retrieving network information.

JSON-RPC is a remote procedure call (RPC) protocol encoded in JSON. It allows for calling methods on a server from a client and receiving responses in a structured manner.

More information and example apps can be found in the [SV Node RPC documentation](https://github.com/bitcoinsv/bsvd/blob/master/docs/json_rpc_api.md).

### Getting Started

To use the JSON-RPC API, you need to configure your BSV SV Node to accept JSON-RPC commands. This involves setting up the node with the appropriate RPC credentials and network settings.

#### Configuration

1. **Enable RPC**: Ensure that the `bitcoin.conf` file has the following settings:

   ```editorconfig
   server=1
   rpcuser=yourusername
   rpcpassword=yourpassword
   ```

2. **Set the RPC port** (optional — defaults are used if omitted):

   | Network | Default Port |
   | ------- | ------------ |
   | Mainnet | `8332`       |
   | Testnet | `18332`      |
   | Regtest | `18443`      |

3. **Restart Node**: Restart your BSV SV Node to apply the changes.

<!-- prettier-ignore-start -->
{% hint style="info" %}
Consider using `rpcauth` instead of `rpcuser`/`rpcpassword`. The `rpcauth` option stores a salted hash in the configuration file rather than plaintext credentials. You can generate an `rpcauth` line using the `share/rpcauth/rpcauth.py` script included with the node.
{% endhint %}
<!-- prettier-ignore-end -->

#### Making Requests

Requests to the JSON-RPC API are typically made via HTTP POST. Below is an example of how to structure a request:

```json
POST / HTTP/1.1
Host: 127.0.0.1:8332
Authorization: Basic base64encoded(username:password)
Content-Type: application/json

{
    "jsonrpc": "1.0",
    "id": "curltest",
    "method": "getinfo",
    "params": []
}
```

### Examples

Here is an example of a curl command to get blockchain info:

```sh
curl --user yourusername:yourpassword --data-binary '{"jsonrpc": "1.0", "id":"curltest", "method": "getblockchaininfo", "params": [] }' -H 'content-type: text/plain;' http://127.0.0.1:8332/
```

```json
{
    "result": {
        "chain": "main",
        "blocks": 680000,
        "headers": 680000,
        ...
    },
    "error": null,
    "id": "curltest"
}
```

You can also use the installed `bitcoin-cli` to run these commands from the node's command line

```bash
~/bitcoin/bin/bitcoin-cli -rpcclienttimeout=30 -datadir="/home/ubuntu/bitcoin-data" getinfo
```

```json
{
  "version": 101010000,
  "protocolversion": 70016,
  ...
}
```

### Security

<!-- prettier-ignore-start -->
{% hint style="danger" %}
The RPC interface provides **full administrative control** over your node. Misconfigured access can lead to node shutdown, fund theft, network isolation, and chain manipulation. Treat RPC access with the same care as root/SSH access to the host.
{% endhint %}
<!-- prettier-ignore-end -->

#### General Rules

- **Never expose the RPC port to the public internet.** RPC authentication uses HTTP Basic Auth, which transmits credentials as base64 — effectively plaintext without TLS. Even with strong passwords, unauthenticated network scanners can discover and probe the port.
- **Bind to localhost only** unless you have a specific need for remote RPC access. Use `rpcbind=127.0.0.1` and `rpcallowip=127.0.0.1`.
- **Use a reverse proxy with TLS** if remote access is required. Place nginx, HAProxy, or a similar proxy in front of the RPC port with a valid TLS certificate.
- **Use `rpcauth`** instead of `rpcuser`/`rpcpassword` to avoid storing plaintext credentials on disk.
- **Use firewall rules** (`iptables`, security groups, etc.) as a second layer of defence even when `rpcallowip` is configured.

#### Building a Public API Proxy

If you need to expose blockchain query functionality to third-party applications or the public, **do not expose the node's RPC interface directly**. Instead, place an application-layer proxy in front of the node that enforces a strict **allowlist** of safe, read-only methods.

A recommended allowlist for a public-facing proxy:

```
# Read-only chain data
getblockchaininfo, getbestblockhash, getblockcount, getblock,
getblockbyheight, getblockhash, getblockheader, getblockstats,
getblockstatsbyheight, getchaintips, getchaintxstats, getdifficulty

# Mempool (rate-limit these)
getmempoolinfo, getrawmempool, getmempoolentry,
getmempoolancestors, getmempooldescendants

# UTXO lookups
gettxout, gettxouts

# Transaction queries and proofs
getrawtransaction, gettxoutproof, verifytxoutproof,
getmerkleproof, getmerkleproof2, verifymerkleproof

# Stateless utilities
decoderawtransaction, decodescript, createrawtransaction,
validateaddress, createmultisig, verifymessage, verifyscript

# Transaction broadcast (rate-limit heavily)
sendrawtransaction, sendrawtransactions

# Basic info
help, uptime, getnetworkhashps
```

**Methods to rate-limit aggressively**: `getrawmempool` (verbose), `gettxoutsetinfo`, `getblock` (verbosity 2), `sendrawtransaction`, and `sendrawtransactions` are computationally expensive and can be used for denial-of-service if left unrestricted.

**Methods that must never be proxied**: `stop`, `addnode`, `disconnectnode`, `setban`, `setnetworkactive`, `invalidateblock`, all wallet methods, all frozen TXO methods, and any method that modifies node state. See the [sensitivity classifications](rpc-methods.md) in the RPC methods reference.

### Available Methods

The full list of available commands can be generated with the `help` command

```bash
~/bitcoin/bin/bitcoin-cli -datadir="/home/ubuntu/bitcoin-data" help
```

```
== Blockchain ==
checkjournal
getbestblockhash
getblock "blockhash" ( verbosity )
...
```

And you can get more information about a specific method using the `help <command>` call.

```bash
~/bitcoin/bin/bitcoin-cli -datadir="/home/ubuntu/bitcoin-data" help submitminingsolution
```

```json
submitminingsolution "<json string>"

Attempts to submit a new block to the network.

Json Object should comprise of the following and must be escaped
    {
        "id": n,         (string) ID from getminingcandidate RPC
        "nonce": n,      (integer) Miner generated nonce
        "coinbase": "",  (hex string, optional) Modified Coinbase transaction
        "time": n,       (integer, optional) Block time
        "version": n     (integer, optional) Block version
    }

Result:

Nothing on success, error string if block was rejected.
Identical to "submitblock".
```

A full list of methods is also available in [rpc-methods.md](rpc-methods.md "mention"). The most commonly used methods are:

#### General Commands

- **getblockchaininfo**: Provides information about the current state of the blockchain. (Preferred over the deprecated `getinfo`.)
- **help**: Lists all commands, or provides help for a specified command.

#### Blockchain Queries

- **getblockhash**: Returns the hash of the block at a specified height.
- **getblock**: Returns the block details for a specified hash.
- **getrawtransaction**: Returns raw transaction data for a given transaction ID.

#### Transaction Submission

- **sendrawtransaction**: Submits a raw transaction to the network.
- **sendrawtransactions**: Submits multiple raw transactions in a single call.

#### Mining Commands

- **getmininginfo**: Provides information about the current state of mining, including network hash rate, difficulty, and mining configuration.
- **getminingcandidate**: Retrieves a candidate block for mining, including transactions and other necessary information to start mining.
- **submitminingsolution**: Submits a solution for a mined block to the network, attempting to add it to the blockchain.

### Error Handling

Errors in the JSON-RPC API are returned with an `error` object. This object contains a code and a message indicating the nature of the error.

#### Common Error Codes

- **-32600**: Invalid Request
- **-32601**: Method Not Found
- **-32602**: Invalid Params
- **-32603**: Internal Error
- **-32700**: Parse Error
