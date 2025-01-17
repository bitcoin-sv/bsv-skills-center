# Numeric Value Size Rule

For a byte sequence to validly represent a numeric value, the length of the byte sequence must be less than or equal to 750,000 bytes. A byte sequence that is larger than this is a valid byte sequence but is not a valid numeric value.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 16.gif" alt=""><figcaption></figcaption></figure>

Note that while some operations require parameters to be valid numeric values, they may produce byte sequences which are not valid numeric values (for example, OP\_MUL may produce a byte sequence which is too large to validly represent a numeric value).
