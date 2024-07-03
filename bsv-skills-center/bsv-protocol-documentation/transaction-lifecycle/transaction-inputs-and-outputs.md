---
description: Data structure composition of a transaction
---

# Transaction Inputs and Outputs

A transaction is a standardised data structure encoding an ownership transfer of some amount of digital commodity tokens (satoshis) from one party to another. At a high level, each transaction comprises inputs and outputs.

### The inputs of a transaction consist of the following information:

1. The TXID and output index of the UTXO being spent .
2. The requisite unlocking condition(s) that authorise the sender (i.e. the first party) to transfer ownership of the asset (i.e. spend it). This can be any message or data that satisfies the locking conditions of the UTXO such that the added information makes the UTXO locking script evaluate to TRUE.

### The outputs of a transaction each specify the following information:

1. A recipient (i.e. the second party) to whom the ownership of the commodity tokens(s) is transferred.
2. The locking condition(s) that specifies how the recipient may subsequently unlock, and thus ‘spend’, the digital asset.

Each transaction to be recorded on the blockchain ledger is assigned a unique identifier (a Transaction Identifier or TXID).

<figure><img src="../../../.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

The nature of the unlocking process depends on the locking script used when the output was created in the previous transaction.

There is no practical limit imposed on the number of inputs or outputs a transaction can contain, but the technical limit is about 2 raised to 32 inputs. The transaction size limits imposed by miners will come into effect before the number limit is reached.

The overall data structure of a transaction is shown in the following diagram.

<figure><img src="../../../.gitbook/assets/image (18).png" alt=""><figcaption><p>Internal data structure of a transaction</p></figcaption></figure>

{% hint style="info" %}
One of the biggest nuisances in transaction formats used in bitcoin is the usage of little endian and big endian format for different things. Always keep in mind this property as part of debugging process when developing code to build transactions.
{% endhint %}
