# Transaction Format Rule

Transactions must conform to the data formatting rules of the Bitcoin protocol, including respecting the sizes of certain fields and their encoding schemas.

The currently accepted versions of the Bitcoin transaction serialisation rules specify the format in a very specific manner, as outlined below.

1. Transaction version - A value defining the version of the protocol that should be used to evaluate the transaction (4 bytes).
2. The number of inputs being spent (VARINT (link this to [https://wiki.bitcoinsv.io/index.php/VarInt](https://wiki.bitcoinsv.io/index.php/VarInt) ), 1, 3, 5 or 9 Bytes).
3. Each of the inputs themselves which are each comprised of the following:
   1. TXID of the transaction containing the UTXO being spent (32 Bytes).
   2. The VOUT index of the UTXO (4 Bytes).
   3. A field defining the length of the unlocking script, or scriptSig (VARINT, 1, 3, 5 or 9 Bytes).
   4. The scriptSig needed to spend the input.
   5. The scriptSig’s sequence number, which is used in the creation and use of payment channels (4 Bytes).
4. The number of outputs being created (VARINT (link this to [https://wiki.bitcoinsv.io/index.php/VarInt](https://wiki.bitcoinsv.io/index.php/VarInt) ), 1, 3, 5 or 9 Bytes).
5. The outputs themselves which are each comprised of the following:
   1. The value in satoshis being locked into the output script (8 Bytes).
   2. A field defining the length of the scriptPubKey (VARINT, 1, 3, 5 or 9 Bytes).
   3. The output scriptPubKey or locking script.
6. nLockTime which is the time at which the transaction outputs can be spent. If the transaction has an input with a non-final sequence number and an nLockTime in the future, it is considered to be inside a payment channel. These transactions cannot be included in a block until the sequence number is final or nLockTime expires, either of which closes the payment channel. The transaction can be updated by submitting a new valid version with an increased nSequence value for at least one of the non-final inputs

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 9.gif" alt=""><figcaption></figcaption></figure>

While these rules are rigid and uniformly applied across all current transaction versions, there is significant flexibility within the rules. The hard limits imposed by the protocol itself allow for a transaction to create up to 2^64 outputs, with each output able to express a length field large enough to insert up to 18 Exabytes of data. These limits are theoretical of course, with limitations on actual usage being framed by the economic reality faced by nodes in the operation of the system.
