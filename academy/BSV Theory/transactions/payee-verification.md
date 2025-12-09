# Payee Verification

> A payee can verify the signatures to verify the chain of ownership.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Transactions - Payee Verification.png>)

Each iteration of a coin contains a solution to the previously defined predicate. Typically, this includes a public key and a corresponding signature created using Elliptic Curve Digital Signature Algorithm (ECDSA) making it computationally trivial to validate the proof of ownership supplied with the given coin.

This is a crucial element of the peer to peer nature of the system as it means that a merchant can accept payments directly from users and validate their ownership claim without the need of a trusted third party using only information that can be validated against the network’s proof of work process.

This makes it possible for merchants to broadcast transactions to the network on behalf of users whose wallets can be used as very simplified applications which hold and sign digital coins but do not have an interface to the network. This also makes it possible for Bitcoin to be used with devices as simple as a smart card.

\\
