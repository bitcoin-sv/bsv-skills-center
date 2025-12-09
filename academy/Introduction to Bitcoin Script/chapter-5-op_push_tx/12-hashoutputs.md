# 12 - hashOutputs

hashOutputs is a SHA256 hash of the concatenation of all outputs being signed in [Transaction output format](https://wiki.bitcoinsv.io/index.php/Bitcoin_Transactions#Format_of_a_Transaction_Output).

Transaction Output Format is a concatenation of the following 3 items:

1. The value of the output in Satoshis (8 bytes)
2. The length of the locking script (varInt format)
3. The locking script itself (string)

Whether the signature is applied to all, one or none of the outputs depends on the SIGHASH flags used in the signature.

If SIGHASH\_ALL is used, all of the transaction outputs are concatenated and hashed together.

If SIGHASH\_SINGLE is used, only the output with the same index as the input being signed is hashed. If there is no output at that index value, hashOuts is a 32 byte null string.

If SIGHASH\_NONE is used, hashOuts is a 32 byte null string.

Hash\_outputs is particularly important for staged processing as it allows the script to forward-enforce the conditions within the next output, which may include use of some or all of the script used in the input, or may be chosen from a variety of pre-determined script outputs.

<figure><img src="../../../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation11.gif" alt=""><figcaption></figcaption></figure>

#### Example 1: Selectable next-state using input

<table><thead><tr><th width="237.33333333333331">Stack</th><th>Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;input> &#x3C;r_tx_preimg></td><td>...</td><td>Version, hash_prevouts, hash_nSequence, hash_outpoints, script, value and nSequence have been removed</td></tr><tr><td>&#x3C;input> &#x3C;r_tx_preimg></td><td>0x20</td><td>Hash_outputs is 32 bytes (0x20)</td></tr><tr><td>&#x3C;input> &#x3C;r_tx_preimg> 0x20</td><td>OP_SPLIT</td><td>Split nSequence</td></tr><tr><td>&#x3C;input> &#x3C;hash_outputs> &#x3C;rr_tx_preimg></td><td>OP_SWAP</td><td>Swap hash_outputs to top of stack</td></tr><tr><td>&#x3C;input> &#x3C;rr_tx_preimg> &#x3C;hash_outputs></td><td>OP_ROT</td><td>Move input to top of stack</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;hash_outputs> &#x3C;input></td><td>OP_IF</td><td>True or false input</td></tr><tr><td>&#x3C;rr_tx_preimg>&#x3C;hash_outputs></td><td>&#x3C;true_case_output></td><td>Load the hash of the true case output onto the stack</td></tr><tr><td>&#x3C;rr_tx_preimg>&#x3C;hash_outputs></td><td>OP_ELSE</td><td>If input is false</td></tr><tr><td>&#x3C;rr_tx_preimg>&#x3C;hash_outputs></td><td>&#x3C;false_case_output></td><td>Load the hash of the false case output onto the stack</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;hash_outputs> &#x3C;next_state_output></td><td>OP_ENDIF</td><td>Correct next state output is loaded onto stack, exit IF loop</td></tr><tr><td>&#x3C;rr_tx_preimg> &#x3C;hash_outputs> &#x3C;next_state_output></td><td>OP_EQUALVERIFY</td><td>Check that desired next state matches transaction pre-image</td></tr><tr><td>&#x3C;rr_tx_preimg></td><td>...</td><td>rest of script</td></tr></tbody></table>

In this example, we are splitting the output hash from the pre-image and checking it against one of two pre-defined output hashes that represent our next state based on a true/false input. These pre-defined hashes can include any number of outputs with any script needed, and can attach any valid quantity of satoshis to each output.

Much more sophisticated checks can be done, including keeping \<script> on the stack and checking that the next state includes the same script elements. This can be useful if you don't know exactly what the next state will be when the output is created. For instance, this might be for a digital object with transferrable ownership. Each new owner will want to add their own keys and checks, so this must be validated with the script.
