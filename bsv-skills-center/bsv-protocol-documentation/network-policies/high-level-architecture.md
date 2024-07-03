---
description: A high level overview of node software components
---

# High-Level Architecture

<figure><img src="https://files.gitbook.com/v0/b/gitbook-x-prod.appspot.com/o/spaces%2FVf1SsCoTJsr3QLhHUZ1V%2Fuploads%2FZpkEDlb0uO74uHbpEeQm%2FNetworkPolicies_Slide01.png?alt=media&#x26;token=f7e8146b-dd89-4161-a0d6-a79fbf1a6997" alt=""><figcaption><p>Node High-Level System Architecture</p></figcaption></figure>

A node has three major components:

* **Mining** (pool software and ASIC miners) – This component delivers the Proof-of-work for the node. It runs independently and takes the candidate block header (a temporary block that a miner has to mine to gain rewards) as input. The process is described in detail in the next section. The pool software is a sharding mechanism to distribute the hash calculation process to many machines doing the computation, known as proof-of-work.
* **Node software** – this component performs the transaction validation, block preparation and verification, and the bulk of the core processing to create the candidate block to be added to the blockchain.
* **Network** – this enables message exchanges between all nodes and mining pools in the network.

{% hint style="info" %}
This decoupled view of three components of the node software is only one abstraction. It is possible to build node software with different component setups; for example, the node software component itself can be broken into many sub-components. Sometimes the node software can represent both BSN and the node software. The above separation is shown only to demonstrate different aspects which work independently
{% endhint %}
