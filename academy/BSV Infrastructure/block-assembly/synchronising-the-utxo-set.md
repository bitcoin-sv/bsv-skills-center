# Synchronising the UTXO Set

[https://player.vimeo. com/video/674782249](https://player.vimeo.com/video/674782249)

Each time a Bitcoin transaction is created, transaction outputs are generated. Each one contains an amount of bitcoin, expressed as a quantity of satoshis, locked in its locking script, or scriptPubKey. Outputs that haven’t been spent are called Unspent Transaction Outputs, or UTXOs. All of the bitcoins on the ledger are held live in UTXOs, making it important for nodes to keep them in a rapid access memory (RAM) database. This record of all spendable Bitcoin forms a database referred to as ‘The UTXO set’. The global UTXO set holds every spendable transaction output which has not been used as an input to a transaction.

[https://player.vimeo. com/video/649539837](https://player.vimeo.com/video/649539837?h=a18d0371ae\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

The management of this set will become an increasingly complex task. Nodes already make strategic eliminations from the set including transaction outputs that are provably unspendable - e.g. [FALSE RETURN](https://wiki.bitcoinsv.io/index.php/False_Return) scripts.

When a node joins the network one of the first things it does is to perform an initial block download. This involves downloading and validating a complete set of all of the blocks in the longest valid chain of proof of work, and using the information contained within to reconstruct the state of the current UTXO set.

Inputs used by previously unseen transactions are validated against this UXTO set, so nodes must keep this up-to-date. If a node disconnects from the network, their first task upon reconnection is to rebuild the UTXO set by downloading and validating any new blocks, as well as any unconfirmed transactions.
