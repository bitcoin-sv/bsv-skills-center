# Page 2

_Students must receive a score of 9/10 to successfully pass the course._&#x53;tudents must receive a score of 9/10 to successfully pass the course.

1. The \_\_\_\_ is a 1-9 byte field representing an unsigned integer in VarInt format, which defines how many inputs the transaction has.&#x20;

Input value&#x20;

Input list&#x20;

Input limit&#x20;

Input count  ✓

1. What are the practical limitations created by the upper bound of the input counter size?

None.  ✓

It inhibits the ability for the validation engine to know how many previous outputs are being spent.&#x20;

It makes it difficult to propagate non-standard transactions.&#x20;

Both (b) and (c).&#x20;

1. The input count indicates what to nodes?

How many UTXOs are included within the transaction and which ones they are on the ledger.&#x20;

The number of UTXOs it needs to retrieve in order to validate the transaction.  ✓

The cost of processing the transaction.&#x20;

All of the above.&#x20;

1. Which input data structure is correct?

Previous output index, Input script length, Input script, Sequence number, Previous transaction hash.&#x20;

Input script, Previous output index, Output script length, Sequence number, Previous transaction hash.&#x20;

Previous transaction hash, Previous input index, Output script length, Input script, Sequence number.&#x20;

Previous transaction hash, Previous output index, Input script length, Input script, Sequence number.  ✓

1. Match the data item: Often referred to as a scriptSig, it must satisfy the conditions of the locking script of the previous outputs being spent.

Previous output index&#x20;

Input script length&#x20;

Input script  ✓

Sequence number&#x20;

1. Match the data item: A 1-9 byte VarInt, feilding the entire serialised input script.

Previous transaction hash&#x20;

Previous output index&#x20;

Input script length  ✓

Input script&#x20;

1. Match the data item: The TxID that contains the previous output being spent by the input, provided as a 32-byte little-endian value.

Previous transaction hash  ✓

Previous output index&#x20;

Input script&#x20;

Sequence number&#x20;

1. Match the data item: A 4-byte little-endian value representing a non-negative integer. The combination of the previous output index and the previous transaction hash identify the previous output being spent by this input. Allowing nodes to check if the output is a member of its UTXO during validation.

Previous transaction hash&#x20;

Previous output index  ✓

Input script&#x20;

Sequence number&#x20;

1. Match the data item: A 4-byte little-endian value used to indicate whether an input is considered final. These numbers can be used in conjunction with the transaction lock time to form a payment channel.

Previous output index&#x20;

Input script length&#x20;

Input script&#x20;

Sequence number  ✓

**10. What is the Output Count?**

A 32-byte little-endian value matching the TxID to the UTXOs previously recorded on the ledger.&#x20;

A 4-byte little-endian value representing a non-negative integer indicating the amount of outputs used in a transaction.&#x20;

A 1-9 byte field representing an unsigned integer in VarInt format indicating the amount of outputs a transaction is creating.  ✓

The upper bound of the number of outputs allowed in a transaction.&#x20;
