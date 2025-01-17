# SPV - Assessment 1



1. Which functions must a node perform in order for it to be considered a Full Network Node?
   1. Need to be able to receive and collect transactions, perform proof-of-work on blocks and then broadcast them while retaining a complete record of all transactions on the ledger.
   2. Don’t need to build blocks, rather at a minimum store individual copies of the block chain to protect the ledger’s accuracy and allow users to verify transactions issued on the network.
   3. Must be able to receive all types of transactions, collect the transactions into a block, find the correct proof-of-work of that block and then broadcast that block to all nodes.
   4. Need to be able to retain the complete transaction ledger and build blocks, nothing more.
2. &#x20;What are other network users called and what separates them from Full Nodes?
   1. Peers of a different type do not store a full record of the block chain but instead can verify selective transactions.
   2. Lightweight Nodes do not download the complete blockchain rather only the block headers to validate the authenticity of the transactions.
   3. Client nodes are nodes that are dependent on full nodes to connect to the network and are only capable of receiving incoming transactions.
   4. None of the above.
3. &#x20;What allows Peers of a different type to verify transactions without retaining a full copy of the Bitcoin ledger?
   1. Merkle trees allow for such peers to form a curated transaction record containing only the desired transactions.
   2. Simplified Payment Verification allows such peers to form a curated transaction record.
   3. Lightweight node clients allow for such peers to form a curated transaction record.
   4. None of the above.
4. &#x20;How can a peer store an abbreviated form of the Bitcoin ledger that is best suited to their own needs?
   1. The user starts with a copy of the block header list which is easily verified through Proof-of-Work, then selectively adds the transactions which they directly are interested in.
   2. The user first starts with a Merkle tree and deletes any parent and child transactions they do not need while retaining the transactions that they want to retain.
   3. The user first downloads a lightweight node client and then sends to it the transactions that the user wants to preserve.
   4. None of the above.
5. How can a transaction be proven to exist within a validated block?
   1. Each transaction can be proven to exist within a validated block through the Merkle Branches that connect the Merkle tree all the way through to the transaction ID contained within the block header. If the transaction can be proven to exist in the block, then it has been written to the ledger and timestamped as a valid transaction by the network.
   2. Each transaction can be proven to exist within a validated block through the block header that connects the hash of its child branch all the way through to the parent branch contained within the Merkle tree. If the transaction can be proven to exist in the block, then it has been written to the ledger and timestamped as a valid transaction by the network.
   3. Each transaction can be proven to exist within a validated block through the transaction ID that is connected to the Merkle root all the way through to the Merkle tree contained within the block header. If the transaction can be proven to exist in the block, then it has been written to the ledger and timestamped as a valid transaction by the network.
   4. Each transaction can be proven to exist within a validated block through the Merkle Branches that connect the hash of the transaction all the way through to the Merkle Root contained within the block header. If the transaction can be proven to exist in the block, then it has been written to the ledger and timestamped as a valid transaction by the network.
