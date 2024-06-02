---
description: Understanding blockchain abstractions and concepts
---

# Proof of Work

Proof of Work (also: Proof-of-Work or PoW) is a network consensus process where many non-trusting nodes compete to add the "next" block in the blockchain. Each node creates a block based on the transactions they have received and propose it to the network for consensus. If majority of nodes agree to the proposal, they agree for that block to be the valid block addition to the blockchain. Every node of the network at any point in time will have a block proposed (called a candidate block) but they inform the network about details of this block only when they have found a solution to the mining puzzle. They all compete with each other in this race to find the solution for the mining puzzle. But in network consensus process, they cooperate with each other to ensure the validity of the proposed block.

If you observe, It is in the self interest of the node to perform this validation honestly because they will be deploying expensive resources to build their proposal of block on this decision.

This is shown in the diagram below.

<figure><img src="../../bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/TransactionLifecycle_Slide09.png" alt=""><figcaption><p>Proof of Work</p></figcaption></figure>

The diagram presents the blockchain network analogous to how a client-server architecture is setup. The Clients are network users who produce transactions, and the Server represents the network of nodes that participate in the Proof-Of-Work process to create new blocks and maintain the blockchain's operations. The 'Clients' will submit transactions to the 'Server'. The Server, being the network of nodes, will have all of the nodes collaborating (by sharing every transaction they receive with every other node in the network) and competing (by creating a proposal of a block of transactions which can become the next block in the blockchain). The competition is a puzzle to be solved using heavy machines and when a solution is found, the nodes cooperate again to validate the proposed block. When they all agree on a single answer, the new block is added to the blockchain.

The node network consists of nodes that process transactions from the users of the network. These nodes, running specialised software which implements the Bitcoin protocol, operate according to a strict ruleset and act as the enforcers of the ruleset in the network. A good analogy is that nodes are like police enforcement who implement the rules which are created by the judiciary and parliament for a country.

{% hint style="info" %}
This process is explained in more detail in [network-policies](../network-policies/ "mention")the Network Policy and [broken-reference](../../bsv-skills-center/bsv-protocol-documentation/bsv-blockchain/broken-reference/ "mention")
{% endhint %}
