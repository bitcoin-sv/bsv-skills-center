# Smart Contracts

Smart contracts on Bitcoin SV allow for programmable, self-executing contracts where the terms between buyer and seller are directly written into lines of code. Using Satoshis facilitates these contracts by utilizing the native token for operations.

**Example: Deploying a Smart Contract for Escrow** This example demonstrates setting up a basic escrow service using a smart contract on Bitcoin SV:

```python
pythonCopy codefrom bsvlib import Wallet, Network, Script

# Initialize the network
network = Network()

# Create wallets
seller_wallet = Wallet.import_wallet('seller_private_key_here')
buyer_wallet = Wallet.import_wallet('buyer_private_key_here')
escrow_wallet = Wallet.create()

# Create an escrow script
escrow_script = Script([
    'OP_IF',
    'OP_HASH160', escrow_wallet.hash160(), 'OP_EQUALVERIFY', 'OP_CHECKSIG',
    'OP_ELSE',
    buyer_wallet.public_key, 'OP_CHECKSIG',
    'OP_ENDIF'
])

# Funds go to escrow
tx = buyer_wallet.create_transaction(outputs=[(escrow_script.to_address(), 1000000)])  # 1 BSV into escrow
tx.sign()
network.broadcast(tx)

# To release funds, either party provides necessary conditions
# Escrow releases to seller
release_tx = escrow_wallet.create_transaction(outputs=[(seller_wallet.address, 1000000)])
release_tx.sign()
network.broadcast(release_tx)
```
