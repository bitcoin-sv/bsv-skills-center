# The Honest Chain

> If a majority of CPU power is controlled by honest nodes, the honest chain will grow the fastest and outpace any competing chains.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Proof of work - the honest chain.gif>)

As long as more than half of the CPU power used to perform proof of work is controlled by honest nodes, the honest chain will remain the longest chain and the most easy to follow chain by the users of the network. This is true even when a chain tip is extended by nodes who use their hashpower to accept a set of dishonest transactions, or to enforce rules that go against the will of the honest nodes in the system.

Importantly, while a set of dishonest nodes is able to extend their chain faster than the cumulative effort of the honest nodes in the system, their chain will have the appearance of representing the longest chain of proof-of-work to casual users of the network. However, for the dishonest nodes to maintain their lead and retain the longest chain they must continuously perform proof-of-work at a rate equal or greater than that of the honest chain for an indefinite period.

This strategy is **extremely** costly to pursue. This shows that the network incentivises honest behaviour by allowing honest nodes to continuously work without the need to aggregate resources to pursue a dishonest end.
