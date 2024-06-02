---
description: >-
  SPV Wallet sends received transactions to ARC for broadcast and Merkle path
  callbacks.
---

# 🌈 ARC

General presentation of the Arc transaction processor: [https://www.bsvblockchain.org/features/arc](https://www.bsvblockchain.org/features/arc)

ARC documentation: [https://bitcoin-sv.github.io/arc/#/](https://bitcoin-sv.github.io/arc/#/)

{% embed url="https://www.youtube.com/watch?v=4S86Q2B4F_0&feature=youtu.be" %}
What it's like using ARC as a developer
{% endembed %}

ARC Open API: [https://bitcoin-sv.github.io/arc/api.html](https://bitcoin-sv.github.io/arc/api.html)

{% swagger src="https://bitcoin-sv.github.io/arc/arc.json" path="/v1/policy" method="get" %}
[https://bitcoin-sv.github.io/arc/arc.json](https://bitcoin-sv.github.io/arc/arc.json)
{% endswagger %}

{% swagger src="https://bitcoin-sv.github.io/arc/arc.json" path="/v1/tx" method="post" %}
[https://bitcoin-sv.github.io/arc/arc.json](https://bitcoin-sv.github.io/arc/arc.json)
{% endswagger %}

{% swagger src="https://bitcoin-sv.github.io/arc/arc.json" path="/v1/txs" method="post" %}
[https://bitcoin-sv.github.io/arc/arc.json](https://bitcoin-sv.github.io/arc/arc.json)
{% endswagger %}

{% swagger src="https://bitcoin-sv.github.io/arc/arc.json" path="/v1/tx/{txid}" method="get" %}
[https://bitcoin-sv.github.io/arc/arc.json](https://bitcoin-sv.github.io/arc/arc.json)
{% endswagger %}
