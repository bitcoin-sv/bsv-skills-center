# Hashcash

> To implement a distributed timestamp server on a peer-to-peer basis, we will need to use a proof-of-work system similar to Adam Back's Hashcash \[6], rather than newspaper or Usenet posts.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Proof Of Work - Hashcash (2).gif>)

The implementation of Bitcoin’s distributed timestamp uses hash-based proof of work to give nodes the ability to demonstrate their willingness to both invest in network infrastructure and place operational expenditure at risk via the hashing competition.

Hashpower can be dynamically deployed giving owners of hashing machinery the ability to vote for nodes they believe are most capable at gathering and timestamping events. Hashcash was originally conceived as an anti-spam measure for email inboxes and was intended as a means to set a price on sending an email to disincentivise the creation of the hundreds of billions of spam emails that are sent every day to user inboxes.

In the context of Bitcoin, the proof of work is used as a signal from one node to another that they are a capable and dedicated player on the network whose block solutions deserve consideration for insertion into the chain. This is important because the cost of one node connecting to, receiving and validating a block from another node is not trivial. Famously, this solution solves the Byzantine Generals Problem\* which has long stood in the way of the implementation of distributed computing networks that do not require a central governance system.

_\*Byzantine Generals Problem is a term used in computing to explain a situation where components of a system may fail if participants don’t agree on a strategy to deal with the problem. The problem assumes that some of the participants are bad actors who may spread misinformation or are in some way unreliable._

_Imagining a war where many different armies must work together to conquer a common enemy in a situation where there are an odd number of armies, common consensus must be reached in order to successfully attack. But, certain generals of some armies choose to disagree, leading to a critical system failure._

_This failure is known as a Byzantine Fault, in computing this is when it is unclear whether a component in a network is working properly or not. In Bitcoin each node is considered a ‘general’ who contributes to the consensus of a network._

\
