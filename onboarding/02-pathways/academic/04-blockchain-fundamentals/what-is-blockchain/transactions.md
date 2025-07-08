# Transactions

In the world of blockchain, transactions are the basic units of activity. They are records that capture the transfer of assets, such as tokens or data, between parties within the network.

## **Transaction Structure**

<figure><img src="../../../.gitbook/assets/image (102).png" alt=""><figcaption></figcaption></figure>

* **Inputs:** Transactions begin with inputs, which are references to previous transactions that prove the sender has the funds available to send.
* **Outputs:** Outputs indicate the recipients and specify how many units of the asset are being transferred. They can also include data payloads and specify conditions under which the funds or data can be transferred, usually expressed as scripts.
* **Digital Signatures:** Each transaction is secured with digital signatures, which serve to verify the identity of the transactors and ensure the integrity of the transactions without the need for a central authority.

## The Role of Digital Signatures

<figure><img src="../../../.gitbook/assets/image (104).png" alt=""><figcaption><p><a href="https://www.zoho.com/workdrive/digest/exploring-digital-signatures.html">https://www.zoho.com/workdrive/digest/exploring-digital-signatures.html</a></p></figcaption></figure>

Digital signatures are at the heart of blockchain transactions. They provide a way to confirm that a transaction has been authorized by the holder of the digital assets.

### **Asymmetric Cryptography:**

* Blockchain uses asymmetric cryptography, also known as public-key cryptography, to create and verify digital signatures.
* Each user has a pair of keys: a public key, which is known to other users and a private key, which is kept secret.
* To send a transaction, a user signs it with their private key. This signature can be verified by others using the corresponding public key, ensuring that the transaction is legitimate.

### **Security Through Cryptography:**

* **One-Way Functions:** Digital signatures utilize cryptographic hash functions, which are designed to be one-way. This means they are easy to compute in one direction but infeasible to reverse, ensuring the security of data.
* **Non-Repudiation:** Once a transaction is signed, the signer cannot deny having sent the transaction, as their unique signature is proof of their involvement.

## Transactions as Atomic Events

<figure><img src="../../../.gitbook/assets/image (105).png" alt=""><figcaption></figcaption></figure>

Blockchain transactions are atomic in nature, which means they either fully occur or not at all. This atomicity ensures that all operations within a transaction are completed without error before being added to the blockchain ledger.

### **Chain of Signatures:**

* Each coin in a blockchain network can be traced back through a chain of digital signatures, each one verifying a transfer of ownership. This chain provides a clear audit trail from the creation of the digital asset to its current owner.

### **Locking and Unlocking Scripts**

<figure><img src="../../../.gitbook/assets/image (106).png" alt=""><figcaption></figcaption></figure>

Outputs from transactions include locking scripts that specify the conditions under which the transaction outputs can be spent. Inputs provide unlocking scripts that satisfy the locking script's conditions, thus allowing the transaction to be processed.

<figure><img src="../../../.gitbook/assets/image (107).png" alt=""><figcaption></figcaption></figure>

Once transactions are created, they need to be verified and sent to the nodes that have the specific function of adding batches of transactions to the blockchain in a data structure known as a block.

## **Hashing and Transaction Integrity:**

* Transactions are hashed using algorithms like SHA-256, creating a unique fingerprint for each transaction. This hash is used to verify the integrity and uniqueness of the transaction.
* **Merkle Trees:** Transactions are organized into blocks and hashed into a Merkle tree. The root of this tree, along with the block’s header and other relevant information, is then broadcast to the network.

## **Consensus Mechanisms:**

* To be added to the blockchain, a transaction must be verified by consensus mechanisms such as Proof of Work (PoW) or Proof of Stake (PoS). These mechanisms validate the transaction and its place in the blockchain, ensuring that all nodes in the network agree on the current state of the ledger.

## Conclusion

Understanding blockchain transactions and digital signatures is crucial for appreciating how blockchain achieves security, transparency, and integrity without central oversight. By enabling direct peer-to-peer interactions secured by cryptographic principles, blockchain technology redefines what is possible in digital transactions and data integrity.

\
