# Attack Via Proof of Work

> The receiver generates a new key pair and gives the public key to the sender shortly before signing. This prevents the sender from preparing a chain of blocks ahead of time by working on it continuously until he is lucky enough to get far enough ahead, then executing the transaction at that moment. Once the transaction is sent, the dishonest sender starts working in secret on a parallel chain containing an alternate version of his transaction.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Calculations - Attack via Proof of Work.gif>)

In Bitcoin, typically payment details are handed out at the time of a transaction. The receiver gives the sender a Bitcoin address or script and the satoshis are transferred.

This means that the attack cannot be started any time prior to the transaction taking place.

Once the transaction has been sent, the attacker begins hashing an alternative chain that spends the same money they sent you to themselves instead. The attacker must then escape with the goods (making the attack impractical for anything that takes days to settle legally) before then releasing an alternative chain of blocks which includes their double spend and is longer than the one which the rest of the network is mining against.
