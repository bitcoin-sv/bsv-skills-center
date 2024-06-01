# Transactions

## Transaction Relay

Nodes are obliged to relay the transactions they receive to all other nodes that have outgoing connections to. This aims to ensure all nodes on the network are aware of all transactions submitted to the network, regardless of the mining fee they carry.

## Block Inclusion Fee

Miners charge to include a transaction in a block that will be appended to the blockchain. The fees compensate the miner for his investment in hardware, software and personnel.

The minimum fee required to be included in a block varies from node to node and is set by the mandatory command line option _`minminingtxfee`_. This command line option replaces the early optional _`blockmintxfee`_.

## Zero Fee Transactions

Their use of zero fee transactions is not recommended.

In the past, some miners have chosen to mine zero fee transactions, even though “there is nothing in it for them”. Other miners have chosen not to do so.&#x20;

* Zero fee transactions, if not mined, are evicted from the mempool after 14 days"

Zero fee transactions can occur in a number of ways:

* broadcast directly onto the P2P network via a node with min fee set to 0
* as a user transaction in agreement with a miner
* as a consolidation transaction
* as part of a Child Pays for Parent chain of transactions

## Child Pays For Parent (CPFP)

If a transaction carries insufficient fees to be mined, a child transaction carrying sufficient fees can pay fees for both the parent and the child transaction so that both transactions will be mined.

## Missing Transactions

If a node is low on memory, the node may evict a transaction from the mempool and replace it with a transaction with higher fees. Eviction means that transaction is lost and must be resubmitted to the node.

Eviction should generate an `zmqpubdiscardedfrommempool` notification.\
If a transaction is evicted and MEMPOOL logging is enabled, a message like the following should be present

in the logfile of the node to which the transaction was sent (not always available).

```
"Removed <ID> txn, rolling minimum fee bumped to <n>"
```

The mempool limits can be adjusted using the _maxmempool_ and _maxmempoolsizedisk_ config options (not recommended)

## CHECKSIG Limit

Transaction can be used to save arbitrary data to the blockchain; the data is placed in the script behing an OP\_RETURN. The script for a data transaction looks like:

```
      OP_FALSE OP_RETURN <arbitrary binary data>
```

This works fine most of the time however during transaction validation, the script interpreter checks that the total number of OP\_CHECKSIG, OP\_CHECKSIGVERIFY, OP\_CHECKMULTISIG, OP\_CHECKMULTISIGVERIFY opcodes in the script, irrespective of whether they are behind a OP\_RETURN, does not exceed the _maxtxsigopscountspolicy_ limit. (There is no consensus limit)

The default value for _maxtxsigopscountspolicy_ is INT32\_MAX (over 4 billion) so if a transaction fails the CHECKSIG limit, the _maxtxsigopscountspolicy_ has almost certainly been changed. The user should use the _getsettings_ RPC to determine the value for this config option.

If a node has set a particularly low value for _maxtxsigopscountspolicy_ and it rejecting a data transactions because of the check, it is possible switch off the counting of CHECKSIG opcodes after the OP\_RETURN by including a OP\_INVALIDOPCODE at the start of the data. i.e. the script for the data transaction would looks like

```
       OP_FALSE OP_RETURN OP_INVALIDOPCODE <arbitrary binary data>
```

## Mempools

If a transaction is submitted and successfully validated, it is stored in a mempool (in-memory pool of transactions) before hopefully being assembled into a block and added to the blockchain. The following mempools exist:

* Primary mempool - contains validated transactions that are ready to be added to a block.
* Secondary mempool - contains validated transactions that do not meet the fee requirements for adding to a block. These transactions may be promoted to the primary mempool if a child transaction is added to the node with sufficient fees to cover both itself and its parent transaction (CPFP).
* Orphan mempool - contains transactions with at least one missing input transaction. It is assumed that the missing input transaction has not yet been submitted. The transaction is kept until the missing transaction arrives or the transaction is purged.
* Non-final mempool - contains transactions that are not the "final version". I.e. an input sequence number is not 0xFFFFFFFF.

Transactions are purged from the mempools after they have been in the mempool for more that 14 days.

The mempools are logical collections only; all transactions are actually stored in the same physical collection.

## Useful Diagnostics

The following have proved useful in previous investigations.

### List Transactions in the Primary Mempool (`getrawmempool` rpc)

_`getrawmempool`_ returns a list of transaction IDs in the mempool. Non final transactions are not included in the list.

### List Non-Final Transaction (getrawnonfinalmempool rpc)

_`getrawnonfinalmempool`_ returns the transaction ID list of transactions in the non-final mempool.
