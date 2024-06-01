# STN

## Getting Started with Bitcoin STN

This guide will help you in setting up a BitcoinSV node which connects to the _Scaling Test Network_.

### What is STN?

The STN is a public test network targeted at testing scaling. Block sizes are typically bigger than those on _mainnet_, but transaction volumes are generally much lower. It is not uncommon for performance/capacity tests to be run in STN, in which case transactions per second can rise dramatically.\
\
New blocks/coins are generated using CPU mining. The STN blockchain may also be “reset” for a new node releases. I.e. the blockchain is wound back to a previous height to minimise start-up times for new nodes. &#x20;

System requirements for running a STN node: [system-requirements.md](../../../system-requirements.md "mention")

More information about STN can be found on [https://bitcoinscaling.io/](https://bitcoinscaling.io/)

### QuickStart Instructions

#### Step 1:

Install SV Node according to the installation guide: [..](../ "mention")

#### Step 2:

Configure bitcoind to connect to the _STN_ and not Mainnet, as well as setting mandatory parameters. Make the following changes to your `bitcoin.conf`

```editorconfig
stn=1
maxstackmemoryusageconsensus=2000000000
excessiveblocksize=10000000000
minminingtxfee=0.00000001 
```

#### Step 3:

&#x20;If you wish to add any other custom configurations to your Bitcoin SV node you can appended them to the bitcoin.conf file with the editor of your choice. If you are running a node for development and not archival purposes it is recommended you operate in prune mode to prevent excessive disk space usage. Make the following change to your `bitcoin.conf`.

```editorconfig
prune=100000 # Keep only last ~100GB of blocks
# Using prune is incompatible with txindex
txindex=0
```

#### Step 4:&#x20;

Start the bitcoind process. If you have been following the installation guide you can use systemd

```bash
sudo systemctl start bitcoind.service
```

If this is the first time you have started the node, it may take several hours or even days as the node downloads blocks and checks that they have not been tampered with. In this case, it may make sense to run the node in foreground to see status messages.

If this is not the first time you have run the node, it should start up quickly and it may make sense to run the node in the background.

#### Step 5:

&#x20;Check the status of the node and the bitcoind process. Type the following at the command line:

```bash
[bitcoin-sv installation directory]/bin/bitcoin-cli getinfo
```

This should generate an output similar to

```json
{
  "version": 101001600,
  "protocolversion": 70016,
  "walletversion": 160300,
  "balance": 0.00000000,
  "initcomplete": true,
  "blocks": 1615,
  "timeoffset": 0,
  "connections": 4,
  "proxy": "",
  "difficulty": 1,
  "testnet": false,
  "stn": true,
  "keypoololdest": 1706782266,
  "keypoolsize": 2000,
  "paytxfee": 0.00000000,
  "relayfee": 0.00000000,
  "errors": "",
  "maxblocksize": 10000000000,
  "maxminedblocksize": 4000000000,
  "maxstackmemoryusagepolicy": 100000000,
  "maxstackmemoryusageconsensus": 100000000
}
```

### Funding

If you wish to perform worthwhile testing in the STN you need to obtain unspent coins. Unspent coins may be obtained from the STN team by contacting [_Bitcoin SV General Support_](https://t.me/bitcoinsvsupport) on Telegram.  Alternatively it is possible to mine coins as the difficulty in STN is low and mining should only take a few minutes using a laptop.

