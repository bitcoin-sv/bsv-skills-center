# Waiting For Confirmation

> We now consider how long the recipient of a new transaction needs to wait before being sufficiently certain the sender can't change the transaction. We assume the sender is an attacker who wants to make the recipient believe he paid him for a while, then switch it to pay back to himself after some time has passed. The receiver will be alerted when that happens, but the sender hopes it will be too late.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Calculations - Waiting for Confirmation.gif>)

To explore the probability of a receiver being defrauded, we look at the length of time it takes for both their transaction to be broadcast on the network, added to a block and built upon.

When a transaction is sent to the network, the rapid propagation that happens across the consensus network means that it is seen by almost all nodes within a couple of seconds.

This attack assumes that the malicious party is going to subsequently mine enough blocks to override the network’s original consensus on his own. To do this the attacker has to recruit a significant part of the network’s hashpower and direct them to hash against the alternative chain. Not only is this attack hugely expensive to execute, the problem for the attacker is that the consensus network can see that the blocks being introduced in the alternative chain have the double spend in them. This can lead to legally problematic outcomes for the node operator involved, especially if the double spend is fraudulent in nature.
