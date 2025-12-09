# BSV Blocks and SHA-256

![](../../../../.gitbook/assets/BSVA-HashFunctions_Ch3L3_DA1.gif)

## What is a BSV Block?

A BSV block is the time stamped package consisting of all transactional activity accumulated between each proof of work solution discovery. Like TXIDs, Block IDs are the HASH-256 of the serialised block header. The time between blocks is algorithmically regulated to keep the block discovery rate approximating one every ten minutes.

Each block consists of all the transactions received by whichever node won the right to add the block to the chain, their data payloads if there are any, and a block header containing the following serialised elements:

* version field: 4 bytes; little endian
* previous block hash: 32 bytes; little endian
* Merkle Root Hash: 32 bytes; little endian
* time field: 4 bytes; big endian (Unix epoch timestamp)
* nbits: 4 bytes; little endian (denotes the current difficulty target nodes must find a proof-of-work solution below)
* nonce: 4 bytes; little endian (a field hashers use to cycle through in search of a proof-of-work solution

## Example Block

The below is an example block deserialised in JSON format

```markup
{ 
    "tx": [ 
        "63fde109a6f22a611fe80847eb43f34b1cef0ec095273c3cbf12b0164295796b", 
        "d94f1db2079b1a3f4c4936e0f47434e09ab7eef7a1d35d2fc6af5dd9e87b4f84" 
    ], 
    "hash": "0be14bde7beb17c481b5bc78496ef129c25e16401d78419e789f9629db6057e4", 
    "confirmations": 155, 
    "size": 406, 
    "height": 284, 
    "version": 536870912, 
    "versionHex": "20000000", 
    "merkleroot": "f15b44eebcf7a3c3009cc6acd3bd1dd74f256448936c88ad72f39b55981ddffd", 
    "num_tx": 2, 
    "time": 1647415283, 
    "mediantime": 1647412906, 
    "nonce": 0, 
    "bits": "207fffff", 
    "difficulty": "4.656542373906925e-10", 
    "chainwork": "000000000000000000000000000000000000000000000000000000000000023a", 
    "previousblockhash": "74f52bbca1a9a4f7f13f85cdcd24c7f49650cd1d463421373eb3bcb683868712", 
    "nextblockhash": "7e976012ba0a1cd9eeba8fb57ba41c982b914cffcd17fe46b84c0a0333db79eb", 
    "coinbaseTx": { 
        "txid": "63fde109a6f22a611fe80847eb43f34b1cef0ec095273c3cbf12b0164295796b", 
        "hash": "63fde109a6f22a611fe80847eb43f34b1cef0ec095273c3cbf12b0164295796b", 
        "version": 2, 
        "size": 100, 
        "locktime": 0, 
        "vin": [ 
            { 
                "coinbase": "021c010101", 
                "sequence": 4294967295 
            } 
        ], 
        "vout": [ 
            { 
                "value": 25.00000113, 
                "n": 0, 

                "scriptPubKey": { 

                    "asm": "03642fd43b260aab1f0241535c9fabec5445bdc42591a5be9d555a6e33c96a09d8 OP_CHECKSIG", 
                    "hex": "2103642fd43b260aab1f0241535c9fabec5445bdc42591a5be9d555a6e33c96a09d8ac", 
                    "reqSigs": 1, 
                    "type": "pubkey", 
                    "addresses": [ 
                        "mjvmz3xW4nTbjtKsmbfhsXB9gtm9GBddJg" 
                    ] 
                } 
            } 
        ], 
        "blockhash": "0be14bde7beb17c481b5bc78496ef129c25e16401d78419e789f9629db6057e4", 
        "confirmations": 155, 
        "time": 1647415283, 
        "blocktime": 1647415283, 
        "blockheight": 284, 
        "hex": "02000000010000000000000000000000000000000000000000000000000000000000000000ffffffff05021c010101ffffffff0171f9029500000000232103642fd43b260aab1f0241535c9fabec5445bdc42591a5be9d555a6e33c96a09d8ac00000000" 
    }, 
    "totalFees": "-24.99999887", 
    "miner": "\u0002\u001c\u0001\u0001\u0001", 
    "txCount": 2 
```

The below table breaks down the block header for the above block

| **Element**                                            | **Description**                                                                                                           | **RAW Hexadecimal (Little Endian)**                                | **JSON (Big Endian)**                                                                      |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------ |
| Version Field (4 bytes little endian)                  | The version or network functionality the block was published under                                                        | `00000020`                                                         | "versionHex": "20000000",                                                                  |
| Previous Block Hash (32 bytes little endian)           | The block ID of the most recent block this block is building upon                                                         | `12878683b6bcb33e372134461dcd5096f4c724cdcd853ff1f7a4a9a1bc2bf574` | `"previousblockhash": "74f52bbca1a9a4f7f13f85cdcd24c7f49650cd1d463421373eb3bcb683868712",` |
| Merkle Root Hash (32 bytes little endian)              | The Merkle root of the Merkle tree of transaction IDs for this block                                                      | `fddf1d98559bf372ad886c934864254fd71dbdd3acc69c00c3a3f7bcee445bf1` | "merkleroot": "f15b44eebcf7a3c3009cc6acd3bd1dd74f256448936c88ad72f39b55981ddffd"           |
| Time Field (4 bytes big endian – UNIX Epoch timestamp) | The date and time all the block and transactions within the block are being time-stamped with                             | `00000000`                                                         | "time": 1647415283,                                                                        |
| nBits                                                  | The difficulty target in compact form                                                                                     | `ffff7f20`                                                         | <p>"bits": "207fffff",<br>"difficulty": "4.656542373906925e-10",</p>                       |
| Nonce                                                  | The "Number Used Once" which allows hashers to iterate through a block header value in search of a proof-of-work solution | `00000000`                                                         |  "nonce": 0,                                                                               |

All spendable outputs from previous transactions are held by all nodes in their continuously updated Unspent Transaction Output (UTXO) sets. All new transactions submitted to the node network have their input UTXOs cross-checked against nodes' UTXO sets. Transactions that have been generated on the network and are yet to be timestamped into a block are stored in node memory pools or mempools. Nodes construct a Merkle tree from the transactions in their mempool to calculate the Merkle root to populate the Merkle Root field in the block header. Once a UTXO has been consumed as an input, it's no longer necessary for nodes to keep it in their UTXO sets, and its often pruned -- including its data payload.

## How is a BSV Block Created?

As transactions are broadcast to the BSV network to be added to the blockchain, each node validates them against the block consensus rules, then against their local policies. If received transactions pass validation, their TXIDs are added to the node's working Merkle Tree.

Nodes then send **block header templates** to their **hashing pools** with a range of nonce values to be iterated through with the aim of finding a proof-of-work solution. Once a proof-of-work solution is found, the block ID is finalized, and the resulting ‘proposed’ block is distributed to the rest of the nodes on the network. Once the majority of other network nodes have signalled acceptance of the newly found block by starting to build a block template using its block ID as the previous block hash, the block is considered won, and after 99 more blocks are added on top of it, its block reward UTXO becomes spendable.
