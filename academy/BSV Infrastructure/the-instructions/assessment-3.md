# Assessment 3

### Question pool 3 - 6/8 <a href="#page-11-question-pool-3-6-8" id="page-11-question-pool-3-6-8"></a>

1. Why should a node propagate its proof-of-work solution to every other node as quickly as possible?
   1. To prevent any attempts by a competing node to start working on a new block before it.
   2. **To minimize the chance that another node propagates a competing block to the network.**
   3. To prove it is a node.
   4. All of the above
2. What is it called when two valid blocks, with valid proof-of-work solutions and the same previous block are propagated to the network?
   1. **An orphan race.**
   2. A 51% attack.
   3. A hard fork.
   4. A double spend.
3. What do valid blocks represent?
   1. Incorruptible records of valid transactions.
   2. Proof of existence for all the transactions they contain.
   3. An accepted timestamp for all of the transactions they contain.
   4. **All of the above.**
4. Why does the network trend towards having nodes that are densely interconnected?
   1. Such connectivity ensures that the most hashpower is available to solve the block puzzle quickly.
   2. It allows the nodes to validate more transactions, making it easier to build bigger blocks more consistently.
   3. **Better connected nodes are more quickly able to both distribute their own new blocks and validate new blocks from other nodes, reducing the risk of orphan races occurring.**
   4. All of the above.&#x20;
5. If a node receives a block that contains a transaction that is invalid, or a transaction that spends an already used output, what must the node do?
   1. It must retain that block for its own ledger.
   2. It must first check to see if any other nodes are accepting it as valid and follow their decision.
   3. It must immediately propagate that block to the rest of the nodes in the network.
   4. **It must reject the block as it is invalid.**&#x20;
6. Once a node accepts a competitor’s block as valid what should a node begin doing?
   1. Scanning the other node’s mempool to see if it is missing any transactions needed for the next block.
   2. **Clearing the transactions that were in the block out of its own mempool, using any remaining transactions to construct the next block template’s Merkle tree.**
   3. Immediately begin working on a competing proof-of-work that meets the difficulty target of the network.
   4. Nothing as it must wait until it is certain there will not be an orphan race.
7. What kind of outcome does Bitcoin’s traceability and incentive structure produce?
   1. One in which government financial regulations will be made unnecessary.&#x20;
   2. An environment where pseudo anonymity and anonymity are available to all users of the internet.
   3. One in which criminal activity cannot take place using the network.
   4. **One in which honest and lawful action is the most profitable.**
8. How do nodes set and enforce the rules?
   1. By competing in finding proof-of-work.
   2. By validating transactions based upon what each node thinks is best for the network.
   3. **Through the use of Nakamoto Consensus.**
   4. All of the above
