# Transactions Assessment 3

1.How can a node be certain that the transaction they have received is the only attempt on the network to spend that/those UTXO/s?

A node must be aware of all of the transactions taking place on the network in as close to real time as possible

Nodes will be notified upon the transaction being included into a block.

Nodes cannot be certain until after the block is mined.

Wallets are known to nodes which are able to identify double spends immediately by monitoring each wallet’s activity.

&#x20;

2.How is a node incentivized to connect with other nodes to prevent double spends?

Nodes that detect double spends while building a block are rewarded with their block being accepted and built upon by the network.

Nodes are rewarded extra bitcoins for detecting and alerting other nodes to double spend attempts.

If a node creates a block using a transaction that other nodes on the network recognise as a double spend they risk wasting the expense of constructing their block and performing the proof of work.

Nodes will be considered in violation of the Bitcoin network rules if they do not report double spending attempts and may face ejection from the network.

&#x20;

3.T/F: Which statements are true? (only need to select one correct option to pass)

Consensus in Bitcoin is achieved when the majority of nodes agree on the maximum size of blocks that will be allowed on the network.

Bitcoin consensus allows for all users to play a part in protecting the network

Consensus in Bitcoin is achieved when all participants in the competitive block building process come to consensus on a single history of the order in which transactions were received.

Consensus in Bitcoin is how the community directs the development of the Bitcoin protocol.

&#x20;

4.The public announcement of all transactions is \_\_\_\_\_\_\_\_\_\_\_\_ i) and provides the fastest means for participants in the competitive block building process to \_\_\_\_\_\_\_\_\_\_\_\_\_ ii) valid block is announced to the network. Without public announcement, every time a potential block is found \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_ iii) to the rest of the network which consumes time and resources, impacting its ability to operate as effectively and efficiently as possible. The \_\_\_\_\_\_\_\_\_\_\_ iv) both transaction and block announcements is a core element of the incentives that drive the construction of the infrastructure that underpins the Bitcoin network.

i) critical to the system, ii) come to consensus on the order of events when a, iii) the discovering node must subsequently supply any missing transactions, iv) first seen rule and its application to

i) an important part of the block building process, ii) acknowledge when a, iii) other nodes will continue to work on the already completed block undisclosed, iv)importance

i) a users responsibility, ii) ensure that a, iii) nodes would need to send a notification, iv) the speed of

i) the responsibility of every node, ii) to be prepared for when a, iii) nodes would need to hurry their block out, iv) the responsibility of nodes in executing

&#x20;

5.For merchants to have confidence in receiving payments through the Bitcoin network they must be able to \_\_\_\_\_\_\_\_\_\_\_ i) to ensure that it is not \_\_\_\_\_\_\_\_\_\_\_\_ ii) This can be achieved in a variety of ways including: • Querying a selection of nodes for a \_\_\_\_\_\_\_\_\_\_ iii) that meets the merchant’s requirements. • By the merchant sending the transaction on the sender’s behalf, and receiving notification of the transaction’s validity from the nodes it uses • Through \_\_\_\_\_\_\_\_\_ iv) that notify any parties to transactions that double spend an input. Without these systems, it becomes much harder for merchants to accept Bitcoin payments for goods or services without waiting for them to be confirmed in a valid block secured by proof of work.

i) identify incoming transactions, ii) being targeted for a double spend attack, iii) output transaction, iv) wallets

i) validate transactions, ii) accidentally accepting double spent transactions, iii) incoming payment, iv) block explorer algorithms

i) check their transactions against all transactions on the network, ii) the same input is being used in a separate transaction to a different output, iii) transaction input, iv) double-spend messages

i) query the nodes who validate the transaction, ii) double spending valid inputs, iii) transaction output, iv) double-spend alarm systems
