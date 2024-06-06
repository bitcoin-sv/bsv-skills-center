# Paymail

Paymail client & server library for Golang. The server is used to register paymail routes, provide capabilities. The client is for making requests to other paymail servers.

## Table of Contents

* [Client](go-paymail.md#create-paymail-client)
* [Register routes](go-paymail.md#routes-which-will-be-registered)
* [Capabilities](go-paymail.md#brfccapabilities)

## Create paymail client

Paymail client allows us to use methods normally associated with a paymail service without making any external requests, but rather calling the functions directly.

```go
client, err = paymail.NewClient()
```

**PaymailServiceProvider** must be implemented in your application in order to be able to use the go paymail client. These methods fetch or save data to the database.

> Example implementation in SPV Wallet [here](https://github.com/bitcoin-sv/spv-wallet/blob/master/engine/paymail\_service\_provider.go)

### Methods which the client offers

1.  **CheckDNSSEC** will check the DNSSEC setting for a given domain. Paymail providers should have DNSSEC enabled for their domain

    ```go
    CheckDNSSEC(domain string) (result *DNSCheckResult)
    ```
2.  **CheckSSL** will do a basic check on the host to see if there is a valid SSL cert. All paymail requests should be via HTTPS and have avalid certificate

    ```go
    CheckSSL(host string) (valid bool, err error)
    ```
3.  **GetBRFCs** will return the list of specs

    ```go
    GetBRFCs() []*BRFCSpec 
    ```
4.  **GetCapabilities** will return a list of capabilities for a given domain & port

    ```go
    GetCapabilities(target string, port int) (response *CapabilitiesResponse, err error)
    ```
5.  **GetOptions** will return the Client options

    ```go
    GetOptions() *ClientOptions
    ```
6.  **GetP2PPaymentDestination** will return list of outputs for the P2P transactions to use

    ```go
    GetP2PPaymentDestination(p2pURL, alias, domain string, paymentRequest *PaymentRequest) (response *PaymentDestinationResponse, err error)
    ```
7.  **GetPKI** will return a valid PKI response for a given alias@domain.tld

    ```go
    GetPKI(pkiURL, alias, domain string) (response *PKIResponse, err error)
    ```
8.  **GetPublicProfile** will return a valid public profile

    ```go
    GetPublicProfile(publicProfileURL, alias, domain string) (response *PublicProfileResponse, err error)
    ```
9.  **GetResolver** will return the internal resolver from the client

    ```go
    GetResolver() interfaces.DNSResolver
    ```
10. **GetSRVRecord** will get the SRV record for a given domain name

    ```go
    GetSRVRecord(service, protocol, domainName string) (srv *net.SRV, err error)
    ```
11. **GetUserAgent** will return the user agent string of the client

    ```go
    GetUserAgent() string
    ```
12. **ResolveAddress** will return a hex-encoded Bitcoin script if successful

    ```go
    ResolveAddress(resolutionURL, alias, domain string, senderRequest *SenderRequest) (response *ResolutionResponse, err error)
    ```
13. **SendP2PTransaction** will submit a transaction hex string (tx\_hex) to a paymail provider

    ```go
    SendP2PTransaction(p2pURL, alias, domain string, transaction *P2PTransaction) (response *P2PTransactionResponse, err error)
    ```
14. **ValidateSRVRecord** will check for a valid SRV record for paymail following specifications

    ```go
    ValidateSRVRecord(ctx context.Context, srv *net.SRV, port, priority, weight uint16) error
    ```
15. **VerifyPubKey** will try to match a handle and pubkey

    ```go
    VerifyPubKey(verifyURL, alias, domain, pubKey string) (response *VerificationResponse, err error)
    ```
16. **WithCustomHTTPClient** will overwrite the default client with a custom client.

    ```go
    WithCustomHTTPClient(client *resty.Client) ClientInterface
    ```
17. **WithCustomResolver** will allow you to supply a custom dns resolver, useful for testing etc.

    ```go
    WithCustomResolver(resolver interfaces.DNSResolver) ClientInterface
    ```

## Register paymail routes

By registering paymail routes application is capable to handle requests which are neccessary to handle paymail transactions. Method to register routes:

```go
// RegisterRoutes register all the available paymail routes to the http router
func (c *Configuration) RegisterRoutes(r *apirouter.Router) {
	c.registerPaymailRoutes(r)
}
```

Usage:

```go
client.RegisterRoutes(router)
```

### Routes which will be registered

* Capabilities (serivce discovery)

```http
[GET] /.well-known/bsvalias
```

Response:

```json
{
    "bsvalias": "1.0", // Version of the bsvalias
    "capabilities": {  // Raw list of the capabilities
        "2a40af698840": "https://localhost/v1/bsvalias/p2p-payment-destination/{alias}@{domain.tld}",
        "5f1323cddf31": "https://localhost/v1/bsvalias/receive-transaction/{alias}@{domain.tld}",
        "6745385c3fc0": false,
        "a9f510c16bde": "https://localhost/v1/bsvalias/verify-pubkey/{alias}@{domain.tld}/{pubkey}",
        "f12f968c92d6": "https://localhost/v1/bsvalias/public-profile/{alias}@{domain.tld}",
        "paymentDestination": "https://localhost/v1/bsvalias/address/{alias}@{domain.tld}",
        "pki": "https://localhost/v1/bsvalias/id/{alias}@{domain.tld}"
    }
}
```

* PKI request (public key information)

```http
[GET] /v1/bsvalias/id/:paymailAddress
```

Response:

```json
{
    "bsvalias": "1.0",                                                              // Version of Paymail
    "handle": "test@spvwallet.com",                                                      // The <alias>@<domain>.<tld>
    "pubkey": "0230c98412e89385f64e82e68e5b587c0e19bf42149261caca04ffa77fd915784e"  // The related PubKey
}
```

* Verify PubKey request (public key verification to paymail address)

```
[GET] /v1/bsvalias/verify-pubkey/:paymailAddress/:pubKey
```

Response

```json
{
    "bsvalias": "1.0",                                                              // Version of the bsvalias
    "handle": "test@spvwallet.com",                                                       // The <alias>@<domain>.<tld>
    "match": false,                                                                 // If the match was successful or not
    "pubkey": "03754f0bd1c17825e6c35449d49e97c5c15b94c33360782c1272337ea18dc0f131"  // The related PubKey
}
```

* Payment Destination request (address resolution)

```http
[POST] /v1/bsvalias/address/:paymailAddress
```

Response:

```json
{
	"address": "1GhzQq2zY2E1vB5z8QEMaF4z2JZLfLwY4K",                // Legacy BSV address derived from the output script (custom for our Go package)
	"output": "76a914ac4a730a520a7f26a343c30325c8b53e109cdc7e88ac", // hex-encoded Bitcoin script, which the sender MUST use during the construction of a payment transaction
	"signature": ""                                                 // This is used if SenderValidation is enforced (signature of "output" value)
}
```

* Public Profile request (returns Name & Avatar)

```http
[GET] /v1/bsvalias/public-profile/:paymailAddress
```

Response:

```json
{
    "avatar": "https://url.to.avatar.com/test.png", // A URL that returns a 180x180 image. It can accept an optional parameter `s` to return an image of width and height `s`. The image should be JPEG, PNG, or GIF.
    "name": "test"                                  // A string up to 100 characters long. (name or nickname)
}
```

* P2P Destination request (returns output & reference)

```http
[GET] /v1/bsvalias/p2p-payment-destination/:paymailAddress
```

Response:

```json
{
"outputs": [                                                            // A list of outputs
    {
        "address": "1NSTSMD448yok4y128CENUeGX5mTbFrK1H",                // Hex encoded locking script
        "satoshis": 1000,                                               // Number of satoshis for that output
        "script": "76a914eb2b1be9b79baff275f44f556a0cade66582fc7f88ac"  // Hex encoded locking script
    }
],
"reference": "90030d54ee6e6d35b4cb7c62fd25dad5"                         // A reference for the payment, created by the receiver of the transaction
}
```

* P2P Receive Tx request (receives the P2P transaction, broadcasts, returns tx\_id)

```http
[POST] /v1/bsvalias/receive-transaction/:paymailAddress
```

Response:

```json
{
	"note": "note",                                                             // Some human-readable note
	"txid": "7c0c7eb45f2f78e1d3bfcd19402fd2a7b3a0cf50971e8a835f54cd52282ed452"  // The txid of the broadcasted tx
}
```

## BRFC/Capabilities

BRFC (BSV Request-For-Comments) Specifications define functionality across the ecosystem. Every new feature have to have a documentation where themetadata are specified: title, author, version. BRFC ID is created from those values by applying double SHA256 hash to byte array created from string(this string is created from connected fields from metada - title, author and version), more informations [here](http://bsvalias.org01-02-brfc-id-assignment.html).

#### Defined BRFC IDs:

| Variable name                      | BRFC ID            |
| ---------------------------------- | ------------------ |
| **BRFCP2PPaymentDestination**      | **2a40af698840**   |
| **BRFCP2PTransactions**            | **5f1323cddf31**   |
| BRFCBasicAddressResolution         | 759684b1a19a       |
| BRFCP2PPaymentDestinationWithToken | f792b6eff07a       |
| BRFCPaymentDestination             | paymentDestination |
| BRFCPayToProtocolPrefix            | 7bd25e5a1fc6       |
| BRFCPki                            | pki                |
| BRFCPkiAlternate                   | 0c4339ef99c2       |
| BRFCPublicProfile                  | f12f968c92d6       |
| BRFCReceiverApprovals              | 3d7c2ca83a46       |
| BRFCSenderValidation               | 6745385c3fc0       |
| BRFCSFPAssetInformation            | 1300361cb2d4       |
| BRFCSFPAuthoriseAction             | 95dddb461bff       |
| BRFCSFPBuildAction                 | 189e32d93d28       |
| BRFCVerifyPublicKeyOwner           | a9f510c16bde       |
| BRFCBeefTransaction                | 5c55a7fdb7bb       |

Capabilities are set by two methods:

```go
// GenericCapabilities will make generic capabilities
func GenericCapabilities(bsvAliasVersion string, senderValidation bool) *paymail.CapabilitiesPayload {
	return &paymail.CapabilitiesPayload{
		BsvAlias: bsvAliasVersion,
		Capabilities: map[string]interface{}{
			paymail.BRFCPaymentDestination:   "/address/{alias}@{domain.tld}",
			paymail.BRFCPki:                  "/id/{alias}@{domain.tld}",
			paymail.BRFCPublicProfile:        "/public-profile/{alias}@{domain.tld}",
			paymail.BRFCSenderValidation:     senderValidation,
			paymail.BRFCVerifyPublicKeyOwner: "/verify-pubkey/{alias}@{domain.tld}/{pubkey}",
		},
	}
}
// P2PCapabilities will make generic capabilities & add additional p2p capabilities
func P2PCapabilities(bsvAliasVersion string, senderValidation bool) *paymail.CapabilitiesPayload {
	c := GenericCapabilities(bsvAliasVersion, senderValidation)
	c.Capabilities[paymail.BRFCP2PTransactions] = "/receive-transaction/{alias}@{domain.tld}"
	c.Capabilities[paymail.BRFCP2PPaymentDestination] = "/p2p-payment-destination/{alias}@{domain.tld}"
	return c
}
```

By calling `[GET] /.well-known/bsvalias` endpoint you get all available paymail capabilities which are preceded by BRFC ID. \[Example response(#Routes-which-will-be-registered)

If you want to extend them you need to generate new BRFC ID, add new route and handle it as intended.
