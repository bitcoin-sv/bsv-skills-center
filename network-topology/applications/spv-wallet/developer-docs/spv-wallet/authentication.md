# Authentication

<!-- TOC -->
* [Authentication](#authentication)
  * [Authenticate with client libraries](#authenticate-with-client-libraries)
  * [HTTP Authentication](#http-authentication)
    * [Authentication headers](#authentication-headers)
      * [Auth headers](#auth-headers)
    * [Signing Message Algorithm Overview](#signing-message-algorithm-overview)
  * [Authenticate as admin](#authenticate-as-admin)
  * [User](#user)
    * [Authentication using HD keys of user](#authentication-using-hd-keys-of-user)
      * [Register users xpub](#register-users-xpub)
      * [Authenticate with users xpub](#authenticate-with-users-xpub)
    * [Authentication using Access key](#authentication-using-access-key)
      * [Create](#create)
      * [Use](#use)
      * [Revoke](#revoke)
<!-- TOC -->

## Authenticate with client libraries

The following description is providing examples in http requests, but we strongly encourage you to use one of the SPV Wallet client libraries provided for different languages, which can be easily configured and handle authentication for you:

* [spv-wallet-go-client](../spv-wallet-go-client/)
* [spv-wallet-js-client](../spv-wallet-js-client/)

## HTTP Authentication

To authenticate against the SPV Wallet, one need to sign the request and provide the following headers:

### Authentication headers

#### Auth headers

- `x-auth-key` -> xpub
- `x-auth-hash` -> sha256 hash of the body string
- `x-auth-nonce` -> random string
- `x-auth-time` -> timestamp in milliseconds
- `x-auth-signature` -> signature

### Signing Message Algorithm Overview

The algorithm is presented below:

1. To sign a message you must possess an extended private key (xPriv).
2. Retrieve the extended public key (xPub) from the xPriv.
3. Set the xPub in `x-auth-xpub` header.
4. Generate a random and unique number and encode it as hex, this is the authentication nonce (AuthNonce).
5. Set the AuthNonce in `x-auth-nonce` header.
6. Hash request body with SHA-256 algorithm and 
7. Set the hash of the body in `x-auth-hash` header.
8. Get the current timestamp in milliseconds and set it in `x-auth-time` header.
9. Derive a child extended key from the xPriv using AuthNonce.
10. Prepare message to sign by concatenating xPub, AuthHash, AuthNonce, and AuthTime.
11. Sign the message using Bitcoin Signed Message encoding, and the child extended private key.
12. Encode the signature in base64 and set it in `x-auth-signature` header.

## Authenticate as admin

To authenticate within the SPV Wallet as an admin, you need to use admin HD key pair.
At the SPV Wallet side the admin key pair is recognized by the admin xpub which need to be configured ([see configuration docs](./configuration.md)).

```http
GET {{spv-wallet-url}}/api/v1/admin/status
x-auth-xpub: {{xpub_of_the_admin}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
```

## User

### Authentication using HD keys of user

#### Register users xpub

To authenticate as user, first user and his xpub must be added by admin to SPV Wallet.

To register user, admin need to make a following request to SPV Wallet:

```http
POST {{spv-wallet-url}}/api/v1/admin/users
x-auth-xpub: {{xpub_of_the_admin}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
Content-Type: application/json

{
 "key": "{{xpub_of_the_user}}"
}
```

#### Authenticate with users xpub

To authenticate within a SPV Wallet as a user, you simply need to use your xpub and sign the request with your xpriv.

```http
GET {{spv-wallet-url}}/v1/user/current
x-auth-xpub: {{xpub_of_the_user}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
```

### Authentication using Access key

Another way of authenticate as a user is by use of access key.

#### Create

To authenticate as user with access key, first user must create an access key by making a request:

```http
POST {{spv-wallet-url}}/api/v1/users/current/keys
x-auth-xpub: {{xpub_of_the_user}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
```

In response, you will receive a json with the following properties: 
* `key` - which is actually an additional private key and is not stored on the SPV Wallet side, so it is displayed to user only once and user is responsible for storing it
* `id` - which actually can be used only on endpoints that can be used for checking the state of the access key (if it was revoked or when it was created) 

#### Use

When communicating with SPV Wallet,

1. Retrieve public key (PubKey) from the AccessKey (`key` property from the response of the create access key request).
2. Set the PubKey in `x-auth-key` header.
3. Generate a random and unique number and encode it as hex, this is the authentication nonce (AuthNonce).
4. Set the AuthNonce in `x-auth-nonce` header.
5. Hash request body with SHA-256 algorithm and
6. Set the hash of the body in `x-auth-hash` header.
7. Get the current timestamp in milliseconds and set it in `x-auth-time` header.
8. Prepare message to sign by concatenating AccessKey, AuthHash, AuthNonce, and AuthTime.
9. Sign the message using Bitcoin Signed Message encoding, and the AccessKey.
10. Encode the signature in base64 and set it in `x-auth-signature` header.

ℹ️ Possible further development path:

* add access key scopes for example: READ, WRITE or even more granular
* add expiration date/time

#### Revoke

Whenever a user fills that access key is compromised, or it wouldn't be needed anymore, it is possible to revoke such access key, so it can't be used to authenticate.

To revoke an access key user need to make a request:

```http
DELETE {{spv-wallet-url}}/api/v1/users/current/keys/{{id}}
x-auth-xpub: {{xpub_of_the_user}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
```
