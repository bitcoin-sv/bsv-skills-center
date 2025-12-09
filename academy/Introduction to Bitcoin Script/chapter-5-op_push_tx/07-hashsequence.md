# 07 - hashSequence

The hashSequence field is the hash of the concatenation of the nSequence values of all inputs being signed. The make-up of the Hash of nSequence is dependent on whether `SIGHASH_ANYONECANPAY` flag is used.

If `SIGHASH_ANYONECANPAY` is **NOT** used, the hash value is a SHA256 hash of a concatenated list of the sequence number of each of the transaction's inputs.

If `SIGHASH_ANYONECANPAY` is used, the value is a 32 byte null string.

<figure><img src="../../../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation06.gif" alt=""><figcaption></figcaption></figure>

#### Example: Check all sequence values are final

In this example, the script checks that two inputs are used, and that the input is final. To perform the check, the hash of sequence will be split from `r_tx_preimg` and tested against a hash of the expected value.

It is assumed that `version` and `hash_prevouts` have both been removed from `r_tx_preimage`.

<table><thead><tr><th width="250.33333333333331">Stack</th><th width="187">Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;r_tx_preimg></td><td>...</td><td>nVersion field and hashPrevouts have been removed</td></tr><tr><td>&#x3C;r_tx_preimg></td><td>0x20</td><td>add hash_nSequence length to the stack</td></tr><tr><td>&#x3C;r_tx_preimg> 0x20</td><td>OP_SPLIT</td><td>Split hash_nSequence from pre-image</td></tr><tr><td>&#x3C;hash_nSequence> &#x3C;rr_tx_preimg></td><td>OP_SWAP</td><td>Swap hash_nSequence to front</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;hash_nSequence></td><td>0xffffffffffffffff</td><td>Expected sequence value if two final inputs are used</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;hash_nSequence> 0xffffffffffffffff</td><td>OP_SHA256</td><td>Hash sequence value</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;hash_nSequence> &#x3C;sha256_ffffffff></td><td>OP_EQUALVERIFY</td><td>Check it is equal - fail if not</td></tr><tr><td>&#x3C;rr_tx_preimg></td><td>...</td><td>rest of script</td></tr></tbody></table>

This gives us a useful tool for managing closure of payment channels, providing an optimal processing path for channels submitted with fully final inputs.
