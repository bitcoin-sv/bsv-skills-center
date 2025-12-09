# Proposed Solution

> In this paper, we propose a solution to the double-spending problem using a peer-to-peer distributed timestamp server to generate computational proof of the chronological order of transactions.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Introduction - Proposed Solution.gif>)

One of the core innovations of the Bitcoin system is the way in which it prevents users from taking digital coins which have been used in a transaction and double spending them to a different party as a means to commit fraud by snatching the allocated funds from the Merchant’s wallet and re-allocating them back to their own wallet. Transactions are recorded as plaintext on the ledger and are readable by all parties.

As transactions are created, network nodes assemble them into block templates against which they perform proof of work computations. When a valid proof of work solution is found, the block becomes a proof of existence timestamp for all of the transactions it includes whilst establishing which, of any pair of conflicting (double spending) transactions, is accepted as first-seen and valid. Nodes append transactions to a block template in an order that closely matches the chronological order in which they were received.

This means each valid block represents a consensus driven agreement on the order in which events were recorded by the network. Blocks are added in chronological order and as more work is added to the chain of blocks, this serves as proof that transactions in a given block were validated and accepted by the network participants collectively prior to the time indicated in the block header.

Learn more about Proof-of-Work here: [http://wiki.bitcoinsv.io/index.php/Proof\_of\_Work](http://wiki.bitcoinsv.io/index.php/Proof_of_Work)

\\
