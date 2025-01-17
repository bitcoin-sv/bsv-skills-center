# Building the Working Blockchains

[https://player.vimeo. com/video/674782403](https://player.vimeo.com/video/674782403)

Nodes can minimise storage requirements by pruning elements that have a low chance of being required. By having a clear mechanism to excise redundant information, nodes can build what we will call their working blockchain.

The working blockchain consists of all of the block headers in the chain (block headers are covered in depth in a later lesson entitled (“The block header”), with each connected to a pruned Merkle tree. In blocks where the miner has discarded every transaction, only the block header itself needs to be kept. In this way the data storage requirement can be optimised by the node to manage cost.

[https://player.vimeo. com/video/649539819](https://player.vimeo.com/video/649539819?h=f8d16faf1e\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Users accessing services anchored to transactions in the blockchain create their own working blockchain by starting from an empty set. Section 8 of the Bitcoin white paper defines the use of Merkle path data as a method of validating transactions. Starting with only the block headers, a service can receive transactions and their corresponding Merkle proofs, using them to create a database of information controlled by or otherwise available to the user. This is immutably anchored in Bitcoin’s proof of work.

These techniques can help users of the system to optimise the information they carry for their own needs, while having access to the necessary provenance data.

Read more about Block headers here: [https://wiki.bitcoinsv.io/index.php/Block\_header](https://wiki.bitcoinsv.io/index.php/Block_header)
