# 04 - Signing and Checking the Pre-Image

### Optimal OP\_PUSH\_TX

The following script called 'Optimal OP\_PUSH\_TX' has been developed between a group of companies including nChain and sCrypt for use on the BitcoinSV ledger. It is a heavily optimised OP\_PUSH\_TX script which uses less than 100 bytes of script.

To perform the OP\_PUSH\_TX validation, the pre-image is duplicated and a digital signature created from its hash. The script then checks the signature to validate the pre-image.

The script to perform the `OP_PUSH_TX` validation is as follows:

<table><thead><tr><th width="279.3333333333333">Stack</th><th width="213">Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;tx_preimg></td><td>OP_DUP</td><td>Duplicate the pre-image</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;tx_preimg></td><td>OP_HASH256 (double SHA256 hash</td><td>Double SHA256 hash of pre-image</td></tr><tr><td>&#x3C;tx_preimg> (&#x3C;tx_preimg>)+00</td><td>OP_BIN2NUM</td><td>Re-encode as an optimal integer (strips leading zeroes)</td></tr><tr><td>&#x3C;tx_preimg> optimal_dh(tx_preimg))</td><td>OP_1ADD</td><td>Add 1 to generate the uncertain signature</td></tr><tr><td>&#x3C;tx_preimg> uncertain_length_signature</td><td>0x20</td><td>add 32 to the stack</td></tr><tr><td><p>&#x3C;tx_preimg> uncertain_length_signature</p><p>0x20</p></td><td>OP_NUM2BIN</td><td>Reset length to 32 bytes</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;signature></td><td>3044022079be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f817980220</td><td>Add the DER integer prefix, known R-value and signature length to the stack</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;signature> &#x3C;prefix+r></td><td>OP_SWAP</td><td>Swap into correct order</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;prefix+R> &#x3C;signature></td><td>OP_CAT</td><td>Join prefix and R to signature</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;DER_Signature></td><td>0x41</td><td>Add SIGHASH flag to stack (e.g. <code>SIGHASH_ALL</code>)</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;DER_Signature> 0x41</td><td>OP_CAT</td><td>Finalise signature</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;signature></td><td>02b405d7f0322a89d0f9f3a98e6f938fdc1c969a8d1382a2bf66a71ae74a1e83b0</td><td>Add the pubkey to the stack</td></tr><tr><td>&#x3C;tx_preimg> &#x3C;signature> &#x3C;pubkey></td><td>OP_CHECKSIGVERIFY</td><td>Check the signature is valid</td></tr><tr><td>&#x3C;tx_preimg></td><td>...</td><td>Pre-image has been validated</td></tr></tbody></table>

### What's happening here?

The double hash of the pre-image is created using the `OP_HASH256` opcode. We then use 33 OP\_NUM2BIN to extend it to 33 bytes long to ensure it will be recognised as a positive value. We then add 1 to the big endian value which is the same as adding 2^256 to the value, which is the value of our private key. We then use 0x20 OP\_NUM2BIN to extend the final big-endian signature to exactly 32 bytes.

Following this, the DER sequence of integer identifiers, lengths and the R-value are attached to the beginning.

Finally the SIGHASH flag is added (in this case, SIGHASH\_ALL). See [https://wiki.bitcoinsv.io/index.php/SIGHASH\_flags](https://wiki.bitcoinsv.io/index.php/SIGHASH_flags) for more information on SIGHASH flags.

Once the signature is complete and on the stack, the public key is added.

Now that the full signature and public key are both on the stack OP\_CHECKSIGVERIFY can be used to check that the transaction pre-image was correct and that the values it contains match the parameters of the transaction, thereby completing the OP\_PUSH\_TX operation.

### Accomodating the Low S Rule

Thanks to the nature of Elliptic Curve digital signatures, each combination of message hash, private key and ephemeral key can produce 2 valid signatures. One is a positive number and one is a negative number expressed using 2's complement. Nodes on the BitcoinSV ledger currently require that the signature portion of a DER encoded signature be the positive or 'Low' signature value. Unfortunately, it is not possible to tell which of the two values will be output by the equation meaning that the script will fail 50% of the time. To ameliorate this, applications that leverage the Optimal OP\_PUSH\_TX script must be written to malleate some part of the transaction until a valid pre-image that solves to a Low S value is found. Typically this is done by changing some part of an output or the nLocktime value.

## Classic OP\_PUSH\_TX

An alternative to Optimal OP\_PUSH\_TX is Classic OP\_PUSH\_TX. Classic OP\_PUSH\_TX has a much lower failure rate which is achieved by changing the endianness of the signature and ensuring that it is 'low S' rather than high S. This method has just a 1/256 failure rate making it more robust than the 'Optimal' version. The script is as follows:

`OP_HASH256 OP_DUP OP_FALSE OP_GREATERTHAN OP_IF OP_1ADD OP_ELSE OP_1SUB OP_ENDIF 0x20 OP_NUM2BIN OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_DUP OP_FALSE OP_LESSTHAN OP_IF 414136d08c5ed2bf3ba048afe6dcaebafeffffffffffffffffffffffffffffff OP_SUB OP_ENDIF OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_TRUE OP_SPLIT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT OP_SWAP OP_CAT 3044022079be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f817980220 OP_SWAP OP_CAT 0x41 OP_CAT 02b405d7f0322a89d0f9f3a98e6f938fdc1c969a8d1382a2bf66a71ae74a1e83b0 OP_CHECKSIGVERIFY`

### Other versions of OP\_PUSH\_TX

Other versions of OP\_PUSH\_TX have been implemented which allow the user to submit their own private key, their own K-values and much more. Each has its own advantage and disadvantage in terms of its length and failure rate. The following paper from nChain contains several alternate examples.

INSERT nChain paper.

For the purposes of the remainder of this course, we will use the Optimal OP\_PUSH\_TX script for brevity.
