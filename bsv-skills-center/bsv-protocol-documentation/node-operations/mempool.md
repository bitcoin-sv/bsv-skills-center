---
description: >-
  mempool is a temporary cache of transactions when they are in the state of
  being unconfirmed yet accepted
---

# Mempool

Mempool is an acronym for memory pool, referencing a temporary location where transactions that have been validated are stored for a time. Its purpose is to manage and publish unconfirmed transactions, which entails.

1. Keeping the transactions in memory,
2. Providing information about coins spent by transactions in the mempool,
3. Providing information about UTXOs created by transactions in the mempool.
4. Keeping transactions consistent with changes on the blockchain (adding a new block, reorg).
5. Maintenance, deleting stale un-mined transactions, limiting the total size of all transactions in the mempool.

It also provides the following crucial service to the Block Assembler.

1. Feeding the Block Assembler with topology-sorted mineable transactions.
2. Notify block assembler to delete removed transaction and make sure that all its children are also removed.
3. Keep a pool for low fee (if any), non-final and time locked transactions. Filtering transactions by its fee and prioritisation is done by this component as well.

All transactions in the mempool are stored in a single storage. However, depending on the state of a transaction, a terminology is used as if there are different types of mempools.

A transaction is in one of the following mempools:

* The Primary Mempool: Transactions selected for the next block built by this node
* The Secondary Mempool: Transactions not selected for the next block
* The Non-Final Mempool: For unconfirmed transactions.

The following diagram shows the interactions with other components.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NodeAndItsOperations_Slide09.png" alt=""><figcaption></figcaption></figure>

The following steps describe the functionality of the Mempool during its usage in various transaction validation, block assembly and validation processes.

* Processes the validated transaction to be provided to the block assembly
* Broadcasting transactions via BSN once validated
* UTXO status provider for validation service (both spend and un-spend)
* Provide validated transactions to block assembler
* Provide transaction data to Block validation when it is processing downloaded block from another node to validate it

Mempool plays a central role in deciding which transactions get mined, and it is constantly updated after a successful block creation by its own or another node in the network. If we consider a Mempool as a set of transactions, the mining process will result in the following updates to the mempool:

**Block mined by another node in the network:**

New Mempool = Old Mempool - Mined Transactions – Double Spend Transactions - Children of Double Spend Transactions.

**Block Mined Locally**

New Mempool = Old Mempool - Mined Transaction

A transaction is removed from the mempool when it reaches its expiry date (default is 2 weeks after entering the mempool). After a new block has been created and propagated to other nodes, the transactions in the mempool, which are also in the new block, are no longer needed in the mempool and can be removed. If the block created by this node is also the winning block, then the transactions not being needed any more are all the transactions in the primary mempool, except those added after the block construction is completed.

{% hint style="info" %}
Mempool is a much debated topic in terms of weather it shall be considered a distinct component or it is part of transaction storage or UTXO store constructed at runtime. This document currently takes a stand of keeping it as a separate component
{% endhint %}
