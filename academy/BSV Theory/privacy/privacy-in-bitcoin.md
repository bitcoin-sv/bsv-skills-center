# Privacy in Bitcoin

> The necessity to announce all transactions publicly precludes this method, but privacy can still be maintained by breaking the flow of information in another place: by keeping public keys anonymous.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Privacy - Privacy in Bitcoin.gif>)

Because most outputs in Bitcoin are locked with a script requiring a knowledge proof, it isn’t possible to remove all information about the identity of the receiving party from the transaction. By virtue of the fact that information they provided to the payer is embedded in the transaction the transaction itself cannot be anonymous, so care must be taken by the receiver to retain their own privacy over the information in the script.

Even when the transaction is spent and the knowledge proof needed is written to the ledger, the user can still remain private by not publishing their details onto the ledger as part of the transaction. Both parties to a transaction can make separate records to ensure that any requirement to re-visit the transaction can be executed with accurate and full knowledge of the nature of the transaction.
