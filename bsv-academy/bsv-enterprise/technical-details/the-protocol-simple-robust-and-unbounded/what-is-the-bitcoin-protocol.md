# What is the BSV Protocol?

There are two message types that comprise the BSV protocol; Block Header Announcements and Transactions.&#x20;

## Block Header Annoucements

Block headers are just 80 bytes long and represent a node's proposal to the network for the extension of the ledger. In order to validate a block header, other nodes must first check the following:

* That it forms a new longest chaintip by building on the most recent previous block.
* That its timestamp is valid and within the allowed precision.
* That the difficulty target is correct.
* That its proof of work is valid - this simple check is done by double hashing of the 80-byte header using the SHA256 algorithm and checking that the resultant value is below the difficulty target.
* That the transactions contained within the block are valid and that the Merkle tree whose root value is in the block represents a valid interpretation of recent events on the network.

These final checks involve ensuring each transaction in the block is valid and does not spend any previously spent inputs, and that a reconstruction of the complete Merkle tree generates the root hash which is contained in the block header.

Once these checks are complete, the node can accept the block as valid and begin building a new block that references this block as the highest valid chain tip.

The small size of block headers is an important aspect of the efficiency of using working blockchains, a concept we will cover in a later section.

## Transactions

Transactions are formatted using a flexible messaging protocol that can represent anything from extremely simple transfers to large and highly complex actions that consume and create hundreds, thousands or even millions of inputs and outputs. Each transaction must reference one or more existing outpoints containing spendable satoshis on the BSV ledger and generate one or more new outputs that place those satoshis into newly created scripts which can be consumed in future transactions.

The message format is simple, open and easily interpreted in software. There is no requirement for cryptographic signatures or other functions to be used, unless those are required by the particular action being captured in the transaction. Each output generated within a transaction defines a predicate or 'puzzle' which locks the satoshis it contains into place. In order to spend the satoshis, the user must provide a valid solution as a transaction input. The scripting language used within the BSV protocol is highly flexible and can be used to capture and inscribe any requirements related to the activity generating the transactions.

Importantly, transactions are not necessarily limited to financial activity, and things like sensor data, user selection information and much more can be captured in a transaction script. There are no protocol level limits on the size or complexity of transaction scripts. Potential application boundaries are defined only by the imagination of the people seeking to build their platforms on BSV.

