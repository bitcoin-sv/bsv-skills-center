---
description: >-
  Nodes accept the block only if all transactions in it are valid and not
  already spent
---

# Step 5

This is a big part of the user security model. Allowing Bitcoin users to accept a node’s confirmation that a transaction they have broadcast has been accepted and is considered valid by a majority of block producers, removes any need for users to wait on block confirmation for the transaction’s timestamp to be officially recorded; enabling almost instant transaction clearing and settlement.

This instruction clearly outlines the node’s need to validate the contents of the block against its own knowledge of what exists on the ledger and the rules in place governing the protocol. If a node receives a block that contains an invalid transaction, the block cannot be accepted as valid. For example, if the node receives a block that contains a transaction that spends an already used output, the transaction is invalid and the block must be rejected because spendable outputs on the ledger can only be used once.

<figure><img src="../../../.gitbook/assets/CHAPTER 1 GIF 5.gif" alt=""><figcaption></figcaption></figure>

The rule also defends against malicious actors who try to create invalid transactions on the ledger by ensuring nodes are incentivised to validate all transactions.

Similarly, nodes will always reject a transaction that attempts to re-spend a used input regardless of whether the first seen transaction is already in a block or not. In this way, if a transaction’s input is already used, the Bitcoin user should see a response from at least one node indicating the newly introduced transaction was rejected as a double spend. If this ever happens, the user is instantly made aware there is something wrong with the transaction. Although this can happen occasionally due to user error or platform design nodes have robust processes in place to quickly disconnect any nefarious nodes or network peers that are trying to propagate double spends.
