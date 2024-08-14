# HD Keys

```go
package main

import (
	"log"

	bip32 "github.com/bitcoin-sv/go-sdk/compat/bip32"
)

func main() {
	xPrivateKey, xPublicKey, err := bip32.GenerateHDKeyPair(bip32.SecureSeedLength)
	if err != nil {
		log.Fatalf("error occurred: %s", err.Error())
	}

	// Success!
	log.Printf("xPrivateKey: %s \n xPublicKey: %s", xPrivateKey, xPublicKey)
}
```

## From Xpub

```go
package main

import (
	"log"

	bip32 "github.com/bitcoin-sv/go-sdk/compat/bip32"
)

func main() {

	// Start with an existing xPub
	xPub := "xpub661MyMwAqRbcH3WGvLjupmr43L1GVH3MP2WQWvdreDraBeFJy64Xxv4LLX9ZVWWz3ZjZkMuZtSsc9qH9JZR74bR4PWkmtEvP423r6DJR8kA"

	// Convert to a HD key
	key, err := bip32.GetHDKeyFromExtendedPublicKey(xPub)
	if err != nil {
		log.Fatalf("error occurred: %s", err.Error())
	}

	log.Printf("converted key: %s private: %v", key.String(), key.IsPrivate())
}
```