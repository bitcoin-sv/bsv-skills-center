# Attacking the Longest Chain

> To modify a past block, an attacker would have to redo the proof-of-work of the block and all blocks after it and then catch up with and surpass the work of the honest nodes. We will show later that the probability of a slower attacker catching up diminishes exponentially as subsequent blocks are added.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Proof of Work - Attacking The longest chain.gif>)

Thanks to the cumulative nature of Bitcoin’s proof of work process, it can be shown that for an attacking node to overwrite a particular block or record which has already been built upon by the honest operators on the network, they would first have to create a competing block. This block includes or excludes the information targeted by the attack before creating a new chain of blocks that is longer than the existing chain of honest blocks being built upon by the network.

In order to uphold the fraud, the dishonest nodes must now also perform enough proof of work to generate new blocks at a rate that exceeds the generation of the honest blocks for as long as they require to perpetrate their fraud. They must do so in a way that is completely public, exposing their dishonesty to the entire world and leaving a direct trail to their system for law enforcement to follow.

It should be noted that as the requirement for proof of work grows with the size of the network as a whole, the operation of a node leaves a larger and larger footprint that becomes near impossible to hide. Thus, further disincentivizing dishonest behaviour to the ease of identifying the dishonest actor.

In a subsequent section of the whitepaper, Satoshi uses mathematics that show the difficulty of creating and maintaining a competing dishonest chain, which we will cover in a later section of this module.
