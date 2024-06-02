---
description: >-
  Bitcoin: A Peer-to-Peer Electronic Cash System; Peer-to-Peer as in directly
  between parties without needing a trusted 3rd party or intermediary.
---

# SPV Wallets & Overlays

A truly global blockchain is one where the blockchain network not only demonstrates a large transaction processing capability, but it is also able to account for how it can scale.

Something that is commonly misunderstood concerning blockchains is that businesses and users who want to utilise blockchain for their applications need to run a node. This puts a heavy infrastructure burden on businesses and developers who want to build Web3 solutions.

> Satoshi Nakamoto -
>
> _"The design outlines a lightweight client that does not need the full block chain. In the design PDF it's called Simplified Payment Verification. The lightweight client can send and receive transactions, it just can't generate blocks. It does not need to trust a node to verify payments, it can still verify them itself._
>
> _The lightweight client is not implemented yet, but the plan is to implement it when it's needed. For now, everyone just runs a full network node._
>
> _I anticipate there will never be more than 100K nodes, probably less. It will reach an equilibrium where it's not worth it for more nodes to join in. The rest will be lightweight clients, which could be millions._
>
> _At equilibrium size, many nodes will be server farms with one or two network nodes that feed the rest of the farm over a LAN._"

With SPV Wallets and Overlays, there is no need for a business to run a node.

In terms of network topology, P2P interactions coupled with the ability for receivers to do local verifications, pushes the bulk of network activity to the edges which greatly distributes and localizes network load and data storage needs.

You can find out more about the context of application and utility layers with blockchain networks in [https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/light-clients-and-spv-processes/broken-reference/README.md](https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/light-clients-and-spv-processes/broken-reference/README.md "mention")

There are no strict definitions of what a light client should be designed as except for the fact that these applications will typically be either running the SPV infrastructure themselves or they will connect to service providers who do it on their behalf. This makes every application that is not a node creating blocks a light client. The term 'client' is analogous to the client role in client-server architecture used in web applications where the central node network acts as a blockchain server, and every other application becomes its client.

The overall view of the blockchain network will show the network having only a small number of nodes at the core. Most of the other applications will function as light clients.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/LightClientsandSPVInfastructures_Slide08%20(1).png" alt=""><figcaption></figcaption></figure>

The diagram shows the overall network topology identifying everything except from the nodes as light clients.

**What will these applications look like?**

Applications, whether they are hosted in a data centre or a cloud platform, will include some components which allow them to interact with blockchain. Note that these applications will predominantly be focused only on submitting transactions to the blockchain to be timestamped. They don't need to read from the as they can store all of their transactions and corresponding Merkle Proofs themselves.

The infrastructure requirements of a client application’s blockchain are:

1. An SPV Wallet with, at minimum, the following capabilities:
   1. Key Management
   2. Digital Signatures
   3. Wallet functionality like backup and storage of keys, user identity and data
   4. Transaction Manager
   5. UX/UI as per feature requirements
2. Overlay service or component (could be part of wallet itself)
   1. Transaction validation (SPV plus further validation logic as required)
   2. Transaction broadcaster to nodes
   3. Merkle proof retriever and storage
   4. SPV process validator
   5. Signature and script validator

Currently, most of the nodes provide API endpoints that allow transaction and UTXO lookups. However, with the advent of Teranode and the Mandala network topology, Nodes will no longer provide these APIs; instead, this access will be provided by Specialized Services which are services that live within the node level, but are not part of node operations. The two Specialized Services required for SPV are the Merkle Service and the UTXO Lookup Service.

### Merkle Service

The Merkle Service will take in much of the same information nodes do such as sub-trees or partial Merkle trees which it will use to create the top section of Merkle Paths for every block. Overlay services can then build on this information to construct complete Merkle Paths which they can then forward to SPV wallets to be used in future transactions.

### UTXO Lookup Service

The UTXO Lookup Service is another Specialized Service that follows the activity of nodes by keeping tabs on what the current state of network UTXOs is. Overlay services can then send lookup requests to UTXO Lookup Services to find out what the current state of the UTXOs they care about is, and update their local UTXO stores accordingly.

The Bitcoin Association provide a reference implementations as a starting point for such infrastructure. The following diagram provides an overview of this implementation.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/image%20(17).png" alt=""><figcaption></figcaption></figure>

The SPV Wallet and Overlay Services reference implementations provide the necessary components needed for businesses and developers to start using SPV, timestamping, and micropayments/microtransactions in their applications:

* A simple web wallet
* Block headers client
* A transaction builder and broadcaster
* ARC (A broadcast client)
* Paymail (a user readable email like address to simplify public key usage in user experience)
* A complete library for performing most of the SPV processes and wallet functions

Further details can be found at: https://docs.bsvblockchain.com/ (fix this link)

{% hint style="info" %}
Blockchain is not decentralised because it has a peer network for miners. It is not decentralised because lots of permission-less running of node. Rather, what made it into a decentralised system of exchange was the fact that you could do SPV and IP to IP transactions.

Decentralised and without intermediaries means that Alice and Bob can communicate directly. For example, Alice can exchange a transaction with Bob, and Bob can send the transaction to be registered. That is how you make a decentralised system.

The nodes form a distributed integrity service, but they are not decentralised or involved in creating a decentralised exchange. It is rather the direct transmission from Alice to Bob without the nodes that makes a Blockchain decentralised.
{% endhint %}
