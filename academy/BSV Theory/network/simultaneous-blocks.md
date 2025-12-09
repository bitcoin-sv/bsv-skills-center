# Simultaneous Blocks

> If two nodes broadcast different versions of the next block simultaneously, some nodes may receive one or the other first. In that case, they work on the first one they received, but save the other branch in case it becomes longer.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Network - Simultaneous Blocks.gif>)

Because nodes work simultaneously to solve proof of work on separate and distinct block templates, there is always a chance that when a node finds a block, a competing node will find a different valid block solution for their own template at or around the same time.

Nodes will always choose to work on top of the block they ‘saw’ first, where ‘seen’ means ‘received _and_ validated’ so there is an incentive for any node that discovers a block to broadcast it as fast as possible, and where possible to ensure that every other node on the network has copies of all of the transactions in its block. Without these transactions, the validation process takes a lot longer and the chance of other nodes choosing this block to build upon is reduced.

When nodes see two or more competing blocks, they will keep copies of each so that when the next block is announced they can jump across to the longest chain tip without having to re-do the block validation. Nodes are not typically made aware of which blocks other nodes are working on so must choose a path based only on the valid blocks that it has received.
