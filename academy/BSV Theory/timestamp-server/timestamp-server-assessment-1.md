# Timestamp Server Assessment 1

1.How does a timestamp server work and what does a timestamp prove?

A timestamp server uses a connection to a U.S time standard NIST-F2 atomic clock which provides the correct time each transaction occurred down to the millisecond.

&#x20;

A timestamp server works by creating a hash of an item and the time then widely publishing that hash. It establishes proof that the time stamped data existed at that point in time.

A timestamp server uses Unix time to provide the exact time each transaction occurred and then chronologically ordered into a block.

&#x20;

A timestamp server provides a proof of an exact time that a transaction occurred by querying the Bitcoin ledger.

&#x20;

2.Each transaction is considered by the network to be\_\_\_\_\_\_\_\_\_\_ i). Nodes use the \_\_\_\_\_\_\_\_\_\_ ii) as an input into the block’s own hash function. As nodes find valid blocks, each transaction is published as part of a block, and through the hash of the transaction message \_\_\_\_\_\_\_\_\_ iii) at the time the block was found.

i) a separate item or event, ii) hashed transaction message, iii) it can be provenly shown to have existed

&#x20;

i) fraudulent until proven otherwise, ii) transaction, iii) it can be determined to be fully valid

&#x20;

i) a timestamp, ii) transaction hash, iii) the transaction is finalized

&#x20;

i) integral part of a block, ii) transaction time, iii) a node knows when the transaction was created

&#x20;

3.What happens to blocks that are broadcasted to the network and what is it similar to doing in the physical world?

Blocks are broadcasted to the network and all the nodes get to work processing it. This is akin to oil being extracted from the ground and undergoing refinement into gasoline.

&#x20;

Blocks are broadcasted to the network and as long as they are verified by all other nodes then they are accepted. This is akin to a panel decision in a centralized system.

&#x20;

Blocks are broadcasted to the network and the first node to receive that block wins the block reward. This is reminiscent of playing the lottery.

&#x20;

Blocks are broadcasted across the whole Bitcoin network and either accepted or rejected by the rest of the nodes in the competition. These broadcast events can be considered akin to the publishing of a notice on a publicly available bulletin board or website.

&#x20;

4.How are blocks linked and what is the name for such a process?

Blocks are linked by the last transaction in each block creating a chain of transaction hashes back to the original block, the “Satoshi Block”.

&#x20;

Blocks are linked by incorporating the hash of the previous block into each transaction creating a chain of blockchain hashes leading back to the very first block, the “Origin Block”.

&#x20;

Blocks are linked by incorporating the hash of the previous block in the block header creating a chain of timestamped hashes leading back to the very first block, the “Genesis Block”.

&#x20;

Blocks are linked by previous block hashes creating a merkle root that leads back to the very first block, the “Bitcoin Block”.

&#x20;

5.What happens each time a new block is added to the chain of blocks and how does that make the network more secure?

The cumulative proof-of-work built upon all the blocks preceding it is increased. In this way, as transactions age they become more secure through the proof of work applied to all blocks that come after.

&#x20;

As the chain of blocks grows so does the amount of transaction data attackers would need to replicate in order to deceive honest nodes.

&#x20;

Each block represents an additional layer of security by preventing access to the transactions in the previous block.

&#x20;

Each time a block is added to the chain all the blocks preceding it are reverified to ensure that there has been no hidden alterations to previous transactions.

&#x20;

6.T/F: Which statements are true? (only one correct selection necessary to pass)

Bitcoin’s proof-of-work chain forms a separate and distinct DAG from the transaction ledger commonly referred to as the Time chain or Block chain.

&#x20;

The contents of Bitcoin’s proof-of-work chain are an immutable record of what took place on the ledger and the order in which it took place.

&#x20;

Any transaction that contradicts an event such as a double spend, that has been recorded in a block which forms part of the chain is considered invalid and can never become a part of the longest chain of proof of work.

&#x20;

Double spend attempts are included in the longest chain of proof-of-work even though they are non-actionable and serve as a record of attempted fraud.
