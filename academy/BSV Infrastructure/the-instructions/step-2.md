---
description: Each node collects new transactions into a block
---

# Step 2

A node can append transactions to a block in any order they like. However, thanks to the simplicity of Merkle trees\*, as new transactions arrive, the most efficient method is to append transactions to the end of the block and calculate the additions to the Merkle tree. At scale, this effectively minimises the work that is re-done in the management of the Merkle tree, allowing the block building capacity of the node to increase in the most efficient manner.

There is a process of checking that transactions are valid before appending them to the node’s Merkle tree. It is important to note that the merkle tree representation is dependent on the ordering of the transactions. The ordering is the individual node’s record of the events coming in from the network. If a node successfully wins a block, its Merkle tree will become the officially recognised timestamped order of events on the public ledger.

There are numerous steps to this process, and at scale there is significant investment in infrastructure needed to manage this task effectively. Each transaction spends outputs from the UTXO set, to which the spending party must attach a valid unlockScript. The node then puts the transaction through a set of tests checking the following:

* the unlockScript for each input validly solves the lockScript
* this is the first time these inputs have been spent
* the outputs being generated are valid

Learn more about UTXO’s here: [https://wiki.bitcoinsv.io/index.php/UTXO](https://wiki.bitcoinsv.io/index.php/UTXO)

<figure><img src="../.gitbook/assets/CHAPTER 1 GIF 2.gif" alt=""><figcaption></figcaption></figure>

**In this animation we can see how even though each node sees the same set of transactions, their Merkle trees are all different, as they saw and processed the transactions in a different order.**

The node performs a few baseline rule checks before passing the transaction to the process that builds the Merkle tree (covered in our next chapter). The ordered list of transactions plus the block header is the full block data. Each time a new version of the Merkle tree is created, the node must renew its block header ([https://wiki.bitcoinsv.io/index.php/Block\_header](https://wiki.bitcoinsv.io/index.php/Block_header)) - updating the Merkle root each time new transactions are added.

_\*Merkle trees are hierarchical data structures that enable secure and fast verification of collections of data._
