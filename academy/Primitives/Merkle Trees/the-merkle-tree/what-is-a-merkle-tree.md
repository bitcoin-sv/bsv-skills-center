# What is a Merkle Tree?

### What is a Merkle Tree?

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-MerkleTrees_Ch1Less1_VA1%20updated.jpg)

A Merkle tree is a data structure that leverages the properties of hash functions to create an efficient process for verifying the inclusion of a single data element within a large set of data. Hash functions are used to convert any type of digital input data, from strings to files, into a unique, fixed length, digital fingerprint.&#x20;

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-MerkleTrees_Ch1Less1_VA2%20updated.jpg)

Modern cryptographic hash functions (such as SHA-256) have three main properties:

1. Pre-Image Resistance (One Way) - computationally infeasible to calculate the input given the hashed output.&#x20;
2. Second Pre-Image Resistance (Deterministic) - each function always produces the same unique output for the same input.&#x20;
3. Collision resistance - an extremely small probability of producing the same output from two distinct inputs. This is typically referred to as a collision and the probability of it occurring in SHA-256 is approximately 4.3 x 10-60.&#x20;

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-MerkleTrees_Ch1Less1_VA3%20updated.jpg)

Merkle trees are formed from multiple data elements (A-P) by first putting each element through a hash function to generate the leaf nodes (HA - HP) at the bottom of the Merkle tree. To generate the upper layers of the tree back to the root node, these leaf node values are then concatenated together as ordered pairs and hashed to form another fixed length string on the next layer up of the tree toward the single root value (top of the image above illustrated as H(HA-H || HI-P). Each leaf node consists of a hashed data entry, so n data entries would result in n leaf nodes. As we move up the tree layers, we combine ordered interior node values together by hashing the concatenation of the two individual values provided at the previous layer.&#x20;

By convention, the bottom, leaf, layer of the Merkle tree is referred to as layer 0 with the layers above being numbered naturally to the root of the tree.&#x20;

As (for any layer) Merkle trees must have an even number of values to pair, when a dataset has an uneven number of entries to begin with or where a layer reveals an odd number of values to be paired, the last value (widow) is repeated, concatenated with itself and hashed to become paired with another node value at a higher layer of the Merkle tree.&#x20;

In this respect, the 16-leaf tree above has 8 nodes on layer 1, whereas a 17-leaf tree will have 9 layer 1 nodes with the ninth being HQQ. We can say that in a Merkle tree with _n_ leaf nodes, if _n_/2 does not equal an integer, then the number of layer 1 nodes will be the next integer after _n_/2. This is the case for any layer of the tree. Another layer of the Merkle tree is required after every 2x entries are included, where a tree for 4 values will have 3 layers, 8 having 4 layers, 16 having 5 layers, and so on and so forth.
