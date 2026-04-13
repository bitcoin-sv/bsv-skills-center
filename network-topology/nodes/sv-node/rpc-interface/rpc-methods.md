---
description: >-
  Complete reference of all JSON-RPC methods available in the BSV SV Node,
  including sensitivity classifications for operators and proxy builders.
---

# RPC Methods

This page lists every RPC method exposed by the BSV SV Node. Methods are organised by function, with the most commonly used categories first. A [Sensitive Endpoints](#sensitive-endpoints) reference at the end groups all methods that should be restricted or never exposed publicly.

---

## Blockchain

| Method                                                    | Description                                                              |
|-----------------------------------------------------------|--------------------------------------------------------------------------|
| `getblockchaininfo`                                       | Provides information about the current state of the blockchain.          |
| `getbestblockhash`                                        | Returns the hash of the best (tip) block in the longest blockchain.      |
| `getblockcount`                                           | Returns the number of blocks in the longest blockchain.                  |
| `getblock "blockhash" ( verbosity )`                      | Retrieves a block with the given block hash.                             |
| `getblockbyheight height ( verbosity )`                   | Retrieves a block at the given height.                                   |
| `getblockhash height`                                     | Returns the hash of the block at a specified height.                     |
| `getblockheader "hash" ( verbosity )`                     | Retrieves the block header with the given hash.                          |
| `getblockstats blockhash ( stats )`                       | Provides statistical information about a block.                          |
| `getblockstatsbyheight height ( stats )`                  | Provides statistical information about a block at a given height.        |
| `getchaintips`                                            | Returns information about all known blockchain tips.                     |
| `getchaintxstats ( nblocks blockhash )`                   | Provides statistics about the total number of transactions in the chain. |
| `getdifficulty`                                           | Returns the proof-of-work difficulty as a multiple of the minimum.       |
| `gettxout "txid" n ( include_mempool )`                   | Retrieves information about an unspent transaction output.               |
| `gettxouts txidVoutList returnFields ( include_mempool )` | Retrieves information about multiple unspent transaction outputs.        |
| `gettxoutsetinfo`                                         | Returns statistics about the unspent transaction output set.             |
| `getmempoolinfo`                                          | Returns information about the memory pool.                               |
| `getrawmempool ( verbose )`                               | Returns all transaction IDs in the mempool.                              |
| `getrawnonfinalmempool`                                   | Returns all non-final transaction IDs in the mempool.                    |
| `getmempoolancestors txid ( verbose )`                    | Lists ancestor transactions in the mempool.                              |
| `getmempooldescendants txid ( verbose )`                  | Lists descendant transactions in the mempool.                            |
| `getmempoolentry txid`                                    | Retrieves a specific transaction from the mempool.                       |
| `verifychain ( checklevel nblocks )`                      | Verifies the blockchain database.                                        |
| `checkjournal`                                            | Checks the transaction journal for inconsistencies.                      |
| `preciousblock "blockhash"`                               | Treats a block as if it were received before others with the same work.  |
| `pruneblockchain`                                         | Deletes blockchain data from disk. Irreversible.                         |
| `rebuildjournal`                                          | Rebuilds the transaction journal.                                        |

---

## Raw Transactions

| Method                                                                          | Description                                                                        |
|---------------------------------------------------------------------------------|------------------------------------------------------------------------------------|
| `getrawtransaction "txid" ( verbose )`                                          | Retrieves raw transaction data.                                                    |
| `sendrawtransaction "hexstring" ( allowhighfees dontcheckfee )`                 | Broadcasts a signed raw transaction to the network.                                |
| `sendrawtransactions [{...}, ...]`                                              | Broadcasts multiple signed raw transactions.                                       |
| `createrawtransaction [{"txid":"id","vout":n},...] {"address":amount,...} (lk)` | Creates an unsigned raw transaction. Stateless.                                    |
| `decoderawtransaction "hexstring"`                                              | Decodes a raw transaction into JSON. Stateless.                                    |
| `decodescript "hexstring"`                                                      | Decodes a hex-encoded script. Stateless.                                           |
| `signrawtransaction "hexstring" ( [...] [...] sighashtype )`                    | Signs a raw transaction. Can accept private keys as parameters or use wallet keys. |
| `gettxoutproof ["txid",...] ( blockhash )`                                      | Provides a proof that a transaction is included in a block.                        |
| `getmerkleproof "txid" ( blockhash )`                                           | Provides a Merkle proof for a transaction.                                         |
| `getmerkleproof2 "blockhash" "txid" ( includeFullTx targetType format )`        | Provides an extended Merkle proof for a transaction.                               |
| `verifymerkleproof "proof"`                                                     | Verifies a Merkle proof. Stateless.                                                |
| `verifytxoutproof "proof"`                                                      | Verifies a transaction inclusion proof. Stateless.                                 |

---

## Mining

| Method                                                      | Description                                                   |
|-------------------------------------------------------------|---------------------------------------------------------------|
| `getminingcandidate ( coinbase )`                           | Retrieves a mining candidate.                                 |
| `submitminingsolution "<json string>"`                      | Submits a mining solution.                                    |
| `getblocktemplate ( TemplateRequest )`                      | Retrieves a block template for mining.                        |
| `submitblock "hexdata" ( "jsonparametersobject" )`          | Submits a block to the network.                               |
| `verifyblockcandidate "hexdata" ( "jsonparametersobject" )` | Verifies a block candidate without submitting it.             |
| `getmininginfo`                                             | Returns mining configuration and state.                       |
| `getnetworkhashps ( nblocks height )`                       | Returns the estimated network hashes per second.              |
| `prioritisetransaction <txid> <priority delta> <fee delta>` | Alters a transaction's priority in the mempool.               |
| `generate nblocks ( maxtries )`                             | Immediately generates blocks. Regtest only. Requires wallet.  |
| `generatetoaddress nblocks address ( maxtries )`            | Generates blocks with coinbase paying to a specified address. |

---

## Network

| Method                                                   | Description                                                  |
|----------------------------------------------------------|--------------------------------------------------------------|
| `getnetworkinfo`                                         | Returns node version, protocol version, and local addresses. |
| `getconnectioncount`                                     | Returns the number of connections to other nodes.            |
| `getpeerinfo`                                            | Returns detailed information about all connected peers.      |
| `getnettotals`                                           | Returns network traffic statistics.                          |
| `getaddednodeinfo ( "node" )`                            | Returns information about manually added nodes.              |
| `getauthconninfo`                                        | Retrieves authorised connection information.                 |
| `ping`                                                   | Requests that a ping is sent to all connected nodes.         |
| `addnode "node" "add\|remove\|onetry"`                   | Adds or removes a peer.                                      |
| `disconnectnode "[address]" [nodeid]`                    | Disconnects a specific peer.                                 |
| `setban "subnet" "add\|remove" ( bantime ) ( absolute )` | Bans or unbans a peer by IP/subnet.                          |
| `listbanned`                                             | Lists all banned nodes.                                      |
| `clearbanned`                                            | Clears all banned peers.                                     |
| `setnetworkactive true\|false`                           | Enables or disables all network activity.                    |
| `settxnpropagationfreq freq`                             | Sets the transaction propagation frequency.                  |

---

## Block Size

These methods control consensus-critical block size parameters.

| Method                        | Description                                                  |
|-------------------------------|--------------------------------------------------------------|
| `getexcessiveblock`           | Returns the current excessive block size setting.            |
| `setexcessiveblock blockSize` | Changes the excessive block size limit. Consensus-affecting. |
| `setblockmaxsize blockSize`   | Changes the maximum block size the node will generate.       |

---

## Control

| Method                     | Description                                                                                                    |
|----------------------------|----------------------------------------------------------------------------------------------------------------|
| `help ( "command" )`       | Lists all commands or provides help for a specific command.                                                    |
| `uptime`                   | Returns the total uptime of the node in seconds.                                                               |
| `stop`                     | Shuts down the node.                                                                                           |
| `getinfo`                  | Returns basic node state. **Deprecated** — use `getblockchaininfo`, `getnetworkinfo`, `getwalletinfo` instead. |
| `getmemoryinfo`            | Returns memory allocation details.                                                                             |
| `getsettings`              | Returns node configuration settings.                                                                           |
| `dumpparameters`           | Dumps internal parameters.                                                                                     |
| `activezmqnotifications`   | Lists active ZMQ notification endpoints.                                                                       |
| `clearinvalidtransactions` | Clears invalid transactions from tracking.                                                                     |

---

## Utilities

| Method                                                           | Description                                   |
|------------------------------------------------------------------|-----------------------------------------------|
| `validateaddress "address"`                                      | Validates a Bitcoin address. Stateless.       |
| `createmultisig nrequired ["key",...]`                           | Creates a multi-signature address. Stateless. |
| `verifymessage "address" "signature" "message"`                  | Verifies a signed message. Stateless.         |
| `verifyscript <scripts> [<stopOnFirstInvalid> [<totalTimeout>]]` | Verifies scripts.                             |
| `signmessagewithprivkey "privkey" "message"`                     | Signs a message with a provided private key.  |

---

## Miner ID

These methods manage the Miner ID protocol, which allows miners to cryptographically identify themselves in coinbase transactions.

| Method                                     | Description                                                   |
|--------------------------------------------|---------------------------------------------------------------|
| `getmineridinfo "minerId"`                 | Retrieves information about a miner ID.                       |
| `getminerinfotxid`                         | Retrieves the miner information transaction ID.               |
| `getdatareftxid`                           | Retrieves the data reference transaction ID.                  |
| `getminerinfotxfundingaddress`             | Retrieves the funding address for miner info transactions.    |
| `dumpminerids`                             | Dumps all miner ID data.                                      |
| `datarefindexdump`                         | Dumps the data reference index.                               |
| `createminerinfotx "scriptPubKey"`         | Creates a miner information transaction.                      |
| `createdatareftx "[scriptPubKey,...]"`     | Creates a data reference transaction.                         |
| `replaceminerinfotx "scriptPubKey"`        | Replaces a miner information transaction.                     |
| `makeminerinfotxsigningkey`                | Creates a new signing key for miner information transactions. |
| `setminerinfotxfundingoutpoint "txid" "n"` | Sets the funding outpoint for miner information transactions. |
| `datareftxndelete "txid"`                  | Deletes a data reference transaction.                         |
| `rebuildminerids ( fullrebuild )`          | Rebuilds the miner ID database.                               |
| `revokeminerid "input"`                    | Revokes a miner ID. Irreversible.                             |

---

## Frozen TXO

These methods manage the Frozen Transaction Output system, which allows freezing and confiscating UTXOs as part of the BSV legal enforcement framework.

| Method                                       | Description                                                     |
|----------------------------------------------|-----------------------------------------------------------------|
| `queryBlacklist`                             | Queries the current blacklist.                                  |
| `queryConfiscationTxidWhitelist ( verbose )` | Queries the confiscation whitelist.                             |
| `addToConsensusBlacklist ( funds )`          | Freezes UTXOs at the consensus level. Affects block validation. |
| `addToPolicyBlacklist ( funds )`             | Freezes UTXOs at the policy (mempool) level.                    |
| `removeFromPolicyBlacklist ( funds )`        | Removes UTXOs from the policy blacklist.                        |
| `clearBlacklists ( removeAllEntries )`       | Clears all blacklist entries.                                   |
| `addToConfiscationTxidWhitelist ( txs )`     | Adds transaction IDs to the confiscation whitelist.             |
| `clearConfiscationWhitelist`                 | Clears the confiscation whitelist.                              |

---

## Safe Mode

| Method                                   | Description                                              |
|------------------------------------------|----------------------------------------------------------|
| `getsafemodeinfo`                        | Retrieves the current safe mode status.                  |
| `ignoresafemodeforblock "blockhash"`     | Overrides safe mode protection for a specific block.     |
| `reconsidersafemodeforblock "blockhash"` | Re-enables safe mode consideration for a specific block. |

---

## Wallet

<!-- prettier-ignore-start -->
{% hint style="warning" %}
**Wallet functionality in SV Node is intended for testing and basic operational use.** For production environments, wallet management — including key storage, transaction signing, and UTXO management — should be handled by dedicated external wallet software or HSM-backed signing services, not the node's built-in wallet.

The wallet RPC methods are only available when the node is compiled with wallet support and not started with `-disablewallet`. Most mining and enterprise deployments should run with the wallet disabled.
{% endhint %}
<!-- prettier-ignore-end -->

### Sending

| Method                                                                                | Description                                               |
|---------------------------------------------------------------------------------------|-----------------------------------------------------------|
| `sendtoaddress "address" amount ( "comment" "comment_to" subtractfeefromamount )`     | Sends funds to an address. Requires unlocked wallet.      |
| `sendfrom "fromaccount" "toaddress" amount ( minconf "comment" "comment_to" )`        | Sends funds from a specific account.                      |
| `sendmany "fromaccount" {"address":amount,...} ( minconf "comment" ["address",...] )` | Sends to multiple addresses in a single transaction.      |
| `settxfee amount`                                                                     | Sets the transaction fee rate for the wallet.             |
| `fundrawtransaction "hexstring" ( options )`                                          | Adds inputs to a raw transaction from the wallet's UTXOs. |

### Key Management

| Method                                            | Description                                             |
|---------------------------------------------------|---------------------------------------------------------|
| `dumpprivkey "address"`                           | Exports the private key for an address in WIF format.   |
| `dumpwallet "filename"`                           | Exports the entire wallet (all keys) to a file on disk. |
| `importprivkey "privkey" ( "label" rescan )`      | Imports a private key into the wallet.                  |
| `importwallet "filename"`                         | Imports keys from a wallet dump file.                   |
| `importmulti "requests" ( "options" )`            | Bulk import of keys, addresses, and scripts.            |
| `importaddress "address" ( "label" rescan p2sh )` | Imports a watch-only address.                           |
| `importpubkey "pubkey" ( "label" rescan )`        | Imports a public key as watch-only.                     |
| `importprunedfunds`                               | Imports funds with a merkle proof (for pruned wallets). |
| `removeprunedfunds "txid"`                        | Removes imported pruned funds.                          |
| `keypoolrefill ( newsize )`                       | Tops up the key pool with pre-generated keys.           |

### Encryption

| Method                                                   | Description                                                       |
|----------------------------------------------------------|-------------------------------------------------------------------|
| `encryptwallet "passphrase"`                             | Encrypts the wallet with a passphrase. Shuts down the node after. |
| `walletpassphrase "passphrase" timeout`                  | Unlocks the wallet for the specified number of seconds.           |
| `walletpassphrasechange "oldpassphrase" "newpassphrase"` | Changes the wallet encryption passphrase.                         |
| `walletlock`                                             | Immediately re-locks the wallet.                                  |

### Querying

| Method                                                                  | Description                                                      |
|-------------------------------------------------------------------------|------------------------------------------------------------------|
| `getbalance ( "account" minconf include_watchonly )`                    | Returns the wallet balance.                                      |
| `getunconfirmedbalance`                                                 | Returns the total unconfirmed balance.                           |
| `getwalletinfo`                                                         | Returns wallet state: balance, transaction count, key pool size. |
| `gettransaction "txid" ( include_watchonly )`                           | Returns details about a wallet transaction.                      |
| `listtransactions ( "account" count skip include_watchonly )`           | Lists recent wallet transactions.                                |
| `listsinceblock ( "blockhash" target_confirmations include_watchonly )` | Lists transactions since a given block.                          |
| `listunspent ( minconf maxconf ["addresses",...] [include_unsafe] )`    | Returns array of unspent transaction outputs in the wallet.      |
| `listaccounts ( minconf include_watchonly )`                            | Lists accounts and their balances.                               |
| `listreceivedbyaccount ( minconf include_empty include_watchonly )`     | Lists amounts received by account.                               |
| `listreceivedbyaddress ( minconf include_empty include_watchonly )`     | Lists amounts received by address.                               |
| `listaddressgroupings`                                                  | Groups addresses by common ownership.                            |
| `listlockunspent`                                                       | Lists temporarily locked UTXOs.                                  |
| `listwallets`                                                           | Lists loaded wallets.                                            |

### Address Management

| Method                                                   | Description                                               |
|----------------------------------------------------------|-----------------------------------------------------------|
| `getnewaddress ( "account" )`                            | Generates and returns a new address.                      |
| `getrawchangeaddress`                                    | Returns a new address for receiving change.               |
| `getaccountaddress "account"`                            | Returns the current address for an account.               |
| `getaddressesbyaccount "account"`                        | Returns all addresses for an account.                     |
| `getaccount "address"`                                   | Returns the account associated with an address.           |
| `setaccount "address" "account"`                         | Sets the account for an address.                          |
| `getreceivedbyaccount "account" ( minconf )`             | Returns the total amount received by an account.          |
| `getreceivedbyaddress "address" ( minconf )`             | Returns the total amount received by an address.          |
| `addmultisigaddress nrequired ["key",...] ( "account" )` | Adds a multisig address to the wallet.                    |
| `signmessage "address" "message"`                        | Signs a message with the private key of a wallet address. |

### Other

| Method                                                        | Description                                                                 |
|---------------------------------------------------------------|-----------------------------------------------------------------------------|
| `backupwallet "destination"`                                  | Copies the wallet file to a specified path.                                 |
| `lockunspent unlock ([{"txid":"txid","vout":n},...])`         | Locks or unlocks unspent outputs.                                           |
| `move "fromaccount" "toaccount" amount ( minconf "comment" )` | Moves a balance between accounts (internal bookkeeping only).               |
| `abandontransaction "txid"`                                   | Marks a wallet transaction as abandoned, allowing its inputs to be respent. |

---

## Hidden Methods

These methods do not appear in `help` output. They exist for debugging, testing, and advanced operational use. You can still call them directly or view their help with `help <command>`.

### Blockchain

| Method                                            | Description                                                             |
|---------------------------------------------------|-------------------------------------------------------------------------|
| `invalidateblock "blockhash"`                     | Permanently marks a block as invalid, causing a chain reorganisation.   |
| `reconsiderblock "blockhash"`                     | Removes invalidity status from a block, potentially triggering a reorg. |
| `softrejectblock "blockhash"`                     | Soft-rejects a block from peers.                                        |
| `acceptblock "blockhash"`                         | Forces acceptance of a previously soft-rejected block.                  |
| `getsoftrejectedblocks`                           | Returns the list of soft-rejected blocks.                               |
| `waitfornewblock ( timeout )`                     | Blocks until a new block is received or timeout is reached.             |
| `waitforblockheight height ( timeout )`           | Blocks until the chain reaches the specified height or timeout.         |
| `getblockchainactivity`                           | Returns internal block processing activity.                             |
| `getcurrentlyvalidatingblocks`                    | Returns blocks currently being validated.                               |
| `waitaftervalidatingblock "blockhash" ( action )` | Pauses or resumes block validation. Testing and debugging only.         |
| `getwaitingblocks`                                | Returns blocks waiting to be validated.                                 |
| `getorphaninfo`                                   | Returns information about orphan blocks.                                |
| `waitforptvcompletion`                            | Blocks until parallel transaction validation completes.                 |

### Control

| Method                  | Description                                                                                       |
|-------------------------|---------------------------------------------------------------------------------------------------|
| `setmocktime timestamp` | Sets the node's internal clock. Testing only — can break time-locked transactions on non-regtest. |
| `echo`                  | Echoes back input. Testing only.                                                                  |
| `echojson`              | Echoes back input as JSON. Testing only.                                                          |

### Wallet

| Method                     | Description                                        |
|----------------------------|----------------------------------------------------|
| `resendwallettransactions` | Re-broadcasts all unconfirmed wallet transactions. |

---

## Sensitive Endpoints

<!-- prettier-ignore-start -->
{% hint style="danger" %}
The methods listed below should be restricted to trusted operators or never exposed through proxies. See the [Security section](README.md#security) for guidance on building a safe public proxy.
{% endhint %}
<!-- prettier-ignore-end -->

### Critical — Must never be exposed to untrusted parties

These methods can shut down the node, steal or move funds, export private keys, manipulate the chain, or alter consensus rules. Exposing any of these publicly is equivalent to giving full control of the node.

**Node control**

| Method        | Risk                                           |
|---------------|------------------------------------------------|
| `stop`        | Shuts down the node.                           |
| `setmocktime` | Manipulates the node's internal clock. Hidden. |

**Chain manipulation**

| Method              | Risk                                                            |
|---------------------|-----------------------------------------------------------------|
| `invalidateblock`   | Marks a block as invalid — forces chain reorganisation. Hidden. |
| `reconsiderblock`   | Reverses block invalidation — can trigger reorgs. Hidden.       |
| `softrejectblock`   | Rejects blocks from peers. Hidden.                              |
| `acceptblock`       | Forces acceptance of soft-rejected blocks. Hidden.              |
| `preciousblock`     | Forces chain tip preference, influencing reorg behaviour.       |
| `setexcessiveblock` | Changes the excessive block size limit. Consensus-affecting.    |
| `setblockmaxsize`   | Changes the maximum generated block size.                       |

**Network isolation**

| Method             | Risk                                                       |
|--------------------|------------------------------------------------------------|
| `addnode`          | Adds arbitrary peers — eclipse attack vector.              |
| `disconnectnode`   | Disconnects peers — can isolate the node from the network. |
| `setban`           | Bans peers by IP/subnet — network isolation.               |
| `setnetworkactive` | Disables all networking entirely.                          |

**Fund theft and key exposure (wallet)**

| Method                   | Risk                                                     |
|--------------------------|----------------------------------------------------------|
| `dumpprivkey`            | Exports private keys in plaintext WIF format.            |
| `dumpwallet`             | Exports the entire wallet (all keys) to a file.          |
| `walletpassphrase`       | Unlocks the wallet for spending.                         |
| `walletpassphrasechange` | Changes the wallet encryption passphrase.                |
| `encryptwallet`          | Encrypts or re-encrypts the wallet. Shuts down the node. |
| `importprivkey`          | Imports private keys into the wallet.                    |
| `importwallet`           | Imports a wallet dump file.                              |
| `importmulti`            | Bulk import of keys, addresses, and scripts.             |
| `backupwallet`           | Writes the wallet file to an arbitrary disk path.        |
| `sendtoaddress`          | Sends funds.                                             |
| `sendfrom`               | Sends funds from a specific account.                     |
| `sendmany`               | Sends to multiple addresses.                             |

**Frozen TXO manipulation**

| Method                           | Risk                                                             |
|----------------------------------|------------------------------------------------------------------|
| `addToConsensusBlacklist`        | Freezes UTXOs at the consensus level — affects block validation. |
| `addToPolicyBlacklist`           | Freezes UTXOs at the policy level.                               |
| `removeFromPolicyBlacklist`      | Removes UTXOs from the policy blacklist.                         |
| `clearBlacklists`                | Clears all freezing rules.                                       |
| `addToConfiscationTxidWhitelist` | Whitelists confiscation transactions.                            |
| `clearConfiscationWhitelist`     | Clears the confiscation whitelist.                               |

**Miner ID**

| Method          | Risk                              |
|-----------------|-----------------------------------|
| `revokeminerid` | Revokes a miner ID. Irreversible. |

### High — Restrict to operators only

These methods modify node state, create keys, alter fees, or trigger potentially disruptive operations. They should only be accessible to node operators on trusted networks.

| Method                          | Risk                                                             |
|---------------------------------|------------------------------------------------------------------|
| `pruneblockchain`               | Deletes block data from disk. Irreversible.                      |
| `rebuildjournal`                | Forces journal rebuild. Temporary disruption.                    |
| `clearinvalidtransactions`      | Clears invalid transaction tracking.                             |
| `prioritisetransaction`         | Manipulates mempool priority — can bypass fee requirements.      |
| `settxnpropagationfreq`         | Changes transaction propagation timing.                          |
| `clearbanned`                   | Clears all peer bans.                                            |
| `ignoresafemodeforblock`        | Overrides safe mode protections.                                 |
| `reconsidersafemodeforblock`    | Manipulates safe mode state.                                     |
| `submitblock`                   | Submits a block to the network.                                  |
| `submitminingsolution`          | Submits a mining solution.                                       |
| `generate`                      | Generates blocks (regtest).                                      |
| `generatetoaddress`             | Generates blocks to a specific address.                          |
| `signrawtransaction`            | Signs transactions — can accept private keys or use wallet keys. |
| `signmessagewithprivkey`        | Signs a message with a provided private key.                     |
| `signmessage`                   | Signs a message with a wallet private key.                       |
| `fundrawtransaction`            | Creates funded transactions from wallet UTXOs.                   |
| `settxfee`                      | Changes wallet fee rate.                                         |
| `keypoolrefill`                 | Generates new keys in the wallet.                                |
| `lockunspent`                   | Locks or unlocks UTXOs.                                          |
| `move`                          | Moves balances between wallet accounts.                          |
| `abandontransaction`            | Marks a transaction as abandoned.                                |
| `walletlock`                    | Re-locks the wallet.                                             |
| `importaddress`                 | Imports a watch-only address.                                    |
| `importpubkey`                  | Imports a public key as watch-only.                              |
| `importprunedfunds`             | Imports funds with a merkle proof.                               |
| `removeprunedfunds`             | Removes imported pruned funds.                                   |
| `waitaftervalidatingblock`      | Pauses block validation. Hidden.                                 |
| `createminerinfotx`             | Creates a miner information transaction.                         |
| `createdatareftx`               | Creates a data reference transaction.                            |
| `replaceminerinfotx`            | Replaces a miner information transaction.                        |
| `makeminerinfotxsigningkey`     | Creates a miner info signing key.                                |
| `setminerinfotxfundingoutpoint` | Sets the miner info funding outpoint.                            |
| `datareftxndelete`              | Deletes a data reference transaction.                            |
| `rebuildminerids`               | Rebuilds the miner ID database.                                  |

### Moderate — Restrict to trusted clients

These methods reveal operational details about the node, its peers, its configuration, or its wallet state. They are read-only but leak information useful for fingerprinting, deanonymisation, or attack planning.

| Method                           | What it reveals                                          |
|----------------------------------|----------------------------------------------------------|
| `getpeerinfo`                    | All peer IPs, versions, connection details.              |
| `getaddednodeinfo`               | Manually added peer IPs.                                 |
| `getnettotals`                   | Network bandwidth — operational fingerprinting.          |
| `getnetworkinfo`                 | Node version, protocol, local addresses.                 |
| `getauthconninfo`                | Authentication connection details.                       |
| `listbanned`                     | Banned peer list.                                        |
| `getinfo`                        | Version, balance, wallet state. Deprecated.              |
| `getmemoryinfo`                  | Memory allocation details.                               |
| `dumpparameters`                 | All node configuration parameters.                       |
| `getsettings`                    | Node settings.                                           |
| `activezmqnotifications`         | ZMQ endpoint configuration.                              |
| `getmininginfo`                  | Mining configuration.                                    |
| `queryBlacklist`                 | Frozen UTXO enforcement rules.                           |
| `queryConfiscationTxidWhitelist` | Confiscation whitelist entries.                          |
| `getminerinfotxid`               | Miner info transaction ID.                               |
| `getdatareftxid`                 | Data reference transaction ID.                           |
| `getminerinfotxfundingaddress`   | Miner info funding address.                              |
| `getmineridinfo`                 | Miner ID details.                                        |
| `dumpminerids`                   | All miner ID data.                                       |
| `datarefindexdump`               | Data reference index.                                    |
| `getsoftrejectedblocks`          | Soft-rejected block list. Hidden.                        |
| `getblockchainactivity`          | Internal processing state. Hidden.                       |
| `getcurrentlyvalidatingblocks`   | Validation state. Hidden.                                |
| `getwaitingblocks`               | Block processing queue. Hidden.                          |
| `getorphaninfo`                  | Orphan block tracking. Hidden.                           |
| `waitfornewblock`                | Blocks until new block — connection tie-up risk. Hidden. |
| `waitforblockheight`             | Blocks until height — connection tie-up risk. Hidden.    |
| `waitforptvcompletion`           | Blocks until PTV completes. Hidden.                      |
| `echo` / `echojson`              | Can be abused as reflection oracle. Hidden.              |
| `resendwallettransactions`       | Triggers wallet transaction rebroadcast. Hidden.         |
| `getbalance`                     | Wallet balance.                                          |
| `getunconfirmedbalance`          | Pending wallet balance.                                  |
| `getwalletinfo`                  | Wallet state, balance, key count.                        |
| `gettransaction`                 | Wallet transaction details.                              |
| `listtransactions`               | Wallet transaction history.                              |
| `listsinceblock`                 | Wallet transaction history since a block.                |
| `listunspent`                    | All spendable wallet UTXOs.                              |
| `listaccounts`                   | All wallet accounts with balances.                       |
| `listreceivedbyaccount`          | Receive history by account.                              |
| `listreceivedbyaddress`          | Receive history by address.                              |
| `listaddressgroupings`           | Address clustering — deanonymisation risk.               |
| `listlockunspent`                | Locked wallet UTXOs.                                     |
| `listwallets`                    | Loaded wallet names.                                     |
| `getnewaddress`                  | Generates and reveals a new wallet address.              |
| `getrawchangeaddress`            | Generates and reveals a change address.                  |
| `getaccountaddress`              | Wallet address for an account.                           |
| `getaddressesbyaccount`          | All addresses for an account.                            |
| `getaccount`                     | Account for an address.                                  |
| `setaccount`                     | Sets account for an address.                             |
| `getreceivedbyaccount`           | Total received by account.                               |
| `getreceivedbyaddress`           | Total received by address.                               |
| `addmultisigaddress`             | Adds a multisig address to the wallet.                   |
