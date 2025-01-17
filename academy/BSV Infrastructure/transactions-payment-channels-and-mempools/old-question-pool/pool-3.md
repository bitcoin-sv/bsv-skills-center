# Pool 3

_Students must receive a score of 26/28 to successfully pass the course._&#x53;tudents must receive a score of 26/28 to successfully pass the course.

1. Which Output List data structure is correct?

Output script, Output script length, Value&#x20;

Value, Output script, Output script length&#x20;

Value, Output script length, Output script   ✓

Output script length, Output script, Value&#x20;

1. An 8-byte little-endian value representing a non-negative integer representing the quantity of satoshis held by the output.

Value  ✓

Output script length&#x20;

Output script&#x20;

1. The output script in bytes, given as a 1-9 byte VarInt is known as the?

Value&#x20;

Output script length  ✓

Output script&#x20;

1. Often referred to as the scriptPubKey, each scriptPubKey defines the locking/spending conditions of an output and is known as the?.

Value&#x20;

Output script length&#x20;

Output script  ✓

ScriptSig&#x20;

1. If the nLockTime field is less than or equal to 500,000,000, what does the nLockTime field represent?

The Block height at which the transaction becomes final.  ✓

A UNIX epoch timestamp.&#x20;

The transaction size.&#x20;

The transaction fee.&#x20;

1. If the nLockTime field is greater than 500,000,000, what does the nLockTime field represent?

The Block height at which the transaction becomes final.&#x20;

A UNIX epoch timestamp.  ✓

The transaction size.&#x20;

The transaction fee.&#x20;

1. What occurs to the nLockTime if all the transaction inputs have the maximum nSequence value?

It is ignored and the transaction can be included within a block.  ✓

The transaction becomes final and doesn't need to be added to a block.&#x20;

The nLockTime becomes a UNIX epoch timestamp.&#x20;

The transaction is invalid until it can be finalized.&#x20;

1. A transaction in which nLockTime is set in the future and has multiple inputs with nSequence number fields \_\_\_\_\_ 0xFFFFFFFF is considered\_\_\_\_.

above, non-final&#x20;

below, non-final  ✓

equal to, final&#x20;

below, final&#x20;

1. What happens to a transaction with a future nLockTime and an nSequence field below 0xFFFFFFFF?

Since it is a final transaction it is accepted by nodes and included within a valid block.&#x20;

It is held until nLockTime expiry or its input's nSequence has been finalized.  ✓

Since it is a non-final transaction it is ignored until the payment channel is closed.&#x20;

Nodes wait until the block height has passed before validating the transaction.&#x20;

**10. Non-final transactions are replaceable with what?**

Transactions with the same inputs but with a lower nSequence number.&#x20;

Transactions with different inputs but the same nSequence number.&#x20;

Transactions that include the same inputs and the same nSequence number.&#x20;

Transactions that include the same inputs with a higher nSequence number.  ✓

**11. What do non-final transactions allow for?**

Non-standard transactions.&#x20;

Final transactions.&#x20;

Payment channels.  ✓

All of the above.&#x20;

**12. Which describes payment channels?**

An entirely new means of payment.  ✓

A way to deliver services directly through bitcoin transactions.  ✓

The dynamic exchange of value and/or data between parties.  ✓

A way to pay for services in real-time.  ✓

**13. In what state is a payment channel that is built on a transaction in which all of its inputs have a maximal nSequence value but a nLockTime in the future?**

It is complete and can be timestamped in a block.  ✓

It is still incomplete and must wait for the nLockTime to expire.&#x20;

It is complete but it must wait until the nLocktime expiry to be added to a block.&#x20;

It is still incomplete but can be added to a block.&#x20;

**14. To establish a payment channel, two parties create a \_\_\_\_\_\_ for the channel. The channel can be updated frequently by creating a \_\_\_\_\_\_, which spends the channel funds, and iterates this transaction by updating it and increasing its \_\_\_\_\_\_\_.**&#x20;

non-final transaction, funding transaction, nSequence numbers.&#x20;

