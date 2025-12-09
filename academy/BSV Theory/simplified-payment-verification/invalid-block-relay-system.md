# Invalid Block Relay System

> One strategy to protect against this would be to accept alerts from network nodes when they detect an invalid block, prompting the user's software to download the full block and alert transactions to confirm the inconsistency.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - SPV - Invalid Block Relay System.gif>)

This proposed solution would be to set up a system to alert user wallets who requested the longest chain of proof of work from the network that the longest chain they could download was in-fact a rejected dishonest attack chain. This gives them details of the earliest block in the invalid chain, details of the detected invalid transactions, and the details of the longest valid chain including the valid versions of any double spends inserted into the malicious chain.

This is a theoretical system to protect against a very theoretical but possible attack. User wallets using SPV to track valid transactions within a known set of keys can be tricked into following an invalid chain of proof of work, even for a short period of time.
