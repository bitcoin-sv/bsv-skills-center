# 06 - hashPrevouts

The composition of the hash of previous outputs field (hash\_prevouts) is dependent on whether the `SIGHASH_ANYONECAPAY` flag is used in the transaction pre-image. If `SIGHASH_ANYONECAPAY` is set to 0, this field is the SHA256 hash of the concatenated hash of the each outpoint being spent in this transaction, listed in 36 byte format (txid - 32bytes, vout - 4bytes). If `SIGHASH_ANYONECAPAY` is set to 1, only the outpoint that this input spends is signed, so the field is entered as a 32 byte null string.

<figure><img src="../../../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation05.gif" alt=""><figcaption></figcaption></figure>

#### Example: Put`hash_prevouts` on the top of the stack

In this example, we bring `hash_prevouts` to the top of the stack for further processing.

| Stack                                                 | Script             | Description                                      |
| ----------------------------------------------------- | ------------------ | ------------------------------------------------ |
| \<r\_tx\_preimg>                                      | ...                | Version field has been removed                   |
| \<r\_tx\_preimg>                                      | 0x20               | add Hash of Previous Outputs length to the stack |
| \<r\_tx\_preimg> 0x20                                 | OP\_SPLIT          | Split version from pre-image                     |
| \<hash\_prevouts> \<r\_tx\_preimg>                    | OP\_SWAP / OP\_NIP | Swap version to front, or drop if not needed     |
| \<r\_tx\_preimg> \<hash\_prevouts> / \<r\_tx\_preimg> | ...                | Script continues                                 |
