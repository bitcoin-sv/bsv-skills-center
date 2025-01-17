# The Coinbase Transaction

[https://player.vimeo. com/video/674782787](https://player.vimeo.com/video/674782787)

Every time a node generates a new block template, it must create a new coinbase transaction. The coinbase transaction has just one input which has an arbitrary string of up to 100 bytes for its scriptSig.

[https://player.vimeo. com/video/674786336](https://player.vimeo.com/video/674786336?h=c2405b019d\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

In 2010 a standard rule was added to the node client software which requires that the bytes of the string must be a varInt containing the block height. This came about because nodes had been generating identical coinbase transactions creating the issue of having multiple transactions with identical hashes/TXIDs. The remainder of the input string (up to 96 bytes) can be configured however the miner decides, and is often used to advertise the identity of the node to the rest of the network. At times this input has also been used to signal a node's intent to uphold new consensus rules being introduced to the protocol. However new, more administrative procedures have been implemented which remove the need for this type of communication.

While only a single input is allowed, each coinbase transaction can create as many outputs as the node operator wants, within the rules of the Bitcoin protocol. Because the transaction doesn’t need to be propagated outside of the node until the block is found, it is not subject to rules which would exclude it from transaction pools such as dust limits and must only adhere to Bitcoin’s immutable ruleset. The coinbase transaction can include FALSE RETURN outputs in the same way as normal transactions. The current implementation of MinerID allows nodes to identify themselves cryptographically by inserting a signature into a FALSE RETURN output in the Coinbase.

Importantly, outputs from the Coinbase transaction cannot be spent until there have been a further 100 blocks built on top of its containing block. This both acts as an incentive for miners to continue building blocks and ensures that a node operator cannot spend funds which might be involved in an orphan race. Most races are won within 2 or 3 blocks so 100 provides strong security for fund receivers without placing an undue burden upon the operators themselves.
