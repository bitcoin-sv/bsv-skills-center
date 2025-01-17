# A Typical Example

> Normally there will be either a single input from a larger previous transaction or multiple inputs combining smaller amounts, and at most two outputs: one for the payment, and one returning the change, if any, back to the sender.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

In a typical Bitcoin transaction being conducted between two peers, the sending party will take either a single large coin or several smaller coins and spend them into one or two outputs. A payment into one output would mean that the aggregate value of all coins (minus processing fees) would correspond to the exact amount the receiver was expecting for the transaction.

When a coin or combination of coins cannot be found in the user’s wallet that makes an exact value as requested for the payment, the wallet creates a second output which is paid to another address from within the user’s wallet. It sends the overflow amount which was over and above the required payment value back to the sending party as ‘change’. This money is spent back into a script that the wallet knows how to spend and is immediately received back into the wallet’s balance as spendable funds.
