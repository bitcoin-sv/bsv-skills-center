# Scanning Random Space

> The proof-of-work involves scanning for a value that when hashed, such as with SHA-256, the hash begins with a number of zero bits. The average work required is exponential in the number of zero bits required and can be verified by executing a single hash.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Proof Of Work - Hashcash.gif>)

The proof-of-work process involves taking a block header which is arranged in a pre-defined format and using it plus a ‘nonce’ value (a nonce is an arbitrary number that can be used just once in cryptographic communication) as the message to be hashed. The node passes out block headers containing a hashed record of all the transactions the block includes plus a timestamp and a unique identifier to hash machines whose hashing power is being applied to solving its block.

Critically, validation of the proof of work is as simple as hashing the block header including the winning nonce value. Nodes do this before verifying the block’s contents to ensure they are working on a block solution which has been solved by a capable node.

Learn more about Block headers here: [https://wiki.bitcoinsv.io/index.php/Block\_header](https://wiki.bitcoinsv.io/index.php/Block_header)
