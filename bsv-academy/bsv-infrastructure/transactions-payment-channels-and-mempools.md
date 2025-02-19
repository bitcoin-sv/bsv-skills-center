# Transactions, Payment Channels and Mempools

As we have seen previously, BSV is a timestamping service. Transactions arrive, and are immediately put into pools ready to be evaluated. Node systems give node operators freedom of choice in transaction processing, allowing them to pool transactions of similar types for the most cost effective processing, using properties such transaction size, fees paid, number of inputs, number of outputs and more, acting as inputs to the processing selection system. Transactions can be put immediately into a node’s next block, set aside or rejected entirely depending on a node’s setup parameters.

Transactions can also be submitted in a non-final state as part of what is called a payment channel. These payment channels can be used to deliver services including streaming video, or large data transfers inside a bitcoin transaction, leaving only a final payment action recorded on-chain.

In this section we will look at how a transaction is built, what happens when it is received by a node, and how the form of a transaction may influence how a node operator processes it, in the context of the local rules.

## The Transaction and the Evaluator

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 1 (1).gif" alt=""><figcaption></figcaption></figure>

A transaction is the basic message format used to create an entry on the Bitcoin ledger. It is presented as the serialisation of a set of fields, where some fields are of fixed length and others of variable length.

The fields contained within a transaction are the following:

1. Version no. (4 bytes)
2. Input count (1-9 bytes)
3. Input list (Variable length)
4. Output count (1-9 bytes)
5. Output list (Variable length)
6. nLocktime (4 bytes)

At its most simple abstraction, a transaction represents a proposed entry to the Bitcoin ledger. When a transaction is received by a node, it is put through a set of rule checks and tests to ensure it is valid before determining what to do with it.

## Version Number

A transaction’s version number is a 4 byte field in little endian format. The version number represents the version of the data format of the transaction and can be set by the transaction creator. Currently only version numbers 1 and 2 are accepted on the network.

When validating a transaction, a node checks that the version number is one of the acceptable values. In the future, it is anticipated that a node may determine whether to validate transactions with a particular version number based on legal or regulatory conditions.

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 2.gif" alt=""><figcaption></figcaption></figure>

## Input Count

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 3.gif" alt=""><figcaption></figcaption></figure>

Input count is a 1-9 byte field representing a positive integer in VarInt format, which defines how many inputs the transaction has. The upper bound on this field (approx. 1.8x10^(19)) is many times larger than the total number of satoshis (approx. 2.1x10^(15)). This means that the upper bound on the input counter size does not present a practical limitation. The value of Input count tells the validation engine how many UTXOs are being spent in the transaction.

This indicates to the node how many distinct UTXOs must be retrieved from its UTXO set in order to validate the transaction.

## Input List

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 4.gif" alt=""><figcaption></figcaption></figure>

The next part of a transaction message is a list of inputs. Each input is a structured data item which includes the following information:

1. Previous transaction hash - The TxID of the transaction that contains the previous output being spent as an input, given as a 32-byte little-endian value.
2. Previous output index (Previous Txout-index) - “The output index of the previous output, given as a 4-byte little-endian value that represents an unsigned integer. Using this combination of the previous output index and the previous transaction hash, the node can uniquely determine the previous output being spent by this input.
3. Input script length (TxIn-script length) - The length of the input script in bytes, given as a 1-9 byte VarInt. This is the length of the entire serialised input script.
4. Input script (TxIn-Script) - The serialised input script. This is often also referred to as a scriptSig, which must satisfy the conditions of the locking script of the previous output being spent.
5. Sequence number (nSequence) - A sequence number used to indicate whether an input is considered ‘finalised’, given as a 4-byte little-endian value. Sequence numbers are used in conjunction with the transaction lock time (nLockTime) to iterate inputs inside of a payment channel. Inside of a payment channel (see page 11) nSequence is considered final when its value is 0xFFFFFFFF i.e. the maximum value of a 4-byte field, often referred to as “UINT\_MAX”.

## Output Count

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 5.gif" alt=""><figcaption></figcaption></figure>

The output count is a 1-9 byte field representing a positive integer in VarInt format. It indicates the number of outputs created by the transaction.

Note that the number of spendable outputs that can be created in a transaction is limited to approimately. 4.3 billion, despite the fact that the Out-counter field can accommodate a much larger value. This limit is due to the fixed 4-byte length of the Previous TxOut-Index field in the transaction inputs, as explained in the previous section.

## Output List

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 6(Not in the main video).gif" alt=""><figcaption></figcaption></figure>

The next part of a transaction message is a list of outputs. Each output is a structured data item containing the following information:

