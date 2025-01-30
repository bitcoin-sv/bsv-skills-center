# Sender Validation

| brfc         | title                                          | author        | version |
| ------------ | ---------------------------------------------- | ------------- | ------- |
| 6745385c3fc0 | bsvalias Payment Addressing (Payer Validation) | andy (nChain) | 1       |

In this extension specification to the [Basic Address Resolution](basic-address-resolution.md), the receiver's paymail service, in response to a request from a sender, performs a [Public Key Infrastructure](../public-key-infrastructure.md) lookup against the sender, to resolve their public key. The receiver's service then verifies the message signature (which is mandatory under this specification), verifies the timestamp of the receiver's request to limit the scope of message replay attacks, and signs the returned output script to prevent message tampering.

### Capability Discovery

The `.well-known/bsvalias` document is updated to include a declaration of sender validation enforcement:

```json
{
  "bsvalias": "1.0",
  "capabilities": {
    "6745385c3fc0": true
  }
}
```

The `capabilities.6745385c3fc0` path is set to `true` to indicate that sender validation is in force. Any value other than `true` must be considered equivalent to `false` and indicates that Sender Validation is not in force.

## Changes to Basic Address Resolution:

* Additional capability added to receiver's `.well-known/bsvalias`
* Sender clients _MUST_ include a digital signature in the payment destination request message. This changes the `signature` field from optional, under the Basic Address Resolution specification, to mandatory
* Receiver services _MUST_ perform a PKI lookup of the sender's paymail handle included in the request `senderHandle` field. If no public key can be resolved, the request _MUST_ fail with HTTP response code `401` (Unauthorized)
* Receiver services _MUST_ verify that the signature over the payment destination request message is valid. If an invalid signature is present, or no signature is present at all, the request _MUST_ fail with HTTP response code `401` (Unauthorized)
* Receiver services _MUST_ verify that the declared date/time in the payment destination request message `dt` field is within two minutes of the receiver service's own clock, in order to limit the scope of replay request attacks. If the value of the `dt` field in the request exceeds the allowed time window, the request _MUST_ fail with HTTP response code `401` (Unauthorized)

### Flow

<figure><img src="../../.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>

### Sender Request

The body of the POST request is unchanged, however the signature is now a mandatory field:

```json
{
    "senderName": "FirstName LastName",
    "senderHandle": "<alias>@<domain.tld>",
    "dt": "<ISO-8601 timestamp>",
    "amount": 550,
    "purpose": "message to receiver",
    "signature": "<compact Bitcoin message signature>"
}
```

### Receiver Response

#### 200 OK

```json
{
  "output": "...",
  "signature": "<compact Bitcoin message signature>"
}
```

The `output` field is unchanged from Basic Address Resolution.

The `signature` field is added and _MUST_ contain a valid Bitcoin message signature over the UTF8 byte string content of the `output` field that senders _MUST_ validate against the receiver's public key. The message digest process and signature encoding scheme is unchanged from that defined in Basic Address Resolution.

#### 401 Unauthorised

This response type is returned when any of the following conditions are true:

* No `signature` is included in the receiver request
* The signature included in the receiver request does not validate for the public key returned from the receiver's paymail PKI service
* The timestamp in the `dt` field is more than two minutes away from the sender's paymail service view of the current time
