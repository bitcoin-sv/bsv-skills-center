---
description: >-
  Nodes express their acceptance of the block by working on creating the next
  block in the chain, using the hash of the accepted block as the previous hash
---

# Step 6

As soon as a node has received and validated a new block from one of its competitors, it is incentivised to build its new block template using that block’s hash. This has the effect of each subsequent block being added into a chain of valid proof of work.

This means beginning the process of clearing validated transactions out of the mempool\* and preparing the next block’s Merkle tree. Doing any form of work on a superseded block becomes wasted effort as soon as with another node's block proposal is disseminated and validated; creating the incentive to be hyper aware of other nodes and any blocks they discover.

<figure><img src="../.gitbook/assets/CHAPTER 1 GIF 6.gif" alt=""><figcaption></figcaption></figure>

This hyper awareness will have the effect of reducing the potential of orphan races, making the network more efficient and reducing the amount of work done producing valid blocks that don’t form part of the longest valid chain of proof-of-work.

Keep in mind, nodes have the freedom to reject blocks on any basis, and it might eventuate that a group of nodes on the network determine that a particular subset of nodes are not following lawful order to generate a correction on the ledger.

Nodes follow Nakamoto Consensus ([https://wiki.bitcoinsv.io/index.php/Nakamoto\_Consensus](https://wiki.bitcoinsv.io/index.php/Nakamoto_Consensus)) which is used to set and act upon any rules agreed to by the operators of that group of nodes. Bitcoin’s traceability and incentive structure produces outcomes where the most honest, lawful action is the most profitable in the long term.

_\*The mempool is a data structure containing the set of valid transactions that the node accepted but which have not yet been timestamped in a block_

\\
