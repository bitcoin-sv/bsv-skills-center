---
description: >-
  Instant and real time transactions settlement made possible for the first time
  in a payment system
---

# Instant Payments

Another important feature of Simplified Payment Verification is confirmation of instant payments.

As described earlier, Bob uses the node to get a payment acknowledgement to ensure transaction's validity accepting it. This is where the node performs validation steps on the raw transaction involving validating the script that is present in the unspent UTXO and the signature that is provided by Alice and executing both the input and output script as described in [transaction-lifecycle](../../transaction-lifecycle/ "mention").

**Why is Bob able to trust the system for instant transactions?**

The answer to this lies in understanding what Bob is doing when he receives the transaction data and Merkle proof mentioned earlier.

#### Transaction Data

The transaction data that Bob receives has the raw payment transaction, the Merkle Proof of the previous transaction and the previous transaction itself.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/LightClientsandSPVInfastructures_Slide02%20(1).png" alt=""><figcaption></figcaption></figure>

<table><thead><tr><th width="186">Verification Step</th><th>Description</th></tr></thead><tbody><tr><td>Steps 1 and 2</td><td>Bob performs the checks locally</td></tr><tr><td>Step 3</td><td>Bob will interact with BHC as described in <a data-mention href="broken-reference">Broken link</a></td></tr><tr><td>Step 4</td><td>Bob uses Node to perform Signature validation</td></tr><tr><td>Step 5</td><td>Bob performs the check locally</td></tr></tbody></table>

As described above, steps 1,2,3 and 5 are performed locally by Bob, which means most of the error scenarios for an invalid transaction are performed locally by Bob, effectively making this process independent of any node.

Step 4 can also be done by Bob, however, he will need an additional component for running and executing script validation. The component comes as part of node software, and that is why in the above scenario, Bob delegates this check to miners, as even if Bob performs script validation locally, he is still dependent on nodes to provide a double spend check.

The signature present in the input is a digital signature. This is analogous to the signature required by merchants when accepting credit cards, where you are required to sign the receipt and match that signature with the signature present on the card. Digital signatures have been considered legally binding for more than a decade in most countries. Therefore, if the digital signature present in the transaction is valid, that can provide the required remaining trust in the transaction presented to the merchant (just like for credit cards), and this effectively can make payments safe and instantaneous.

{% hint style="info" %}
Verifiable linkage between the identity and the public key is needed, and checks can be done by the merchant according to regulatory needs (ex., For payments above a threshold, it is mandatory by law or regulation to provide the identity of the sender). The linkage is stored in data store providing the mapping of identity (stored off-chain) and keys (published on-chain) to preserve privacy.
{% endhint %}

**What happens when the digital signature is verified?**

Th following diagram provides a high-level illustration of the digital signing process.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/LightClientsandSPVInfastructures_Slide03%20(1).png" alt=""><figcaption></figcaption></figure>

This process comprises the following components (see [privacy](../../privacy/ "mention") for a more detailed description of the process):

* Signed message
* Digital signature
* Public Key

As illustrated in the previous diagram, the digital signature and public key are provided in the transaction input. The signed message is constructed by the information provided in the transaction and the Merkle proof (during the execution of the validation process). The message itself looks like this:

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/LightClientsandSPVInfastructures_Slide04%20(1).png" alt=""><figcaption></figcaption></figure>

The colours indicate the location of the information in the payment and previous transactions.\
An algorithm is used to carry out the processing and construct the message based on the Sighash flag value (All, none, single selection of Inputs and modifier, ANYONECANPAY).

In the diagram, the flag assumes the value -SIGHASH\_ALL | ANYONECANPAY.

As you can see, the constructed message requires not only the integrity of the previous transaction script but also the the UTXO amount. To ensure its integrity, it also takes the required fields from the current transaction. When this message is signed, this ensures not just the signature’s validity but also the integrity of the transaction outpoint being spent along with the current transaction’s validity.

Instant payment can be achieved if the verification of the signature is correct. In doing so, the message uses information from both the previous transaction as well as the current payment transaction, ensuring the integrity of the spending method. If Bob does this locally, he can be very sure of the payment and signature is valid, and he can accept it as safe. If he is delegating the signature validation node, then he has to wait to receive the response from the node before he can accept the payment as valid.

To summarise, verification of the digital signature requires the following:

* the message to be signed
* the signed message containing some data from the previous transaction i.e. the value and the locking script
* the integrity of the value and the locking script

The Simplified Payment Verification check can provide integrity for all the data in the previous transaction.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/LightClientsandSPVInfastructures_Slide05%20(1).png" alt=""><figcaption></figcaption></figure>

As the merchant, Bob can accept payment directly from Alice (peer-to-peer, possibly offline) and be confident that he will not be cheated by Alice by performing a Simplified payment verification process check.

This process is effectively instantaneous and with every payment being settled on the blockchain, safe and secure. The time taken to confirm payment contrasts with a traditional payment network where settlement can typically take anything from a few hours to several days.
