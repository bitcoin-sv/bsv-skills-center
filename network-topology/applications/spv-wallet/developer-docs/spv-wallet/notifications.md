# Notifications

## Overview

The notifications system has the following features:

- allows clients to subscribe and unsubscribe their webhook URLs
- subscriptions are persisted in the database, so clients do not need to re-subscribe after an spv-wallet restart.
- all instances of spv-wallet observe the status of currently-registered webhooks
- each client has its own queue (golang's buffered channel) so a malfunctioning client does not block other clients
- retries and timed bans on failure are implemented
  - defined retries: `2` with delay between retries: `1 second` and the ban time: `1 hour`
- a webhook call includes a list of events
- 'Notifications Listener' is implemented in `go-client` so it's ready to use, without detailed knowledge about webhooks.
  - It handles subscription and unsubscription,
  - you only need to register a handler for a specific event type
  - Check out the [example](https://github.com/bitcoin-sv/spv-wallet-go-client/blob/main/examples/webhooks/webhooks.go)

## Event types

Currently implemented event types are defined here: [spv-wallet: models/notifications.go](https://github.com/bitcoin-sv/spv-wallet/blob/main/models/notifications.go)

#### TransactionEvent is sent when transaction is made or its status changes (e.g. from "unconfirmed" to "mined")

```go
// UserEvent - event with user identifier
type UserEvent struct {
	XPubID string `json:"xpubId"`
}

// TransactionEvent - event for transaction changes
type TransactionEvent struct {
	UserEvent `json:",inline"`

	TransactionID   string           `json:"transactionId"`
	Status          string           `json:"status"`
	XpubOutputValue map[string]int64 `json:"xpubOutputValue"`
}
```

The `XpubOutputValue` maps xpub ids to actual satoshi values.
**It's crucial to note that these values can be either positive or negative.**
Based on that you can determine if this is `outgoing (negative)` or `incomming (positive)` transaction from the particual `xpubID` perspective.

## Subscribing to Webhooks

To receive HTTP-based notifications on a specified URL, clients need to make request with `admin-key` [authentication](authentication.md#authenticate-as-admin):

```http
POST {{spv-wallet-url}}/v1/admin/webhooks/subscriptions
x-auth-xpub: {{xpub_of_the_admin}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
Content-Type: application/json

{
  "url": "http://your-webhook-url.com",
  "tokenHeader": "Authorization",
  "tokenValue": "Bearer your-token"
}
```

where only the `url` is required.

The client must run an HTTP server that listens on the specified URL to receive events from the spv-wallet.

Additional security layer to make sure that only the spv-wallet instance can send notifications is based on `tokenHeader` and `tokenValue`.
If these are defined, for each request, spv-wallet will include such header (`<tokenHeader>: <tokenValue>`) and the client should check if it equals to what was defined during the subscription process.

## Unsubscribing from Webhooks

Subscriptions are stored in the spv-wallet's database and persist until the client unsubscribes.

To unsubscribe, the client should make a request authenticated with `admin-key` [authentication](authentication.md#authenticate-as-admin):

```http
DELETE {{spv-wallet-url}}/v1/admin/webhooks/subscriptions
x-auth-xpub: {{xpub_of_the_admin}}
x-auth-hash: {{hash_of_the_body}}
x-auth-nonce: {{random_number_as_hex}}
x-auth-time: {{timestamp_in_milliseconds}}
x-auth-signature: {{signature}}
Content-Type: application/json

{
  "url": "http://your-webhook-url.com",
}
```


## Request with the list of events from spv-wallet to defined webhook

The spv-wallet will send a POST request containing a list of events to the defined webhook URL as soon as possible.
While processing events, if new events arrive in the input channel before the current batch is dispatched, these new events are accumulated and included in the next webhook call.
To prevent excessively large payloads, the maximum number of events included in a single webhook call is capped at `100`.
The webhook request always contains an array of events in its JSON payload. In scenarios with low event frequency, this array might often contain only a single event.

The json body of the request with events will look like this:

```json
[
  {
    "type": "TransactionEvent",
    "content": {
      "xpubId": "some-xpub-id",
      "transactionId": "some-transaction-id",
      "status": "MINED",
      "xpubOutputValue": { "xpub-id-1": 1000, "xpub-id-2": -1000 }
    }
  },
  {
    // possible other event of the same or different type
  }
  // ...
]
```

## Webhook client implementation

There is no need for potential clients to implement those webhook logic and endpoint events listeners on their own.
Client libraries provides the way to simplify webhook integration, please check the examples in your preferred language.

* [Go Client webhook examples](https://github.com/bitcoin-sv/spv-wallet-go-client/blob/main/examples/webhooks/webhooks.go)
* [JS Client webhook examples](https://github.com/bitcoin-sv/spv-wallet-js-client/blob/main/examples/webhook.ts)

