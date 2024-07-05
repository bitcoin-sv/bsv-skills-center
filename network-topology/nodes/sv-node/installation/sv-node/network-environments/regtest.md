# Regtest

_regtest_ is a private “regression” test network, meant for local testing.

There are no seed servers for this network and all nodes need to be manually connected. _regtest_ is used by the node’s functional test suite.

By default:

* Uses port 18332 for RPC
* Uses port 18444 for P2P

### Getting Started

This section assumes that you have installed bitcoind, the BSV server software. If not, Instructions can be found here: [..](../ "mention").

The network environment used by a node is configurable. To select _regtest,_

* add "-regtest=1" as a parameter on the command line, or
* add "regtest=1" to the node's configuration file (./bitcoin/bitcoin.conf).

### Funding

The difficulty in regtest is near zero so it is relatively easy to mine blocks to obtain funds and many test scripts to that.

Make sure that you are operating in _regtest_. The following command can be used to generate a new address to receive funds.

```
bitcoin-cli getnewaddress
```

The following command will mine _regtest_ for 101 new blocks and send the funds to the generated address.

```
bitcoin-cli generatetoaddress 101 <new_address>
```

You need to mine a further 100 blocks before the funds from mining a block can be spent.
