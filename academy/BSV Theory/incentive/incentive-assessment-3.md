# Incentive - Assessment 3



1. For how many blocks are nodes prevented from spending coinbase transactions and how does that incentivize nodes?
   1. Until 1000 blocks have been built on top of the awarded block. This ensures that miners do not sell recently acquired bitcoins on the open market which would create downward pressure on the price of bitcoins.
   2. Only until one other block has been built on top of the awarded block. This ensures that the block is accepted by the network before the reward can be spent by the block winning node, preventing any attempt at defrauding the network.
   3. Until 100 blocks have been built on top of the awarded block. This means that without the support of the majority of competing miners, their coinbase reward might never become a permanent part of the ledger, rendering the coins it contains unspendable. Therefore it is in a node’s best interest to behave honestly.
   4. Only 10 blocks need to be built on top of the awarded block. This is necessary to achieve consensus by providing enough time for all other nodes to verify the block is acceptable.
2. &#x20;How are nodes subject to the dishonesty of other nodes?
   1. For a node to create a block with dishonest activity in it, such as a double spent transaction output or extra coinbase rewards, the rest of the network would have to collectively support their dishonest behaviour, investing proof of work and building upon the dishonest actions taken.
   2. Nodes can easily be fooled by dishonest nodes with a significant amount of hashpower. This is why users must be vigilant and run their own node.
   3. When a node creates a dishonest block it can easily deceive others nodes by swamping the network with “spam” transactions and force other nodes to follow it’s chain.
   4. Due to the decentralized nature of the Bitcoin network, no nodes can be held liable for the dishonest activity of another node. In the case where a dishonest node has double spent a transaction that is then been built upon by an unwitting honest node, the honest node becomes as much a victim of the dishonest node as the double spend attack victim that had been defrauded of its payment.
3. &#x20;Which statements are true?(one correct selection necessary to proceed)
   1. Nodes derive income through the coins awarded in the coinbase transactions of valid blocks. Coinbase rewards are prevented from being spent until 100 blocks have passed since the reward was issued and therefore without the support of the majority of the network nodes, a coinbase reward may never become a permanent part of the ledger, thereby rendering the coins it contains unspendable.
   2. For a node to create a block with dishonest activity, such as including a double spent transaction output or extra coinbase rewards, the rest of the network would have to collectively support their dishonest behaviour, thereby investing proof of work and building upon the dishonest actions taken.
   3. Node operators are by and large secretive operations not beholden to laws and remain anonymous. Therefore they are unlikely to suffer the consequences of any illegal behaviour.
   4. Spending money on proof-of-work to build upon a block containing knowingly fraudulent activity is highly risky for an individual node, and if perpetrated by the majority of the nodes on the network would represent an existential threat to the network and their livelihoods. Additionally such actions would be highly visible and hence be easily thwarted.
4. &#x20;To conduct a \_\_\_\_\_\_\_\_\_\_ i) on the network, the attacking node must accumulate enough hashpower to \_\_\_\_\_\_\_\_\_\_ ii) nodes on the network, and must then pay to maintain that hashpower \_\_\_\_\_\_\_\_\_\_\_ iii), while it tries to convince the remaining nodes on the network to support its illegal actions.
   1. i) double spend attack, ii) overrule more than half of the other, iii) for an indefinite period of time
   2. i) 51% attack, ii) deceive other, iii) for 24 hours
   3. i) double spend attack, ii) control the other, iii) constantly
   4. i) double spend attack, ii) force off other, iii) in order to continue the network
5. &#x20;Which statements are true?(one correct selection necessary to proceed)
   1. Maintaining an attack on the network as a single malicious actor is tremendously expensive due to the cost of performing proof of work.
   2. The attacker must break the law in plain-sight using the Bitcoin ledger in full view of the public and law enforcement.
   3. An attacker only needs to maintain an attack long enough for 100 blocks to be built upon their invalid block.
   4. It is far less risky and much more lucrative for a node controlling a large quantity of hash power to participate as an honest actor securing the network to legitimately win honest rewards as income.
