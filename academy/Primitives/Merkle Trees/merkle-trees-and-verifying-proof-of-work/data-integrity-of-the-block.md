# Data Integrity of the Block

Below is the raw data for the fields of the block header from block 550204 that we used for Chapter 3.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 3.20.44 pm.png>)

| DATA FIELD               | BYTES | Hexadecimal Value (Little Endian)                                                                                                                                |
| ------------------------ | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version                  | 4     | 00000020                                                                                                                                                         |
| Hash Previous Block      | 32    | 9257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f82010000000000000000                                                                                                 |
| Merkle Root              | 32    | 44049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaa                                                                                                 |
| Timestamp                | 4     | d262b15b                                                                                                                                                         |
| nBits                    | 4     | f3020218                                                                                                                                                         |
| Nonce                    | 4     | 4c480f57                                                                                                                                                         |
| String                   | 80    | 000000209257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f8201000000000000000044049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaad262b15bf30202184c480f57 |
| Block Hash               | 32    | 2bbc7a5bfd73ab81e8ed273e7c0568ae9ff2aebb7e6657010000000000000000                                                                                                 |
| **Block Hash (decimal)** |       | **3.28x10^55**                                                                                                                                                   |
| **Difficulty target**    |       | **4.93x10^55**                                                                                                                                                   |

Let's see what happens to the block hash as we try to add an additional transaction to the block after the proof of work solution has been found and broadcast to the nodes of the network. Perhaps this transaction could be to redistribute coins that have already been spent on the network so that they may be spent again. The TXID seen below is converted to little endian, then double hashed to generate the right-hand branch value. The left-hand branch value which was formerly the Merkle root (converted to little endian) is concatenated with this right-hand branch value and double hashed to generate the new Merkle root.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 3.21.45 pm.png>)

| TXID                                                             | Branch Value                                                     | Merkle Root                                                      |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| e50678410aa59b1c7a8c715021f8d42a0b41886a0c433f278e42242ff091360f | 44049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaa | 1f1a58c745ac25247dc2640f9b482a1ac746620f91051f9db10301395f289b33 |
| 55a4705deb52a8aabb702e36141a65ff163f68899a349535aa5424706ace3ee9 |                                                                  |                                                                  |
| 2ee4bba80d9cce70c45fe145beb52d9a1d7c0dbe08f15d123b80f612d8e05b31 | b3e53c6855a4011ae49326bf688707e52122e858d4bcaee869af1699aa5c489c |                                                                  |

Now the New Merkle root that has been calculated has been added to the Merkle root data field of the new block header candidate and serialised to generate the 80-byte string.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 3.23.42 pm.png>)

| DATA FIELD              | BYTES  | Hexadecimal Value (Little Endian)                                                                                                                                    |
| ----------------------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version                 | 4      | 00000020                                                                                                                                                             |
| Hash Previous Block     | 32     | 9257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f82010000000000000000                                                                                                     |
| Merkle Root             | 32     | 339b285f390103b19d1f05910f6246c71a2a489b0f64c27d2425ac45c7581a1f                                                                                                     |
| Timestamp               | 4      | d262b15b                                                                                                                                                             |
| nBits                   | 4      | f3020218                                                                                                                                                             |
| Nonce                   | 4      | 4c480f57                                                                                                                                                             |
| **#550204 (ii) STRING** | **80** | **000000209257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f82010000000000000000339b285f390103b19d1f05910f6246c71a2a489b0f64c27d2425ac45c7581a1fd262b15bf30202184c480f57** |

In the table below after passing the 80-byte string through a double application of the SHA256 function, the new block hash does not even come remotely close to being under the difficulty target. Therefore, to even attempt to promote this as a valid block with a proof of work solution, more attempts at the hash puzzle would have to be made by incrementing the nonce until a valid solution was found.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 3.24.41 pm.png>)

| HASH256 #550204 (ii)   | 3f26d0290c3e19ba35943b55c9d0184be966810d1ae6155bcafd06fd1cda8e56 |
| ---------------------- | ---------------------------------------------------------------- |
| Decimal                | 3.9 x 10^76                                                      |
| Difficulty             | 4.93 x 10^55                                                     |
| Difficulty - Blockhash | -3.9 x 10^76                                                     |

As can be seen from this exercise, if the hash of the previous block can only be generated using specific inputs for the fields of the block header (including the Merkle root of the transaction set), then it is practically impossible to insert a transaction into a previous block as doing so will generate a completely different Merkle root and therefore a completely different output when hashed with the nonce published for that block (which will be effectively guaranteed to fail to satisfy the hash puzzle). Even if a block hash can be generated which comes in under the target value, this block hash will also be completely different as an input into the subsequent block, and therefore any attempt to verify the subsequent block's proof of work with that nonce value will fail requiring the proof of work for that block to be redone as well.

This means in order for an attacker to introduce a new version of a block's transactions, which may include one that redistributes tokens to them self that they have already spent, they would need to execute the proof of work process until a fresh hash puzzle solution was found. They must then also win the race to solve the next hash puzzle before they could attempt to promote their version as the longest proof of work chain.

If they wish to introduce a double spend transaction from more than one block ago, they must redo the proof of work of all subsequent blocks and then catch up to the legitimate chain tip and win the next block to be successful in their attack. This has the effect of making transactions that occurred deeper than a certain amount of blocks practically impossible to change.

It is the efficiency of the Merkle tree as a data verification process that allows a node to check that the transactions in a block generate the same Merkle root as fast as possible to know whether they should dedicate their resources to building upon the solved block broadcast by another node or continue to execute proof of work on the current block. As the BSV network is completing trillions of hashes per second, every moment counts in creating a node's competitive advantage for finding a solution to the next block's hash puzzle and having that block built upon by other nodes.
