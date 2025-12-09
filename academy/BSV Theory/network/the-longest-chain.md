# The Longest Chain

> Nodes always consider the longest chain to be the correct one and will keep working on extending it.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Network - The Longest Chain.gif>)

A node will always try to build on top of the longest valid chain of proof of work, as any block discovered on a block that is not at the longest valid chain tip will never be built upon by competing nodes. If a block is not built upon, the node operator receives no reward for creating the block and the proof of work that was done to build it would be wasted.

Because proof of work costs money, node operators are incentivised to always ensure that their nodes are working on the most valid chain tip, minimising the risk of money being wasted on a block that has either already been built upon or surpassed by a competing valid chain tip.
