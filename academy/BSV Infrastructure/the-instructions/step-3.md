---
description: Each node works on finding a difficult proof-of-work block
---

# Step 3

{% embed url="https://youtu.be/I_WgNuGfbAg" %}

The process of finding a proof-of-work is done by specialised machines called ASIC miners (Application Specific Integrated Circuit) or ‘hashers’, and is typically governed by an intermediate control system called a ‘Pool Miner’. Nodes distribute key information about the incomplete block to the pool miners who use it to manage one or more hashers in the search for a valid proof-of-work.

Hashers attempt to solve a puzzle by performing the process of ‘hashing’ a provided block header -- modifying and iterating through nonce (number used once) values within the block header -- until they find a block header that hashes to a number less than a specified target number (difficulty target). The block templates to which have been hashed the most have the highest probability of being valid.

Each puzzle has a random outcome, and the frequency of solutions found, the block discovery rate, is ‘self tuned’ by the network to stay as close to 10 minutes as possible. The 10 minute block interval keeps the number of orphan blocks low, while still giving ample opportunity (2016 possible blocks every 2 weeks) for nodes to compete in the process of ordering the ledger.

Read more about orphan blocks here: [https://wiki.bitcoinsv.io/index.php/Orphan\_Block](https://wiki.bitcoinsv.io/index.php/Orphan_Block)

<figure><img src="../.gitbook/assets/CHAPTER 1 GIF 3.gif" alt=""><figcaption></figcaption></figure>

10 minutes was chosen as having longer block times would result in fewer competing nodes, while shorter block times would result in more orphan races. This means there are approximately 2016 blocks added to the Bitcoin blockchain every 2 weeks, creating a cap on the number of block winning nodes.

The valid hash puzzle is a type of impediment that makes it impossible to generate valid block proposals for anyone without access to hashers providing an extremely simple means by which nodes can determine whether they are talking to another node. A node wants to know who the other nodes in the network are so that they can efficiently share transactions and block announcements. The act of winning a block shows that a particular node is a valid competitor. In the not too distant future, it's likely nodes will establish high bandwidth, low latency communications with each other to optimise communication.

Proof of Work (PoW) is designed to ensure that only node operators who have  invested significant time and money in equipment and infrastructure can participate in the network. This significant investment also ensures node operators are easily identifiable enterprise level actors who are required to process transactions as a corporate activity under law.

The Bitcoin network is considered financial infrastructure, and as such the maintainers and operators of that infrastructure will be accountable for how it is managed and used. Finding a valid solution for the hash puzzle as part of PoW is indeed an energy intensive process; however, this energy expenditure is independent from the overhead needed to gather and validate the transactions in each block. This means that as Bitcoin scales, its per-transaction efficiency increases.

For example, if the difficulty stays the same but transaction throughput increases by a factor of 10, then the same amount of Proof of Work can secure 10 times as many transactions. This however, is where additional investments in memory, network connectivity, and storage are necessitated by the nodes to handle the UTXO set.

It can be said that the network must trend towards a scenario where the outcome is such that the total energy spent per transaction on proof of work is worth a tiny fraction of the fee paid on that transaction. With Bitcoin’s micro fees, this would typically represent a very small amount of energy. This outcome takes some time to eventuate, but is borne from the economic incentives behind proof of work and the mining process.
