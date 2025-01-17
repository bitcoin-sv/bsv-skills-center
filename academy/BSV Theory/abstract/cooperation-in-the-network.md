# Cooperation in the Network

> As long as a majority of CPU power is controlled by nodes that are not cooperating to attack the network, they'll generate the longest chain and outpace attackers.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Abstract - CPU power (1).gif>)

One of the ways it is possible to attack the integrity of the ledger is for a node operator to include in a block a transaction that double spends coins that were previously spent, or to otherwise include a transaction in a block that is invalid per network rules. Honest nodes will recognise this rule violation and refuse to build new blocks that follow this invalid block. Instead they will build new blocks on top of it’s valid predecessor and create an honest competing chain. So long as the honest node controls more than half of the hash power the honest chain will become longer and signal to all network participants to ignore the invalid block.

As the attacker’s block is no longer recognised by the rest of the network the reward for creating the invalid blocks is also not recognised. As such the attempt becomes a significant cost to the attacking node, discouraging attempts at dishonest behaviour by making it very risky.

In this way, nodes use hashpower to enforce network rules. A node who publishes blocks that violate the rules waste the energy investment used to generate the valid proof of work, and will lose the pool of hash which voted for it. In this way, proof of work incentivises honest behaviour, creating a system where all nodes compete in a cooperative way to enforce the established network rules.
