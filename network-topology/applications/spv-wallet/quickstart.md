---
description: >-
  This guide will show you how to run the spv-wallet toolkit with the start.sh
  script.
---

# ⚡ Quickstart

{% hint style="info" %}
Using the start script is not recommended for production environments. It is designed for development and testing purposes only.
{% endhint %}

## Description

`spv-wallet` provides a `start.sh` script which significantly speeds up the startup of the entire environment. This bash script is designed to facilitate the setup and configuration of an environment for running an SPV Wallet application and its associated components. It is structured to handle various scenarios such as selecting database and cache storage options, running specific components like the SPV wallet, block headers service, wallet frontend and backend, configuring PayMail domains, exposing services, and managing background execution.

Application which can be selected are run by `docker compose` command and its configuration file `docker-compose.yml` should not be edited. It is adapted specifically to the `start.sh` script.

## Prerequisites

* [Docker Compose](https://docs.docker.com/compose/install/) - minimum version 2.24.0 ⚠️

## Start

### Clone the repository

First you need to clone spv-wallet repository.

```bash
git clone https://github.com/bitcoin-sv/spv-wallet.git
cd spv-wallet
```

### Start the script

Then you can use the `start.sh` script to run the spv-wallet toolkit. Using this script is very simple. Just run the script and follow the instructions.

```bash
./start.sh
```

After running this command, user will be asked several questions about how to run the environment. Questions like:

* Which database and cache storage should be used?
* Which applications should be started?
* Which domain should be used for Paymail?

If you want to expose the services on the public domains please read the section [Exposing on public domains](quickstart.md#exposing-on-public-domains).

After answering all the questions, the script will start the environment and the selected applications. Example of the script output:

```bash
Welcome in SPV Wallet!
Select your database:
1. postgresql
2. sqlite
> # Here you can choose database for spv-wallet -> we recommend to use PostgreSQL (pick the number)
```

```bash
Select your cache storage:
1. freecache
2. redis
> # The second question is about cache storage for spv-wallet -> using Redis will launch Redis server in Docker container. (pick the number)
```

```bash
Do you want to run spv-wallet? [Y/n]
> # Choose if you want to start SPV Wallet in docker container. (Defaults to yes, so just press Enter)
```

```bash
Do you want to run spv-wallet-admin? [Y/n]
> # Choose if you want to start SPV Wallet Admin. (Defaults to yes, so just press Enter)
```

> Note: You can read more about SPV Wallet Admin [here](../spv-wallet-admin.md)

```bash
Do you want to run block-headers-service? [Y/n]
> # Choose if you want to start Block Headers Service. It is required to run allow SPV and work with BEEF transactions. 
# (Defaults to yes, so just press Enter)
```

> Note: If you want to read about Block Headers Service role in SPV -> [go here](../block-headers-service.md)

```bash
# The following two questions are about running referential custodial web wallet (its frontend and backend) 
# if you want to check how such thing could be created and used then choose yes (which is default)
Do you want to run spv-wallet-web-frontend? [Y/n]
>
Do you want to run spv-wallet-web-backend? [Y/n]
> 
```

```bash
Define admin xPub (Leave empty to use the default one)
> # Here you can define your admin xPub. If you leave it empty, the default one will be used.
```

```bash
Define admin xPriv (Leave empty to use the default one)
> # If you choose to run web wallet and defined your admin xPub, you also need to define your admin xPriv here. It must match the xPub. If it won't match, you won't be able to authenticate in SPV Wallet Web Backend.
```

```bash
What PayMail domain should be configured in applications?
> # Choose the PayMail domain which should be handled by the SPV Wallet. 
# It will be used to receive transactions. And it needs to be owned by you and pointing to the server where the spv-wallet is running.
```

```bash
Do you want to expose the services on and its subdomains? [y/N]
> # If you want to expose services on your domains, you can use this option.
# Locally it's better to set "N" and work with services on localhost.
```

```bash
Do you want to run everything in the background? [y/N]
> # choose y if you want to run everything in the background and n if you want to see logs in the current terminal and stop the server when closing terminal.
```

It's worth to mention that after first go through those questions, the script can be started next time with the saved configuration. To do this, simply run the script with option `--load` or `-l`:

```bash
./start.sh -l
```

### Utilized Ports

Each of the running components uses a different port which is exposed so that they can be externally connected to or only certain components can be run in a Docker environment while the rest locally.

List of Used Ports:

| Service               | Port(s) |
| --------------------- | ------- |
| spv-wallet-admin      | 3000    |
| spv-wallet-frontend   | 3002    |
| spv-wallet            | 3003    |
| Redis                 | 6379    |
| PostgreSQL            | 5432    |
| block-headers-service | 8080    |
| spv-wallet-backend    | 8180    |
| Traefik               | 80, 443 |

### Exposing on public domains

There is an important topic that should be mentioned in this place. If you want to expose the services on the public domains (for example to receive transactions), you must pay attention to the two options (questions in the script).

* You must enter your chosen domain on which the spv-wallet should be available as the Paymail domain.
* You need to choose the option to expose the services on the paymail domain and its subdomains.

When you choose the options above the following subdomains could be used (need to be also registered by you):

* _your.domain.tld_ - for the spv-wallet application
* _wallet_._your.domain.tld_ - for the web wallet frontend
* _api_._your.domain.tld_ - for the web wallet backend
* _admin_._your.domain.tld_ - for the admin panel
* _headers_._your.domain.tld_ - for the block headers service

All of those domains/subdomains should have a DNS record pointing to the server where the spv-wallet is running.

### Configuration

When using this script, configuration file `.env.config` is created. It contains all the settings that were selected when the script was last run. There is an option to run the script with defined settings without having to go through the entire configuration process, just add `-l/—load` flag.

`-h/—help` flag will show all available script configuration arguments before running it. This is another option to run the application with previously defined settings.

You can use the arguments to override previously chosen options. For example, if you want to change the database type from `sqlite` to `postgres`, you can run the script with the following command:

```bash
./start.sh -l -db postgres
```

Two things are important to notice here:

* The `-l` flag is used to load the previous configuration.
* Any argument passed to the script will override the previous configuration also in the `.env.config` file.

## Launch Verification

SPV Wallet by default is running on port `3003` and you can access it by `http://localhost:3003` (if you run it locally). After calling this address you should see this:

```json
{"message":"Welcome to the SPV Wallet ✌(◕‿-)✌"}
```

## FAQ

### How to stop the environment?

If you run the environment in non-background mode, you can stop it by pressing `Ctrl+C` in the terminal.

If you run the environment in background mode, you can stop it by running the following command:

```bash
docker compose down
```

Sometimes it is necessary to clean up the environment to apply some changes, this especially can be required when you choose to change between exposed and not exposed services. In this case, you should run the following command:

```bash
docker compose down
```

### How to configure domains for my server?

The simplest way to do that is to configure 2 records type A on your domain provider. One for the main domain and one for the wildcard subdomain.\
For example, if you want to use `example.com` as your main domain, you should add DNS records A:

1. `example.com` -> pointing to your server IP
2. `*.example.com` -> pointing to your server IP

### How to configure Paymail on different domain then spv-wallet?

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

### How can I log in to the admin panel?

If you chose to use a default admin xPub during configuration phase, then the default admin xPriv will be displayed to you in the terminal.

In case if you can't saw it because of long log output from working services, you can also find it in a comment near the `RUN_ADMIN_PANEL` variable in the `.env.config` file.

### How can I make a transaction to the wallet?

First ensure that you follow instructions from the section [Exposing on public domains](quickstart.md#exposing-on-public-domains).

Then access web wallet at https://wallet.your.domain.tld and register a new account. After that, you can log in and see your paymail address. Then you can access any public wallet which supports paymail and send a transaction to your paymail address.
