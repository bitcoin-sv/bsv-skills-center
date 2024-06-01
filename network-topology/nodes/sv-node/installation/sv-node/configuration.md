# Configuration

All configuration options can be passed as argument `-key=value` or defined in the bitcoin.conf. The location of the config file can be defined with -conf=/path/to/bitcoin.conf.

## General Options

```editorconfig
# Run in the background as a daemon and accept commands
daemon=1

# Location of data directory
datadir=<dir>

# Accept command line and JSON-RPC commands
server=1

# Size of block data files on disk (default is 128MB)
preferredblockfilesize=<size>
```

## Chain Selection Options

```editorconfig
# Do not define any of these options to use mainnet

# Use the test chain
testnet=1

# Use the Scaling Test Network
stn=1

# Enter regression test mode, which uses a special chain in which blocks
# can be solved instantly. This is intended for regression testing
# tools and app development.
regtest=1
```

## RPC Server Options

```editorconfig
# Accept public REST requests (default: 0)       
rest=1

# Bind to given address to listen for JSON-RPC connections. Use
# [host]:port notation for IPv6. This option can be specified
# multiple times (default: bind to all interfaces) 
rpcbind=<addr>

# Username for JSON-RPC connections
rpcuser=<user>

# Password for JSON-RPC connections
rpcpassword=<pw>

# Listen for JSON-RPC connections on <port> (default: 8332 or testnet: 18332)
rpcport=<port>

# Allow JSON-RPC connections from specified source. Valid for <ip> are a
# single IP (e.g. 1.2.3.4), a network/netmask (e.g.
# 1.2.3.4/255.255.255.0) or a network/CIDR (e.g. 1.2.3.4/24). This
# option can be specified multiple times
rpcallowip=<ip>

# Set the number of threads to service RPC calls (default: 4)
rpcthreads=<n>

# Set the depth of the work queue to service RPC calls (default: 16)
rpcworkqueue=<n>

# Timeout during HTTP requests (default: 30)
rpcservertimeout=<n>
```

## Connection Options

```editorconfig
# Accept connections from outside
# default: 1 if no -proxy or -connect/-noconnect
listen=1

# Maintain at most <n> outbound connections to peers (default: 125)
maxconnections=20
# Maximum number of inbound connections from a single address.
# Not applicable to whitelisted peers.
# A value of 0 = unrestricted (default: 0)
maxconnectionsfromaddr=5

# Add node(s) to connect to and attempt to keep the connection open
# Can be specified multiple times
addnode=<ip>

# Whitelist peers connecting from the given IP address (e.g. 1.2.3.4) or
# CIDR notated network (e.g. 1.2.3.0/24). Can be specified multiple
# times. Whitelisted peers cannot be DoS banned and their
# transactions are always relayed, even if they are already in the
# mempool, useful e.g. for a gateway
whitelist=<IP address or network>

# Bind to given address and whitelist peers connecting to it. Use
# [host]:port notation for IPv6
whitebind=<addr>

# Connect only to the specified node(s); -noconnect or -connect=0 alone to
# disable automatic connections. Can be specified multiple times
connect=<ip>
```

## Node Relay Options

```editorconfig
# Set the maximum block size in bytes we will accept from any source. This
# is the effective block size hard limit and it is a required
# parameter (0 = unlimited). The value may be given in bytes or
# with unit (B, kB, MB, GB).
excessiveblocksize=10GB

# Set maximum stack memory usage in bytes used for script verification
# we're willing to accept from any source (0 = unlimited) after
# Genesis is activated (consensus level). This is a required
# parameter. The value may be given in bytes or with unit (B, kB,
# MB, GB).
maxstackmemoryusageconsensus=100MB
       
# Set lowest fee rate (in BSV/kB) for transactions to be included in block
# creation. This is a mandatory setting
# 0.00000001 == 1 sat per KB
minminingtxfee=0.00000001
```

## Mining Options

```editorconfig
# Set maximum block size in bytes we will mine. Size of the mined block
# will never exceed the maximum block size we will accept
# (-excessiveblocksize). The value may be given in bytes or with
# unit (B, kB, MB, GB). If not specified, the following defaults
# are used: Mainnet: 32 MB before 2019-07-24 14:00:00 and 128 MB
# after, Testnet: 32 MB before 2019-07-24 14:00:00 and 128 MB
# after.
blockmaxsize=4GB

# Reduce storage requirements by enabling pruning (deleting) of old
# blocks. This allows the pruneblockchain RPC to be called to
# delete specific blocks, and enables automatic pruning of old
# blocks if a target size in MiB is provided. This mode is
# incompatible with -txindex and -rescan. Warning: Reverting this
# setting requires re-downloading the entire blockchain. (default:
# 0 = disable pruning blocks, 1 = allow manual pruning via RPC,
# >550 = automatically prune block files to stay under the
# specified target size in MiB, but still keep the last 288 blocks
# to speed up a potential reorg even if this results in the pruning
# target being exceeded)Note: Currently achievable prune target is
# ~100GB (mainnet). Setting the target size too low will not affect
# pruning function, but will not guarantee block files size staying
# under the threshold at all times.
prune=<n>
```

## ZeroMQ Notification Options

```editorconfig
# Enable publish hash block
zmqpubhashblock=<address>
# Enable publish hash transaction
zmqpubhashtx=<address>
# Enable publish raw block
zmqpubrawblock=<address>
# Enable publish raw transaction
zmqpubrawtx=<address>
# Enable publish invalid transaction invalidtxsink=ZMQ should be specified
zmqpubinvalidtx=<address>
# Enable publish removal of transaction (txid and the reason in json
# format)
zmqpubremovedfrommempool=<address>
# Enable publish removal of transaction (txid and the reason in json
# format)
zmqpubremovedfrommempoolblock=<address>
# Enable publish hash transaction
zmqpubhashtx2=<address>
# Enable publish raw transaction
zmqpubrawtx2=<address>
# Enable publish hash block
zmqpubhashblock2=<address>
# Enable publish raw block
zmqpubrawblock2=<address>
```

Please note that any publications you enable, should be consumed to prevent excessive memory usage. More detailed information on ZMQ available in the repo: [https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/zmq.md](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/zmq.md)

## Debug Options

```editorconfig
# Output debugging information (default: 0, supplying <category> is
# optional). If <category> is not supplied or if <category> = 1,
# output all debugging information.<category> can be: mempool,
# http, bench, zmq, db, rpc, addrman, selectcoins, reindex,
# cmpctblock, rand, prune, proxy, mempoolrej, libevent, coindb,
# leveldb, txnprop, txnsrc, journal, txnval, netconn, netmsg,
# netmsgverb, netmsgall, net, doublespend, minerid.
debug=<category>

# Exclude debugging information for a category. Can be used in conjunction
# with -debug=1 to output debug logs for all categories except one
# or more specified categories.
debugexclude=<category>
```

## Advanced Options

A full list of all options can be retrieved by calling `bitcoind -help` and `bitcoind -help -help-debug`.
