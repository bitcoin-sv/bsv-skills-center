# Merkle Branches

> A user only needs to keep a copy of the block headers of the longest proof-of-work chain, which he can get by querying network nodes until he's convinced he has the longest chain, and obtain the Merkle branch linking the transaction to the block it's time stamped in.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - SPV - Full Merkle Branches.gif>)

In a similar fashion to how nodes can store a pruned selection of transactions in their copy of the block chain, a user can store only a highly curated section of transactions using much the same technique, except instead of starting with the full copy of the block chain and selectively removing transactions, the user starts with a copy of the block header list which can be easily verified through Proof of Work, and selectively _adds_ only the transactions which they directly are interested in.

Going back to the analogy of a family tree, this is the ability of someone with the details of an original parent and the middle generations of the family tree can prove that they are linked to the subject. When handling these transactions, they can be a very small number as would be required by a user of a wallet or app, or a larger set comprising millions of transactions, but which is a minority subset of the overall ledger.

Looking at our family tree example, each original parent needs only to keep the path back to the subject’s identity. The family path can be requested from archive systems which keep the full family tree.

Each transaction can be proven to exist within a real block on the block chain through the Merkle Branches which connect the hash of its transaction ID all the way back up to the Merkle Root which is contained within the block header. If the transaction can be proven to exist in a block, it can be shown that a node accepted it as a valid transaction written to the ledger and time stamped with other nodes agreeing by building further on top of the block the transaction was contained in.
