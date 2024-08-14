# Creating a Simple Transaction

This guide walks you through the steps of creating a simple Bitcoin transaction. To get started, let's explain some basic concepts around Bitcoin transactions.

## Understanding and Creating Transactions

Transactions in Bitcoin are mechanisms for transferring value and invoking smart contract logic. The `Transaction` class in the BSV SDK encapsulates the creation, signing, and broadcasting of transactions, also enabling the use of Bitcoin's scripting language for locking and unlocking coins.

## Creating and Signing a Transaction

Consider the scenario where you need to create a transaction. The process involves specifying inputs (where the bitcoins are coming from) and outputs (where they're going). Here's a simplified example:

{% tabs %}
{% tab title="JavaScript" %}
```javascript
import { Transaction, PrivateKey, PublicKey, P2PKH, ARC } from '@bsv/sdk'

const privKey = PrivateKey.fromWif('...') // Your P2PKH private key
const changePrivKey = PrivateKey.fromWif('...') // Change private key (never re-use addresses)
const recipientAddress = '1Fd5F7XR8LYHPmshLNs8cXSuVAAQzGp7Hc' // Address of the recipient

const tx = new Transaction()

// Add the input
tx.addInput({
  sourceTransaction: Transaction.fromHex('...'), // The source transaction where the output you are spending was created,
  sourceOutputIndex: 0, // The output index in the source transaction
  unlockingScriptTemplate: new P2PKH().unlock(privKey), // The script template you are using to unlock the output, in this case P2PKH
})

// Pay an output to a recipient using the P2PKH locking template
tx.addOutput({
  lockingScript: new P2PKH().lock(recipientAddress),
  satoshis: 2500
})

// Send remainder back the change
tx.addOutput({
  lockingScript: new P2PKH().lock(changePrivKey.toPublicKey().toHash()),
  change: true
})

// Now we can compute the fee and sign the transaction
await tx.fee()
await tx.sign()

// Finally, we broadcast it with ARC.
// get your api key from https://console.taal.com
const apiKey = 'mainnet_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // replace
await tx.broadcast(new ARC('https://api.taal.com/arc', apiKey))
```


{% endtab %}

{% tab title="Go" %}
```go
package main

import (
	"encoding/hex"
	"log"

	ec "github.com/bitcoin-sv/go-sdk/primitives/ec"
	"github.com/bitcoin-sv/go-sdk/script"
	"github.com/bitcoin-sv/go-sdk/transaction"
	"github.com/bitcoin-sv/go-sdk/transaction/template/p2pkh"
)

func main() {
	priv, _ := ec.PrivateKeyFromWif("K...")
	address, _ := script.NewAddressFromPublicKey(priv.PubKey(), true)

	// Source transaction data
	sourceRawtx := "010000000138c7..."
	sourceMerklePathHex := "fed7c509000a02fddd01..."

	sourceTransaction, _ := transaction.NewTransactionFromHex(sourceRawtx)
	merklePath, _ := transaction.NewMerklePathFromHex(sourceMerklePathHex)
	sourceTransaction.MerklePath = merklePath

	// Create a new transaction
	tx := transaction.NewTransaction()

	// Create a new P2PKH unlocking script template
	unlockingScriptTemplate, _ := p2pkh.Unlock(priv, nil)
	
	// Add the input
	tx.AddInput(&transaction.TransactionInput{
		SourceTXID:              sourceTransaction.TxIDBytes(),
		SourceTxOutIndex:        0,
		SourceTransaction:       sourceTransaction,
		UnlockingScriptTemplate: unlockingScriptTemplate,
		SequenceNumber:          transaction.DefaultSequenceNumber,
	})

	// Create a new P2PKH locking script
	lockingScript, _ := p2pkh.Lock(address)
	
	// Add the output
	tx.AddOutput(&transaction.TransactionOutput{
		LockingScript: lockingScript,
		Satoshis:      1,
	})

	// Sign the transaction
	_ := tx.Sign()

	beef, _ := tx.BEEF()
	log.Printf("beef: %s\n", hex.EncodeToString(beef))

	ef, _ := tx.EF()
	log.Printf("ef: %s\n", hex.EncodeToString(ef))
}
```
{% endtab %}
{% endtabs %}

This code snippet demonstrates creating a transaction, adding an input and an output, setting a change script, configuring the fee, signing the transaction, and broadcasting with the ARC broadcaster. It uses the P2PKH Template, which is a specific type of Bitcoin locking program. To learn more about templates, check out this example (link to be provided once cmpplete).

## Handling Hex Locking Scripts

Moving beyond this basic example into more advanced use-cases enables you to start dealing with custom scripts. If you're provided with a hex-encoded locking script for an output, you can set it directly in the transaction's output as follows:

```typescript
transaction.addOutput({
  lockingScript: Script.fromHex('76a9....88ac'), // Hex-encoded locking script
  satoshis: 2500 // Number of satoshis
})
```

The `Transaction` class abstracts the complexity of Bitcoin's transaction structure. It handles inputs, outputs, scripts, and serialization, offering methods to easily modify and interrogate the transaction. Check out the full code-level documentation, refer to other examples, or reach out to the community to learn more.

## Configuring the ARC with http client

The ARC broadcaster requires an HTTP client to broadcast transactions. By default, the SDK will try to search for `window.fetch` in browser or `https` module on Node.js. If you want to use a custom (or preconfigured) HTTP client, you can pass it as an argument to the ARC constructor:

### fetch

```typescript
// In this example we're assuming you have variable fetch holding the fetch function`

const arc = new ARC('https://api.taal.com/arc', apiKey, {fetch})
```

### https

Because ARC is assuming concrete interface of the http client, we're providing an adapter for https module. You can use it as follows:

```typescript
// In this example we're assuming you have variable https holding the https module loaded for example with `require('https')`

const arc = new ARC('https://api.taal.com/arc', apiKey, new NodejsHttpClient(https))

```

### axios

Although the SDK is not providing adapters for axios, it can be easily used with the ARC broadcaster. You can make your own "adapter" for axios as follows:

```typescript
const axiosHttpClient = { fetch: (url, options) => axios(url, {...options, data: options.body})}

new ARC('https://api.taal.com/arc', apiKey, axiosHttpClient) 
```

### other libraries

Although the SDK is not providing adapters for other libraries, you can easily create your own adapter by implementing the `HttpClient` interface. Please look at the example for axios above to see how easy it can be done.
