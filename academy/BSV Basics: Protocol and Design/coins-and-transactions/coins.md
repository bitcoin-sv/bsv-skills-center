# Coins

When Satoshi Nakamoto launched the Bitcoin network, he designed it with a fixed supply of **21 million bitcoins**, each divisible into **100 million units** called satoshis. A satoshi, the smallest denomination of Bitcoin, represents the smallest amount that can be transferred.

At the network's launch, all 21 hundred million million satoshis were issued, but Satoshi implemented a gradual distribution mechanism using a **block subsidy**.

***

**The Block Subsidy and Mining**



When batches of transactions are bundled into a block, the block is considered “mined” and added to the blockchain. Mining a block unlocks a fixed number of bitcoins, known as the **block subsidy**, which is rewarded to the node that successfully mines the block. This subsidy decreases over time, halving approximately every four years. Currently, the block subsidy is fixed at **3.125 bitcoins per block**.

Although all bitcoins were issued at Bitcoin’s genesis, the mining process ensures their gradual introduction into the economy. This design was essential for bootstrapping the network, as the block subsidy incentivizes nodes to participate in mining and maintain the ledger.

***

**How Mining Works**



Mining is the process by which nodes compete to add valid batches of transactions (blocks) to the ledger. Nodes that successfully mine a block are rewarded with the block subsidy. However, this reward is not easily won—nodes must compete to solve a **hash puzzle**, a complex mathematical problem.

You can think of solving this puzzle like a lottery:

* Each potential solution is akin to a scratch-off lottery ticket.
* Nodes that can generate and “scratch off” the most tickets fastest are more likely to find the winning solution.
* This process is known as **hashing**, where nodes repeatedly apply a cryptographic hash function until they discover a valid solution.

To ensure fairness and consistent block production, Satoshi introduced the **Difficulty Adjustment Algorithm**. This algorithm increases or decreases the difficulty of the hash puzzle every 2016 blocks (approximately every two weeks) based on the total computational power in the network.

***

**Why the Difficulty Adjustment is Important**



The Difficulty Adjustment Algorithm serves two critical purposes:

1. **Resource Contribution and Security:**\
   As more nodes join the network, the puzzle becomes harder, requiring greater computational resources. This ensures that only nodes that invest significant resources remain competitive, aligning economic incentives with the security of the network.
2. **Predictable Block Times:**\
   The algorithm is designed to keep block production at an average interval of **ten minutes**. This predictable pace ensures the ledger grows steadily over time. While the advantages of a ten-minute interval are beyond the scope of this course, it is important to understand that this design maintains consistency and reliability in ledger updates.

***

**The BSV Blockchain Advantage**



The **BSV blockchain** preserves Satoshi’s original economic design while enabling scalability that other implementations cannot achieve. By supporting unbounded block sizes, the BSV blockchain ensures that mining remains economically viable and scalable, capable of handling millions of transactions per day without compromising security or efficiency.

This combination of fixed coin supply, competitive mining, and scalable infrastructure is what makes the BSV blockchain uniquely capable of fulfilling Bitcoin’s original vision as a global payment and data network.