nLockTime for the channel, funding transaction, nSequence numbers.&#x20;

non-final transaction, funding transaction, nLockTime.&#x20;

funding transaction, non-final transaction, nSequence numbers.  ✓

**15. What may occur many times before the channel is eventually closed by finalizing and broadcasting the transaction?**

The transaction update process.  ✓

The iteration of the nSequence numbers.&#x20;

The finalization of the inputs.&#x20;

The iteration of the inputs maximal nSequence number.&#x20;

**16. What happens once a payment channel closes?**

Only the last non-final transaction is recorded on-chain.&#x20;

Only the funding transaction is recorded on-chain.&#x20;

Only the most recent version of the iterated transaction is recorded on-chain.  ✓

All iterations of the transaction are recorded on-chain.&#x20;

**17. Which are the correct rules for comparing each new version of the iterated transaction with the previous version?**

The previous outputs are the same set being spent by the transaction inputs.  ✓

No more than one of those inputs can be submitted with a decreased nSequence number.&#x20;

At least one input must have an increased nSequence number.  ✓

None of those inputs can be submitted with a decreased nSequence number.  ✓

**18. A channel can be closed by finalizing the \_\_\_\_\_\_\_ of the transaction or waiting for its \_\_\_\_\_\_.**&#x20;

nSequence values, nLockTime to expire.  ✓

nLockTime, nSequence to finalize.&#x20;

input’s maximum nSequence values, finalization.&#x20;

nSequence expiry, block height.&#x20;

**19. What does a node do once it receives a valid transaction?**

It inserts it into a transaction pool based on its finality and the node’s local policies.  ✓

It includes it into its next block. &#x20;

It inserts all types of valid transactions into the main mempool.&#x20;

It inserts final transactions into the main mempool and non-final transactions into the secondary mempool.&#x20;

**20. How many transaction pools may a node retain?**

Three.&#x20;

As many as it wishes.  ✓

One.&#x20;

Those which are available through the BitcoinSV node client software.&#x20;

**21. BitcoinSV node client software provides which transaction pools to nodes?**

Main mempool  ✓

Secondary mempool  ✓

Final mempool&#x20;

Non-final mempool  ✓

**22. Match the mempool type with the description: This mempool contains transactions that don’t meet the node’s local policies for inclusion in a block, but may meet the requirements of other nodes on the network.**

Main mempool.&#x20;

Secondary mempool.  ✓

Non-final mempool&#x20;

**23. Match the mempool type with the description: This mempool contains transactions that have been accepted as valid and will be included in the nodes next block.**

Main mempool.  ✓

Secondary mempool.&#x20;

Non-final mempool.&#x20;

**24. Match the mempool type with the description: This mempool may store transactions such as the intermediate states of a payment channel.**

Main mempool.&#x20;

Secondary mempool.&#x20;

Non-final mempool.  ✓

**25. Transactions in a node's main mempool must be \_\_\_\_, \_\_\_\_, and meet all \_\_\_\_.**

valid, non-final, network rules.&#x20;

valid, final, network rules and local policies.  ✓

final, valid, local policies.&#x20;

payment channels, non-final, network rules.&#x20;

**26. Transactions in a node's secondary mempool generally contain transactions \_\_\_\_\_\_\_ but \_\_\_\_\_\_\_\_.**

that are valid, below the node’s and the network's minimum fee limit&#x20;

that are valid, but don’t follow the network rules&#x20;

that are non-standard and too large to process for the node, are still valid&#x20;

below the node’s transaction fee limit, above the network-wide minimum fee  ✓

**27. The non-final mempool stores \_\_\_\_ transactions that are not yet final and deals with transactions which can theoretically be updated around \_\_\_\_ times per \_\_\_\_.**

complex, 43, iteration.&#x20;

non-final, 4.3 million, minute.&#x20;

valid, 4.3 billion, input.  ✓

invalid, 43 billion, transaction&#x20;

**28. What is the final field of a transaction?**

scriptPubKey&#x20;

nSequence&#x20;

nLockTime  ✓

scriptSig&#x20;
