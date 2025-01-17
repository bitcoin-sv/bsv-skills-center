# Block Headers

> A block header with no transactions would be about 80 bytes. If we suppose blocks are generated every 10 minutes, 80 bytes \* 6 \* 24 \* 365 = 4.2MB per year. With computer systems typically selling with 2GB of RAM as of 2008, and Moore's Law predicting current growth of 1.2GB per year, storage should not be a problem even if the block headers must be kept in memory.&#x20;
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Reclaiming Disk Space - Block Headers.gif>)

The record of a block’s existence is its header. This is like the birth certificate of the subject of the family tree.  From the header, a node can see which block it builds upon, what time it was discovered and can validate the proof of work done by the node that discovered it. The contents of the merkle tree, which are all of the transactions that the block includes, are not part of the header and are not needed to prove the existence of a block whose transactions were validated by the network a long time ago.

Using the equations above, it becomes easy to see that the amount of data needed to store a full record of the chain of proof of work and the live UTXO set, plus a full set of all transactions from recently mined blocks is a much more efficient way to manage an operating node rather than having to store and manage transactions which will never again be referenced in the generation of a new transaction or block.

The list of block headers grows linearly at a rate of around 4.2MB per year while the capability of computing systems scales exponentially. This makes it possible for the system to scale to accommodate the needs of a global financial network and for end user wallets which only require this small subset of Bitcoin data to operate efficiently on consumer grade devices such as mobile phones or even embedded IoT systems.
