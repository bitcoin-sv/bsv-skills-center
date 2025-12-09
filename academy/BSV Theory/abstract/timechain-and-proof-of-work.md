# Timechain and Proof-of-Work

> The network timestamps transactions by hashing them into an ongoing chain of hash-based proof-of-work, forming a record that cannot be changed without redoing the proof-of-work.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Abstract - Timechain.gif>)

The word Time chain can be used to refer to the nature of the Bitcoin block chain as a chain of time stamped events in history. As transactions are received into the network, nodes capture and collate them into logs. These logs, or ‘blocks’, are made up of a timestamp applied to a sequential list of transactions and represent a consensus agreement of the proof of both existence and validity of all the transactions they contain.

Proof of Work is the term used when explaining the rules that decide who gets to update transactions on the Bitcoin blockchain. Put simply, in order to gain the right to update the next block of transactions, you need to provide proof that you have solved a computational challenge that is hard yet can be easily verified by the network. By doing this you provide proof that you have done the work to solve it.

Think of this like starting a jigsaw puzzle, it's hard to solve and you will make many attempts to fit the pieces but once you complete the puzzle it is very easy for it to be validated.

As new transactions are received, nodes add them into a block template which contains all the transactions they have accepted which have not been put into a valid block, and perform hash based work on a difficulty puzzle that must be solved to form a valid block. The solution represents proof that the node proposing the block has performed the work necessary for that block to be valid.

Hashing means taking an input of data of any length and transforming it in such a way that it produces a repeatable but essentially random output of a fixed length. In Bitcoin, the transactions are run through a hashing algorithm called SHA-256 which gives an output of a fixed length of 256-bits.

In this way, anything from a short message to a large file can be hashed and the hash distributed to several parties. At any time, those parties can verify the data block by hashing it and checking that it matches the hash output they received earlier. Only the original data can be used to generate that same hash.

In Bitcoin, the nodes compete by generating as many hashes as needed to find one with the right properties. In this case a fixed length string of 64 hexadecimal characters less than a particular amount, looking something like this:

000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f

Hashes with this many leading zeros are not easy to find and represent an expenditure of energy on CPU power. Nodes compete for the right to create the next timestamp, or block, in the chain which is granted by solving this hash puzzle.

When a Bitcoin block template is being hashed, the block header contains a time stamp, a reference to the block it builds upon, a hash that represents all of the transactions in the block, a difficulty setting and a field called ‘Nonce’ or ‘number used once’. This Nonce is changed rapidly to generate new messages for the hashes being created during the proof of work process.

As the network expands, the puzzle’s difficulty is adjusted to keep the average block time as close to 10 minutes as possible. If nodes add their CPU power to the pool performing proof of work, the puzzle becomes increasingly hard to solve. Over time this means that changing blocks which have had several subsequent blocks built on top of becomes almost impossible through the accumulation of proof of work on top of them.
