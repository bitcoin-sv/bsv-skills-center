# Getting Started with BSV SDK in Python

Welcome to the BSV SDK! This guide is tailored for developers working in a Python environment. We'll walk you through the installation process and show you how to get started with creating and signing a Bitcoin SV transaction using the SDK. Whether you're building on BSV for the first time or transitioning an existing project to use the SDK, this guide is for you.

## Prerequisites

Before we begin, make sure you have Python installed on your system. You can download and install Python from [python.org/](https://python.org/). This guide assumes you have basic knowledge of working with Python.

## Installation

First, you'll need to install the BSV SDK package in your environment. Open your terminal and run the following command:

```bash
pip install bsv-sdk
```

This command installs the BSV SDK in your environment, making it ready for use. There are no external runtime dependencies.

## Requiring the SDK

To use the BSV SDK in a Python project, you'll import modules using the `import` syntax. Here's how you set up a basic script to use the BSV SDK:

1. Create a new Python file in your project. For example, `main.py`.
2. At the top of your file, require the SDK modules along with other modules you plan to use. For instance:

```py
import asyncio  # Needed for calling async methods...
from bsv import (
    PrivateKey, P2PKH, Transaction, TransactionInput, TransactionOutput
)
```

## Creating and Signing a Transaction

Now, let's create and sign a transaction. We'll follow the example provided in the README. This example demonstrates how to create a transaction from a source to a recipient, including calculating fees, signing the transaction, and broadcasting it.

Copy and paste the following code into your `main.py` file below your `import` statements:

```py
# Replace with your private key (WIF format)
PRIVATE_KEY = 'KyEox4cjFbwR---------VdgvRNQpDv11nBW2Ufak'

# Replace with your source tx which contains UTXO that you want to spend (raw hex format)
SOURCE_TX_HEX = '01000000018128b0286d9c6c7b610239bfd8f6dcaed43726ca57c33aa43341b2f360430f23020000006b483045022100b6a60f7221bf898f48e4a49244e43c99109c7d60e1cd6b1f87da30dce6f8067f02203cac1fb58df3d4bf26ea2aa54e508842cb88cc3b3cec9b644fb34656ff3360b5412102cdc6711a310920d8fefbe8ee73b591142eaa7f8668e6be44b837359bfa3f2cb2ffffffff0201000000000000001976a914dd2898df82e086d729854fc0d35a449f30f3cdcc88acce070000000000001976a914dd2898df82e086d729854fc0d35a449f30f3cdcc88ac00000000'

async def create_and_broadcast_transaction():
    priv_key = PrivateKey(PRIVATE_KEY)
    source_tx = Transaction.from_hex(SOURCE_TX_HEX)

    tx_input = TransactionInput(
        source_transaction=source_tx,
        source_txid=source_tx.txid(),
        source_output_index=1,
        unlocking_script_template=P2PKH().unlock(priv_key),
    )

    tx_output = TransactionOutput(
        locking_script=P2PKH().lock(priv_key.address()),
        change=True
    )

    tx = Transaction([tx_input], [tx_output], version=1)

    tx.fee()
    tx.sign()

    await tx.broadcast()

    print(f"Transaction ID: {tx.txid()}")
    print(f"Raw hex: {tx.hex()}")

if __name__ == "__main__":
    asyncio.run(create_and_broadcast_transaction())
```

This script demonstrates the entire process of creating a transaction, from initializing keys to signing and broadcast. When you run this script using Python (replacing the source transaction and private key), the spend will be signed and broadcast to the BSV network.

## Running Your Script

To run your script, simply execute the following command in your terminal:

```bash
python main.py
```

## Conclusion

Congratulations! You've successfully installed the BSV SDK in your Python project and created a signed transaction. This guide covered the basics to get you started, but the BSV SDK is capable of much more. Explore the SDK documentation for detailed information on all the features and functionalities available to build scalable applications with the BSV blockchain.
