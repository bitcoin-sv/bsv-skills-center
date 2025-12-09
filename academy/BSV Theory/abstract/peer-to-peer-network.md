# Peer-to-Peer Network

> We propose a solution to the double-spending problem using a peer-to-peer network.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Abstract - p2p network - 1.gif>)

Double spending refers to the act of signing a coin to create a transaction and submitting that transaction to the network before using the same coin to create a different transaction which pays to a different recipient, effectively spending the same coin twice.

This problem is solved in Bitcoin through the creation of a peer-to-peer network of nodes whose role it is to gather, validate and timestamp all of the transactions that take place. It is through this network that the double spending problem is addressed by accepting only the first-seen of such a pair of transactions.

The Bitcoin network is a global piece of infrastructure that is built by enterprises who compete for the right to extend the ledger by adding new transactions. Each transaction can only be processed once and inputs used in a transaction are consumed. Once a transaction has been submitted to the network, it is broadcast to all nodes within a few seconds making it almost impossible to perform double spends without the assistance of a fraudulent node.
