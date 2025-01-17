# Proof-of-Work in Action

Block 550204 has two transactions in it. Below we can see the raw transaction data converted to the TXID through a double application of SHA256 and the Merkle root calculated from a double application of SHA256 upon the concatenated TXIDs that would make up the leaf nodes of the two-layer Merkle tree. Note that the output from the hash functions is displayed as little-endian notation so a reversal of the byte string of the hexadecimal character pairs of the Merkle root is necessary to get the same Merkle root that's displayed as big endian in block explorers. Similarly, if you are building a Merkle tree out of TXIDs that you have found on a block explorer, they will be listed in Big Endian meaning a byte reversal to Little Endian is necessary before concatenating as pairs.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 2.58.44 pm.png>)



| **TX**                                           | **Raw TX Data**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | **HASH256 (TXID in Little Endian)**                              | **HASH256 \[1\|2] (Little Endian)**                              |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| **1**                                            | <p>01000000010000000000000000000000000000000000000000000000000000000000000000<br>ffffffff19033c65083838676a693166676c00966c47be0b09ffb3650300ffffffff016684814a00000<br>0001976a9145983d46a37697ef84bb0a0de00fcc169da06847588ac00000000</p>                                                                                                                                                                                                                                                     | 0f3691f02f24428e273f430c6a88410b2ad4f82150718c7a1c9ba50a417806e5 | 44049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaa |
| **2**                                            | <p>01000000011028cf06b9fd7eb47f53c0eb494faa73b703d179c4db8a82a4006e0c1d93178e01000<br>0006b483045022100af1bdcee3ebae916a6072e390f26cd4526741dd1ac79c8ad552253f24e4f9f<br>0d0220210722fb3900f246687de07dda8c66f48834041886c4bb640885a994e36351d7412103e<br>1d0ee3e2428df53ab81576b6e60631e97bf9a692ae57b311202a693196638ecfeffffff02e44e0f00<br>000000001976a9143fcf2e0815f62d7292867db34e0a48cebf5b25a788ac600bb1010000000019<br>76a914efdadcd32e8bedb8fa6eef66e7d6fb0b301f864288ac3a650800</p> | e93ece6a702454aa3595349a89683f16ff651a14362e70bbaaa852eb5d70a455 |                                                                  |
| **Merkle Root or HASH256 \[1\|2] in Big Endian** | aa6e2da3742c16a1066849e757e4dfb023ca477dcf24c83d282f2deaf69c0444                                                                                                                                                                                                                                                                                                                                                                                                                                |                                                                  |                                                                  |

Next, we see the Merkle root from the above calculations input as one element into the data fields of the block header. These values were obtained from a block explorer so again conversions are necessary to get all the decimal elements to hexadecimal and then a byte string reversal of the hexadecimal character pairs before all the data elements can be concatenated into a single 80-byte string. Although confusing for the human interpreting the endianness conventions, it is much more efficient for hardware to process inputs in little endian, and although such gains would not be noticeable when only one operation is performed, Bitcoin is designed to handle a transaction throughput of millions of transactions a second, so any optimisation processes have been implemented in the protocol design.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 2.59.59 pm.png>)



| Data Field          | Bytes | Value                                                                                                                                                            | **Hexadecimal (Little Endian)**                                  |
| ------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Version             | 4     | 20000000                                                                                                                                                         | 00000020                                                         |
| Hash Previous Block | 32    | 000000000000000001822fa70881fd8b3a26d85f347cca3fccbcd2a95b685792                                                                                                 | 9257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f82010000000000000000 |
| Merkle Root         | 32    | aa6e2da3742c16a1066849e757e4dfb023ca477dcf24c83d282f2deaf69c0444                                                                                                 | 44049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaa |
| Timestamp           | 4     | 1538351826                                                                                                                                                       | d262b15b                                                         |
| nBits               | 4     | 402785011                                                                                                                                                        | f3020218                                                         |
| Nonce               | 4     | 1460619339                                                                                                                                                       | 4b480f57                                                         |
| #550204 String      | 80    | 000000209257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f8201000000000000000044049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaad262b15bf30202184b480f57 |                                                                  |

