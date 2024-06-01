## Timestamp Server

BSV uses a distributed timestamp server to create a public record of transactions. This is achieved by hashing transactions into an ongoing chain, forming a record that is computationally impractical to alter. Each timestamp includes the previous timestamp in its hash, forming a chain of blocks, or a “blockchain.”

## Proof of Work

To maintain this chain, BSV uses a proof-of-work system. Nodes, which are essentially powerful computers, compete to solve complex mathematical problems. Solving these problems involves finding a hash value that meets certain criteria (e.g., begins with a specific number of zero bits). The first node to find a valid solution broadcasts its block to the network.

## Block Creation and Verification

When a node finds a valid proof-of-work, it broadcasts the block to all other nodes. These nodes verify the block to ensure all transactions are valid and not already spent. Once verified, the new block is added to the chain, and the nodes begin working on the next block, using the hash of the previous block as a reference.

## Chain of Proof

The longest chain of blocks represents the sequence of events witnessed by the network. This chain is considered the correct one because it has the most proof-of-work effort invested in it. If nodes control the majority of CPU power and act honestly, they will create the longest chain and outpace any attackers trying to alter past transactions.

## Immutability and Security

Once a block is added to the blockchain, altering it would require redoing the proof-of-work for that block and all subsequent blocks, which is computationally infeasible if the network’s honest nodes control the majority of the hash power. This ensures the immutability and security of the transaction history.

## Decentralized Consensus

The network reaches consensus without a central authority. Each node operates independently, validating transactions and blocks. Nodes follow the longest chain rule, where they consider the longest valid chain as the true record of transactions.

This system ensures that transactions are timestamped and recorded in a secure, decentralized manner, allowing for an immutable and verifiable history of events on the BSV blockchain. The reliance on proof-of-work and the decentralized nature of the network are key factors that enable BSV to function effectively as a timestamp server.