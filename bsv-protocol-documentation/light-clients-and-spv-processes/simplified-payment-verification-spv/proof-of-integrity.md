---
description: A lock can only be opened by its own key
---

# Proof of Integrity

The first two features of SPV were to verify the presence of transaction on the blockchain for the previous transaction, which created the UTXO being spent and the input UTXO containing a valid signature. But even if these two aspects are validated, there is still one more integrity check required, which is the integrity of the locking script for the digital signature performing the intended function. The locking script dictates the unlocking script, and it should contain the right requirement of a digital signature for the full integrity of the transaction.

Here the full integrity means that Alice is digitally signing the ownership of funds to Bob.

Let's view this in terms of these example scripts.

Previous transaction’s Locking Script:

```
OP_DUP OP_HASH160 <Public Key Hash> OP_EQUALVERIFY OP_CHECKSIG
```

Input (Unlocking) Script:

```
<Signature> <Public Key>
```

The locking script requests the spending input script to have a digital signature signing the funds from Alice to Bob (via the singing of public keys).

Let's take another example:

Previous transaction’s Locking Script:

```
OP_CHECKSIG
```

Input (Unlocking) Script:

```
<Signature> <Public Key>
```

As this example demonstrates, any valid pair of signature and public key will make the transaction valid. This breaks the integrity of the transaction in legal terms required by the digital signing process. So, Alice could not have been the intended recipient and the rightful owner of the funds from the previous transaction but is spending it because she can, and Bob potentially could have received stolen funds.

Another such script example is:

Locking Script:

```
OP_DROP OP_DROP OP_TRUE
```

Unlocking Script:

```
<Signature> <Public Key>
```

Any pair of strings will make the transaction valid, and the integrity of the digital signature is not protected.

To summarise, the integrity of the locking script is a critical element in proving the integrity of the published transaction. It's integrity is ensured by:

1. specifying the public key
2. explicitly requiring a digital signature

When the integrity of all three SPV processes are ensured, true peer-to-peer payments, that are secure and effectively instant, are possible.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/LightClientsandSPVInfastructures_Slide06%20(1).png" alt=""><figcaption></figcaption></figure>

SPV systems are applications that are quite small and basic and, although this example demonstrates a payment application, similar applications for data transactions can be built using the same concepts and ideas. These applications are called Light Clients and the infrastructure design is referred to as SPV infrastructure.

{% hint style="info" %}
Reference :

1. Inspired by Work done by nChain Researcher, Wei Zhang [https://medium.com/nchain/simplified-payment-verification-48ac60f1b26c](https://medium.com/nchain/simplified-payment-verification-48ac60f1b26c)
{% endhint %}
