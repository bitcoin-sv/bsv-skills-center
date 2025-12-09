# Conclusion Explained

> We have proposed a system for electronic transactions without relying on trust. We started with the usual framework of coins made from digital signatures, which provides strong control of ownership, but is incomplete without a way to prevent double-spending.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Conclusion - 1.gif>)

> To solve this, we proposed a peer-to-peer network using proof-of-work to record a public history of transactions that quickly becomes computationally impractical for an attacker to change if honest nodes control a majority of CPU power.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Conclusion - 2.gif>)

> The network is robust in its unstructured simplicity. Nodes work all at once with little coordination. They do not need to be identified, since messages are not routed to any particular place and only need to be delivered on a best effort basis. .
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](https://bitcoinsv.academy/storage/photos/1/Conclusion_0039-0044.gif)

> Nodes can leave and rejoin the network at will, accepting the proof-of-work chain as proof of what happened while they were gone.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Conclusion - 4.gif>)

> They vote with their CPU power, expressing their acceptance of valid blocks by working on extending them and rejecting invalid blocks by refusing to work on them. Any needed rules and incentives can be enforced with this consensus mechanism.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Conclusion - 5.gif>)

In this whitepaper, Satoshi has proposed a system that creates a system for managing control of custody via a global ledger which is stored as a series of time-stamped blocks that group valid transaction records together. The nodes who build the ledger compete in an honest competition where the highest performing nodes represent investments of several hundred million dollars at this point in time, this investment has a demonstrated history of exponential growth, and can be expected to grow much larger in the future.

They collaboratively construct the chain of blocks using a consensus model that requires nodes to be present and aware of the network at all times. The system requires constant participation which is managed by arranging nodes in a highly distributed yet densely connected small world network. Nodes can drop off the network and rejoin at will, and it remains robust.

Nodes follow the chain of blocks that they believe to be the honest and correct history of the network. When nodes see blocks that contain double spends, it is their prerogative to choose which chain they believe to be honest. This is typically the chain which contains the transaction that the node saw first, however nodes will jump forward if the rest of the network agrees that the other transaction was first.

Nodes are incentivised also to enforce the rules of the network using hashpower. This is a process that happens between nodes which have adequate hash to discover new blocks and can be used to manage all disputes on how the network should function.
