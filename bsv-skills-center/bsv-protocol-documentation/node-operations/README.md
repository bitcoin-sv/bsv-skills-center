---
description: >-
  Node software implements the Bitcoin protocol. Software implementations
  improve over time, but the protocol rules stay the same.
---

# Node Operations

We talked previously about the mining process and the participation of nodes in that process. In this section, our focus will be on the technical specifications of the node software, which implements the network policies and participate in the node-to-node communication to ensure that the blockchain is being run according to the blockchain governance ruleset defined by the protocol.

The two main components of a node are the mining pool and the node software that performs the functional work. This is illustrated in the following diagram.

<figure><img src="../../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

The node software is commonly referred to as Bitcoind or simply BSV Node software, which is based on the original implementation of the Bitcoin protocol implemented as a monolith. There is ongoing work for an improved and scalable microservice implementation of the Bitcoin protocol to support a much larger network throughput of transaction processing. This upgrade will aim to support terabyte-size blocks and more than a million TPS throughput. Such a scaled blockchain network aims to support varied types of transactions and application use cases for global utility and commerce.

{% hint style="info" %}
Currently, only one version of node software that the BSV Association open-sources exists, but this does not mean that there can not be other competitive solutions. If any other entity wishes, they can either build their own version of the software from scratch, take the reference implementation and improve upon it or use the software released by the BSV Association as is.
{% endhint %}
