---
description: Looking at the node software from a functional prospective
---

# Node Software

On a high level, the node software comprises various functional blocks shown in the diagram below. The diagrams do not depict the mining component for illustration of the node software.

<figure><img src="../../../.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>

The P2P system (also known as BSN or Bitcoin Server’s Network) represents the sub-system which handles the network connections and message exchanges between the various nodes in the network. The term P2P refers to Peer to Peer, which signifies that these nodes participating in running the blockchain network are peers. This means that every node that is a peer is performing the exact same function in the network as another peer. It could provide additional services to the users of the network. Still, from the perspective of the network, it is exactly the same as any other node in the network and holds the same responsibility and functionality.

The other sub-systems, i.e., Transaction validator, Block Assembler, Block Validator and Chain tracker, each comprise one or more services and components to perform the needed functionality. In general, P2P system receives transactions from users or other nodes in the network; they will then be routed to the Transaction Validation process to validate them. Once the transaction is validated, it will become part of the proposed block being built by the Block Assembler of that node. The alternate flow is when another node finds the block to be created, which the Chain tracker will keep track of by listening to messages from all nodes. When it receives a message from a node that they have found a block, it will download the announced block from that node. Once that is done, it will feed the block into the Block validator to validate the block, including validation of all the transactions present in that block.

A detailed view of these functional blocks’ interaction with each other during the node software operation is shown below.

<figure><img src="../../../.gitbook/assets/image (5).png" alt=""><figcaption><p>The functional process inside node when processing a new transaction</p></figcaption></figure>

The diagram depicts two main flows, one where it receives new transactions and goes through a validation process to be added to a new proposed block in block assembly. This then is given input to the mining software to perform block hash calculation to find the POW solution. If the solution is found, the proposed block is then propagated to the network via BSN. This flow is highlighted in green. The alternate flow is when another node finds the solution, and this node receives a new proposed block which is then validated by the block validator. The mempool is then flushed out of the transactions that are confirmed by this block, and a new mining candidate block is built with new validated transactions on the top of this chain-tip.

ChainTracker, at all points in time, is responsible for identification and internal updates to many components of the latest tip id of the chain. It also handles communication regarding blocks which fail the validation process.

In general, there are 3 different main flows happening at one point in time in the node software.

1. A node receives transactions and validates them. Once validated, the transaction is also broadcasted to the node network via BSN, so all nodes are aware of the valid transaction.
2. Block Assembler builds a proposed candidate block to be sent to the mining pool software to calculate the mining solution based on the candidate block header.
3. ChainTracker monitors the longest chain tip, and if a new block tip is discovered, it downloads the block and sends it for block validation.

In addition to these 3 main flows, there are sub-flows that happen in parallel.

1. BSN constantly monitors for communication from nodes who are participating in the network and routes incoming and outgoing messages generated at various points in time from the above-mentioned flows. It also includes receiving new transactions broadcasted by participating nodes.
2. Mining pool software keeps querying for updated block templates so that it is mining with a candidate with all possible recent transactions seen by the network. The block assembler keeps adding new transactions to the candidate block periodically and updates the Merkle root due to the addition of these new transactions.
3. UTXO storage keeps updating the status of a given UTXO based on the above-mentioned flows. The final status of UTXO is spent, which is done once it is included in the candidate block by the block assembler or gets verified to be in a block by the block validator.
4. Mempool constantly receives new transactions that get validated successfully. It will periodically update the block candidate, which then is consumed by the block assembler and mining pool.
5. When validating a block proposed by another node, the node shall already know about 97% of the transactions, but the remaining small amount of un-seen transactions are then requested and retrieved by the node.

Please note that we are only touching on node software internals on a high level for what it does. A full codebase can be found at [https://github.com/bitcoin-sv/bitcoin-sv](https://github.com/bitcoin-sv/bitcoin-sv) where you will find an in-depth analysis of the functionality.

## Software Components

A more detailed overview of the node software is shown in the diagram below.

<figure><img src="../../../.gitbook/assets/image (6).png" alt=""><figcaption></figcaption></figure>

Based on the diagram, we will look at each functional block individually to understand more about each of the boxes shown in the diagram.

{% hint style="info" %}
It shall be noted that the description of the node software and underlying components offers an approximate insights without going into detailed codebase level details. This is done to keep the readability light and also with the intent to provide a deep dive into software and not as operation's manual.
{% endhint %}
