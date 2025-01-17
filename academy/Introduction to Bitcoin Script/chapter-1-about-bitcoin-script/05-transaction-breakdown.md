# 05 - Transaction Breakdown

Now we will break down the serialised transaction into its various components.

<figure><img src="../.gitbook/assets/Tx Parameters.gif" alt=""><figcaption></figcaption></figure>

### Version <a href="#version" id="version"></a>

The first 4 bytes are the version number recorded in little endian:

`01000000`

This indicates that the transaction follows the version 01 of the transaction evaluation format.&#x20;

As usage increases, it is expected this field will be used to signal a variety of different transaction templates which may each be processed by different subsets of the mining network.&#x20;

<figure><img src="../.gitbook/assets/Tx Version Number.gif" alt=""><figcaption></figcaption></figure>

### Quantity of inputs <a href="#quantity-of-inputs" id="quantity-of-inputs"></a>

`01`

This indicates that there is just 1 input being spent in this transaction.&#x20;

<figure><img src="../.gitbook/assets/Input Counter.gif" alt=""><figcaption></figcaption></figure>

This value is a 4-byte integer in Little Endian format. This means that if a transaction has more than 0xFFFFFFFF outputs (approx 4.3 billion) those that are created at index locations outside the range are practically unspendable.&#x20;

### The Input <a href="#the-input" id="the-input"></a>

<figure><img src="../.gitbook/assets/Deconstructed Inputs.gif" alt=""><figcaption></figcaption></figure>

As explained previously, the input itself is broken down into 5 elements as follows:

#### Previous TXID <a href="#previous-txid" id="previous-txid"></a>

`c997a5e56e104102fa209c6a852dd90660a20b2d9c352423edce25857fcd3704`

This is a little endian representation of the input's parent transaction. This indicates that the spending party is using an output of TXID no. [0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9](https://whatsonchain.com/tx/0437cd7f8525ceed2324359c2d0ba26006d92d856a9c20fa0241106ee5a597c9)

#### Output index <a href="#output-index" id="output-index"></a>

`00000000`

This indicates that the spender is using the 'zeroth' output of the transaction.

Extra detail:

The scriptPubKey contained in this output is the following simple Pay to Public Key script:

`0411db93e1dcdb8a016b49840f8c53bc1eb68a382e97b1482ecad7b148a6909a5cb2e0eaddfb84ccf9744464f82e160bfa9b8b64f9d4c03f999b8643f656b412a3 OP_CHECKSIG`

The first part of this output is a public key controlled by the output's owner, and the second part is a Bitcoin Script OPCODE that checks the transaction's signature.

#### Length of the scriptSig <a href="#length-of-the-scriptsig" id="length-of-the-scriptsig"></a>

`48`

This value is the length of the scriptSig represented as a hexadecimal value. In this case, 0x48 is the equivalent of 72 in base 10.

#### scriptSig <a href="#scriptsig" id="scriptsig"></a>

`47304402204e45e16932b8af514961a1d3a1a25fdf3f4f7732e9d624c6c61548ab5fb8cd410220181522ec8eca07de4860a4acdd12909d831cc56cbbac4622082221a8768d1d0901`

The scriptSig in this case is a single pushdata opcode (0x47) which pushes 71 bytes to the stack. These are a single bytevector containing the 70 byte long ECDSA signature in DER format concatenated with the 1 byte SIGHASH flag on the end. In some cases the DER signature is 71 bytes with an additional 1 byte for the SIGHASH flag. To gain a better understanding of the DER signature format and its application to Bitcoin, please consider doing the Bitcoin Primitives course on 'Digital Signatures'.

When the evaluation engine validates this transaction, this signature is loaded onto the processing stack first, and then followed with the scriptPubKey contained in the output being spent. In this case, the signature can be shown to have been generated with a private key that corresponds to the public key in the scriptPubKey, meaning the coin could be spent.

#### nSequence <a href="#nsequence" id="nsequence"></a>

`ffffffff`

The nSequence value can be used to generate payment channels which allow non-final transactions to be modified many times. In this case, the nSequence number is UINT\_MAX which means the transaction was final when it was submitted to the network.