1. Value - Indicates the value in satoshis associated with the output, given as an 8-byte little-endian value representing a non-negative integer.
2. Output script length (TxOut-script length) - The length of the output script in bytes, given as a 1-9 byte VarInt.
3. Output script (TxOut-script) - The serialised output script. This is often also referred to as a scriptPubKey. Each scriptPubKey defines locking/spending conditions that must be satisfied by a future unlocking script in order to spend the output.

## Transaction Lock Time (nLockTime)

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 7.gif" alt=""><figcaption></figcaption></figure>

The final field of a transaction contains a 4-byte nLockTime value.

If nLockTime < 500,000,000, the integer value is interpreted as the block height. Otherwise the integer is interpreted as the UNIX timestamp. If any of the transaction’s inputs have a non-final nSequence number, nLockTime represent the earliest time at which the transaction can be timestamped in a block.

[https://wiki.bitcoinsv.io/index.php/NLocktime\_and\_nSequence#nLockTime](https://wiki.bitcoinsv.io/index.php/NLocktime_and_nSequence#nLockTime)

Note that the nLockTime of a transaction is ignored if all the transaction inputs have the maximum nSequence value (UINT\_MAX). In this case, the transaction may be included in any valid block, irrespective of its nLockTime value.

## Payment Channels

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 7A.gif" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 8.gif" alt=""><figcaption></figcaption></figure>

In transactions where nLockTime is set in the future, and one or more inputs have nSequence number fields less than 0xFFFFFFFF they are considered non-final and may be held in a [transaction pool](https://wiki.bitcoinsv.io/index.php/Transaction_Pools) until either nLockTime expires or all inputs have their nSequence finalised.

Non-final transactions are replaceable with transactions that include the same inputs with a higher nSequence number. This property of non-final transactions means that they can be used to build _payment channels_, which allow for dynamic exchange of value and/or data between multiple parties.

Transactions where all inputs have maximal nSequence values (UINT\_MAX) but a future nLockTime can be timestamped in a block and have its outputs spent.

Initially, two parties may establish a payment channel, which is usually done by creating an on-chain funding transaction allocating funds to the channel. The two parties may then update the channel frequently by creating a non-final transaction which spends the channel funds, and iterating this transaction by updating it and increasing at least one of its nSequence numbers. The iteration/update process may happen many times before the channel is eventually closed by finalising and broadcasting the transaction. When the channel closes, only the most recent version of the iterated transaction is recorded on-chain.

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 8A.gif" alt=""><figcaption></figcaption></figure>

When each new version of the iterated transaction is created, it should be compared with the previous version using the following rules:

* The same set of previous outputs are being spent by the transaction inputs
* None of those inputs have been submitted with a decreased nSequence number
* At least one input has an increased nSequence number

These rules ensure that even parties who are unknown to each other can execute a payment channel to exchange value and/or data in a peer-to-peer fashion. A channel can be closed by finalising the nSequence values of the transaction or waiting for its nLockTime to expire. In either case, the transaction will be accepted by network nodes for inclusion in a block.

Payment channels form the basis for numerous services that can be built on Bitcoin, and represent a way by which a digital service can be delivered to a person using the same monetary instrument being used to pay for it.

## Transaction Pools

<figure><img src="../../.gitbook/assets/Chapter 3 GIF 9.gif" alt=""><figcaption></figcaption></figure>

When a node receives a transaction, its first task is to check its validity and its finality. If the transaction is deemed invalid the node will reject it. Otherwise, the node will place the transaction into a _transaction pool_ based on whether the transaction is deemed final and what the local policies of the node are.

There is no fixed requirement for how many transaction pools a node may have or how they are maintained. However for the purposes of this course we will look at the three different types of transaction pool which are available to nodes which use the BitcoinSV node client software.

These transaction pools are as follows:

### Main Mempool

The main mempool contains transactions which it has both accepted as valid and which it plans to include in its own next block. In other words, transactions in the main mempool must be valid, final, and meet all global and local policy requirements of the node.

### Secondary Mempool

The secondary mempool contains valid transactions that do not meet the node’s local policy requirements to be included in a block, but may meet the requirements of other nodes on the network. The node monitors these transactions so that when another node produces a block(s) containing them, it can validate the block quickly and efficiently. The secondary mempool will typically be configured to contain transactions below the node’s minimum transaction fee limit but above the network-wide minimum relay fee limit.

### Non-final Mempool

The non-final mempool may store transactions which are valid but non-final, such as the intermediate states of a payment channel. This is arguably the most complex of the three pools as it is dealing with transactions that are being regularly updated, and which can theoretically be modified up to around 4.3 billion times per input before becoming final.

Each of these transaction pools may have its own limits such as constraints on the total storage requirement for transactions they contain which can be handled independently by the node operators.





