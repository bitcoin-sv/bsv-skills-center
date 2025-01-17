# Chain Effort

> As later blocks are chained after it, the work to change the block would include redoing all the blocks after it.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

Once a block has been created and accepted as valid by other nodes on the network, the network collectively begins trying to build the next block using the hash of this block as part of the new block header. Every block since the Genesis block is built upon a previous block in the chain, so overwriting information stored at a certain point in the chain would require the proof of work on the block containing the information being overwritten, and every block discovered since in order for the network to recognise the new version of the time chain as valid history.

Anyone seeking to overwrite a transaction using this method must build the new proof of work chain and outpace the constantly lengthening chain-tip for their blocks to be considered as valid, making it computationally impractical to erase information that has been captured in a block.

In this way, information contained in blocks that have an established quantity of proof of work on top of them are considered unchangeable, or immutable.
