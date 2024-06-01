---
description: >-
  Mining can be done as a server farm or a mining pool depending on the hardware
  setup done
---

# Mining Software

Even though mining provides one of the most critical components of a Blockchain, its process itself is quite decoupled from rest of the node software functionality. The connection is made by Block assembler, who prepares the Candidate block and its header as part of its work and then feeds what is called as a mining candidate to the mining pool software.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NodeAndItsOperations_Slide12.png" alt=""><figcaption></figcaption></figure>

The mining pool software controls either a centrally located datacentre of ASIC machines or even, at times, machines that are distributed across the internet. Once the mining pool receives the mining candidate, it will start the proof-of-work calculation process to find the solution for the next block hash.

The mining software currently uses ASICs, specifically designed chips for calculating SHA256 hash values for a proposed block header. They perform a brute force-like calculation constantly to randomly hit the target set for achieving the solution for the proposed block hash. This is ~~approximately~~ explained in the diagram below.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NodeAndItsOperations_Slide13.png" alt=""><figcaption></figcaption></figure>

The Candidate block header is hashed using a SHA256D (double SHA256 hashing) to calculate a proposed value. This value is then compared with a target. If the calculated value is less than the target value (identified with leading zeros in the value), then a solution is found. If the value is more than the target value, the nonce is incremented to a new value so that the result of SHA256D(Block Header) is a new value. This process is repeated constantly by the mining chips. Once the solution is found, it is passed back to the Block Assembler, which then will inform the ChainTracker and BSN that a new solution is found locally, and this now needs to be propagated to the rest of the mining nodes in the network.

When other nodes receive an intimation from this node about the proposed block, they will trigger the Block validation process at their end to validate if the proposed block is a valid block. If the block validation is successful, they will then update their chain-tip ID with this proposed block as the most recent block. They then will start building a new block with this Tip ID as the longest chain, and if they find a solution, it follows the same process described above. This is something that is constantly occurring in the blockchain network, making it a very time-bound and hard-to-reverse process for nodes.

If they go offline, even for a small-time frame in this process, they will be out of sync with the ongoing proof-of-work process and the block height that they are on. Joining back then will require them first to download the blocks created when they were offline and then start to mine a new block.

## **Orphan Blocks**

As described in the process above, there are situations in the process of nodes proposing a block where more than one find a solution at the same time. This could create a temporary situation when there are multiple chain tips that are considered the longest chain by different nodes, and they build on it. The situation resolves itself when the next block is found on a given chain tip by the same or another node making it the longest chain. This process again goes on repeatedly. The temporary situations where two or more chain-tip are recognised and resolved by the discovery of the new proposed block will result in abandoning the chain-tip, which does not get the new block built on it. In this scenario, the block, which at the time was a successful solution but loose out due to another node finding a solution, gets orphaned and is later deleted from the network.

## **Invalid Blocks**

If a node proposes a block that fails Block Validation, the proposal is ignored, and other nodes continue trying to find a valid block which builds upon the previous valid block. A node may consider a block invalid due to numerous reasons, including:

* The block fails a consensus rule (e.g. over size)
* The block awards the miner too many bitcoins
* The block contains an invalid transaction
* The block does not include a valid proof-of-work or timestamp

In a situation where a node has submitted an invalid block, the block is rejected. If the node submits multiple invalid blocks, other nodes on the network may take additional steps, such as blocking the node’s IP and refusing to share network information. Typically, these ‘bans’ take place over a 24–48-hour period and are intended to make node operators aware of repeated mistakes. Each node can set its own policy in this regard.

It is important to understand that nodes on the network are free to accept or reject blocks from any party for any reason. It is upon each node to ensure that they are aware of what the majority of nodes on the network have accepted as the valid chain of events. This is so that they can always be building on the longest valid chain of blocks and minimise resources used working on blocks the network will refuse to accept.

{% hint style="info" %}
Mining pools were not conceived in the original design and implementation but are a phenomenon that happened later. The exception in the whitepaper was formation of server farms and datacenters which become mining nodes. It was estimated that there will be around ten primary nodes doing the 51% and likely another hundred smaller nodes operating in different areas.

So, the creation of mining pools has created a scenario where we have fifteen nodes in total globally eliminating the existence of the mentioned 100s of smaller nodes. If you are running an ASIC that is a member of a mining pool, you are not a miner. Rather, you are simply a part of the pool. You are a supplier to the node operator or pool running an outsourced function for a node.

Only 3 to 4 of these mining pools control the 51% of the network at any time, with the largest being sufficiently large that any action against that one player impacts the entire network.
{% endhint %}
