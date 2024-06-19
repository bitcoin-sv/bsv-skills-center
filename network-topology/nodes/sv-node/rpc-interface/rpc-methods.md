---
description: >-
  This page provides a comprehensive list of all JSON-RPC methods available in
  the BSV SV Node.
---

# RPC Methods

### Blockchain

* **checkjournal**: Checks the journal for inconsistencies.
* **getbestblockhash**: Returns the hash of the best (tip) block in the longest blockchain.
* **getblock "blockhash" ( verbosity )**: Retrieves a block with the given block hash.
* **getblockbyheight height ( verbosity )**: Retrieves a block at the given height.
* **getblockchaininfo**: Provides information about the current state of the blockchain.
* **getblockcount**: Returns the number of blocks in the longest blockchain.
* **getblockhash height**: Returns the hash of the block at a specified height.
* **getblockheader "hash" ( verbosity )**: Retrieves the block header with the given hash.
* **getblockstats blockhash ( stats )**: Provides statistical information about a block.
* **getblockstatsbyheight height ( stats )**: Provides statistical information about a block at a given height.
* **getchaintips**: Returns information about all known blockchain tips.
* **getchaintxstats ( nblocks blockhash )**: Provides statistics about the total number of transactions in the chain.
* **getdifficulty**: Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
* **getmempoolancestors txid (verbose)**: Lists ancestor transactions in the mempool.
* **getmempooldescendants txid (verbose)**: Lists descendant transactions in the mempool.
* **getmempoolentry txid**: Retrieves a specific transaction from the mempool.
* **getmempoolinfo**: Returns information about the memory pool.
* **getmerkleproof "txid" ( blockhash )**: Provides a Merkle proof for a transaction.
* **getmerkleproof2 "blockhash" "txid" ( includeFullTx targetType format )**: Provides an extended Merkle proof for a transaction.
* **getrawmempool ( verbose )**: Returns all transaction ids in the mempool.
* **getrawnonfinalmempool**: Returns all non-final transaction ids in the mempool.
* **gettxout "txid" n ( include\_mempool )**: Retrieves information about an unspent transaction output.
* **gettxoutproof \["txid",...] ( blockhash )**: Provides a proof that a transaction is included in a block.
* **gettxouts txidVoutList returnFields ( include\_mempool )**: Retrieves information about multiple unspent transaction outputs.
* **gettxoutsetinfo**: Returns statistics about the unspent transaction output set.
* **preciousblock "blockhash"**: Treats a block as if it were received before others with the same work.
* **pruneblockchain**: Deletes blockchain data from disk.
* **rebuildjournal**: Rebuilds the transaction journal.
* **verifychain ( checklevel nblocks )**: Verifies the blockchain database.
* **verifymerkleproof "proof"**: Verifies a Merkle proof.
* **verifytxoutproof "proof"**: Verifies a transaction proof.

### Control

* **activezmqnotifications**: Lists active ZMQ notifications.
* **dumpparameters**: Dumps internal parameters to the log.
* **getinfo**: Provides basic information about the node.
* **getmemoryinfo**: Returns information about memory usage.
* **getsettings**: Retrieves node settings.
* **help ( "command" )**: Lists all commands or provides help for a specific command.
* **stop**: Shuts down the node.
* **uptime**: Returns the total uptime of the node.

### Frozentxo

* **addToConfiscationTxidWhitelist (txs)**: Adds transactions to the confiscation whitelist.
* **addToConsensusBlacklist (funds)**: Adds funds to the consensus blacklist.
* **addToPolicyBlacklist (funds)**: Adds funds to the policy blacklist.
* **clearBlacklists (removeAllEntries)**: Clears all blacklist entries.
* **clearConfiscationWhitelist**: Clears the confiscation whitelist.
* **queryBlacklist**: Queries the blacklist.
* **queryConfiscationTxidWhitelist (verbose)**: Queries the confiscation whitelist.
* **removeFromPolicyBlacklist (funds)**: Removes funds from the policy blacklist.

### Generating

* **generate nblocks ( maxtries )**: Generates a specified number of blocks immediately.
* **generatetoaddress nblocks address (maxtries)**: Generates blocks to a specified address.

### Minerid

