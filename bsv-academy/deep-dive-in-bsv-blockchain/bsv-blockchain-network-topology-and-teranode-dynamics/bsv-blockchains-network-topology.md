# BSV Blockchain's Network Topology

<figure><img src="../../../.gitbook/assets/Slide8 (1).jpg" alt=""><figcaption></figcaption></figure>

### Teranode

**Teranode** is the advanced node software at the core of the **BSV blockchain**, designed for a distributed network of nodes.

* While blockchain networks can technically run on a laptop, practical applications necessitate more robust computing power to manage **high transaction volumes, ergo Teranode**.
* The **BSV Association** revisited Bitcoin's original protocol to develop node software optimized for **scalability**.
* Key features include:
  * **Reintroduction of previously removed features**.
  * **Activation of all opcodes**.
  * A **horizontally scalable architecture** utilizing microservices.

In **July 2025**, Teranode was released following extensive testing in private environments.

* Trials involved six nodes operating continuously for **14 days** across Europe, the United States, and Asia.
* During these tests, Teranode achieved an impressive average throughput of **1.04 million transactions per second**.
* For context, Bitcoin (BTC) processes only **4-7 transactions per second**, while Solana can handle **30,000-50,000 transactions**, many of which are internal consensus transactions.
* Over the testing period, Teranode successfully processed **1.3 trillion transactions**.

This infrastructure is tailored for **enterprise-scale applications**, including:

* **Payment processing**.
* **Energy management**.
* **Tokenization**.

Documentation and technical resources are available on **GitHub** for developers interested in exploring Teranode further.

### Overlays

**Overlays** are built on top of the Teranode layer, providing specialized indexing and enhanced functionality.

* They are not classified as "layer two" solutions but offer features such as:
  * **Selective disclosure of information**.
  * **Encryption management**.
  * **Privacy enhancements**.

These overlays are particularly beneficial for organizations, especially within the **European Union**, as they allow for:

* **Controlled management of data sovereignty**.
* Utilization of a public blockchain while maintaining **privacy and compliance**.

The integration of overlays enhances the overall functionality of the **BSV blockchain**, making it more adaptable to various business needs.

### Simplified Payment Verification (SPV)

**Simplified Payment Verification (SPV)** is a crucial component of the BSV blockchain's architecture.

* SPV allows users to verify transactions without the need to run a **full node**, aligning with Bitcoin's original vision as a **peer-to-peer electronic cash system**.
* This mechanism enables lightweight clients to confirm transactions efficiently, making it accessible for users with limited resources.
* SPV supports the **decentralized nature** of the network by allowing more participants to engage without the overhead of full node operation.

The implementation of SPV contributes to the **scalability** and **usability** of the BSV blockchain, ensuring that it remains user-friendly while maintaining robust **security features**.
