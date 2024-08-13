package main

# Private Keys and Addresses

Common string formatting for PrivateKeys and Public Key Hashes can be used as below: 

```go
import (
	"log"

	ec "github.com/bitcoin-sv/go-sdk/primitives/ec"
	script "github.com/bitcoin-sv/go-sdk/script"
)

func main() {

	priv, _ := ec.PrivateKeyFromWif("Kxfd8ABTYZHBH3y1jToJ2AUJTMVbsNaqQsrkpo9gnnc1JXfBH8mn")

	// Print the private key as wif
	log.Printf("Private key: %s\n", priv.Wif())
	address, _ := script.NewAddressFromPublicKey(priv.PubKey(), true)

	// Print the address, and the pubkey hash
	println(address.AddressString, address.PublicKeyHash)

}
```