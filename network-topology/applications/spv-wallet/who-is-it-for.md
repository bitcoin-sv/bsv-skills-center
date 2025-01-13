---
description: >-
  Those who want to validate their own transactions rather than all network
  transactions
---

# Who is it for?

{% tabs %}
{% tab title="Exchanges" %}
SPV Wallet can be used in place of the BSV Blockchain node software to validate transactions and make outbound payments.

Accepting payments in this way is better for compliance purposes because your server communicates directly with counterparties. This allows KYC and AML data to be validated prior to any payment negotiations, domain specific controls, and many configurable options to meet requirements in your jurisdiction.

Running SPV Wallet in place of a full node leads to significant cost savings. This saving is due to the disparity between relevant transactions for the exchange, and overall network transaction volume. The average transactions per second settled on BSV Blockchain has been trending up rapidly for the last few years and is expected to skyrocket as we go forward. This will inevitably drive up costs for full node operators, and raise the corresponding demand for SPV Wallet solutions.
{% endtab %}

{% tab title="Wallet Providers" %}
For existing wallet providers, SPV Wallet is simply a demonstration of the validation functions and data models which allow for safe instant transactions. The payment protocols should be broadly compatible with what most wallet operators are already doing, providing a simple extension to existing Paymail standards.&#x20;

Previous attempts have been made to put forward SPV components, but never a functional wallet which is compatible with the existing ecosystem.

The SPV Wallet code is all open source - available to lift and modify for your own purposes, or transcribe into your preferred programming language. These functions are being built into open source libraries which we encourage you to incorporate into your own systems.
{% endtab %}

{% tab title="Businesses Running BSV Applications" %}
Whether you are active in the supply chain, healthcare, finance, or public sector areas, you may need to add wallet capabilities to your application.&#x20;

By installing your own SPV Wallet instance you can use it plug-and-play for your application. That way you will be able to leverage the benefits of other BSV infrastructure components accessible through SPV Wallet and be aligned with the latest industry and BSV standards, improving the robustness and security of your business.
{% endtab %}
{% endtabs %}

&#x20;
