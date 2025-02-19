# Digital Signatures and Trusted Third Parties

> Digital signatures provide part of the solution, but the main benefits are lost if a trusted third party is still required to prevent double-spending.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Abstract - DS - 1.gif>)

Digital signatures are a means for the owner of a coin on the ledger to establish their intent to use that coin in a transaction. Digital signatures work by generating a unique hash of the message and signing it using the sender’s private key. The hash generated is unique to the message, and changing any part of the message will completely change the hash thus rendering the digital signature invalid.

We use handwritten signatures on handwritten or typed messages to tie an identity to a message. Similarly, a digital signature is a technique that binds a person to digital data. This can be independently verified by the receiver. One of BSV's core innovations is that it allows for digital signatures to be validated without needing a third party who has knowledge of the identity of the transacting parties.

When the user builds a transaction, a highly flexible scripting language is used to define the conditions under which that coin can be spent. Incorporating signatures into these conditions using Elliptic Curve Digital Signature Algorithm (ECDSA), the signature type used in BSV, provides a means for the user or users to provably show they control a private key. This key is linked to a script based puzzle which the user provides when they receive the coin. To spend it, the user must provide the right script incorporating the necessary proofs to correctly solve the script. It is upon the peers participating in the transaction to determine its content, create the signatures and submit it to the network for validation.

While the transaction processors who log the transaction have no stake in the value of the BSV being exchanged, they are paid a transaction fee for the service of validating and recording the transaction. Because they are not a party to the transaction, they become a simple third party, to whom no trust needs to be given. Transaction processors are not required to record all transactions onto the ledger, but can choose to do so if the users attach a sufficient fee for them to consider it worthwhile and so long as the transaction is actually valid.
