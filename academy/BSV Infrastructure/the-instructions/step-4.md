---
description: When a node finds a proof-of-work, it broadcasts the block to all nodes
---

# Step 4

{% embed url="https://youtu.be/1nKV8Swskq8" %}

When a node solves the puzzle, it must also propagate the solution to all other nodes on the network as quickly as possible. This is to minimise the chance that a competing node will also find their own valid proof-of-work and propagate it to the network; sparking what is known as an ‘Orphan Race’.

Read about the first see rule and orphan race here: [https://wiki.bitcoinsv.io/index.php/First\_seen\_rule](https://wiki.bitcoinsv.io/index.php/First_seen_rule)

<figure><img src="../.gitbook/assets/CHAPTER 1 GIF 4.gif" alt=""><figcaption></figcaption></figure>

When analysing this directive, it is important to also look at what is in a block so we can understand how much information needs to be transmitted across the network. In its full form, a block is a set of all transactions in the Merkle Tree plus the block header.

These blocks represent an incorruptible record of valid transactions. In this way, we can consider the chain of blocks as a chronologically ordered set of timestamps. The process of using proof of work gives the network an ideal method to control the cadence of these timestamps; with each node operating as part of a distributed, leaderless time-stamping service.

Again, it can be said the system will trend towards having nodes that are not just exceptionally well connected, but also actively share their computed block and other transaction lists with as many other nodes as possible to ensure they have the knowledge needed to accept and validate any proof of work solution extremely quickly.

This incentive to share information will be the primary impetus for increasing the density of the ‘small world network’ that forms in the centre of the overall network, and will be a huge driver influencing a node operators’ expenditure on networks and research and development into faster and more effective ways to connect.
