# SPV Wallet Admin

## Table of Contents

  - [Overview](#overview)
  - [Run](#running-spv-wallet-admin)
    - [Locally](#locally)
    - [Docker-compose](#docker-compose)
  - [What it offers](#what-it-offers)

🔗 [GitHub URL](https://github.com/bitcoin-sv/spv-wallet-admin)

## Overview

SPV Wallet Admin console is an admin panel that allows for viewing (and in some parts integrating with) SPV Wallet data.



## Running SPV Wallet Admin

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

1. xPubs
    * Register xPubs (create user)
      * From xPriv
      * Or just by paste an xPub key
      * Added xPubs are shown in XPubs list
    * View registered xPubs
2. Access Keys
    * View access key data
3. Paymails
    * View paymails
    * Add and remove paymails from users
4. Transactions
    * View transaction data such as timestamp, sender, receiver, hash, etc.
5. Contacts
    * View users contacts
    * Remove contacts
    * Accept/reject contacts invitations
6. Webhooks
   * View registered webhooks
   * Remove registered webhooks
---


