# Block Assembly

In this section we will look at how Bitcoin blocks are created within a node, and the incentives that are in place which drive node operators to invest in the network. The process of creating each block is a competitive process, that takes on average 10 minutes, and which allocates the successful node a reward in the form of Bitcoin tokens.

The process is complex and energy intensive. At scale it requires purpose-built custom systems that will operate more like a cluster of computers than a single system. There are aspects of managing the bitcoin network that touch many of the major infrastructure elements needed for digital commerce.

Among these are:

* global telecommunication networks
* computing systems/general processing units (GPUs)
* Energy grids

The section covers the requirements of building a block template and competing for rewards. The outcomes will be a robust understanding of the base incentives that drive node operators to construct and manage the highly connected network infrastructure.

## Synchronising the UTXO Set

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 1.gif" alt=""><figcaption></figcaption></figure>

Each time a BSV transaction is created, transaction outputs are generated. Each one contains an amount of BSV, expressed as a quantity of satoshis, locked in its lockScript, (or scriptPubKey). Outputs that haven’t been spent are called Unspent Transaction Outputs, or UTXOs. All of the coins on the ledger are held live in UTXOs, making it important for nodes to keep them in a rapid access memory (RAM) database. This record of all spendable BSV forms a database referred to as ‘The UTXO set’. The global UTXO set holds every spendable transaction output which has not been used as an input to a transaction.

