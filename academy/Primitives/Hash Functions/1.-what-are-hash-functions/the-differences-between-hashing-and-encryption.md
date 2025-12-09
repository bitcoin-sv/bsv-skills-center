# The Differences Between Hashing and Encryption

![](../../../../.gitbook/assets/BSVA-HashFunctions_Ch1L2_DA1.gif)

Since hash functions are a type of cryptographic primitive -- i.e., some of the building blocks used to encrypt messages and data -- the concepts of hashing and encryption are often conflated. However, they are not the same. The three main differences between hashing and encryption are as follows:

1. **Hash functions don't care about data loss:**\
   \
   A hash function produces a fixed-length output in clear text because it’s nothing more than a unique digital fingerprint and data loss is not a concern. In contrast, encryption encodes and preserves input messages.\\
2. **Hash functions are not reversible:**\
   \
   A hash function is a one-way function that does not need to be reversed. In fact, it's important it's not reversible. In contrast, it's crucial the intended recipient of an encrypted message is able to reverse the encryption process in order to decrypt the message so they can read it.\\
3. **Hash functions have a collision risk:**\
   \
   A hash function has a collision risk. Due to the fixed length of message digests, it's possible for two different input values to produce the same digest. BSV uses hash functions like SHA-256 and RIPEMD-160 because they greatly reduce the risk of collisions, yet, although they're probabilistically insignificant, they can still theoretically happen.\
   \
   In contrast, since encryption preserves 100% of the input message, each encrypted message produces a unique output so there's no collision risk.
