# Network - Assessment 2



1. Why do nodes always try to build on the longest chain?
   1. Nodes always attempt to build upon the longest valid chain of proof of work, as any new block discovered that is not built upon the longest valid chain-tip will not be built upon by competing miners.
   2. Nodes always try to build on the longest chain because if they don’t they will need to redo the proof-of-work for all of the preceding blocks of the alternative chain.
   3. Nodes always try to build on the longest chain because it has a greater block reward.
   4. Nodes always try to build on the longest chain because it contains the largest block rewards.&#x20;
2. What will happen if a block is not built upon?
   1. A chain-split occurs.
   2. The node operator will receive no reward for creating the block and the proof of work that was done to build that block will be wasted.
   3. Transactions contained within the block will be reversed.
   4. This can cause major confusion and requires user’s constant vigilance.
3. How does the cost of proof-of-work incentivize nodes to build on the valid chain-tip?
   1. The growing cost of proof-of-work means that only those with enough hash power can afford to solve blocks thereby creating a valid chain.
   2. Since the cost of proof-of-work is expensive, nodes seek to build on the chain with the least difficulty
   3. Since proof-of-work costs money, node operators are incentivised to build on the most valid chain-tip to minimise the risk of wasting money on a block that has either already been built upon, or surpassed by a competing valid chain-tip.
4. What happens if two competing versions of the next block are broadcasted simultaneously but reach other nodes in a different order?
   1. When nodes see two or more competing blocks, they will keep copies of each so that when the next block is announced they can quickly continue building on the newly extended chain tip for whichever happens to become the longest chain .
   2. Nodes will continue building on both chain tips simultaneously using the same hashpower.
   3. Nodes will stop building blocks and wait for one of the blocks to become orphaned.
   4. Nodes will choose whichever chain tip they believe is the most likely to be extended and ignore the other.
5. How do nodes know which blocks other nodes are working on and how does that help determine which chain they will build upon?
   1. Nodes do not need to know about what other nodes are building and instead build on all chains.
   2. Nodes are in constant communication with all other nodes which provide the details of the block they are building
   3. Nodes can monitor the network and scan for the details of the blocks that other nodes are building and choose which chain they will build upon based on this information.
   4. Nodes do not know about the blocks that other nodes are building and must instead choose a path based only on the valid blocks that it has received.

\
