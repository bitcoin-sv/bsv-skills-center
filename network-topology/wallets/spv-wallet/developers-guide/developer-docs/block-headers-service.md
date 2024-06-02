# Block Headers Service

The Block Headers Service is a standalone service that communicates with the Bitcoin network using the P2P protocol. It is used to retrieve block headers and data related to them.

## Table of Contents

* [How it is used in the SPV Wallet ecosystem](block-headers-service.md#how-it-is-used-in-the-spv-wallet-ecosystem)
* [How merkle roots are verified](block-headers-service.md#how-merkle-roots-are-verified)
* [Authentication](block-headers-service.md#authentication)

## How it is used in the SPV Wallet ecosystem

The Block Headers Service (BHS) is used by the SPV Wallet to verify the validity of merkle roots.

This service exposes a REST API with multiple endpoints, the most important from the SPV Wallet user perspective is:

`GET /chain/merkleroots/verify`

![Merkle Roots Verify](../../developer-docs/block-headers-service/merkleroots.jpg)

## How merkle roots are verified

The SPV Wallet sends a request to the BHS with an array of merkle roots and the block height.

```json
[
  {
    "blockHeight": 0,
    "merkleRoot": "string"
  }
]
```

The BHS should return an object which contains general information about confirmation process called `confirmationState` and an array of validated merkle roots with blockHash, blockHeight, confirmation state and merkleRoot.

```json
[
  {
    "confirmationState": "CONFIRMED",
    "confirmations": [
      {
        "blockHash": "string",
        "blockHeight": 0,
        "confirmation": "CONFIRMED",
        "merkleRoot": "string"
      }
    ]
  }
]
```

Confirmation passes only if both - blockHeight and merkleRoot are valid pair.

> :warning: **Note**: BHS only checks for merkle roots in Longest Chain. It does not check for merkle roots in Side Chains.
>
> :warning: **Note**: There might be a case that merkle root is valid but BHS does not have it in its database. It happens when the block is freshly mined and BHS did not receive it yet.

## Authentication

Block Headers Service API needs a valid Bearer token to be used. You can set the token in `config.yaml` file.

When running this service from `start.sh` script, the token would be default and properly set on both `spv-wallet` and `block-headers-service`.