* **createdatareftx "\[scriptPubKey,...]"**: Creates a data reference transaction.
* **createminerinfotx "scriptPubKey"**: Creates a miner information transaction.
* **datarefindexdump**: Dumps the data reference index.
* **datareftxndelete "txid"**: Deletes a data reference transaction.
* **dumpminerids**: Dumps the miner IDs.
* **getdatareftxid**: Retrieves the data reference transaction ID.
* **getmineridinfo "minerId"**: Retrieves information about a miner ID.
* **getminerinfotxfundingaddress**: Retrieves the funding address for miner information transactions.
* **getminerinfotxid**: Retrieves the miner information transaction ID.
* **makeminerinfotxsigningkey**: Creates a signing key for miner information transactions.
* **rebuildminerids ( fullrebuild )**: Rebuilds the miner IDs.
* **replaceminerinfotx "scriptPubKey"**: Replaces a miner information transaction.
* **revokeminerid "input"**: Revokes a miner ID.
* **setminerinfotxfundingoutpoint "txid" "n"**: Sets the funding outpoint for a miner information transaction.

### Mining

* **getblocktemplate ( TemplateRequest )**: Retrieves a block template for mining.
* **getminingcandidate coinbase (optional, default false)**: Retrieves a mining candidate.
* **getmininginfo**: Provides information about the current state of mining.
* **getnetworkhashps ( nblocks height )**: Returns the estimated network hashes per second.
* **prioritisetransaction \<txid> \<priority delta> \<fee delta>**: Prioritizes a transaction.
* **submitblock "hexdata" ( "jsonparametersobject" )**: Submits a block to the network.
* **submitminingsolution "\<json string>"**: Submits a mining solution.
* **verifyblockcandidate "hexdata" ( "jsonparametersobject" )**: Verifies a block candidate.

### Network

* **addnode "node" "add|remove|onetry"**: Adds or removes a node from the list.
* **clearbanned**: Clears all banned nodes.
* **disconnectnode "\[address]" \[nodeid]**: Disconnects from a specified node.
* **getaddednodeinfo ( "node" )**: Returns information about added nodes.
* **getauthconninfo**: Retrieves authorized connection information.
* **getconnectioncount**: Returns the number of connections to other nodes.
* **getexcessiveblock**: Returns the current excessive block size.
* **getnettotals**: Returns network traffic information.
* **getnetworkinfo**: Provides information about the node's network state.
* **getpeerinfo**: Returns information about connected peers.
* **listbanned**: Lists all banned nodes.
* **ping**: Requests that a ping is sent to all connected nodes.
* **setban "subnet" "add|remove" (bantime) (absolute)**: Adds or removes a node/subnet from the banned list.
* **setblockmaxsize blockSize**: Sets the maximum block size.
* **setexcessiveblock blockSize**: Sets the excessive block size.
* **setnetworkactive true|false**: Enables or disables all network activity.
* **settxnpropagationfreq freq**: Sets the transaction propagation frequency.

### Rawtransactions

* **createrawtransaction \[{"txid":"id","vout"},...] {"address","data":"hex",...} ( locktime )**: Creates a raw transaction.
* **decoderawtransaction "hexstring"**: Decodes a raw transaction.
* **decodescript "hexstring"**: Decodes a script.
* **fundrawtransaction "hexstring" ( options )**: Adds inputs to a raw transaction.
* **getrawtransaction "txid" ( verbose )**: Retrieves raw transaction data.
* **sendrawtransaction "hexstring" ( allowhighfees dontcheckfee )**: Sends a raw transaction.
* **sendrawtransactions \[{"hex": "hexstring", "allowhighfees": true|false, "dontcheckfee": true|false, "listunconfirmedancestors": true|false, "config: " \<json string> }, ...]**: Sends multiple raw transactions.
* **signrawtransaction "hexstring" ( \[{"txid":"id","vout","scriptPubKey":"hex","redeemScript":"hex"},...] \["privatekey1",...] sighashtype )**: Signs a raw transaction.

### Safemode

* **getsafemodeinfo**: Retrieves safemode information.
* **ignoresafemodeforblock "blockhash"**: Ignores safemode for a specific block.
* **reconsidersafemodeforblock "blockhash"**: Reconsiders safemode for a specific block.

### Util

* **clearinvalidtransactions**: Clears invalid transactions from the memory pool.
* **createmultisig nrequired \["key",...]**: Creates a multi-signature address.
* **signmessagewithprivkey "privkey" "message"**: Signs a message with a private key.
* **validateaddress "address"**: Validates a Bitcoin address.
* **verifymessage "address" "signature" "message"**: Verifies a signed message.
* **verifyscript \<scripts> \[\<stopOnFirstInvalid> \[\<totalTimeout>]]**: Verifies scripts.
