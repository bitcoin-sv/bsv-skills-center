# Standard Local Transaction Policies

### Maximum Acceptable Transaction Size Policy

The maximum acceptable transaction size is a standard policy that configures the largest transactions that the software will propagate across the P2P network or include in a block.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 13.gif" alt=""><figcaption></figcaption></figure>

The default value for this policy setting is 10MB (10,000,000 bytes).

### Transaction Evaluation Timeout

The transaction evaluation timeout is a standard policy that defines the maximum amount of time that the software will allow for the evaluation of a transaction before terminating the evaluation and rejecting the transaction. This setting is always defined with a time unit and the default value is 1 second.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 14.gif" alt=""><figcaption></figcaption></figure>

This policy applies to transactions that are received by the software and its processes for determining whether the transaction should be propagated across the P2P network or included in a block. The policy does not apply to the evaluation of transactions in a confirmed block.

Note that:

* if the evaluation of a transaction is terminated due to exceeding the timeout limit then the software has not determined whether the transaction is valid or invalid, it has merely decided not to make that determination;
* the time taken to evaluate a transaction by a particular system will vary based on the software used, the resources available, and other dynamic factors such as the load on the system. It is not an exact measurement.

### Minimum Fee Policies

The minimum fee rule specifies a minimum fee for which the node will accept and/or relay unconfirmed transactions.

This rule is set by the node and determines the minimum fee that a node will accept for mining a transaction into a block.

Currently fee rates are set by determining the size of the transaction in kilobytes and applying a ‘cost per kilobyte’ in Satoshis for the acceptance or relay of that transaction.

The transaction minimum fee rates are set individually by nodes. This means that nodes are free to mine or cache transactions as befits their business model. Mining transactions that other nodes reject however, comes with a much higher risk of nodes losing blocks. Nodes attempting to mine many transactions which are not being cached by other nodes must be exceptionally well connected to the network in order to minimise the time needed to transfer the block announcement and those transactions to other nodes.

Over time it is expected that fee calculation will become more complex, providing node operators many opportunities to value-add. This will be something that evolves over time, and techniques such as MinerID and MerchantAPI will allow node operators to create, advertise and manage their own unique business models.

### "Dust" Policies

The dust rule is a setting that nodes use to discourage bitcoin users from creating outputs that contain fewer satoshis than it costs to on-spend them at the minimum fee rate. The goal of these policies is to prevent large numbers of low value outputs being used as an attack on the Bitcoin network.

Since early in the history of Bitcoin the dust rate has been a standard policy across the network.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 15 (1).gif" alt=""><figcaption></figcaption></figure>

The current policy implementation is defined such that smallest value a transaction’s output may contain is equal to (3x the size of the output script + 142) \* the minRelayTxFee parameter.

In addition, transaction outputs are assessed against the dustRelayFee parameter. The current policy implementation is defined such that an output must be equal to (3x the size of the output + 142) \* the dustRelayFee parameter in order for the node to propagate the transaction.

Typically these values are set to the same amount to minimise the complexity of generating small value outputs.

It is likely that the system will trend towards having minimal rules around the generation of transaction outputs based on the number of satoshis they contain.
