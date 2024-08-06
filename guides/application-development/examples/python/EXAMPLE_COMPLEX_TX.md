# Example: Creating Transactions with Inputs, Outputs and Templates

In Bitcoin, transactions contain inputs and outputs. The outputs are locked with scripts, and the inputs redeem these scripts by providing the correct unlocking solutions. This guide will show you how to create transactions that make use of custom inputs, outputs, and the associated script templates. For a more straightforward example, check out [how to create a simpler transaction](EXAMPLE\_SIMPLE\_TX.md).

## Transaction Input and Outputs

All Bitcoins are locked up in Bitcoin transaction outputs. These outputs secure the coins by setting constraints on how they can be consumed in future transaction inputs. This security mechanism makes use of "scripts" — programs written in a special predicate language. There are many types of locking programs, embodying the multitude of BSV use-cases. The BSV SDK ships with a script templating system, making it easy for developers to create various types of scripts and abstracting away the complexity for end-users. You can learn about script templates [in the example](EXAMPLE\_SCRIPT\_TEMPLATES.md).

## Creating a Transaction

To create a transaction with the SDK, you can either use the constructor:

* Use the constructor and pass in arrays of inputs and outputs, or
* Construct a blank transaction, then call the `add_input` and `add_output` methods

```py
tx = Transaction(version, inputs_list, outputs_list, lock_time)
# or
tx = Transaction()
    .add_input(inputA)
    .add_input(inputB)
    .add_output(outputA)
tx.version = version
tx.lock_time = lock_time
```

Note that the version and lock time parameters are optional.

## Adding Inputs and Outputs

When constructing a Bitcoin transaction, inputs and outputs form the core components that dictate the flow of bitcoins. Here’s how to structure and add them to a transaction:

### Transaction Inputs

An input in a Bitcoin transaction represents the bitcoins being spent. It's essentially a reference to a previous transaction's output. Inputs have several key components:

* **`source_transaction` or `source_txid`**: A reference to either the source transaction (another Transaction instance), its TXID. Referencing the transaction itself is always preferred because it exposes more information to the library about the outputs it contains.
* **`source_output_index`**: A zero-based index indicating which output of the referenced transaction is being spent.
* **`sequence`**: A sequence number for the input. It allows for the replacement of the input until a transaction is finalized. If omitted, the final sequence number is used.
* **`unlocking_script`**: This script proves the spender's right to access the bitcoins from the spent output. It typically contains a digital signature and, optionally, other data like public keys.
* **`unlocking_script_template`**: A template that provides a method to dynamically generate the unlocking script.

Next, we'll add an R-puzzle input into this transaction using the \`RPuzzle\`\` template.

#### Example: Adding an Input

```py
source_transaction = Transaction.from_hex('...')
puz = RPuzzle()
k = 1
unlocking_script_template = puz.unlock(k)
tx_input = TransactionInput(
    source_transaction=source_transaction,
    source_output_index=0
    unlocking_script_template=unlocking_script_template
)

my_tx = Transaction()
my_tx.add_input(tx_input)
```

### Transaction Outputs

Outputs define where the bitcoins are going and how they are locked until the next spend. Each output includes:

* **`satoshis`**: The amount of satoshis (the smallest unit of Bitcoin) being transferred. This value dictates how much value the output holds.
* **`locking_script`**: A script that sets the conditions under which the output can be spent. It's a crucial security feature, often requiring a digital signature that matches the recipient's public key.
* **`change`**: An optional boolean flag indicating if the output is sending change back to the sender.

We will now add an R-puzzle output to a transaction, making use of the script template.

#### Example: Adding an Output

```py
# We must first obtain an R-value for the template
pubkey = PublicKey('...')

G: Point = curve.g
r = curve_multiply(k, G).x % curve.n

r_bytes = r.to_bytes(32, byteorder='big')
if r_bytes[0] > 0x7f:
    r_bytes = b'\x00' + r_bytes

puz = RPuzzle()
locking_script = puz.lock(r)

let tx_output = {
    satoshis=1000,  # Amount in satoshis
    locking_script=locking_script,
    change=False    # Not a change output, it has a defined number of satoshis
}

my_tx.add_output(tx_output)
```

## Change and Fee Computation

The transaction fee is the difference between the total inputs and total outputs of a transaction. Miners collect these fees as a reward for including transactions in a block. The amount of the fee paid will determine the quality of service provided my miners, subject to their policies.

If the total value of the inputs exceeds the total value you wish to send (plus the transaction fee), the excess amount is returned to you as "change." Change is sent back to a destination controlled by the sender, ensuring that no value is lost. When you set the `change` property on an output to `true`, you don't need to define a number of satoshis. This is because the library computes the number of satoshis for you, when the `.fee()` method is called.

In summary:

1. After all funding sources and recipient outputs are added, add at least one output where `change` is `true`, so that you capture what's left over after you send. Set up a locking script you control so that you can later spend your change.
2. Then, call the `.fee()` method to compute the change amounts across all change outputs, and leave the rest to the miner. You can specify a custom fee model if you wish, but the default should suffice for most use-cases.

In our above code, we already added a change output — now, we can just compute the fees before transaction signing.

```py
# Compute the correct amounts for change outputs and leave the rest for the Bitcoin miners
my_tx.fee()
```

## Signing and Signature Validity

Once you've defined your inputs and outputs, and once your change has been computed, the next step is to sign your transaction. There are a few things you should note when signing:

* Only inputs with an unlocking template will be signed. If you provided an unlocking script yourself, the library assumes the signatures are already in place.
* If you change the inputs or outputs after signing, certain signatures will need to be re-computd, depending on the SIGHASH flags used.
* If your templates support it, you can produce partial signatures before serializing and sending to other parties. This is especially useful for multi-signature use-cases.

With these considerations in mind, we can now sign our transaction. The `RPuzzle` unlocking templates we configured earlier will be used in this process.

```py
# Set the input unlocking scripts based on the script templates
my_tx.sign()
```

## Serialization and Broadcast

After a transaction is signed, it can be broadcast to the BSV Mining Network, or to relevant Overlay Networks through the SDK.

```py
# get your api key from https://console.taal.com
api_key = 'mainnet_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' # TODO: replace
await tx.broadcast(ARC('https://api.taal.com/arc', api_key))
```

Alternatively, if you don't want to use the SDK's built-in broadcasting system, you can simply serialize your transaction into a hex string as follows:

```py
# Serialize your transaction
my_tx.hex()
```

## SPV and Serialization Formats

Simplified Payment Verification is a mechanism that enables the recipient of a transaction to verify its legitimacy by providing necessary information, like input transactions and their associated merkle proofs.

Earlier in this guide, we mentioned that you can either reference a `source_txid` or, preferably, a `source_transaction` when linking transaction inputs. The reason why it's preferable to link the entire source transaction is because serializing the transaction in an SPV-compliant way generally requires more information about the outputs being spent.

When properly linked, you can serialize your transactions in the SPV formats as follows:

```py
# Note: Requires use of source_transaction instead of source_txid for inputs
my_tx.to_BEEF()
# or
my_tx.to_EF()
```

This enables the transactions to be verified properly by recipients, using the `.verify()` method:

```py
incoming_tx = Transaction.from_BEEF('...')
incoming_tx.verify(chain_tracker) # Provide a source of BSV block headers to verify
```

Recipients, with nothing other than a source of BSV block headers, can verify that the transaction properly unlocks and redeems its inputs, thereby creating its outputs. To learn more about setting up a chain tracker with a source of block headers, check out the Pulse example (link to be provided once completed).
