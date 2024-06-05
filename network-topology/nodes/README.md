# Nodes

The Bitcoin white paper defines the actions of a node in section 5:

1. New transactions are broadcast to all nodes.&#x20;
2. Each node collects new transactions into a block.&#x20;
3. Each node works on finding a difficult proof-of-work for its block.&#x20;
4. When a node finds a proof-of-work, it broadcasts the block to all nodes.&#x20;
5. Nodes accept the block only if all transactions in it are valid and not already spent.&#x20;
6. Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.

Unpacking the above, nodes are network entities that:

1. Are actively competing to add new blocks to the chain, and can only call themselves a node if they have been successful in doing so.
2. Process transactions by validating them and timestamping them into blocks. Importantly, this means they are not responsible for storing and serving transactions.
3. They enforce the network consensus rules and their own local policies while performing their required actions.

Nodes sit at the centre of the network and out of economic necessity are densely connected to each other forming a small-world network.

Users and/or services interact with the node network by submitting transaction to it for timestamping and by receiving the necessary block information to derive Merkle paths for Simplified Payment Verification (SPV)
