# SPV Wallet Go Client - Authentication

## Table of Contents

- [How message signing works in spv-wallet-go-client library?](#how-message-signing-works-in-spv-wallet-go-client-library)
  - [SetSignature method](#setsignature-method)
    - [Algorithm Overview](#algorithm-overview)
    - [Created Headers](#created-headers)
- [Get Transaction endpoint example](#get-transaction-endpoint-example)
  - [Creating the Client Instance with Access Key](#create-the-client-instance-with-access-key---get-transaction-endpoint-example)
  - [What is behind the "New" method?](#what-is-behind-the-new-method)
  - [Sending Request to the SPV Wallet - Access Key Authentication](#sending-request-to-the-spv-wallet---access-key-authentication)
- [Create Transaction endpoint example](#create-transaction-endpoint-example)
  - [Creating the Client Instance with Access Key](#create-the-client-instance-with-access-key---create-transaction-endpoint-example)

## How message signing works in spv-wallet-go-client library?

### SetSignature method

Signing process is a part of `SetSignature`:

```go
func SetSignature(header *http.Header, xPriv *bip32.ExtendedKey, bodyString string) error {
	// Create the signature
	authData, err := createSignature(xPriv, bodyString)
	if err != nil {
		return err
	}

	// Set the auth header
	header.Set(models.AuthHeader, authData.XPub)

	return setSignatureHeaders(header, authData)
}
```

#### Algorithm Overview

The algorithm is presented below:

1. The createSignature function takes a private key (xPriv) and body contents (bodyString) as input.
2. It retrieves the extended public key (xPub) from the xPriv using the GetExtendedPublicKey function. This is used for verification purposes.
3. A random and unique string (AuthNonce) is generated as the authentication nonce to seed the signing message.
4. The AuthNonce and xPriv are used to derive a child extended key using the DeriveChildKeyFromHex function.
5. The child extended key is then converted to a private key (privateKey) using the GetPrivateKeyFromHDKey function.
6. The createSignatureCommon function is called with the necessary parameters to create the signature.
7. In createSignatureCommon, the message body is hashed using the SHA-256 algorithm, and the result is assigned to AuthHash.
8. The current timestamp in milliseconds is assigned to AuthTime.
9. The signature is generated using the bitcoin.SignMessage function, which signs the message using the private key and the signing message composed of xPub, AuthHash, AuthNonce, and AuthTime.
10. The signing algorithm used in the bitcoin.SignMessage function internally uses the SHA-256 algorithm for hashing the message.

Finally, the createSignatureCommon function returns the AuthPayload containing the extended public key, authentication nonce, authentication hash, authentication time, and signature.

#### Created headers

##### Auth headers

`x-auth-key` -> xpub

##### Signature headers

- `x-auth-hash` -> sha256 hash of the body string
- `x-auth-nonce` -> random string
- `x-auth-time` -> timestamp in milliseconds
- `x-auth-signature` -> signature

### Get Transaction endpoint example

---

#### Create the client instance with Access Key - Get Transaction endpoint example

First we can call the `New` method from spv-wallet-go-client library:

```go
	walletClient, err := walletClient.New(
		walletClient.WithAccessKey(accessKey),
		walletClient.WithHTTP(serverUrl),
		walletClient.WithSignRequest(signRequest),
	)
```

As the parameter we can specify:

```go
(opts ...walletclient.ClientOps)
```

options

```go
    walletClient.WithHTTP(serverUrl),
```

are used to provide the url of the SPV Wallet and to enable/disable debugging mode.

```go
    walletClient.WithSignRequest(signRequest),
```

the signRequest option is used to enable/disable signing all messages send to the SPV Wallet.

The most important for us is the `walletclient.WithAccessKey(accessKey)` option, which is used to provide the access key.

In a return we will receive a spv-wallet-go-client instance prepared to communicate with the server and an error if something went wrong.

---

### What is behind the New method?

In above example we use the .WithAccessKey method so the below code was be executed:

```go
func WithAccessKey(accessKeyString string) ClientOps {
	return func(c *WalletClient) {
		if c != nil {
			c.accessKeyString = accessKeyString
		}
	}
}
```

so after this the `accessKeyString` field of the walletclient instance will be set to the value of the `accessKeyString` parameter.

It takes us to the `walletclient.go` file inside spv-wallet-go-client library and the `else if` statement related to the `accessKeyString` will be executed:

```go
	else if client.accessKeyString != "" {
		// (...)
		if decodedWIF, err = wif.DecodeWIF(client.accessKeyString); err != nil {
			// try as a hex string
			var errHex error
			if privateKey, errHex = bitcoin.PrivateKeyFromString(client.accessKeyString); errHex != nil {
				return nil, errors.Wrap(err, errHex.Error())
			}
		} else {
			privateKey = decodedWIF.PrivKey
		}
		client.accessKey = privateKey
    }
```

to summarize the above code, the `accessKeyString` is decoded to the `accessKey` and stored in the `accessKey` field of the walletclient instance. There are two dependencies used here:

- `wif` from `github.com/libsv/go-bk/wif`,
- `bitcoin` from `github.com/bitcoinschema/go-bitcoin/v2`.

If you want to know more how the decode wif process works, you can read the short docs [here](/docs/domain_knowledge/blockchain/components/keys&addresses/wif_decoding.md).

---

#### Sending request to the SPV Wallet - access key authentication

To send a SPV Wallet request from a client library we use the `doHTTPRequest` (`transports/http.go`) method which is a wrapper for the `http.Do` method from the `net/http` library.

```go
    // (...)
	if xPriv != nil {
		err = h.authenticateWithXpriv(sign, req, xPriv, rawJSON)
		if err != nil {
			return err
		}
	} else {
		err = h.authenticateWithAccessKey(req, rawJSON)
		if err != nil {
			return err
		}
	}
    // (...)
```

as we set the `accessKey` in the walletclient instance, the `authenticateWithAccessKey` method will be executed:

This method will preare request headers presented in this section: [Created headers](#created-headers)

### Create transaction endpoint example

---

#### Create the client instance with Access Key - Create Transaction endpoint example

The difference between the `Get Transaction` and `Create Transaction` endpoints is that the `Create Transaction` endpoint requires the `xPriv` key to be set in the walletclient instance instead of the `accessKey`.

```go
    walletclient, err := walletclient.New(
        (...)
        walletclient.WithXPriv(xPriv),
        (...)
    )
```

the proper if/else statement will be executed and the authenticateWithXpriv method will be called:

```go
	if sign {
		if err = addSignature(&req.Header, xPriv, string(rawJSON)); err != nil {
			return err
		}
	}
    // (...)
	return nil
```

for the `DraftTransaction` endpoint the `sign` parameter is set to `true` so the `addSignature` method will be executed.

**Body string will be signed with xpriv** with `createSignature` and the same headers as in the `Get Transaction` endpoint will be added to the request.
