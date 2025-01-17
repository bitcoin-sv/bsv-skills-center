# Timestamped Hashes

> The solution we propose begins with a timestamp server. A timestamp server works by taking a hash of a block of items to be timestamped and widely publishing the hash, such as in a newspaper or Usenet post \[2-5]. The timestamp proves that the data must have existed at the time, obviously, in order to get into the hash.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Timestamp Server - Timestamped Hashes.gif>)

A Bitcoin block consists of an ordered set of transactions which each validly spend existing unspent transaction outputs into new transaction outputs. The network considers each transaction to be a separate item or event, and builds the blocks as such, using the hashed transaction message as an input into the block’s own hash function.

When a node finds a valid block, each transaction is published as part of that block, and through the hash of the transaction message can be provenly shown to have existed at the time the block was found. Blocks are broadcast across the whole Bitcoin network and either accepted or rejected by the rest of the nodes in the competition. These broadcast events can be considered akin to the publishing of a notice on a publicly available bulletin board or website.
