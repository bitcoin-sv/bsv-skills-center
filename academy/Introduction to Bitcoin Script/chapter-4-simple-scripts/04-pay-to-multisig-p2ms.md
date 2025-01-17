# 04 - Pay to MultiSig (P2MS)

Pay to MultiSig (P2MS) uses the OP\_CHECKMULTISIG opcode to perform a check against multiple signatures and public keys. There are no limits to the number of keys/signatures that can be checked beyond any limits imposed by nodes on the size or complexity of individual transactions.&#x20;

For this example, we will use a 2of3 multisignature operation. A 2of3 multisig script is defined as follows:

`2 <pubkey_1> <pubkey_2> <pubkey_3> 3 OP_CHECKMULTISIG`

To spend an output that is locked with a 2of3 P2MS script, any of the following solutions may be provided:

Example 1: `1 <signature_1> <signature_2>`

Example 2: `1 <signature_1> <signature_3>`

Example 3: `1 <signature_2> <signature_3>`

Using the example 1, the validation engine will evaluate the full script as follows:

`1 <signature_1> <signature_2> 2 <pubkey_1> <pubkey_2> <pubkey_3> 3 OP_CHECKMULTISIG`

A breakdown of the script evaluation process is shown below:

<table><thead><tr><th width="202.33333333333331">Stack</th><th>Script</th><th>Description</th></tr></thead><tbody><tr><td>Empty.</td><td><p>1 &#x3C;signature_1> &#x3C;signature_2> | |</p><p>2 &#x3C;pubkey_1> &#x3C;pubkey_2> &#x3C;pubkey_3> 3 OP_CHECKMULTISIG</p></td><td>scriptSig and scriptPubKey are combined.</td></tr><tr><td>1 &#x3C;signature_1> &#x3C;signature_2> </td><td>2 &#x3C;pubkey_1> &#x3C;pubkey_2> &#x3C;pubkey_3> 3 OP_CHECKMULTISIG</td><td>Signatures are added to the stack</td></tr><tr><td>1 &#x3C;signature_1> &#x3C;signature_2> 2 &#x3C;pubkey_1> &#x3C;pubkey_2> &#x3C;pubkey_3> 3 </td><td>OP_CHECKMULTISIG</td><td>Public keys and multi signature evaluation criteria are added to the stack</td></tr><tr><td>true</td><td>Empty.</td><td>Multi signature evaluation is performed</td></tr></tbody></table>

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter4-Animation04.gif" alt=""><figcaption></figcaption></figure>

As shown above, the spending parties must supply 2 valid signatures signed with keys taken from the pool of three keys stored in the output being spent. The signatures must be provided in the same order corresponding to the public keys in the locking script.&#x20;

e.g. if the spending party submitted `1 <signature_2> <signature_1>` as their solution, this would be invalid and the transaction would be rejected.

## Junk Bug

The eagle eyed among you would have noticed that each of the example solutions has a single '1' as the first item in the script. This is a result of a bug in the evaluation software for OP\_CHECKMULTISIG in the original node client. The bug is harmless, and results in minimal overhead to users. To maintain the protocol, the bug has been left in all subsequent versions of the node client and will remain as part of the Bitcoin protocol. This stack item is not checked in the evaluation process and as such can be any value of any valid length. Transactions submitted to the network that do not have an extra stack item at the top of the stack are considered invalid and will be rejected.
