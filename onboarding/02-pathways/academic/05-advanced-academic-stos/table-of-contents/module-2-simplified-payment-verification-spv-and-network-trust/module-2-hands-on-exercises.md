# Module 2 Hands-On Exercises

**Exercise 1: Building a Merkle Tree and Finding a Merkle Path**

**Objective:** Learn to construct a Merkle tree from a set of transaction hashes, identify the Merkle root, and determine the Merkle path for a specific transaction. This exercise introduces Merkle trees as the structural basis for SPV, allowing participants to understand how lightweight verification is achieved.

***

**Scenario:**\
Imagine you have a set of transactions in a block, and you want to verify the inclusion of a specific transaction within that block without needing all the transaction data.

**Steps:**

1. **Create a List of Transaction Hashes:**
   * Start with four hypothetical transaction hashes (for simplicity, you can use short codes like `TX1`, `TX2`, `TX3`, and `TX4`).
   * These hashes represent the transactions within a block that will be organized into a Merkle tree.
2. **Build the Merkle Tree:**
   * Pair the transaction hashes and hash each pair to form the next level in the tree.
     * For example, hash `TX1` and `TX2` together to create `H12`, and hash `TX3` and `TX4` together to create `H34`.
   * Hash `H12` and `H34` together to create the final Merkle root.
   *   You should now have a structure like this:

       ```markdown
       markdownCopy code  Merkle Root
             |
           H12   H34
           / \   / \
         TX1 TX2 TX3 TX4
       ```
3. **Identify the Merkle Path for a Specific Transaction:**
   * Choose a transaction to verify, such as `TX1`.
   * To verify `TX1`, you need the Merkle path, which includes `TX2` (the sibling of `TX1`) and `H34` (the hash of the other branch).
   * The Merkle path for `TX1` would therefore be: `[TX2, H34]`.
4. **Verify the Transaction Using the Merkle Path:**
   * Imagine you have only the Merkle root, `TX1`, and its Merkle path `[TX2, H34]`.
   * Hash `TX1` and `TX2` to get `H12`, then hash `H12` with `H34` to reconstruct the Merkle root.
   * If the computed Merkle root matches the known Merkle root, `TX1` is verified as part of the block.

**Reflection:** Write a brief summary covering:

* How the Merkle tree organizes transactions in a block and provides a unique Merkle root.
* The role of the Merkle path in verifying a transaction’s inclusion without needing all transactions.
* Why Merkle paths are essential for SPV, allowing participants to confirm transaction integrity efficiently.

***

**Exercise 2: Using SPV for Real-Time Validation of a Small Payment**

**Objective:**\
Understand how Simplified Payment Verification (SPV) can be used to verify the validity of a small payment transaction immediately, without waiting for it to be confirmed in a block. This exercise illustrates how SPV enables the receiver to confirm a transaction’s authenticity by validating the STO against their local headers and checking for network presence, thus confirming the transaction in real time.

***

**Scenario:**\
Imagine a user wants to pay for access to a paywalled article. The recipient (e.g., the content platform) wants to validate the transaction immediately, without waiting for it to be included in a block. Using SPV, the platform can confirm the transaction’s authenticity and determine that it is not a double spend, allowing instant access to the article.

**Steps:**

1. **Initiate the Payment Transaction:**
   * The user creates a transaction with a small STO, such as 100 satoshis, to pay for access to the article.
   * The transaction includes the STO, which is locked with the recipient’s public key and carries the required payment amount.
2. **Check the STO’s Validity Locally:**
   * The recipient platform verifies the STO’s validity by performing a Merkle path authentication against their own locally stored block headers.
   * This step confirms that the STO is valid and has the necessary value to cover the payment.
3. **Confirm Network Presence and Check for Double Spending:**
   * The recipient checks that the transaction is being propagated across the network, ensuring that it has been “seen” and is circulating in the mempool.
   * The platform monitors for any conflicting transactions, confirming that no double spend attempt has been made for the same STO.
4. **Instant Access Granted:**
   * Once the recipient has verified the STO’s validity and confirmed its presence on the network, they grant the user access to the article without waiting for a block confirmation.
   * This process provides real-time validation and immediate confirmation for small payments, enhancing user experience by removing the delay typically associated with blockchain confirmations.

**Reflection:**

* Write a brief summary of how SPV allows the recipient to validate a transaction in real-time, enabling immediate confirmation for small payments.
* Reflect on the advantages of using SPV for casual transactions, where waiting for a full block confirmation may be unnecessary and impractical.
* Consider how SPV can be used in similar scenarios for other types of digital content or small transactions, providing trust and convenience without full blockchain verification.

***

**Exercise 3: Designing a Decentralized Content Access Model Using SPV**

**Objective:** Explore how SPV can be used in a peer-to-peer (P2P) content access model, where users can directly pay content creators and use SPV to verify payments. This exercise highlights how SPV can support a decentralized, scalable system for accessing pay-per-view content.

***

**Scenario:**\
Imagine a decentralized platform where users make direct payments to content creators to access their work. Each transaction is verified with SPV to ensure trustless access control.

**Steps:**

1. **Outline the Content Access Workflow:**
   * A user sends a micropayment to a creator to access a piece of content, such as an article or video.
   * This payment triggers the generation of a transaction and provides the necessary Merkle path for verification.
2. **Integrate SPV for Real-Time Access Control:**
   * Using SPV, the content platform (or the creator’s server) receives the transaction details along with the Merkle path and block header.
   * The platform verifies the payment by reconstructing the Merkle root with the Merkle path, confirming the payment’s inclusion in the block.
3. **Grant Access to Content:**
   * Once the SPV verification is successful, access to the content is granted.
   * This model enables a direct, secure P2P interaction without relying on a centralized platform to verify payments.

**Reflection:**

* Reflect on how SPV benefits content creators by allowing for decentralized access control while maintaining security.
* Consider the potential for similar SPV-based models in other pay-per-use services and how they support a scalable P2P ecosystem without centralized dependencies.

***

These exercises help reinforce the foundational concepts of SPV, Merkle trees, and paths while illustrating real-world applications, preparing participants for more complex interactions and workflows involving SPV.
