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

`spv-wallet` provides a `start.sh` script which which significantly speeds up the startup of the entire environment. This bash script is designed to facilitate the setup and configuration of an environment for running an SPV Wallet application and its associated components. It is structured to handle various scenarios such as selecting database and cache storage options, running specific components like the SPV wallet, block headers service, wallet frontend and backend, configuring PayMail domains, exposing services, and managing background execution.

Application which can be selected are run by `docker compose` command and it configuration file `docker-compose.yml` should not be edited. It is adapted specifically to the `start.sh` script.

## Prerequisites

* [Docker Compose](https://docs.docker.com/compose/install/)

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

<figure><img src="../.gitbook/assets/run_script.png" alt=""><figcaption></figcaption></figure>

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
| MongoDB               | 27017   |
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

### How can I log in to the admin panel?

If you chose to use a default admin xPub during configuration phase, then the default admin xPriv will be displayed to you in the terminal.

In case if you can't saw it because of long log output from working services, you can also find it in a comment near the `RUN_ADMIN_PANEL` variable in the `.env.config` file.

### How can I make a transaction to the wallet?

First ensure that you follow instructions from the section [Exposing on public domains](quickstart.md#exposing-on-public-domains).

Then access web wallet at https://wallet.your.domain.tld and register a new account. After that, you can log in and see your paymail address. Then you can access any public wallet which supports paymail and send a transaction to your paymail address.
