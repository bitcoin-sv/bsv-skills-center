# 01 - Pay to Public Key (P2PK)

Pay to Public Key is the most simple script that can be deployed that uses the security of Elliptic curve signatures to lock transaction outputs.

A pay to public key script is defined as follows:

`<public_key> OP_CHECKSIG`

To spend an output that is locked with a P2PK script, the following solution is provided:

`<signature>`

The validation engine will evaluate the full script as follows:

`<signature> <public_key> OP_CHECKSIG`

For the purposes of brevity, we exclude the pushdata opcodes and use | | to represent the OP\_CODESEPARATOR that the validation engine automatically inserts inbetween the input and output scripts.

A breakdown of the script evaluation process is shown below:

<table><thead><tr><th width="177.33333333333331">Stack</th><th>Script</th><th>Description</th></tr></thead><tbody><tr><td>Empty.</td><td><p>&#x3C;sig> | |</p><p>&#x3C;pubKey> OP_CHECKSIG</p></td><td>scriptSig and scriptPubKey are combined.</td></tr><tr><td>&#x3C;sig></td><td>&#x3C;pubKey> OP_CHECKSIG</td><td>Signature is added to the stack.</td></tr><tr><td>&#x3C;sig> &#x3C;pubKey></td><td>OP_CHECKSIG</td><td>Pubkey is added to stack.</td></tr><tr><td>true</td><td>Empty.</td><td>Signature is checked against the public key</td></tr></tbody></table>

<figure><img src="../../../.gitbook/assets/BSVA-BitcoinScript_Chapter4-Animation01.gif" alt=""><figcaption></figcaption></figure>

As shown above, the signature and public key are pushed onto the stack, and then consumed by OP\_CHECKSIG which leaves the result of the check on the stack. If the signature is valid, the input can be spent in the transaction.
