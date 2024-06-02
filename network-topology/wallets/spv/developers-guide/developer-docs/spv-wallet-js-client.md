# SPV Wallet JS Client

This library is used to create an admin or normal user client and call methods on it to create keys and destinations associated with that user.

> Details about all the commands and the repo itself can be found [here](https://github.com/bitcoin-sv/spv-wallet-js-client)

## Installation

```bash
yarn add @bsv/spv-wallet-js-client 
```

## Create JS project with SPV Wallet JS Client

```bash
yarn init
yarn add @bsv/spv-wallet-js-client 
```

Create new js file, example `index.js`\
Run script with node

```bash
node index.js
```

## Usage

<!-- TODO -->

### Create SPV Wallet JS Client

To create a SPV Wallet JS Client you need to provide a url to the SPV Wallet and a user keys.
The user type can be either `admin` or `user`.

Additional libraries which will be used in the example:
[bsv](https://www.npmjs.com/package/bsv) - Bitcoin SV library in 1.5.6 version

```bash
  yarn add bsv@1.5.6
```
  
  Create HDPrivateKey. If we want to create admin client we have to use this same key as in the SPV Wallet config.

```bash
  const bsv = require("bsv");
  const walletClient = require("@bsv/spv-wallet-js-client");
  
  const key = bsv.HDPrivateKey.fromString("xprv_example")
```

  Create client

```bash
  const client = new walletClient.SpvWalletClient("http://localhost:3003/v1", {
    xPub: key.hdPublicKey,
    signRequest: true,
    transportType: "http",
  })
```

If we are creating an admin client we need to set admin key.

  ```bash
  client.SetAdminKey(adminKey)
  ```

### Register new xPub

To register new xPub we need to call `RegisterNewXpub` method with new xpub.
Generate xpub

```bash
  const mnemonic = require("bsv/mnemonic");
  
  // Generate mnemonic
  const m = mnemonic.fromRandom()
  const seed = m.toSeed()
  
  // Create xPriv and xPub
  const xPriv = bsv.HDPrivateKey.fromSeed(Buffer.from(seed), bsv.Networks.mainnet)
  const xPub = xPriv.hdPublicKey.toString()
  ```

Register new xPub in SPV Wallet

```bash
  await api.RegisterXpub(rawXpub, {})
    .then((result) => {
      console.log("RegisterXpub result: ", result)
    })
    .catch((e) => {
      console.log("RegisterXpub error: ", e)
      throw Error(e)
    })
  ```

  Example response:

```bash
  {
    created_at: '2023-07-04T10:16:32.067199Z',
    updated_at: '2023-07-04T12:16:32.067294+02:00',
    deleted_at: null,
    id: '7297030cea290638cb013b32cc0c19eaf649fa1d9875af03813104c72179668d',
    current_balance: 0,
    next_internal_num: 0,
    next_external_num: 0
  }
  ```
  
### Get xPub

  This method returns information about xpub given during client creation.

```bash
  await userClient.GetXPub()
    .then((result) => {
      console.log("GetXPub result: ", result)
    })
    .catch((e) => {
      console.log("GetXPub error: ", e)
    })
  ```

Example response:
  
```bash
  {
    created_at: '2023-06-12T12:06:19.166966Z',
    updated_at: '2023-06-23T12:50:49.757323Z',
    deleted_at: null,
    id: '782dffb93253f569723023bb0cb35269ff83dac800101c0e89e54fa9917a8a82',
    current_balance: 14111,
    next_internal_num: 0,
    next_external_num: 0
  }
  ```

### Create new destination

Destination in SPV Wallet is and object which contains information about the output.

```bash
    await userClient.NewDestination({})
      .then((result) => {
        console.log("NewDestination result: ", result)
      })
      .catch((e) => {
        console.log("NewDestination error: ", e)
      })
  ```

Example response:

```bash
  {
    created_at: '2023-07-04T10:24:34.247976Z',
    updated_at: '2023-07-04T12:24:34.248+02:00',
    deleted_at: null,
    id: '8f1811700a12a6ca830f25249db84c88b5e6f807b1f2f627a5eb6ae83b0678cf',
    xpub_id: '2ae133435eb9132763ed46f4c8277634be0bb92f3f9db87d889f1e759f140bd8',
    locking_script: '76a9140fd909b4f9de00a3d29875f4d98c3c2c42a52d9c88ac',
    type: 'pubkeyhash',
    chain: 0,
    num: 0,
    address: '12So8wJtKn2gg3DWtfuCd9mCRLEuKUvQLH',
    draft_id: '',
    monitor: '2023-07-04T12:24:34.24747+02:00'
  }
  ```

### Get Transactions

This method return all transactions for xpub which was given during SPV Wallet JS Client creation.

  ```bash
  await userClient.GetTransactions({}, {}, {})
    .then((result) => {
      console.log("GetTransactions result: ", result)
    })
    .catch((e) => {
      console.log("GetTransactions error: ", e)
    })
  ```

Example response:

```bash
  [{
    created_at: '2023-06-23T12:50:29.540595Z',
    updated_at: '2023-06-23T13:02:26.182888Z',
    metadata: {
      receiver: 'test1@example.com',
      sender: 'test2@example.com'
    },
    deleted_at: null,
    id: '2f2e0a94e6b7862b81d0dd304d2416f0092b79404759113390a46b059f54b549',
    hex: 'tx_hex',
    block_hash: '0000000000000000058af1a2e0547e050800836d47b02653c7cf632549aecb39',
    block_height: 797607,
    fee: 188,
    number_of_inputs: 2,
    number_of_outputs: 2,
    draft_id: 'd1e0b10b4b2105592ba0e903664276d058188ce8f4400c4a408624ac99b44e43',
    total_value: 812,
    output_value: 1000,
    status: '',
    direction: 'incoming'
  }]
  ```

### Get Transaction

This method return specific transaction but only if the transaction is connected with user xpub (transaction is incoming or outgoing for user).

  ```bash
  await userClient.GetTransaction("2f2e0a94e6b7862b81d0dd304d2416f0092b79404759113390a46b059f54b549")
    .then((result) => {
      console.log("GetTransaction result: ", result)
    })
    .catch((e) => {
      console.log("GetTransaction error: ", e)
    })
  ```
  
  Example response:
  ```bash
   {
    created_at: '2023-06-23T12:50:29.540595Z',
    updated_at: '2023-06-23T13:02:26.182888Z',
    metadata: {
      receiver: 'jacksmith@domain.com',
      sender: 'jacksmith@domain.com'
    },
    deleted_at: null,
    id: '2f2e0a94e6b7862b81d0dd304d2416f0092b79404759113390a46b059f54b549',
    hex: 'tx_hex',
    block_hash: '0000000000000000058af1a2e0547e050800836d47b02653c7cf632549aecb39',
    block_height: 797607,
    fee: 188,
    number_of_inputs: 2,
    number_of_outputs: 2,
    draft_id: 'd1e0b10b4b2105592ba0e903664276d058188ce8f4400c4a408624ac99b44e43',
    total_value: 812,
    output_value: 1000,
    status: 'complete',
    direction: 'incoming'
  }
  ```
  
### Create transaction
  
Transaction can be made in two different ways. First is using `SendToRecipients` method, which include everything inside. Second is by calling every method separately. 
`SendToRecipients` method

  ```bash
  await userClient.SendToRecipients(recipients, {})
    .then((result) => {
      console.log("SendToRecipients result: ", result)
    })
    .catch((e) => {
      console.log("SendToRecipients error: ", e)
    })
  ```

  Example response:

```bash
  {
    created_at: '2023-07-04T11:18:12.422006Z',
    updated_at: '2023-07-04T13:18:12.422191+02:00',
    deleted_at: null,
    id: '1faf5a70d4e8645c2b20ea57fd3ac8f46fb90e34978dba352c468a0571c93e55',
    hex: '0100000002bad376e7422069bc2b846c5d61422a67ba660963b3feca4f8e98ec18dd429175000000006a47304402207d31f2f91c5863c2847723e1d2759557520734f05a9dcd08253a3f296ccd820502203120535a3a49e9a36577978881136954f47b37fab5af808fa99e978b92639b7b412102a0bbf0c28aa0ed3bf3b77808c6d39457a443bc37978cc85497c7d766cdbeca9effffffffa24951c0ef340ec08fd8c534b22cc3afc9671c532ad40dbdac6e737a7063e252000000006b483045022100dd9285cf2ec90c79b8cf8f90393b808baeec7506d70a8a2eeceeaedc7f62c3370220180de4038078261ef3ddb5e114bdda52095949b07303aab51f71c1717548b0154121023fb6263419f4a4d3af6583d2b1b8f899e1bf3cca3dfc06372523b0aea5fb9635ffffffff02e8030000000000001976a91446c9efdfed9add7fae4de06253232ec7126f34ad88ac2c030000000000001976a914f550b9be55b3289dc044453970fe6d169832fecf88ac00000000',
    block_hash: '',
    block_height: 0,
    fee: 188,
    number_of_inputs: 2,
    number_of_outputs: 2,
    draft_id: '7e347501245f6dad16f5e1b01a43d208422c1e9678d965aa98a3efdbd3ddbb52',
    total_value: 812,
    output_value: -1188,
    status: 'complete',
    direction: 'outgoing'
  }
  ```

Separate methods

```bash
  // Create draft transaction
  const draftTransaction = await userClient.DraftToRecipients(recipients, {})
    .then((result) => {
      console.log("CreateDraftTransaction result: ", result)
      return result
    })
    .catch((e) => {
      console.log("CreateDraftTransaction error: ", e)
      throw Error(e)
    })

  // Finalize transaction
  const txHex = userClient.FinalizeTransaction(draftTransaction, {})

  // Record transaction
  const tx = userClient.RecordTransaction(txHex, draftTransaction.id, {})
    .then((result) => {
      console.log("RecordTransaction result: ", result)
      return result
    })
    .catch((e) => {
      console.log("RecordTransaction error: ", e)
      throw Error(e)
    })
```

Draft transaction

```bash
      {
        created_at: '2023-07-04T11:28:34.734703Z',
        updated_at: '2023-07-04T13:28:34.734735+02:00',
        deleted_at: null,
        id: 'c77172a442753e79289ef4582a5a3a6ce7e551ca0b39a3966446ad0c65d23a95',
        hex: 'tx_hex',
        xpub_id: '782dffb93253f569723023bb0cb35269ff83dac800101c0e89e54fa9917a8a82',
        expires_at: '2023-07-04T11:28:54.320947Z',
        configuration: {
          change_destinations: [ [Object] ],
          change_destinations_strategy: '',
          change_minimum_satoshis: 0,
          change_number_of_destinations: 0,
          change_satoshis: 812,
          expires_in: 0,
          fee: 188,
          fee_unit: { satoshis: 1, bytes: 2 },
          from_utxos: null,
          include_utxos: null,
          inputs: [ [Object], [Object] ],
          outputs: [ [Object], [Object] ],
          sync: null
        },
        status: 'draft'
      }
```

  Finalize transaction return tx hex as a string
  Record transaction

```bash
    {
      created_at: '2023-07-04T11:28:34.840989Z',
      updated_at: '2023-07-04T13:28:34.846286+02:00',
      deleted_at: null,
      id: '8b0dbef52a2eb50776d987f5f3a49fb36d6a39d98818245fb92237be4f074022',
      hex: 'tx_hex',
      block_hash: '',
      block_height: 0,
      fee: 188,
      number_of_inputs: 2,
      number_of_outputs: 2,
      draft_id: 'c77172a442753e79289ef4582a5a3a6ce7e551ca0b39a3966446ad0c65d23a95',
      total_value: 812,
      output_value: -1188,
      status: 'complete',
      direction: 'outgoing'
    }
```
