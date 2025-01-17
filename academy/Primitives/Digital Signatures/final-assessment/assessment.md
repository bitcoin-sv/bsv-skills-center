# Assessment

1. What is the use of private and public keys in Bitcoin?&#x20;

* [ ] Exchanging a key over the internet for applying a hash to message
* [ ] Serializing and de-serializing the message, respectively
* [ ] Signing the message & verifying the message, respectively&#x20;
* [ ] There is no rationale to generate two distinct keys; parties can use the same key for signing and verification

2. How does signing in the digital signature protocol provides message integrity?&#x20;

* [ ] The knowledge of the private key with the sender of the message provides message integrity
* [ ] Digital signatures do not provide message integrity. We should use a physical signature, instead&#x20;
* [ ] The usage of different private and public keys provides message integrity
* [ ] One input to the signing algorithm is the message, so if the message changes, the output, i.e., digital signature changes

3. For verifying the message, what components are all required?&#x20;

* [ ] Private key and message
* [ ] Hash Function and message
* [ ] Message, signature, and public key
* [ ] Message, signature, and private key

4. A Digital Signature does not provide receiver non-repudiation:

* [ ] True
* [ ] False

5. Elliptic curve cryptography uses scalar multiplication for generating the private keys: &#x20;

* [ ] True
* [ ] False

6. What is the practical implication of the elliptic curve discrete logarithm problem?&#x20;

* [ ] Given a public key, it is straightforward to generate a private key
* [ ] Given the public key, it is computationally very hard to find a private key
* [ ] If d denotes private key, then the public key becomes d\*G, where G is the base point in the ellipse&#x20;
* [ ] If we draw an elliptic curve over real numbers, and we know the location of the generator G, then finding the number of hops to reach public key value is very difficult

7. For ECDSA, if the private key is r and the base point is G, then computation to find public key A is given as:&#x20;

* [ ] A = r \* G-1
* [ ] A = r \* G&#x20;
* [ ] A = r mod G&#x20;
* [ ] A = G-1 mod r

8. In ECDSA, signing of the message is done using:

* [ ] a private key, which is a random positive integer less than the order of the group&#x20;
* [ ] a public key, which is a big integer&#x20;
* [ ] an ephemeral key, which is a random positive integer less than the order of the group&#x20;
* [ ] a public key, which is the point of the elliptic curve

9. In ECDSA, the public key is a positive integer:&#x20;

* [ ] True
* [ ] False

10. The public key and the base point of the elliptic curve in ECDSA are shared publicly:

* [ ] True
* [ ] False

11. Bitcoin can use ECDSA (secp256k1) for:&#x20;

* [ ] Transactions&#x20;
* [ ] Miner identification on BSV network&#x20;
* [ ] Signed Messages
* [ ] All of the above

12. Bitcoin uses a more sophisticated, customized version of ECDSA (secp256k1):

* [ ] True
* [ ] False

13. Bitcoin persists events as transactions, and these events are immutable:

* [ ] True
* [ ] False

14. Alice wants to transfer 50BSV to Bob. What does Alice need to sign the hash of previous transaction inputs with?&#x20;

* [ ] Satoshi&#x20;
* [ ] Public Key
* [ ] Private key&#x20;
* [ ] Name of the payee

15. Transaction output contains unlocking script:

* [ ] True
* [ ] False

16. For most commonly used transaction templates, unlocking script contains two important components of a digital signature. What are those components?(two options are correct, but selecting one is sufficient to score points)

* [ ] Public Key&#x20;
* [ ] Private key
* [ ] Signature&#x20;
* [ ] Satoshi

17. Bitcoin transactions can be standardized as templates:

* [ ] True
* [ ] False

18. To provide privacy and usability to users for transactions, wallets generally implement a feature. What is the feature?

* [ ] Derive many private-public keys from a seed key
* [ ] Generate a random private-public key pair each time a user needs to transfer or receive funds
* [ ] Generate a new key pair from the password provided by the user&#x20;
* [ ] User randomly generate a private key each time for signing a transaction

19. What is the format used by Bitcoin Transactions for signature?&#x20;

* [ ] Signature format - (i,r,s,)
* [ ] \[DER,sighash]&#x20;
* [ ] Signature format - (r,s)&#x20;
* [ ] Hash of message in big-endian format

20. Bitcoin ledger can be used for persisting signatures in isolation without transaction:&#x20;

* [ ] True
* [ ] False

21. &#x20;What benefits does minerID provide in the Bitcoin network?

* [ ] Enhances the network security by associating miner's public key with the block&#x20;
* [ ] Enhances the network performance&#x20;
* [ ] Enhances the network security by associating miner's signature with the block&#x20;
* [ ] There is no benefit to using minerID

22. &#x20;Enterprise application can verify the signature in the transaction before it reaches the node. To do so, a public key is not shared rather a bitcoin address is shared. How is the bitcoin address obtained?&#x20;

* [ ] Double hashing of the private key&#x20;
* [ ] Double hashing of public key&#x20;
* [ ] Double hashing of signature
* [ ] Double hashing of the public key then encoding as base 58 string

23. &#x20;In Bitcoin, what is the data type for the public keys used in transactions?&#x20;

* [ ] A) Big number of 256-bit length&#x20;
* [ ] B) Point on the elliptic curve of length 33 bytes&#x20;
* [ ] C) Point on the elliptic curve of length 65 bytes
* [ ] D) Both B and C\
