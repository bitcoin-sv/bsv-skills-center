# Creating a Block Template

[https://player.vimeo. com/video/674782496](https://player.vimeo.com/video/674782496)

As transactions are received and validated by the node, they are appended to the node’s Merkle tree. This means the TXID hash is used in the creation of the Merkle Root, making it part of the node’s block template.

A Merkle tree is constructed with the unconfirmed transactions as leaves. Merkle roots can represent ordered sets with unbounded size in a unique fixed-length byte string. Therefore, the number of transactions in a block is theoretically unbounded in terms of Merkle tree structure.

When a transaction is added to the Merkle tree, the serialised binary string is hashed twice using the SHA256 algorithm, with the double hash (the Transaction ID, or TXID) forming the leaf nodes at the base of the tree. Each time a transaction is added to the tree, the Merkle root must be re-calculated, creating a new block template.

As the network scales, nodes may choose to parallelise the generation of Merkle trees. This could be done by creating Merkle trees of a subset of the transactions in a candidate block and recombining to form a larger tree.

[https://player.vimeo. com/video/674786245](https://player.vimeo.com/video/674786245?h=eeb6ae32f1\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)
