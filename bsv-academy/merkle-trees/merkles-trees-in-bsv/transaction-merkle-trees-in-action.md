# Transaction Merkle Trees in Action

{% embed url="https://youtu.be/wiM6TPlTq9s" %}

The video above demonstrates the process of the serialised strings of raw data from a bitcoin transaction being converted through two applications of the SHA256 function to a 32-byte value for the leaf nodes of a Merkle tree.

If you are experimenting with generating TXIDs from raw transaction data, it is important to be aware that the most online hash functions will likely interpret an input as ASCII keyboard characters rather than hexadecimal. The implementation that you are using will need to either transform the hexadecimal into decimal or binary string or otherwise specify that the input data is in hexadecimal format. The hash value generated after the application of these functions is displayed in a reversed order of their hexadecimal byte sequence (known as Little Endian), so this is something to be aware of if the value you have calculated in your own experimentation with hashing doesn't match that displayed in a block explorer. 

It may appear superfluous to conduct two applications of the SHA256 function upon the strings of raw transaction data but by creating the first hash of the strings, these values can be passed off to other entities in a much more efficient manner in order to create a division of labour in specialised mining operations.

![](<../../../academy/Primitives/Merkle Trees/.gitbook/assets/BSVA-MerkleTrees_Ch2Less3_VA5 (1).gif>)

The animation above shows the process of the serialised strings of raw transaction data being transformed into the TXID's through two applications of the SHA256 function and the reversing of the byte sequence of the second hash value to convert it to Big Endian format. Notice how the 32-byte value is displayed as 64 characters in hexadecimal. Or, in other words how two hexadecimal characters represent one byte of data. In order to reverse the byte sequence, pairs of hexadecimal characters are moved from the back to the front in order.

![](https://bitcoinsv.academy/storage/photos/8381/BSVA-MerkleTrees_Ch2Less3_VA6.jpg)

Now see four leaf nodes calculated from the raw transaction data using the double application of the SHA256 function on the string. This is essentially the same process as we saw in chapter 1, except the concatenated string of ordered pairs of leaf node values are hashed twice to generate the interior node values. The Merkle root is then calculated via the same process being performed on the two interior node values and displayed in little endian.

![](<../../../academy/Primitives/Merkle Trees/.gitbook/assets/BSVA-MerkleTrees_Ch2Less3_VA7.gif>)

The above animation shows the TXID of a fifth transaction being appended to the Merkle tree data structure and the Merkle root being calculated anew. Although this visualisation is only showing how a 5th transaction is appended to a Merkle tree with four leaf nodes, this same process will occur after every $$2^n$$ data elements are put into the data structure. It can be seen how the leaf and interior node values of the left-hand side remain unchanged and this $$2^n$$ + 1 necessitates another layer emerge in the data structure as the new Merkle root. The right side fills out and balances the structure of the Merkle tree until the tree is composed of $$2^m$$ values and a new dynamic free edge for the $$2^ m$$ +1 value is appended, while the substructure of the $$2^m$$ is preserved.
