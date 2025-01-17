# Achieving Consensus

> In the mint-based model, the mint was aware of all transactions and decided which arrived first. To accomplish this without a trusted party, transactions must be publicly announced \[1], and we need a system for participants to agree on a single history of the order in which they were received.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Transactions - Achieving Consensus.gif>)

When the system is managed by a centralised party, the monitoring of which inputs are used in a transaction and their spent/unspent status is managed simply on a first seen basis.

In Bitcoin, the system has no such means for centralised decision making so each node must operate as a self-contained mint.

Public announcement of all transactions is critical to the sound operation of the system and provides the fastest means for participants in the competitive block building process to come to consensus on the order of events when a valid block is announced to the network. Without public announcement, every time a potential block is found, the discovering node must subsequently supply any missing transactions to the rest of the network which consumes time and resources, impacting its ability to operate as effectively and efficiently as possible.

The first seen rule and its application to both transaction and block announcements is a core element of the incentives that drive the construction of the infrastructure that underpins the Bitcoin network.
