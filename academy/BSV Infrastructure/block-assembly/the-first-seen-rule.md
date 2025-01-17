# The First Seen Rule

[https://player.vimeo. com/video/674783355](https://player.vimeo.com/video/674783355)

When a successful proof-of-work solution is found, the pool miner sends it back to the node to be checked and then broadcast to all other nodes on the network. It is imperative that this takes place as quickly as possible to minimise the chance of competing valid blocks emerging. In a situation where competing blocks are simultaneously discovered, the first seen rule is applied by each individual node and agreement on transaction history reached through Nakamoto consensus.

[https://player.vimeo. com/video/649540485](https://player.vimeo.com/video/649540485?h=c1f0487716\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

The first seen rule says that a node must take the first successfully validated block or transaction as the one upon which it will build its version of history.

### First Seen Blocks

The node considers the first seen block to be the first block that it receives and is able to validate. This means the first block which represents a set of transactions that are both valid and new (i.e. not in a previous block). The node uses this block’s hash as the ‘prevHash’ field in its new block template to signal consensus.

[https://player.vimeo. com/video/649540604](https://player.vimeo.com/video/649540604?h=a0e410dded\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

This creates an incentive for each node to minimise the amount of time it takes for other nodes to validate their blocks to reduce the chance of orphan blocks. Orphan blocks arise because proof-of-work continues on prior blocks while proposed new blocks are validated. If there is a delay in the validation of a block proposal due to needing to receive transactions that weren’t shared earlier from the proposing node, this period may allow for another node to present another valid proposal. This proof-of-work occasionally results in another valid block being proposed, which then competes for its place in the longest chain of proof-of-work.

### First Seen Transactions

The first seen rule is also applied to transactions entering the network. In this situation, it means that only the first seen transaction that uses a particular input is accepted. Any double spend transaction that re-uses an input is invalid, and any block that includes a double spend transaction would also be invalid.

[https://player.vimeo. com/video/649540659](https://player.vimeo.com/video/649540659?h=92a746491b\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

“Nodes accept the block only if all transactions in it are valid and not already spent.” - Bitcoin white paper, section 5\
