---
description: >-
  The main function of a node is to ensure transactions are validated against
  the UTXO set against double spending and propagate them to all the other nodes
  in the network.
---

# Transaction Validation

The transaction validation process is composed of many underlying components. These components together orchestrate the execution of steps required for the validation of a transaction. Transaction verification for block validation follows the same criteria as well.

A logical summary of the validation checks done as part of transaction validation are mentioned below:

* The transaction’s syntax and data structure must be correct.
* Neither lists of inputs or outputs are empty.
* The transaction size in bytes is less than Maximum Block Size value.
* Each output value _x_, as well as the total, must be within the range 0 < _x_ < 21\*106.
* None of the inputs have null hash in script.
* _nLockTime_ is less than or equal to 0xFFFFFFFF.
* The transaction size in bytes is greater than or equal to 100.
* The number of signature operations is less than the signature operation limit.
* The unlocking script, and the locking script _must comply to validation rules_.
* A matching transaction in the pool, or in a block in the main branch, must exist for all the Inputs.
* For each input, if the referenced output exists in any other transaction in the mempool (double spend attempt), the transaction must be rejected.
* For each input, if the referenced output transaction is a Coinbase output, it must have at least 100 block confirmations.
* For each input, the referenced output must exist and cannot already be spent.
* Using the referenced output transactions to get input values, check that each input value, as well as the sum, are in the allowed range of values _x_, i.e. 0 < _x_ < 21\*106.
* Reject if the sum of input values is less than sum of output values.
* Reject if transaction fee would be too low to get into an empty block.
* The unlocking scripts for each input must validate against the corresponding output locking scripts.

These conditions are part of the transaction validation process, and every transaction goes through these validation steps. A high-level view of what happens in the transaction validation process is described in the following diagram.

<figure><img src="../../../.gitbook/assets/image (9).png" alt=""><figcaption></figcaption></figure>

A new transaction that is received by the BSN is passed on to the transaction manager component, which kick-starts the transaction validation process. There are four components that make up the transaction validation process. Let us look at each one of them.

{% hint style="info" %}
Nodes do not need to validate every transaction. In fact, the White Paper states that “Nodes can leave and rejoin the network at will, accepting the proof-of-work chain as proof of what happened while they were gone”.

The white paper defines what a node does, if a node receives a transaction, it MUST validate and propagate it.

A node can stop accepting transactions, but they risk losses in terms of being able to compete with other nodes who accept all transactions.
{% endhint %}

### **TxManager**

Performs basic checks for a new transaction and creates inputs for the transaction validation component.

* TxManager consumes the new transaction message and creates two distinct messages for handling the inputs and outputs present in the transaction
* In doing so, it will first validate the transaction for schema, completeness, and non-duplication
* It then processes the message it created for Inputs and validates each UTXO that is being spent. If the validation is successful, it passes the validated transaction message to transaction validation component.
* It also calls the transaction storage component to store the transaction if its valid.
* In parallel, the UTXOStorage component will consume the message created for the outputs of the transaction, and it will store the outputs as the newly added UTXOs.

### **TxStorage**

Tx storage is used by the TxManager component to store the new raw transaction received after the basic checks are passed, like duplication and sanity checks.

### **TxValidator**

The TxValidator performs the complete transaction validation checks, script validation and produces the final response of the transaction validation status.

* TxManager once it has performed the basic sanity checks, will call TxValidator to perform a full verification of transaction against the consensus rules and local policy rules.
* If the transaction passes all these checks, it will then fetch the UTXO that are being spent by inputs from UTXOStorage and construct the script to be validated by the BSV script engine.
* Each input-previous Transaction Output script combination is then run through the script engine to validate if the inputs are spendable and produce the successful validation result via the engine.
* Once it has iterated through each input for script validation, it will evaluate if all checks are validated successfully
* Any failures at any time will stop the validation with failure message, and the failure message is passed back to BSN.
* If all the validations are successful, it sends the valid transaction to Mempool.

### **BSVScriptEngine**

The BSV ScriptEngine performs the validation for the script presented to it by the transaction validator and returns a success/failure response.

These components together deliver the transaction validation functionality. In doing so, they also interact with the UTXO Storage component and Mempool components.

{% hint style="info" %}
Block subsidy as block reward is a payment under a unilateral agreement made to an agent of the network (the node) for the provisioning of transaction time-stamping, ordering and validation services.
{% endhint %}
