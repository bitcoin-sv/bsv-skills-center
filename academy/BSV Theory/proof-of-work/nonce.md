# Nonce

> For our timestamp network, we implement the proof-of-work by incrementing a nonce in the block until a value is found that gives the block's hash the required zero bits.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Proof Of Work - Hashcash (1).gif>)

![](<../../../.gitbook/assets/image (3) (2).png>)

A **Nonce** is a ‘Number used ONCE’ and is the means by which the block header is iterated during the proof of work process. A section of the block header is changed by a small amount each time so that a new hash can be calculated from the number.

A **Hash** is a one-way function which takes a given input and produces a deterministic output. Someone given the output cannot reveal the input, but anyone with the input can verify its authenticity if its hash is public.

The hash machines take the block header and begin testing different message hashes by incrementing the 4-byte nonce value and re-hashing the message as many times as possible per second. A block is solved when a hash machine finds a nonce value that when combined with the block header creates a message that hashes to a value which is less than the difficulty target which is stored in the block header as a 4-byte floating point number.

Thanks to optimisations in hardware, most hashing machines can cycle through the approx. 4.3 billion different values the 32-bit nonce can represent in a matter of seconds, so further ‘Extra Nonce’ fields are used within the coinbase transaction to increase the amount of hashing each hash machine can perform on a given block template by causing a change to the merkle root.

Learn more about Nonce here: [http://wiki.bitcoinsv.io/index.php/Nonce](http://wiki.bitcoinsv.io/index.php/Nonce)
