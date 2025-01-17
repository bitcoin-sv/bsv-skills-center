# Coinbase Maturity Rule

Nodes may not spend the outputs of a Coinbase transaction in a block that is less than 100 blocks higher than the one the Coinbase appears in.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 8.gif" alt=""><figcaption></figcaption></figure>

This coinbase maturity rule ensures that a few things happen:

1. Node operators are prevented from using outputs from blocks that might be involved in orphan races to buy goods or services.
2. Nodes are incentivised to hash based on a 24 hour average price, reducing volatility on the hashrate being applied and keeping block discovery rates more constant.

This is an example of a constant rule which was applied to the system from the beginning. This is one of several such rules included by the creator which are held stable through consensus.
