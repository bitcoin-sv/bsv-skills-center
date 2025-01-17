# Linking Inputs

> Some linking is still unavoidable with multi-input transactions, which necessarily reveal that their inputs were owned by the same owner.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Privacy - Linking Inputs.gif>)

When a user creates a transaction that aggregates multiple inputs to pay one larger output, the coins that are used in that transaction can be traced back as likely belonging to a single owner (although this is not guaranteed). The record on the ledger is not enough on its own to identify that user, however it is possible for anyone with specific knowledge of the transaction to show that the inputs used may have belonged to the spending party.

Where possible wallets can avoid this by always spending a larger output than the payment itself, however this is not always possible and transactions that aggregate coins are required.
