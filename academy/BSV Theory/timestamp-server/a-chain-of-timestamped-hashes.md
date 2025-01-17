# A Chain of Timestamped Hashes

> Each timestamp includes the previous timestamp in its hash, forming a chain, with each additional timestamp reinforcing the ones before it.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Timestamp Server - Timestamped Hashes (1).gif>)

A block’s header must include the hash of the block upon which it is built. This ‘link’ forms a single chain of valid blocks leading all the way back to the very first block (the Genesis block) ever created using the system. A single block can have multiple child blocks which are built upon it, however only one of those children can become part of the permanent ‘longest chain’ of proof of work, further incentivising a strong connection between nodes who always want their own valid blocks to become part of the chain.

As blocks are added to the chain the cumulative proof of work built upon all the blocks preceding it is increased. In this way, as transactions age they become more secure through the proof of work applied to all blocks that come after.

This chain of proof of work forms a separate and distinct DAG from the transaction ledger commonly referred to as the Timechain or Blockchain. The contents of this chain are an immutable record of what took place on the ledger and the order in which it took place. Any transaction that contradicts an event (e.g. double spends an input) that has been recorded in a block which forms part of the chain is considered invalid and can never become a part of the longest chain of proof of work.

Transactions which appear in blocks that do not form part of the longest chain of proof of work and which either contradict transactions that do appear in the longest chain, or which never get included in the longest chain of proof of work are considered invalid and are effectively removed from the ledger.

Transactions that are validly created (e.g. not double spent inputs, valid script) may still end up being excluded from the longest chain of proof of work due to not being correctly broadcast or not paying enough of a transaction fee to be committed to the ledger. These transactions can persist in local versions of the transaction DAG however can never become a permanent part of the ledger and when lost from local memory are effectively erased.

Learn more about Bitcoin Blockchain here: [http://wiki.bitcoinsv.io/index.php/Block\_chain](http://wiki.bitcoinsv.io/index.php/Block_chain)

Learn more about Bitcoin Timechain here: [http://wiki.bitcoinsv.io/index.php/Timechain](http://wiki.bitcoinsv.io/index.php/Timechain)
