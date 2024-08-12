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
2. At the top of your file, require the SDK modules you plan to use. For instance:

```py
from bsv import (
    PrivateKey, P2PKH, Transaction, TransactionInput, TransactionOutput, ARC
)
```

## Creating and Signing a Transaction

Now, let's create and sign a transaction. We'll follow the example provided in the README. This example demonstrates how to create a transaction from a source to a recipient, including calculating fees, signing the transaction, and broadcasting it.

Copy and paste the following code into your `index.js` file below your `import` statement:

```py
priv_key = PrivateKey.from_wif('...')

source_tx = Transaction.from_hex('...')

version = 1

tx_input = TransactionInput(
  source_transaction=source_tx,
  source_output_index=0,
  unlocking_script_template: P2PKH().unlock(priv_key),
}

tx_output = TransactionOutput(
  locking_script: P2PKH().lock(priv_key.address()),
  change=True
}

tx = Transaction([input], [output], version)

tx.fee()
tx.sign()

await tx.broadcast()
```

This script demonstrates the entire process of creating a transaction, from initializing keys to signing and broadcast. When you run this script using Python (replacing the source transaction, private key, and ARC credentials), the spend will be signed and broadcast to the BSV network.

## Running Your Script

To run your script, simply execute the following command in your terminal:

```bash
python main.py
```

## Conclusion

Congratulations! You've successfully installed the BSV SDK in your Python project and created a signed transaction. This guide covered the basics to get you started, but the BSV SDK is capable of much more. Explore the SDK documentation for detailed information on all the features and functionalities available to build scalable applications with the BSV blockchain.
