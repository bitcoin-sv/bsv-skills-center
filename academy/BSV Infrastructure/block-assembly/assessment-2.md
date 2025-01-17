# Assessment 2



_4 out of 6_

1. Each node typically broadcasts \_\_\_\_\_ transactions to all other nodes, even \_\_\_\_\_.
   1. valid, if they do not plan to place them in a block.  ✓
   2. nvalid, they won’t be included in a block.&#x20;
   3. low fee, though some low fee transactions may be retained for a block if there aren't enough high fee transactions.&#x20;
   4. complex, with large fees as it's faster to process simple transactions.&#x20;
2. What does the First Seen Rule protect against?
   1. Nodes withholding transactions from the rest of the network.&#x20;
   2. Double spends by users.  ✓
   3. Double spends by nodes.&#x20;
   4. All of the above.&#x20;
3. What can the network do to a double spending node?
   1. Nothing.&#x20;
   2. It can reject its blocks.  ✓
   3. It can fork it off onto a separate chain.
   4. It can shut down the node.&#x20;
4. **What must occur each time one or more transactions are added to the Merkle tree?**
   1. Each transaction’s TXID must be re-calculated.&#x20;
   2. The Merkle root must be re-calculated.  ✓
   3. They must be removed from the mempool.
   4. The parent transactions must be pruneable.
5. **The linked block headers combined form a structure known as what?**
   1. The longest chain of proof-of-work.&#x20;
   2. The ledger.&#x20;
   3. A Directed Acyclic Graph.  ✓
   4. A working blockchain.&#x20;
6. **How is a nonce used to generate proof-of-work?**
   1. By finding a nonce that once incorporated into the hash puzzle, the subsequent value must equal the difficulty target to be considered successful.&#x20;
   2. By cycling hash puzzles against the nonce until a hash puzzle is unlocked that meets the difficulty target of the network.&#x20;
   3. By passing single use values through the nonce field modulating the block header to form an output value less than or equal to the difficulty target.  ✓
   4. By searching for a nonce that when combined with the hash puzzle forms a number that matches the difficulty criteria.&#x20;
