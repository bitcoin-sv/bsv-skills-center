# 04 - OP\_NOP, OP\_VERIFY and its Derivatives

Aside from OP\_IF and its companion opcodes, there are other useful opcodes that allow us to control the sections of script being processed or not processed given the set of conditions submitted by the spending party.

### OP\_NOP

`OP_NOP` simply performs _no action_. It consumes nothing from the stack and leaves nothing on the stack. It can be used in sophisticated transaction templates to pad elements of a new script that does not match a size requirement.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-AnimationPack01-OP_NOP.gif" alt=""><figcaption></figcaption></figure>

### OP\_VERIFY

`OP_VERIFY` acts as a gating function against any condition being evaluated. OP\_VERIFY consumes the top value on the stack. If the value is any non-zero value, the opcode allows the script to continue or if it is a zero value item, causes it to terminate and fail.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-AnimationPack01-OP_VERIFY.gif" alt=""><figcaption></figcaption></figure>

The 'Verify' functionality is also added to the functionality of several available opcodes to create more efficient versions of specific functions as outlined below:

#### OP\_EQUALVERIFY

`OP_EQUALVERIFY` only allows the script to continue processing if the top two data items on the stack are identical bytevectors. If the data items are not equal, the opcode causes the script to terminate and fail. The opcode performs the same function produced by `OP_EQUAL OP_VERIFY`.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-AnimationPack01-OP_EQUALVERIFY.gif" alt=""><figcaption></figcaption></figure>

#### Example:

`OP_2 OP_ADD OP_3 OP_EQUALVERIFY`

In this example, if the integer value 1 is on the top of the stack when this snippet begins processing, the script will continue to process beyond OP\_EQUALVERIFY. If any other value is on top of the stack, the script will fail.

#### OP\_NUMEQUALVERIFY

`OP_NUMEQUALVERIFY` only allows the script to continue processing if the top two data items on the stack have identical integer values. If the data items are not numerically equal, the opcode causes the script to terminate and fail. This can be useful when values are being calculated which may finish with uncertain bytevector lengths.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-AnimationPack01-OP_NUMEQUALVERIFY.gif" alt=""><figcaption></figcaption></figure>

#### Example:

`OP_4 OP_SPLIT OP_DROP OP_1 OP_NUMEQUALVERIFY`

In this example, a value of any length can be put onto the stack. The script splits the first 8 characters (4 bytes) from the value and drops the remainder. It then checks that it is numerically equal to 1. Bitcoin is little endian so this would mean the string's first 4 bytes are 01000000. If the value is numerically equal to 1, the script will continue processing while any other value will result in failure. This is useful to keep scripts compact, or when dealing user inputs of uncertain length.

#### OP\_CHECKSIGVERIFY

OP\_CHECKSIGVERIFY performs an ECDSA signature check consuming the top two values on the stack and allows the script to continue processing if the signature is valid.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-AnimationPack01-OP_CHECKSIGVERIFY.gif" alt=""><figcaption></figcaption></figure>

#### Example:

`<signature> <public_key> OP_CHECKSIGVERIFY`

If the signature is invalid, the `OP_CHECKSIGVERIFY` opcode causes the script to terminate and fail.&#x20;

This is a basic signature check script, and is occasionally used by transactions on the network, although most wallets favor Pay To Public Key Hash (P2PKH) as the default script format.&#x20;

#### OP\_CHECKMULTISIGVERIFY

OP\_CHECKMULTISIGVERIFY performs an ECDSA signature check consuming up to i items from the stack, where n is the number of public keys in the group, m is the number of signatures needed and i = n + m + 3. If the multisignature condition is valid, the script continues to process.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-AnimationPack01-OP_CHECKMULTISIGVERIFY.gif" alt=""><figcaption></figcaption></figure>

#### Example:

`OP_1* <signature_1> <signature_3> OP_2 <public_key 1> <public_key 2> <public_key 3> OP_3 OP_CHECKMULTISIGVERIFY`

\*Note that the first item pushed using OP\_1 is called the junk item. This will be covered in detail in chapter 5

In this example, n = 2 and m = 3 so there are 2(signatures) + 3(pubkeys) + 2(indicators) + 1(junk item) = 8 items consumed from the stack. To spend an output with this type of multisignature script, the user must submit a junk item and 2 valid signatures corresponding to 2 of the public keys in the list, in the correct order.

If the multisignature check is invalid, the opcode causes the script to terminate and fail.&#x20;
