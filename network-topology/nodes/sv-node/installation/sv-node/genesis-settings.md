# Genesis Settings

The Genesis upgrade removes the default setting for the maximum block size and defines this as a “mandatory consensus parameter”. The upgrade also defines a new setting, the maximum script memory usage mandatory consensus parameter. The values for these parameters must be manually configured in the software by the system administrator. This page provides information on these parameters and recommendations on how to choose the required values.

The recommended method of choosing these parameters is to survey the major Bitcoin SV Miners and choose the same, or larger. It is expected that Miners will begin to publish these settings in their MinerID coinbase documents in the near future. However, in the meantime we will regularly update this page with known settings of various Miners manually.

We urge you to take note of the [minimum recommended system requirements](../../system-requirements.md) for running an instance of Bitcoin SV.

### **Maximum block size**

This mandatory consensus parameter defines the maximum size, in bytes, of a block. The software will not retrieve or validate any blocks larger than the value of this parameter.

This parameter can be configured using the configuration option “excessiveblocksize” with the value denominated in bytes. This option can be specified on the command line or in the configuration file.

This parameter can also be configured while the software is running using the “bitcoin-cli setexcessiveblock” command (this feature was added in version 1.0.0 of the software). It is important to note that the value of this setting is not persisted when it is set using the “bitcoin-cli” command. If the software is restarted the value of the parameter will revert to the value set in the configuration file or defined on the command line.

Please note that excessiveblocksize is the maximum size block a Miner will accept.  The maximum size block a Miner will attempt to produce is governed by a different setting “blockmaxsize” which is usually set to a lower value than excessiveblocksize.

### **Maximum stack memory usage**

This mandatory consensus parameter defines the maximum amount of stack memory that a single script can use during evaluation. If a script attempts to use more than this amount of memory during evaluation, then the evaluation will be terminated, and the script will fail. A script failure will cause a transaction to be deemed invalid and if that transaction is contained in a block, the block will also be deemed invalid.

This parameter can be configured using the configuration option “maxstackmemoryusageconsensus” with the value denominated in bytes. This option can be specified on the command line or in the configuration file.

### **Method to choose mandatory consensus parameter values**

The capacity of the Bitcoin SV network is determined by the Miners that confirm blocks. Miners will analyse the state of the blockchain, the capability of the software, and other factors and determine values for the mandatory consensus parameters. Miners will publish the values that have been chosen.

The recommended method for determining the values of the mandatory consensus parameters is to survey the values that have been published by miners, taking account of the capabilities of the Miner. If you are mining, use similar values.  If you are not mining, use higher values.

Note that Miners may change the values that they use so a regular review of the settings is recommended.

### **Miner nodes Vs Blockchain listeners**

We define a node as an instance of Bitcoin SV that build blocks for the purpose of mining.  A Blockchain listener is an instance of Bitcoin SV that is not involved in the mining process.

For a listener, we recommend choosing settings at least twice as high as that of the miners.  This is in order to give you bandwidth so that when Miners increase their settings in the future, you are unlikely to be forked from the network by having a setting lower than theirs.

### **If the value is set too low**

If your setting is lower than the majority of Miners and a block is mined that exceeds your settings, then your Bitcoin SV instance will reject that block and all future blocks mined on top of it, effectively forking off the network. However, if you are not mining, it is likely that your fork will not be extended, and your instance will simply cease following the longest chain. In this case, the remedy is simply to increase the values of those settings and restart your Bitcoin SV instance.  It will then accept the failed blocks and catch up to the rest of the network.

### **Choosing the ‘unlimited’ option**

It is possible to set either of these parameters to effectively unlimited, by choosing a value of “0”.  If this option is chosen, there is no risk of forking off the network. However, in the event of an extremely large block being mined it is possible your node could run out of memory and crash.  If you have followed best practices and allocated a large swap file and have minimum recommended memory, this is only likely, in an attack scenario. If this happens the remedy is to set your limits similarly to the majority of Miners and restart the node.

### **Mandatory Settings**

Based on the current known Miners settings, the following would be deemed safe:

<table><thead><tr><th width="132.33333333333331">Safe values</th><th>Maximum block size</th><th>Maximum script memory usage</th></tr></thead><tbody><tr><td>Miner</td><td>excessiveblocksize=2000000000</td><td>maxstackmemoryusageconsensus=100000000</td></tr><tr><td>Listener</td><td>excessiveblocksize=10000000000</td><td>maxstackmemoryusageconsensus=200000000</td></tr></tbody></table>

<table><thead><tr><th width="155.33333333333331">Currently known values</th><th>Maximum block size</th><th>Maximum script memory usage</th></tr></thead><tbody><tr><td>TAAL</td><td>excessiveblocksize=1000000000</td><td>maxstackmemoryusageconsensus=100000000</td></tr><tr><td>QDLNK</td><td>excessiveblocksize=1000000000</td><td>maxstackmemoryusageconsensus=100000000</td></tr><tr><td>GorillaPool</td><td>excessiveblocksize=1000000000</td><td>maxstackmemoryusageconsensus=100000000</td></tr></tbody></table>

### Optional settings

With the increasing adoption of Bitcoin SV the transaction volume continues to rise. With the explosive use of data transactions (op\_returns), it is possible your Bitcoin SV node will not be able to handle the volume of traffic reaching your mempool or be inundated with computationally heavy requests.  As a result, the node will drop transactions to allow higher fee-paying ones in, increasing computation at a later point, or worse, cease to function.

A solution is, to increase these following values from their defaults is to allow the node to remain efficient under high load situations.

| Default values | Mempool size allowance | Signature and script cache                 | Maxorphantx     |
| -------------- | ---------------------- | ------------------------------------------ | --------------- |
| PreGenesis     | maxmempool=300         | maxsigcachesize=TBC maxscriptcachesize=TBC | maxorphantx=TBC |
| PostGenesis    | maxmempool=8000        | maxsigcachesize=TBC maxscriptcachesize=TBC | maxorphantx=TBC |
