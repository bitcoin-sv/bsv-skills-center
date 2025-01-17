# Invalid Blocks

[https://player.vimeo. com/video/674783534](https://player.vimeo.com/video/674783534)

If a node proposes a block that fails validation tests, the proposal is ignored and other nodes continue trying to find a valid block which builds upon the previous valid block. A node may consider a block invalid due to numerous reasons including:

* The block fails a consensus rule (e.g. over size)
* The block awards the miner too many bitcoins
* The block contains an invalid transaction
* The block does not include a valid proof-of-work or timestamp

[https://player.vimeo. com/video/649540755](https://player.vimeo.com/video/649540755?h=bd759f10e5\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

In a situation where a node has submitted an invalid block, the block is rejected. If the node submits multiple invalid blocks, other nodes on the network may take additional steps such as blocking the node’s IP and refusing to share network information. Typically these ‘bans’ take place over a 24-48 hour period, and are intended to make node operators aware of repeated mistakes. Each node can set its own policy in this regard.

[https://player.vimeo. com/video/649540805](https://player.vimeo.com/video/649540805?h=0520f45f1a\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Importantly, there is a strong economic incentive (the wasted energy consumed for an orphaned proof-of-work solution) to always submit valid blocks to the network, and the system is designed to detect invalid blocks quickly and easily.

It is important to understand that nodes on the network are free to accept or reject blocks from any party for any reason. It is upon each node to ensure that they are aware of what the majority of nodes on the network have accepted as the valid chain of events. This is so that they can always be building on the longest valid chain of blocks and minimise resources used working on blocks the network will refuse to accept.
