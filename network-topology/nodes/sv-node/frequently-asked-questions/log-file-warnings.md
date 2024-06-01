# Log File Warnings

Warnings in the log file are provided for informational and diagnostic purposes (e.g. needed to help with debugging). They do not necessarily indicate that corrective action needs to be taken. None of the warnings below require corrective action.

```
Failed to open mempool file from disk.
Continuing with empty mempool and transaction database
```

The mempool could not be synced at startup, typically as a result of improper shutdown (e.g. OOM). In this case the node will start with an empty mempool and request missing transactions.

```
Messages regarding misbehaving peers...
```

Banning misbehaving peers is an important part of normal operation. BCH nodes often appear as misbehaving nodes.

```
Found invalid chain at least ~6 blocks longer than our best chain
```

The 'invalid chain' message above indicates that there is a fork where the competing chains differ in length by at least 6 blocks.

Forks emerge naturally as competing blocks from different miners arrive at different nodes at different times. However the network will eventually agree on the best chain.

Forks can also arise from Withholding attacks which generally generate forks (secretly produced without announcing them at first) that are much longer than those that arising as a result of normal competition amongst miners.

```
The network does not agree...
```

Occasionally different nodes will have different best chaintips and these differing blocks will have the same parent block. The consensus mechanism will take care that the longer best chain will prevail.

```
<n> of last 100 blocks have unexpected version
```

The “standard” version of a block header is 02000000 but most miners use ASICBoost which uses extra bytes in the version field as a nonce.
