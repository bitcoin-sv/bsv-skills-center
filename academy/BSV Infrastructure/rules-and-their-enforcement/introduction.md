---
coverY: 0
---

# Introduction

The first section took us through the directives outlined in the white paper for how nodes should operate the network. When looking closely at these directives, there has to be a way for each node to know that the transactions or blocks which they are receiving from other network peers are valid. This is done with a series of protocol rules which are enforced by the collective participants in the block building process.

Proposed transactions and blocks can be broadcast into the network from anywhere and can originate from a system that is honest or malicious. Transactions represent a request to inscribe new information onto the ledger including both arbitrary data used in higher order systems, as well as updated ownership information over BSV tokens, which can in turn themself, represent higher order tokens and exchangeable objects. Blocks represent a timestamping event across a topologically ordered collection of transactions and occur at a rate which is automatically controlled by node operators. Nodes work to ensure that only valid transactions and blocks are accepted onto the network. This is managed through a series of checks to ensure information presented in the protocol conforms to a certain set of rules. Each node applies the rules as part of its role in operating the network.

Broadly, the are broken down into the following rulesets:

* Consensus rules:
  * Block consensus rules
  * Transaction consensus rules
  * Script language rules
* Standard local policies:
  * Standard local transaction policies
  * Standard local script language policies
  * Standard local P2P network policies

Each event received by a node must be evaluated against these rule sets before being accepted or propagated to other nodes.
