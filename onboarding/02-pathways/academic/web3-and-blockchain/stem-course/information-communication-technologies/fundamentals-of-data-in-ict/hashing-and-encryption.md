# Hashing and Encryption

{% embed url="https://youtu.be/b4b8ktEV4Bg?si=Bn8rnYj1wqmlIJha" %}

<figure><img src="../../../.gitbook/assets/image (64).png" alt=""><figcaption><p><a href="https://www.ssl2buy.com/wiki/difference-between-hashing-and-encryption">https://www.ssl2buy.com/wiki/difference-between-hashing-and-encryption</a></p></figcaption></figure>

Hashing and encryption are fundamental to ensuring the security and integrity of data in Information Communication Technologies (ICT) and distributed systems like blockchain. While both play crucial roles in data security, they serve different purposes and operate under different principles.

## **What is Hashing?**&#x20;

<figure><img src="../../../.gitbook/assets/Cryptographic_Hash_Function.svg" alt=""><figcaption><p><a href="https://en.wikipedia.org/wiki/Cryptographic_hash_function">https://en.wikipedia.org/wiki/Cryptographic_hash_function</a></p></figcaption></figure>

Hashing is a process that takes input data of any size and produces a fixed-size string of bytes, typically a hash, which appears random. The process is designed to be a one-way function – meaning that once data has been transformed into a hash, it should be infeasible to invert that process and retrieve the original data from the hash alone.

**Key Properties of Hash Functions:**

* **Deterministic:** The same input will always produce the same output, no matter how many times the hash function is run.
* **Fast Computation:** Hash functions are designed to be very fast to compute, allowing for quick processing of large amounts of data.
* **Pre-image Resistance:** It is computationally infeasible to reverse the hash function to find the original input if you only know the hash output.
* **Small Changes Lead to Big Differences:** Even a tiny change in input data drastically changes the output hash, a property known as the avalanche effect.

## **What is Encryption?**&#x20;

<figure><img src="../../../.gitbook/assets/Public_key_encryption_keys.svg" alt=""><figcaption><p>By Johannes Landin - Vectorized version of File:Public_key_encryption_keys.png, CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=95527624</p></figcaption></figure>

Encryption is the process of encoding information in such a way that only authorized parties can access it. Unlike hashing, encryption is designed to be a two-way function. Encrypted data can be converted back into its original form using a decryption key.

**Types of Encryption:**

* **Symmetric Encryption:** Uses the same key for both encryption and decryption. It is fast and suitable for large volumes of data but requires secure key distribution and management.
* **Asymmetric Encryption:** Uses a pair of keys, one for encryption (public key) and one for decryption (private key). This type is fundamental for operations like digital signatures and establishing secure communications over insecure channels.

## Economic Security: Using Large Numbers

Economic security refers to the practice of using computationally intensive operations to secure systems. These operations typically involve very large numbers that are hard to factor or algorithms that are difficult to reverse, creating a form of security that is economically infeasible to break.

**Example:** RSA encryption, a type of asymmetric cryptographic algorithm, uses two large prime numbers to generate public and private keys. The security of RSA lies in the fact that while it is easy to multiply two large numbers, factoring the product into the original primes is computationally expensive and time-consuming.

## Conclusion

Hashing and encryption are critical for protecting data in today’s digital and networked environments. They serve as essential tools for maintaining privacy, ensuring data integrity, and securing communications. Understanding these concepts is foundational for any student entering the field of ICT, distributed systems, or blockchain technology.

\
