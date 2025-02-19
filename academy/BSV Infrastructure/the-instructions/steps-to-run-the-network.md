# Steps to Run the Network

Section 5 of the Bitcoin white paper, tilted ‘Network’, outlines a list of instructions that nodes must follow to correctly operate the Bitcoin network.

The steps to run the network are as follows:

1. New transactions are broadcast to all nodes.
2. Each node collects new transactions into a block.
3. Each node works on finding a difficult proof-of-work for its block.
4. When a node finds a proof-of-work, it broadcasts the block to all nodes.
5. Nodes accept the block only if all transactions in it are valid and not already spent.
6. Nodes express their acceptance of the block by working on creating the next block in the chain, using the hash of the accepted block as the previous hash.

<figure><img src="../.gitbook/assets/CHAPTER 1 GIF 0.gif" alt=""><figcaption></figcaption></figure>

By collectively following these instructions, nodes are incentivised to find ways to develop their own competitive advantage, and by doing so, their investments in hardware and network infrastructure allows the network to scale efficiently. The network's incentives are structured such that the most honest, open, and capable participants are the most likely to be rewarded.

When trying to understand these instructions, it helps to think of the system operating on a global scale, managing many billions of transactions per block. By having this understanding in mind, it becomes very easy to understand why there is a strong drive to follow the instructions strictly.

The network is designed like this so attacks are not economically viable and thus unsustainable.
