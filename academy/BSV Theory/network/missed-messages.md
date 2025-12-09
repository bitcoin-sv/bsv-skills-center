# Missed Messages

> New transaction broadcasts do not necessarily need to reach all nodes. As long as they reach many nodes, they will get into a block before long. Block broadcasts are also tolerant of dropped messages. If a node does not receive a block, it will request it when it receives the next block and realizes it missed one.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Network - Missed Messages.gif>)

In the rare situation where a transaction has reached some but not all of the nodes on the network, it only takes until one of the nodes that received it to find a block that includes that transaction. This has no impact on the validity of the transaction, or the immediate usability of its outputs accepting that the timestamp applied to its place in the blockchain would necessarily be some time later than the ideal ‘as soon as possible’. Transactions can be missed or omitted due to many factors such as a particular node’s own policies or a break in network communications between competing parts of the network.

Similarly, when a node misses a block announcement message, they will keep working on the chaintip they believe to be the longest. When another block is announced that builds upon the missed block, the node can quickly validate the headers against its own historical record and request any missing information regarding the new chaintip.

Nodes do not help other nodes, so missed messages are not repeated on the network. Nodes only broadcast information because they are incentivised to do so. Where other nodes miss out on receiving that information, it is upon the operators of those nodes to improve their infrastructure and connectivity to ensure it does not happen again. In this way, the network spontaneously builds robust and dense connections between nodes without the need for any centralised authority or design.
