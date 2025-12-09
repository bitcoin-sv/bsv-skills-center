---
description: New transactions are broadcast to all nodes
---

# Step 1

This instruction states that “New transactions are broadcast to all nodes”. This instruction translates to the following main behaviours:

* If the transaction came from one node, it should not be sent back to that same node.
* If a node is aware that the node it received the transaction from would have sent it to other nodes already, there is no reason to send it to those nodes either; however
* If a node is aware that another node has not received a transaction it has, the node will send it.

Nodes operate in a very dense ‘small world’ configuration which constitutes the centre of the BSV network. As a result they have awareness of which peers represent other active block building nodes.

<figure><img src="../../../.gitbook/assets/CHAPTER 1 GIF 1.gif" alt=""><figcaption></figcaption></figure>

It is important for nodes to ensure that every other node on the network has knowledge of every transaction, as it is the precursor step to telling other nodes the positional index of the transaction in the node’s block template. Selfishly, this may sometimes mean nodes have knowledge of transactions they don't intend to timestamp, and sending them to any other nodes that don’t have them in the interest of making the propagation of a found block, i.e. adding a new block to the blockchain and earning the reward for doing so, more efficient.

The economic incentives that drive nodes to comply with this instruction ensure nodes can

* a) validate another node’s proposed block quickly, and
* b) have any blocks they discover validated by other nodes as quickly as possible.

Learn more about the Small World Network here: [https://wiki.bitcoinsv.io/index.php/Small\_World\_Network](https://wiki.bitcoinsv.io/index.php/Small_World_Network)
