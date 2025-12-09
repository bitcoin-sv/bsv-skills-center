# Encouraging Honesty

> The incentive may help encourage nodes to stay honest.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Incentives - Encouraging Honesty.gif>)

Nodes make their income through the coins they award themselves in the coinbase transactions of valid blocks. The network has a rule that prevents coinbase rewards from being spent until 100 blocks have been built on top of the block in which they were awarded, meaning that without the support of the majority of competing nodes building on top of the block that contains it, a coinbase reward might never become a permanent part of the ledger, rendering the coins it contains unspendable.

For a node to create a block with dishonest activity such as a double spent transaction output or extra coinbase rewards, the rest of the network would have to collectively support their dishonest behaviour, investing proof of work and building upon the dishonest actions taken.

Node operators are diverse and have headquarters in many different nation states. They are largely enterprise level organisations who pay taxes and are beholden to the laws applicable in the country where they reside.

Actively spending money on work to build upon a block containing knowingly fraudulent activity is highly risky for an individual node, and if perpetrated by a collective majority of network actors would represent an existential threat to the network and their livelihoods thus creating a powerful incentive for all nodes to protect the integrity of the system. Importantly though it would be highly visible that this was happening to the entire world.
