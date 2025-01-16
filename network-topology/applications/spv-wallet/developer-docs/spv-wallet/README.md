# SPV Wallet

Complete stand-alone server using the SPV Wallet engine to manage xpubs, utxos, destinations, paymails and transactions. It's non-custodial wallet, which means that it doesn't store any private keys.

## Table of Contents

1. [Quick Start](../../quickstart.md)
2. [SPV and BEEF](#spv-and-beef)
3. [Authentication](authentication.md)
4. [Configuration](configuration.md)
5. [Notifications (Webhooks)](notifications.md)
5. [Client Libraries](#spv-wallet-clients)
   1. [Go Client](../spv-wallet-go-client/README.md)
   2. [JS Client](../spv-wallet-js-client/README.md)

## SPV and BEEF

SPV Wallet can do SPV and work with BEEF transactions, you can read more about it in below documents.

### Important Concepts

#### BUMP, BEEF and SPV

SPV Wallet work with BUMP Merkle Proof format, which is a way to prove that transaction is included in the block.

After broadcasting or receiving a transaction, SPV Wallet will query Arc API (or wait for a callback) to get BUMP for the transaction. Having BUMP on any level of ancestry for all inputs of the transaction, allows us to send it to the network.

By having this information we can easily verify all merkle proofs which is a part of SPV protocol.

To verify merkleroots we need to have a block headers service running. More about BUMP you can read [here](https://brc.dev/74).

**Useful links:**

[BUMP](https://bsv.brc.dev/transactions/0074)\
[BEEF](https://bsv.brc.dev/transactions/0062)\
[SPV](/network-topology/applications/spv-wallet/key-concepts.md)

### SPV Wallet HTTP Server

SPV Wallet exposes an HTTP server which allows you to interact with database, manage xpubs, paymails and work with transactions. It's a complete stand-alone server using the SPV Wallet engine.

API Documentation can be found in swagger - you can access it by running SPV Wallet and going to `http://localhost:3003/swagger/index.html`.

### SPV Wallet Clients
We strongly encourage you to use one of the SPV Wallet client libraries provided for different languages, 
which are abstracting out http connection and handle authentication for you:

* [spv-wallet-go-client](../spv-wallet-go-client/README.md)
* [spv-wallet-js-client](../spv-wallet-js-client/README.md)
