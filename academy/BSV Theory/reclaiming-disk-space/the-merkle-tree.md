# The Merkle Tree

> To facilitate this without breaking the block's hash, transactions are hashed in a Merkle Tree, with only the root included in the block's hash.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Reclaiming Disk Space - The Merkle Tree.gif>)

In order for nodes to be able to remove individual transactions that have been placed in a block without impacting the integrity of the block hash, a data structure known as a Merkle Tree is used.

Merkle Tree is a hash structure that can hold an unbounded number of data items in a particular order, and identify the set using a single ‘Merkle Root’ value.

Imagine a Merkle root like an inverted family tree. We start with a long list of individuals, and each is partnered and generates one child who partners with the child of another pair. This leads down to a single person who is the subject of the family tree.

The Merkle root is a single hash which represents the ordered list of all of the transaction ID’s processed by the node during the construction of their block. This Merkle root is embedded in the block header which forms the blockchain DA&#x47;**.** Because every transaction included in the block is effectively an input into the final hash that produces the Merkle root, changing any detail of any individual transaction, or even the order of the transactions would produce a different Merkle root. We can exploit this property to provide a mathematical proof that a transaction is part of a Merkle tree with a given root, but we do not need the data for the entire tree in order to do so. The required data for such a “proof of inclusion” is very compact.

Merkle trees allow Bitcoin blocks to grow at an unbounded rate with minimal impact on the user experience.

A Merkle tree enables a node to remove or ‘prune’ individual transactions from their record of a given block, and to retain only hashes of the transaction, or even hashes of the branch the transaction was in. With just a block header, a node can provably show that any transaction for which they have a corresponding hash and merkle path is contained within a block. This allows nodes to keep efficient, high speed systems at the forefront of the network, making the most of dynamic memory which is expensive to keep.

![](<../../../.gitbook/assets/image (26).png>)

Learn more about the Merkle Tree here: [https://en.wikipedia.org/wiki/Merkle\_tree](https://en.wikipedia.org/wiki/Merkle_tree)
