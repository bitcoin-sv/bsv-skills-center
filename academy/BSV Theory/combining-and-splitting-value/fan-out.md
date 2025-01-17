# Fan Out

> It should be noted that fan-out, where a transaction depends on several transactions, and those transactions depend on many more, is not a problem here. There is never the need to extract a complete standalone copy of a transaction's history.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - CombiningSplittingValue - Fan Out.gif>)

When a transaction is spending multiple inputs from multiple different transactions, the wallet does not necessarily need to know the full provenance of the input other than it’s transaction ID and index number. The network nodes perform the task of making sure that the inputs being spent do indeed come from valid transactions which have been or are in the process of being timestamped into a block, and that they have valid history leading back to their issuance. This removes the burden of chasing down a transaction’s history from the user.

The full history is only needed if a user wants to validate a coins history for their own purposes outside of the needs of the network. This may be through an application layer requirement or simply curiosity, but it is not a fixed requirement of using the network.
