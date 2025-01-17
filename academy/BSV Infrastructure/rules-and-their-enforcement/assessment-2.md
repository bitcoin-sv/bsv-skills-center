# Assessment 2



### Question pool 5 - 12/15 <a href="#question-pool-5-12-15" id="question-pool-5-12-15"></a>

1. What is the Proof of Work Target Adjustment Rule?
   1. It is the rule that sets the limit on how many nodes are able to operate on the network by increasingly making it more difficult to find a proof-of-work.
   2. It's how the network adjusts the difficulty target for the proof-of-work needed to prevent any one entity from obtaining 51% of the network hashpower.
   3. **It's how the network adjusts the difficulty target for the proof-of-work needed to maintain the average block discovery rate.**
   4. All of the above.
2. The Genesis Block Rule states that blocks must be added to an \_\_\_\_\_\_\_ chain of \_\_\_\_\_\_ leading back to the genesis block
   1. existing, blocks
   2. **unbroken, proof-of-work**
   3. original, block hashes
   4. unaltered, blocks
3. &#x20;Why is the genesis block hash hard coded into the Bitcoin node client software?
   1. So nodes can automatically build on the valid chain of blocks.
   2. **To prevent malicious imitations attempting to deceive the network.**
   3. To create a “memento mori” for chain recall following a node being disconnected from the network.
   4. All of the above.
4. What does the nSequence fields of each input and the nLockTime field of the transaction determine?
   1.  Transaction format.

       Transaction fee value.

       **Transaction finality.**

       Transaction size.
5. &#x20;If the value of a transaction's nLockTime field is \_\_\_\_\_\_\_ than or equal to 500,000,000 then the field represents a \_\_\_\_\_\_\_ however if it is \_\_\_\_\_\_\_ than 500,000,000 it represents a \_\_\_\_\_\_\_\_?
   1. greater, block height, less, UNIX epoch timestamp
   2. less, block height, greater, UNIX epoch timestamp.
   3. **greater, UNIX epoch timestamp, less, block height**
   4. less, UNIX epoch timestamp, greater, block height
6. What must occur in order for a new transaction to replace a non-final transaction? (select all that apply)
   1. It is impossible to make a new transaction prior to the non-final transaction’s nLockTime expiring.
   2. It must have the same inputs in the same order.
   3. Each sequence number for all inputs in the new transaction cannot be less than those of the prior transaction’s.
   4. **The sequence number of at least one input in the new transaction must be greater than that of the prior transaction’s corresponding input.**
7. When \_\_\_\_\_\_\_  is successfully solved in the script engine using  \_\_\_\_\_\_\_, the satoshi tokens are released to be spent.
   1. the UTXO, the unlocking script
   2. the locking script, the UTXO
   3. the unlocking script, the locking script
   4. **the locking script, the unlocking script**
8. In order for the satoshi tokens to be released successfully, the full script must terminate with a \_\_\_\_\_\_\_ value remaining on the stack.
   1. zero
   2. **single non-zero**
   3. non-zero
   4. single zero
9. &#x20;The sum of the value of the \_\_\_\_\_ of a transaction must be \_\_\_\_\_ than or equal to the sum of the values of the \_\_\_\_\_.
   1.  outputs, greater, inputs

       **inputs, greater, outputs**

       Outputs, less, outputs

       UTXOs, greater, outputs
10. &#x20;If a transaction attempts to create outputs that cumulatively represent more value than the inputs it would be spending, what is it attempting to do?
    1.  To spend already used inputs.

        **To create new satoshi tokens.**

        To replace an existing transaction,

        To create an nLockTime value.
11. &#x20;How many blocks must pass before a node is able to spend the outputs of a Coinbase transaction, and why?
    1. Nodes can spend their reward after 10 blocks as this protects the network from node operators attempting to generate bitcoins beyond what is allotted by the network
    2. Nodes must wait 50 blocks to spend their rewards as an incentive to keep the network running reliably.
    3. **Nodes can spend their reward after 100 blocks to prevent node operators from using outputs from blocks that might be involved in orphan races.**
    4. Nodes need to wait 2016 blocks to prevent instability in the difficulty adjustment algorithim as per the rules implemented in 2017.
12. &#x20;What does the Transaction Format Rule specify?
    1. That transactions must conform to the data formatting rules of the Bitcoin protocol.
    2. The sizes of certain fields and their encoding schemas.
    3. Bitcoin transaction serialization.
    4. **All of the above.**
13. The inputs include which of the following? (Select all that apply)
    1. **The TXID and VOUT index of the UTXO**
    2. **A field indicating the length of the unlocking script.**
    3. **The scriptSig needed to spend the input**
    4. **The input’s nSequence number.**
14. What are transaction outputs composed of? (all or nothing)
    1. The number of outputs being spent.
    2. **The value in satoshis being locked into the output script.**
    3. **A field defining the length of the scriptPubkey.**
    4. **The output scriptPubkey or locking script.**
15. If the transaction has an input with a non-final sequence number and an nLockTime in the future, what is it considered to be?
    1. An automated payment.
    2. **Inside a payment channel.**
    3. An invalid transaction.
    4. A future transaction.