If the nSequence value is not UINT\_MAX then the transaction cannot be processed until the nLockTime (expressed as either block height or UNIX epoch ) has expired.

<figure><img src="../.gitbook/assets/nlocktimensequence (1).gif" alt=""><figcaption></figcaption></figure>



### Number of Outputs <a href="#number-of-outputs" id="number-of-outputs"></a>

`02`

This tells us that there are two outputs in this transaction.&#x20;

<figure><img src="../.gitbook/assets/Output Counter.gif" alt=""><figcaption></figcaption></figure>

This value is a Variable Integer (VarInt) of 1-9 bytes meaning that a transaction can have 1.8 x 10^19  outputs. Remember though, only the first 4.3 billion can be referenced as inputs.

A VarInt is most commonly a 1 byte [hexadecimal](https://learnmeabitcoin.com/technical/hexadecimal) value:

However, if the VarInt is going to be greater than `0xfc` (so the number you’re trying to express won’t fit inside of two hexadecimal characters) then you can expand the field in the following way:

<table><thead><tr><th width="250.33333333333331">No. of inputs</th><th>Example</th><th>Description</th></tr></thead><tbody><tr><td>&#x3C;= <code>0xfc</code></td><td><code>12</code></td><td></td></tr><tr><td><code>0xfc</code>&#x3C; qty &#x3C;= <code>0xffff</code></td><td><strong><code>fd</code></strong><code>1234</code></td><td>Prefix with <code>fd</code>, and the next <em>2 bytes</em> is the VarInt (in little-endian).</td></tr><tr><td><code>0xffff</code> &#x3C; qty &#x3C;= <code>0xffffffff</code></td><td><strong><code>fe</code></strong><code>12345678</code></td><td>Prefix with <code>fe</code>, and the next <em>4 bytes</em> is the VarInt (in little-endian).</td></tr><tr><td><code>0xffffffff</code> &#x3C; qty &#x3C;= <code>0xffffffffffffffff</code></td><td><strong><code>ff</code></strong><code>1234567890abcdef</code></td><td>Prefix with <code>ff</code>, and the next <em>8 bytes</em> is the VarInt (in little-endian).</td></tr></tbody></table>

### Output 1 Breakdown <a href="#output-1-breakdown" id="output-1-breakdown"></a>

<figure><img src="../.gitbook/assets/Output Parameters.gif" alt=""><figcaption></figcaption></figure>

This is the output in which Satoshi sends Hal Finney his Bitcoin.

As explained previously, the first output is broken down into 3 elements as follows:

#### Output Value <a href="#output-value" id="output-value"></a>

`00ca9a3b00000000`

This value is a little endian integer representing the satoshi value of the first transaction output. In this case it can be expressed in Hexadecimal as 0x000000003b9aca00 which is 1,000,000,000 in decimal. This shows that the first output was sending 10 Bitcoins (each 100,000,000 satoshis) to a new scriptPubKey. In this case, we know that this was a scriptPubKey given to Hal Finney by Satoshi Nakamoto, who sent him the 10 Bitcoins.

#### Length of the scriptPubKey <a href="#length-of-the-scriptpubkey" id="length-of-the-scriptpubkey"></a>

`43`

This value is a hexadecimal representation of the length of the scriptPubKey, indicating that it is 0x43, or 67 bytes long.

#### scriptPubKey <a href="#scriptpubkey" id="scriptpubkey"></a>

`4104ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84cac`

This scriptPubKey represents a predicate expressed in Bitcoin Script. The predicate is broken down as follows:

The first byte (0x41) is a pushdata OPCODE which pushes Hal Finney's 65 byte long public key onto the stack.&#x20;

The next 65 bytes are Hal Finney's public key as follows:

`04ae1a62fe09c5f51b13905f07f06b99a2f7159b2225f374cd378d71302fa28414e7aab37397f554a7df5f142c21c1b7303b8a0626f1baded5c72a704f7e6cd84c`

The final byte (0xac) is the opcode OP\_CHECKSIG.

This represents the most simple application of an ECDSA signature check in Bitcoin.

This scriptPubKey locks the 1,000,000,000 satoshis contained in this output until someone who controls the public key provides the needed signature as an input's scriptSig.
