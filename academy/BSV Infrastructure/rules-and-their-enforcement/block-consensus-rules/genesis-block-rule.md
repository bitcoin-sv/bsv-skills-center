# Genesis Block Rule

Only blocks that add to the block chain formed by building upon the Genesis block are valid.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 4.gif" alt=""><figcaption></figcaption></figure>

This rule states that blocks must be added to an unbroken chain of proof of work leading back to the genesis block, which has its block hash hard coded into the Bitcoin node client’s software. This prevents a malicious party somehow creating a new chain in order to perpetrate a malicious redirection of hashpower or economic activity, and is an important aspect of Simplified Payment Verification, allowing users to check they are using the correct chain of blocks with minimal overhead.

The genesis block is identified using its block hash which is **000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f**. By ensuring all users of the network are aware of this block hash, there can be certainty around which chain of blocks is valid. If a user or node connects to a chain of blocks which leads back to a point of origin that is not the genesis block, it can know immediately that it has connected to the wrong network.
