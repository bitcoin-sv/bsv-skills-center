# The Binomial Random Walk

> The race between the honest chain and an attacker chain can be characterized as a Binomial Random Walk. The success event is the honest chain being extended by one block, increasing its lead by +1, and the failure event is the attacker's chain being extended by one block, reducing the gap by -1.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

To analyse the outcome of such an attack, we can characterise the status of the two chain tips as a pair of competing processes, where each vie for leadership. Our gap is characterised as the number of blocks lead that the honest chain tip has and is increased by 1 every time an honest block is found, while being decreased by 1 every time a dishonest block is found.

The block discovery process is a pseudorandom function thanks to proof of work, so both honest and dishonest nodes are bound to the probabilities inherent in the proof of work process, requiring either party to perform a full network proof of work in order to extend or reduce the gap.
