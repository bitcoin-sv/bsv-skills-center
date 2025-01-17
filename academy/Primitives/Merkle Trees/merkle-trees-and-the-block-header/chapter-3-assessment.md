# Chapter 3 - Assessment

Students must receive a score of 7/8 to proceed.

&#x20;

**Question 1**

&#x20;

Below is a Raw Transaction Data in Hexadecimal. Given the hexadecimal character count, what is the size of the transaction in bytes?

&#x20;

| **Raw Transaction Data**                                                                                                                                                                                                     | **Hexadecimal Characters** | **Bytes** |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- | --------- |
| 01000000010000000000000000000000000000000000000000000000000000000000000000ffffffff0f042d603350020106062f503253482fffffffff0100f2052a0100000023210243f66fa873761ba49507912bf429eed9ef705850b565f40b415052c44abf9349ac00000000 | 220                        | 110       |

&#x20;

**Question 2**

&#x20;

Complete the byte size for each of the values in the table below.

&#x20;

| **Header**    | **Bytes** |
| ------------- | --------- |
| Version       | 4         |
| HashPrevBlock | 32        |
| MerkleRoot    | 32        |
| Timestamp     | 4         |
| nBits         | 4         |
| Nonce         | 4         |

&#x20;

**Question 3**

&#x20;

The following block contains 10 transactions with the transaction scripts and their size displayed in the table. Given no transaction in the list has more than 2 outputs and all inputs are the same size, which transaction has the most inputs?

&#x20;

| **index** | **TXID**                                                         | **Bytes** |
| --------- | ---------------------------------------------------------------- | --------- |
| 0         | efe68e7c6927c5547952180b8c39a5ad6239d52745a66d0f8836781e41146f5a | 110       |
| 1         | 6523238599d391c7a52f0e18f709d7cfdcda68f4cbedb9c99acdf2ecaa721d00 | 258       |
| 2         | fd7377fc8946df3cb6d5ffea5c068384cdb6caae9d5c897def1fe5c2995ea72c | 258       |
| 3         | c8627ec4a9cf1ca5e0483f1f332d365a0fe77839c9c7ef801ccc53d778b48523 | 618       |
| 4         | 4b2e4786c507bce60d931d6382379d128577172afbe579cd783fcb5d32c6ebd4 | 259       |
| 5         | 0abcfae88cf4c1ec4d5bee6454495a76fd69e811e970006834ae5285ef4fcc32 | 258       |
| 6         | b683f1083301929418b012b90a9d64b17e54f08f68c1a0024009708e2ecc7943 | 258       |
| 7         | e425b475dfb89bc40eb8befb93c8edb46884e391a07ec56f62895674342d90c3 | 797       |
| 8         | 80790f50b0f927fc1bcc11ab41d3b25edae7f60c79da7ce07b9457020a5dc0f7 | 259       |
| 9         | 6c2273349e99ba0c640ea5d2cf60ecadb816548651272d194795f4810455ee52 | 258       |

* [ ] 0
* [ ] 3
* [ ] 4
* [x] 7

&#x20;

**Question 4**

&#x20;

What is the size of the block header in bytes?

&#x20;

| **Header**                                                  | **Bytes**                                                        |           |
| ----------------------------------------------------------- | ---------------------------------------------------------------- | --------- |
| Version, HashPrevBlock, MerkleRoot, Timestamp, nBits, Nonce | 80                                                               |           |
| **10**                                                      | **Transaction Count (VarInt)**                                   | **1**     |
| **index**                                                   | **TXID**                                                         | **Bytes** |
| 0                                                           | efe68e7c6927c5547952180b8c39a5ad6239d52745a66d0f8836781e41146f5a | 110       |
| 1                                                           | 6523238599d391c7a52f0e18f709d7cfdcda68f4cbedb9c99acdf2ecaa721d00 | 258       |
| 2                                                           | fd7377fc8946df3cb6d5ffea5c068384cdb6caae9d5c897def1fe5c2995ea72c | 258       |
| 3                                                           | c8627ec4a9cf1ca5e0483f1f332d365a0fe77839c9c7ef801ccc53d778b48523 | 618       |
| 4                                                           | 4b2e4786c507bce60d931d6382379d128577172afbe579cd783fcb5d32c6ebd4 | 259       |
| 5                                                           | 0abcfae88cf4c1ec4d5bee6454495a76fd69e811e970006834ae5285ef4fcc32 | 258       |
| 6                                                           | b683f1083301929418b012b90a9d64b17e54f08f68c1a0024009708e2ecc7943 | 258       |
| 7                                                           | e425b475dfb89bc40eb8befb93c8edb46884e391a07ec56f62895674342d90c3 | 797       |
| 8                                                           | 80790f50b0f927fc1bcc11ab41d3b25edae7f60c79da7ce07b9457020a5dc0f7 | 259       |
| 9                                                           | 6c2273349e99ba0c640ea5d2cf60ecadb816548651272d194795f4810455ee52 | 258       |

&#x20;

&#x20;

**Question 5**

&#x20;

What is the size of the block in bytes?

&#x20;

| **Header**     |                                                                  |           |
| -------------- | ---------------------------------------------------------------- | --------- |
| #194981        | Version, HashPrevBlock, MerkleRoot, Timestamp, nBits, Nonce      | 80        |
| 10             | Transaction Count (VarInt)                                       | 1         |
| **index**      | **TXID**                                                         | **Bytes** |
| 0              | efe68e7c6927c5547952180b8c39a5ad6239d52745a66d0f8836781e41146f5a | 110       |
| 1              | 6523238599d391c7a52f0e18f709d7cfdcda68f4cbedb9c99acdf2ecaa721d00 | 258       |
| 2              | fd7377fc8946df3cb6d5ffea5c068384cdb6caae9d5c897def1fe5c2995ea72c | 258       |
| 3              | c8627ec4a9cf1ca5e0483f1f332d365a0fe77839c9c7ef801ccc53d778b48523 | 618       |
| 4              | 4b2e4786c507bce60d931d6382379d128577172afbe579cd783fcb5d32c6ebd4 | 259       |
| 5              | 0abcfae88cf4c1ec4d5bee6454495a76fd69e811e970006834ae5285ef4fcc32 | 258       |
| 6              | b683f1083301929418b012b90a9d64b17e54f08f68c1a0024009708e2ecc7943 | 258       |
| 7              | e425b475dfb89bc40eb8befb93c8edb46884e391a07ec56f62895674342d90c3 | 797       |
| 8              | 80790f50b0f927fc1bcc11ab41d3b25edae7f60c79da7ce07b9457020a5dc0f7 | 259       |
| 9              | 6c2273349e99ba0c640ea5d2cf60ecadb816548651272d194795f4810455ee52 | 258       |
| **Block Size** |                                                                  |           |
| 3414           | **Bytes**                                                        |           |

&#x20;

Question 6\
\
Remembering the block has 10 transactions, how much data would be required to transmit the Merkle path for transaction #4 to calculate the Merkle root??

&#x20;

| 128 | Bytes |
| --- | ----- |

\
Question 7\
\
At block height 700 000 the Bitcoin blockchain will be 1TB with 100 billion transactions, averaging 1KB each, recorded in the ledger. What will be the size of the set of block headers?

&#x20;

| 56000000 | Bytes |
| -------- | ----- |

\
Question 8\
\


64 transactions were timestamped into block 700. If you are in possession of an up to date set of block headers, what will be the minimum amount of additional data that is required to verify a UTXO as valid from this set of transactions 699 300 blocks deep?

&#x20;

| 192 | Bytes |
| --- | ----- |

\
