---
description: >-
  Nodes prune, and are only mandated to store UTXOs. Any old transaction, any
  old data, anything that has been spent can be pruned.
---

# Pruning transactions

Nodes can minimise storage requirements by pruning transaction data that have a minimal or no chance of being required in future. Many times, there will be transaction data which contains outputs that are also spent by subsequent transactions, effectively making these transactions redundant data for a node to store. They can be discarded to optimise storage and processing capacity for the node.

Let us have a look at what this means.

<figure><img src="../../../.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

Suppose in the demonstrated block, Bn, there are tx1 to tx4, which contain UTXOs that are spent by transactions in later blocks, and by the time the chain-tip is at block Bn+m, all of the UTXOs are spent. Now as shown in the diagram, the orange data blocks of transaction data is something that the node will never have any use for. The node, as shown, can delete transaction data for Tx1, Tx2, Tx3 and Tx4 and just use their hash (TxID) and still will be able to calculate the Merkle root for this block for any verification purposes in future. In fact, it can go a bit further since the complete set can be deleted, including the hashes to the next level, as shown in the diagram. So, the node can delete the hashes Tx1 to Tx4 on level 1, HTx1-2 and HTx3-4 on level 2 as well, and the hash HTx1-2-3-4 can still provide the needed hash for any future Merkle root calculation needs that could come up for example when validating the presence of transaction Tx5 in the block.

Also, as shown in the diagram for Tx7, a miner can choose just to delete the transaction data so save storage space and keep jus the TxID which is the hash of the data and optimise their system.

This capability can be also useful in case of node for deleting any transaction that contains any illegal content as data in them or any transaction data that is deemed malicious or required by the legal system to be removed from blockchain storage.

Pruning is a very useful capability for nodes to optimise their operations and only store what they really need and nothing else. This, however, will also make nodes sometimes delete transactions that are created specifically to upload data with non-spendable outputs (ex., OP\_RETURN data outputs with 0 value in terms of Satoshi). Applications that plan to utilise such outputs for their purposes shall ensure that they have stored backup of their data transactions, including Merkle proofs, so that blockchains can still be used for their transaction verification using SPV methodology. Alternatively, there is always the case of new business models emerging for what is called as archival nodes who achieve blockchain data and provide a paid service for anyone who wants to access that in future.

{% hint style="info" %}
The white paper states that transactions may be discarded/pruned to save disk space. The use of a double hash allows for the verification of blocks without sending the information within them. A proof of the previous transaction can be constructed and the information pruned allowing the Blockchain to continue
{% endhint %}
