# Module 3 Hands-On Exercises: Building on the Digital Envelopes and Ordered Mail Bag Analogy

**Exercise 1: Selecting and Packing STOs into a Transaction Mail Bag**

**Objective:**\
Practice selecting specific STOs for a transaction, signing them for spending, and organizing them into an ordered mail bag. This exercise helps illustrate how each STO serves as a unique, independent envelope, and how transactions act as ordered, registered mail bags that can securely carry multiple STOs.

***

**Scenario:**\
You need to create a transaction to send a payment by selecting and packing specific STOs into a transaction. Each STO represents a distinct envelope with a set value, and the transaction mail bag collects these envelopes in a fixed order, ensuring that once packed, they cannot be moved or rearranged.

***

**Steps:**

1. **Define Your Available Local STOs:**
   * You have a local set of four STOs available to you:
     * **STO #1**: 50 units, locked with PubKey1
     * **STO #2**: 100 units, locked with PubKey2
     * **STO #3**: 150 units, locked with PubKey3
     * **STO #4**: 200 units, locked with PubKey4
2. **Determine the Required Payment Amount:**
   * Assume you need a total of **300 units** for your transaction.
3. **Selecting the Appropriate STOs:**
   * Choose STOs that together meet or exceed the 300-unit requirement.
   * For example, you might select **STO #2 (100 units)** and **STO #4 (200 units)**, totaling exactly 300 units.
4. **Unlock the Selected STO Envelopes:**
   * Use the correct private keys to sign each selected STO, effectively “unlocking” each envelope so it can be packed into the transaction mail bag:
     * **PrivKey2** unlocks **PubKey2** for STO #2.
     * **PrivKey4** unlocks **PubKey4** for STO #4.
5. **Pack the STOs into the Transaction (Mail Bag):**
   * Arrange the selected STOs in a fixed order within the transaction.
   * Once packed, these STOs cannot be rearranged, similar to how items in an ordered mail bag must stay in sequence.
   * This order ensures each STO’s position is fixed for auditability and verification.
6. **Prepare the Transaction for Broadcast:**
   * Add your digital signatures (unlocking scripts) to the transaction, completing the mail bag and making it ready for broadcast.
   * Broadcast the transaction to the network, allowing the STOs to reach the global state where they will be validated and permanently recorded.

**Reflection:**

* Describe how each STO functions as an independently managed unit of value or data within the transaction.
* Explain the role of the transaction as an ordered mail bag that secures and organizes multiple STOs in a specific sequence.
* Reflect on how this structure supports scalability by allowing each envelope (STO) to be handled independently, ensuring efficient, traceable workflows.

***

**Exercise 2: Verifying and Confirming STOs in a Transaction**

**Objective:**\
Simulate the role of a verifier who confirms the authenticity and validity of STOs within a transaction before it is added to the blockchain. This exercise helps you understand how transactions become final and how STOs are validated as individual envelopes within a globally recognized registered mail bag.

***

**Scenario:**\
As a verifier (like a miner), you receive a transaction that contains several STOs packed as envelopes in a registered mail bag. Your task is to validate that each STO meets network rules, is properly signed, and that the total input amount covers the outputs and fees.

***

**Steps:**

1. **Retrieve the Transaction Mail Bag:**
   * You receive a transaction containing STOs in an ordered mail bag.
   * Each STO has a specific position and cannot be rearranged.
2. **Verify Each STO’s Validity:**
   * For each STO in the transaction, check:
     * That the STO has not already been spent.
     * That the value of each STO matches what’s recorded in the global STO set.
     * That each STO’s digital signature is valid, ensuring that the correct unlocking script has been used.
3. **Check Transaction Balances:**
   * Ensure that the total input value of the STOs meets or exceeds the total output value plus the network fee.
   * Confirm that the transaction follows the rule where the sum of output STO values is less than the sum of input STO values.
4. **Prepare for Mining (Simulate the Proof of Work):**
   * To simulate mining, assume a simple Proof-of-Work mechanism where you must find a random number below a specified target.
   * Try a series of random numbers until you find one that meets the target requirement, representing a successful “mining” of the transaction.
5. **Broadcast the Block with Validated Transaction:**
   * Once the transaction has been validated and "mined," broadcast it as part of a new block.
   * This action locks the transaction’s contents on the blockchain, solidifying each STO’s position and value in an immutable ledger.

**Reflection:**

* Summarize the steps taken to confirm that each STO is valid and has the correct value.
* Describe how the fixed order of STOs in the transaction mail bag supports traceability and ensures that each step is securely documented.
* Reflect on the importance of verifying each STO independently to prevent double spending and maintain network integrity.

***

These exercises guide learners through the process of selecting, validating, and finalizing STOs within transactions, gradually building a concrete understanding of how STOs operate as independent envelopes and how transactions secure them in a structured, ordered mail bag. This analogy reinforces the process of locking and verifying STOs, leading to a deeper appreciation for BSV’s scalable and secure transaction model.
