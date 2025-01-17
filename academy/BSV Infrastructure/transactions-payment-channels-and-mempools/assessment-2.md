# Assessment 2



1. What are the practical limitations created by the upper bound of the input counter size?
   1. **None.**
   2. It inhibits the ability for the validation engine to know how many previous outputs are being spent.
   3. It makes it difficult to propagate non-standard transactions.
   4. Both (b) and (c).
2. The input count indicates what to nodes?
   1. How many UTXOs are included within the transaction and which ones they are on the ledger.
   2. **The amount of UTXOs it needs to retrieve in order to validate the transaction.**
   3. The cost of processing the transaction.
   4. All of the above.
3. Which Input data structure is correct?

&#x20;

| A                         | B                         | C                         | **D**                         |
| ------------------------- | ------------------------- | ------------------------- | ----------------------------- |
| Previous transaction hash | Previous output index     | Input script              | **Previous transaction hash** |
| Previous input index      | Input script length       | Previous output index     | **Previous output index**     |
| Output script length      | Input script              | Output script length      | **Input script length**       |
| Input script              | Sequence number           | Sequence number           | **Input script**              |
| Sequence number           | Previous transaction hash | Previous transaction hash | **Sequence number**           |

\
4\. Match the data items.

a.Previous transaction hash

b. Previous output index

c. Input script length

d. Input script

e. Sequence number



| d. Often referred to as scriptSig, it must satisfy the conditions of the locking script of the previous outputs being spent.                                                              |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| c. A 1-9 byte VarInt, fielding the entire serialised input script length                                                                                                                  |
| a. The TXID that contains the previous output being spent by the input, provided as a 32-byte little-endian value.                                                                        |
| b. A 4-byte little-endian value representing a non-negative integer which allows the nodes to check which output from an earlier transaction is being spent.                              |
| e. A 4-byte little-endian value used to indicate whether an input is considered final. These numbers can be used in conjunction with the transaction lock time to form a payment channel. |
