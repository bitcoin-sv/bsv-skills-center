# The Only Thing an Attacker Can Achieve

> An attacker can only try to change one of his own transactions to take back money he recently spent.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Calculations - The only thing.gif>)

In this statement is the whole truth of a 51% attack, which is that an attacker is completely unable to make any permanent changes to consensus rules without creating and managing a completely separate consensus network, and that the only thing that can be achieved is that they would send money to a receiver, and then perform a 51% attack to have the original transaction removed from the network and replaced with another that spends funds into a script they control.

The attacker must do this in a completely public way so that all users of the network can see which transaction was double spent and identify the node which executed the attack.
