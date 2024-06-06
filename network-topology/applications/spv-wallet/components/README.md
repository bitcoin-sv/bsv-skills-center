---
description: Overview of the implementation
---

# 🍡 Components

Deploying the SPV Wallet will spin up a number of containerized services to create something which at a high level looks like the diagram below.

<figure><picture><source srcset="../../../wallets/spv-wallet/introduction/.gitbook/assets/dark%20nt.jpg" media="(prefers-color-scheme: dark)"><img src="../../../wallets/spv-wallet/introduction/.gitbook/assets/network%20topology.jpg" alt=""></picture><figcaption><p>High Level Components of the SPV Wallet</p></figcaption></figure>

We see that there are two user interfaces, the Wallet App, and the Admin Console. These drive an API hosted by the SPV Wallet Server. This Wallet Server also accepts payments from Other Wallets, and Broadcasts Transactions to ARC. ARC returns Merkle Paths to confirm transactions, which are validated by checking Merkle roots stored by Blockheader Service.

The SPV Wallet combines the components to form a fully operational hosted non-custodial open-source reference wallet for the ecosystem.
