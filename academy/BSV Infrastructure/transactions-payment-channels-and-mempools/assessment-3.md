# Assessment 3



### 6 of 8 <a href="#id-6-of-8" id="id-6-of-8"></a>

&#x20;

1. How is an nLockTime that is in the future handled once all the transaction inputs have the maximum nSequence value?
   1. **It is ignored because the transaction is final and can be included within a block.**
   2. The node waits until nLockTime passes to mine the transaction regardless of nSequence
   3. None of the transation’s outputs can be spent until nLockTime passes.
   4. nLockTime is automatically updated to the same time as the block the transaction is mined in.
2. Non-final transactions are replaceable with what?
   1. Transactions with the same inputs but with a lower nSequence number.
   2. Transactions with different inputs but the same nSequence number.
   3. Transactions that include the same inputs and the same nSequence number.
   4. **Transactions that include the same inputs with a higher nSequence number.**
3. What is recorded on the Bitcoin ledger when a payment channel is used and then closed?
   1. The initial, and final versions of the channel are recorded on-chain.
   2. Nothing. Payment channels are never recorded on the ledger.
   3. **Only the final version of the payment channel’s transaction is recorded on-chain.**
   4. Every submitted iteration of the transaction is recorded on-chain.
4. A channel can be closed by finalizing the \_\_\_\_\_\_\_ of the transaction inputs or waiting for its \_\_\_\_\_\_.&#x20;
   1. **nSequence values, nLockTime to expire.**
   2. nLockTime, nSequence to finalize.
   3. Input’s maximum nSequence values, finalization.
   4. nSequence expiry, block height.
5. What does a node do once it receives a valid transaction?
   1. **It inserts it into one of its mempools based on its finality and the node’s local policies.**
   2. It includes it into its next block.&#x20;
   3. It inserts all types of valid transactions into the main mempool.
   4. It inserts final transactions into the main mempool and non-final transactions into the secondary mempool.
6. How many transaction pools may a node retain?
   1. Three.
   2. **As many as it wishes.**
   3. One.
   4. Those which are available through the BitcoinSV node client software.
7. Transactions in a node's secondary mempool generally contain transactions \_\_\_\_\_\_\_ but \_\_\_\_\_\_\_\_.
   1. That are valid, below the node’s fee policies.
   2. that are valid, but don’t follow the network rules.
   3. that are non-standard and too large to process for the node, are still valid
   4. **below the node’s transaction fee limit, above the network-wide minimum fee.**
8. The non-final mempool stores \_\_\_\_ transactions that are not yet final and deals with transactions which can theoretically be updated around \_\_\_\_ times per \_\_\_\_.
   1. Complex, 43, iteration.
   2. non-final, 4.3 million, minute
   3. **valid, 4.3 billion, input**
   4. invalid, 43 billion, transaction
