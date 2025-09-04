# UTXO Model Overview

<figure><img src="../../../.gitbook/assets/Slide19 (1).jpg" alt=""><figcaption></figcaption></figure>

### Transaction Processing

The **UTXO (Unspent Transaction Output)** model is foundational to the BSV blockchain, enabling an approach to **transaction processing** following the original Bitcoin protocol .

* Each UTXO acts like an **individual coin or bill**, allowing for independent spending.
* This model supports **parallelized transaction processing**, akin to digital cash, where multiple transactions can occur simultaneously without conflicts.
* Transactions are validated based on the **consumption of UTXOs**, ensuring that each transaction is **atomic**—either fully valid or entirely rejected.

### Inputs and Outputs

Every transaction in the UTXO model consists of **inputs and outputs**, which are essential for transferring ownership of funds.

* **Inputs**: Each input references a previous UTXO and includes an **unlocking condition**, allowing the specified UTXO to be spent.
* **Outputs**: Each output defines a **value** and a **locking condition**, securing the tokens for the new owner.
* A transaction is structured with a **version number**, a list of inputs, a list of outputs, and a **lock time value**, which facilitates non-final transactions and payment channels.
* Outputs that remain unspent become new UTXOs, available for **future transactions**.
