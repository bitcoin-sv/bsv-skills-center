# Proof-of-Work and HASH-256

![](../../../../.gitbook/assets/BSVA-HashFunctions_Ch3L4_DA1.gif)

## What is Proof-of-Work?

As referenced in the Bitcoin white paper, a proof-of-work system is a signalling mechanism that requires participants to demonstrate they have performed a necessary amount of work before they're allowed to perform a desired action. In BSV, this is achieved by requiring participants (I.e., nodes) use HASH-256 on a serialised block header until they find a resulting message digest that’s less than a provided **difficulty target** value.

The preimage, second preimage, and collision resistance properties of SHA-256 – and in turn HASH-256 – ensure the only way nodes are able to find a proof-of-work solution is by **brute-force**; i.e., by hashing as many versions of the block header as they can as quickly as possible (iterating the nonce value in the block header), until they find a desired message digest.

## How is Proof-of-Work Used in BSV?

As nodes receive transactions, they continuously update the Merkle root and timestamp in their block header template and send these headers and their range of nonces as **mining candidates** to **hashing pools** to be hashed in search of a proof-of-work solution:

1. A node collects transactions and builds a Merkle Tree
2. The node then builds a block header template
3. The node then constructs a mining candidate
4. hash-pools poll nodes using a **GMC** (Get Mining Candidate) function call

Nodes currently update their mining candidates about 10 times a second, and most hash-pools poll nodes for a mining candidate every 30 seconds.

To keep block production to an interval of around 10 minutes – which is slow enough to keep **orphan** **races** to a minimum and fast enough to force miners to stay competitive – the difficulty target is adjusted by adding or removing leading zeroes, and updating its first non-zero bytes; making the search for a proof-of-work either more or less difficult, respectively. This is called the **block discovery rate**.

In the early days of Bitcoin, the difficulty was low enough that it was possible to find a proof-of-work solution using a desktop CPU. As Bitcoin matured, it became more and more difficult to find a proof-of-work solution fast enough, so node operators started using graphics processing units (GPUs) to improve their efficiency. More recently, application-specific integrated circuits (ASICs) designed for the sole purpose of calculating SHA-256 message digests have superseded GPUs.

Originally, the block difficulty was adjusted every 2,016 block or about every 2 weeks. However, in 2017, it was changed to recalculate after every block. There is a commitment from BSV node operators to revert the network back to a 2,016-block difficulty calculation rate.

One important point to note is that a block is only considered ‘won’ if the majority of nodes on the network have started using its hash as the previous block hash to search for the next proof-of-work solution. This action of accepting a block by starting to build on the next block is the only consensus mechanism in BSV, and serves as the basis of what must be done in order for a network participant to be considered a node: namely, they must be accepting blocks and successfully finding proof-of-work solutions for subsequent blocks. This creates important economic incentives for nodes to be as efficient and interconnected as possible; allowing the network to scale block sizes and transaction throughput to the levels needed to accommodate any kind of network growth – even if that growth is exponential.
