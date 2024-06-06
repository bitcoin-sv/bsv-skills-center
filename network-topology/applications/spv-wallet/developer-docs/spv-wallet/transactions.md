# Transactions

## Diagram

![Transaction Lifecycle](../../../../wallets/spv-wallet/developer-docs/spv-wallet/transactions/transaction\_lifecycle.png)

SPV Wallet supports both types on transactions: outgoing and [incoming](../../../../wallets/spv-wallet/developer-docs/spv-wallet/transactions/incoming\_transaction.md)

Process of creation of a transaction in SPV Wallet consists of 4 stages:

1. Creation of a Draft Transaction
2. Finalize transaction
3. Record Transaction
4. Broadcasting

### Creation of a Draft Transaction

Initialize a new draft transaction according to provided transaction config where, in addition to mandatory "to"(recepient) and "satoshis", you can specify your own fee value, transaction expiration time, utxos which will be used and change destination strategy. Next, processing of outputs are started. It inspects the outputs to determine how they should be processed. In case if paymail was used as a transaction destination additional endpoints will be called:

* Before calling the next endpoints {receiver\_paymail\_host} should be retrieved. And it will be retrieved from SRV record for a given paymail. This is all handled by the `go-paymail` library.

1.  `{receiver_paymail_host}/.well-known/bsvalias` Retrieves capabilities for a Paymail provider. Example response:

    ```json
    {
    "bsvalias": "1.0",
    "capabilities": {
        "2a40af698840": "https://johnsmith.serveo.net/v1/bsvalias/p2p-payment-destination/{alias}@{domain.tld}",
        "5f1323cddf31": "https://johnsmith.serveo.net/v1/bsvalias/receive-transaction/{alias}@{domain.tld}",
        "6745385c3fc0": false,
        "a9f510c16bde": "https://johnsmith.serveo.net/v1/bsvalias/verify-pubkey/{alias}@{domain.tld}/{pubkey}",
        "f12f968c92d6": "https://johnsmith.serveo.net/v1/bsvalias/public-profile/{alias}@{domain.tld}",
        "paymentDestination": "https://johnsmith.serveo.net/v1/bsvalias/address/{alias}@{domain.tld}",
        "pki": "https://johnsmith.serveo.net/v1/bsvalias/id/{alias}@{domain.tld}"
    }
    }
    ```
2. `{receiver_paymail_host}/v1/bsvalias/p2p-payment-destination/{alias}@{domain}` Retrieves the list of outputs for the P2P transactions to use. Will be called only in case if paymail's capabilities will contain P2P urls. At the moment, every paymail should contain P2P urls, as second non-P2P paymail processing method will no longer be supported. ⚠️ Every call on this endpoint creates new destination (with new address) which is saved in db.\
   Example response:

```json
   {
    "outputs": [
        {
            "address": "1NSTSMD448yok4y128CENUeGX5mTbFrK1H",
            "satoshis": 1000,
            "script": "76a914eb2b1be9b79baff275f44f556a0cade66582fc7f88ac"
        }
    ],
    "reference": "90030d54ee6e6d35b4cb7c62fd25dad5"
    }
```

* Every endpoint connected to paymail is defined in `go-paymail` library. Next, fees are calculated, the utxos are reserved, necessery outputs are added and the result is validated. And if the transaction is valid it's saved in db and waiting for the next step.

### Finalize transaction

Finilize draft transaction stage signs all transaction's inputs using keys derived from an xPriv and returns its signed hex

### Record Transaction

Parses the transaction and saves it into the Datastore. Can trigger creation of additional objects:

1. **SyncTransaction** - contains information about transaction synchronization,
2. **IncomingTransaction** - contains information about incoming transaction. Can be created only for external incoming transactions.

#### Record transaction. Detailed flow

1. If ITC (Incoming Transaction Check) is enabled(env variable `disable_itc`) and if Transaction is external:
   1. Create and save **IncomingTransaction** with **Transaction** id and hex
   2. Init **SyncTransaction** with **Transaction** id
   3.  Set values for **SyncTransaction**

       * `BroadcastStatus` - `skipped`
       * `P2PStatus` - `skipped`
       * `Metadata` - from **Transaction**

       > incoming transaction should have been broadcasted already\
       > `SyncStatus` is set to `ready` by default. It will be changed to `complete` after successful operation in `SyncTransaction` hook
   4. Init new **Transaction** based on **IncomingTransaction**
2. BeforeCreating Hook will init a sync transaction and will process utxos if transaction is internal
3. Save **Transaction**
4. Saving of Transaction will trigger creation of sync transaction in datastore, which will trigger broadcasting and syncronization. If paymail was used for a transaction, paymail provider will be notified by `{receiver_paymail_host}/v1/bsvalias/receive-transaction/{alias}@{domain}` endpoint. \* In case of SPV Wallet to SPV Wallet transaction notifying of provider will trigger receiving an incoming transaction and record transaction will be called one more time.
5. AfterCreated Hook will update balance and will update draft transaction with final transaction data.

### Broadcasting

Broadcasting is a process of sending transaction to the network. It can be triggered by `AfterCreated` hook in **SyncTransaction** model or in `BroadcastTransaction` task. Broadcasting is done to different providers (several using ARC, or mAPI, but whatsOnChain and NowNodes are using their own api). SPV Wallet broadcasts transactions in parallel to all providers. The client is notified of the fastest provider that will respond to the broadcast successfully at exactly the same moment- meaning it doesn't have to wait for responses from the other providers.
