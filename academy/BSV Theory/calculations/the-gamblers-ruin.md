# The Gambler's Ruin

> The probability of an attacker catching up from a given deficit is analogous to a Gambler's Ruin problem. Suppose a gambler with unlimited credit starts at a deficit and plays potentially an infinite number of trials to try to reach breakeven. We can calculate the probability he ever reaches breakeven, or that an attacker ever catches up with the honest chain, as follows \[8]:
>
> p = probability an honest node finds the next block\
> q = probability the attacker finds the next block\
> qz = probability the attacker will ever catch up from z blocks behind
>
> qz =     {   1     if p≤q }\
> { (q/p)z    if p>q }       &#x20;
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Calculations - Gambler's Ruin.gif>)

Because of the pseudo-random processes involved, we can see that the probability of an attacker regaining the lead is very strongly related to their own ability to perform proof of work. In a situation where they can perform proof of work equal to or greater than the rest of the network, there is a 100% chance they will eventually have the leading chaintip, however if their capability is less than the network, the chance of them ever catching up goes down with the square of the gap between the two chaintips, leading them to an ever increasing deficit against the rest of the network.
