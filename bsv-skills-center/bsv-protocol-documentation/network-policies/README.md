---
description: Blockchain's network is run by a set of rules, and they are set in stone
---

# Network Policies

The Bitcoin protocol defines the blockchain’s node network and its functioning. Its basic premises are:

* A node is a network actor that adds new blocks to the blockchain.
* Nodes (also known as miners) are characterised by an ability to:
  * produce blocks
  * distribute blocks to peers (other nodes), and validate received blocks
  * distribute found blocks to network peers (note that this doesn't mean the entire block and its contents are distributed as other nodes already have the transactions in the found block - or at least the vast majority of them)
  * Process (validate) transactions
* The longest chain of blocks is the correct chain and is to be used to build new blocks.
* Nodes enforce the rules in the network; they don’t create or modify these rules. A good analogy is nodes are like Police enforcing the rules of law in a city, but they don’t get to make or modify any laws.
* Newly-distributed coins are added to circulation from block subsidies, which form part of the block reward created in the first transaction of each block (Coinbase transaction). In this process, nodes are bound by a unilateral contract by the issuer to perform the functions of a node. If they fail to do so, they will breach the contract and be legally liable for recourse decided by the Issuer.
* Nodes also have a contractual obligation to include every transaction they see in the block they are proposing to create. Sometimes there will be transactions with no fees; they are required to allow those as well until they reach a point where they have to prioritise between fee-paying transactions and free transactions, where they can choose to ignore the free transactions.
* Nodes also have a contractual obligation to protect the network from any malicious activities from network users (for example, hackers moving stolen funds or double spending attempts) or even dishonest mining nodes who attack the network.

{% hint style="info" %}
A node is always the entity that creates a block. Any entity that is merely running the node software but has never been able to create a new block doesn't really participate in the block creation process and does not add any value to the network. Thus the network would not recognise them as a node.

As per the protocol specification, the network's difficulty in producing blocks is readjusted every 2 weeks. Based on an average time of 10 mins per block, at maximum, 2016 blocks will be created in the 2 weeks window. This value, 2016, thus becomes an upper limit to the number of possible nodes at any point in time in the network (assuming every new block is created by a different node). On average, at any point in time, there will be 3 to 5 large nodes with a few small nodes. This also defines the decentralisation that the network has.

At current time, due to the existence of multiple blockchain forks using the same hashing algorithm for network security considerations the difficulty is adjusted after every block creation in BSV blockchain.
{% endhint %}

Now that we understand the definition of a node, it is also important to understand the concept of the longest chain, which defines the current state of the blockchain at any point in time. &#x20;

## Longest Chain

The whitepaper defines the longest chain in the protocol:&#x20;

> _Proof-of-work is essentially one-CPU-one-vote. The majority decision is represented by the longest chain, which has the greatest proof-of-work effort invested in it. If a majority of CPU power is controlled by honest nodes, the honest chain will grow the fastest and outpace any competing chains._

This description has often been understood as a system providing democratic rights to all participants in the network. However, this majority decision is not democratic. The nature of proof of work and the system's limitations don’t provide a majority decision for users but rather a majority for commercial nodes (block producers). It is not one vote per IP address or machine but rather one vote per unit of investment that decides the ordering of transactions.&#x20;

Further error is to assume complete autonomy. The longest chain represents the majority decision, but the error assuming that each node must follow this is to ignore the right for a node to follow what the node operator sees as the longest chain of valid transactions. When a node believes the chain is invalid, the node operator can manually override the system and select the alternative chain. Consequently, the argument that a node must automatically follow the longest chain is invalid. Node operators decide what they believe is the honest chain and risk losing profit in the short term to ensure the honesty of the network, which increases their profit in the long term.

This is to specify that nodes always make a conscious decision of which chain they consider to be honest and to build upon.
