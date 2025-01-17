# Final Assessment

Congratulations, you have now reached the final milestone for this course.

&#x20;

This is the final assessment, which will assess you on all that you have learned so far. Successful completion of this assessment is mandatory for receiving the certificate for the course.

&#x20;

Students must receive a score of 24/29 to pass. Some questions could have one or more possible correct answers.

&#x20;

Why are Merkle trees used in bitcoin?

* [ ] To store bitcoins.&#x20;
* [x] As a data integrity verification structure.&#x20;
* [ ] To keep the blocks small.&#x20;
* [ ] Because they are an open-source tool.

How many entries can make up a Merkle tree?

* [ ] An unlimited number of odd entries.
* [ ] An unlimited number of even entries.
* [x] An unlimited number of entries.
* [ ] 256^32

What is the term used to describe an unpaired value on a layer of a Merkle tree?

* [ ] Orphan&#x20;
* [ ] Bachelor&#x20;
* [x] Widow&#x20;
* [ ] Loner

In the case of bitcoin, the leaf nodes of a block's Merkle tree are made up of what values?

* [ ] RIPEMD160 hash of raw transaction data.&#x20;
* [ ] RIPEMD160(SHA256) hash of raw transaction data.&#x20;
* [ ] SHA256 hash of raw transaction data.&#x20;
* [x] HASH256 of raw transaction data.

The Merkle tree for a data set of 256 transactions would have how many layers?

* [ ] 7
* [x] 8
* [ ] 9
* [ ] 10

If the Merkle root is calculated from 10 x 32-byte leaf nodes, what will the byte length of the Merkle root be?

* [ ] 320 bytes&#x20;
* [ ] 640 bytes&#x20;
* [ ] 160 bytes&#x20;
* [x] 32 bytes

A transaction with an index value of 15 will, after being put through a \_\_\_\_\_ hash function, generate a left- or right-hand leaf node before concatenation with its pair?

* [ ] SHA256, Left&#x20;
* [x] HASH256, Right&#x20;
* [ ] HASH256, Left&#x20;
* [ ] SHA256, Right

Examples of systems where Merkle trees are used as a data verification process include....

* [ ] BitTorrent&#x20;
* [ ] Git&#x20;
* [ ] Bitcoin&#x20;
* [x] All of the above.

What type of data object can be committed to the Merkle tree data structure?

* [ ] Hexadecimal string only.&#x20;
* [ ] Any alphanumeric string only.&#x20;
* [x] Anything that can be hashed.&#x20;
* [ ] Anything.

If the data object E that was used to construct the following Merkle tree was changed, which of the following values would also change?

<figure><img src="../.gitbook/assets/BSVA-MerkleTrees-FinalAssesmentImage (1).jpg" alt=""><figcaption></figcaption></figure>

&#x20;

* [x] H(ABCDEFGHIJKLMNOP)
* [ ] H(IJKLMNOP)
* [x] H(E)&#x20;
* [ ] H(GH)

&#x20;

From the same Merkle tree, with a different data object E, how many values would need to be recalculated?

<figure><img src="../.gitbook/assets/BSVA-MerkleTrees-FinalAssesmentImage (1).jpg" alt=""><figcaption></figcaption></figure>

* [ ] 3
* [ ] 4
* [x] 5
* [ ] 6

What data fields make up the block header?

* [ ] Merkle root and the hash of the previous block.&#x20;
* [ ] Merkle root, hash of the previous block, difficulty and nonce.&#x20;
* [x] Merkle root, hash of the previous block, difficulty, timestamp, version, nonce.&#x20;
* [ ] Merkle root, hash of the previous block, difficulty, timestamp, version, nonce, block reward.

What is the size in bytes of the block header?

* [ ] 32 bytes&#x20;
* [ ] 160 bytes&#x20;
* [ ] 80 bytes&#x20;
* [ ] 256 bytes

What are the byte lengths of the data fields that make up the block header?

* [ ] Merkle root (32), Hash of the previous block (32), difficulty (8), nonce (8).&#x20;
* [ ] Merkle root (32), Hash of the previous block (32), difficulty (4), nonce (4).&#x20;
* [ ] Merkle root (32), Hash of the previous block (32), difficulty (8) nonce (8), timestamp (8), version (8)
* [x] Merkle root (32), Hash of the previous block (32), difficulty (4), nonce (4), timestamp (4), version (4)

