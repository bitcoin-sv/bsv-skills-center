# Authentication

* [Authentication](authentication.md#authentication)
  * [Authenticate with client libraries](authentication.md#authenticate-with-client-libraries)
  * [Deep dive into authentication using client libraries as an example](authentication.md#deep-dive-into-authentication-using-client-libraries-as-an-example)
    * [Get Transaction method example](authentication.md#get-transaction-method-example)
      * [Step one - set the required headers & send the request](authentication.md#step-one---set-the-required-headers--send-the-request)
      * [Step two - receive the request on the SPV Wallet side](authentication.md#step-two---receive-the-request-on-the-spv-wallet-side)
    * [Send transaction method example](authentication.md#send-transaction-method-example)
      * [Step one - set the required headers & send the request](authentication.md#step-one---set-the-required-headers--send-the-request-1)
      * [Step two - receive the request on the SPV Wallet side](authentication.md#step-two---receive-the-request-on-the-spv-wallet-side-1)
  * [Admin](authentication.md#admin)
    * [Setting up admin xpub](authentication.md#setting-up-admin-xpub)
    * [Authenticate with admin xpub](authentication.md#authenticate-with-admin-xpub)
  * [User](authentication.md#user)
    * [Register users xpub](authentication.md#register-users-xpub)
    * [Authenticate with users xpub](authentication.md#authenticate-with-users-xpub)
    * [Access key](authentication.md#access-key)
      * [Create](authentication.md#create)
      * [Use](authentication.md#use)
      * [Revoke](authentication.md#revoke)

## Authenticate with client libraries

The following description is providing examples in http requests, but we strongly encourage you to use one of the SPV Wallet client libraries provided for different languages, which can be easily configured and handle authentication for you:

* [spv-wallet-go-client](../spv-wallet-go-client/)
* [spv-wallet-js-client](../spv-wallet-js-client.md)

## Deep dive into authentication using client libraries as an example

### Get Transaction method example

In this example we will use authentication access key.

#### Step one - set the required headers & send the request

First follow up the specific part in spv-wallet-go-client library authentication docs to set up access key headers:

* [Click here](../spv-wallet-go-client/authentication.md#get-transaction-endpoint-example)

#### Step two - receive the request on the SPV Wallet side

In the `RegisterRoutes` method there are definded two middlewares:

```go
// Use the authentication middleware wrapper
// (... )
require.Use(a.RequireAuthentication)

// Use the authentication middleware wrapper - this will only check for a valid xPub
// (...)
requireBasic.Use(aBasic.RequireBasicAuthentication)
```

some of the endpoints are only checking if the request is authenticated with xpub, and some of them are checking if the request is authenticated with admin access key.

> To choose between those two middlewares, we set it as a second parameter in HTTP method definition, for example:

```go
router.HTTPRouter.GET("/"+config.CurrentMajorVersion+"/transaction", action.Request(router, requireBasic.Wrap(action.get)))
```

**So in this example we will use the `requireBasic` middleware.**

Then in this specific example we get the xpub from the request header and then get the specific transaction from the database using the xpub and transaction id as filters:

```go
// (... )
tx.ID = txID
tx.XPubID = xPubID

// Get the record
err := Get(ctx, tx, nil, false, defaultDatabaseReadTimeout, false);

// (...)
```

### Send transaction method example

#### Step one - set the required headers & send the request

First follow up the specific part in spv-wallet-go-client library authentication docs to set up access key headers: [Click here](../spv-wallet-go-client/authentication.md#create-transaction-endpoint-example)

#### Step two - receive the request on the SPV Wallet side

Here the new thing to point out is the message signature verification.

```go
// adminRequired will always force checking of a signature
if (requireSigning || adminRequired) && !signingDisabled {
	if err = c.checkSignature(ctx, xPubOrAccessKey, authData); err != nil {
	return req, err
}
req = setOnRequest(req, ParamAuthSigned, true)

} else {

// check the signature and add to request, but do not fail if incorrect
err = c.checkSignature(ctx, xPubOrAccessKey, authData)
req = setOnRequest(req, ParamAuthSigned, err == nil)

// NOTE: you can not use an access key if signing is invalid - ever
if xPubOrAccessKey == authAccessKey && err != nil {
	return req, err
}
}

```

as you can see by reading the comments, if the signing is required or the request is marked as admin authentication required we need to have a valid signature. In the other case, we will verify the signature anyway but not fail on invalid verification.

## Admin

### Setting up admin xpub

When starting SPV Wallet you should specify admin xpub as an authentication admin key. This can be done by: Setting admin\_key property in a config json file:

```json
{
  "authentication": {
    "admin_key": "xpub_replace_with_admin_xpub",
    // (...)
  },
  // (...)
}
```

Or by setting environment variable before starting the server:

```bash
SPV_AUTHENTICATION_ADMIN_KEY="xpub_replace_with_admin_xpub"
```

### Authenticate with admin xpub

To authenticate within a SPV Wallet as an admin, you simply need to add a header `X_AUTH_XPUB` with admin xpub as a value.

```http
GET {{spv-wallet-url}}/v1/destination/count
x-auth-xpub: xpub_replace_with_admin_xpub
```

## User

### Register users xpub

To authenticate as user, first your xpub must be added by admin to SPV Wallet.

To register users xpub, admin need to make a following request to SPV Wallet:

```http
POST {{spv-wallet-url}}/v1/xpub
x-auth-xpub: xpub_replace_with_admin_xpub
Content-Type: application/json

{
 "key": "xpub_replace_with_user_xpub"
}
```

### Authenticate with users xpub

To authenticate within a SPV Wallet as a user, you simply need to add a header `SPV_AUTH_XPUB` with user xpub as a value.

```http
GET {{spv-wallet-url}}/v1/destination/count
spv-auth-xpub: xpub_replace_with_user_xpub
```

### Access key

Another way of authenticate as a user is by use of access key.

#### Create

To authenticate as user with access key, first your xpub must be registered in SPV Wallet and you must create an access key by making a request:

```http
POST {{spv-wallet-url}}/v1/access-key
spv-auth-xpub: xpub_replace_with_user_xpub
```

In response, you will receive a json with the following properties: `id` - which actually can be used only on endpoints that can be used for checking the state of the access key (if it was revoked or when it was created) `key` - which is actually an additional private key and is not stored on the SPV Wallet side, so it is displayed to user only once and user is responsible for storing it

#### Use

⚠️ It is important to mention that when using access key to authenticate, the message must be signed, no matter if `require_signing` is disabled or enabled.

When communicating with SPV Wallet,

* `key` is used to sign the message,
* the public key is derived from the `key` and send in a http header `x-auth-key`.

When SPV Wallet receives access key:

* it is hashing public key from `spv-auth-key` http header which should give a result equal to access key `id`,
* then searching for access key by `id` in a database and checking if it's not revoked,
* it is checking the signature with provided public key from `spv-auth-key` http header,
* if everything is ok, then request can be processed further.

ℹ️ Possible further development path:

* add access key scopes for example: READ, WRITE or even more granular
* add expiration date/time

#### Revoke

Whenever a user fills that access key is compromised, or it wouldn't be needed anymore, it is possible to revoke such access key, so it can't be used to authenticate.

To revoke an access key user need to make a request:

```http
DELETE {{spv-wallet-url}}/v1/access-key
x-auth-xpub: xpub_replace_with_user_xpub
```
