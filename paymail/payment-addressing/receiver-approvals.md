# Receiver Approvals

| brfc         | title                                         | author        | version |
| ------------ | --------------------------------------------- | ------------- | ------- |
| 3d7c2ca83a46 | bsvalias Payment Addressing (Payee Approvals) | andy (nChain) | 1       |

The Receiver Approvals specification extends both [Basic Address Resolution](basic-address-resolution.md) and [Sender Validation](sender-validation.md) specifications by introducing a callback-based message flow and moving the payment destination process from a synchronous request-response flow to an asynchronous flow. Additional steps for the receiver are introduced, along with additional responses back to the sender, and additional demands on the capabilities of the sender's paymail service.

## Capability Discovery

The `.well-known/bsvalias` document is updated to include a declaration of Receiver Approval flow support:

```json
{
  "bsvalias": "1.0",
  "capabilities": {
    "3d7c2ca83a46": {
      "callback": "https://bsvalias.example.org/{alias}@{domain.tld}/payment-destination-response"
    }
  }
}
```

The `capabilities.3d7c2ca83a46` object contains a `callback` property with a template endpoint URI for incoming payment destination request callbacks.

## Changes to Basic Address Resolution and Sender Validation

* An additional response type with HTTP status code `202` (Accepted) is introduced. The body of the `202` response contains a token used to correlate a later callback from the receiver to the sender's paymail system with the initiating request from the sender
* The receiver's paymail system asynchronously notifies the receiver that the request has been received. The receiver is free to respond to the request at any time; that is to say this step is asynchronous and does not rely on the user being available at the time the request is received
  * The specific interaction between the receiver's paymail service and the receiver's client is beyond the scope of this specification

### Flow

<figure><img src="../../.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>

The Receiver Approval flow diagram detailed below does not include the Sender Validation steps in order to reduce diagrammatic complexity. These steps are mandatory and the flow is detailed in the Sender Validation specification.

## Sender Request

There are no changes to the Sender Request as described in the Sender Validation specification.

## Receiver Response

Existing `200`, `401` and `404` responses remain unchanged.

### 202 Accepted

The request was received but further action from the receiver is required. The body of the `202` response _MUST_ contain a correlation token for the sender to later match a callback from the receiver's system to a request initiated by the sender. The response content type _MUST_ be `application/json` and _MUST_ conform to the following schema:

```json
{
  "token": "...",
  "signature": "..."
}
```

`token` _MUST_ be unique across all requests. It is suggested that implementers use a token derivation function over the initiating request, for example the token could be a hex-encoded double-SHA256 hash of all fields of the request.

Sender systems are expected to annotate their local copy of the request with this token in order to match a response callback at some point in the future to the originating request.

The `signature` field _MUST_ contain a valid Bitcoin message signature over the UTF8 byte string content of the `token` field that senders _MUST_ validate against the receiver's public key. The message digest process and signature encoding scheme is unchanged from that defined in Basic Address Resolution.

## Receiver Callback

The `capabilities.3d7c2ca83a46.callback` path of the sender's `.well-known/bsvalias` document returns a URI template. Receivers should replace the `{alias}` and `{domain.tld}` template parameters with the values from the receiver's paymail handle and then make an HTTP POST request against this URI.

The request _MUST_ have a content type of `application/json` and _MUST_ conform to the following schema:

```json
{
  "token": "...",
  "output": "...",
  "signature": "..."
}
```

The `token` field contains the same token as returned from be Receiver's paymail service during the `202` response.

The `output` field is unchanged from Basic Address Resolution.

The `signature` field is added and _MUST_ contain a valid Bitcoin message signature over the UTF8 byte string content of the concatenation of the `token` and `output` field that senders _MUST_ validate against the receiver's public key. The message digest process and signature encoding scheme is unchanged from that defined in Basic Address Resolution.

## Rejected Requests

No callback is specified for rejections. Sender clients receive no information about a rejected request. A rejection and an outstanding request are, by design, indistinguishable.
