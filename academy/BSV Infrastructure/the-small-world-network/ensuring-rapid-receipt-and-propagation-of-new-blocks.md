# Ensuring Rapid Receipt and Propagation of New Blocks

Part of the incentive of developing the high bandwidth, high density connectivity at the center of the Bitcoin network is to enable miners to validate proposed new blocks from other miners in the shortest possible time frame. This is of vital importance that they validate it as quickly as possible, as energy that is spent trying to build upon the previous block in the chain is at a very high risk of being wasted if a block is found. A node wants to be able to receive a block that has been found as quickly as possible in order to conduct its own validation, which if successful will lead to them using it as the next block to build upon.

<figure><img src="../../../.gitbook/assets/Chapter 5 GIF 9 (1).gif" alt=""><figcaption></figcaption></figure>

Similarly, if the node finds its own valid solution, it needs a means with which to push the block announcement and corresponding transaction list out to every other node it is connected to. The goal is to ensure that the other nodes in the network become aware of their block as quickly as possible, ensuring that it has the best chance of being built upon and becoming part of the longest chain of proof of work.

This is one of the strongest drivers of the formation of the small world network at the core of the network.
