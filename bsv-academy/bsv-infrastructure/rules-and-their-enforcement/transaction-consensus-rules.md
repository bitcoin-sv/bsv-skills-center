# Transaction Consensus Rules

Transaction consensus rules are the rules that define how transactions are interpreted by the nodes collectively, so it is of utmost importance that consensus be reached and maintained.

## Maximum Transaction Size Rule

This is an economic limit imposed by miners in consensus.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 5.gif" alt=""><figcaption></figcaption></figure>

The length is the number of bytes in the serialized transaction. This rule allows miners to collectively set a practical limit for users on the size of a transaction. As the capabilities of nodes and node software improve this limit will rise, providing added utility to all network users.

## Use of nLockTime and nSequence

The nSequence fields of every transaction input and the nLockTime field of the transaction collectively determine the “finality” of a transaction. If a transaction is “non-final” then it can not be valid but it can become “final” at a later time. If a transaction is “final” then it can be included in a block.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 6.gif" alt=""><figcaption></figcaption></figure>

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

## Σ Input Values ≥ Σ Output Values

When transactions are created in Bitcoin, they must spend what are known as ‘Unspent Transaction Outputs’ (UTXOs). UTXOs are the live coins available to be spent on the network. The ledger represents the cumulative transaction history of those coins from their distribution as part of the block reward. Every node has a set of UTXOs it manages which it curates according to the operator’s chosen local policies.

Each UTXO holds a quantity of bitcoin satoshi tokens locked in a script. When the locking script is successfully executed in the script engine using an unlocking script, the satoshi tokens are released to be spent. To be successful, the full script must terminate with a single non-zero value remaining on the stack. The transaction then re-allocates the satoshis to new outputs which themselves become UTXOs, replacing their predecessors in the current UTXO set across the network.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 7.gif" alt=""><figcaption></figcaption></figure>

If a transaction tried to create outputs that cumulatively represent more value than the inputs it would be spending, it would be creating new satoshi tokens which is expressly forbidden by the rules. In this way the number of tokens usable on the network remains fixed over time, with tokens only distributed on to the ledger as a reward to node operators in the initial bootstrap phase of the network.

## Coinbase Maturity Rule

Nodes may not spend the outputs of a Coinbase transaction in a block that is less than 100 blocks higher than the one the Coinbase appears in.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 8.gif" alt=""><figcaption></figcaption></figure>

This coinbase maturity rule ensures that a few things happen:

1. Node operators are prevented from using outputs from blocks that might be involved in orphan races to buy goods or services.
2. Nodes are incentivised to hash based on a 24 hour average price, reducing volatility on the hashrate being applied and keeping block discovery rates more constant.

This is an example of a constant rule which was applied to the system from the beginning. This is one of several such rules included by the creator which are held stable through consensus.

## Transaction Format Rule

Transactions must conform to the data formatting rules of the BSV protocol, including respecting the sizes of certain fields and their encoding schemas.

The currently accepted versions of the BSV transaction serialisation rules specify the format in a very specific manner, as outlined below.

1. Transaction version - A value defining the version of the protocol that should be used to evaluate the transaction (4 bytes).
2. The number of inputs being spent (VARINT (link this to [https://wiki.bitcoinsv.io/index.php/VarInt](https://wiki.bitcoinsv.io/index.php/VarInt) ), 1, 3, 5 or 9 Bytes).
3. Each of the inputs themselves which are each comprised of the following:
   1. TXID of the transaction containing the UTXO being spent (32 Bytes).
   2. The VOUT index of the UTXO (4 Bytes).
   3. A field defining the length of the unlockScript, AKA scriptSig (VARINT, 1, 3, 5 or 9 Bytes).
   4. The unlockScript needed to spend the input.
   5. The unlockScript’s sequence number, which is used in the creation and use of payment channels (4 Bytes).
4. The number of outputs being created (VARINT (link this to [https://wiki.bitcoinsv.io/index.php/VarInt](https://wiki.bitcoinsv.io/index.php/VarInt) ), 1, 3, 5 or 9 Bytes).
5. The outputs themselves which are each comprised of the following:
   1. The value in satoshis being locked into the output script (8 Bytes).
   2. A field defining the length of the lockScript AKA scriptPubKey (VARINT, 1, 3, 5 or 9 Bytes).
   3. The output lockScript.
6. nLockTime which is the time at which the transaction outputs can be spent. If the transaction has an input with a non-final sequence number and an nLockTime in the future, it is considered to be inside a payment channel. These transactions cannot be included in a block until the sequence number is final or nLockTime expires, either of which closes the payment channel. The transaction can be updated by submitting a new valid version with an increased nSequence value for at least one of the non-final inputs

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 9.gif" alt=""><figcaption></figcaption></figure>

While these rules are rigid and uniformly applied across all current transaction versions, there is significant flexibility within the rules. The hard limits imposed by the protocol itself allow for a transaction to create up to 2^64 outputs, with each output able to express a length field large enough to insert up to 18 Exabytes of data. These limits are theoretical of course, with limitations on actual usage being framed by the economic reality faced by nodes in the operation of the system.
