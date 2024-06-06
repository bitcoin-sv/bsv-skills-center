# How To Run

* [How to run it?](how\_to\_run.md#how-to-run-it)
  * [Running SPV Wallet](how\_to\_run.md#running-spv-wallet)
    * [Required subdomains (if you are exposing the services on subdomains)](how\_to\_run.md#required-subdomains-if-you-are-exposing-the-services-on-subdomains)
    * [Paymail domain](how\_to\_run.md#paymail-domain)
    * [Example of running SPV Wallet](how\_to\_run.md#example-of-running-spv-wallet)
  * [Launch Verification](how\_to\_run.md#launch-verification)
  * [Databases](how\_to\_run.md#databases)
  * [Paymail](how\_to\_run.md#paymail)
  * [Clients](how\_to\_run.md#clients)

## Running SPV Wallet

To run SPV Wallet locally the easiest way is to use provided `start.sh` script.\
This script will start SPV Wallet with default configuration letting you to provide your own xPub and xPriv. When launching it will ask you several questions about services you want to use - so step by step this is how it looks like:

```bash
./start.sh
```

```bash
Welcome in SPV Wallet!
Select your database:
1. postgresql
2. mongodb
3. sqlite
> # Here you can choose your database -> we recommend to use PostgreSQL or SQLite as they are the most stable
```

```bash
Select your cache storage:
1. freecache
2. redis
# The second question is about cache storage -> using Redis will launch Redis server in Docker container.
```

```bash
Do you want to run spv-wallet? [Y/n]
> # First question is about running SPV Wallet, all big letters options are default.
```

```bash
Do you want to run spv-wallet-admin? [Y/n]
> # Second question is about running SPV Wallet Admin.
```

> Note: You can read more about SPV Wallet Admin [here](../spv-wallet-admin.md)

```bash
Do you want to run block-headers-service? [Y/n]
> # Third question is about running Block Headers Service. It is required to run allow SPV and work with BEEF transactions.
```

> Note: If you want to read about Block Headers Service role in SPV -> [go here](../block-headers-service.md)

```bash
Do you want to run spv-wallet-web-frontend? [Y/n]
>
Do you want to run spv-wallet-web-backend? [Y/n]
> # The last two questions are about running SPV Wallet Web Frontend and Backend. It will run refferential web custodial wallet.
```

```bash
Define admin xPub (Leave empty to use the default one)
> # Here you can define your admin xPub. If you leave it empty, the default one will be used.
```

```bash
Define admin xPriv (Leave empty to use the default one)
> # If you choose to define your admin xPub, you also need to define your admin xPriv here. It must match the xPub. If it won't match, you won't be able to authenticate in SPV Wallet Web Backend.
```

```bash
Do you want to expose the services on and its subdomains? [y/N]
> # If you want to expose services on your domains, you can use this option.
# Locally it's better to set "N" and work with services on localhost.
```

### Required subdomains (if you are exposing the services on subdomains)

1. SPV Wallet -> wallet.$paymail\_domain
2. SPV Wallet Web Backend -> api.$paymail\_domain
3. Block Headers Service -> headers.$paymail\_domain
4. SPV Wallet Admin -> admin.$paymail\_domain

Few notes to highlight:\
**$paymail\_domain** is a domain you registered for paymails.

It is taken from the script.sh ->

```bash
What PayMail domain should be configured in applications?
> # Here you can define your paymail domain.
```

After you finish your configuration, you can access your SPV Wallet by calling:\
`wallet.example.com`

when example.com is your paymail domain.

### Paymail domain

Paymail domain mentioned in the script is a domain you registered for paymails.\
When you transfer your funds the transaction begins with checking paymail capabilities for provided domain.

> To work with paymail locally, you can use services like [ngrok](https://ngrok.com/) or [localtunnel](https://localtunnel.github.io/www/).

Paymail itself is described in [this document](how\_to\_run.md#paymail).

### Example of running SPV Wallet

![Example](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZXRiOTFubjI0ejhveXV1cWxqZDBwNWQwZ2NvM3BtZjAxY2RpeTlqcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/1gFQRVvyw7HojqQWqf/giphy.gif)

## Launch Verification

SPV Wallet by default is running on port `3003` and you can access it by `http://localhost:3003` (if you run it locally). After calling this address you should see this:

```json
{"message":"Welcome to the SPV Wallet ✌(◕‿-)✌"}
```

## Databases

SPV Wallet needs to have database connection where SPV Wallet engine can store data. Currently, it supports:

1. SQLite,
2. PostgreSQL,
3. MySQL (experimental),
4. MongoDB (experimental).

Database connection, like everything in SPV Wallet, is defined in config [files](configuration.md).

> You can find extended description of SPV Wallet Engine database [here](engine/db.md)

## Paymail

Before starting SPV Wallet you need to have a [paymail](../../../../wallets/spv-wallet/paymail/) domain properly configured.\
At first it is necessary to add SRV record to domain which you want to use as paymail domain. This record will be used for service discovery by Paymail clients - pointing them to your host.

Example of SRV record:

```bash
Service     _bsvalias
Proto       _tcp
Name        <domain>.<tld>
TTL         3600
Class       IN
Priority    10
Weight      10
Port        443
Target      <endpoint-discovery-host>
```

> More information about setting up SRV record [here](https://bsvalias.org/02-01-host-discovery.html)\\

After setting up SRV record you need to activate DNSSEC for your domain. DNSSEC, short for Domain Name System Security Extensions, is a set of security measures designed to add cryptographic integrity to the Domain Name System (DNS). DNSSEC aims to provide authentication and data integrity to DNS responses, protecting against various types of attacks such as DNS spoofing and cache poisoning.

> Note: it is possible to use subdomains as paymail domains e.g. `paymail1.spvwallet.com` `paymail2.spvwallet.com` ...

Paymails follow the same format as email addresses {handle}@{domain.tld} e.g. `example@spvwallet.com`. This is used to address a particular user within a particular domain.

## Clients

To use SPV Wallet you can choose between provided clients.

Three options are available:

1. [spv-wallet-go-client](../spv-wallet-go-client/) - Golang
2. [spv-wallet-js-client](../spv-wallet-js-client.md) - JavaScript
3. [spv-wallet-admin-keygen](../spv-wallet-admin-keygen.md) - SPV Wallet Admin Keygen
