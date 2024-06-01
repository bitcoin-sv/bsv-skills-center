# System Requirements

Below are the recommended system requirements based on our internal testing and scaling progress, made with bitcoind node software. Bitcoin SV will continue to scale on the road to, and beyond genesis. This will also mean these requirements should be expected to change as time goes on.

<table data-header-hidden><thead><tr><th width="124"></th><th width="196"></th><th></th><th></th></tr></thead><tbody><tr><td> </td><td><strong>Development</strong><br>(regtest &#x26; testnet only)</td><td><strong>Production</strong><br><strong>MINIMUM</strong></td><td><strong>Production RECOMMENDED</strong><br>(STN Minimum)</td></tr><tr><td><strong>Summary</strong></td><td>To only follow the most PoW chain and handle small volumes of other tasks (RPC requests as an example)</td><td>To handle a medium volume of workload while maintaining real-time sync with the current chain tip</td><td>To handle high volume of work or has txindex enabled, or a mining operation.</td></tr><tr><td><strong>Processor</strong></td><td>4 Core, 8 thread CPU</td><td>8 Core, 16 thread CPU</td><td>>= 10 core 20 thread</td></tr><tr><td><strong>Ram</strong></td><td>16GB of Ram + 10GB Swap</td><td>64GB Ram + 64GB Swap<br>Ideally, increase ram and reduce swap, while maintaining 128GB total memory available.</td><td>64GB Ram + 64GB Swap<br>Ideally, increase ram and reduce swap, while maintaining 128GB total memory available.</td></tr><tr><td><strong>Internet</strong></td><td>10+ Mbit (up and down)</td><td>100Mbit+ (up and down)</td><td>1Gbit+ (up and down)</td></tr><tr><td><strong>Disk Space (Pruned)</strong></td><td>10GB Magnetic Disk</td><td>500GB Solid State (SSD)</td><td>1TB Solid State (SSD) when pruned *</td></tr><tr><td><strong>Disk Space (Unpruned)</strong></td><td>20GB Magnetic Disk</td><td>16TB Solid State (SSD)</td><td>32TB Solid State (SSD)</td></tr></tbody></table>

\* In release 1.0.14+, the _prune_ config settings can be used to fine tune.

We have seen the above configuration in both mining and listener environments handle sequential 2GB block sizes and blocks with transaction counts exceeding 1 million transactions on the ​[STN](https://web.archive.org/web/20211022220238/https://bitcoinscaling.io/)​ (using the additional recommendations below). This may vary as your individual demand scales up with your specific environment, application or use case.

For Production (MainNet), the estimated growth of the network in the next 12 months is 6TB (\~500GB per month). This is based on the 2022 average block size.

For The Scalability Test Network (STN), the STN size was \~4.5TB, as of February 2023. The network growths by 1.1TB every month. The aim is not to reset the STN network frequently.

**If you are a Miner, it is also advisable you spend time ensuring your nodes have the highest possible connectivity with other miners.**

### **Additional Recommendations**

With the increasing adoption of Bitcoin SV the transaction volume continues to rise. With the explosive use of data transactions (op\_returns), it is possible your Bitcoin SV node will not be able to handle the volume of traffic reaching your mempool or be inundated with computationally heavy requests. As a result, the node will drop transactions to allow higher fee-paying ones in, increasing computation at a later point, or worse, cease to function.

Whilst this is not how Bitcoin SV is intended to work, it is what we have to deal with for the short term while the SV Node teams focus on higher priority tasks which have a greater impact on scaling.

A solution is, to increase these following values from their defaults is to allow the node to remain efficient under high load situations. These situations include reorgs, which require the node to go back and reconsider transactions or blocks it has most probably already seen. A reorg can be the reason your node spikes from 1-2GB ram use to 3GB or more, if this is too much, your operating system may choose to end the process (stop bitcoind), or your node will crash with an “Out of Memory” error code.

Since reorgs and orphans are a part of the Bitcoin SV ecosystem and should be expected and not feared it would be wise to best prepare your environment for such situations. The default impaired settings and concepts inherited in bitcoind are too small for the volumes we see during operations on the ​[STN​](https://bitcoinscaling.io/) or during a stress test on mainnet.

With this in mind, we suggest increasing a few default settings on your bitcoind node.

First of all, your mempool size allowance should be set to 10GB (25GB STN) **or more**. This tells the node how much memory it should assign to storing unconfirmed transactions. This is done by adding the following to your bitcoin.conf file.

```
maxmempool=10000
```

This restrictive memory limitation (300MB by default pre-genesis) is a consequence of the fee priority processing, inherited from BTC in order to maintain functioning tiny block sizes. In Bitcoin SV we don’t need this to be so little. The current overhead for storing transactions is in the realm of 5 times the real transaction size, for small transactions. This decreases dramatically for larger transactions. The SV Node team are actively working to remove all fee prioritisation code and hasten mempool processing to bring much-needed improvements to transaction propagation, acceptance and memory allocation. The net result will be a much faster and less memory extensive mempool.

In addition to increasing the mempool allowance, we also suggest increasing the signature and script cache. This tells the node how many accepted transactions in megabytes we can keep in our cache (RAM) improving performance by reducing expensive calls to recalculate signatures and scripts on the fly. We suggest setting these to 250MB or more to improve performance. This is done by adding the following to your bitcoin.conf file.

```
maxsigcachesize=250
```

```
maxscriptcachesize=250
```

Please be aware that setting all three of the mentioned settings will add an additional memory requirement of 10.5GB on your node just for this aspect of bitcoind’s operation.

Lastly, we suggest adding maxorphantx to your bitcoin.conf as well. This value specifies how many orphan transactions can be kept in memory. This helps if your node is receiving a child transaction whose parent has not been confirmed in the blockchain. This means that the node will remember the child until it sees the parent or it exceeds its expiration time of 20 minutes. This is done by adding the following to your bitcoin.conf file.

```
maxorphantx=10000
```

The result of this, assuming 400byte average transaction sizes, is only a 4MB memory increase. If you have the ram/swap available, you can increase this number considerably (remembering transactions post genesis could be very large) avoiding any dropped orphans which may have parents your node has not seen yet.
