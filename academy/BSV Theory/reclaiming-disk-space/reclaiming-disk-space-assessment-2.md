# Reclaiming Disk Space - Assessment 2

1. A Merkle tree starts with a list of transactions . Each transaction is \_\_\_\_\_\_\_\_\_ i) of the tree. As long as the node has copies of all of the transactions, they can validate the whole structure.Transactions are hashed to form their transaction IDs, and are then hashed in pairs to create the hashes at the \_\_\_\_\_\_\_ ii), effectively halving the number of data items at the next level in the tree. Parent elements are hashed with their adjacent \_\_\_\_\_\_\_\_ iii) creating another level half the size and so on until the final pair are combined to form the \_\_\_\_\_\_\_\_\_ iv). This hash is used in the block header and subjected to proof-of-work, and this value is what must remain provably linked to the Merkle tree the node is storing.
   1. i) hashed to form the lowest level, ii) parent elements, iii) parent element, iv) root hash
   2. i) is hashed to form the top level, ii) lowest level of the tree, iii) child branch, iv) root hash
   3. i) subjected to proof-of-work and entered on the lowest level, ii) child branch, iii) parent branch, iv) top level of the tree
   4. i) hashed to form the top level, ii) parent branch, iii) Merkle tree hash, iv) block header
2. &#x20;Which statements are true?(one correct selection necessary to proceed)
   1. Nodes role in the operation of the network does not involve storing a full copy of the transaction records in every block forever. This information is not required to validate transactions or to build blocks.
   2. Thanks to the Merkle tree structure, nodes are able to streamline their operation by cutting back the number of spent transaction records needed to be stored, and retaining only the live UTXOs as needed for the operation of the network.
   3. As transactions are removed, so is the parent hash, thereby removing all records of those transactions ever having occurred.
   4. This also creates an incentive for users to take responsibility for their own data. Records can be kept locally or in cold storage, obviating the need to access any kind of archive. This also allows users to attach additional details to transactions which may not be stored on the ledger.
3. &#x20;The record of a block’s existence is \_\_\_\_\_\_\_\_ i). From this a node can see which block it builds upon, what time it was discovered and can \_\_\_\_\_\_\_\_\_ ii) done by the node that discovered it. The contents of the merkle tree, which are all of the transactions that the block includes, \_\_\_\_\_\_\_\_ iii) and are not needed to prove the \_\_\_\_\_\_\_ iv) which had its transaction validated by the network a long time ago.
   1. i) the Merkle tree, ii) validate that there were now double spends, iii) are a part of the block header, iv) the Merkle root
   2. i) the block header, ii) validate the proof-of-work, iii) are not a part of the header, iv) existence of a block
   3. i) the Merkle root, ii) authenticate the proof-of-work, iii) are not a part of the Merkle root, iv) authenticity of the block header
   4. i) the block header, ii) validate the the proof-of-work, iii) are not a part of the Merkle tree, iv) validity of a block
4. &#x20;Which statements are true?(one correct selection necessary to proceed)
   1. Using block headers reduces the amount of data needed to by nodes to store a full record of the chain of proof-of-work.
   2. Retaining the block headers along with the live UTXO set, plus a full set of all transactions from recently mined blocks is the more efficient way to manage an operating node
   3. It is unnecessary for nodes to store and manage transactions which will never again be referenced in the generation of a new transaction or block.
   4. Nodes looking to streamline as much as possible should forgo storing the live UTXO set as this can easily be gathered from the ledger.
5. &#x20;Since blocks are generated every 10 minutes and a Block Header is approximately 80 bytes what will be the storage requirements for the full record of the Bitcoin’s proof of work.
   1. 2.4 GB per year
   2. 1.4 MB per year
   3. 42 MB per year
   4. 4.2 MB per year
