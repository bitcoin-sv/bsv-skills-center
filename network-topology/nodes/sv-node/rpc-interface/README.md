---
description: >-
  The BSV SV Node JSON-RPC API allows developers to interact with the BSV
  blockchain through a set of remote procedure calls. This document outlines the
  available commands and their usage.
---

# RPC Interface

### Overview

The JSON-RPC API provides a way to communicate with the BSV SV Node to perform various operations such as querying blockchain data, managing transactions, and retrieving network information.

JSON-RPC is a remote procedure call (RPC) protocol encoded in JSON. It allows for calling methods on a server from a client and receiving responses in a structured manner.

More information and example apps can be found in the [SV Node RPC documentation](https://github.com/bitcoinsv/bsvd/blob/master/docs/json\_rpc\_api.md).

### Getting Started

To use the JSON-RPC API, you need to configure your BSV SV Node to accept JSON-RPC commands. This involves setting up the node with the appropriate RPC credentials and network settings.

#### Configuration

1.  **Enable RPC**: Ensure that the `bitcoin.conf` file has the following settings:

    ```editorconfig
    server=1
    rpcuser=yourusername
    rpcpassword=yourpassword
    rpcport=8332
    ```
2. **Restart Node**: Restart your BSV SV Node to apply the changes.

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

* **getinfo**: Returns an object containing various state info.
* **help**: Lists all commands, or provides help for a specified command.

#### Blockchain Queries

* **getblockchaininfo**: Provides information about the current state of the blockchain.
* **getblockhash**: Returns the hash of the block at a specified height.
* **getblock**: Returns the block details for a specified hash.

#### Transaction Management

* **getrawtransaction**: Returns raw transaction data for a given transaction ID.
* **sendrawtransaction**: Submits a raw transaction to the network.

#### Mining Commands

* **getmininginfo**: Provides information about the current state of mining, including network hash rate, difficulty, and mining configuration.
* **getminingcandidate**: Retrieves a candidate block for mining, including transactions and other necessary information to start mining.
* **submitminingsolution**: Submits a solution for a mined block to the network, attempting to add it to the blockchain.

### Error Handling

Errors in the JSON-RPC API are returned with an `error` object. This object contains a code and a message indicating the nature of the error.

#### Common Error Codes

* **-32600**: Invalid Request
* **-32601**: Method Not Found
* **-32602**: Invalid Params
* **-32603**: Internal Error
* **-32700**: Parse Error
