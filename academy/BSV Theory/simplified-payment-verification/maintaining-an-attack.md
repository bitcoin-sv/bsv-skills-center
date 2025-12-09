# Maintaining an Attack

> While network nodes can verify transactions for themselves, the simplified method can be fooled by an attacker's fabricated transactions for as long as the attacker can continue to overpower the network.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - SPV - Maintaing an Attack.gif>)

This strategy and the illusion of the invalid transactions appearing valid can only be maintained for as long as the attacking node can afford to maintain a majority of the network hash. As soon as the honest chain of blocks overtakes the dishonest chain, user systems will reject the invalid chain and jump across to the now longer valid chain, rendering the attacker’s transactions void and destroying the investment in the proof of work used to build the chain.

A dishonest attack of this form is enormously costly and must be conducted in a way that is fully visible to the public, making it extremely risky for the operators of dishonest nodes to participate in such attacks on the network’s validity. This **high economic** **cost** of attacking the network is part of the security model of Bitcoin and serves to strengthen the system against dishonest players.
