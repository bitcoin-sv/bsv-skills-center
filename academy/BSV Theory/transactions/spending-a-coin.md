# Spending a Coin

> Each owner transfers the coin to the next by digitally signing a hash of the previous transaction and the public key of the next owner and adding these to the end of the coin.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Transactions - Spending a Coin.gif>)

Each UTXO is locked with a script commonly called a scriptPubKey. This scriptPubKey is a puzzle that defines a predicate. The spending party must provide a solution which allows the predicate to be solved with a ‘True’ or non-zero outcome.

When spending a coin, the owner (or their proxy) first constructs a message that includes:

* The identity of the coin or coins on the ledger (transaction ID and output index)
* Valid solutions to each of the locking scripts written onto the ledger when the coin or coins were created
* A new locking script for each of the outputs being generated in the transaction which tests a knowledge proof provided by the receiver to the spending party
* Other details including a locktime parameter and protocol version

Depending on the spender’s preference, some or all of this message is combined, and the resulting string hashed and used to generate an ECDSA signature using a keypair controlled by the spending party and specified by scriptPubKey contained in the input being spent. Once the transaction is complete, it is ready to be sent onto the network to be processed into a block.

Learn more about Bitcoin transactions here: [http://wiki.bitcoinsv.io/index.php/Bitcoin\_Transactions](http://wiki.bitcoinsv.io/index.php/Bitcoin_Transactions)
