# System Architecture

![](https://web.archive.org/web/20211022185005im\_/https://bitcoinsv.io/wp-content/uploads/2020/09/architecture2-1024x514.png)

External (p2p network):

* discovers and connects to other nodes
* send and receive messages to and from other nodes

Internal:

* exposes RPC to pool software and other tools
* optional REST Interface can be enabled

External (stratum protocol):

* exposed API for ASIC Miners to connect and start mining block headers
* send jobs to ASIC Miners
* receive valid shares or valid block headers

Internal (Bitcoind RPC):

* connect to Bitcoind RPC to submit transactions
* receive transaction response (eg. txid)
* provide event notifications for double spends and Merkle Proofs.
