# Alert Messages

The alert message format is standardized for all message types. Depending on the alert type, the `message` can vary in format.&#x20;

<table><thead><tr><th>Field</th><th width="268">Description</th><th width="128">Type</th><th>Size (bytes)</th></tr></thead><tbody><tr><td>Version </td><td>Alert key message version = 1. </td><td>uint32 </td><td>4 </td></tr><tr><td>Sequence Number </td><td>The alert message sequence number. </td><td>uint32 </td><td>4 </td></tr><tr><td>Timestamp </td><td>Alert -key message timestamp in Unix timestamp / Unix epoch format as (seconds since 1970-01-01T00:00 UTC). </td><td>uint32 </td><td>4 </td></tr><tr><td>Alert Type </td><td>Alert key message type. </td><td>uint32 </td><td>4 </td></tr><tr><td>Signatures</td><td>Signature data concatenated</td><td>Signature[N]</td><td>65*N</td></tr><tr><td>Message</td><td>Alert message</td><td>Variable Bytes</td><td>Depends on alert type</td></tr></tbody></table>

Signatures are calculated on `doublesha256(Version || Sequence Number || Time || Alert Type || Message Body)`, where `||` is byte concatenation and will be encoded using just r, and s and the 1 byte header to guarantee a fixed length of 65 bytes.

The alert message format for each type is defined elsewhere. The important detail is that the alert type defines what associated action the Alert System should perform.

Prior to the release of Teranode, the Alert System interfaces with SV Node over the RPC interface. Below is a list of the supported Alert Messages and their associated RPC calls:

<table><thead><tr><th>Alert Type</th><th>Description</th><th width="75">Type</th><th>RPC Call</th><th>RPC Parameters</th></tr></thead><tbody><tr><td>Informational Message</td><td>Informational broadcast to the network</td><td>0x01</td><td>N/A</td><td>N/A</td></tr><tr><td>Freeze UTXO</td><td>Sets a specified UTXO as unspendable until further notice</td><td>0x02</td><td>addToConsensusBlacklist</td><td><ul><li>UTXO ID</li><li>vout</li><li>Enforce at height start</li><li>Enforce at height end</li></ul></td></tr><tr><td>Unfreeze UTXO</td><td>Sets a specified UTXO as spendable</td><td>0x03</td><td>addToConsensusBlacklist</td><td><ul><li>UTXO ID</li><li>vout</li><li>Enforce at height start</li><li>Enforce at height end</li></ul></td></tr><tr><td>Reassign UTXO</td><td>Reassigns a frozen UTXO to a new locking script.</td><td>0x04</td><td>addTxIdToConfiscationWhitelist</td><td><ul><li>Enforce at height</li><li>Transaction Hex</li></ul></td></tr><tr><td>Ban Peer</td><td>Adds a peer to the node’s ban list.</td><td>0x05</td><td>setBan</td><td><ul><li>Peer Address</li></ul></td></tr><tr><td>Unban Peer</td><td>Removes a peer from the node’s ban list.</td><td>0x06</td><td>setBan</td><td><ul><li>Peer Address</li></ul></td></tr><tr><td>Invalidate Block</td><td>Invalidates a specified block hash, and nodes reject any chains built on top of it.</td><td>0x07</td><td>invalidateBlock</td><td><ul><li>Block Hash</li></ul></td></tr><tr><td>Set Keys</td><td>Sets the public keys associated with the current Alert Key Holders</td><td>0x08</td><td>N/A</td><td>N/A</td></tr></tbody></table>

Alert Messages are valid when they are signed by 3 of 5 current Alert Key Holders. Alert Messages increment by sequence number, and the initial message referenced by sequence number 0 contains the following Set Keys Alert Message:

```
01000000000000004d181a02070000000800000020d4fca62196f52be20c4e75370ce9af922d6fe8080e0870a66de850928e62aeee5926d1a703bbc5e9671653a4eb88566661b28a5bb53c46914841ef8db2681df420c65c64a800150e36e38be2acc05ccde6522375b40331d5365360c6c4fba3b0864571866668581add73a5d28adb53a3708e6d3608ccf1c8cef1e605cd471e5eba20687ca0813a483f644f7a2c1eab5fd4d1715d428029b6e562682ea9d8c19275cc43ef367507fa26915b498b7c3bd0362d31fcc9fe2495d0c05a17b98764a31bfc
```

This message is the valid genesis message for the mainnet instance of the Alert System. The public keys associated with this message are:

* `02a1589f2c8e1a4e7cbf28d4d6b676aa2f30811277883211027950e82a83eb2768`
* `03aec1d40f02ac7f6df701ef8f629515812f1bcd949b6aa6c7a8dd778b748b2433`
* `03ddb2806f3cc48aa36bd4aea6b9f1c7ed3ffc8b9302b198ca963f15beff123678`
* `036846e3e8f4f944af644b6a6c6243889dd90d7b6c3593abb9ccf2acb8c9e606e2`
* `03e45c9dd2b34829c1d27c8b5d16917dd0dc2c88fa0d7bad7bffb9b542229a9304`
