# First Seen Rule

> We need a way for the payee to know that the previous owners did not sign any earlier transactions. For our purposes, the earliest transaction is the one that counts, so we don't care about later attempts to double-spend.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Transactions - First Seen Rule.gif>)

Bitcoin is a solution that solves the double spending problem without the need for a centralised decision making system through the use of the ‘First Seen Rule’. This rule states that the first seen transaction that validly spends a given UTXO is the transaction which is accepted by the node.

In a case where two conflicting transactions are introduced simultaneously onto the network which each seek to spend the same input coins to different output destinations, the one which reaches the network nodes which have been allocated the most hashpower stands to be the version of the transaction which is written into a block. The other transaction will never be accepted into a block and as such can never become a permanent part of the Ledger.

Additional protections can be implemented such as ‘Double Spend Notifications’ which detect and announce double spend attempts to peers on the network including merchants handling the double spends. Because a double spend must occur within a very short window (less than 5 seconds) it is very simple for online and physical merchants to reject transactions that are double spent or even attempted.

Learn more about Double spending here:  [http://wiki.bitcoinsv.io/index.php/Double-spending](http://wiki.bitcoinsv.io/index.php/Double-spending)
