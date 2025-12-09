# Merkle Trees in Action

![](<../../../../.gitbook/assets/BSVA-MerkleTrees_Ch1Less3_VA6 (1).gif>)

In the above animation we can see how the 8 different strings of various lengths are put through the SHA256 hash function to generate the identical length values for the leaf nodes of a Merkle tree for the n=8 data set. It can also be seen how even the subtle difference of a capitalised letter, or a single punctuation mark will result in an entirely different output when that string is put through the hash function. With only 8 strings being hashed, it is not really possible to understand the extremely low likelihood of collisions, but with the 256-bit output there is less than 8 chances in a million-million-millions of a collision. We can also see how any attempt to insert a modified string to replace an element in this data set would create an entirely different output for the modified string.

![](../../../../.gitbook/assets/BSVA-MerkleTrees_Ch1Less3_VA7.gif)

With the above animation, we can clearly see how the Merkle tree is constructed from the original 8 strings and how the entirety of the dataset can be represented securely via the single hash output that constitutes the Merkle root. We can also see how the order in which the leaves or interior node values were concatenated will determine the unique output of that string after having been put through the hash function. 1-2 will yield an entirely different output than 2-1.

Now watch in the animation below as a ninth data element is added to the set and appended to the Merkle tree:

![](../../../../.gitbook/assets/BSVA-MerkleTrees_Ch1Less3_VA8.gif)

As this ninth element creates an uneven value for n in the data set, observe how this leaf node is handled to generate the new interior node values and how the existing interior node values from the original 8 do not change. The right-hand branch node value of the third layer is to be concatenated with the former Merkle root (now the left-hand branch value) to generate a fresh Merkle root on a new 4th layer of the tree.

![](../../../../.gitbook/assets/BSVA-MerkleTrees_Ch1Less3_VA9.gif)

If we add a 10th element, the first layer of leaves will be even, but the second layer will have 5 child nodes, with 4 the same as the 8 and 9 transaction data set but the fifth child will have a different value than the 9-transaction set.

Once the data set gets to 16, we would see two balanced branches of transactions and a 17th would turn the Merkle root of the former set to the left-hand branch value for the latter.

![](../../../../.gitbook/assets/BSVA-MerkleTrees_Ch1Less3_VA10.gif)
