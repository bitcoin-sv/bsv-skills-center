# Dynamically Sized Coins

> "Although it would be possible to handle coins individually, it would be unwieldy to make a separate transaction for every cent in a transfer."
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Combining and Splitting Value - Dynamically Sized Coins.gif>)

Each time a bitcoin transaction takes place, one or more unspent transaction outputs are gathered into the transaction as inputs and spent into a new combination of outputs scripts. A Bitcoin transaction can handle as many or as few Satoshi tokens as are needed by the user and supported by network nodes.

Without this ability to merge and split outputs via a single transaction, the requirement to sign a new output for each satoshi in the transaction would make it economically unfeasible to manage the ledger. This approach gives the necessary balance required to manage bitcoins on the ledger without creating an undue burden through breaking down the outputs into arbitrarily sized pieces.
