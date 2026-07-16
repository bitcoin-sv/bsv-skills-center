# Storage

## Database

A Postgres DB used to store user accounts, transactions, utxos, public keys, accounts, and metadata.

## Cache

The cache is used for handling spikes in usage of the application. The idea being all requests can be queued and responses made on a FIFO basis.
