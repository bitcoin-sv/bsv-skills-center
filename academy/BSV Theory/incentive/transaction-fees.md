# Transaction Fees

> The incentive can also be funded with transaction fees. If the output value of a transaction is less than its input value, the difference is a transaction fee that is added to the incentive value of the block containing the transaction.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Incentives - Transaction Fees.gif>)

Nodes can also augment their income with transaction fees paid by users each time they make a transaction. These fees are paid by users creating transactions in which the combined value of the inputs is more than the value of the outputs. These tiny differences in value are aggregated by the nodes as they construct their block templates and paid out to the node operator in the coinbase transaction.

The more transactions that a node can fit into a block, the more earning potential it has through transaction fees. In this way, scaling the network can be seen as a way for node operators to improve their potential income.
