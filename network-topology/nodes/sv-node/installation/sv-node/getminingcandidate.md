# GetMiningCandidate

The `getminingcandidate` RPC call is an improved API for Miners, ensuring they can scale with the Bitcoin network, by mining large blocks without the limitations of the RPC interface interfering as block sizes grow. Based on and credited to the work of Andrew Stone and Johan van der Hoeven, GMC works by removing the list of transactions from the RPC request found in `getBlockTemplate` and supplying only the Merkle proof of all the transactions currently in the mempool/blockcandidate.

It is strongly recommended that Miners begin the necessary steps to adapt their mining pool software to use GMC. As block sizes grow, Miners still using `getBlockTemplate` will begin to run into issues trying to produce blocks. At best, they will be leaving fees on the table for other Miners, and at worst their mining environment will fall behind the chain tip as they are waiting on block templates to be generated, in some cases bringing block production to a complete stand still.

For Miners wishing to test the limitations of their pool setup it is recommended they start a test deployment on the [Scaling Testnet](https://bitcoinscaling.io/).
