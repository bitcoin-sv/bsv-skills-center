# Simplified Payment Verification (SPV)

Simplified Payment Verification (SPV) is a method in Bitcoin that allows receivers in a peer-to-peer or P2P transaction to rapidly mitigate the possibility that the transaction's inputs have already been spent  without running a node.&#x20;

This technique leverages the properties of the blockchain to ensure that a transaction has been included in the blockchain without the need to download and verify the entire blockchain history.

#### Concept of SPV

* **Definition**: SPV enables users to confirm that a transaction has been included in a block and thus is part of the blockchain without needing to validate the entire blockchain. This is accomplished by using the longest chain of block headers and the specific Merkle branch related to the transaction being verified to perform a Merkle proof and match the result against the Merkle root of the relevant block header.

#### How SPV Works

1. **Block Headers**: The receiver keeps a copy of the block headers of the longest proof-of-work chain. Block headers are significantly smaller in size compared to full blocks, making it feasible to store and verify them without needing much storage.
2. **Merkle Tree**: Transactions in a block are hashed into a Merkle tree, with only the root hash included in the block header.
3. **Merkle Proof**: To verify a transaction, the user obtains the Merkle branch linking the transaction to the block's Merkle root. This branch proves that the transaction is part of a block.
4. **Verification**: By linking the transaction to a specific place in the blockchain, the receiver can be sure that the network has accepted the input of the transaction.

#### Example of SPV in Use

Imagine Alice wants to verify a payment she received from Bob. Instead of downloading the entire blockchain, Alice does the following:

* **Step 1**: Alice's wallet queries the network for the block headers of the longest chain.
* **Step 2**: Once Alice has the latest block headers, she calculates the Merkle proof of the received transaction using the received Merkle branch that she got from Bob.
* **Step 3**: Once she has the Merkle proof, she compares it with the Merkle roots of block headers until she finds a match confirming the transaction has been timestamped into the blockchain or no match confirming it hasn't.

#### Benefits of SPV

* **Efficiency**: SPV significantly reduces the amount of data that needs to be downloaded and processed, making it suitable for lightweight clients, such as mobile wallets.
* **Security**: As long as the majority of the network is honest, SPV provides a reliable way to verify transactions.
* **Scalability**: SPV supports the scalability of the Bitcoin network by enabling more users to participate in the network without running full nodes.

#### Limitation of SPV

* **No check if inputs have already been spent**: SPV checks if the transaction the input is coming from has been timestamped into a block but it does not check if the output being used from that transaction has already been spent

#### Protecting Against SPV Vulnerabilities

* **Performing an additional double-spend check**: One strategy to mitigate the risk of accepting fraudulent transactions is to perform a double-spend check by submitting the transaction to the network and waiting a minute to see if it gets accepted or rejected.
* Limiting SPV use to small-value transactions: SPV is aimed at small-value transactions and should not be used for high-value transactions; although, there are already laws in place that require additional checks for high-value transactions such as when purchasing property or a vehicle.
