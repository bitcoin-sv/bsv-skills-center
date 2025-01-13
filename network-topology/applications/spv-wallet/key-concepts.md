---
description: How SPV works in a practical sense.
---

# Key Concepts

## General Idea

Your business should be able to validate the transactions it receives without having to keep all block data and validate every transaction to ever have existed.

You can achieve this by listening to block announcements from peers on the bitcoin network, inspecting each header to verify that it contains a reference to the last, forming a hash chain back to the well-known genesis block.

Third parties need only send you:

* A transaction
* A Merkle path connecting that transaction to a particular block header

With that data alone you can validate the transaction. First you hash it, and run a Merkle proof to get the root hash. If that Merkle root is contained in the block header at the specified height then the transaction is proven to be contained in that block.

## Extrapolation

You may have noticed that in the above scenario, the transaction had been broadcast in advance.&#x20;

For small casual payments we need to be able to run SPV without either party waiting for a transaction to be mined first. This is possible by extrapolating the idea. We stipulate that the sender must include:

* A transaction
* Each transaction which contains an output we are spending in the new transaction.
* A Merkle path for each of those input transactions.

It is possible to iterate this recursively so long as every transaction always has parent transactions or a Merkle path associated with it.

With this extrapolated approach, we must also validate each transaction which doesn't have a Merkle path. The validation should confirm that the unlocking scripts evaluate to TRUE, the satoshi amounts are as expected, and the transaction is generally well formed without error. This way we know that when we broadcast it will be accepted by the nodes.

## Common Push Back

> _**"How do you know that the outputs in question haven't been spent already elsewhere?"**_

What we are able to factually determine is that the scripts all evaluate to TRUE, the satoshi amounts are all as expected, the structure of the transaction is valid, and that the sender (at least at one point) owned the outputs being spent. What we cannot know without broadcasting the transaction to miners is whether the outputs have been spent by another transaction already.

## Rebuttal

It is a good question, but misses the point:

1. There is a high cost to faking this data because a hypothetical scammer would have to create genuine spendable outputs with which to attempt to trick someone.
2. The recipient would find out within a fraction of a second of broadcast if the tx is a double spend attempt. Nodes have callback services for this exact purpose.
3. The recipient would then have signed evidence that the counterparty they were doing business with attempted to defraud them.
4. Payments are negotiated _after_ KYC and AML checks have been completed by each counterparty, so prosecution would be trivial.

In conclusion - SPV works for the same reason Bitcoin itself works - the incentive models guide the behavior of participants.
