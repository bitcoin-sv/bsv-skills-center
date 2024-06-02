---
description: Understanding blockchain abstractions and concepts
---

# Transactions

Transactions are events that are recorded and persisted on the public ledger. They are organised into blocks: a group of events that occur over a period of time that are time-stamped together.

<figure><img src="/.gitbook/assets/WhatIsBlockchain_Slide14.png" alt=""><figcaption><p>Blockchain Transactions</p></figcaption></figure>

Transactions are made up of inputs and outputs. An input will unlock the tokens it intends to spend, transferring ownership of funds from one owner to another. An output will lock tokens to the new owner. Transactions can also be considered electronic contracts that move the ownership of funds from one party to another.

To illustrate this, let’s look at some transactions between Alice, Bob, Carol and Dave. These transactions can be in the same or different blocks and can happen at any time, as shown in the following diagram.

<figure><img src="/.gitbook/assets/WhatIsBlockchain_Slide16.png" alt=""><figcaption><p>Transactions moving tokens from Alice to Bob to Charlie</p></figcaption></figure>

Alice is represented in the ledger by her public-private key-pair, but her identity is not published. When funds are transferred from Alice to Bob, a transaction is created where Alice provides her digital signature stating that she owns the funds (source of funds for Alice), and that she is transferring the ownership of them to Bob by locking access to them with Bob’s public key.

The transaction itself does not have any identifying information associated with Alice or Bob. The diagram then shows that Bob, who has received funds from Alice, now has the private key able to spend the funds. He uses transaction T2 to transfer the funds to Carol. Carol then transfers the funds to Dave in transaction T3.

<figure><img src="/.gitbook/assets/WhatIsBlockchain_Slide17.png" alt=""><figcaption></figcaption></figure>

The first transaction of every block is called a "Coinbase transaction". This transaction does not have an input and has a single output which acts to bring coins into circulation as a reward for the node which won the right to add the relevant block to the blockchain in a process known as Proof of Work. This reward consists of two components: a block subsidy and transaction fees. See [network-policies](../network-policies/ "mention") and [transaction-lifecycle](../transaction-lifecycle/ "mention") for further details.

{% hint style="info" %}
Blockchain has two distinct chains, the chain of blocks and many chains of coins. While we have already described the chain of blocks, we look at (many)chain of coins. According to the white-paper - "A coin is defined as a chain of digital signatures". At any point, the coin or the UTXO funds can be traced back to its entire history of transactions spending back to the original Coinbase transaction which brought the tokens into distribution.

The two chains together create an immutable chain of events in time or a Time-chain.
{% endhint %}

Transaction outputs that have not been used as inputs, i.e., spent, are called UTXOs (unspent transaction outputs). Just as in a bank where the total account balance of all accounts represents the total funds present in the bank, in a blockchain these UTXOs collectively represent all the tokens that can be used in subsequent transactions in the system at a given point in time.

The following diagram illustrates this comparison while also describing UTXO creation and end of existence. Blockchains maintain a UTXO database, which stores the current state of all UTXOs that exist at any point in time.

<figure><img src="/.gitbook/assets/WhatIsBlockchain_Slide18.png" alt=""><figcaption><p>UTXO Model of accounting defined by Bitcoin Protocol</p></figcaption></figure>

There is a significant difference in terms of processing when it comes to Accounts vs UTXO. A single owner can have multiple UTXOs for a single key or even have one keypair per UTXO. Unlike an account, the Identity of the owner is not attached to the UTXO and there is no need to maintain account balances (which is quite normal in account-based systems).

The UTXO model allows a blockchain to parallelise transaction processing, which is a critical factor in scaling a blockchain.

{% hint style="info" %}
As an analogy, think of a UTXO as being like a banknote; when you have a $100 bill, and you use it to buy something for $50, the original note is handed over and is, therefore, no longer in your possession. In return, you will receive a change of $50, which will be a new note, but the original $100 with your ownership is gone.
{% endhint %}

In the same way, when you spend a UTXO with 100 satoshis, this will transfer the ownership of 50 satoshis to the new owner, you may perhaps incur 10 satoshis in fees, and a new UTXO of 40 satoshis will be created, which might even be assigned to the same public key that it was spent from originally, but it becomes a new UTXO as the attributes of UTXO change (location of UTXO in a new transaction).

{% hint style="info" %}
### **Understanding the concept of the Blockchain with a safe-deposit box analogy**

Unlike account-based systems, in BSV, every individual satoshi token is a separate item -- with 1x10^8 satoshis comprising a BSV. Those tokens are put together into words (BSV coins) which are transcribed in to messages (inputs and outputs) which are put into envelopes (transactions) which are added to safe-deposit boxes (blocks) which are added to a wall of safe deposit boxes where each safe-deposit box linked to the next via a chain, in a large mine run by ruthlessly competitive, greedy, gambling, goblins. Note: a message sitting in a sealed envelope is analogous to a UTXO.

Each time an envelope is given from one party to another, the party gives a copy of the envelope and its contents to the Safe-Deposit Box goblins. The goblins verify the contents of the envelope, make a reference slip of it (Transaction ID or TXID), and add the reference slip to a safe-deposit box.

Every 10 minutes, one of the goblins hits a jackpot on a row of VLT machines sitting next to the wall of safe-deposit boxes. When a goblin hits a jackpot, they send the safe-deposit box around the room for all the other goblins to look at. If the safe-deposit box has been filled with slips correctly, the goblins show their approval by playing their VLT machine again and the goblin that won the jackpot gets to add the next safe-deposit box to the wall.

Whenever an individual wishes to send another message, they open up one of their sealed envelopes, sponge up all the ink from the messages and use the ink to create new messages which they put into one or more new envelopes. They then give the new envelopes to the party or parties that have requested them.

Satoshi tokens are never lost. As a result, the system always has the same number of tokens as when it was first created.

Ink can be reclaimed if the envelope its in can't be opened. This can be done using the Dragon box (Digital Asset Recovery or DAR). As long as you can prove ownership of the ink in the envelope (which can be expensive). The envelope goes into the Dragon Box which opens it, drains the ink, and produces a new envelope that you can open. Since the cost of proving ownership of the envelope can be high (legal fees), it's often not worth using the Dragon Box unless the amount of ink in the locked envelope is substantial.
{% endhint %}

### Transaction Inputs and Outputs

In traditional payment systems, a transaction will have a single input and single output due to the usage of account-based ledgers (Credit, Debit). Bitcoin's UTXO-based ledger allows a transaction to have many inputs and outputs.

Each output contains a predicate (evaluates to true or false) locking script that that must receive the correct missing information in order to evaluate to true when being included as an input in a new transaction. This property makes every transaction an electronic contract when used in conjunction with the public ledger. Locking scripts use a native programming language called Script (colloquially Bitcoin Script), allowing a large variety of electronic contracts to be supported natively.

<figure><img src="/.gitbook/assets/WhatIsBlockchain_Slide19.png" alt=""><figcaption><p>Transaction Inputs and Outputs</p></figcaption></figure>

These transactions effectively form a chain where the coins start their journey from the time they come into circulation (the first transaction in any block) to where they currently are assigned in terms of ownership (public keys of owners of these coins). This structure is what makes a coin effectively a chain of digital signatures.
