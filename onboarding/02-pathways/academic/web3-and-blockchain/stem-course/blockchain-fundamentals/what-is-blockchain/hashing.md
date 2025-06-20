# Hashing

<figure><img src="../../../.gitbook/assets/image (113).png" alt=""><figcaption></figcaption></figure>

Hashing is a fundamental concept in computer science and cryptography, widely used in blockchain technology to ensure data integrity and security. A hash function is a mathematical algorithm that transforms any arbitrary amount of data into a fixed-length "fingerprint" or hash value. This transformation is one-way, meaning that it is computationally infeasible to reverse the process or to find the original input from its hash output.

### **Characteristics of Hash Functions**

* **Deterministic:** The same input will always produce the same output.
* **Fast Computation:** Hash functions are quick to compute, which is crucial for processing large volumes of data efficiently.
* **Pre-image Resistance:** It is infeasible to reverse a hash function to find the original input.
* **Small Changes Lead to Big Differences:** Even a minor change in input data drastically changes the output hash.
* **Collision Resistance:** It is extremely unlikely for two different inputs to produce the same output hash.

### **SHA-256 and Blockchain**

<figure><img src="../../../.gitbook/assets/image (112).png" alt=""><figcaption></figcaption></figure>

* **SHA-256:** This is a specific hash function used in many blockchain applications. It generates a 256-bit hash and is known for its high level of security. Given the vast number of possible outputs (approximately $$1.17×10^ {77}$$), it is practically impossible for two different inputs to yield the same hash value.

### **Blockchain and Transaction Integrity**

<figure><img src="../../../.gitbook/assets/Screenshot 2024-05-10 at 7.15.30 PM.png" alt=""><figcaption></figcaption></figure>

* **Transaction Hashing:** In blockchain, each transaction data is hashed using SHA-256 or similar cryptographic hash functions. This hash acts as a digital fingerprint, uniquely identifying the transaction.
* **Signature and Verification:** Each transaction hash is then signed with the sender’s private key, creating a digital signature that ensures the transaction is not tampered with and can be verified using the sender’s public key.
* **Broadcast and Collection:** Users broadcast their transactions, including the raw data and its digital fingerprint, to the network. Processing nodes collect these transactions, verifying them through their hashes and signatures.

## **Organizing Transactions in Blockchain**

<figure><img src="../../../.gitbook/assets/image (114).png" alt=""><figcaption></figcaption></figure>

Transactions are ordered in a data structure called a Merkle Tree that preserves the order they were first seen, relative to one another. This structure includes a summary hash (Merkle Root) that serves as a fingerprint for the entire dataset and its order.

* **Block Header and Mining:**
  * **Block Header:** This includes several fields such as the version, the previous block hash, the Merkle root (a hash of all the hashes of all the transactions in the block), a timestamp, the difficulty target, and a nonce.
  * **Mining Process:** Miners compete to find a hash for the block header that meets the network’s difficulty target, a task requiring extensive computational resources (hundreds of trillions of guesses or more) but easily verifiable by other nodes once a valid hash is found.
  * The total number of possible output from the hashing of the block header is approximately $$1.17×10^ {77}$$). We can imagine a list of all the possible numbers starting from zero. Most random hash outputs will be somewhere around the middle number. If we say the hash has to be a really really small one of those numbers it will take many attempts until we find one. That is the difficulty of the proof of work challenge.
  * That it why block hashes in bitcoin always start with a leading number of zero bits, because having many zero bits at the beginning, means it is a very small number relative to the majority of numbers that would randomly be generated in that 256 bit space.
