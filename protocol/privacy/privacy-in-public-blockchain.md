---
description: >-
  Blockchain publish information in cleartext publicly but still achieve
  exceptionally high level of privacy
---

# Privacy in Public Blockchain

Now that we've looked at the various aspects of identity and privacy in blockchain, let’s examine how these attributes are achieved when designing a blockchain system using its underlying capabilities and features.

The transactions in a public blockchain are not private as they are published on a public ledger in cleartext. It is done in this way in order to solve one of the biggest yet seemingly unsolvable problems of double spending with digital cash systems. By creating a system that publicly announces all transactions that can be viewed and analysed by anyone at will, any attempts to double-spend funds are identified and documented on an immutable public record.

**Does this mean the identity of the parties to a transaction are made public?**

Whilst a transaction contains the public keys of the transacting parties, there is no information specifically that could enable identification of the individuals to whom the keys belong.

Privacy is part of the core design and basic infrastructure of a UTXO-based blockchain, but care must be taken to ensure that it is maintained. If the ownership of keys is published publicly (on-chain or off-chain), the information present on the blockchain will no longer be private. But if the identity is protected and not exposed, this creates a private system.

Privacy on the blockchain is also governed by volume. The greater the number of transactions going through the network, the more private the network will be. If, for example, there are just 10 transactions it would be quite easy and relatively inexpensive to trace through the transactions compared to say a billion transactions which would make traceability very expensive.

When building applications, an analysis needs to be made on the usage requirement and how to achieve the required privacy.&#x20;

With data transactions, it is quite easy to achieve privacy by creating transactions with just enough funds to pay the fees for the transaction.

When transactions involve payment or script-based electronic contracts, use of a new key-pair will provide the required identity firewalling or any personally identifiable information. In addition, when the blockchain is being used for high value payments which could potentially expose information that, when tied in with other private details, could reveal ownership information to the public, it is advisable to split the keys into a sufficient number of small units such that it obfuscates details of the payment value.

These are some of the different options available to protect privacy on the blockchain.
