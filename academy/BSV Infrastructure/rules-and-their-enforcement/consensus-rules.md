# Consensus Rules

The consensus rules are codified into the BSV node client software system and represent fixed and unchangeable rules applied across the network. These rules must be strictly adhered to in order for a node using the client to actively participate in the network governance process.

The immutable rules are a set of rules that define the format and constraints that transactions and blocks must follow. Making any changes to these rules could cause nodes to disagree on the nature of BSV. All agreements are enforced through application of proof of work by nodes in a process known as Nakamoto Consensus.

Since 2009, aspects of the protocol have been either changed or removed. The BSV philosophy is that where aspects of these rules have been changed in the past they should be returned to be as close to the original rules as possible and then “set in stone”. In some cases this has resulted in divergence with the original protocol including minor changes to the scripting language.

The only further changes needed are the return to the original difficulty readjustment algorithm and re-enablement of the last remaining script opcodes plus some spare opcodes if the need ever arises to allow changes to protect the security of the network. This could be things such as the addition of a new hash function or a more secure digital signature algorithm.

This section details the role of nodes in the network and also how nodes resolve any conflicts in agreement on the state of the blockchain. Nodes vote to enforce the rules used to build the blocks that make up the BSV public ledger and define an honest node as a node that seeks out the longest valid chain of blocks and applies proof of work to extend that chain.

Read more about Nakamoto Consensus here: [https://wiki.bitcoinsv.io/index.php/Nakamoto\_Consensus](https://wiki.bitcoinsv.io/index.php/Nakamoto_Consensus)

The following lessons will explore the consensus ruleset in detail.
