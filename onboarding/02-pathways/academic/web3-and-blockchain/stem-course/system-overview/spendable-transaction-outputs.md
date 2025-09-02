# Spendable Transaction Outputs

<figure><img src="../../.gitbook/assets/LBC Academy Presentation (7).png" alt=""><figcaption></figcaption></figure>

Building on the foundation of blockchain transactions as flexible structures for digital interactions, it's crucial to understand the concept of Spendable Transaction Outputs (STOs) and the granularity they bring to managing transaction inputs and outputs within a blockchain network. This subsection will delve into how transactions can be dynamically managed before final settlement on the blockchain ledger, providing a robust mechanism for handling complex workflows in decentralized applications.

<figure><img src="../../.gitbook/assets/LBC Academy Presentation (11).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/LBC Academy Presentation (12).png" alt=""><figcaption></figcaption></figure>

<figure><img src="../../.gitbook/assets/LBC Academy Presentation (13).png" alt=""><figcaption></figcaption></figure>

## Spendable Transaction Outputs: Enhancing Transaction Flexibility

**The Role of Signed Inputs and Outputs**

Blockchain transactions are designed as containers that group together signed inputs and outputs. These signatures are crucial for authorizing transactions and ensuring that only legitimate operations are executed on the network. A key feature that enhances this system is the use of sighash flags, which offer the flexibility to sign inputs and outputs independently or collectively.

<figure><img src="../../.gitbook/assets/LBC Academy Presentation (6).png" alt=""><figcaption></figcaption></figure>

* **Sighash Flags:** These flags determine the scope of what the signature covers. They can be set to cover:
  * All inputs and outputs together, binding them so that none can be altered without invalidating the transaction.
  * Only specific parts of the transaction, allowing other elements to be modified without needing a new signature from the involved parties.
  * A single input or output, supporting scenarios where transactions are built incrementally, such as in complex contract negotiations or multi-stage approvals.

**Dynamic Transaction Construction**

In traditional financial systems, transactions are static once initiated. Blockchain technology disrupts this norm by allowing for dynamic transaction construction. This means participants can:

* Begin by signing inputs that draw from the STO set, which is essentially a database of all transaction outputs that are available to be spent but have not yet been utilized.
* Progressively add to a transaction by including additional inputs and defining outputs as the transaction moves through various stages or approvals within an overlay network. This overlay acts as a staging area where transactions accumulate necessary data before they are finalized and broadcast to the broader network.

**The STO Set: A Database of Opportunities**

<figure><img src="../../.gitbook/assets/LBC Academy Presentation (14).png" alt=""><figcaption></figcaption></figure>

The Spendable Transaction Output Set (STOset) plays a critical role:

* **STOset Database:** It tracks all outputs from previous transactions that have not yet been spent. This database is continually updated as new transactions are added to the blockchain, ensuring that only available outputs are used in forming new transactions.
* **Local vs. Global State Changes:** When inputs are signed using outputs from the STOset, they represent local changes to the state of these outputs. These changes are only proposed at this stage and do not affect the global blockchain until the transaction is completed and added to a block.

**Committing Transactions: From Local to Global**

The process of committing a transaction involves several crucial steps:

* **Accumulation:** Inputs and outputs are gathered in the transaction container within the overlay network, allowing for adjustments and additions as needed.
* **Broadcast:** Once all elements of the transaction meet the required criteria and are fully signed, the transaction is broadcast to the blockchain network.
* **Settlement:** The transaction is then validated by the network and, upon successful verification, is added to the blockchain ledger, updating the global state accordingly.

#### Conclusion

The flexibility offered by blockchain's handling of transactions through Spendable Transaction Outputs and sighash flags provides a powerful tool for managing complex data and financial interactions in a decentralized environment. This system not only supports more dynamic and granular control over transactions but also enhances security and integrity by ensuring that all changes are properly authorized and recorded. As blockchain technology evolves, these mechanisms will continue to underpin innovative applications and workflows in various sectors, making decentralized systems more robust, scalable, and efficient.
