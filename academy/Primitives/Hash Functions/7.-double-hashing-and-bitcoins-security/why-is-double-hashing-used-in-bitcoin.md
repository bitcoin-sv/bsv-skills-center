# Why is Double Hashing Used in Bitcoin

![](../.gitbook/assets/BSVA-HashFunctions_Ch7L1_DA1.gif)

When it was released in 2009, the initial Bitcoin code base had many features which at first glance didn't make a lot of sense. Over time, the intention behind these features has slowly come to light. One of these features is the usage of double hash functions as opposed to single hash functions throughout the Bitcoin system. Instead of simply using a single hash function like SHA-256 or RIPEMD-160, Bitcoin uses double hash functions: HASH-256 and HASH-160.

Up until recently, it was largely accepted that the intention behind using double hash functions in Bitcoin was to add additional security against **birthday attacks**. However, we now know this isn't true.

Since the use of double hash functions actually increases the probability of finding a collision as opposed to only using one, using double hash functions is less secure than using a single hash function. And it's even worse if the same hash function is used twice like HASH-256.&#x20;

Put in a very simplified way, every time a hash function is hashed again by another hash function, it more or less doubles the likelihood of a collision.

## What is the True Intent Behind Double Hashing in Bitcoin?

Bitcoin uses double hash functions to facilitate a **separation of concerns** within the Bitcoin system and add usability and extensibility.

This separation of concerns allows for modularity and flexibility within the Bitcoin system. For example, in the proof-of-work process, instead of nodes being self-contained units with the full responsibility of block construction, hashing, and verification, these three functions can be split up, and businesses that specialize in any one of them can form to address them.

In other words, a company that specializes in hashing which has a competitive advantage due to their geographic location and access to cheap power can build a large hashing facility that caters to multiple Bitcoin nodes. Since a hash value is a digital fingerprint, and Bitcoin uses double hash functions, these entities don't need all the transaction information received by the nodes, and can instead communicate through partial hash values of the double hash functions. This can be further refined by using a separate verification facility which the hashing facility can send its results to for verification. Once verified, the hashing facility can return its verified result to the node which can then distribute their found block to the rest of the nodes on the network.

For example, since A == Hash(X) and B == Hash(A), a node can send a hashing facility the Hash(A) and the hashing facility does not need to know what X is to find B.

This would allow Bitcoin nodes to focus their resources on network (and possibly storage) infrastructure rather than having a large part of their operating costs be eaten up by hashing.

Further, the separation of concerns facilitated by double hash functions also enables data filtering. Local jurisdictions can set up downstream working blockchains which use the same double hashing concept of to check Hash(B) values against an internal black list and filter out any known nefarious or unwanted data before receiving it. This type of pattern is very useful in a wide variety of contexts including the **witness protection problem**.

In Summary, double hash functions allow for a separation of concerns within the Bitcoin system which aids in its robustness, extensibility, and security.
