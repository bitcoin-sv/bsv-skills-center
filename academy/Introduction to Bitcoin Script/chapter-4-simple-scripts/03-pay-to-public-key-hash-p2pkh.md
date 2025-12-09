# 03 - Pay to Public Key Hash (P2PKH)

Pay to Public Key Hash (P2PKH) is the most widely used locking script on the blockchain today. It combines the security of elliptic curve signatures with a hash function. The major benefit over the use of a P2PK script is that the user's public key is kept private from the network until the output is spent, providing an additional layer of cryptographic security for the user. The major benefit over the use of a Pay to Hash output is the use of Elliptic curve signatures, which are more secure than hash functions alone.

A pay to public key hash script is defined as follows:

`OP_DUP OP_HASH160 <public_key_hash> OP_EQUALVERIFY OP_CHECKSIG`

To spend an output that is locked with a P2PKH script, the following solution is provided:

`<signature> <public_key>`

The validation engine will evaluate the full script as follows:

`<signature> <public_key> OP_DUP OP_HASH160 <public_key_hash> OP_EQUALVERIFY OP_CHECKSIG`

A breakdown of the script evaluation process is shown below:

<table><thead><tr><th width="208.33333333333331">Stack</th><th width="286">Script</th><th>Description</th></tr></thead><tbody><tr><td>Empty.</td><td><p>&#x3C;sig> &#x3C;pubKey> | |</p><p>OP_DUP OP_HASH160 &#x3C;pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG</p></td><td>scriptSig and scriptPubKey are combined.</td></tr><tr><td>&#x3C;sig> &#x3C;pubKey></td><td>OP_DUP OP_HASH160 &#x3C;pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG</td><td>Signature and public key are added to the stack</td></tr><tr><td>&#x3C;sig> &#x3C;pubKey> &#x3C;pubKey></td><td>OP_HASH160 &#x3C;pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG</td><td>Public key is duplicated.</td></tr><tr><td>&#x3C;sig> &#x3C;pubKey> &#x3C;pubKeyHash></td><td>&#x3C;pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG</td><td>Duplication of public key is hashed.</td></tr><tr><td>&#x3C;sig> &#x3C;pubKey> &#x3C;pubKeyHash> &#x3C;pubKeyHash></td><td>OP_EQUALVERIFY OP_CHECKSIG</td><td>Expected public key hash is added to the stack</td></tr><tr><td>&#x3C;sig> &#x3C;pubKey></td><td>OP_CHECKSIG</td><td>Equality is checked between the script generated public key hash and expected public key hash.</td></tr><tr><td>true</td><td>Empty.</td><td>The signature is checked against the public key</td></tr></tbody></table>

<figure><img src="../../../.gitbook/assets/BSVA-BitcoinScript_Chapter4-Animation03.gif" alt=""><figcaption></figcaption></figure>

As shown above, the signature and public key are both provided by the spending party. The public key is hashed, and the hash is checked against an expected value stored in the output. The check uses OP\_EQUALVERIFY, automatically failing the script if the check is not equal. Once it is established that the public key hashes to the expected value, OP\_CHECKSIG checks the signature and leaves the result of the check on the stack. If the signature is valid, the input can be spent in the transaction.
