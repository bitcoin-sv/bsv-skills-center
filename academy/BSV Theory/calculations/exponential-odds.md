# Exponential Odds

> Given our assumption that p > q, the probability drops exponentially as the number of blocks the attacker has to catch up with increases. With the odds against him, if he doesn't make a lucky lunge forward early on, his chances become vanishingly small as he falls further behind.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Calculations - Exponential Odds.gif>)

It is clear from this equation that as the attacker falls further and further behind, the chances of them ever catching the honest chaintip become much smaller as the honest tip is extended, making it exceptionally unlikely for an attacker with less capacity than the rest of the network to ever catch up.

The alternative is for the attacker to increase their hashing capacity to be equal to or greater than the rest of the network for the amount of time needed to catch and overtake the honest chaintip, however this assumes that the dishonest attacker has access to the necessary machinery to add that capacity to their own resources. Hashing machinery is highly application specific and requires a large investment to install and operate, making it unlikely that an attacker simply has the excess capacity available to them at any given moment.
