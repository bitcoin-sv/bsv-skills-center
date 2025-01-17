# Assessment 2



### Question pool 2: 6/7 <a href="#question-pool-2-6-7" id="question-pool-2-6-7"></a>

1. T/F A node can append transactions to a block in any order.
   1. **True**
   2. False
2. What is a Merkle tree?
   1. The complete transaction history of every single input contained within the block back to the moment they were distributed in the form of a block reward.
   2. **A Hierarchical data structure that enables secure and fast verification of data.**
   3. The process by which control over the funds being spent on the network is verified.
   4. Hash based proof-of-work that links together the blocks to form an immutable record leading back to the Genesis block.
3. What does the full data of a block consist of?
   1. The transaction inputs, scriptSig, and public address of all the transactions being submitted.
   2. **The serialised data of all the ordered raw transactions, a VarInt with the number of transactions, and the block header.**
   3. The nonce of the completed hash puzzle along with the transactions being submitted.
   4. The inputs, outputs, and scriptSig of all the transactions contained within the block.
4. What is a Pool Miner?
   1. **A Pool Miner is a machine that manages the distribution of mining candidates and governs groups of ASIC miners as they perform the hashing process.**
   2. A node operator that owns multiple nodes working together uses a pool miner to let their ASIC miners share rewards among the nodes.
   3. A set of co-located ASIC miners all working together is classified as a Pool Miner.
   4. A Pool Miner is formed when multiple nodes join together to build blocks, pooling their resources to compete with other nodes who are not in their pool.
5. What constitutes a valid proof-of-work?
   1. A nonce less than the difficulty target
   2. **A block header that hashes to less than the difficulty target.**
   3. A Merkle tree root which matches the block’s hash puzzle.
   4. A coinbase transaction containing a valid nonce
6. Why is it important for nodes to know who the other nodes are in the network?
   1. In order to try to out compete each other at producing valid blocks.
   2. To watch each other for attempts to double spend on the network.
   3. To prevent each other from attempting a 51% attack.
   4. **To directly share new transactions and block announcements with each other.**
7. Which answer best describes the Bitcoin network's energy consumption regarding proof-of-work and transaction processing?
   1. The energy consumed by proof-of-work will rise in a manner directly proportional to the number of transactions on the network.
   2. **Because the energy expended to find a valid proof of work is not related to the process of putting transactions into a block, Bitcoin’s per-transaction energy efficiency will increase as the number of transactions being validated in each block increases.**
   3. The energy expended to find a valid solution for a hash puzzle is directly tied to the process of gathering and validating the transactions in the block.
   4. (a) and (c).
