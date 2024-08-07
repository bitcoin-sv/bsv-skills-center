# Creating a Simple Transaction

This guide walks you through the steps of creating a simple Bitcoin transaction. To get started, let's explain some basic concepts around Bitcoin transactions.

## Understanding and Creating Transactions

Transactions in Bitcoin are mechanisms for transferring value and invoking smart contract logic. The `Transaction` class in the BSV SDK encapsulates the creation, signing, and broadcasting of transactions, also enabling the use of Bitcoin's scripting language for locking and unlocking coins.

## Creating and Signing a Transaction

Consider the scenario where you need to create a transaction. The process involves specifying inputs (where the bitcoins are coming from) and outputs (where they're going). Here's a simplified example:

```javascript
from bsv import PrivateKey, PublicKey, ARC, P2PKH, Transaction

priv_key = PrivateKey.fromWif('...')        # Your P2PKH private key
change_priv_key = PrivateKey.fromWif('...') # Change private key (never re-use addresses)
recipient_address = '1Fd5F7XR8LYHPmshLNs8cXSuVAAQzGp7Hc' # Address of the recipient

tx = Transaction()

# Add the input
tx.add_input(
    TransactionInput(
        source_transaction=Transaction.from_hex('...'), # The source transaction where the output you are spending was created
        source_output_index=0,
        unlocking_script_template=P2PKH().unlock(priv_key), # The script template you are using to unlock the output, in this case P2PKH
    )
)

# Pay an output to a recipient using the P2PKH locking template
tx.add_output(
    TransactionOutput(
        locking_script=P2PKH().lock(recipient_address),
        satoshis=2500
    )
)

# Send remainder back the change address
tx.add_output(
    TransactionOutput(
        lockingScript=P2PKH().lock(change_priv_key.address()),
        change=True
    )
)

# Now we can compute the fee and sign the transaction
tx.fee()
tx.sign()

# Finally, we broadcast it with ARC.
# get your api key from https://console.taal.com
api_key = 'mainnet_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' # replace
await tx.broadcast(ARC('https://api.taal.com/arc', api_key))
```

This code snippet demonstrates creating a transaction, adding an input and an output, setting a change script, configuring the fee, signing the transaction, and broadcasting with the ARC broadcaster. It uses the P2PKH Template, which is a specific type of Bitcoin locking program. To learn more about templates, check out this example (link to be provided once complete).

## Handling Hex Locking Scripts

Moving beyond this basic example into more advanced use-cases enables you to start dealing with custom scripts. If you're provided with a hex-encoded locking script for an output, you can set it directly in the transaction's output as follows:

```py
transaction.add_output(
    TransactionOutput(
        locking_script=Script.from_asm('OP_ADD OP_MUL ...'), 
        satoshis=100
    )
)
```

The `Transaction` class abstracts the complexity of Bitcoin's transaction structure. It handles inputs, outputs, scripts, and serialization, offering methods to easily modify and interrogate the transaction. Check out the full code-level documentation, refer to other examples, or reach out to the community to learn more.

