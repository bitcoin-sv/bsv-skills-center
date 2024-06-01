# Blocks

## Block Downloads Fail

Generally issues that effect block downloads (e.g. _getblock_) are the same as those effecting IBD (Initial Block Download). See [initial-block-download.md](initial-block-download.md "mention") for more details.

## Block Hex Dump fails

The RPC-function _`getblock`_ does not work for some big blocks. In some cases, `getblock` returns an incorrect content and hex-dump size.

The workaround is to use the REST interface. See [github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/REST-interface.md](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/REST-interface.md).

Enable the REST interface by adding `rest=1` in the config file, or `-rest` on the command line.

## Pruning Overview

The first time a node is run, it downloads all the blocks in the BSV blockchain (which starts with the original BTC Genesis block). The Initial Block Download (IBD) can be time consuming and take a number of days, however the process cannot be cut short. Downloading and validating the blocks (which includes validating the transactions in the blocks) is the proof that the blockchain on disk was built up from the Genesis block using PoW, and is an unadulterated copy of the BSV blockchain.

The node disk storage requirements can be reduced by enabling pruning via the `-prune` configuration option. The node then attempts to keep storage below the specified value (in MB) by only keeping the newest blocks on disk. If manual pruning is enabled, the _pruneblockchain_ RPC function can also be called to delete specific blocks.

The following points need to be considered:

* The node will keep at least 6 blocks no matter what the pruning settings is.
* Pruning is incompatible with configuration `-`_`txindex`_`=1` and `-`_`rescan`_.
* Reverting `-`_`txindex`_`=1` or `-`_`rescan`_ will only take effect after restarting the node which in this case will repeat the whole IBD process from scratch.
* Pruning is disabled by default.
* There is no recommended value for _`prune`_. Node operator should assume that blocks may exceed 4GB in size when choosing a value for _`prune.`_ The possible settings for pruning are:&#x20;

<pre><code><strong>-prune=&#x3C;n>
</strong><strong>    0 = disable pruning blocks,
</strong>    1 = allow manual pruning via RPC
    n = automatically prune block files to stay under the specified target size in MB
</code></pre>

* If pruning is enabled, _`getdata`_ and _`getblock`_ RPC may fail as they may attempt to access a block that is no longer available.  In that case, the error message looks like:

```
**'ERROR: GetDiskBlockStreamReader(CDiskBlockPos&): OpenBlockFile failed for
CBlockDiskPos(nFile=-1, nPos=0)'
**This error message is generated when an RPC is attempting to retrieve a pruned block
(i.e. not available to the node).
```

## Arrival of New Blocks can make Node Unresponsive

The validation of a new arrived block is a high priority task since miners need to know if the new block is valid and whether they should continue to attempt to build on the current blockchain head or switch their resources to building on the new block. If the node mempools are in sync, then the node has already seen and validated the transactions in the new block and block validation can be very quick. If the node mempools are not in sync, which can happen if there is heavy traffic, the node will need to validate all the transactions it was not seen before. That can take some time (up to a minute). During that time the main SV node lock (cs\_main) is held by block validation; without access to cs\_main much of the other node functionality including the RPC interface is unavailable.&#x20;

## BCH and BTC Blocks

If a node connects to a non-BSV node, it may receive non-BSV blocks. That is not desirable but does not cause any fatal issues as the non-BSV blocks will not be successfully processed.

### Diagnosis

Processing non-BSV blocks leaves characteristic messages in the log files. The following 'error' messages were the result of processing a BCH block on a BSV node.

<pre><code><strong>Block 0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c at
</strong>height 556767 violates TTOR order. InvalidChainFound: invalid
block=0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c
height=556767 log2_work=87.722566 date=2018-11-15 18:02:16
</code></pre>

and

```
2021-10-22 11:03:54 [msghand] ERROR: AcceptBlockHeader: block
0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c is marked
invalid,
2021-10-22 11:03:54 [msghand] ERROR: invalid header received,
```

To get information about connected nodes, type the following at the command line:

```
bitcoin-cli getpeerinfo
```

The node can be banned using the following command:

```
bitcoin-cli setban <node-IP-address:port> 315360000
```

### Prevention

SV nodes will refuse connections to non-BSV nodes based on the user agent in the version network message.

The `banclieanua` config option can be used to further filter node connections based on the user agent . For example:

```editorconfig
banclientua=bitcoin-cash-seeder
banclientua=bcash
banclientua=Bitcoin ABC
banclientua=Bitcoin Cash Node
banclientua=bch-bu-seeder
banclientua=cashnodes.io
```
