# Security and Honesty

> The system is secure as long as honest nodes collectively control more CPU power than any cooperating group of attacker nodes.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Introduction - Security and Honesty.gif>)

As long as there is a pool of nodes who are competing to collect and append new transactions to the longest chain of proof of work, the system’s security is maintained. This system works against fraudulent actors both in the payments system, and at the node level by allowing honest systems to reject blocks which include transactions that double spend inputs they have already seen used in validated transactions or which violate the established rules of the network.

This enforcement is achieved through accumulation of work by honest nodes within the system and creates a situation where attackers must overpower the network for an indefinite amount of time in order to maintain a chain of work that includes the fraudulent activity. In this way, the hashpower that performs the work on blocks acts as an enforcement system, allowing the honest actors within the network to collectively expend enough energy to outpace the attacking systems over time.

Time in this scenario is open ended and attacking chains can emerge which retain an appearance of legitimacy and viability for extended periods of time. Thankfully, due to the high cost of performing proof of work, the dishonest nodes are forced to spend large sums of money to maintain the fraud. This expenditure is financially nonviable to maintain, eventually leading to the re-emergence of the honest chain as the legitimate record of activity on the ledger.
