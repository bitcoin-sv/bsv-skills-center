---
description: The rules that define the protocol used for the blockchain
---

# Consensus Rules

A number of standard policies are set around network consensus and its ruleset. The consensus rules are codified into the Bitcoin node client software system and represent fixed and unchangeable rules applied across the network. These rules must be strictly adhered to by a node to participate in the network governance process actively.

## **Genesis Block Rule**

The blockchain is anchored to the very first block that was created on Jan 9th 2009. This marked the beginning of blockchain, hence the name, Genesis.

The Genesis Block is special, as it was created with hardcoded values rather than being mined. Part of this block included the first reward of 50 coins. These were designed to be unspendable, which is the reason why this block acts as the anchor to the blockchain.

The 50 coins in the Genesis Coinbase transaction were transferred to a public key which was generated without a private key (ECC or elliptic curve cryptography allows this), making the public key invalid and these coins un-spendable.

{% hint style="info" %}
it is possible to generate a point on an elliptic curve without directly deriving it from a private key. Such points can be generated mathematically or chosen from predefined points on the curve. However, these points are not associated with a private key in the cryptographic sense and thus cannot be used for typical cryptographic operations like signing or encryption/decryption.

Generating a Point on an Elliptic Curve

To generate a point on an elliptic curve, you can select an x-coordinate and then solve for the corresponding y-coordinate using the elliptic curve equation. For a curve defined by the equation:

y^2 = x^3 + ax + b

you can choose an x-coordinate and solve for y. This approach involves the following steps:

{% code overflow="wrap" %}
```markup
- Choose an x-coordinate.
- Compute  y^2 = x^3 + ax + b .
- Solve for y (if the right-hand side is a quadratic residue in the field).
```
{% endcode %}

Explanation

```
1.	Select Curve Parameters: The secp256k1 curve is selected.
2.	Choose Random x-coordinate: A random x-coordinate is selected.
3.	Compute  y^2 : Calculate the right-hand side of the elliptic curve equation.
4.	Solve for y: Check if the right-hand side is a quadratic residue modulo the prime field. If it is, compute the square root to find y.
```

Note

* Quadratic Residue: The value x^3 + ax + b must be a quadratic residue in the field for a valid y to exist.
* Security Considerations: The generated point is mathematically valid on the curve, but it isn’t associated with a private key. Such points can’t be used for operations requiring a private-public key pair.
{% endhint %}

The Genesis block rule prevents a malicious party from creating a new chain to perpetrate a malicious redirection of hash power or economic activity. It is an essential aspect of Simplified Payment Verification, allowing users to check they are using the correct chain of blocks with minimal overhead.

```
The genesis block is identified using its block hash - 
000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f.
```

By ensuring all network users are aware of this block hash, there can be certainty around which chain of blocks is valid. If a user or node connects to a chain of blocks which leads back to the point of origin that is not the genesis block, it can know immediately that it has connected to the wrong network.

## **Block Size Rule**

The size of a block is the size in bytes of the serialised form of the block, including the block header and all of the transactions in it.

The protocol defines the size of a block by the number of transactions a node has seen from the time the last block was mined. No maximum size is defined in the protocol. It depends on the node's software hosting capability. The average block size is expected to increase unboundedly as the network grows over time.

## **Longest Chain Rule**

As described in [mining.md](mining.md "mention"), the node is ­­­expected to always keep track of the longest honest chain while building on top of that chain. This is the minimal and optimal method for mining nodes to configure their software. If at any time a mining node is intentionally building on an alternative chain than the longest honest one, it is considered malicious and is in violation of the protocol.

## **Block Subsidy Rule**

When creating new blocks, mining nodes are rewarded by block subsidies. These subsidies also perform the function of distributing new coins in the network. The rewards received by the mining node from this activity are considered as financial income and are subject to local income and tax regulation. The services performed by the mining node are also bound under the regulations that any business falls under in their local jurisdiction.

## **Difficulty Adjustment**

The purpose of difficulty adjustment is to maintain the stability of the network operation and to keep control of the rate of block creation to as close to 10 minutes as possible.

