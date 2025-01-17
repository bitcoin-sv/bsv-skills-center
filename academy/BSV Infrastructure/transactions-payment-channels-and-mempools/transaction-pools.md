# Transaction Pools

[https://player.vimeo. com/video/674765833](https://player.vimeo.com/video/674765833)

When a node receives a transaction, its first task is to check its validity and its finality. If the transaction is deemed invalid the node will reject it. Otherwise, the node will place the transaction into a _transaction pool_ based on whether the transaction is deemed final and what the local policies of the node are.

[https://player.vimeo. com/video/650024543](https://player.vimeo.com/video/650024543?h=73077664e5\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

There is no fixed requirement for how many transaction pools a node may have or how they are maintained. However for the purposes of this course we will look at the three different types of transaction pool which are available to nodes which use the BitcoinSV node client software.

These transaction pools are as follows:

### Main Mempool

The main mempool contains transactions which it has both accepted as valid and which it plans to include in its own next block. In other words, transactions in the main mempool must be valid, final, and meet all global and local policy requirements of the node.

### Secondary Mempool

The secondary mempool contains valid transactions that do not meet the node’s local policy requirements to be included in a block, but may meet the requirements of other nodes on the network. The node monitors these transactions so that when another node produces a block(s) containing them, it can validate the block quickly and efficiently. The secondary mempool will typically be configured to contain transactions below the node’s minimum transaction fee limit but above the network-wide minimum relay fee limit.

### Non-final Mempool

The non-final mempool may store transactions which are valid but non-final, such as the intermediate states of a payment channel. This is arguably the most complex of the three pools as it is dealing with transactions that are being regularly updated, and which can theoretically be modified up to around 4.3 billion times per input before becoming final.

Each of these transaction pools may have its own limits such as constraints on the total storage requirement for transactions they contain which can be handled independently by the node operators.
