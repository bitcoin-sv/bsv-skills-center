# Assessment 4

ASIC mining machines \_\_\_\_ values through a supplied \_\_\_\_ and with each value the block header is hashed twice using SHA256. A block header is valid if the double hash is \_\_\_\_\_\_ and can be added to the chain.

* [ ] adds, block header, more difficult than the difficulty target.&#x20;
* [ ] test, hash function, equal to or less than the difficulty target.&#x20;
* [ ] hash, block, greater than the difficulty target.&#x20;
* [x] increment nonce, block header, less than the difficulty target.

What do pool-miners use their mining candidate for?

* [x] To generate unique block headers and coinbase transactions which they provide to their ASICs.
* [ ] Incrementally iterating a nonce as an input to the candidate header before hashing with the ASIC miners.&#x20;
* [ ] For their ASICs to perform 4.3 billion nonce cycles on, in order to generate proof-of-work.&#x20;
* [ ] All of the above.

How does a node signal consensus?

* [ ] By propagating a first seen block to the rest of the network.&#x20;
* [ ] By sending a first seen block to a pool-miner in order to be hashed into the next block it is forming.
* [x] By forming a block template using the new block’s hash for the prevHash field.&#x20;
* [ ] By retaining a first seen block’s block header for its record.

What happens when two valid blocks are found with the same previous block hash?

* [x] The First Seen Rule applies.&#x20;
* [x] An Orphan Race.&#x20;
* [ ] The node who found them first choses by incorporating one of the block’s hash into their next block.&#x20;
* [ ] Both blocks are orphaned.

Since nodes can freely accept and reject blocks, it is important that they are aware of what the \_\_\_\_\_\_ the network accepts as the valid chain in order to be sure they are always building on the \_\_\_\_\_\_ of blocks and not producing \_\_\_\_ blocks.

* [ ] most recent block, valid chain, orphan.&#x20;
* [x] majority of nodes on, longest valid chain, invalid.&#x20;
* [ ] different groups of nodes on, most recent, on orphaned.&#x20;
* [ ] most connected nodes on, most recent chain, on invalid.
