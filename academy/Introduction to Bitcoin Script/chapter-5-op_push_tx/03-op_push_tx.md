# 03 - OP\_PUSH\_TX

OP\_PUSH\_TX is a scripting technique where the transaction script requires the user to submit a transaction pre-image as part of the solution.

Within the script, the pre-image is signed and then checked using one of Bitcoin's CHECKSIG opcodes (e.g. OP\_CHECKSIG, OP\_CHECKSIGVERIFY).

The SIGHASH flags applied to the signature can give you a means to check things such as total quantity of inputs and outputs, output script types and more. More detail on Sighash flags can be found [HERE](https://wiki.bitcoinsv.io/index.php/Sighash_flags).

There are different versions of the `OP_PUSH_TX` technique, but for the purposes of this module, we will use a simplified version known as 'Optimised OP\_PUSH\_TX'.

To simplify the calculation process, Optimised OP\_PUSH\_TX uses pre-set values for both the private key and ephemeral key, allowing OP\_PUSH\_TX to be executed with a script of less than 100 bytes.

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter5-Animation02.gif" alt=""><figcaption></figcaption></figure>
