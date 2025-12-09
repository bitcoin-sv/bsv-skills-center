# Standard Local Policies

Policies are settings that are configured by software operators. These settings are generally required by software implementations. It is expected that as implementations of the software mature that these settings will be adjusted.

Policies control which transactions the software will propagate across the P2P network or include in a block. However, policies are not BSV Rules or Consensus Rules and are not used to determine the validity of blocks or the transactions confirmed by a block.

## Transaction Policies

### Maximum Acceptable Transaction Size Policy

The maximum acceptable transaction size is a standard policy that configures the largest transactions that the software will propagate across the P2P network or include in a block.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 13.gif" alt=""><figcaption></figcaption></figure>

The default value for this policy setting is 10MB (10,000,000 bytes).

### Transaction Evaluation Timeout

The transaction evaluation timeout is a standard policy that defines the maximum amount of time that the software will allow for the evaluation of a transaction before terminating the evaluation and rejecting the transaction. This setting is always defined with a time unit and the default value is 1 second.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 14.gif" alt=""><figcaption></figcaption></figure>

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

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 15 (1).gif" alt=""><figcaption></figcaption></figure>

The current policy implementation is defined such that smallest value a transaction’s output may contain is equal to (3x the size of the output script + 142) \* the minRelayTxFee parameter.

In addition, transaction outputs are assessed against the dustRelayFee parameter. The current policy implementation is defined such that an output must be equal to (3x the size of the output + 142) \* the dustRelayFee parameter in order for the node to propagate the transaction.

Typically these values are set to the same amount to minimise the complexity of generating small value outputs.

It is likely that the system will trend towards having minimal rules around the generation of transaction outputs based on the number of satoshis they contain.

## Script Language Policies

Script Language Policies apply to the execution of script.

### Minimal Encoding Policy

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 16 (1).gif" alt=""><figcaption></figcaption></figure>

The Minimal Encoding Policy mandates that any push operations done within a script must use the most efficient pushdata opcode to do so. Bitcoin has individual pushdata opcodes to push data items up to 75 bytes in length using a single byte instruction. For data items which are between 76 and 255 bytes, the sequence OP\_PUSHDATA1 must be used, where the data length is defined using an 8 bit unsigned integer value. For data items between 256 and 65,535 bytes long, the sequence OP\_PUSHDATA2 must be used, where the data length is defined using a 16 bit unsigned integer value. For data items between 65,536 and 4,294,967,295 bytes long, the sequence OP\_PUSHDATA4 must be used, where the data length is defined using a 32 bit unsigned integer value. Data items larger than 4,294,967,295 bytes must be split in order to be pushed into a transaction.

### Numeric Value Length

The length of numeric value policy defines the maximum length of a byte sequence to be considered a valid numeric value. The default value for this policy is 250,000 bytes.

Transactions which contain scripts that consume numeric values that are larger than this policy setting will be rejected; they will not be propagated across the P2P network or be included in a block.

### Stack Memory Usage Policy

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 17 (1).gif" alt=""><figcaption></figcaption></figure>

The stack memory usage policy limits the amount of memory that can be used on the stacks. This policy is evaluated against the sum of the memory used by the stack and the memory used by the alt-stack.

If the execution of the unlocking and locking script for an input uses more stack memory than defined in this policy, then the transaction is rejected.

The memory usage of a stack is calculated using the same formula described in the Stack Memory Usage Consensus Rule (above).

The default value for this policy is 100MB (100,000,000 bytes). The value of this policy must be less than or equal to the value of the Stack Memory Usage Consensus Rule.

## P2P Network Policies

### P2P Network Connection Policies

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 18.gif" alt=""><figcaption></figcaption></figure>

Nodes on the Bitcoin network are free to connect or disconnect to any device, user or service that the incentive structure of the network encourages them to connect to. Certain nodes will operate with very different interconnection policies than other nodes, and nodes are free to reject or shut down connections as they see fit.

Each node’s settings are unique and the BSV node client also contains a robust set of conditional monitoring systems which will cause disruptive nodes to be automatically disconnected if they propagate invalid blocks or transactions.

### Propagation of Non-Standard Transactions

The local policy on the Propagation of non-standard transactions controls whether the software will propagate non-standard transactions to other peers on the P2P network.

Before Genesis activation, the default setting for this policy was that non-standard transactions will not be propagated across the P2P Network.

After Genesis activation, the default setting for this policy is that non-standard transactions will be propagated across the P2P Network.

Note that even though non-standard transactions will be propagated across the P2P Network after Genesis activation, other policies such as the Maximum Acceptable Transaction Size Policy remain in effect.
