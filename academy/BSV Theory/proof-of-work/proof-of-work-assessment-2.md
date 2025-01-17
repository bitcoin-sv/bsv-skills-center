# Proof of Work Assessment 2

1.How are bitcoin transactions immutable?

Once a Bitcoin transaction is time-stamped into a block, that timestamp becomes permanently affixed to the hash of that transaction and the transaction itself would need to be erased from all the nodes on the network.

As soon as a transaction is broadcasted and reaches all nodes in the network it is impossible to delete any record of that transaction and thereby it becomes immutable.

Bitcoin transactions are not immutable and nodes are able to alter them as they wish although if found out they may be banished from the network or could face legal prosecution.

Transactions within a block that have a valid proof-of-work solution cannot be modified without invalidating the proof-of-work. Once a block has been accepted as valid by the network, overwriting transactional information requires the proof-of-work for that block and subsequent blocks to be redone in order for the network to recognise the new version of the chain as valid.

&#x20;

2.How do hash machines search for a valid proof of work solution?

Within the Bitcoin network; hash machines take the transaction and begin testing different signature hashes by incrementing the 4-byte nonce value and re-hashing the signature as many times as possible per second. A transaction is solved when a hash machine finds a signature value that when combined with the block hash creates a signature that hashes to a value which is less than the difficulty target, which is stored in the block header as a 4 byte floating point number.

Within the Bitcoin network; hash machines take the block header and begin testing different message hashes by incrementing the 4-byte nonce value and re-hashing the message as many times as possible per second. A block is solved when a hash machine finds a nonce value that when combined with the block header creates a message that hashes to a value which is less than the difficulty target, which is stored in the block header as a 4 byte floating point number.

Within the Bitcoin network hash machines take the nonce and begin testing different random numbers by incrementing the 4-byte nonce value and re-hashing the nonce as many times as possible per second. A block is solved when a hash machine finds a nonce value that when combined with the block creates a message that hashes to a value which is less than the difficulty target, which is stored in the block header as a 4 byte floating point number.

Within the Bitcoin network; hash machines take the directed acyclic graph and begin testing different message hashes against transactions and re-hashing the message as many times as possible per second. A block is solved when a hash machine finds a nonce value that when combined with the directed acyclic graph, creates a message that hashes to a value which is less than the difficulty target, which is stored in the block header as a 4 byte floating point number.

&#x20;

3.Every block since the \_\_\_\_\_\_\_\_\_\_ i) is built upon a \_\_\_\_\_\_\_\_\_\_\_ ii), so overwriting information stored at a certain point in the chain would require the \_\_\_\_\_\_\_\_\_\_\_\_ iii), and every block discovered since in order for the network to recognise the new version of the time chain as valid history.

i) Genesis block, ii) chain consisting of all previous blocks, iii) chain be redone for all prior blocks

i) Origin block, ii) chain of proof-of-work, iii) consensus of all nodes

i) Genesis block, ii) chain consisting of all previous blocks, iii) proof-of-work be redone for all prior blocks

i) Genesis block, ii) previous block in the chain, iii) proof of work on the block containing the information being overwritten

&#x20;

4.How practical is it for an attacker to change or remove a transaction and how does that make Bitcoin secure?

An attacker must build a new proof of work chain and outpace the constantly lengthening chain-tip for their blocks to be considered as valid, making it computationally impractical to erase information that has been captured in a block. In this way, information contained in blocks that have an established quantity of proof of work on-top of them are considered immutable.

An attacker must hack into the node infrastructure of each of the nodes within the Bitcoin network and simultaneously alter or remove the transactions entirely from the node data archive. This is extremely difficult to achieve and requires the usage of quantum computers along with additional advanced network penetration techniques.

Bitcoin is secure because each transaction is under constant surveillance by all network nodes which are alerted to any attempts to alter or remove the transaction and will subsequently fork the network to protect the integrity of the transaction record.

While it is easy to form a duplicate proof-of-work chain and alter specific transactions on Bitcoin, it is complicated to convince the network that this altered chain is the correct one and involves complicated deception techniques in order to force nodes to build blocks on the imposter chain.
