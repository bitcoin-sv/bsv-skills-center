---
description: >-
  There are rules both at a network level and local node level which are applied
  when validating blocks and transactions.
---

# Consensus Rules and Local Policies

When a new transaction arrives at a node, it goes through a set of checks and validation rules. These are the consensus rules a node is mandated to enforce for the network's operations. Most of them are standard across all nodes and are part of the Bitcoin protocol (shown as Standard Policies in the diagram below). Node’s also apply local policies which are specific to their own infrastructure and preferences.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NetworkPolicies_Slide04.png" alt=""><figcaption><p>Standard and Local Policies - Transaction Storage</p></figcaption></figure>

{% hint style="info" %}
The transaction to the blockchain can be something that is coming from a user, or it could be a transaction which it finds missing while validating a block created by another node. In that scenario, the node will then request the missing transaction from the node it received the block from. When it receives that transaction, it will be sent through the same set of validation processes shown above as if it is a new transaction.
{% endhint %}
