# Reclaiming Disk Space - Assessment 1



1. What does it mean for a transaction record to be immutable?
   1. It means that a transaction record is held privately and secured from alteration.
   2. &#x20;It means that everyone must retain a record of that transaction forever.
   3. &#x20;It means that the preservation of the transaction record is required of all nodes in order to build blocks.
   4. &#x20;It means that anyone with a copy of the transaction can prove that the transaction was created before the block timestamp.
2. &#x20;What is a method that can allow nodes to minimize the amount of data needed to be stored?
   1. Once a transaction has been made immutable, nodes are free to remove the outputs referred to in its inputs from their copy of the block chain. They are unnecessary for creating new blocks and waste storage space.
   2. &#x20;By storing transactions within blocks, nodes can significantly reduce the amount of data needing to be stored.
   3. &#x20;The process by which a transaction is made immutable minimizes the amount of storage being used.
   4. &#x20;A transaction is only made immutable once it has been discarded by a node thereby minimizing the amount of data being stored.
3. &#x20;What allows for nodes to be able to remove individual transactions that have been placed in a block without impacting the integrity of the block hash?
   1. A Merkle Block enables a node to remove entire blocks from their record of the chain of blocks, and to retain only hashes of the block.
   2. &#x20;A Merkle Branch enables a node to remove their record of a transaction, and to retain only hashes of the branch the transaction was in.
   3. &#x20;A Merkle Tree enables a node to remove individual transactions from their record of a block, whilst retaining the elements of the Merkle tree that are required to prove the integrity of the remaining transactions.
   4. &#x20;A Merkle Signature enables a node to remove spent transactions from their record of a block, and to retain only the signatures of those transactions.
4. &#x20;Once a transaction has been added to a valid block which the network has then built additional blocks upon, the transaction is considered \_\_\_\_\_\_\_\_ i). This means that anyone with a copy of the transaction can prove that \_\_\_\_\_\_\_\_\_ ii) and therefore it is no longer necessary for building new blocks. Nodes are free to remove these transactions from their copy of the block chain as they unnecessarily consume hard disk storage space. It then becomes the responsibility of the users to retain their own copies of these transactions which can be \_\_\_\_\_\_\_\_\_\_ iii).
   1. i) immutable, ii) the transaction was created before the block timestamp, iii) stored in archive services
   2. &#x20;i) immutable, ii) it existed after the block was created, iii) stored within their wallets
   3. &#x20;i) valid, ii) it is immutable, iii) stored on the ledger
   4. &#x20;i) removable, ii) it existed within a particular block, iii) reused into new UTXOs
5. &#x20;Which statements are true?(one correct selection necessary to proceed)
6. In order for nodes to be able to remove individual transactions that have been placed in a block without impacting the integrity of the block hash, a data structure known as a Merkle Hash is used.
   1. &#x20;A Merkle Tree is a hash structure that can hold an unbounded number of data items in a particular order, and identify the set using a single ‘Merkle Root’ value.
   2. &#x20;A Merkle root is like an inverted family tree. It starts with a long list of individuals, and each is partnered and generates one child which partners with the child of another pair. This leads down to a single person who is the subject of the family tree.
   3. &#x20;The Merkle root is a single hash, embedded in the block header, which represents the ordered list of all of the transaction ID’s processed by the node during the construction of their block.
7. &#x20;Which statements are true?(one correct selection necessary to proceed)
   1. Merkle trees allow Bitcoin blocks to grow at an unbounded rate with minimal impact on the user experience.
   2. &#x20;A Merkle tree enables a node to remove individual transactions from their record of a given block, and to retain only hashes of the transaction, or even hashes of the branch the transaction was in.
   3. With just a block header, a node can provably show that any transaction for which they have a corresponding hash and merkle path is contained within a block. This allows nodes to keep efficient, high speed systems at the forefront of the network, making the most of dynamic memory which is expensive to keep
   4. &#x20;Once a node removes or ‘prunes’ individual transactions from the record of a given block, that transaction ceases to exist on the entirety of the Bitcoin ledger.
