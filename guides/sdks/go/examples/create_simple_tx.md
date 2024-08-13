# Example: Creating a Simple Transaction

This guide walks you through the steps of creating a simple Bitcoin transaction. To get started, let's explain some basic concepts around Bitcoin transactions.

## Understanding and Creating Transactions

Transactions in Bitcoin are mechanisms for transferring value and invoking smart contract logic. The Transaction class in the BSV SDK encapsulates the creation, signing, and broadcasting of transactions, also enabling the use of Bitcoin's scripting language for locking and unlocking coins.

## Creating and Signing a Transaction

Consider the scenario where you need to create a transaction. The process involves specifying inputs (where the bitcoins are coming from) and outputs (where they're going). Here's a simplified example:

``` go
package main

import (
	"encoding/hex"
	"log"

	ec "github.com/bitcoin-sv/go-sdk/primitives/ec"
	"github.com/bitcoin-sv/go-sdk/script"
	"github.com/bitcoin-sv/go-sdk/transaction"
	"github.com/bitcoin-sv/go-sdk/transaction/template/p2pkh"
)

// https://goplay.tools/snippet/bnsS-pA56ob
func main() {
	// examlpe wif and associated address
	priv, _ := ec.PrivateKeyFromWif("KznvCNc6Yf4iztSThoMH6oHWzH9EgjfodKxmeuUGPq5DEX5maspS")
	address, _ := script.NewAddressFromPublicKey(priv.PubKey(), true)

	// Source transaction data
	sourceRawtx := "010000000138c7c61c14ffb063c3bb2664041a3e29ea6ea0412a0c18ff725ba4e9e12afae2030000006a47304402203e9ab" +
		"8e4c14addf3b4741540b556cfb0e0efb67dc1a7b5ce84c3ac56b3fd447802203c9f49f7bd893ebd7060176dfc36bcaff9d2c443d9a0dd6" +
		"cd2d59b372c024d20412102798913bc057b344de675dac34faafe3dc2f312c758cd9068209f810877306d66ffffffff02dc05000000000" +
		"0002076a914eb0bd5edba389198e73f8efabddfc61666969ff788ac6a0568656c6c6faa0d0000000000001976a914eb0bd5edba389198e" +
		"73f8efabddfc61666969ff788ac00000000"
	sourceMerklePathHex := "fed7c509000a02fddd010069464172a5d0cd3d641516166091ab84d230e8848ac9ccdc93f185d7b1b07902fddc0" +
		"1029d81a1815050f3a7bf8392e077481151af50a011a10708d4fc480a8ead76b41101ef00a93658c713530e49e2d6cad2529ecf06eb206" +
		"20b9e1d3bdf75dbef8f509a5cc101760040808d97bfcb804293013e2108c4df25996ea9ba517671ff721c7be73dbfc3c5013a000435fef" +
		"874132a7ebda11760ad63eccf37ba82f41793d6453f744b0873829c77011c000a0d32242d744e2007e8c3ccbfd761380d7c4340a90d825" +
		"5cd608ad307752cd8010f007718f8c034a5ff0adf9c3c337660c4592bd6a6ff10de2d8f01afbb8c65f9143e0106006214d394450c84eab" +
		"dcf04e7ecc6b893e1649ecc48bb3a6f38d48afcb0f2bc6a0102006a5fe10c65d3ce6950b4cbbd2bd584bcec0263c5178c3226bde14d7e3" +
		"07d4557010000a14df02e34b74d15dbcd0c7896b3dfb8ffb136cc3ba61ec118b37ddc70974cd5010100a5f147afb93db1ffe573b69b7c8" +
		"4abc3582c6cd7f3eaf82b4142d7557c28f0ae"

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

## Code Walk Through

### Private Key and Address
- PrivateKeyFromWif is used to extract the private key from a Wallet Import Format (WIF) string. This private key is then used to generate a corresponding public key.
- NewAddressFromPublicKey generates a Bitcoin address from the public key. The second argument true indicates that the address will be in the compressed format.

### Source Transaction
- sourceRawtx: A hexadecimal string representing a raw Bitcoin transaction. This transaction serves as the input to the new transaction you are creating.
- NewTransactionFromHex: Converts the raw transaction hex string into a Transaction object.
- sourceMerklePathHex: This hex string represents the Merkle path, which is used for verifying the inclusion of the transaction in a block.
- NewMerklePathFromHex: Converts the Merkle path hex string into a MerklePath object.
- sourceTransaction.MerklePath = merklePath: Associates the Merkle path with the source transaction.

### New Transaction
- NewTransaction creates a new, empty transaction object that will be populated with inputs and outputs.

### Unlocking Script
- p2pkh.Unlock generates an unlocking script (scriptSig) from the private key. This script will be used to prove ownership of the bitcoins being spent.
- The Unlock method creates a template for the unlocking script, which can be used to satisfy the conditions of a P2PKH locking script.

### Transaction Input
- AddInput adds an input to the transaction. The input references the source transaction using its transaction ID (SourceTXID) and specifies the output index (SourceTxOutIndex).
- The input also includes the unlockingScriptTemplate, which is necessary to unlock the bitcoins in the referenced output.

### Locking Script
- p2pkh.Lock creates a locking script (scriptPubKey) for the recipient’s address. This script ensures that only the recipient, who can provide a valid unlocking script, can spend the bitcoins.

### Transaction Output
- AddOutput adds an output to the transaction. The output specifies the locking script and the amount of bitcoins to send (in satoshis).

### Sign Transaction
- tx.Sign signs the transaction. This involves generating digital signatures for each input, which are included in the unlocking scripts. The signatures prove that the sender has the authority to spend the bitcoins.

### Transaction Formats
- BEEF: This outputs the transaction in a custom format defined by [BRC-62](https://brc.dev/62), which may be useful for debugging or analysis.
- EF: This outputs the transaction in another custom format [BRC-30](https://brc.dev/30), providing a different view of the transaction data.

