---
description: >-
  We will look at the concept of possession of a key and how it is irrelevant to
  identity
---

# Keys and Identity

One of the most misunderstood aspects of blockchain is Identity. From the notion that possession of keys represents ownership to claims that Bitcoin allows anonymous value exchange, there has been many such assertions that has mislead not just the individuals but governments who are trying to regulate this technology. Let’s look at some of the concepts around this to analyse their validity and impact on designing systems to better understand how Identity and Privacy work in the world of Web3.

In the Account model every account is represented by an Identity. A common misconception is that the same applies to the UTXO model used in the Bitcoin protocol.

A UTXO is created when funds are locked to a Public Key infrastructure (PKI) key-pair. The logic was extended from legacy-based understanding that, since it stores funds, the key-pair becomes an identifier of its owner. This is not the case, as is illustrated in the example below.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/IdentityAndPrivacy_Slide02%20(1).png" alt=""><figcaption></figcaption></figure>

For Payment transactions (any type of transactions which focus on using BSV as payment method)

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/IdentityAndPrivacy_Slide03.png" alt=""><figcaption></figcaption></figure>

The above examples depict scenarios where data and payment transactions are made in hypothetical entities and where identity resides in these flows. It is not possible for anyone to determine who the transactions and funds belong to on the blockchain, unless someone publicly declares that they own a certain key (presuming they have some form of proof of ownership). But that again, is the same as a merchant storing KYC information; the record-keeping of identity is done off-chain and never on the blockchain.

Taking the analogy in the traditional account model where you deposit money in a bank account; this becomes a loan to the bank for a certain rate of interest that the bank pays to you. The bank stores your KYC information and can conduct enquiries to determine whether you have obtained it by valid means. ~~That means the bank validates that the money you deposit has been obtained using legally valid means.~~ When you transact the bank actually does that for you. This is called the bank acting in lieu of their customer.

The mere possession of a key does not give ownership. In the traditional banking system, knowing the password for accessing a bank account doesn't mean that you own money. If someone without authorisation does this they are legally conducting theft. In the same way, Similarly, if someone uses a key-pair which is not legally owned by them, they are ~~conducting theft~~ involved in theft and this will be evidenced using the proof that the funds were acquired from and who owns them. In the same way that having a copy of a house key does not provide you with ownership of a house, a key does not provide you with ownership of bitcoin.

{% hint style="info" %}
If you lose a key to a safe-deposit box, you can still gain access even if it’s a Swiss safe-deposit box. This requires not having a key to prove your identity but rather having other things to prove your identity. Keys don’t prove identity and they are not same as holding ownership. Holding the key to your car doesn’t mean that you own the car; the car registration documents which have your name provide you ownership of the car
{% endhint %}
