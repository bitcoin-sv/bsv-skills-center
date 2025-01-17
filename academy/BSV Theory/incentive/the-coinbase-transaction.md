# The Coinbase Transaction

> By convention, the first transaction in a block is a special transaction that starts a new coin owned by the creator of the block.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Incentive - The Coinbase Tx.gif>)

The first transaction in any block is called a ‘Coinbase transaction’. This transaction has by definition a single input which contains an arbitrary string of text up to 100 bytes long which nodes use to mark the number of the block in the chain and in some cases to identify themselves.

The transaction can have multiple outputs, the value of which when combined must be equal to or less than the block reward, which includes a distribution of coins and the fees collected from all of the transactions that have been added to that block.

If the node fails to include coins that are part of the new coin distribution or were given as transaction fees to the value of the coinbase transaction’s outputs, those coins are lost and cannot be recovered.

Learn more about the Coinbase here: [https://wiki.bitcoinsv.io/index.php/Coinbase](https://wiki.bitcoinsv.io/index.php/Coinbase)
