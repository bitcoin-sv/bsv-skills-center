# JS Client

## Table of contents

* [Overview](#overview)
* [Installation](#installation)
* [User / Wallet / Account creation](#user--wallet--account-creation)
* [Authentication](authentication.md)
* [Examples](https://github.com/bitcoin-sv/spv-wallet-js-client/tree/main/examples)

## Overview

This is TypeScript / JavaScript library used to communicate with SPV Wallet.
It allows to create an admin or normal user client and then call methods to work with transactions, xpubs, paymails and access keys.

## Installation

### NPM

```bash
npm install @bsv/spv-wallet-js-client
```

### Yarn

```bash
yarn add @bsv/spv-wallet-js-client 
```

## User / Wallet / Account creation

To create a new user (which some may also interpret as creating a wallet or account), you need to register a new xPub.
You can find example of how to do that [here](authentication.md#register-users-xpub).

## Authentication

To authenticate within the SPV Wallet, you need to use HD key pair either for admin or normal user.
Detailed instruction on how to authenticate the client can be found [here](authentication.md).

## Examples

We have prepared some examples for you to get started with the library.
All of them are available on the SPV Wallet Client GitHub repository, in the [examples/](https://github.com/bitcoin-sv/spv-wallet-js-client/tree/main/examples) directory.
