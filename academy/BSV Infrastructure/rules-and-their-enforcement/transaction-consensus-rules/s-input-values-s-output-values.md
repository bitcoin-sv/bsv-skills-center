---
description: >-
  The sum of the value of the inputs of a transaction must be greater than or
  equal to the sum of the values of the outputs.
---

# Σ Input Values ≥ Σ Output Values

{% embed url="https://youtu.be/UO-VcnO5ToM" %}

When transactions are created in Bitcoin, they must spend what are known as ‘Unspent Transaction Outputs’ (UTXOs). UTXOs are the live coins available to be spent on the network. The ledger represents the cumulative transaction history of those coins from their distribution as part of the block reward. Every node has a set of UTXOs it manages which it curates according to the operator’s chosen local policies.

Each UTXO holds a quantity of bitcoin satoshi tokens locked in a script. When the locking script is successfully executed in the script engine using an unlocking script, the satoshi tokens are released to be spent. To be successful, the full script must terminate with a single non-zero value remaining on the stack. The transaction then re-allocates the satoshis to new outputs which themselves become UTXOs, replacing their predecessors in the current UTXO set across the network.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 7.gif" alt=""><figcaption></figcaption></figure>

If a transaction tried to create outputs that cumulatively represent more value than the inputs it would be spending, it would be creating new satoshi tokens which is expressly forbidden by the rules. In this way the number of tokens usable on the network remains fixed over time, with tokens only distributed on to the ledger as a reward to node operators in the initial bootstrap phase of the network.
