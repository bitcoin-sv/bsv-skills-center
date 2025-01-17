# Breaking the Tie

> The tie will be broken when the next proof-of-work is found, and one branch becomes longer; the nodes that were working on the other branch will then switch to the longer one.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Network - Breaking The Tie.gif>)

As soon as a node finds a new valid block and one of the competing chaintips is extended, the rest of the nodes on the network will immediately begin working on top of the longest chaintip. It is important for all nodes that they have a means by which they can quickly change to the new block even if they were working on a different chain, which is why competing valid blocks are held and validated even if they were not the first seen.

The longer a node takes to move to the longest chaintip, the higher their chances of a valid block they discover on the competing chaintip being ignored by the rest of the network. This is the incentive that pushes all nodes to have a hyper-awareness of new block discoveries.

This process is usually minimally disruptive to users as the competing blocks almost always contain transactions from the same global set.
