# Block Subsidy Rule

The block subsidy will drop by half at a scheduled rate of every 210,000 blocks, starting with a subsidy of 5,000,000,000 satoshis per block from the genesis block, rounding down when sub-integer fractions are encountered.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 2.gif" alt=""><figcaption></figcaption></figure>

This rule defines the rate at which Bitcoins are released onto the network from the original issuance. This rule means that nodes who create blocks are rewarded Bitcoins which have not been previously circulated. It is the means by which the entire supply of Bitcoin is released onto the ledger. The subsidy distribution rate was codified in the first ever version of the Bitcoin client.

Nodes who try to issue extra bitcoins to themselves outside of this so-called ‘inflation schedule’ violate the rule that defines how many bitcoins are in existence and as such their blocks must be rejected as invalid. Nodes must adhere to this rule, or their blocks will be judged as invalid by the other participants in the network.

Interestingly, blocks which fail to reward tokens from the subsidy or tokens paid by transaction creators as fees to the winning miner are still considered valid, and the satoshi tokens which aren’t included in the final reward are withheld from circulation. While this is uncommon, it has happened in the past, collectively resulting in a cumulative loss of over 1000 Bitcoins since the network was first formed.
