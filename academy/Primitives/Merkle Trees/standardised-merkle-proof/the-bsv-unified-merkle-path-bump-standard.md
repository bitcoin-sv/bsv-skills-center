# The BSV Unified Merkle Path (BUMP) Standard

#### **Overview**

The BSV Unified Merkle Path (BUMP) format enhances the Simplified Payment Verification (SPV) model critical for scaling BSV. It standardizes the way Merkle proofs are constructed and interpreted across the ecosystem, ensuring consistency and efficiency in transaction verification.

#### **Importance of BUMP in SPV**

BUMP is integral to SPV wallets, facilitating the verification of transactions without necessitating the download of entire blocks. By adopting a unified format, BUMP simplifies the interaction between wallets, miners, and other network participants, streamlining the verification process.

#### **BUMP Data Structure Components**

BUMP introduces a structured format that includes:

* **Block Height**: Indicates the specific block containing the transaction.
* **Tree Height**: Represents the depth of the Merkle tree.
* **Leaves**: Transactions within the block, identified by their transaction IDs (TxIds).

#### **Encoding Methods**

BUMP utilizes binary and JSON encodings to accommodate various use cases:

* **Binary Encoding**: Offers efficiency and compactness, ideal for processing by machines.
* **JSON Encoding**: Enhances readability for developers, facilitating easier integration and debugging.

#### **Demonstrating BUMP with Data Structures**

**JSON Example**

```
{
  "blockHeight": 813706,
  "path": [
    [
      {
        "offset": 3048,
        "hash": "304e737fdfcb017a1a322e78b067ecebb5e07b44f0a36ed1f01264d2014f7711",
        "txid": true
      },
      {
        "offset": 3051,
        "duplicate": true
      }
    ],
    [
      {
        "offset": 1524,
        "hash": "811ae75c80fecd27efff5ef272c2adf7edb6e535447f27a4087d23724f397106"
      }
    ]
  ]
}
```

&#x20;

This JSON structure outlines a BUMP example, indicating the block height and a simplified path through the Merkle tree. The `txid` flag signifies relevant transaction IDs, while `duplicate` denotes where hash duplication occurs for path completion.

_**Calculating the Merkle Root**_

The calculation involves traversing the provided path, combining the hashes according to their offsets, and applying the duplication or combination as specified by the BUMP structure. The process is designed to be straightforward, ensuring that SPV wallets can efficiently verify transaction inclusion.

#### **Practical Implications of BUMP**

For BSV users, BUMP facilitates faster and more reliable transaction verification. Developers benefit from a standardized proof format, making application development more straightforward and enhancing the scalability of BSV applications.

#### **Conclusion**

BUMP represents a significant step forward in the practical implementation of the SPV model within BSV. It exemplifies the network's commitment to innovation, focusing on scalability, efficiency, and user experience.

For a comprehensive understanding and technical specifications of the BUMP standard, the BRC-74 document on GitHub serves as an essential resource for developers and enthusiasts alike.

[Explore BRC-74 on GitHub for more details](https://github.com/bitcoin-sv/BRCs/blob/master/transactions/0074.md#abstract)\
\
Try out the [BUMP explorer](https://bitcoin-sv.github.io/showcase-merkle-paths/) to visualise the paths for different size Merkle Trees.&#x20;
