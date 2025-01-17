# Electronic Coins

> We define an electronic coin as a chain of digital signatures.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Transactions - Electronic Coin.gif>)

In Bitcoin, transactions are built by referencing unspent digital coins called ‘Unspent Transaction Outputs’ or “UTXOs” in transaction inputs. To be spent, the input must also include a solution to the script puzzle contained in the output which locks the satoshi tokens it holds. In almost all cases one part of this script puzzle requires a valid digital signature to be provided by the party that holds custody of the UTXO.

The tokens (coins) are spent into the transaction and redistributed into new unspent transaction outputs, consuming the UTXOs reference by the inputs in the process. In this way, a coin’s history can be mapped as a chain of valid script solutions or digital signatures. This chain leads all the way back to the blocks in which each of the Satoshi tokens being used in the transaction was first made accessible in the form of a coinbase reward.

This chain forms a Directed Acyclic Graph or DAG. The combined DAGs that represent the history of all UTXOs that currently exist on the network is what we refer to as the Bitcoin ledger.

Learn more about UTXO’s here: [http://wiki.bitcoinsv.io/index.php/UTXO](http://wiki.bitcoinsv.io/index.php/UTXO)
