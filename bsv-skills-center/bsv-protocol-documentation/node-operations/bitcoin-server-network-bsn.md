---
description: The communication and networking component for the node
---

# Bitcoin Server Network (BSN)

{% hint style="info" %}
BSN or Bitcoin Server Network is a new name for the earlier component known as P2P network. The P2P network's name originated from the fact that the nodes are each other's peer.
{% endhint %}

Bitcoin Server Network is the name given to the subsystem in the node software, which looks externally and is responsible for all messages exchange and communication for the node software. The word server here refers to the analogy of nodes being the servers for any application that uses blockchain, analogous to Client in a typical Client-Server architecture pattern. The main purpose of the BSN subsystem is to connect and manage peer nodes to:

* Manage the networking and communication for the given node by acting as an Identity of the node and its peers. It also manages connection to every other node that requests a connection.
* Retrieve & distribute network messages such as:
  * New blocks
  * New transactions
  * Chain state
  * Block headers on demand
  * Blocks on demand

A high-level component diagram is show below

<figure><img src="../../../.gitbook/assets/image (7) (1).png" alt=""><figcaption></figcaption></figure>

## **Peer Connector**

This component is made up of two underlying modules provided by what is known as JCL suite of libraries and operations, and a message router which subscribes to the message events exposed by the JCL-Net of other nodes. The consumed messages are then injected into the system via the Message router. A finite number of peers will connect to a single JCL, and that JCL connects to its own Message Router.

The JCL-Net Module which provides capabilities to connect, listen and react to a Blockchain network. The connection functionality involves aspects such as Handshake protocol, timeout (Ping/Pong) configurations, Node-Discovery algorithm, Blacklist, etc. It also provides event stream and notification capabilities along with supporting network applications to issue request that it can fulfil (for example, requesting a transaction or block).

JCL-Store provides operations to save or retrieve Blocks and transactions that are received or sent as part of ongoing communication with other nodes.

## **Peer Manager**

The Peer Manager component will organise and maintain connections to the other nodes in the network via the JCL. It will also track information about its peers, direct the P2P communications and maintain the peer information and statistics, which will be persisted in the peer store and the peer statistics store.

Peer-Store captures critical identity information (like IP address, port, streams status) and the status of the peer (dead, alive, banned, penalised, unknown, etc.) for all of the connected peers.

Peer-Statistics store will capture statistical information of every message that gets exchanged with the given peer stored in Peer-Store. It also captures in specific performance data for the communication with the peer, which is used by an algorithm to do scoring of the peer. The scoring is used to determine the status of the peer, including if they can be kept active or blocked.

{% hint style="info" %}
The Block Header Clients (BHCs) connect to BSN as part of their connection to the blockchain network. Except that the BHC only stores the block headers and not any block and transaction data.
{% endhint %}
