# 11 - nSequence

The nSequence field is a 4 byte little endian number that is the sequence number of the input. This value can be used with nLocktime to put transactions into a non-final state, allowing a managed transfer of data to take place.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation10.gif" alt=""><figcaption></figcaption></figure>

#### Example: Extract and check nSequence

In this example, we will extract the nSequence value of this input and only allow the UTXO to be spent if it is final.

<table><thead><tr><th width="237.33333333333331">Stack</th><th>Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;r_tx_preimg></td><td>...</td><td>Version, hash_prevouts, hash_nSequence, hash_outpoints, script and value have been removed</td></tr><tr><td>&#x3C;r_tx_preimg></td><td>OP_4</td><td>nSequence length is 4 bytes long</td></tr><tr><td>&#x3C;r_tx_preimg> 0x04</td><td>OP_SPLIT</td><td>Split nSequence</td></tr><tr><td>&#x3C;nsequence> &#x3C;rr_tx_preimg></td><td>OP_SWAP</td><td>Move to top of stack</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;nsequence></td><td>0xFFFFFFFF</td><td>0xFFFFFFFF is final</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;nsequence> 0xFFFFFFFF</td><td>OP_EQUALVERIFY</td><td>Fail script if tx is non-final</td></tr><tr><td>&#x3C;r_tx_preimg></td><td>...</td><td>rest of script</td></tr></tbody></table>
