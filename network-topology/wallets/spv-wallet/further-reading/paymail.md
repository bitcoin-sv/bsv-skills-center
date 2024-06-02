---
description: A service discovery mechanism for counterparty communications over web APIs.
---

# 📬 Paymail

The TSC attempted to propose a standard formally, fixing some small aspect and stating that all capabilities were optional.

{% embed url="https://tsc.bsvblockchain.org/standards/paymail/" %}

Most implementations in the wild still follow the original spec found here:

{% embed url="https://bsvalias.org" %}

The SPV Wallet implements an extended Paymail capability set defined within the go-paymail package found here:

{% embed url="https://github.com/bitcoin-sv/go-paymail" %}
Go
{% endembed %}

{% embed url="https://github.com/bitcoin-sv/ts-paymail" %}
Type Script
{% endembed %}

The specific capabilities used by the SPV-Wallet are detailed in thier respective BRC documents:

{% embed url="https://bsv.brc.dev/payments/0028" %}

{% embed url="https://bsv.brc.dev/payments/0070" %}

