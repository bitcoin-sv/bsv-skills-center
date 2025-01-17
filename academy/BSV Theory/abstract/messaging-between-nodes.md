# Messaging Between Nodes

> Messages are broadcast on a best effort basis, and nodes can leave and rejoin the network at will, accepting the longest proof-of-work chain as proof of what happened while they were gone.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Abstract - Messaging Between Nodes.gif>)

Messages that are broadcasted on the network are limited to new transactions and new block discovery announcements. When a node receives a new transaction, it automatically broadcasts it to all the nodes with which it has a peer connection. By ensuring all other nodes have the transaction, the node reduces the time those nodes will need to validate a block found which includes this transaction, giving them the best chance of their block being validated quickly.

Nodes will accept the first seen version of a transaction as the valid version of that transaction and considers any subsequent transaction that tries to spend the same inputs as an attempt at double spending. Similarly, with block announcements, nodes will accept the first valid block they receive which builds upon the longest proof-of-work chain as the next block in the chain and will begin building their next block upon it. Occasionally, blocks are discovered simultaneously, leading to one of those blocks being left out of the longest chain of proof of work, leading to them becoming ‘orphan blocks’.

Nodes can leave and re-join the network at any time and there is no central governance required for this to occur. When a node re-joins the network, they connect to other nodes and request the records of all transactions and blocks that have been seen on the network since they were disconnected. The nodes then validate the information and rejoin the competition from the most recently discovered block.
