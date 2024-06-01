---
description: Understanding transaction bitwise
---

# Constructing a transaction

We have already looked at the composition of a transaction. Now, let's dig a bit deeper.

### Data structure of a transaction:

| Field                                                                                | Description                                                                                                      | Size                                               |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- |
| Version no                                                                           | currently 2                                                                                                      | 4 bytes                                            |
| In-counter                                                                           | positive integer VI = [VarInt](https://wiki.bitcoinsv.io/index.php/VarInt)                                       | 1 - 9 bytes                                        |
| list of inputs                                                                       | [Input Structure](https://wiki.bitcoinsv.io/index.php/Bitcoin\_Transactions#Format\_of\_a\_Transaction\_Input)   | \<in-counter> qty with variable length per input   |
| Out-counter                                                                          | positive integer VI = [VarInt](https://wiki.bitcoinsv.io/index.php/VarInt)                                       | 1 - 9 bytes                                        |
| list of outputs                                                                      | [Output Structure](https://wiki.bitcoinsv.io/index.php/Bitcoin\_Transactions#Format\_of\_a\_Transaction\_Output) | \<out-counter> qty with variable length per output |
| [nLocktime](https://wiki.bitcoinsv.io/index.php/NLocktime\_and\_nSequence#nLockTime) | if non-zero and sequence numbers are < 0xFFFFFFFF: block height or timestamp when transaction is final           | 4 bytes                                            |

### Data Structure of a BEEF formatted transaction:

| Field           | Description                                                                                                                       | Size                |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------- |
| Version no      | Version number starts at 4022206465, encoded Uint32LE => `0100BEEF`                                                               | 4 bytes             |
| nBUMPs          | VarInt number of BSV Unified Merkle Paths which follow                                                                            | 1-9 bytes           |
| BUMP data       | All of the BUMPs required to prove inclusion of inputs in longest chain of blocks [BRC-74](https://bsv.brc.dev/transactions/0074) | many bytes x nBUMPs |
| nTransactions   | VarInt number of transactions which follow                                                                                        | 1-9 bytes           |
| Raw Transaction | RawTx bytes as in standard format [BRC-12](https://bsv.brc.dev/transactions/0012)                                                 | many bytes          |
| Has BUMP        | `01` if so, followed by the BUMP index; `00` if not, followed by nothing.                                                         | 1 byte              |
| BUMP index      | VarInt index number - indicating the BUMP to which the prior tx belongs if there is one.                                          | 1-9 bytes           |

The following image provides an example of a typical raw transaction (P2PKH transaction with two inputs and two outputs):

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/P2PKH%20transaction%20with%20two%20inputs%20and%20two%20outputs.png" alt=""><figcaption></figcaption></figure>

The colours help to differentiate every field present in the transaction. Input script is denoted as scriptSig, and output script is denoted as scriptPubKey (due to the nature of the input script being a signature and output being a script locking the funds to a public key).

As shown in the attachment below, each field in the transaction is modularised i.e. you can build a raw transaction one by one by adding each of these fields in the right format and endianness. These transactions are usually built using well-defined libraries and functions available in various programming languages.

There will often be visualisation tools which will present the transaction details in a much more readable format; for example, below is the translated version of the input and output scripts for the raw transactions in discussion.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/TransactionLifecycle_Slide07%20(1).png" alt=""><figcaption></figcaption></figure>

Once the transaction is constructed, it is submitted for timestamping. This can be done via an Overlay Service or directly to the node network. Currently, nodes provide an RPC endpoint (called bitcoind), which is made available for transactions to be submitted, but the [ARC service](https://bitcoin-sv.github.io/arc/#/) provides an easy to use abstraction.
