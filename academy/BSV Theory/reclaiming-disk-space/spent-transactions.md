# Spent Transactions

> Once the latest transaction in a coin is buried under enough blocks, the spent transactions before it can be discarded to save disk space.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Saving Disk Space - Spent Transactions.gif>)

When a UTXO is created in a transaction, the outputs that were spent as inputs to the transaction are consumed by the action, and cease to exist as live spendable tokens on the network. Once the transaction has been ‘mined’ into a block which the network has then expended work building upon, it can be said that the transaction record is immutable. This means that anyone with a copy of the transaction can prove that the transaction was created before the block timestamp.

Once the spent outputs from old transactions, that are referred to in the new transaction's inputs, have been made immutable, nodes are free to remove them from their copy of the block chain. They are not required for the process of creating new blocks and consume hard disk storage space. At this point, it becomes the responsibility of the people who made the transactions to keep their own copies of them. This can be managed through archive services, private storage and more.
