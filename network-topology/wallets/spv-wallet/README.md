---
description: Open-source non-custodial hosted wallet for the BSV Blockchain
layout:
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
---

# 📖 SPV Wallet

## What is it?

* **Open Source Non-Custodial Hosted Wallet**
* **Compatible with Existing BSV Ecosystem**
* **Reference Implementation for Simplified Payment Verification**
* **Maintained by the BSV Association**
* **100x Cheaper to run than a node**

SPV Wallet is an open-source, non-custodial hosted wallet that seamlessly integrates with the existing BSV Blockchain ecosystem. It serves as a reference implementation for Simplified Payment Verification, ensuring a secure, efficient, and user-friendly experience.

Developed and maintained by the BSV Association, SPV Wallet is designed to be cost-effective and accessible. It is 100x cheaper to run than a full node, making it an ideal solution for businesses who want to participate in the BSV network without being miners themselves.

In the following sections, we will delve into the technical details of SPV, explain how it works, and provide step-by-step instructions for setting up and using the wallet. Join us on this journey as we explore the future of Bitcoin SV with SPV Wallet, and discover a new way to manage your digital assets securely and efficiently.

***

## Benefits

### **Secure**

{% hint style="success" %}
Transactions are verified instantly using SPV, network approval is obtained within 5 seconds, and proof of inclusion obtained as soon as they're mined.

The non-custodial model allows private keys to remain broadly distributed, reducing the incentive to attack, protecting user funds.
{% endhint %}

### **Scalable**

{% hint style="success" %}
Address based payments require recipients to filter through all transactions to find relevant ones. This requires global indexing which has proven difficult to scale.

The SPV approach circumvents this entirely by enabling counterparties to communicate directly with no external factors limiting scalability.
{% endhint %}

### **Cost Savings**

{% hint style="success" %}
Operational cost is proportional to use rather than to overall network transaction volume. This is achieved by keeping block headers, ignoring external transactions, and using Merkle proofs.

In addition, the BSV Association will actively support the open source software through the upcoming network topology shift towards Overlay Networks and Teranode. This will externalize maintenance costs for businesses using the open source software.
{% endhint %}

### **Legal**

{% hint style="success" %}
With direct transmission between counterparties, you get SSL certificates, IP addresses, PKI signatures, and payment metadata on your terms. Regulatory compliance is easy when considering KYC, AML, or Travel Rule requirements, all without compromising user privacy
{% endhint %}

***

### **"LiteClient" has been replaced by "SPV Wallet"**

{% hint style="info" %}
The term was often misunderstood since there are multiple components to a complete system and it wasn't clear whether one component was the LiteClient or whether the whole system was. There are multiple clients and servers in this collection of tools which forms the SPV Wallet.
{% endhint %}
