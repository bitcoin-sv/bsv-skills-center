---
description: >-
  Nodes are mandated to accept and extend valid blocks. To accept these blocks,
  they need to validate not just the block but every transaction included in the
  block.
---

# Block Validation

Block validation process involves validating a block and its transaction data along with the chain-tip which the block is being added to. Block Validation is done when the ChainTracker gets informed of a new proposed block or when there is a new node set-up being done requiring node to build history in sync with the current chain tip. The main functionality is that the provided block is validated in terms of block metadata and underlaying transactions, all being correct.

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/NodeAndItsOperations_Slide11%20(1).png" alt=""><figcaption></figcaption></figure>

When BSN is informed from other nodes about a new proposed block, it will trigger the validation process for that block. Firstly it will interact with the chain tracker to get the internal chain-tip details and then get the process of block download done to receive the block proposed by another node. Once the block is downloaded, its validation will be done by the block validation process. Block validation will do both, validate the block metadata and ensure that it is valid, and then validate every transaction present in the block. Typically about 97% of the transactions in the proposed block should already have been validated by the node as part of building its own block and that confirmation is received from the mempool for the larger set of transactions. The remaining transactions that have not been seen by the node, are then given input to the transaction validation process which will validate and verify if these transactions are valid. Once done, the validation process will calculate the Merkle tree based on the transaction list to validate it against the block header values. If everything is successful, the node will accept the block as valid and start building on top of this block. The chain tip tracked by chain tracker will also be updated to reflect this change.