In order for a solution for a block's hash puzzle to be valid, the hash of the header must be \_\_\_\_\_\_\_\_\_\_\_\_\_ the difficulty target?

* [x] Less than.&#x20;
* [ ] Less than or equal to.&#x20;
* [ ] Greater than.&#x20;
* [ ] Greater than or equal to.

If hashing the serialised string of the block header does not yield a valid solution to the hash puzzle, what must the node do for another attempt?

* [ ] Recalculate the Merkle root to include new transactions and try again.&#x20;
* [ ] Update a new timestamp to account for the time elapsed during the first attempt and try again.
* [ ] Update the version number to record how many attempts you have made and try again.
* [x] Increment the nonce and try again.

If the hash puzzle takes too long to solve, what will happen to the difficulty?

* [ ] The difficulty goes up regardless of the time taken to solve the hash puzzles.&#x20;
* [ ] The difficulty will increase to encourage more powerful miners to commit their hash.&#x20;
* [x] The difficulty will decrease so the same amount of hash power can find a hash puzzle solution quicker.&#x20;
* [ ] The difficulty will stay the same as block time variance is a part of bitcoin's design.

When a valid solution to the hash puzzle is found, what must a node immediately do?

* [x] Broadcast the block to as many nodes on the network as possible.&#x20;
* [ ] Submit a request for payment of the block reward.&#x20;
* [ ] Make sure that all transactions that made it in to their block are valid.&#x20;
* [ ] Assess the new difficulty to see if it's economically viable to commit hash to the next block.

What does the majority of other nodes using the hash of a new block's header in their next block candidate signify?

* [ ] That the rules were followed by everyone up until that point.&#x20;
* [ ] That the specific transaction chronology of the Merkle tree represented by the Merkle root will be accepted by the network.&#x20;
* [ ] That they agree the node should be awarded the block subsidy and transaction fees.&#x20;
* [x] All of the above.

The coinbase transaction will be which transaction in a block's Merkle tree?

* [ ] The coinbase transaction is part of the block header and does not form part of the Merkle tree.
* [x] The first transaction.
* [ ] The last transaction.
* [ ] The coinbase transaction can be any number in the tree as a node will create it once the fees from previous transactions have accumulated enough to be profitable.

How much storage is required to keep a year’s worth of block headers?

* [ ] 80 bytes&#x20;
* [ ] 4.2KB&#x20;
* [x] 4.2MB&#x20;
* [ ] 80MB

Given a block's Merkle root, to verify a transaction within a Merkle tree for the block with 1024 transactions, along with the TXID, how many node values would be required along the Merkle path for verification?

* [ ] 8
* [x] 9
* [ ] 10
* [ ] 11

The coinbase transaction for a given block will have an index value of what?

* [x] 0&#x20;
* [ ] 1&#x20;
* [ ] The coinbase transaction is the only transaction recorded in the block header.&#x20;
* [ ] It varies depending upon the number of transactions.

If a block had 2^16 transactions in it, how many bytes would the Merkle path be for a transaction to the root?

* [ ] 32KB&#x20;
* [ ] 1MB&#x20;
* [x] 512 bytes&#x20;
* [ ] 4.2MB

Which of the following is not an example of a protocol consensus rule?

* [ ] Maximum Block Size
* [ ] Coinbase Maturity Rule
* [x] Standardised Merkle Proof
* [ ] Difficulty Adjustment Algorithm

What key components are included in the BUMP data structure to support the efficient calculation and verification of Merkle roots? (Select two)

* [ ] Block Height
* [ ] Wallet addresses
* [x] Tree Height
* [ ] Encryption Keys

How does the BUMP format improve the transaction verification process for users and nodes on the BSV network?

* [ ] By increasing the size of each block
* [ ] By encrypting transaction data
* [x] By reducing data redundancy and enhancing efficiency&#x20;
* [ ] By decentralizing the network further

The BUMP format, integral to enhancing the SPV model within BSV, was outlined in which document?

* [ ] BRC-64
* [ ] Bitcoin Whitepaper​​​​​​​
* [x] BRC-74
* [ ] BRC-100

When encoding a BUMP proof, what does a 'duplicate' flag set to true indicate for processing a leaf?

* [ ] The leaf contains a new hash to be calculated.&#x20;
* [x] The hash of the previous node should be duplicated.&#x20;
* [ ] The leaf should be ignored in the calculation.&#x20;
* [ ] A new txid is introduced in the path.

\
