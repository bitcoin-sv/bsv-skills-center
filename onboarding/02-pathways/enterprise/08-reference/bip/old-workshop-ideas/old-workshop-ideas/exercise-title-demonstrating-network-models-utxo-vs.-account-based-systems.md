# Exercise Title: Demonstrating Network Models - UTXO vs. Account-Based Systems

Objective: To showcase the efficiency of the UTXO model in achieving eventual consistency compared to the Account-Based model, emphasizing the CAP theorem problem inherent to the latter.

Materials:

* A set of colored tokens to represent transactions (use two different colors for two types of transactions: incoming and outgoing).
* Sheets of paper or cards to represent individual accounts (for the account-based model) or individual transaction outputs (for the UTXO model).
* Participants divided into two groups.

Procedure:

1. Account-Based Model:

a. Assign each participant an 'account' card. b. Distribute an initial set of 'incoming' transaction tokens to the participants. c. Instruct the participants to start passing the tokens around to simulate transactions. When a participant passes an 'incoming' token to another participant, they must also pass a corresponding 'outgoing' token to represent the change in account balance. d. Each participant must update their account card each time they receive or send a token. e. All participants must keep each other informed of their account balances - this simulates the need to propagate the global state.

2. UTXO Model:

a. Assign each participant a set of 'transaction output' cards. Each card should represent a UTXO. b. Repeat the transaction simulation as above. However, instead of updating an account balance, participants 'spend' a UTXO by giving the corresponding card to another participant, and then create a new UTXO card for any change received. c. There's no need to inform others about the transactions unless they are directly involved.

The participants should notice the complexity and inefficiency involved in the account-based model, where every transaction affects the global state and must be propagated to all participants. In contrast, the UTXO model allows participants to engage in transactions independently, without needing to constantly update and share a global state. This exercise, thus, highlights the benefits of the UTXO model in achieving eventual consistency in a more efficient and practical way compared to the account-based model.
