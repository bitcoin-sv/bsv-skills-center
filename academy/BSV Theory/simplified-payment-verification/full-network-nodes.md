# Full Network Nodes

> It is possible to verify payments without running a full network node.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/theory - SPV - full network nodes.gif>)

**In the context of this statement, a ‘Full Network Node’ is considered a node which performs all of the tasks outlined in Section 5 of the whitepaper, which are:**

> 1\) New transactions are broadcast to all nodes.
>
> 2\) Each node collects new transactions into a block.
>
> 3\) Each node works on finding a difficult proof-of-work for its block.
>
> 4\) When a node finds a proof-of-work, it broadcasts the block to all nodes.
>
> 5\) Nodes accept the block only if all transactions in it are valid and not already spent.
>
> 6\) Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

It is clear from this that nodes are systems that are specifically designed to certify the records being timestamped on the ledger.

Anything else that connects to the network is a peer of a different type, and those peers can verify transactions that took place on the network without needing a full copy of the ledger or the need to build blocks or vote with hash power. This capability comes about through Simplified Payment Verification, or SPV\*.

_\*Simple Payment Verification (SPV), is a system outlined in the Bitcoin Whitepaper that enables clients like wallets to verify that a transaction has been included in a block and therefore a payment has been made and accepted by the network._

_This is possible because the Merkle tree structure stores the transactions in each block. The structure of a Merkle tree means that we only need to know the merkle root/top hash and a small branch of the tree to verify if a transaction is part of the tree, that is, if it’s been included into a Bitcoin block. This is done by taking the nodes that are in the path that connects the Merkle root with one of the bottom transactions and bundling them together to create a proof._

_Running a node requires downloading the entire blockchain, but a Bitcoin user can use SPV proofs and only needs to know the header of each block which includes the Merkle root, in order to verify any transaction in that block, so we only have to store 80 bytes per block, instead of the entire block required for nodes._

Learn more about SPV here: [https://wiki.bitcoinsv.io/index.php/Simplified\_Payment\_Verification](https://wiki.bitcoinsv.io/index.php/Simplified_Payment_Verification)
