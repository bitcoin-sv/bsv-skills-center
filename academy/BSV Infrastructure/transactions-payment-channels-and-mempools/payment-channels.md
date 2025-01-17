# Payment Channels

[https://player.vimeo. com/video/674765686](https://player.vimeo.com/video/674765686)

In transactions where nLockTime is set in the future, and one or more inputs have nSequence number fields less than 0xFFFFFFFF they are considered non-final and may be held in a [transaction pool](https://wiki.bitcoinsv.io/index.php/Transaction_Pools) until either nLockTime expires or all inputs have their nSequence finalised.

[https://player.vimeo. com/video/650024477](https://player.vimeo.com/video/650024477?h=61d0b75195\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Non-final transactions are replaceable with transactions that include the same inputs with a higher nSequence number. This property of non-final transactions means that they can be used to build _payment channels_, which allow for dynamic exchange of value and/or data between multiple parties.

Transactions where all inputs have maximal nSequence values (UINT\_MAX) but a future nLockTime can be timestamped in a block and have its outputs spent.

Initially, two parties may establish a payment channel, which is usually done by creating an on-chain funding transaction allocating funds to the channel. The two parties may then update the channel frequently by creating a non-final transaction which spends the channel funds, and iterating this transaction by updating it and increasing at least one of its nSequence numbers. The iteration/update process may happen many times before the channel is eventually closed by finalising and broadcasting the transaction. When the channel closes, only the most recent version of the iterated transaction is recorded on-chain.

When each new version of the iterated transaction is created, it should be compared with the previous version using the following rules:

* The same set of previous outputs are being spent by the transaction inputs
* None of those inputs have been submitted with a decreased nSequence number
* At least one input has an increased nSequence number

[https://player.vimeo. com/video/650024511](https://player.vimeo.com/video/650024511?h=420f60c1ca\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

These rules ensure that even parties who are unknown to each other can execute a payment channel to exchange value and/or data in a peer-to-peer fashion. A channel can be closed by finalising the nSequence values of the transaction or waiting for its nLockTime to expire. In either case, the transaction will be accepted by network nodes for inclusion in a block.

Payment channels form the basis for numerous services that can be built on Bitcoin, and represent a way by which a digital service can be delivered to a person using the same monetary instrument being used to pay for it.
