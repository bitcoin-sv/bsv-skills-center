---
description: Transaction Broadcasting from SPV Wallet
---

# 📣 Broadcasting

The SPV Wallet broadcasts all valid transactions it receives or creates to ARC.

{% embed url="https://github.com/bitcoin-sv/go-broadcast-client/" %}

## ARC Endpoints

We use the first endpoint to determine the correct fee model to use when creating a transaction.

{% swagger src="../.gitbook/assets/arc.json" path="/v1/policy" method="get" %}
[arc.json](../.gitbook/assets/arc.json)
{% endswagger %}

Thereafter we simply broadcast to ARC and expect a `SEEN_ON_NETWORK` txStatus response in most cases.

{% swagger src="../.gitbook/assets/arc.json" path="/v1/tx" method="post" %}
[arc.json](../.gitbook/assets/arc.json)
{% endswagger %}
