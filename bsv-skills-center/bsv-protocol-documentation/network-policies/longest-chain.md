# Longest Chain

The whitepaper defines the longest chain in the protocol:

> _Proof-of-work is essentially one-CPU-one-vote. The majority decision is represented by the longest chain, which has the greatest proof-of-work effort invested in it. If a majority of CPU power is controlled by honest nodes, the honest chain will grow the fastest and outpace any competing chains._

This description has often been understood as a system providing democratic rights to all participants in the network. However, this majority decision is not democratic. The nature of proof of work and the system's limitations don’t provide a majority decision for users but rather a majority for commercial nodes (block producers). It is not one vote per IP address or machine but rather one vote per unit of investment that decides the ordering of transactions.

Further error is to assume complete autonomy. The longest chain represents the majority decision, but the error assuming that each node must follow this is to ignore the right for a node to follow what the node operator sees as the longest chain of valid transactions. When a node believes the chain is invalid, the node operator can manually override the system and select the alternative chain. Consequently, the argument that a node must automatically follow the longest chain is invalid. Node operators decide what they believe is the honest chain and risk losing profit in the short term to ensure the honesty of the network, which increases their profit in the long term.

This is to specify that nodes always make a conscious decision of which chain they consider to be honest and to build upon.
