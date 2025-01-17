# Broadcasting Transactions

> The only way to confirm the absence of a transaction is to be aware of all transactions.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Transactions - Broadcasting .gif>)

For a node that is seeking to build blocks and extend the ledger, the only way to be certain that each transaction they have received is the only one trying to spend a given UTXO or set of UTXOs is to be aware of all of the transactions taking place on the network in as close to real time as possible.

If a node tries to create a block using a transaction that other nodes on the network recognise as a double spend, there is a very strong chance that they will lose their money, effectively wasting the cost of constructing their block and performing the proof of work.

This creates an incentive for nodes to ensure that all other nodes are aware of the transactions they are working on incorporating into a block, as without this awareness, the chance of using a double spent input in a block is higher.

This awareness has an added benefit in that it allows each node to ensure that all other nodes have every transaction they are working on, minimising the time it will take to validate any new blocks that are found.

\
