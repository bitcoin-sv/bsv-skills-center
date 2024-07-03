---
description: Transactions offer huge flexibility in terms of what can be done with them.
---

# Transaction Templates

Transactions can be formatted in specific ways and/or use specific values to create transaction templates.

The following are useful constituent parts of transactions that can be used to construct transaction templates:

* **Version field:** A 4-byte field that can be used to denote a version or template.
* **Script:** A programming language which allows custom logic to be added to locking scripts.
* **Hashing and elliptic curve properties:** Keys and hashes can be combined or augmented such as with Type42 (provide link) key derivation trees
* **nLockTime and nSequence:** Allow payment channels, negotiations, and time locks.
* **Sighash flags:** Allow certain parts of a transaction to be signed while keeping other parts unsigned so they can be updated without invalidating the transactio (find out more here) (link to sighash flags).

## Transaction Template example : Pay-to-Public-Key-Hash (P2PKH)

"Pay-to-Public Key Hash" (P2PKH) is the most widely used template.

To provide some insight into what the script looks like, below is the unlocking and locking script of a P2PKH script:

<pre data-overflow="wrap"><code><strong>Previous Transaction Output
</strong>Locking Script - OP_DUP OP_HASH160 &#x3C;Public Key Hash> OP_EQUALVERIFY OP_CHECKSIG

Current Transaction Input
Unlocking Script - &#x3C;Signature> &#x3C;Public Key>

&#x3C;Signature>, &#x3C;Public Key>, &#x3C;Public Key Hash> are operands and the remaining are opcodes
Note: The opcode OP_CHECKSIG performs a digital signature verification
</code></pre>

When Alice transfers the fund to Bob, she will construct the script that will create the script shown above as the _Current Transaction Input_ which along with the _Previous Transaction Output_ becomes the full script that goes as input to the script engine and its execution is shown in the animation below.

<figure><img src="../../../.gitbook/assets/TransactionLifecycle_Slide06.gif" alt=""><figcaption></figcaption></figure>

As shown first, the operands, Alice’s signature and the public key to which the funds were locked (present in the current transaction’s input) will be put on a stack.

Then the OP\_DUP opcode is processed, which will duplicate the top item on the stack, the public key of Alice.

The next opcode is OP\_HASH160 which, when applied to the public key, produces a 160 bits hash value of the public key. It is the same value the funds would have been locked to in the previous transaction, as shown as the next operand put on the stack.

When OP\_EQUALVERIFY opcode is processed, it will take the top two items, both in this case, public key hash, and compare them; if they are equal, they are removed from the stack.

The last opcode is OP\_CHECKSIG which performs a signature verification (explained in detail in the Cryptography section) and if the signature is valid, the result, true is returned as the final output of the script execution.

Another slightly different variation of this is a P2PK or pay to public key where in place of hash the public key is used as is.

{% hint style="info" %}
The pubKeyHash in the Locking script is the public key hashed twice: first with SHA-256 and then with RIPEMD-160. A Bitcoin address is actually a pubKeyHash prepended by a version byte number and encoded in Base58Check format. In other words, we can consider a Bitcoin address is a compact representation of a public key hash puzzle.
{% endhint %}

### Transaction Template example : Multi-Signature Transactions

Also knowns as P2MS - Pay to Multi Sig transactions.

A typical transaction input requires one private key (i.e., one signature) to spend it. However, it is possible to lock coins with a requirement that more than one signature must be provided before the coins can be spent. Script offers OP\_CHECKMULTISIG opcode to implements a scenario where m private keys out of a possible n (m <= n) are required to move the coins. Transaction outputs with OP\_CHECKMULTISIG are usually denoted as Pay-to-Multi-Signature or P2MS.

For example:

Locking Script: OP\_3 \<pubKey1> \<pubKey2> \<pubKey3> \<pubKey4> \<pubKey5> OP\_5 OP\_CHECKMULTISIG

Unlocking Script: OP\_1 \<sig1> \<sig2> \<sig4>

In the above example, the scriptPubKey says that 3 out of 5 possible signatures are needed to spend the coins. The 3 signatures in the scriptSig must be placed using the same order in which the public keys are arrayed in the scriptPubKey. Note that there is an additional value OP\_1 at the beginning of the scriptSig. This value won't be evaluated (therefore, any piece of data can be used here). It is there to “fix” a bug in the current implementation of the scripting engine where OP\_CHECKMULTISIG removes not only the required parameters but also an extra unnecessary value off the stack.
