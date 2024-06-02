---
description: >-
  The UTXO set represents the current state of ownership of all Satoshi tokens
  in existence.
---

# UTXO Storage

Except for Coinbase transactions, every other valid transaction spends at least one UTXO and creates zero or more new UTXOs, plus zero or more unspendable outputs. The UTXOs that are being ‘spent’ obviously must come from previously successful transactions, and these may be recorded in the current or a previous block.

An unspent output may be created and spent in a few milli-seconds, or it may remain unspent for decades, depending on when they are used in a transaction. This means that the unspent outputs must be persisted for as long as they remain unspent.

{% hint style="info" %}
A UTXO is like an envelope to hold a set of tokens. Once the envelope is opened, it cannot be closed or reused. The tokens move from one envelope to another. Wallets hold sets of envelopes with tokens inside. When two envelopes are opened as (two) inputs to a transaction, the tokens are removed from the envelopes and added into new envelopes in the desired quantities.

The private key is a seal that allows you to stop others from opening the envelope. The public key or address is where the envelope is to be sent or accessed. It is like the address in bitcoin being the address on a letter. Nodes (miners) are there to check the seal before you can open the envelope. Only the true holder of the seal opens the envelope as miners verify the holder of the seal. An envelope can be sealed by 2 or more parties. Then, the nodes verify the agreement so the envelope is only opened according to the rules that where set when the envelope was sealed.

But, a court can tell the gatekeepers, the nodes, the verifiers, open the envelope and the miners will have to open the sealed envelope, breaking the seal.

The UTXO is a registration or serial number on the envelope. There is only one serial number on any envelope and these are not ever re used. You can move tokens into a new envelope, but the serial number is only set when "stamped" and recorded by miners.

That envelope is valid, the tokens exist in a virtual state even before they are recorded on the blockchain by nodes. But, the serial number registering the tokens is only permanently affixed when nodes enter the number in the ledger.
{% endhint %}

UTXOStorage comprises of set of components which handle storage (short term and long term) of UTXOs. Due to the nature of the storage which would sometime have requirement of some UTXOs being maintained in cache, short term memory or some in long term memory so the storage itself is designed in such a manner that it supports the needed access of these UTXOs based on how active they have been. It also is used by most of the node components to get status of the UTXOs as described in the diagram below.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NodeAndItsOperations_Slide08.png" alt=""><figcaption></figcaption></figure>

A UTXO can be in various possible states at any point in time in the database. Each of the processes does its own set of interactions with UTXO Storage.

1. When a new transaction goes through the validation process, this will initiate the creation of new UTXOs (present in this transaction's Output).
2. When the TxValidator is validating a transaction, it will fetch the UTXOs which are being spent in the input of the transaction it is validating. It will iterate through every input present in the transaction and fetch the UTXO, while the UTXO entry in the database itself will be locked so that no other transaction can now spend the UTXO (in a way, this is how the first-seen rule is implemented in the node)
3. Once validated by the script engine and posted to mempool, the locked UTXO status will be changed to Spent.
4. The new UTXOs created by this transaction will then become available for spending by a later received transaction.
5. Error scenarios are possible where the UTXOs are not found or are unspendable due to incorrect script or sometimes even missing. These will be handled accordingly, resulting in an invalid transaction error.
6. UTXOs are always created based on a Tip ID. So, if the Tip-ID changes, the state of UTXO changes as well. This is kept in sync by interacting with the chain tracker.
7. Block Validator and Assembler also use UTXO storage services to ensure the validity of the UTXOs that they are consuming.

{% hint style="info" %}
A UTXO set is always maintained by nodes and is protected from pruning as nodes are always going to maintain the latest UTXO set.
{% endhint %}
