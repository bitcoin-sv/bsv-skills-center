# Simple and Composite Proofs

####

The BSV Unified Merkle Path (BUMP) format changes the way composite proofs are constructed and interpreted within the BSV ecosystem. By enabling the consolidation of multiple transaction verifications into a singular, coherent format, BUMP significantly enhances data efficiency and minimizes redundancy across the network.

#### **Efficiency Through Consolidation**

In recognizing the commonality of hash node duplication across closely situated transactions within a block, BUMP introduces a methodical approach to composite proofs:

* **Consolidated Layers**: BUMP facilitates the inclusion of essential branches and leaves, streamlining the proof structure by integrating the base layer of a Merkle sub-tree with its connection to the block's overall Merkle root.
* **Optimized Data Structure**: Designed to normalize duplicate data, BUMP presents a compact and efficient solution for representing composite proofs, thereby reducing the overall data footprint.

#### **Example of a BUMP Composite Proof in JSON Format**

Here is a practical JSON encoding example demonstrating the BUMP format's approach to composite proofs:

```
{
  "blockHeight": 813706,
  "paths": [
    {
      "txId": "txid1",
      "merklePath": [
        {"offset": 0, "hash": "hash1", "flags": 2},
        {"offset": 1, "hash": "siblingHash1", "flags": 0},
        {"offset": 3, "hash": "parentHash1", "flags": 0}
      ]
    },
    {
      "txId": "txid2",
      "merklePath": [
        {"offset": 2, "hash": "hash2", "flags": 2},
        {"offset": 3, "hash": "parentHash1", "flags": 1} // Utilizing a duplicate hash
      ]
    }
  ]
}
```

\
This example illustrates how BUMP efficiently handles composite proofs, leveraging shared nodes to optimize data representation and minimize redundancy.

#### **Handling Composite Proofs in BUMP**

BUMP streamlines both the creation and validation processes for composite proofs:

* **Simplified Validation**: Despite the inherent complexity of composite proofs, BUMP's architectural design ensures ease of parsing and validation, accommodating the verification process's intricacies with structured simplicity.
* **Adaptable to Common Use Cases**: While designed to support complex composite proofs, BUMP maintains its utility and applicability for simpler, single-proof verifications, ensuring wide-ranging applicability within the BSV ecosystem.

#### **Practical Implications**

The methodical approach to composite proofs within the BUMP format offers several key advantages:

* **Network Efficiency**: The optimization of data representation contributes significantly to the overall efficiency of the BSV network, enabling quicker verification times and reduced bandwidth demands.
* **Future-Proofing**: BUMP's adaptable structure is poised to support ongoing advancements in blockchain technology and proof consolidation, ensuring its continued relevance and utility.
