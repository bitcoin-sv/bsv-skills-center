# Go Client

## Table of contents

* [SPV Wallet GO Client](./#spv-wallet-go-client)
  * [Table of contents](./#table-of-contents)
  * [Overview](./#overview)
  * [Installation](./#installation)
  * [Usage](./#usage)
    * [Create SPV Wallet Go Client instance](./#create-spv-wallet-go-client-instance)
      * [Admin wallet client instance](./#admin-wallet-client-instance)
      * [Normal wallet client instance](./#normal-wallet-client-instance)
    * [Register new xPub](./#register-new-xpub)
      * [Generate new xpub](./#generate-new-xpub)
      * [Register new xPub in SPV Wallet](./#register-new-xpub-in-spv-wallet)
    * [Get xPub](./#get-xpub)
    * [Create paymail](./#create-paymail)
    * [Create new access key](./#create-new-access-key)
    * [Get Transactions](./#get-transactions)
    * [Get Transaction](./#get-transaction)
    * [Create transaction](./#create-transaction)
      * [Separated methods](./#separated-methods)

🔗 [GitHub URL](https://github.com/bitcoin-sv/spv-wallet-go-client)

## Overview

This is GO library used to communicate with SPV Wallet. It allows us to create an admin or normal user client and then call methods to work with transactions, xpubs, paymails and access keys.

## Installation

```bash
go get -u github.com/bitcoin-sv/spv-wallet-go-client
```

## Usage

### Create SPV Wallet Go Client instance

To create a SPV Wallet Go Client instance you need to provide user xpriv and SPV Wallet url. You can also define if you want to sign requests. Below you can find examples of creating admin and normal user clients.

#### Admin wallet client instance

```go
    adminClient, err := walletclient.New(
      walletclient.WithXPriv("xPriv"),
      walletclient.WithAdminKey("xPriv"),
      // This is the default URL for the SPV Wallet
      walletclient.WithHTTP("http://localhost:3003/v1"),
      walletclient.WithSignRequest(true),
    )
```

#### Normal wallet client instance

```go
    userClient, err := wa.New(
      walletclient.WithXPriv("xPriv"),
      // This is the default URL for the SPV Wallet
      walletclient.WithHTTP("http://localhost:3003/v1"
      walletclient.WithSignRequest(true),
	   )
```

### Register new xPub

To register new xPub we need to call `RegisterNewXpub` method with new xpub.\
Additional libraries which will be used in the example:

* [SPV Wallet Engine](https://github.com/bitcoin-sv/spv-wallet/tree/master/engine)

#### Generate new xpub

> To generate your own kepair - xPub and xPriv, you can use SPV Wallet Admin Keygen tool.\
> You can find more information about it [here](../spv-wallet-admin-keygen.md).

```go
  // Generate new xpub.
  hdXpub, err := hdkeychain.NewMaster(xpriv)
  if err != nil {
    panic(err)
  }
```

#### Register new xPub in SPV Wallet

```go
  err = adminClient.RegisterXpub(context.Background(), hdXpub.String(), &models.Metadata{})
  if err != nil {
    panic(err)
  }
```

### Get xPub

This method returns information about xpub for the client which is calling this method.

```go
xpub, err := userClient.GetXPub(context.Background())
if err != nil {
  panic(err)
} 
```

### Create paymail

Paymail is a new way of creating transaction without knowing the specific address only the paymail.

```go
// Define alias and domain.
domain := "example.com"
alias := "username"

// Create paymail address.
address := fmt.Sprintf("%s@%s", alias, domain)

// Register new xpub in SPV Wallet.
err = adminClient.NewPaymail(context.Background(), hdXpub.String(), address, alias, alias, &models.Metadata{})
if err != nil {
  panic(err)
}
```

### Create new access key

Access key is another way to autorize user. It can be used like xpub but it is not sufficient to sign transactions.

```go
  accessKey, err := userClient.CreateAccessKey(context.Background(), &models.Metadata{})
  if err != nil {
    panic(err)
  }
```

### Get Transactions

This method return all transactions for xpub which was given during SPV Wallet client creation. You can also filter transactions by providing conditions and use pagination by providing query params.

```go
  conditions := make(map[string]interface{})
  queryParams := datastore.QueryParams{
    Page:          1,
    PageSize:      10,
    OrderByField:  "created_at",
    SortDirection: "desc",
  }
  
  transactions, err := userClient.GetTransactions(context.Background(), conditions, &models.Metadata{}, &queryParams)
  if err != nil {
    panic(err)
  }
```

### Get Transaction

This method return specific transaction but only if the transaction is connected with user xpub (transaction is incoming or outgoing for user).

```go
  transaction, err := userClient.GetTransaction(context.Background(), "d70a3e6f584ee4e97e4cd1fc2e40f2ab849bdd43e961ebc4af6995ad1fc59287")
  if err != nil {
    panic(err)
  }
```

### Create transaction

Transaction can be made in two different ways. First is using `SendToRecipients` method, which include everything inside. Second is bycalling every method separately `SendToRecipients` method\
It is possible to send metadata which will be saved in transaction object. If you want to send transaction to multiple recipients you need to provide array of recipients.

```go
// Create recipients
recipients := []*transports.Recipients{
  {
    Satoshis: 1000,
    To:       recipientPaymail,
  },
}

// Create matadata with sender and receiver paymails.
metadata := &models.Metadata{
  "receiver": receiverPaymail,
  "sender":   senderPaymail,
}

// Send transaction.
transaction, err := c.client.SendToRecipients(context.Background(), recipients, metadata)
if err != nil {
  panic(err)
}
```

#### Separated methods

```go
// Create draft transaction.
draftTx, err := userClient.DraftToRecipients(context.Background(), recipients, metadata)
if err != nil {
  panic(err)
}

// Finalize draft transaction.
hex, err := userClient.FinalizeTransaction(draftTx)
if err != nil {
  panic(err)
}

// Record transaction
transaction, err = userClient.RecordTransaction(context.Background(), hex, draftTx.ID, metadata)
if err != nil {
  panic(err)
}
```
