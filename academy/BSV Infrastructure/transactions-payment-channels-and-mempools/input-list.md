# Input List

[https://player.vimeo. com/video/674765371](https://player.vimeo.com/video/674765371)



The next part of a transaction message is a list of inputs. Each input is a structured data item which includes the following information:

1. Previous transaction hash - The TxID of the transaction that contains the previous output being spent as an input, given as a 32-byte little-endian value.
2. Previous output index (Previous Txout-index) - “The output index of the previous output, given as a 4-byte little-endian value that represents an unsigned integer. Using this combination of the previous output index and the previous transaction hash, the node can uniquely determine the previous output being spent by this input.
3. Input script length (TxIn-script length) - The length of the input script in bytes, given as a 1-9 byte VarInt. This is the length of the entire serialised input script.
4. Input script (TxIn-Script) - The serialised input script. This is often also referred to as a scriptSig, which must satisfy the conditions of the locking script of the previous output being spent.
5. Sequence number (nSequence) - A sequence number used to indicate whether an input is considered ‘finalised’, given as a 4-byte little-endian value. Sequence numbers are used in conjunction with the transaction lock time (nLockTime) to iterate inputs inside of a payment channel. Inside of a payment channel (see page 11) nSequence is considered final when its value is 0xFFFFFFFF i.e. the maximum value of a 4-byte field, often referred to as “UINT\_MAX”.

[https://player.vimeo. com/video/650024318](https://player.vimeo.com/video/650024318?h=3ef44b34f5\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)
