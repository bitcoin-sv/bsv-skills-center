# Theory

Now that we’ve covered the basics of Bitcoin, we can go into the original Bitcoin whitepaper and get an understanding for it easily.

The Bitcoin whitepaper is divided into 12 sections, and only spans nine pages including references. Despite its relative brevity, the paper is packed full of information. We will cover the sections in brief here, but note that the Bitcoin Theory course dives into these topics in much greater depth.

## Introduction

Bitcoin was introduced as a needed solution to the double spending problem for digital cash payments. In the first section we are told directly: “What is needed is an electronic payment system based on cryptographic proof instead of trust, allowing any two willing parties to transact directly with each other without the need for a trusted third party”. Each section slowly introduces us to the proposed solution.

## Transactions

A coin is defined as a chain of digital signatures. We are introduced to the concept that coins are transferred from one owner to another owner with the use of digital signatures. We are reminded that the only way to know if a transaction is valid is if we have a solution to the double spending problem. The solution is hinted at here: transactions are announced publicly. We see that a key piece of Bitcoin’s innovation is the public nature of the system.

## Timestamp Server

The solution proposed requires the use of a timestamp server. We’ve already covered the concept of what a “block” is - a batch of transactions that are written to the ledger. A hash of each block is taken and announced publicly to the rest of the network to act as a timestamp server. The hash acts to provide data integrity, and publicly announcing the small amount of data to the rest of the network allows all nodes to come to agreement on a common ledger.

<figure><img src="../../academy/BSV Basics: Protocol and Design/.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

## Proof of Work

We learn the name of the complex “mining” process that we discussed earlier. Proof-of-Work is the system that creates the competitive process of nodes working to earn the block reward and transaction fees associated with finding a block.

We are also introduced to the important philosophy behind BSV: that decision-making is done by CPU power. This is where nodes in the network are represented not by majority of IP addresses, but by the majority of computing power. This solidifies the economic foundation behind BSV - investment in nodes infrastructure and hardware grants that node a competitive advantage over other nodes in the network. Because these nodes have a vested interest in the network, attackers with little investment in the network are not easily able to disrupt it.

## Network

Nodes are defined clearly as those that participate in the creation of blocks on the BSV blockchain. Only entities performing all six essential steps are considered nodes who run the network. These steps include:

1. **Validating Transactions** – Nodes verify transactions against the consensus rules, ensuring they follow the protocol, such as preventing double spending and adhering to script conditions.
2. **Propagating Transactions** – Valid transactions are broadcast to other nodes to ensure they are available for inclusion in a block.
3. **Assembling Transactions into Blocks** – Nodes gather valid transactions from the mempool and construct blocks that fit within their configured block size policy.
4. **Solving Proof of Work (PoW) Puzzles** – Nodes compete to solve a computational puzzle (hashing challenge) that determines who has the right to add the next block.
5. **Propagating Blocks** – Once a block is successfully mined, it is broadcast to the network so that other nodes can validate it.
6. **Maintaining the Blockchain State** – Nodes maintain the entire blockchain history, ensuring the longest valid chain is consistently adopted as the correct state.

All nodes in the network are required to follow a clearly defined set of rules governing these steps. If discrepancies arise regarding the state of the BSV blockchain, nodes resolve conflicts through Nakamoto Consensus. This conflict resolution mechanism ensures that the longest valid chain with the most accumulated proof-of-work is accepted as the authoritative version of the blockchain.

## Incentive

We are introduced to the block subsidy and how coins are distributed in the system. This is the first place we see the analogy to mining mentioned. We are also introduced to Satoshi’s vision for how the system can be maintained when the block subsidy fades away and the 21 million bitcoins are distributed: the incentive will transition entirely to transaction fees and the system will be completely inflation free. Satoshi also discusses the incentives for nodes to remain honest. He posits that it is more profitable for nodes to be honest and generate new coins instead of attacking the system.

## Reclaiming Disk Space

Here Satoshi provides a guideline for nodes to reclaim disk space to deal with a constantly growing blockchain. He mentions that spent transactions written sufficiently far back in the blockchain can be discarded and nodes can simply keep hashes to maintain integrity of the system. He cites Moore’s Law as proof that storage of the blockchain should not be a concern.

## Simplified Payment Verification

Here we are introduced to a system of how users can interact with the system for payments without having to run a node in the network. This system, Simplified Payment Verification (SPV), outlines how users can interact with the blockchain without having to be concerned with the steps required to run a node outlined in section 5 or hosting a full copy of the blockchain relying only on the chain of block headers.

## Combining and Splitting Value

Here we are introduced to how coins can be sent in transactions using multiple inputs and outputs, allowing coins to be transferred in a similar manner to how cash is transferred.

## Privacy

Satoshi outlines how identity is firewalled from the system, and privacy can be maintained by not re-using public keys. However, he is clear that inevitably BSV is not an anonymous system, but is pseudonymous. Since BSV blockchain is public and traceable, inevitably there is linking that can occur between transactions.

## Calculations

Here Satoshi does a lot of math to show that attacking the network is very hard as long as the majority of the network is controlled by honest nodes.

## Conclusion

Here we are going to copy and paste the conclusion word for word, as it very succinctly covers the entire system, and armed with this course you should be able to follow it clearly:

> “We have proposed a system for electronic transactions without relying on trust. We started with the usual framework of coins made from digital signatures, which provides strong control of ownership, but is incomplete without a way to prevent double-spending. To solve this, we proposed a peer-to-peer network using proof-of-work to record a public history of transactions that quickly becomes computationally impractical for an attacker to change if honest nodes control a majority of CPU power. The network is robust in its unstructured simplicity. Nodes work all at once with little coordination. They do not need to be identified, since messages are not routed to any particular place and only need to be delivered on a best effort basis. Nodes can leave and rejoin the network at will, accepting the proof-of-work chain as proof of what happened while they were gone. They vote with their CPU power, expressing their acceptance of valid blocks by working on extending them and rejecting invalid blocks by refusing to work on them. Any needed rules and incentives can be enforced with this consensus mechanism.”