The management of this set will become an increasingly complex task. Nodes already make strategic eliminations from the set including transaction outputs that are provably unspendable - e.g. [FALSE RETURN](https://wiki.bitcoinsv.io/index.php/False_Return) scripts.

When a node joins the network one of the first things it does is to perform an initial block download. This involves downloading and validating a complete set of all of the blocks in the longest valid chain of proof of work, and using the information contained within to reconstruct the state of the current UTXO set.

Inputs used by previously unseen transactions are validated against this UXTO set, so nodes must keep this up-to-date. If a node disconnects from the network, their first task upon reconnection is to rebuild the UTXO set by downloading and validating any new blocks, as well as any unconfirmed transactions.

## Building The Working Blockchain

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 2 (1).gif" alt=""><figcaption></figcaption></figure>

Nodes can minimise storage requirements by pruning elements that have a low chance of being required. By having a clear mechanism to excise redundant information, nodes can build what we will call their working blockchain.

The working blockchain consists of all of the block headers in the chain (block headers are covered in depth in a later lesson entitled (“The block header”), with each connected to a pruned Merkle tree. In blocks where the node has discarded every transaction, only the block header itself needs to be kept. In this way the data storage requirement can be optimised by the node to manage cost.

Users accessing services anchored to transactions in the blockchain create their own working blockchain by starting from an empty set. Section 8 of the Bitcoin white paper defines the use of Merkle path data as a method of validating transactions. Starting with only the block headers, a service can receive transactions and their corresponding Merkle proofs, using them to create a database of information controlled by or otherwise available to the user. This is immutably anchored in BSV's proof of work.

These techniques can help users of the system to optimise the information they carry for their own needs, while having access to the necessary provenance data.

Read more about Block headers here: [https://wiki.bitcoinsv.io/index.php/Block\_header](https://wiki.bitcoinsv.io/index.php/Block_header)

## Receiving New Transactions

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 3.gif" alt=""><figcaption></figcaption></figure>

When a user wants to write a finalised transaction to the ledger, they broadcast that transaction to one or more nodes for processing. Each node validates the transaction against the consensus rules and the node’s set of local policies. If the validations are accepted, the transaction will end up in the node’s next block template to be timestamped once a valid proof of work is found. Each node typically broadcasts valid transactions to all other nodes, sometimes even if they do not plan to put them in a block. When a node detects that another node does not have transactions it has validated, there is an incentive to proactively send them.

Thanks to the highly connected nature of the BSV network, the transactions typically propagate to an overwhelming majority of nodes within a few hundred milliseconds. The first seen rule dictates that a UTXO can only be spent in the first seen valid transaction that spends it. This is a strong part of the protection against double spends by users, which are mostly accidental. Double spends performed by nodes are different and require a node to knowingly expend hash power, generating proof of work in order to override network consensus. This may be an illegal act and any node operator participating can be sanctioned by the rest of the network by having their blocks rejected. This is the function of Nakamoto consensus, allowing any needed rules and incentives to be enforced.

Read more about the first seen rule here: [https://wiki.bitcoinsv.io/index.php/First\_seen\_rule](https://wiki.bitcoinsv.io/index.php/First_seen_rule)

## Creating A Block Template



<figure><img src="../../.gitbook/assets/Chapter 4 GIF 4 (1).gif" alt=""><figcaption></figcaption></figure>

As transactions are received and validated by the node, they are appended to the node’s Merkle tree. This means the TXID hash is used in the creation of the Merkle Root, making it part of the node’s block template.

A Merkle tree is constructed with the unconfirmed transactions as leaves. Merkle roots can represent ordered sets with unbounded size in a unique fixed-length byte string. Therefore, the number of transactions in a block is theoretically unbounded in terms of Merkle tree structure.

When a transaction is added to the Merkle tree, the serialised binary string is hashed twice using the SHA256 algorithm, with the double hash (the Transaction ID, or TXID) forming the leaf nodes at the base of the tree. Each time a transaction is added to the tree, the Merkle root must be re-calculated, creating a new block template.

As the network scales, nodes may choose to parallelise the generation of Merkle trees. This could be done by creating Merkle trees of a subset of the transactions in a candidate block and recombining to form a larger tree.

## The Block Header

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 5.gif" alt=""><figcaption></figcaption></figure>

The block header contains the information needed for any party to validate the proof-of-work and contents of a block.

The sequentially linked block headers form the structure of the blockchain, which is a directed acyclic graph (DAG) made up of the complete sequence of blocks from the original genesis block to the current tip of the longest proof-of-work chain. Each block header is made of the following items:

1. version - This 4 byte little endian field indicates the version of the Bitcoin protocol under which the node is publishing the block.
2. hashPrevBlock - This 32 byte little endian field is the double SHA256 hash of the previous block header. This forms the edge to the previous block that joins it to the blockchain DAG.
3. hashMerkleRoot - This 32 byte little endian field represents the Merkle root of the Merkle tree that contains the transactions which are timestamped in the block.
4. time - This 4 byte field is the Unix epoch timestamp that is applied to all transactions in the block. Current network policy only requires this value to be accurate to within 2 hours of the validating nodes’ local timestamp. The timestamp has 1 second precision.
5. bits - This 4 byte field yields the difficulty target value of the proof-of-work puzzle, as determined by the network rules.
6. nonce - This stands for ‘number used once’. The values of this 4 byte field are cycled through to modulate the block header. The hash of the header is then checked against the difficulty target. Nodes provide adequate information such that when all 4.3 billion values of a nonce have been tried, they can modulate the input field in the block’s coinbase transaction and recalculate the Merkle root. This changes the serialised string of the block header, giving another 4.3 billion unique nonce values to iterate in their search for a hash puzzle solution under the difficulty target.

## The Coinbase Transaction

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 6.gif" alt=""><figcaption></figcaption></figure>

Every time a node generates a new block template, it must create a new coinbase transaction. The coinbase transaction has just one input which has an arbitrary string of up to 100 bytes for its unlockScript.

In 2010 a standard rule was added to the node client software which requires that the bytes of the string must be a varInt containing the block height. This came about because nodes had been generating identical coinbase transactions creating the issue of having multiple transactions with identical hashes/TXIDs. The remainder of the input string (up to 96 bytes) can be configured however the miner decides, and is often used to advertise the identity of the node to the rest of the network. At times this input has also been used to signal a node's intent to uphold new consensus rules being introduced to the protocol. However new, more administrative procedures have been implemented which remove the need for this type of communication.

While only a single input is allowed, each coinbase transaction can create as many outputs as the node operator wants, within the rules of the BSV protocol. Because the transaction doesn’t need to be propagated outside of the node until the block is found, it is not subject to rules which would exclude it from transaction pools such as dust limits and must only adhere to BSV's immutable ruleset. The coinbase transaction can include FALSE RETURN outputs in the same way as normal transactions. The current implementation of MinerID allows nodes to identify themselves cryptographically by inserting a signature into a FALSE RETURN output in the Coinbase.

Importantly, outputs from the Coinbase transaction cannot be spent until there have been a further 100 blocks built on top of its containing block. This both acts as an incentive for miners to continue building blocks and ensures that a node operator cannot spend funds which might be involved in an orphan race. Most races are won within 2 or 3 blocks so 100 provides strong security for fund receivers without placing an undue burden upon the operators themselves.

## Block Rewards

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 7.gif" alt=""><figcaption></figcaption></figure>

The coinbase outputs pay the ‘block reward’ to the node operator or other selected receivers.

The outputs of the coinbase transaction must contain equal or less satoshis than the sum of two values:

1. Transaction fees

In order to get a transaction recorded on the ledger, users pay a small fee to miners. The fee paid is the difference between the value of the inputs to a transaction and its outputs. That difference is added to the coinbase transaction as part of the block reward. As the network scales to accommodate more transactions, this amount grows in value. Long term, this portion of the reward becomes the primary incentive driving nodes to participate in the process of building blocks.

1. The Block Subsidy

The Block Subsidy is the algorithmically defined distribution of BSV to nodes over time. The schedule at which the subsidy would allocate the BSV supply to miners was set when the BSV network began operating in 2009. The subsidy started at 50 BSV, or 5,000,000,000 Satoshis, and reduces by 50% every 210,000 blocks, or approximately every 4 years. This schedule steadily decreases until it reaches zero after 32 ‘halving’ events, estimated to end in approximately 2140.

The subsidy gives BSV nodes something to compete for during the early phases of the network’s growth. At this point within the network, the cumulative transaction fees do not amount to much due to the low fees and very low traffic on the network. However as stated in the whitepaper, transaction fees are the longer term incentive:

“Once a predetermined number of coins have entered circulation, the incentive can transition entirely to transaction fees and be completely inflation free.”

## Mining Candidate Distribution and Pool Software

Periodically, a node generates a block template, or a set of transactions with a complete Merkle tree. Using this template, it can create mining candidates for hashing. Each mining candidate is a aggregate of the parameters in the block header, including the previous block hash, the version of the block, the difficulty value and the timestamp. This is distributed plus some specific data the node uses to track the hasher being allocated the template.

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 7A.gif" alt=""><figcaption></figcaption></figure>

These mining candidates are distributed to systems which control ASIC miners. These systems are often referred to as ‘pool-miners’ or ‘hash-pooling systems’.

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 8.gif" alt=""><figcaption></figcaption></figure>

When a pool-miner requests a mining candidate from a node, it is given the following information:

1. id - A universally unique identifier (uuid - link to [https://en.wikipedia.org/wiki/Universally\_unique\_identifier](https://en.wikipedia.org/wiki/Universally_unique_identifier)) representing an assignment ID which identifies which pool a winning block hash was generated by
2. prevHash - A 32 byte string representing the previous block’s hash
3. A suggested coinbase transaction including the input string and any outputs the node requests (optional parameter)
4. version - A 4 byte string representing the version of the block
5. coinbaseValue - An 8 byte number representing the value of the combined outputs in the coinbase transaction in Satoshis
6. nBits - A 4 byte number representing the target difficulty
7. time - The time in 4 byte Unix epoch time accurate to 1 second
8. height - A varInt containing the height of the candidate block
9. merkleProof - An array containing a list of hex strings that represent the Merkle path for the coinbase transaction

With these values, the pool-miner has all of the information it needs to perform an unbounded amount of proof-of-work.

## Performing Proof-of-Work

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 9.gif" alt=""><figcaption></figcaption></figure>

To perform this proof-of-work function, each node distributes the mining candidate to one or more pool-miners, which will typically manage a set of ASIC-based (Application Specific Integrated Circuit) hashing machines. These so-called ‘ASIC-miners' take a supplied block header and cycle through nonce values. Each time the nonce is changed, the resultant serialised string of the block header is put through a double SHA256 hash function. If the resultant hash is less than or equal to the difficulty target, the block header is valid and can be added to the chain.

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 9A.gif" alt=""><figcaption></figcaption></figure>

Because pool miners know how much BSV is awarded in the Coinbase transaction, they can also calculate the proportional rewards they will receive per hash operation performed. This allows them to determine the profitability of operating certain hash machinery at any given moment. This can be calculated based on instantaneous energy costs, energy consumption of ASIC-miners and the operational and capital expenditure of their enterprise. This allows the best pool miners to make the most economically sensible decision available to them at any given moment.

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 9B.gif" alt=""><figcaption></figcaption></figure>

Each pool-miner uses their mining candidate to generate unique block headers and coinbase transactions for the ASIC-miners it controls. Each miner performs a cycle of up to 4.3 billion nonces on each header candidate in an attempt to find a winning solution to the hash puzzle.

## The First Seen Rule

When a successful proof-of-work solution is found, the pool miner sends it back to the node to be checked and then broadcast to all other nodes on the network. It is imperative that this takes place as quickly as possible to minimise the chance of competing valid blocks emerging. In a situation where competing blocks are simultaneously discovered, the first seen rule is applied by each individual node and agreement on transaction history reached through Nakamoto consensus.

The first seen rule says that a node must take the first successfully validated block or transaction as the one upon which it will build its version of history.

### First Seen Blocks

The node considers the first seen block to be the first block that it receives and is able to validate. This means the first block which represents a set of transactions that are both valid and new (i.e. not in a previous block). The node uses this block’s hash as the ‘prevHash’ field in its new block template to signal consensus.



<figure><img src="../../.gitbook/assets/Chapter 4 GIF 10.gif" alt=""><figcaption></figcaption></figure>

This creates an incentive for each node to minimise the amount of time it takes for other nodes to validate their blocks to reduce the chance of orphan blocks. Orphan blocks arise because proof-of-work continues on prior blocks while proposed new blocks are validated. If there is a delay in the validation of a block proposal due to needing to receive transactions that weren’t shared earlier from the proposing node, this period may allow for another node to present another valid proposal. This proof-of-work occasionally results in another valid block being proposed, which then competes for its place in the longest chain of proof-of-work.

### First Seen Transactions

The first seen rule is also applied to transactions entering the network. In this situation, it means that only the first seen transaction that uses a particular input is accepted. Any double spend transaction that re-uses an input is invalid, and any block that includes a double spend transaction would also be invalid.

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 11.gif" alt=""><figcaption></figcaption></figure>

“Nodes accept the block only if all transactions in it are valid and not already spent.” - Bitcoin white paper, section 5.

## Orphan Blocks

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 12.gif" alt=""><figcaption></figcaption></figure>

The BSV Blockchain forms a Directed Acyclic Graph or DAG. This DAG consists of a single chain of valid blocks leading back to the Genesis block. The Genesis block is the first ever block generated on the network, and its block hash is hard-coded into the BitcoinSV node client.

Occasionally during the block finding process, two valid blocks are found with the same prevHash. This creates an orphan race, where each of the two blocks are being built upon by separate subsets of the network.

Orphan races are usually resolved when a node within a subset that references one block over the other finds a block ahead of the other subset, inscribing the prevBlockHash of that subset’s first seen block in the newly extended chain tip. Typically, the network fully transitions to this longest chain. The block that is no longer built upon is left as an orphan block.

An orphan block attaches to that DAG on a terminated chain. This means that even though an orphan block has a valid chain of history leading back to the genesis block and a valid proof of work, it does not form part of the longest proof-of-work chain.

The possibility of wastefully contributing proof of work to an orphan chain tip incentivises nodes to be highly connected to the rest of the network with the lowest possible latency to minimise the likelihood of this outcome from occurring.

## Invalid Blocks

If a node proposes a block that fails validation tests, the proposal is ignored and other nodes continue trying to find a valid block which builds upon the previous valid block. A node may consider a block invalid due to numerous reasons including:

* The block fails a consensus rule (e.g. over size)
* The block awards the miner too many bitcoins
* The block contains an invalid transaction
* The block does not include a valid proof-of-work or timestamp

<figure><img src="../../.gitbook/assets/Chapter 4 GIF 13.gif" alt=""><figcaption></figcaption></figure>

In a situation where a node has submitted an invalid block, the block is rejected. If the node submits multiple invalid blocks, other nodes on the network may take additional steps such as blocking the node’s IP and refusing to share network information. Typically these ‘bans’ take place over a 24-48 hour period, and are intended to make node operators aware of repeated mistakes. Each node can set its own policy in this regard.

Importantly, there is a strong economic incentive (the wasted energy consumed for an orphaned proof-of-work solution) to always submit valid blocks to the network, and the system is designed to detect invalid blocks quickly and easily.

It is important to understand that nodes on the network are free to accept or reject blocks from any party for any reason. It is upon each node to ensure that they are aware of what the majority of nodes on the network have accepted as the valid chain of events. This is so that they can always be building on the longest valid chain of blocks and minimise resources used working on blocks the network will refuse to accept.





