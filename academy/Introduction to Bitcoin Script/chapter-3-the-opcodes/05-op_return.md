# 05 - OP\_RETURN

OP\_RETURN has a storied history which will not be covered in this content. More information can be found [here](https://wiki.bitcoinsv.io/index.php/History_of_OP_RETURN).

OP\_RETURN causes the script to terminate. If there is a single non-zero item on the stack the script will return TRUE, allowing it to be spent. If the topmost stack value is zero, or there are multiple items on the stack, the script fails and the transaction cannot be submitted to the blockchain.

This functionality can be applied to a multitude of use cases.

{% file src="../.gitbook/assets/BA_BSVA_EDUC_BITCOIN-SCRIPT-CH3VID3_OP_RETURN-FEATURES_V2_072023_compressed.mp4" %}

#### Example:

`OP_DEPTH OP_1 OP_EQUAL OP_IF`

&#x20;   `<public_key> OP_CHECKSIG`

&#x20;   `OP_RETURN`

`OP_ENDIF`

`<rest_of_script>`&#x20;

In this example we first check the depth of the stack. This tells us how many items there are on the stack at this moment in the script processing. If there is just 1 item, the script expects that this will be a signature, that can be verified using the public key in the script. If the OP\_CHECKSIG operation finds a valid signature, OP\_RETURN will end the script successfully. If the signature check is invalid, the script will terminate in failure, and the output cannot be spent.&#x20;

In this example, it is assumed that any further actions that take place in \<rest\_of\_script> require two or more stack items in order to successfully validate.

The functionality of OP\_CHECKSIG and other variations is covered in page 9 of this chapter.

### FALSE RETURN scripts

One particular use-case for OP\_RETURN is in the creation of FALSE RETURN scripts (commonly called 'OP\_RETURN outputs').

A False Return script is created by generating a transaction output which uses OP\_FALSE and OP\_RETURN as the first two opcodes in its script. Because a script that begins with OP\_FALSE OP\_RETURN will always terminate in failure, these scripts are considered unspendable and are the only type of script that can be published with an output value of zero. As such they can be used as carriers for data items that do not form part of any locking conditions.

This technique is widely used on the BitcoinSV network for a variety of token solutions, and to allow platforms and applications to capture data onto the blockchain for indexing and analysis.

#### Example:

`OP_FALSE OP_RETURN <data packet>`

In this example, `OP_FALSE` is pushed onto the stack before the `OP_RETURN` opcode ends the script. Because OP\_RETURN always returns with a false result this script can never be spent.
