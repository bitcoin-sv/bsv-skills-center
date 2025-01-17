# Proof-of-Work Target Adjustment Rule

{% embed url="https://youtu.be/TpDb3BCCxTc" %}

The network will adjust the target for the difficulty of the Proof of Work needed for a valid block to maintain an approximate 10 minute block discovery rate.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 3.gif" alt=""><figcaption></figcaption></figure>

This rule defines how the network adjusts the target difficulty rate as the available resources being applied to proof-of-work increases over time. The discovery of a block is a pseudorandom process in which nodes compete to check as many combinations of nonce and block header to try to find a value which is equal to or less than a difficulty value that is algorithmically determined by the network. The system makes periodic adjustments to re-define the difficulty rate based on the period of discovery of previous blocks. In the original release of Bitcoin this value was calculated once every 2016 blocks, or approximately every 2 weeks. However, in 2017 the method of calculation was changed to one which recalculates the difficulty target after every block.&#x20;

There is a commitment from node operators to revert the network back to the 2016-block adjustment cycle from the original implementation. Because this is an immutable rule, this will require a network wide upgrade to take place in which all nodes will accept the modified consensus conditions simultaneously.
