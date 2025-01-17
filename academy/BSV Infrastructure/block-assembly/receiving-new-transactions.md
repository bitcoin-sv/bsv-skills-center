# Receiving New Transactions

[https://player.vimeo. com/video/648433514](https://player.vimeo.com/video/648433514)

When a user wants to write a finalised transaction to the ledger, they broadcast that transaction to one or more nodes for processing. Each node validates the transaction against the consensus rules and the node’s set of local policies. If the validations are accepted, the transaction will end up in the node’s next block template to be timestamped once a valid proof of work is found. Each node typically broadcasts valid transactions to all other nodes, sometimes even if they do not plan to put them in a block. When a node detects that another node does not have transactions it has validated, there is an incentive to proactively send them.

[https://player.vimeo. com/video/649539878](https://player.vimeo.com/video/649539878?h=a1ac8efadd\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Thanks to the highly connected nature of the Bitcoin network, the transactions typically propagate to an overwhelming majority of nodes within a few hundred milliseconds. The first seen rule dictates that a UTXO can only be spent in the first seen valid transaction that spends it. This is a strong part of the protection against double spends by users, which are mostly accidental. Double spends performed by nodes are different and require a node to knowingly expend hash power, generating proof of work in order to override network consensus. This may be an illegal act and any node operator participating can be sanctioned by the rest of the network by having their blocks rejected. This is the function of Nakamoto consensus, allowing any needed rules and incentives to be enforced.

Read more about the first seen rule here: [https://wiki.bitcoinsv.io/index.php/First\_seen\_rule](https://wiki.bitcoinsv.io/index.php/First_seen_rule)
