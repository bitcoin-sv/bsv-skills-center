# SPV Wallet Admin

## Table of Contents

  - [Overview](#overview)
  - [Usage](#usage)
    - [Locally](#locally)
    - [Docker-compose](#docker-compose)
  - [What it offers](#what-it-offers)
  - [Project structure](#project-structure)

🔗 [GitHub URL](https://github.com/bitcoin-sv/spv-wallet-admin)

## Overview

SPV Wallet Admin console is an admin panel that allows for viewing (and in some parts integrating with) SPV Wallet data.

## Usage

### Locally

1. Clone [spv-wallet-admin](https://github.com/bitcoin-sv/spv-wallet-admin)

2. Create an `env-config.json` file in root of the project and put **SPV Wallet URL** (localhost if you run locally):

```json
{
  "apiUrl": "http://localhost:3003/v1",
}
```

If localhost doesn't work, try putting `http://127.0.0.1:3000/v1` as the url.

1. Run SPV Wallet Admin

```bash
yarn        # to install
yarn dev    # to run
```

4. Enter the url in the browser (usually localhost:3000) and log in with your xPriv.

---

### Docker-compose

1. Clone [spv-wallet-admin](https://github.com/bitcoin-sv/spv-wallet-admin)

2. Create an `env-config.json` file in root of the project and put **SPV Wallet URL** (localhost if you run locally):

```json
{
  "apiUrl": "http://localhost:3003/v1",
}
```

3. Add a volume with this file in docker-compose.yml:

```yaml
services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - '3000:3000'
    volumes:
      - 'env-config/json:/usr/share/nginx/html/env-config.json'
```

4. Run docker-compose

```bash
docker-compose up -d
```

1. Enter localhost:3000 in your browser and log in with your xPriv

---

## What it offers

1. Admin Dashboard
    * You can quickly jump to useful links from here (like xpubs, transactions, destinations, paymails)
    * Viewing transactions and UTXOS (not implemented yet)
2. Registering an xPub
    * From xPriv
    * Or just by pasting an xPub key
    * Added xPubs are shown in XPubs list
3. Access Keys
    * View access key data
    * Revoke access key (not working - probably a frontend problem)
4. Destinations
    * Viewing addresses and locking scripts of destinations
    * Seems to be creating a new destination every minute
5. Paymails
    * Allows for viewing paymails
    * Revoking paymails (not working on local env because of CORS and some other errors)
6. Transactions
    * Viewing transaction data such as timestamp, sender, receiver, hash, etc.
7. +Transactions
    * Recording a transaction by passing Transaction ID or Hex string
    * Generic error messages, but looks like it's working fine
8. UTXOS
    * Showing spent and unspent UTXOS data
9. XPubs
    * Viewing xpubs

---

## Project structure

* App.js -  entry point with all Providers
* route.js - routes to pages
* .env - env for specifing some titles and SPV Wallet URL
* src
  * components - js components like dashboard, listing, etc
  * hooks - some useful hooks
  * icons - icons used in the dashboard
  * pages - explained [here](#what-it-offers)
  * theme - MUI Themes
  * utils - simple js functions
