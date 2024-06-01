---
description: >-
  The cost of mining one transaction is the same as the cost of mining 100
  billion transactions from a proof of work perspective.
---

# Mining

To understand the network's policies, it is essential to understand the Mining component in the process.

* Transactions are collected from users and any missing transactions from other nodes.
* These transactions are validated. If valid, the UTXOs corresponding to the inputs are updated and the TXIDs are stored. If invalid, the transaction is rejected.
* The TXIDs are then added to the block candidate.
* A block candidate is the header components of a block plus a candidate merkle root which then gets passed to miners who hash it in the pursuit of finding a hash output that's below a specified target value: called a Proof-of-Work solution.
* Once a Proof-of-Work solution is found, the Merkle root is combined with other defined and undefined fields to create a block header. This contains the following:
  * Version - 4-byte little endian field indicating the version of the Bitcoin protocol under which the block is being published.
  * hashPrevBlock - 32-byte little endian field populated by the double SHA-256 hash (HASH-256) of the previous block header.
  * hashMerkleRoot - 32 byte little endian field represents the Merkle root of the Merkle tree that records all the ordered transactions which are timestamped in the block.
  * Time - 4-byte field containing the Unix epoch timestamp applied to all transactions in the block. Current network policy only requires this value to be accurate to within 2 hours of the validating nodes’ local timestamp. The timestamp has a 1-second precision.
  * Bits - 4-byte field containing the difficulty target value of the proof-of-work puzzle, determined by the network rules.
  * Nonce - ‘Number Used Once’. This is the 4-byte field that is cycled through during the proof-of-work hashing process to find a proof-of-work solution. In addition to the nonce, since ASIC hashing devices can iterate through the complete 4.3 billion value nonce space, nodes also provide them with additional values by iterating the number in a data field within the block’s coinbase transaction (called the "extra nonce") and recalculating the Merkle root; essentially providing additional 4.3 billion value nonce spaces for the ASIC hashers to iterate through.

Version, hashPrevBlock, hashMerkleRoot, time and Bits are decided by the node software, along with a starting value of the nonce. This data is then passed to the mining component, which performs a brute force-like process to keep calculating the value of the double hash of the candidate block header until a solution is found. This process is illustrated in the following diagram with an example target value. The illustrations show an approximation; in reality, the nonce is part of the candidate block or the challenge. Challange or puzzle here refers to the mining solution.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NetworkPolicies_Slide02.png" alt=""><figcaption><p>High-level flow for the mining process</p></figcaption></figure>

The mining process is also called proof of work (PoW). The solution to the mining process will be passed back to the node software, which will then use the BSN to propagate a set of messages to all of the nodes in the network to inform them about the proposed block. These nodes will then request the node to send them details of the block, which, once received, will be validated in terms of the block data and underlying transaction data to be valid.

Next, the nodes will reply with a message confirming whether or not they accept the block. This process is called Nakamoto Consensus, which results in deciding which block becomes the common ledger history. This is an essential step in the system as it decides what becomes a shared history for the nodes and the ledger.

The consensus is achieved by nodes accepting the proposed block and building the next block with it (including the block ID of the proposed block as the previous block ID in the block header).

The nodes compete to find the solution, and only the first one finding it gets the right to publish the block. for the others the PoW is wasted. once a block is published, a new block competition starts (i.e. nodes create a new block header, etc)

Two or more nodes may find the solution simultaneously, resulting in a temporary fork with two different chain tips (shown in the following diagram as block 3 and 3’).

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NetworkPolicies_Slide03.png" alt=""><figcaption><p>Proof-of-Work of competing nodes</p></figcaption></figure>

The fork is resolved when a subsequent block is found, building on one of the proposed blocks (block 4 in the previous diagram). This process results in the earlier node abandoning block 3 and building on block 4.

{% hint style="info" %}
When there is a network split which is then never resolved, it is called demerger in legal terms. What this means is that if a running blockchain network is at some point split into two where the one or other which sticks to the original protocol stays as the main entity and the one which makes changes to the protocol and is now a new system, effectively is de-merged from the original system.
{% endhint %}
