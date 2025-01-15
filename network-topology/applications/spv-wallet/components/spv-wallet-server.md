---
description: Wraps the core functionality together.
---

# SPV Wallet Server

This component does the heavy lifting. It exposes the secure Client API, and public [Paymail](https://tsc.bsvblockchain.org/standards/paymail/) Endpoints; runs [SPV](../../../../network-topology/applications/spv-wallet/key-concepts.md) on inbound transactions; stores transactions and metadata; and broadcasts valid transactions, exposing a callback for Merkle paths.

At a high level there are admin functionalities exposed like creating a new alias, adding a new xpub, deleting things.

The client functionality is more about drafting new transactions, modifying them, signing an actioning them in terms of sending to counterparty hosts, generating new locking scripts.

The public facing endpoints are all associated with Paymail service discovery and capabilities, which are detailed in [Payments Flow](../../../../important-concepts/details/SPV%20Wallet/payments-flow.md).
