# Pruning to Create a Working Blockchain

Thanks to BSV's use of Merkle trees, the full contents of a block (unbounded in size) is hashed down to a single 32-byte value which is included as part of the block header. To validate a block, nodes must check that the block's Merkle root is correct. The only way to do this is to take every single transaction in the block and hash them to create the full Merkle tree structure. Once the block is validated, the node can then freely prune unneeded content without damaging the integrity of the remaining parts. As such, a miner's Working Blockchain is generated by taking the full content of each block and cutting it back to only that which they determine is needed to most effectively validate future actions.