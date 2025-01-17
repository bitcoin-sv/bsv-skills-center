# The Ledger

The Bitcoin Ledger, as introduced earlier, records the global history of all Bitcoin transactions. Understanding how the ledger is updated is crucial. Nodes participating in the Bitcoin network receive transactions submitted by users and are responsible for writing valid transactions to the ledger.

However, to ensure the integrity of this global history, nodes cannot alter the ledger at will. Instead, they write **batches of valid transactions** to the ledger in an orderly manner. Transactions awaiting inclusion in the ledger are temporarily stored in a node’s **mempool**. It’s worth noting that mempools are independent from the ledger, and nodes don’t need to agree on their mempool states. Agreement is only required for the ledger itself, which ensures the global state of transactions is consistent and tamper-proof.

The Bitcoin Ledger is a **WORM database**—Write Once, Read Many. This means that once data is written, it cannot be altered without evidence of tampering. This property makes the ledger “tamper-evident,” as any rejected or attempted changes remain visible. Over time, altering the ledger becomes practically impossible due to the economic and computational costs involved. Every day, millions of transactions are added to this ledger, which can be read in perpetuity.

In popular media, the Bitcoin Ledger is often referred to as the “blockchain,” with batches of transactions labeled as “blocks.” These blocks are sequentially added to form a continuous chain—the blockchain.

***

#### **Why We Avoid the Term "Blockchain"**

Throughout this academy, we rarely use the term “blockchain” to describe the Bitcoin Ledger. This is intentional. The term “blockchain” has been heavily misrepresented, leading to widespread misinformation about Bitcoin and its technology. Contrary to popular belief, chains of digital signatures (the basis of blockchains) existed long before Bitcoin. Bitcoin’s innovation lies not in the concept of a blockchain but in how it uses economic incentives and proof-of-work to achieve a secure, scalable, and transparent ledger.

***

#### **The Transparency of the Bitcoin Ledger**

One of the Bitcoin Ledger’s most critical properties is its **public and transparent nature**. Unlike traditional ledgers that require trust in the honesty of the ledger keeper, Bitcoin removes this requirement by making the ledger accessible to all participants. This public transparency ensures that no single entity can manipulate the ledger or “cook the books.”

The **BSV blockchain** preserves this transparency while scaling unboundedly, ensuring it can handle millions of transactions daily with low fees and unparalleled efficiency. While other blockchain implementations have deviated from Bitcoin’s original design, BSV stays true to its intended purpose as a global ledger for both payments and data.
