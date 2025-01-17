# Final Assessment



1. What are the 3 main differences between hashing and encryption?\
   a) message delivery, collision resistance, and packet maintenance\
   **b) data loss, reversibility, and collision risk**\
   c) packet integrity, message delivery, and reversibility\
   d) data loss, reversibility, and packet integrity\
   \

2. What are the 3 important properties of ideal secure hash functions?\
   a) preimage resistance, second preimage resistance, and data integrity\
   **b) collision resistance, preimage resistance, and second preimage resistance**\
   c) data integrity, data availability, and data confidentiality\
   d) second preimage resistance, collision resistance, and data integrity\
   \

3. Why is Base58 used in Bitcoin instead of the more common Base64?\
   a) don't want 0OIl characters that look the same in some fonts\
   b) could be used to create visually identical looking account numbers\
   c) a string with non-alphanumeric characters is not as easily accepted as an account number\
   d) e-mail usually won't line-break if there's no punctuation to break at\
   f) doubleclicking selects the whole number as one word if it's all alphanumeric\
   **g) all of the above**\
   \

4. Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), find the checksum bytes in hexadecimal of the input string encoded in Base58Check checksum.\
   \


| **Input String**                                           | **Base58**                                                                          | **Base58Check**                                                                           | **Checksum** |
| ---------------------------------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------ |
| Any system is only as good as it is useful -Linus Torvalds | **bXDBXzRN8ei3wRVRPByafBxTAp6osoZCijV6EomcSzx3mhp77vWzF6pbwkVJbj5eB2EdrbvyLFPBEUJ** | **4ttkt4iyNPZ3iXRg9cX3y5R2sJbBLsE5chrBZuYgbmQWPuGgV4M7CVrbuWvahpYQ4mwGSYQddw5dwRxrWV9LB** | **RxrWV9LB** |

&#x20;

5\. What is HASH-256 used for in the Bitcoin system?\
a) calculating transaction fees\
b) It’s not used\
**c) TXIDs, Merkle roots, and block headers**\
d) encryption\
\


6\. Calculate the big endian TXID for the following transaction:

| `01000000011e4bf9dc623d942fee4113e077f67204419cb6f841d98ebf250b698cbea8912b000000006b483045022100a7ce3b1d8cc852e625e5da3159131ba7ba071c7a93684f1d3b8d08b6dbc08e82022041ac850772b5877cc8b724f6a7a92709a65a17a52f78419b67304f2481526b79412102e8a1ab43a501a2ab84a14c5ef1a65c15add65f3ec8230e3fb63644a44ac71003ffffffff0200943577000000001976a914aa5604bae61cd60690dd9dec5efbb841668cb19288ac8f933577000000001976a914e33649e455368d536f6003b2908b6299df5fe8bf88ac00000000` |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| **Big Endian TXID**                                                  |
| -------------------------------------------------------------------- |
| **9a2d57528ed943eae34676928e52dc10623514f4420134ff791f64cb3f667875** |

&#x20;

7\. List how many output UTXOs the following transaction has, and, using the hash calculator, find their satoshi values in decimal\
\


| `01000000011e4bf9dc623d942fee4113e077f67204419cb6f841d98ebf250b698cbea8912b000000006b483045022100a7ce3b1d8cc852e625e5da3159131ba7ba071c7a93684f1d3b8d08b6dbc08e82022041ac850772b5877cc8b724f6a7a92709a65a17a52f78419b67304f2481526b79412102e8a1ab43a501a2ab84a14c5ef1a65c15add65f3ec8230e3fb63644a44ac71003ffffffff0200943577000000001976a914aa5604bae61cd60690dd9dec5efbb841668cb19288ac8f933577000000001976a914e33649e455368d536f6003b2908b6299df5fe8bf88ac00000000` |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |

| **Number of UTXOs (in hex)** | **Value of first UTXO (in decimal)** | **Value of second UTXO** |
| ---------------------------- | ------------------------------------ | ------------------------ |
| **02**                       | **2000000000**                       | **1999999887**           |

&#x20;

8\. At what block depth do coinbase UTXOs become spendable?\
a) 1\
b) 50\
**c) 100**\
d) 101\
\


9\. What are the 3 main parts of Merkle-Damgård hash functions?\
a) blocks, schedules, and outputs\
b) compression, schedules, and blocks\
**c) preprocessing, compression, and final construction & output**\
d) compression, preprocessing, and blocks\
\


10\. How many satoshis exist in the Bitcoin system?\
a) 21,000,000\
b) 21,000,000,000,000\
**c) 2,100,000,000,000,000**\
d) 2.1 x 106\
\


11\. How many rounds of compression does RIPEMD-160 have?

a) 100\
b) 64\
c) 128\
**d) 80**\
\


12\. Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), Calculate the 33 byte compressed form of the following ECDSA public key

| **Public key x-coordinate**                                                    | **Public key y-coordinate**                                                   | **Compressed Public key in HEX**                                       |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| 113664773391849625820845192611086427189289514738370038712289171739672026632191 | 76250103327783796662952791688177245826353020810702491301843418910254328042705 | **03fb4bfb5dd0be7093ba8ea643775af1ae05f05be1415da2d2cef997b33be14fff** |

&#x20;

13\. Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), calculate the Bitcoin address from the compressed public key in question 12

| **Bitcoin Address**                    |
| -------------------------------------- |
| **1QH1dpNvz7YMPA7CLNZwN4dAbKXH6YdeYh** |

&#x20;

14\. Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), calculate the WIF for the follow private key\
\


| **Private key**                                                  | **WIF**                                                  |
| ---------------------------------------------------------------- | -------------------------------------------------------- |
| 5ee98fbc968fb9abd3bb98e0d7792080d62014aac3ea7245676716dcfca9e160 | **KzQD2FkVBJXE3m69eeWodG3oFQTuUA1kE2LNmAdCq77ksG1sCd5c** |

&#x20;

15\. Using the [hash calculator](https://bitcoinsv.academy/hash-calculator) and a [big number calculator](https://goodcalculators.com/big-number-calculator/), calculate Alice and Bob’s shared secret using Diffie-Hellman and Bitcoin’s 256bit 'n' value

| **Alice’s private key (HEX)**                                    | **Bob’s private key (HEX)**                                      | **Generator point 'g' (HEX)**                                      | **2256 (DECIMAL)**                                                             |
| ---------------------------------------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| fb4bfb5dd0be7093ba8ea643775af1ae05f05be1415da2d2cef997b33be14fff | 6018da4bf909dfff872aff73b5c70e659a89a40f28112cbf4693e93eaffb181c | 0279be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798 | 115792089237316195423570985008687907853269984665640564039457584007913129639936 |

| **Shared secret**                                                                       |
| --------------------------------------------------------------------------------------- |
| (DECIMAL) 24926637309892526281343130463061454239891008796952183712849843310158704356192 |
| **371bfa0c42117a20da6483b2fd2ca5742c1bab39b4fbd3525c45157c33b12b60**                    |
