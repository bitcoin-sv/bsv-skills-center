---
description: >-
  Transactions are "assembled" into a Merkle tree structure to provide the
  mining software a candidate block header.
---

# Block Assembler

The main purpose of the Block Assembler is to take the list of validated transactions stored by Mempool for its consumption and creates a fresh block template data structure to add transactions. It orchestrates block-template creation by talking to Chain tracker, Mempool and UTXO Store. It also performs basic checks on transactions before they are made part of the block template, including updating the transactions and UTXO status.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NodeAndItsOperations_Slide10.png" alt=""><figcaption></figcaption></figure>

The ChainTracker provides the Block Assembler with the current Chain-tip. The Assembler then builds a new block on that tip by first fetching all the verified transactions present in the mempool. It then constructs the Merkle root value by ordering all the transactions in first-seen order and building a Merkle tree root value from the transaction ids. Once the value is calculated, it will construct the block header based on the current difficulty value.

In parallel, the mining pool software is constantly communicating with the Assembler to keep retrieving the latest mining candidate. It will keep responding to the mining pool calls and keep providing it with updated block candidate headers and mining candidate values (see mining topic for more details).
