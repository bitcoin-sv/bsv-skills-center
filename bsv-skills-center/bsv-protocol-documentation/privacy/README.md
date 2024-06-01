---
description: >-
  The concept of identity and privacy have been highly misrepresented in
  relation to blockchain systems. We will investigate the concepts of
  confidentiality, and privacy in this section
---

# Privacy

A public blockchain defined by the Bitcoin whitepaper publishes transactions in cleartext on the ledger, which means that any information published as part of the transaction is available globally for anyone to read and use. This is a very different approach to privacy than what is traditionally done, especially when it comes to financial transactions. The whitepaper itself describes this concept as shown in the diagram below.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/IdentityAndPrivacy_Slide01.png" alt=""><figcaption></figcaption></figure>

The traditional privacy model obfuscates everything regarding identity and transacting intermediaries and entities. None of this information is made public to protect sensitive data from malicious usage.

In the Bitcoin protocol’s privacy model, as shown in the bottom half of the diagram, identities are firewalled and decoupled from the transactional data. This means that all of this information is to be stored in private databases just like it is done today for full data sets, including transactional data. But here, the transaction data is made public. This change and attributes provide a new way of building private systems while keeping the advantages of public blockchain’s openness and transparency features.

The example also annotates the example of a comparison made between information that is kept private and public in the case of a credit card payment transaction and the case where BSV Blockchain is used for a payment transaction.

Privacy and identity are highly important considerations in the blockchain world. This topic will examine both core concepts and how they fit within the blockchain ecosystem.

{% hint style="info" %}
Ownership requires identity. The white-paper specifies ownership rather than possession intentionally. The owner of the coin is capable of proving ownership, not by holding a key but through all of the standard methodologies that are used in proving ownership in law today. The new privacy model introduced by bitcoin does not remove identity, it isolates it and firewalls it away from the public.
{% endhint %}
