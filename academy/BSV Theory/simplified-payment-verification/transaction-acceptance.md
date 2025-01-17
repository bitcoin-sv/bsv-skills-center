# Transaction Acceptance

> He can't check the transaction for himself, but by linking it to a place in the chain, he can see that a network node has accepted it, and blocks added after it further confirm the network has accepted it.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - SPV - Transaction Acceptance.gif>)

By being able to validate that the hash of the transaction itself (the TXID) can be probably shown to exist in a block that has been accepted and built upon by the network, a user can safely say that the transaction is valid.

This allows a user with a set of block headers to build a verifiable history of all transactions that are relevant to their needs and provides a clear and simple means to demonstrate that proof to other peers on the network. This is important for any application that builds upon information that is stored on the ledger and allows users to ensure that the information is valid and exists in a block.
