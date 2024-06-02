---
description: Paymail Capability Extensions
---

# Payments Flow

The SPV Wallet uses Paymail capabilities to publicly reveal their ability to interpret SPV transaction data.

{% hint style="info" %}
#### What is Paymail?

It's a service discovery mechanism for counterparty web APIs. It allows users to pay something which looks like an email address, but under the hood resolves a specific endpoint for a wallet to use for payment negotiation.\
\
<mark style="color:yellow;">**user@domain.tld**</mark> -> _<mark style="color:blue;">https://domain.tld/api/some/specific/endpoint</mark>_
{% endhint %}

### Sequence Diagram

<div data-full-width="true">

<figure><picture><source srcset="/.gitbook/assets/swimlanes-43c7c4ee01b286fea3be26b28804e591%20(1).png" media="(prefers-color-scheme: dark)"><img src="/.gitbook/assets/swimlanes-43c7c4ee01b286fea3be26b28804e591.png" alt=""></picture><figcaption></figcaption></figure>

</div>

### Capability Specifications

Further details on exactly how these requests and responses should be formulate are defined in these BRC documents:

{% embed url="https://bsv.brc.dev/payments/0028" %}
Getting Outputs to Pay To
{% endembed %}

{% embed url="https://bsv.brc.dev/payments/0070" %}
The Paymail Capability for Delivering SPV Transactions
{% endembed %}
