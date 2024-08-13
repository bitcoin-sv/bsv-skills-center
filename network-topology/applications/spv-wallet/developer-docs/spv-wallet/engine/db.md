# DB

SPV Wallet Engine transaction engine database overview:

![# SPV Wallet Engine database schema](spv-wallet-db-diag.png)

> **Note**: The lack of relations in database does not mean there is no logical relationships between models.

## Tables

> **Note**: Prefix 'xapi' will be omitted in further descriptions.

### xpubs

Represents an HD-Key or extended public key (xPub for short). Model has no external references.

![xpubs](xpubs.png)

### access\_keys

AccessKey is a private key with a corresponding public key. Model is linked to **xpubs** by _xpub\_id_ field.

![access\_keys](access\_keys.png)

### paymail\_addresses

Represents paymail data like _public name, avatar etc._. Model is linked to **xpubs** by _xpub\_id_ field.

![paymails](paymails.png)

### block\_headers

Represents the BSV block header. Model may refer to another **block\_header** record through _hash\_previous\_block_ field.

![block\_headers](block\_headers.png)

### transactions

Represents the BSV transaction. In the table we store all transactions in the system: outgoing and incomig ones. In other words, **transaction** record is created based on record from **draft\_transactions** (for outgoing) and based on **incoming\_transactions** (for incoming). Outgoing transaction will refer to **draft\_transactions** by _draft\_id_ field, incoming will refer to **incoming\_transactions** by by _id_ field (1:1).

> **Note**: Transactions inside the same SPV Walllet Engine system (between two paymails in same system) are recorded as **outgoing** only!

![transactions](transactions.png)

### draft\_transactions

Represents the draft _outgoing_ BSV transaction prior to the final transaction. Model is linked to **xpubs** by _xpub\_id_ field and **transactions** by _final\_tx\_id_.

![draft-transactions](draft\_transactions.png)

* **sync\_transactions**

Represents the chain-state sync configuration and results for a given transaction. Sync record is added for EVERY transaction in system (outgoing and incoming). Model is linked to **transactions** by _id_ field (1:1).

> **Note**: **sync\_transactions** does not represents transaction per se, but its synchronization state.

![sync-transactions](sync\_transactions.png)

Possible values for status fields (_p2p\_status, sync\_status, broadcast\_status_ ):

* _pending_ - is when the sync is pending (blocked by other constraints)
* _ready_ - is when the sync is ready (waiting for workers)
* _processing_ - is when the sync is processing (worker is running task)
* _canceled_ - is when the sync is canceled
* _skipped_ - is when the sync is skipped
* _error_ - is when the sync has an error
* _complete_ - is when the sync is complete

### incoming\_transactions

Represents the incoming (external) transaction (for pre-processing). Model is related to **transactions** by _id_ field (1:1).

> **NOTE**: Internal incoming transactions (from SPV Wallet to SPV Wallet) are not recorded in **incoming\_transactions**

![incoming-transactions](incoming\_transactions.png)

### utxos

Represents a BSV unspent transaction. Model is related to **transactions** by _transaction\_id_ field.

![utxos](utxos.png)
