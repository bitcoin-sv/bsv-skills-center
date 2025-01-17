# Network - Assessment 3



1. What must be done in order for a tie between two competing chains to be broken?
   1. There can never be a tie between two competing chains in Bitcoin.
   2. The tie is broken once enough nodes from either chain can no longer afford to build blocks.
   3. A tie breaker occurs once the network splits.
   4. A tie breaker occurs as soon as a node finds a new block with valid proof-of-work, thereby extending one of the competing chaintips. The rest of the nodes on the network will immediately begin to build upon the longest chaintip.
2. &#x20;Why are competing blocks held and validated despite not being the first seen?
   1. Nodes are incentivised to be aware of all competing chaintips so that they can quickly change to a new block no matter which chain-tip it extends.
   2. This is a minor, yet unescapable flaw in Bitcoin.
   3. Because it is necessary to keep all records of activity even if they are incorrect.
   4. This is a part of the process in which the Bitcoin network reaches consensus.
3. &#x20;What is the incentive that pushes all nodes to be hyper-aware of new blocks being discovered.
   1. If a node is not aware of new blocks they may not catch double spend attempts.
   2. If a node takes too long to move to building on the longest chaintip, there is a high chance that the valid block they discovered on the competing chaintip is ignored by the rest of the network creating the potential for losses.
   3. If a node misses a block they will be banned from the network.
   4. Nodes are unable to build their own blocks without updated transaction information provided by new blocks being discovered.
4. Does a new transaction broadcast need to reach every node and what happens if it doesn’t?
   1. No, as long as nodes who represent a proportion of hashrate sufficient to win a block receive the transaction and place it into their templates, it will eventually be confirmed. There is no impact on the validity of the transaction or its immediate usability. It’s timestamp will reflect the moment when the block it is put into was found.
   2. Yes, if not a delay of up to a few hours can occur between blocks. This is rectified once the transaction reaches every node.
   3. Yes, If a transaction doesn’t reach every node then there exists a possibility that transaction is an attempt at double spending and therefore it will remain pending until every node is aware of it.
   4. No, even if a transaction does not reach every node it will still be confirmed although its timestamp will reflect a later block.
5. &#x20;If the node misses a block announcement and a block is built on top of that missed block what action should a node take?
   1. The node can quickly validate the updated list of block headers and request any information it needs to validate the blocks leading to the new chaintip.
   2. The node must resync the entire block history.
   3. The node can carry on without any action.
   4. The node must wait for the next block announcement.
