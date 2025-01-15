# Authentication

## Authenticate as admin

To authenticate within the SPV Wallet as an admin, you need to use admin HD key pair.
At the SPV Wallet side the admin key pair is recognized by the admin xpub which need to be configured ([see configuration docs](../spv-wallet/configuration.md)).

When you have the admin xpriv, you can now create SPV Wallet Client for admin API:
```typescript
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";

async function main() {
    const adminClient = new SpvWalletClient("{{spv-wallet-url}}", {adminKey: "{{xpriv_of_the_admin}}"})
    // ...
}
```

## User

### Authentication using HD keys of user

#### Register users xpub

To authenticate as user, first user and his xpub must be added by admin to SPV Wallet.

To register user, admin need to make a following request to SPV Wallet:
```typescript
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";

async function main() {
    const adminClient = new SpvWalletClient("{{spv-wallet-url}}", {adminKey: "{{xpriv_of_the_admin}}"})

    const response = await adminClient.AdminNewXpub("{{xpub_of_the_user}}", {})
    // ...
}
```

#### Authenticate with users xpub

To authenticate within the SPV Wallet as a user, you simply need to create a new SPV Wallet Client for users API.

```typescript
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";

async function main() {
    const userClient = new SpvWalletClient("{{spv-wallet-url}}", {xPriv: "{{xpriv_of_the_user}}"})
    // ...
}
```

### Authentication using Access key

Another way of authenticate as a user is by use of access key.

#### Create

To authenticate as user with access key, first user must create an access key by making a following call:

```typescript
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";

async function main() {
    const userClient = new SpvWalletClient("{{spv-wallet-url}}", {xPriv: "{{xpriv_of_the_user}}"})

    const response = await userClient.CreateAccessKey({})
    // ...
}
```

In response, you can find the following important properties:
* `key` - which is actually an additional private key and is not stored on the SPV Wallet side, so it is displayed to user only once and user is responsible for storing it
* `id` - which actually can be used for checking the state of the access key (if it was revoked or when it was created) or revoking it.


#### Use

To authenticate as user with access key, you need to create a new SPV Wallet Client for users API with the access key.

```typescript
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";

async function main() {
    const userClient = new SpvWalletClient("{{spv-wallet-url}}", {accessKey: "{{key}}"})
    // ...
}
```

#### Revoke

Whenever a user fills that access key is compromised, or it wouldn't be needed anymore, it is possible to revoke such access key, so it can't be used to authenticate.

To revoke an access key user need to make a following call:

```typescript
import {SpvWalletClient} from "@bsv/spv-wallet-js-client";

async function main() {
    const userClient = new SpvWalletClient("{{spv-wallet-url}}", {xPriv: "{{xpriv_of_the_user}}"})

    const response = await userClient.RevokeAccessKey("{{id}}")
    // ...
}
```

