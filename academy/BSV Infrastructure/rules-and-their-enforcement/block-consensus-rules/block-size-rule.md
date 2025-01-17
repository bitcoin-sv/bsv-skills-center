# Block Size Rule

When a block is found, there is an economic limit applied to the block size, which is imposed by nodes on the network. This allows nodes to reach consensus on behavioural limits of the network. This limit is set to a large multiple of typical demand.

The size of a block is the size in bytes of the serialised form of the block, including the block header and all of the transactions it includes.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 1.gif" alt=""><figcaption></figcaption></figure>

This rule is a configurable consensus rule meaning that node operators set the limit. As a group, they are expected to reach consensus on this value and configure it manually.

There is no default value for this setting, and the current BitcoinSV node client software will not start without the operator setting a value. Nodes that are configured with different values to the rest of the network risk having their blocks rejected, or rejecting blocks that other nodes accept, leaving them stuck working on a nonviable chain-tip.
