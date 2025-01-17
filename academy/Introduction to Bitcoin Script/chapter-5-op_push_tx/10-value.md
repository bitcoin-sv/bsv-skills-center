# 10 - value

The value of the input (value) is an 8 byte little endian integer representing the satoshi value of the UTXO being signed.

This can be useful when enforcing process states that require either static or dynamic satoshi values to be used or otherwise checked in each iteration of the transaction.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation09.gif" alt=""><figcaption></figcaption></figure>

#### Example: Value of input check

Checking the value can be a useful gating process to decide whether or not to end a process. In this example, the input value is checked, and if found to be less than 16 satoshis, an alternative condition is created.

<table><thead><tr><th width="237.33333333333331">Stack</th><th>Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;r_tx_preimg></td><td>...</td><td>Version, hash_prevouts, hash_nSequence, hash_outpoints and the script have been removed</td></tr><tr><td>&#x3C;r_tx_preimg></td><td>OP_8</td><td>length is 8 bytes long</td></tr><tr><td>&#x3C;r_tx_preimg> 0x08</td><td>OP_SPLIT</td><td>Split value</td></tr><tr><td>&#x3C;8byte_value> &#x3C;rr_tx_preimg></td><td>OP_SWAP</td><td>Move to top of stack</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;8byte_value></td><td>OP_BIN2NUM</td><td>Optimally encode the integer value</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;value></td><td>OP_16</td><td>16 satoshis is our limit</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;value> 16</td><td>OP_GREATERTHANOREQUAL</td><td>numeric check</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;result></td><td>OP_IF</td><td>if greater than</td></tr><tr><td>&#x3C;rr_tx_preimg></td><td>...</td><td>process</td></tr><tr><td>&#x3C;rr_tx_preimg></td><td>OP_ELSE</td><td>if less than</td></tr><tr><td>&#x3C;rr_tx_preimg> </td><td>...</td><td>alternative process</td></tr><tr><td>&#x3C;data_items></td><td>OP_ENDIF</td><td>Resulting outcome</td></tr></tbody></table>
