# The Block Header

[https://player.vimeo. com/video/674782616](https://player.vimeo.com/video/674782616)

The block header contains the information needed for any party to validate the proof-of-work and contents of a block.

[https://player.vimeo. com/video/674786302](https://player.vimeo.com/video/674786302?h=5fd1a8710f\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

The sequentially linked block headers form the structure of the blockchain, which is a directed acyclic graph (DAG) made up of the complete sequence of blocks from the original genesis block to the current tip of the longest proof-of-work chain. Each block header is made of the following items:

1. version - This 4 byte little endian field indicates the version of the Bitcoin protocol under which the node is publishing the block.
2. hashPrevBlock - This 32 byte little endian field is the double SHA256 hash of the previous block header. This forms the edge to the previous block that joins it to the blockchain DAG.
3. hashMerkleRoot - This 32 byte little endian field represents the Merkle root of the Merkle tree that contains the transactions which are timestamped in the block.
4. time - This 4 byte field is the Unix epoch timestamp that is applied to all transactions in the block. Current network policy only requires this value to be accurate to within 2 hours of the validating nodes’ local timestamp. The timestamp has 1 second precision.
5. bits - This 4 byte field yields the difficulty target value of the proof-of-work puzzle, as determined by the network rules.
6. nonce - This stands for ‘number used once’. The values of this 4 byte field are cycled through to modulate the block header. The hash of the header is then checked against the difficulty target. Nodes provide adequate information such that when all 4.3 billion values of a nonce have been tried, they can modulate the input field in the block’s coinbase transaction and recalculate the Merkle root. This changes the serialised string of the block header, giving another 4.3 billion unique nonce values to iterate in their search for a hash puzzle solution under the difficulty target.
