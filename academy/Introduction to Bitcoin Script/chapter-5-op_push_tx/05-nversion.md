# 05 - nVersion

nVersion is the first parameter in the transaction pre-image. It's value indicates the version of the node client that should be used to evaluate this transaction (4 bytes)

nVersion can be evaluated by splitting the first 4 bytes of the pre-image and moving the value to the top of the stack. In this way, a user can pre-set a version flag and enforce its use in a future transaction that spends the output.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation04.gif" alt=""><figcaption></figcaption></figure>

This functionality was originally available in script using the `OP_VER`_,_ `OP_VERIF` and `OP_VERNOTIF` opcodes, however these have been disabled and are no-longer part of the scripting language.&#x20;

In its original form a wallet could potentially construct a transaction that only a sub-set of nodes would try to put into a block. The functionality isn't used by miners today and so application of this technique is limited.

#### Example 1: Replace OP\_VER

To replicate the funtionality of OP\_VER, the following script can be used:

<table><thead><tr><th width="279.3333333333333">Stack</th><th width="213">Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;tx_preimg></td><td>...</td><td>Pre-image has been validated </td></tr><tr><td>&#x3C;tx_preimg></td><td>OP_4</td><td>add 4 to the stack</td></tr><tr><td>&#x3C;tx_preimg> 4</td><td>OP_SPLIT</td><td>Split version from pre-image</td></tr><tr><td>&#x3C;version> &#x3C;r_tx_preimg></td><td>OP_SWAP</td><td>Swap version to front, or drop if not needed</td></tr><tr><td>&#x3C;r_tx_preimg> &#x3C;version></td><td>...</td><td>Script continues</td></tr></tbody></table>

#### Example 2: OP\_VERIF / OP\_VERNOTIF

To replicate the funtionality of `OP_VERIF` or `OP_VERNOTIF`, the following script outline can be used:

| Stack                                            | Script               | Description                                                                                                                            |
| ------------------------------------------------ | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| \<tx\_preimg>                                    | ...                  | Pre-image has been validated                                                                                                           |
| \<tx\_preimg>                                    | OP\_4                | add 4 to the stack                                                                                                                     |
| \<r\_tx\_preimg> 0x04                            | OP\_SPLIT            | Split version from pre-image                                                                                                           |
| \<version> \<r\_tx\_preimg>                      | OP\_SWAP / OP\_NIP   | Swap version to front, or drop if not needed                                                                                           |
| \<r\_tx\_preimg> \<version>                      | \<expected\_version> | To test the version, add a constant to the stack.                                                                                      |
| \<r\_tx\_preimg> \<version> \<expected\_version> | OP\_EQUAL            | Equality test                                                                                                                          |
| \<r\_tx\_preimg>                                 | OP\_IF / OP\_NOTIF   | Enter if statement path                                                                                                                |
| \<r\_tx\_preimg>                                 | ...                  | process                                                                                                                                |
| \<r\_tx\_preimg>                                 | OP\_ELSE             | or alternative path (optional)                                                                                                         |
| \<r\_tx\_preimg>                                 | ...                  | alternative process (optional)                                                                                                         |
| \<remainder\_data\_items>                        | OP\_ENDIF            | End process - If-structure script may leave one or more different data items on the stack. These are passed to the rest of the script. |
| \<remainder\_data\_items>                        | ...                  | rest of script                                                                                                                         |
