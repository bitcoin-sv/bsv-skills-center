# Orphan Blocks

[https://player.vimeo. com/video/674783470](https://player.vimeo.com/video/674783470)

The Bitcoin Blockchain forms a Directed Acyclic Graph or DAG. This DAG consists of a single chain of valid blocks leading back to the Genesis block. The Genesis block is the first ever block generated on the network, and its block hash is hard-coded into the BitcoinSV node client.

Occasionally during the block finding process, two valid blocks are found with the same prevHash. This creates an orphan race, where each of the two blocks are being built upon by separate subsets of the network.

Orphan races are usually resolved when a node within a subset that references one block over the other finds a block ahead of the other subset, inscribing the prevBlockHash of that subset’s first seen block in the newly extended chain tip. Typically, the network fully transitions to this longest chain. The block that is no longer built upon is left as an orphan block.

An orphan block attaches to that DAG on a terminated chain. This means that even though an orphan block has a valid chain of history leading back to the genesis block and a valid proof of work, it does not form part of the longest proof-of-work chain.&#x20;

The possibility of wastefully contributing proof of work to an orphan chain tip incentivises nodes to be highly connected to the rest of the network with the lowest possible latency to minimise the likelihood of this outcome from occurring.
