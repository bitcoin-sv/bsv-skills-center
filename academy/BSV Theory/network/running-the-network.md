# Running the Network

> The steps to run the network are as follows:
>
> 1. New transactions are broadcast to all nodes.
> 2. Each node collects new transactions into a block.
> 3. Each node works on finding a difficult proof-of-work for its block.
> 4. When a node finds a proof-of-work, it broadcasts the block to all nodes.
> 5. Nodes accept the block only if all transactions in it are valid and not already spent.
> 6. Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Network - Running the Network.gif>)

These listed steps are the way by which nodes running on the network compete to secure the contents of the ledger by storing it in blocks. The steps are broken down as follows:

`1. New transactions are broadcast to all nodes.`

When a transaction is ready for transmission to the network, the wallet or application that created it will usually broadcast that transaction to a set of network peers that it recognises. This recognition might be pre-configured in the system, or created through a discovery process, but importantly, the transaction must at some point reach at least one network node.

If the node finds that the transaction is valid and meets the network’s rules it immediately broadcasts it to all other nodes that it is aware of on the network. Each of these nodes also validates the transaction as well, and broadcasts it to the nodes that they know about. Thanks to the dense connectivity at the center of the Bitcoin network, propagation from the first node the transaction reaches to all other nodes is very fast, requiring less than 1 second for global awareness.

This process is critical for a node to be a valid competitor in the block building process. A node that fails to broadcast transactions out to the rest of the network risks expending proof of work on a block which might be rejected due to the overhead needed for all the other nodes to download the withheld information. Making sure that all nodes have all information needed to validate a block is the best way to ensure success.

`2. Each node collects new transactions into a block.`

As the node receives new transactions, it continuously adds the ones that meet its requirements to its block template. As the time since the last block was discovered grows, so does the block. There is an inherent requirement for nodes to be sufficiently capable of collecting all of the transactions happening in the world in real time into their block in order to compete.

The incentive to do so is present in the coinbase reward which is a combination of the block subsidy and transaction fees paid by users for the timestamping service. While the subsidy is high, nodes can act profitably without needing to manage millions of transactions. However, when the subsidy reduces to a level that makes it unprofitable, it will become crucial for the nodes to manage a much larger workload as each fee-bearing transaction added to its candidate block increases the revenue available in the block reward.

`3. Each node works on finding a difficult proof-of-work for its block.`

As the block template grows, the node constantly updates the hashers with new versions of the template that include the most possible transactions in order to maximise revenue. Hashers always work against the most up-to-date version of the block template to ensure their work will be as profitable as possible by including the most transactions. The node and the hashers are a team in this regard, working together to solve blocks as effectively and efficiently as possible.

`4. When a node finds a proof-of-work, it broadcasts the block to all nodes.`

As soon as a hasher returns a valid proof of work to a node, it must broadcast the fully formed block to all nodes on the network as quickly as possible. If the node delays in the transmission, it is possible that a different node might find a competing block which will win the race to become recognised as the first seen block. This requirement, and the risk of being outcompeted by other nodes in the block announcement process is a major driver of the incentives that lead to node operating enterprises to build custom high bandwidth infrastructure to manage their interconnectivity and expand the capacity of the network as a whole.

`5. Nodes accept the block only if all transactions in it are valid and not already spent.`

When a node receives a block announcement from another node, it must validate its content. This involves going through and checking each transaction spends valid coins which have not already been spent and have valid scripts. If the node has already received the transactions in the block, it can skip parts of the validation process however if there are transactions that it has not seen in the block, it must request those transactions from the block winning node and validate them.

In the meantime, if another block is discovered that the node can validate sooner due to not having to request and download additional information, it will choose to build on the block it validates first. This creates a very strong incentive for nodes not to withhold transactions from the rest of the network.

`6. Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.`

By building on a received block, nodes signal that the block was the first seen valid block and contains a set of transactions that are all valid and spend unspent coins. This is the process by which the longest valid chain of proof of work is extended and represents the collective agreement of the majority of hashpower on the network.
