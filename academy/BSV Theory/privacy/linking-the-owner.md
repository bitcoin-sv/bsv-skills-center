# Linking the Owner

> The risk is that if the owner of a key is revealed, linking could reveal other transactions that belonged to the same owner.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Privacy - Linking the Owner.gif>)

If a user spends coins that it has received from third parties, or which were spent back to themselves as change, it becomes possible to trace some part of the chain of ownership back via the ledger. This risks exposing a user's financial activities to malicious parties who have an understanding of how to analyse the public ledger.

Mitigation strategies include the use of separate transactions in instances where the many inputs are each spent in completely separate transactions, thereby avoiding the possibility of linking the user to a group of coins.
