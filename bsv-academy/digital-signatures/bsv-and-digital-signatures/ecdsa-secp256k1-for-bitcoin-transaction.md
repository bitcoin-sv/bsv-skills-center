# ECDSA (secp256k1) for BSV Transaction

As we now have a high-level conceptual understanding of BSV transactions, we will now look at the specifics of key generation, signing and verification in BSV. It is critical to note that the inner workings of the Elliptic Curve Digital Signing Algorithm(secp256k1) remain the same. However, there are some subtle differences to be aware of.

### Private/Public Key Generation

Recall that the first step of the Digital Signing protocol is generating the public and private keys. The equation below gives the relationship between private and public keys, and the same applies to BSV.

> $$Public \ key = Private \ key * Base \ Point$$ **;** ---------------------(1)
>
> * The private key is an integer
> * The base point is element on the curve to which when group operation is applied repeatedly. It generates all the other elements of the cyclic group. In this case, the elements are points on the curve
> * A public key is one such point on curve and has an $$x$$ and $$y$$ co-ordinate

_While we explain the generation of private-public keys from a consumer/end-user perspective, when building enterprise applications, organizations may choose to implement this functionality by themselves depending on their use case._

_GIF_

Users have wallets; wallets generate "Private Keys".

A private key is a 256-bit random big number. Generally, a private key is not used in the raw format but encoded into a standardized format known as WIF (Wallet Import Format).

Once a private key is generated, the public key is derived using the above equation (1). A public key is a point on the curve, and it is either 33 bytes or 65 bytes. If it's 33 bytes, the public key is compressed and 65 bytes if uncompressed. In practice, a public key is used in a compressed form where the first byte indicates if the y-coordinate is odd or even, and the remaining 32 bytes are the value of the x-coordinate. In the uncompressed format, the first byte indicates that the public key is uncompressed, the next 32 bytes are the value of x-coordinate, and the remaining 32 bytes represent y-coordinate.

Furthermore, wallets adopt two best practices, which we need to be aware of to understand private/public keys in BSV completely. These practices focus on security, privacy, and usability.

1. **Security and Privacy** - Wallets ought to generate a new private-public key pair for each new transaction. If the same key pair is used for every transaction, there are two drawbacks. Firstly, exposure of one private key exposes all transactions all transactions which can be unlocked with that key. Secondly, if the same public key is used for all the transactions, then the ownership of funds becomes easily traceable using analytics and monitoring tools. Therefore, to provide users privacy and security against specific attacks, wallets incorporated generating a new key pair for every transaction.
2. **Usability** - While the above implementation provides security and privacy; it also creates some issues with usability. As each new use of a public key means there will be a new private key, users will need to back up the wallet after each transaction in which they receive funds. This usability issue precipitated the improvement known as "Hierarchical Deterministic key" (HD keys). With this approach, all other key pairs are derived in a hierarchy, with the parent being the seed key. This solution keeps the privacy and security aspects intact and requires the user to only have to back up the seed key. Furthermore, to enhance usability of backing up the seed key (which is a very long random string of digits), the key pair hierarchy is derived from a bag of words, which is easier to remember and manage than the long he&#x78;_&#x61;_&#x64;ecimal string.

### Message Signing and Verification

It is critical to understand that digital signatures in BSV are always encapsulated within a transaction. Expressly, the application of digital signatures, i.e., signature and verification, are instructed by the script in transactions.

There is a field within the data structure of the transaction inputs which is "Txin-script / scriptSig," and similarly, the transaction outputs have a field "Txout-script / scriptPubKey." These fields are used for providing unlocking and locking scripts for funds, respectively.

Though there are no protocol restrictions, currently, most BSV transactions use a standardized template. The standardized template governs the value for "Txin-script / scriptSig" and "Txout-script / scriptPubKey." For a beginner level of know-how, the below-generalized understanding would suffice.

* "Txin-script / scriptSig" contains the signature and corresponding public key
* "Txout-script / scriptPubKey" includes a public key or "public key hash". Public key hash is the public key double-hashed by SHA-256 first, then RIPEMD-160 secondly.
* BSV transactions are committed using the Distinguished Encoding Rules \[**DER, sighash**] format, which we shall discuss later
* The signature verification is done by combining and comparing the unlocking script and locking script and evaluating whether that yields a true or false result. This has already been covered under Script evaluation.

_Note_ - The above understanding provides an abstraction of how a transaction works in BSV. There may be a requirement to verify the signature against a public key for enterprise applications before the transaction reaches the nodes. The general practice used by applications is to not share a public key but rather a BSV address; which is a public key double hashed as Address = RIPEMD-160(SHA-256$$(K_{pub)}$$) and this output is then encoded as a base58 string of 20 bytes.

### Signature Format

Recall from the ECDSA chapter that signature consists of pair of integers $$(r, s)$$. BSV transactions use a format **\[DER, SIGHASH]**. We shall now elaborate on the DER and SIGHASH parts.

1.  **DER** - Distinguished Encoding Rules (DER) specify digital signatures in binary format and standardized by OpenSSL. In essence it is a way to serialize the signatures for transmission or storage. The format for DER is \[header, length, rheader, rlength, r, sheader, slength, s]

    1. header - A static value 0x30
    2. length - The total length of the rest of the signature (i.e., rheader, rlength, r, sheader, slength, s)
    3. rheader - A static value 0x20
    4. rlength - Length of r, after encoding as a big-endian integer
    5. r - r encoded as a big-endian integer
    6. sheader - A static value 0x20
    7. slength - Length of s, after encoding as a big-endian integer
    8. s - s encoded as a big-endian integer

    _**Note**_ - _big-endian is an encoding format that provides a more human readable array of binary bytes when serializing and storing numbers bigger than 256, i.e., 2^8._\\
2.  **SIGHASH** - The purpose of this flag is to provide flexibility in constructing transactions by specifying which part of the transaction is expected to be signed. SIGHASH is analogous to an enumeration and is set to either of six values provided below. Also, while we generally say transaction inputs or output to be signed, technically, the corresponding unlocking script should have the signature / public key.

    Recall transactions can have multiple inputs and outputs.

    1. SIGHASH\_ALL - sign all the inputs and output of the transaction; value = 0x01
    2. SIGHASH\_NONE - sign all inputs and no outputs; value = 0x02
    3. SIGHASH\_SINGLE - sign all the inputs and outputs with same index; value = 0x03
    4. SIGHASH\_ALL | ANYONECANPAY - sign its own input, and all outputs; value = 0x81.
    5. SIGHASH\_NONE | ANYONECANPAY - sign its own input, and no outputs; value = 0x82
    6. SIGHASH\_SINGLE | ANYONECANPAY - sign its own input and outputs with the same index; value = 0x83

    Generally, most transactions use SIGHASH\_ALL; for beginner level, it is sufficient to know the same.

    \
    &#xNAN;_**Note**_\
    &#xNAN;_-_ _Before signing the transaction input or output, it is hashed using SHA-256._\
    &#xNAN;_- Currently, all the BSV transactions require an additional SIGHASH flag which is SIGHASH\_FORKID, and it adds the value 0x40 to SIGHASH value. So value 0x01 for SIGHASH\_ALL becomes 0x41 and so on._

\
\\
