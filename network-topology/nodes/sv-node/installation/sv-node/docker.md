# Docker

Included in this repo are docker images for the Bitcoin SV Node implementation. Thanks to Josh Ellithorpe and his [repository](https://github.com/zquestz/docker-bitcoin), which provided the base for this repo.

This Docker image provides `bitcoind`, `bitcoin-cli` and `bitcoin-tx` which can be used to run and interact with a Bitcoin server.

To see the available versions/tags, please visit the [Docker Hub page](https://hub.docker.com/r/bitcoinsv/bitcoin-sv).

To run the latest version of Bitcoin SV:

```bash
docker run bitcoinsv/bitcoin-sv
```

To run a container in the background, pass the -d option to docker run, and give your container a name for easy reference later:

```bash
docker run -d --rm --name bitcoind bitcoinsv/bitcoin-sv
```

Once you have the bitcoind service running in the background, you can show running containers:

```bash
docker ps
```

Or view the logs of a service:

```bash
docker logs -f bitcoind
```

To stop and restart a running container:

```bash
docker stop bitcoind
docker start bitcoind
```

The best method to configure the server is to pass arguments to the bitcoind command. For example, to run Bitcoin SV on the testnet:

```bash
docker run --name bitcoind-testnet bitcoinsv/bitcoin-sv bitcoind -testnet
```

Alternatively, you can edit the `bitcoin.conf` file which is generated in your data directory (see below).

By default, Docker will create ephemeral containers. That is, the blockchain data will not be persisted, and you will need to sync the blockchain from scratch each time you launch a container.

To keep your blockchain data between container restarts or upgrades, simply add the `-v` option to create a [data volume](https://docs.docker.com/storage/volumes/):

```bash
docker run -d --rm --name bitcoind -v bitcoin-data:/data bitcoinsv/bitcoin-sv
docker ps
docker inspect bitcoin-data
```

Alternatively, you can map the data volume to a location on your host:

```bash
docker run -d --rm --name bitcoind -v "$PWD/data:/data" bitcoinsv/bitcoin-sv
ls -alh ./data
```

By default, Docker runs all containers on a private bridge network. This means that you are unable to access the RPC port (8332) necessary to run `bitcoin-cli` commands.

There are several methods to run `bitcoin-cli` against a running `bitcoind` container. The easiest is to simply let your `bitcoin-cli` container share networking with your `bitcoind` container:

```bash
docker run -d --rm --name bitcoind -v bitcoin-data:/data bitcoinsv/bitcoin-sv
docker run --rm --network container:bitcoind bitcoinsv/bitcoin-sv bitcoin-cli getinfo
```

If you plan on exposing the RPC port to multiple containers (for example, if you are developing an application which communicates with the RPC port directly), you probably want to consider creating a user-defined network. You can then use this network for both your `bitcoind` and `bitclin-cli` containers, passing `-rpcconnect` to specify the hostname of your bitcoind container:

```bash
docker network create bitcoin
docker run -d --rm --name bitcoind -v bitcoin-data:/data --network bitcoin bitcoinsv/bitcoin-sv
docker run --rm --network bitcoin bitcoinsv/bitcoin-sv bitcoin-cli -rpcconnect=bitcoind getinfo
```
