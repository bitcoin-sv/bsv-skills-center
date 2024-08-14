# Getting Started with BSV SDK in Go
Welcome to the BSV SDK! This guide is tailored for developers working in a Go environment. We'll walk you through the installation process and show you how to get started with creating and signing a Bitcoin SV transaction using the SDK. Whether you're building on BSV for the first time or transitioning an existing project to use the SDK, this guide is for you.

## Prerequisites
Before we begin, make sure you have Go installed on your system. You can download and install Go from golang.org. This guide assumes you have basic knowledge of working with Go.

## Installation
First, you'll need to install the BSV SDK package in your environment. Open your terminal and run the following command:

```bash
go install github.com/bitcoin-sv/go-sdk
```
This command installs the BSV SDK in your environment, making it ready for use. There are no external runtime dependencies.

## Requiring the SDK
To use the BSV SDK in a Go project, you'll import the necessary packages using the import statement. Here's how you set up a basic script to use the BSV SDK:  

Create a new Go file in your project. For example, main.go.
At the top of your file, import the SDK packages you plan to use. For instance:

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
```

## Creating and Signing a Transaction
Now, let's create and sign a transaction. We'll follow the example provided in the README. This example demonstrates how to create a transaction from a source to a recipient, including calculating fees, signing the transaction, and broadcasting it.

Copy and paste the following code into your main.go file below your import statement:
```go
func main() {
	// examlpe wif and associated address
	priv, _ := ec.PrivateKeyFromWif("KznvCNc6Yf4iztSThoMH6oHWzH9EgjfodKxmeuUGPq5DEX5maspS")
	address, _ := script.NewAddressFromPublicKey(priv.PubKey(), true)

	// Source transaction data
	sourceRawtx := "010000000..."
	sourceMerklePathHex := "fed7c50900..."

	sourceTransaction, _ := transaction.NewTransactionFromHex(sourceRawtx)
	merklePath, _ := transaction.NewMerklePathFromHex(sourceMerklePathHex)
	sourceTransaction.MerklePath = merklePath

	// Create a new transaction
	tx := transaction.NewTransaction()

	// Create a new P2PKH unlocker from the private key
	// Add an input
	unlockingScriptTemplate, err := p2pkh.Unlock(priv, nil)
	if err != nil {
		log.Fatal(err.Error())
	}
	tx.AddInput(&transaction.TransactionInput{
		SourceTXID:              sourceTransaction.TxIDBytes(),
		SourceTxOutIndex:        0,
		SourceTransaction:       sourceTransaction,
		UnlockingScriptTemplate: unlockingScriptTemplate,
		SequenceNumber:          transaction.DefaultSequenceNumber,
	})

	// Create a new P2PKH lock from the address
	lockScript, err := p2pkh.Lock(address)
	if err != nil {
		log.Fatal(err.Error())
	}
	// Add the outputs
	tx.AddOutput(&transaction.TransactionOutput{
		LockingScript: lockScript,
		Satoshis:      1,
	})
	if err != nil {
		log.Fatal(err.Error())
	}

	// Sign the transaction
	if err := tx.Sign(); err != nil {
		log.Fatal(err.Error())
	}

	beef, _ := tx.BEEF()
	log.Printf("beef: %s\n", hex.EncodeToString(beef))

	ef, _ := tx.EF()
	log.Printf("ef: %s\n", hex.EncodeToString(ef))
}
```

This script demonstrates the entire process of creating a transaction, from initializing keys to signing and broadcasting. When you run this script using Go (replacing the source transaction and private key), the transaction will be signed and broadcast to the BSV network.

## Running Your Script
To run your script, simply execute the following command in your terminal:

```bash
go run main.go
```

Alternatively you can [run it in playground](https://goplay.tools/snippet/bnsS-pA56ob).
## Conclusion
Congratulations! You've successfully installed the BSV SDK in your Go project and created a signed transaction. This guide covered the basics to get you started, but the BSV SDK is capable of much more. Explore the SDK documentation for detailed information on all the features and functionalities available to build scalable applications with the BSV blockchain.