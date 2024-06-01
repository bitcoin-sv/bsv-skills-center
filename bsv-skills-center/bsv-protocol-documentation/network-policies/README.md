---
description: Blockchain's network is run by a set of rules, and they are set in stone
---

# Nodes and Network Policies

The Bitcoin protocol defines the blockchain’s Node network and its functioning. Its basic premises are:

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

At current time, due to existence of multiple blockchain forks using same hashing algorithm, due to network security considerations, difficulty is adjusted after every block creation in BSV blockchain.
{% endhint %}
