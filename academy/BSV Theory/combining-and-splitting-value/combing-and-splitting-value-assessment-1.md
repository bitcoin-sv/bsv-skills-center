# Combing and Splitting Value - Assessment 1



1. How is Bitcoin able to merge and split outputs in order to form a single transaction?
   1. Once a bitcoin transaction is created all outputs are pieced together into a single transaction that returns any change caused by overspending.
   2. As a bitcoin transaction takes place, multiple inputs are used to bind the outputs into a single outgoing transaction.
   3. As a bitcoin transaction occurs, unspent transaction outputs are gathered into the transaction as inputs and spent into a new combination of outputs scripts.
   4. Nodes merge and split outputs at the behest of users for a fee that is determined by the amount of outputs being created.
2. &#x20;Why is being able to merge and split outputs necessary for bitcoin transactions?
   1. Without doing so the requirement to sign a new output for each satoshi in the transaction would make it economically unfeasible to manage the ledger.
   2. Doing so brings additional privacy to Bitcoin transactions by obscuring patterns of transactions that can be used to identify particular wallet.
   3. It is necessary for performing hashing in order to generate a transaction ID to be used in the Merkle tree.
   4. All of the above.
3. &#x20;How does Bitcoin simplify transactions consisting of many small inputs?
   1. By aggregating small coins into a single payment.
   2. By creating many small transactions all linked via the merkle root within the blockheader.
   3. By using Simplified Payment Verification to link small inputs together into a single transaction.
   4. By hashing each transaction together to form the transaction ID.
4. &#x20;How is a single Bitcoin transaction able to pay out to multiple parties?
   1. A single Bitcoin is a dynamically sized data packet that can be distributed to multiple parties using multiple nodes.
   2. A single Bitcoin transaction can pay out to multiple parties by using separate inputs.
   3. A single Bitcoin transaction can facilitate multiple payments utilizing separate output scripts.
   4. None of the above.
5. &#x20;What is the overall benefit of dynamically sized coins in terms of usefulness and scalability?
   1. It ensures that each transaction can be made in a correct amount without requiring sender to receive ‘change’ for overpayment.
   2. It allows for reduced consumption of limited block space and provides suitable data sizes for off-chain payment networks.
   3. It enables enhanced privacy and incentivizes nodes to create blocks large enough to facilitate large quantities of small coins to obscure payment amounts.
   4. Provides full spectrum payment capabilities such as micropayments of bitcoins on the ledger without the burden of breaking down outputs into arbitrarily sized pieces.
