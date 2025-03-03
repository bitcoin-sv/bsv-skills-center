---
description: >-
  SPV is the magic behind p2p exchange, this is what allows two users to
  transact directly with each other and building decentralised, privacy
  preserving systems
---

# Simplified Payment Verification (SPV)

SPV is a process to verify the presence of transaction in a block. The 'payment' part of the term stems from the fact that blockchain itself is an electronic cash system, and every transaction is a payment. Even when a transaction is used to upload data onto the ledger, it still must contains a payment that transfers the ownership of at least one satoshi from at least one input to at least one output.

To illustrate this process, we'll use a hypothetical scenario where Alice pays Bob for her coffee. Bob owns a coffee shop and accepts payment using CBDCs.

1. Alice orders her coffee at the counter.
2. Bob provides Alice with an invoice that includes a template transaction where Bob has pre-filled at least one output (including a value) to accept payment.
3. Alice fills in at least one input of the transaction template using one or more UTXOs she owns or controls to cover the cost specified by Bob in the output.
4. Alice will then returns the now filled in transaction template to Bob along with the Merkle Paths of the transactions from which she pulled her transaction inputs from (this can be made much easier if Bob and Alice use the Background Evaluation Extended Format (BEEF) format in their transaction template: [see BRC 62](https://bsv.brc.dev/transactions/0062).
5. Bob receives and validates the transaction by performing Merkle proofs on all the provided inputs and comparing the results against his copy of the chain of Block Headers. At this point, If this is successful, Bob could give Alice the coffee and Alice could be on her way since the risk Alice is defrauding Bob is very low with a simple cup of coffee.
6. Bob then submits the transaction to an Overlay Service that accepts the utilized transaction type (in this case a fiat transaction type) be timestamped.
7. The Overlay Service receives the transaction and performs the same validation Bob did as well as additional validations relevant to the transaction type (for example, in this case, checking against a law-enforcement provided list to see if any of the input transactions have been involved in a crime and are being monitored). Once the Overlay Service is satisfied, it updates its internal state and provides a confirmation to Bob and submits the TX to the Node Network.
8. The Node then performs its validation checks and if approved, adds the transaction to a Block Template.
9. Within a second, the Overlay Service can send a lookup request to a UTXO Lookup Specialized Service to confirm the transaction has been accepted. It then relays this full confirmation to Bob.
10. Once the transaction has been timestamped in a block, a Merkle Specialized Service provides the Overlay Service with enough information to construct the Merkle Path of the transaction.
11. The Overlay Service then provides the Merkle Path to Bob, and if Alice added an output to the transaction template, Bob forwards the Merkle Path to Alice so they can both use the UTXOs they control in subsequent transactions.

Notice that Bob doesn’t need to wait for the transaction to be timestamped. He can either approve the payment instantly using only his local SPV check (0-conf) or he can wait a few seconds to confirm the transaction has been accepted by a node (seen-conf).

This is possible because the first-seen rule ensures that once the payment is seen by a node, any double-spending attempts will be rejected by the nodes in the network.

## Infrastructure Requirements

The three elements needed by Bob and the Overlay Service in the above example are:

**Block Headers** - 80 bytes per block × 52,416 blocks per year ≈ an increase of 4.2 MB per year

**Transaction data** - about 400 bytes for a simple p2pkh transaction where the input's TX has been mined

**Merkle Path(s)** - Approx. 1 KB per path assuming 4 billion transactions in one block

{% hint style="info" %}
SPV allows applications to have a subset of the entire Blockchain linked using the block headers and transactions of their interest
{% endhint %}
