---
description: Linked transactions and chain of inputs and outputs
---

# Transaction Flow

Let us look at a more realistic scenario of a transaction which involves spending of funds using digital signatures. Consider a timeline with three timestamps, t1, t2, t3, where transactions T1, T2, and T3 were recorded in blocks B1, B2, B3.

* Transaction T1 represents a transfer of funds from Alice to Bob; Alice has 51 BSV and transfers 50 BSV to Bob;
* Transaction T2 represents a transfer of funds from Bob to Carol; Bob has 50 BSV received from Alice and transfers 49 BSV to Carol.
* Transaction T3 represents a transfer of funds from Carol to Dave; Carol has 49 BSV received from Bob and transfers 48 BSV to Dave.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/TransactionLifecycle_Slide04.png" alt=""><figcaption></figcaption></figure>

{% hint style="info" %}
Funds are not actually transferred; rather, the ownership which is recorded on the blockchain ledger is transferred by destroying/burning the UTXO owned by one owner and creating a new UTXO with a new ownership associated with it. For simplicity, we will use the abstraction of transferring funds.
{% endhint %}

Alice, Bob, Carol, and Dave have their private-public key pairs as \[k\_pr A, k\_pub A],\[k\_pr B, k\_pub B], \[k\_pr C, k\_pub C],\[k\_pr D, k\_pub D] respectively.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/TransactionLifecycle_Slide05.gif" alt=""><figcaption></figcaption></figure>

The image above includes the following:

1. Locking script of T1 locks the fund transferred to Bob
2. Unlocking script of T2 unlocks the locking script of T1
3. Similarly, the locking script of T2 locks the fund transferred to Carol, and the unlocking script of T3 unlocks the locking script of T2

All Transaction Inputs are inextricably associated with the previous transaction, and all Transaction Outputs will contain details of the conditions which need to be satisfied for future spending. An easier way to understand this would be to view it as analogous to transferring fiat currency in the current financial ecosystem. When a conventional currency transfer occurs, there are two parts - the amount is debited from a payer's account and credited to a payee's account. In bitcoin, '_debited from_' (payer) details are contained in _Transaction Input_, and the details of '_credited to_' (payee) are included in _Transaction Output_. The difference here is that Transaction Inputs have information on the source of the funds. For example, consider transaction T2, where Bob transfers funds to Carol. Transaction Input of T2 will be associated with previous transaction T1, i.e., transaction via Bob received funds from Alice.

The output only contains the amount, so the next question is, how is the identity of the payee associated with the output?

A transaction output contains a lock on the funds by associating it with a specific public key of the recipient of funds. In other words, the payee's identity is associated with the public key and provided in the locking script. The fact that public keys are used for identifying the user, and a user can generate as many fresh public-private key pairs as they like enables pseudonymity in public blockchains like BSV. To spend the funds further, it becomes imperative to sign the funds using a private key. Hence, the public key and signature are included in the script as well as the operand to verify the signature. Once the digital signatures are used, they intricately bind the identity of the person with the funds.

For example, to make a payment transaction from one key pair to another. The key-pair provides a mechanism to demonstrate control of assets in the same manner as property rights, i.e., purchase records, invoices etc., are needed to prove ownership of funds locked with the key-pair. The Owner signs the funds to a new owner (owning the new key-pair) via a digital signature which is then added as a data element in the input script. It also locks the funds in the output to the new Owner’s public key which will in turn require the new owner to perform digital signing and hence irrevocably binding their identity again with the transaction recorded publicly on the blockchain.

{% hint style="info" %}
As such, it is very important to note that identity does exist in bitcoin.

White-paper : Identities are firewalled from the transactions, but it does not say that people are anonymous. The nature of pseudonymous exchanges requires identity. However, what you will see is that the public transaction chain is separated from the identity information. Those exchanging goods and services can also exchange identity.

Additionally, there are methodologies for cryptographic forms of proof that will link identity off-chain and out of the public eye while maintaining the integrity of any information. There is no longer a trusted third-party fiduciary with information about the individuals who were exchanging. There are requirements for identity to be maintained directly, but that is separate from third-party exchanges.
{% endhint %}
