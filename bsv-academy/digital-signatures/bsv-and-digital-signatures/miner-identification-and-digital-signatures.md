# Miner Identification and Digital Signatures

### Background

Users, businesses and wallets send transactions to the mining nodes from around the world. Nodes check the validity of a transaction and compete against other nodes in the ecosystem to mine the block. Mining here is equivalent to solving a challenging puzzle and requires a serious amount of computational resources. A block is simply validated and verified transactions timestamped as a group.

![](https://bitcoinsv.academy/storage/photos/4318/Chapter%204%20Lesson%206%20Image%20001.jpg)

As mentioned earlier, the transactions are sent to nodes for validation, verification, and inclusion in the block. Thus, it is not one node but many nodes competing with each other to mine the block. These nodes are interchangeably referred to as miners. The nodes are extremely well connected to have the least latency when communication among themselves. Once a node finds a solution to the computation puzzle, it propagates the block to the network. The network, i.e., the other nodes, then verify the Proof of Work and validate the transactions included in the block. If everything is verified correctly, the block is added to the blockchain with each miner who validated the block, signalling their acceptance by building new blocks which have a has-based dependency to the prior block. This is the consensus mechanism of the BSV system. This consensus mechanism is basically nodes competing and co-operating with each other.

On winning the block, i.e., acceptance of candidate block by the network, the node awards themselves the amount specified in their [coinbase](https://wiki.bitcoinsv.io/index.php/Coinbase) transaction.

One of the implications of publicly validating and confirming blocks on the BSV network is that miners are identifiable. Currently, there are two ways miners identify themselves:

1. Add the identity data into the coinbase transaction. Adding the identity data tot he coinbase transactions does not necessarily ensure accuracy and can be spoofed.
2. Utilise MinerID protocol. This protocol enables miners to have a cryptographically verifiable unique and custom identifier/descriptor. MinerID protocol uses ECDSA (secp256k1) for private/public key generation which are used in turn for signing and verification.

### MinerID

While the MinerID protocol provides a way of cryptographically associating a block to a specific Miner's pseudo-identity, a minerID is simply a public key from an ECDSA key pair. The private keys are used by the miner to sign minerID metadata contained in the transaction output of the coinbase transaction in a block that it mines.

Recall that one of the properties of Digital Signatures have is that of "Message Authentication" wherein minerID serves that purpose precisely. In other words, it enables the network to validate the authenticity of the node providing the candidate block to the network. This, in turn, adds to the entire network's security by minimizing certain attacks. Therefore, any node engaging in malicious acts or attempting to impersonate honest miners will not be able to perform them whilst using the MinerID protocol.

For more details on MinerID, refer to the [documentation](https://github.com/bitcoin-sv-specs/brfc-minerid).
