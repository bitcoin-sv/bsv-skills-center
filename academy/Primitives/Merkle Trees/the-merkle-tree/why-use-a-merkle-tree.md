# Why Use a Merkle Tree?



![](https://bitcoinsv.academy/storage/photos/4318/BSVA-MerkleTrees_Ch1Less2_VA4%20updated.jpg)

Due to the deterministic output of hash functions, if a single bit changes anywhere throughout the values or data that constitute any layer of the Merkle tree, every subsequent value closer to the Merkle root on the same side’s branch will be entirely different. As such, Merkle trees are used as an extremely efficient data verification tool since it can be safely assumed that only the exact data entries that were hashed to create the leaf nodes of a Merkle tree in the same specific order, could formulate its specific root.&#x20;

Therefore, we can verify that a data entry exists in Merkle tree by following the sequence of hashes from that data entry's index, up the layers of the tree, until we arrive at the root. For example, to verify the existence of element K in a data set represented by a Merkle root R, we need to know the Merkle path for K, which is the minimum list of node values required to reconstruct R from K. The Merkle path for K includes node values H(L), H(IJ), H(MNOP), H(ABCDEFGH). We first calculate the hash for K and then using the node values in its Merkle path to obtain Merkle root R' which is compared to R. This process is known as a Merkle Proof. Merkle Proofs are efficient as they only require log2(n) hash values to perform the proof. Further, they can be performed without revealing sensitive data (e.g. only hashed values would be required from other data entries to prove our preimage data entry).&#x20;

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-MerkleTrees_Ch1Less2_VA5%20updated.jpg)

Merkle trees are used in various distributed and peer-to-peer systems where data verification is critical. These systems have multiple versions of network data existing in multiple different locations. If all the data objects within these networked systems had to be verified using the objects themselves, this would create an extremely burdensome network throughput. Instead of sending an entire object, the hashing of these objects allows them to be transmitted efficiently as a secure fixed byte length representation.

If network participants wish to know they are operating upon the same data set, they only need to send the Merkle root to verify whether the sets are the same. If the Merkle root is different, they can work downwards from the root through the branch structures to determine where the inconsistency lies.

For example, if they can determine that their values for HABCDEFGH are both the same while they have different values for HIJKLMNOP then the inconsistency obviously lies within the right-hand branch structure and all objects within the left-hand branch are identical and need not be transmitted for examination. The Merkle tree can be traversed downwards to ascertain which data element has been modified.

If, however, there are multiple inconsistencies within the Merkle tree, the process of verification requires more steps to isolate the problematic nodes. In the diagram above it can be seen how if a new element Q replaces L, the Merkle proof fails. \
&#x20;\
Examples of these distributed or peer-to-peer systems that employ Merkle trees as a data verification process are Git, BitTorrent and Bitcoin.