This requires that the difficulty level be adjusted based on verifying the frequency of new blocks being discovered. This adjustment is applied in the mining process using the ‘bits’ value in the block header, which impacts the target value calculation (defined by a number of leading zeros in the block hash value). This has been implemented in the node software and is not manually configurable for a specific node.

{% hint style="info" %}
In the first 284 days of the launch of the Bitcoin blockchain network, there should be 144 blocks a day for a total of 41,000 blocks mined. That is 2 million bitcoin. Instead, only 1.25 million were mined at that point.
{% endhint %}

## **Network consensus (also known as Nakamoto consensus)**

A proof of work quorum system is based on forming a network consensus in such a way that there should be no value at all in the consensus methodology. This is an alternate system to traditional voting by reputation or selection methodologies.

Rather than achieving consensus in the blockchain by voting, they show acceptance of a block by building on top of it. In the protocol, this is defined as 'voting by nodes'. Nodes “vote” for process transactions through the creation of blocks and by building new blocks on previously broadcast blocks of accepted transactions.

The number of nodes that have created blocks is publicly available. At most, 2016 nodes may operate (6 blocks an hour for 14 days) as the difficulty adjustment period of two weeks only allows this number. The difficulty adjustment will reset the count for the new set of 2016 nodes that will mine a block. In general, most of these blocks are created by a small set of nodes, typically numbering between 5-10. So at any point in time, the network votes are fixed to a maximum of 2016 nodes. There could be other nodes present in the network, but if they are not able to create blocks, they are not part of the network consensus and voting mechanism. This makes them just listener clients and not part of the node network.

{% hint style="info" %}
Another aspect to look at is the 100 block rule for coinbase output. 100 blocks is the minimum number of blocks that a node has to wait before spending a coinbase transaction. Therefore after finding a valid block a node has an economic incentive to secure the network for 100 blocks. Therefore the window of nodes that can operate at the same time is 100. Because at any time max 100 nodes have economic incentives to maintain and secure the network
{% endhint %}

With the PoW process, the participant nodes in the network change every 2 weeks (along with difficulty). Any nodes that build blocks in the new cycle are considered nodes for that difficulty period. This mechanism allows for open and permissionless-based operations in the network.

By using a brute force-like process, it ensures there is no unfair advantage possible in the process of PoW mining. This key innovation creates trustless and permissionless participation of nodes in the network making them non-trusted intermediaries. When other methods are utilised, this creates an element of trust in the intermediary, making the system vulnerable and a target for malfeasance. The characteristic of untrusted transaction execution in the network is what makes a blockchain innovative.

## First Seen rule

When receiving transactions, the first-seen rule is applied to determine which transaction is valid in the case of a double-spend. When a node detects a double-spend, it considers the transaction that it received first as the valid spender of that coin.

The rule has been extended further to add any blocks which are discovered that include the double-spend transaction - those blocks should also be considered invalid, and the node should continue to mine against it unless a second block is discovered on top of that block, indicating a majority of the network has determined that the other transaction was the first seen.

## Transaction Consensus Rules

The protocol consist of a set of transaction validation and verification rules and nodes use these rules to interpret transactions they receive from users or other nodes. The following checks are performed:

* **Transaction Size:** There is a maximum size that nodes by consensus agree to always support. Currently, this is is 10 MB.
* **nLockTime and nSequence:** These fields are used to create transactions that will become valid in future. The details will be captured in the transaction lifecycle and payment channels (_link_). Only final transactions are confirmed in the block; until then, they are stored with nodes in the mempool.
* **Value Exchanges:** The input (spending value) should cover all the outputs and fees.
* **Coinbase Transaction:** Nodes may not spend the outputs of a Coinbase transaction in a block that is less than 100 blocks higher than the one the Coinbase appears in.
* **Transaction Format Rule:** Transactions must conform to the data formatting rules of the Bitcoin protocol.
* **Bitcoin scripting language and its specification:** A set of rules is associated with the scripting language used to create a transaction's inputs and outputs.
