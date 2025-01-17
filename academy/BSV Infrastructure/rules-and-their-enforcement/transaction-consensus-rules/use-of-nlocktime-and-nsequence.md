# Use of nLockTime and nSequence

The nSequence fields of every transaction input and the nLockTime field of the transaction collectively determine the “finality” of a transaction. If a transaction is “non-final” then it can not be valid but it can become “final” at a later time. If a transaction is “final” then it can be included in a block.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 6.gif" alt=""><figcaption></figcaption></figure>

The interpreter will evaluate nSequence and nLocktime as per the following:

* If the value of nSequence of a transaction input is 0xFFFFFFFF then that input is a “final input”.
* If the value of nSequence of a transaction input is not 0xFFFFFFFF then that input is a “non-final input”.
* If all of the inputs of a transaction are “final inputs” then the transaction is “final”, irrespective of the value of the nLockTime field.
* If one or more of the inputs of a transaction are “non-final inputs” then:
  * If the value of the transaction’s nLockTime field is less than 500,000,000 then the field represents a block height.
    * If the node is working on a block whose height is greater or equal to the value of this field, then the transaction is “final”.
    * Otherwise the transaction is “non-final”.
  * If the value of the transaction’s nLockTime field is greater or equal to 500,000,000 then the field represents a UNIX epoch timestamp.
    * If the median time passed of the last 11 blocks is greater or equal to the value of this field, then the transaction is “final”.
    * Otherwise, the transaction is “non-final”.

Only a “final” transaction may be confirmed in a block.

A new transaction must replace a prior “non-final” transaction if it has the same inputs in the same order, every sequence number for every input in the new transaction is not less than the sequence number for the corresponding input in the prior transaction, and the sequence number of at least one input in the new transaction is greater than the sequence number for the corresponding input in the prior transaction.

If a new transaction is detected which does not fulfill all of these requirements then it must be rejected.

If a new transaction is detected which has inputs that conflict with the inputs of a “non-final” transaction, but which are not identical to the inputs of the “non-final” transaction, then the “non-final” transaction is the “first seen” transaction and takes priority over the new transaction.

These rules form the basis of payment channels, which we shall discuss later in Chapter 3.
