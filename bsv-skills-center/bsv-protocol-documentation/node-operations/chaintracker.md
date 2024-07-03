---
description: >-
  A node primarily ensures that it knows the longest chain of block before
  anything else
---

# ChainTracker

ChainTracker as the name suggests tracks the longest chain of blocks in the blockchain network. It is also responsible for responding to the BSN when a message from another node is received regarding the discovery of a new block. It is also responsible for ensuring the node state is responded to so that, at all times, the node is in sync with the external node network.

If at any time the node is out of sync and needs to download blocks from the network, ChainTracker orchestrates that in collaboration with Block Downloading and storage services. Once downloaded, it will pass on the blocks to Block Validator.

ChainTracker stores all the Block Headers that make up the Chain. For each Block Header ChainTracker also stores a piece of “Metadata”, this is a placeholder to store flags or relevant info about the block mentioned below:

* Number of TX’s
* Download timestamp
* Download source
* Validation timestamp
* Number of Validations (in case of a block being validated several times, for example when a block is corrupted, and we need to download and validate it again).

ChainTracker will query other peers in the network to get headers of the blocks in the Chain so it can build the Chain internally from _Genesis_ up to the Tip. It keeps track of the blocks being validated and makes sure that other components in the node are aware of those blocks and are informed when they are Validated or Invalidated.

An overview of Chain Tracker is provided in the following diagram:

<figure><img src="../../../.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>

It is the central component that interacts with the Tip Manager, which monitors incoming communication from Chain Trackers of other nodes via BSN to receive the TipIds.

ChainTracker also communicates with mempool to sync it with the active tip id, and when it needs to update the valid tip id recognised by the mempool, it sends a message to Mempool for this realignment on the tip id; the process itself is termed pool rebase. It also interacts with the UTXO storage services to ensure the tip recognised by them is in sync with the longest tip recognised by the network. This ensures that the UTXOs and their status are reflected correctly based on the longest chain of work in the blockchain.

{% hint style="info" %}
One of the most important functions of a node is to always make sure to be aware of the longest chain of blocks which is performed by ChainTracker. It also maintains the log of various possible chain-tips which could become the longest chain just in case. This means that it is always tracking temporary forks that appear and disappear with time in the network
{% endhint %}
