# Chapter 6 - Assessment

Question 1

| **What does SPV stand for?**    |
| ------------------------------- |
| Simplified Payment Verification |

Question 2

How can a transaction with zero confirmations be considered effectively settled?&#x20;

* [ ] If a transaction has been validated by a node and they will include it in a block, then it can be considered effectively settled.&#x20;
* [x] If a transaction has been validated by a number of nodes who share transactions received with one another in real time, then it can be safely assumed that the transaction is settled.&#x20;
* [ ] By increasing the fees associated with your transaction you can increase the likelihood of your transaction being validated by a miner.&#x20;
* [ ] O confirmation transactions cannot be considered settled.

Question 3

Given the following list of actions. What is the correct sequence of events for an SPV transaction?

&#x20;

| **Action**                                                                                        | **Sequence (1-6)** |
| ------------------------------------------------------------------------------------------------- | ------------------ |
| Broadcast the transaction to the network.                                                         | 4                  |
| Query random subset of miners for transaction status.                                             | 5                  |
| Store the chain of block headers locally.                                                         | 1                  |
| Transaction can be safely considered settled and goods can be released to customer.               | 6                  |
| Verify the UTXO can create the same Merkle root as in your local storage of headers.              | 3                  |
| Receive the Merkle path for the UTXOs of the transaction from either payer or request from nodes. | 2                  |

Question 4

What techniques can help increase the security for network users in the event of an attacker trying to extend a dishonest chain tip that includes double spends?

* [ ] mAPI&#x20;
* [ ] MinerID&#x20;
* [ ] Coinbase Maturity Rule&#x20;
* [x] All of the above.

Question 5

&#x20;

Can offline transactions be securely performed in Bitcoin?

* [ ] Yes, for the sender only.&#x20;
* [ ] Yes, for the receiver only.&#x20;
* [x] Yes, for either the sender or receiver.&#x20;
* [ ] No
