# SPV

As mentioned in the earlier chapter, without the explicit instructions on how the system was designed to scale, many developers within the Bitcoin ecosystem didn’t immediately grasp the full utility of the Merkle tree for being able to verify transactions in a timely fashion.

With the correct wallet implementation, point of sale device configuration, and connectivity to the small world network of Bitcoin nodes, there are no issues in accepting a Bitcoin transaction for a casual payment before it has been timestamped into a block. This type of payment may be called a Simplified Payment Verification (SPV) or 0-confirmation (0-conf) transaction.

If the node values of the Merkle path associated with a particular UTXO (that is used as an input in a Bitcoin transaction) are provided when the tokens are passed on to a new custodian, it is trivial for the recipient to calculate the Merkle path authentication proof to compare against the Merkle root in the header of the block the UTXO originates from in their local storage. This has the effect of a recipient being immediately able to verify whether the UTXOs that are being spent are at least valid and from the proof of work chain that they are connected to.

They can then relay that transaction and Merkle proofs to a node and wait a fraction of a second, as the node relays it to others in the network, before querying another random subset of nodes to see if the transaction has been validated by all and will be summarised in the Merkle root within their next block header candidates.

![](https://bitcoinsv.academy/storage/photos/8383/BSVA-MerkleTrees_Ch6Less1_VA1.jpg)

Due to the extreme connectivity of the small world network at the heart of the Bitcoin system more than 90% of the nodes will be within 2 hops of one another, so by randomly querying a small subset, it can be safe to assume that the validity of the transaction has been established by the majority of the hash power on the network and whichever node produces the next block will have it included in their Merkle root.

![](https://bitcoinsv.academy/storage/photos/8383/BSVA-MerkleTrees_Ch6Less1_VA2.jpg)

Even if a less connected node who didn’t receive this transaction in time were to produce the next block, only if they presented a block candidate which contradicted the validity of the transaction would the majority of hash power reject that block. Otherwise, the transaction would stay in the other well-connected nodes' mempools of unconfirmed transactions to be included as one of the first leaf nodes when calculating the Merkle root for a new block candidate. The only loser in this scenario is the node who wasn't well connected enough to receive all the network transactions in a timely fashion and misses out on collecting the transaction fees associated with transaction D.

![](https://bitcoinsv.academy/storage/photos/8383/BSVA-MerkleTrees_Ch6Less1_VA3.jpg)

In this way, each node may have a different 'state' of the mempool which records a different chronology of transactions in their Merkle trees depending upon which order they were received by a node. It is the node who produces the valid block that will write their version of the temporal ordering of the transactions to the ledger based on their own application of the 'first seen' rule to create their Merkle root. Please note in the above diagrams only the ordering of the transactions A, B, C, D, E, F, G, H have been included to illustrate the point however, the coinbase transaction would always precede any transactions from the mempool as the first leaf node for the Merkle tree.

Since these transactions are effectively settled instantly, value and data can now be exchanged rapidly via the innovation of payment channels that allow for specific transaction templates to be incremented through a range of versions where only one final transaction will be broadcast to the chain, but the numerous interim states can be kept account of by their Merkle proofs. This can allow for streaming of video, VoIP, pay per calculation and other such novel use cases. This SPV paradigm will allow the Bitcoin protocol to replace legacy protocols for data relay such as TCP:IP.
