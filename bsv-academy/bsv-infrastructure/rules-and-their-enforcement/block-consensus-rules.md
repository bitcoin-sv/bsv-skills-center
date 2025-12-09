# Block Consensus Rules

## Block Size Rule

When a block is found, there is an economic limit applied to the block size, which is imposed by nodes on the network. This allows nodes to reach consensus on behavioural limits of the network. This limit is set to a large multiple of typical demand.

The size of a block is the size in bytes of the serialised form of the block, including the block header and all of the transactions it includes.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 1.gif" alt=""><figcaption></figcaption></figure>

This rule is a configurable consensus rule meaning that node operators set the limit. As a group, they are expected to reach consensus on this value and configure it manually.

There is no default value for this setting, and the current BitcoinSV node client software will not start without the operator setting a value. Nodes that are configured with different values to the rest of the network risk having their blocks rejected, or rejecting blocks that other nodes accept, leaving them stuck working on a nonviable chain-tip.

## Block Subsidy Rule

The block subsidy will drop by half at a scheduled rate of every 210,000 blocks, starting with a subsidy of 5,000,000,000 satoshis per block from the genesis block, rounding down when sub-integer fractions are encountered.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 2.gif" alt=""><figcaption></figcaption></figure>

This rule defines the rate at which Bitcoins are released onto the network from the original issuance. This rule means that nodes who create blocks are rewarded Bitcoins which have not been previously circulated. It is the means by which the entire supply of Bitcoin is released onto the ledger. The subsidy distribution rate was codified in the first ever version of the Bitcoin client.

Nodes who try to issue extra bitcoins to themselves outside of this so-called ‘inflation schedule’ violate the rule that defines how many bitcoins are in existence and as such their blocks must be rejected as invalid. Nodes must adhere to this rule, or their blocks will be judged as invalid by the other participants in the network.

Interestingly, blocks which fail to reward tokens from the subsidy or tokens paid by transaction creators as fees to the winning miner are still considered valid, and the satoshi tokens which aren’t included in the final reward are withheld from circulation. While this is uncommon, it has happened in the past, collectively resulting in a cumulative loss of over 1000 Bitcoins since the network was first formed.

## Proof-of-Work Target Adjustment Rule

The network will adjust the target for the difficulty of the Proof of Work needed for a valid block to maintain an approximate 10 minute block discovery rate.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 3.gif" alt=""><figcaption></figcaption></figure>

This rule defines how the network adjusts the target difficulty rate as the available resources being applied to proof-of-work increases over time. The discovery of a block is a pseudorandom process in which nodes compete to check as many combinations of nonce and block header to try to find a value which is equal to or less than a difficulty value that is algorithmically determined by the network. The system makes periodic adjustments to re-define the difficulty rate based on the period of discovery of previous blocks. In the original release of Bitcoin this value was calculated once every 2016 blocks, or approximately every 2 weeks. However, in 2017 the method of calculation was changed to one which recalculates the difficulty target after every block.

There is a commitment from node operators to revert the network back to the 2016-block adjustment cycle from the original implementation. Because this is an immutable rule, this will require a network wide upgrade to take place in which all nodes will accept the modified consensus conditions simultaneously.

## Genesis Block Rule

Only blocks that add to the block chain formed by building upon the Genesis block are valid.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 4.gif" alt=""><figcaption></figcaption></figure>

This rule states that blocks must be added to an unbroken chain of proof of work leading back to the genesis block, which has its block hash hard coded into the Bitcoin node client’s software. This prevents a malicious party somehow creating a new chain in order to perpetrate a malicious redirection of hashpower or economic activity, and is an important aspect of Simplified Payment Verification, allowing users to check they are using the correct chain of blocks with minimal overhead.

The genesis block is identified using its block hash which is **000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f**. By ensuring all users of the network are aware of this block hash, there can be certainty around which chain of blocks is valid. If a user or node connects to a chain of blocks which leads back to a point of origin that is not the genesis block, it can know immediately that it has connected to the wrong network.
