# Data Types

All data items in Bitcoin Script are a byte sequence. Some operations interpret their parameters as numeric or boolean values and require the item to fulfil the specifications of those types. Some operations produce items on the stack which are valid numeric or boolean values.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 11.gif" alt=""><figcaption></figcaption></figure>

A byte sequence has a length and a value. The length of the byte sequence must be an integer greater or equal to zero and less than or equal to $$2^{32-1}$$(UINT32\_MAX).

The byte sequence of length zero is called the “null value”.

Any data item can be interpreted as a boolean value. If the data item consists entirely of bytes with value zero, or the data item is the null value, then the boolean value of the item is **false**. Otherwise, the boolean value of the item is **true**.

A data item can be interpreted as a numeric value. The numeric value is encoded in a byte sequence using little-endian notation. When script items are processed using opcodes that perform mathematical functions, the node will treat any byte sequence of up to 7500 bytes long as a numeric value, allowing for 'bignum' calculations to be performed in script.
