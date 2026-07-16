---
description: What data is sent between counterparties for SPV Payments?
---

# Data Models

There are two main data models used in SPV transactions. Firstly, the Merkle paths of transactions are contained

{% embed url="https://bsv.brc.dev/transactions/0074" %}
The Compound Merkle Path Format
{% endembed %}

<div data-full-width="true">

<figure><picture><source srcset="/.gitbook/assets/ScreenRecording2024-01-16at5.31.29PM-ezgif.com-effects.gif" media="(prefers-color-scheme: dark)"><img src="/.gitbook/assets/ScreenRecording2024-01-16at5.31.29PM-ezgif.com-video-to-gif-converter.gif" alt=""></picture><figcaption><p>BUMP format demo</p></figcaption></figure>

</div>

Secondly a list of BUMPs and transactions are serialized:

{% embed url="https://bsv.brc.dev/transactions/0062" %}
The encoding format for SPV Transactions
{% endembed %}

These formats are baked in to the ecosystem's core libraries such that they are easy to deal with across many applications.

{% embed url="https://github.com/bitcoin-sv/ts-sdk" %}
TypeScript SDK
{% endembed %}

{% embed url="https://github.com/bitcoin-sv/go-sdk" %}
Golang SDK
{% endembed %}
