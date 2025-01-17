# 08 - Outpoint

The outpoint for the input being signed is a 36 byte long data item made of the concatenation of the input TXID and Vout (32 + 4 bytes).

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation07.gif" alt=""><figcaption></figcaption></figure>

It can be used for a variety of purposes including:

* Source of unique token ID
* Input randomness
* Check input sources

We will now look at examples of each of these.

#### Example 1: Source of unique token ID

Tokens within the system require a unique 20 byte ID. This is achieved by hashing `<outpoint>` using `OP_HASH160`.&#x20;

| Stack                          | Script      | Description                                               |
| ------------------------------ | ----------- | --------------------------------------------------------- |
| \<r\_tx\_preimg>               | ...         | nVersion, hashPrevouts and hashSequence have been removed |
| \<r\_tx\_preimg>               | 0x24        | add outpoint length to the stack                          |
| \<r\_tx\_preimg> 0x24          | OP\_SPLIT   | Split outpoint from pre-image                             |
| \<outpoint> \<rr\_tx\_preimg>  | OP\_SWAP    | Swap outpoint to front                                    |
| \<rr\_tx\_preimg> \<outpoint>  | OP\_HASH160 | Calculate txid using OP\_HASH160                          |
| \<rr\_tx\_preimg> \<token\_id> | ...         | rest of script                                            |

The token\_id can now be added to an output script and enforced forward. This will be covered later in this chapter.

#### Example 2: Input randomness

The TXID cannot be known until the transaction is final, making it ideal as a source of input randomness. This example uses the MODULO function to implement a Rock-Paper-Scissors game.

| Stack                         | Script      | Description                                                            |
| ----------------------------- | ----------- | ---------------------------------------------------------------------- |
| \<r\_tx\_preimg>              | ...         | Version, hash\_prevouts and hash\_nSequence have been removed          |
| \<r\_tx\_preimg>              | 0x24        | add outpoint length to the stack                                       |
| \<r\_tx\_preimg> 0x24         | OP\_SPLIT   | Split outpoint from pre-image                                          |
| \<outpoint> \<r\_tx\_preimg>  | OP\_DROP    | Drop remaining pre-image                                               |
| \<outpoint>                   | OP\_SHA256  | Generate random output                                                 |
| \<random\_value>              | OP\_3       | Put 3 on the stack                                                     |
| \<random\_value> 0x03         | OP\_MOD     | Calculate modulo 2 - 1 or 0 outcome                                    |
| \<rem>                        | OP\_IFDUP   | Duplicates the stack if not zero                                       |
| \[0x00, 0x01 0x01, 0x02 0x02] | OP\_NOTIF   | 3 possible stack states after OP\_IFDUP. If 0, enter if statement path |
|                               | \<rock>     | Zero is rock                                                           |
| \[0x01 , 0x02]                | OP\_ELSE    | If not zero, duplicated outcome remains.                               |
| \[0x01 , 0x02]                | OP\_1       | Test for 1                                                             |
| \[0x01 , 0x02] 0x01           | OP\_EQUAL   | Equality check                                                         |
| \<result>                     | OP\_IF      | Enter if                                                               |
|                               | \<paper>    | 1 is paper                                                             |
|                               | OP\_ELSE    | Else                                                                   |
|                               | \<scissors> | 2 is scissors                                                          |
| \<rock/paper/scissors>        | OP\_ENDIF   | Endif                                                                  |
| \<rock/paper/scissors>        | ...         | rest of script                                                         |

#### Example 3: Check input sources

This UTXO requires that it be spent in a transaction with the two outputs below it in the previous transaction. It uses hash\_prevouts which must be left on the stack in an earlier section of script.

<table><thead><tr><th width="275">Stack</th><th width="173">Script</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;hash_prevouts> &#x3C;r_tx_preimg></td><td>...</td><td>Version and hash_nSequence have been removed and any needed conditions have been checked. </td></tr><tr><td>&#x3C;hash_prevouts> &#x3C;r_tx_preimg></td><td>0x24</td><td>add outpoint length to the stack</td></tr><tr><td>&#x3C;hash_prevouts> r_tx_preimg> 0x24</td><td>OP_SPLIT</td><td>Split outpoint from pre-image</td></tr><tr><td>&#x3C;hash_prevouts> &#x3C;outpoint> &#x3C;r_tx_preimg></td><td>OP_SWAP</td><td>Swap outpoint to front</td></tr><tr><td>&#x3C;hash_prevouts> &#x3C;r_tx_preimg> &#x3C;outpoint></td><td>OP_DUP</td><td></td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;outpoint></td><td>0x20</td><td>add 32 to stack</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;outpoint> 0x20</td><td>OP_SPLIT</td><td>Split the txid and vout from the outpoint</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;txid>&#x3C;vout></td><td>OP_1ADD</td><td>add 1 to the vout</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;txid>&#x3C;vout+1></td><td>OP_2DUP</td><td>Duplicate txid and vout+1</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;txid>&#x3C;vout+1> &#x3C;txid>&#x3C;vout+1></td><td>OP_1ADD</td><td>add 1 to the vout</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;txid>&#x3C;vout+1> &#x3C;txid>&#x3C;vout+2></td><td>OP_CAT</td><td>Create outpoint 3</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;txid>&#x3C;vout+1> &#x3C;outpoint3></td><td>OP_CAT</td><td>Join to previous vout</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;txid>&#x3C;vout+1&#x26;outpoint3></td><td>OP_CAT</td><td>Join to txid</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint> &#x3C;outpoint2&#x26;3></td><td>OP_CAT</td><td>Join all three outpoints together</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;outpoint1&#x26;2&#x26;3></td><td>OP_SHA256</td><td>hash outpoints</td></tr><tr><td>&#x3C;hash_prevouts>&#x3C;r_tx_preimg> &#x3C;hashoutpoints></td><td>OP_ROT</td><td>Rotate hash_prevouts to top of stack</td></tr><tr><td>&#x3C;r_tx_preimg> &#x3C;hashoutpoints> &#x3C;hash_prevouts></td><td>OP_EQUALVERIFY</td><td>Check condition is met</td></tr><tr><td>&#x3C;r_tx_preimg></td><td>...</td><td>Rest of script</td></tr></tbody></table>

##
