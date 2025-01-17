# Calculations - Assessment 1



1. What is a 51% attack?
   1. A 51% attack is when an attacker creates additional bitcoins by forcing the network to accept network altering changes using a majority of network hashpower.
   2. A 51% attack is when a dishonest node creates an alternate chain which contains transactions that misallocate funds or reject valid actions using a majority of network hashpower.
   3. A 51% attack is when a dishonest node redirects it’s previously spent bitcoins back into their own wallets by using precisely 51% of the network's hashpower.
   4. A 51% attack is when a network is forced to perform dishonest actions by a node that redirects honest hashpower to the dishonest chain.
2. &#x20;If a 51% attack is successful, \_\_\_\_\_\_\_\_\_\_\_\_\_\_ i), such as creating new bitcoins or taking money that never belonged to the attacker. Nodes are \_\_\_\_\_\_\_\_\_\_\_\_ ii) as payment, and honest nodes will \_\_\_\_\_\_\_\_\_\_\_\_ iii).
   1. i) a dishonest node cannot alter the network rules, ii) looking to maintain price stability in the market because they receive bitcoins, iii) not risk losing their business due to being an accessory to fraud.
   2. i) it allows for a dishonest node to alter the network rules, ii) disincentivize to do this because they receive bitcoins, iii) not hurt their source of revenue
   3. i) it does not open the system to arbitrary changes, ii) not going to accept an invalid transaction, iii) never accept a block containing them
   4. i) It doesn't allow arbitrary changes to the network rules, ii) not concerned with earning dollars, iii) not being bribed into doing the bidding of external actors.
3. &#x20;What is a dishonest node with the majority of the hashpower able to attempt to alter in a 51% attack?
   1. Such a node can attempt to fraudulently take back payments that it had recently spent.
   2. Such a node can attempt to alter any of the transactions within the blocks it successfully validates.
   3. Such a node can attempt to alter network rules by successfully extending it’s chaintip.
   4. Such a node can attempt to reroute user payments to a wallet under its control.
4. &#x20;What is the race between the honest chain and an attacker chain referred to as and how is that race won?
   1. Block Rate Walk, the node which is able to increase its chaintip first is the winner.
   2. Hash War, the winner is whichever chain is able to force the other off of the network.
   3. 51% Attack, the success of which is determined by whoever can afford to spend the most hashpower resources for the longest amount of time while mining blocks.
   4. Binomial Random Walk, success comes with the honest chain being extended by one block, increasing its lead by +1.
5. &#x20;The attack can be characterised by viewing the honest and dishonest chaintips as a pair of \_\_\_\_\_\_\_\_\_ i), with each vying for leadership. The gap between the two chaintips can be characterised by \_\_\_\_\_\_\_\_\_\_\_\_ ii) and is increased by \_\_\_\_\_\_\_\_\_\_\_ iii) is found, while being decreased by \_\_\_\_\_\_\_\_\_\_\_\_ iv) found.
   1. i) Bitcoin forks, ii) how many blocks are found by nodes on either fork, iii) 5 every time a new block is found, iiii) 0 if no block is
   2. i) chains, ii) the number of transactions that the honest chain-tip leads with, iii) how many transactions are on the honest chain, iv) the number of transactions an attacker has found
   3. i) competing processes, ii) the number of blocks that the honest chain-tip leads with, iii) 1 every time an honest block, iv) 1 every time a dishonest block is
   4. i) competing chaintips, ii) how many blocks separate the honest and dishonest chaintips, iii) 1 every time a dishonest node’s block, iv) 1 every time an honest node’s bock is
6. &#x20;The Gambler's Ruin problem refers to what?
   1. It refers to the probability of an attacker’s dishonest chain catching up to a leading honest chain. It can be used to calculate the probability of the dishonest chain breaking even, or surpassing the honest chain.
   2. It refers to the loss of capital and wasted opportunity that the dishonest node is subjected to from a failed 51% attack.
   3. It refers to the probability a node will act dishonestly by returning previous spent funds back under its control.
   4. It refers to a method of block building that allows dishonest nodes to extend their chaintip at a faster rate than an honest node using double spends that are previously known to the dishonest node.
7. &#x20;The probability that an attacker ever reaches breakeven, or surpasses the honest chain is very strongly related to the \_\_\_\_\_\_\_\_\_\_\_ i). In a situation where the attacker can \_\_\_\_\_\_\_\_\_\_\_ ii), there is a \_\_\_\_\_\_\_\_\_ iii) chance they will eventually have the leading chaintip, however if their \_\_\_\_\_\_\_\_\_\_ iv), the chance of them ever catching up goes down with the square of the gap between the two chaintips, leading them to an ever increasing deficit against the rest of the network.
   1. i) percentage of hashpower the dishonest node controls, ii) hash blocks faster than the honest nodes, iii) 50% chance, iv) is an honest node that has a faster processing ability
   2. amount of invalid transactions it can process into blocks, ii) build larger blocks then the honest nodes, iii) small, iv) blocks are smaller than the honest nodes
   3. i) dishonest node’s ability to perform proof-of-work, ii) perform proof-of-work equal to or greater than the rest of the network, iii) 100%, iv) capability is less than the network
   4. i) honest nodes awareness of double spend attempts on the network, ii) conceal their double spend attempts, iii) high, iv) double spends are detected
