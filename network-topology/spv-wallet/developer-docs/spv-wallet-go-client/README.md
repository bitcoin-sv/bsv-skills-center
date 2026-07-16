# Go Client

## Table of contents

* [Overview](./#overview)
* [Installation](./#installation)
* [User / Wallet / Account creation](./#user--wallet--account-creation)
* [Authentication](authentication.md)
* [Examples](https://github.com/bitcoin-sv/spv-wallet-go-client/tree/main/examples)

## Overview

This is GO library used to communicate with SPV Wallet.\
It allows us to create an admin or normal user client and then call methods to work with transactions, xpubs, paymails and access keys.

## Installation

```bash
go get -u github.com/bitcoin-sv/spv-wallet-go-client
```

## User / Wallet / Account creation

To create a new user (by some people also understand as creation of wallet or account), you need to register a new xPub.\
You can found example of how to do that [here](authentication.md#register-users-xpub).

## Authentication

To authenticate within the SPV Wallet, you need to use HD key pair either for admin or normal user.\
Detailed instruction on how to authenticate the client can be found [here](authentication.md).

## Examples

We have prepared some examples for you to get started with the library.\
All of them are available on the SPV Wallet Client GitHub repository, in the [examples/](https://github.com/bitcoin-sv/spv-wallet-go-client/tree/main/examples) directory.
