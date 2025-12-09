# Compacting Blocks

> Old blocks can then be compacted by stubbing off branches of the tree. The interior hashes do not need to be stored.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Reclaiming Disk Space - Compacting Blocks (1).gif>)

Like the original generation parents in the family tree, the Merkle tree starts with a list of transactions which are hashed to form the base level. As long as the node has copies of all of the transactions, they can validate the whole structure.

Transactions are hashed to form their transaction IDs, which are then hashed in pairs to create the hashes at the parent branch, effectively halving the number of data items at the next level in the tree. This is akin to the parents at the top each producing a unique child.

Parent branches are hashed with their adjacent parent branch creating another level half the size and so on and so forth until the two deepest branches are combined to form the Root Hash of the Merkle tree.

This is like each generation halving the number of people, and those people’s pairing with each other resulting in a next generation half the size. This tree gets smaller and smaller until we reach the root of the tree, or the ‘subject’ of the family tree.

It is this root hash that is used in the block header which is subjected to Proof of Work, and it is this value which must remain provably linked to the tree the node is storing.

Thanks to this structure, nodes are able to streamline their operation by cutting back the number of spent transaction records they store and focusing mainly on storing live UTXOs as needed for the operation of the network. As transactions are removed, the parent hash is generated and stored so that the node can still establish the authenticity of the remaining records they have kept. As more transactions are removed, the stubs that are stored move higher into the branches of the tree, further reducing the size of the block record.

Imagine that the subject decides information about one of the original generations is no longer needed, and they cut it from the tree. As long as they keep information about the children, we can find a path from the subject back to the original generation. If enough parents are discarded, the system can purge their children from the tree as well. Records of these middle generations are only needed to ensure that the link between the subject and the original parent generation are able to be proven.

Nodes role in the operation of the network does not involve storing a full copy of the transaction records in every block forever. This information is not required to validate transactions or to build blocks. This realisation allows the role of storing complete copies of every block to be pushed out from the central core of the network to archiving systems that can create business models around selling access to old, spent transaction records.

This also creates an incentive for users to take responsibility for their own data. Records can be kept locally or in cold storage, removing the need to access any kind of archive. This also allows users to attach additional details to transactions which may not be stored on the ledger.

Further information: [https://wiki.bitcoinsv.io/index.php/Block\_header](https://wiki.bitcoinsv.io/index.php/Block_header)