In order to evaluate whether an attempt at the hash puzzle was successful, the output is checked against a value that can be calculated from the 4-byte nBits value using the following formula.



```markup
= coefficient * 2 ^ ( 8 * (index — 3) )
= 0x0202f3 x 2^(8 x (0x18-3))
= 131827 x 2^(8(24-3))
= 4.93x10^55
```

_0x denotes that this value is in hexadecimal_

This calculation will yield an extremely large number, so by using the 4-byte value, the node software is able to parse the string for two pieces of information embedded within it. The first byte represents the index which will determine which power the following 3 bytes (coefficient) will be raised by. The nBits value is generally displayed in block explorers as a decimal number yet the calculation will be performed on the hexadecimal representation of that number by the node software. In the case of the block, we are working with the hexadecimal representation of nBits is 180202F3, where 18 (24 in decimal) will be the index and 0202F3 (131827 in decimal) the coefficient.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 3.03.13 pm.png>)

| <p><br>Hexadecimal</p>     | Decimal                                                          |                                                                                |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| 1st Hash                   | eee9428aaf8117633011f5fc9f225641c239ee9839af775b48f67fd16512cd9e | 108062592583125048371800204014412291248245351226987386384426656356890072763806 |
| 2nd Hash                   | 2b68c4606e28ff6193f2734243eb0cddc660fd931b1636866dc80c6ec27bf7cf | 1.96x1076                                                                      |
| Difficulty Target          | 4.93x10^55                                                       |                                                                                |
| Difficulty minus Blockhash | -1.96x10^76                                                      |                                                                                |

&#x20;

As we can see the first attempt at generating a successful proof of work solution was invalid as the output from the double hashing of the block header was much higher ($$10^{21}$$) than the target value specified from inputting the nBits value into the equation. Assuming that no new transactions have been appended to the Merkle tree and we are still within the same second of the UNIX time, a new attempt at the proof of work can be made by incrementing the nonce by 1. This yields an almost entirely similar 80-byte string as the first concatenated block header data inputs with only one hexadecimal character being incremented. Yet, when we check the output from the double application of the SHA256 hash function to the string we can see a significantly lower value with a large number of leading zeros.

![](<../.gitbook/assets/Screen Shot 2022-08-11 at 3.04.09 pm.png>)



| Data Field                        | Bytes | Hexadecimal Value (Little Endian)                                                                                                                                |
| --------------------------------- | ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version                           | 4     | 00000020                                                                                                                                                         |
| Hash Previous Block               | 32    | 9257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f82010000000000000000                                                                                                 |
| Merkle Root                       | 32    | 44049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaa                                                                                                 |
| Timestamp                         | 4     | d262b15b                                                                                                                                                         |
| nBits                             | 4     | f3020218                                                                                                                                                         |
| Nonce                             | 4     | 4c480f57                                                                                                                                                         |
| String                            | 80    | 000000209257685ba9d2bccc3fca7c345fd8263a8bfd8108a72f8201000000000000000044049cf6ea2d2f283dc824cf7d47ca23b0dfe457e7496806a1162c74a32d6eaad262b15bf30202184c480f57 |
| Block Hash (Little Endian)        | 32    | 2bbc7a5bfd73ab81e8ed273e7c0568ae9ff2aebb7e6657010000000000000000                                                                                                 |
| **Block Hash (Big Endian)**       |       | **00000000000000000157667ebbaef29fae68057c3e27ede881ab73fd5b7abc2b**                                                                                             |
| **Block Hash (decimal)**          |       | **3.28x10^55**                                                                                                                                                   |
| **Difficulty target**             |       | **4.93x10^55**                                                                                                                                                   |
| **Difference (target-blockhash)** |       | **1.65x10^55**                                                                                                                                                   |

Converting the number to a decimal value and comparing it to the target value calculated by the 180202f3 used in the difficulty target equation, we can see that the output is indeed lower than the target value and a correct solution for the proof of work challenge has been found! In the next chapter we will look at how this solution is communicated to the nodes on the network and how they can check the proof of work before referencing this block hash in their next block header candidate.
