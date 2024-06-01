# Initial Block Download

A full initial Block Download can take a long time depending on your setup. For reference, a full initial block download on an AWS `r7i.8xlarge` instance with 256GB RAM, configured with [installation](../installation/ "mention") docs and the [aws-volumes-setup.md](../installation/sv-node/aws-volumes-setup.md "mention") takes around 6 days as of Feb 2024. After the IBD you can downgrade the instance to `r7i.4xlarge` with 128GB RAM, depending on network load and what the node will be used for.

## Unable to complete Initial Block Download

See [github.com/bitcoin-sv/bitcoin-sv/wiki/Block-download-issues](https://github.com/bitcoin-sv/bitcoin-sv/wiki/Block-download-issues)\
Most issues related to stuck blocks and IBD (Initial Block Downloads) are the result of insufficiently powerful system, i.e. not enough available disk space or memory or configuration issues.

### Configuration

Check the _`excessiveblocksize`_ is up-to-date (current recommendation is 10GB = 10000000000). If a block is in excess of the _`excessiveblocksize`_, the node will regard the block as invalid and it will not be added to the blockchain.

I.e. Blocks arriving over the network larger than the specified size with be rejected and the blockchain will stall. An IBD (Initial Block Download) will not progress passed this block.

The following log message is emitted under this condition:

```
Message: 'Fatal error servicing streams: Bad header format: Oversized header detected, banning peer=...'
```

Note that this is a generic log entry for oversized messages.

### Inadequate Network Performance

The block has a hard-coded timeout for block downloads (10 mins). If a block cannot be downloaded in that time, the download times out and fails.

A 4GB block requires both the source server and the network to sustain at least 56MB per second per connection. On rare occasions a new block may not found for 30 minutes or more. In that case, the size of the block will be roughly 3x the size of a standard block. If 4GB blocks become the norm, the source server and network may need to sustain at least 168MB per second per connection. If your system does not meet that requirement, your node may timeout during IBD.

The parameter _`blockdownloadtimeoutbasepercent`_ can be used to extend the downloading time. The parameter specifies the new timeout as a percentage of 10 minutes.

### Docker Issues

Docker container memory limits have been responsible for slow IBD. If a large block arrives, the limit may be reached and the process killed.

### Insufficient Disk Space

On some systems, during IBD the thread downloading the blocks may race ahead of validation, and as a result the amount of blocks on disk may exceed the prune setting if there is one.

### Insufficient Memory

Under some circumstances the processing of a single incoming block may produce a short-lived memory usage spike (up to 3x the size of the block).

If your node crashes and does not produce a core dump (even though configured to do so), check /var/log/syslog to see if the process ran out of memory and was terminated by the OS.

### Using the loadblock to resolve download issues

If you have access to another working node and your download fails at a specific block height, it may be a good idea to copy the blkXXXXX.dat file for the specific block across to you local block repository and use the _loadblock_ configuration option to get the node to load the version of the block stored locally on disk rather than perform a download over the network. Make sure the originating node is using the same _`preferredblockfilesize`_ value.

Note that you need to ensure that you trust the source of your blkXXXXX.dat files. See `bitcoind` help for more information.
