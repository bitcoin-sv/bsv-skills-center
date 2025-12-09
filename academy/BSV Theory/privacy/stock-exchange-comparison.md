# Stock Exchange Comparison

> This is similar to the level of information released by stock exchanges, where the time and size of individual trades, the "tape", is made public, but without telling who the parties were.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Privacy - Stock Exchange Comparison.gif>)

In the same way that stock exchanges keep private records of who exchanged with who and release a cleaned set of records containing only the price and size of each trade, so the Bitcoin ledger maintains a private tape of all records of exchange.

User wallets can build repositories of transaction data which can be kept in offline archives, or even stored on the ledger but importantly these records are completely separate to the actual transaction itself and could only be exposed through one of the users repositories being compromised.

In this way, not only is the issue of large centralised repositories of data solved by each user holding their own records, the ownership of transaction records is also transferred to the user. This vastly reduces the risk of hacks that expose the records of large numbers of users as now the hackers must compromise a separate system for each individual user’s records.
