# Example: Creating the R-puzzle Script Template

This guide will provide information about the structure and functionality of script templates within the BSV SDK. Script templates are a powerful abstraction layer designed to simplify the creation and management of the scripts used in Bitcoin transactions. By understanding how these templates work, developers can leverage them to build more sophisticated and efficient blockchain applications. By the end of this example, you'll understand how the R-puzzle script template (P2RPH) was created.

### Understanding Script Templates

A script template is essentially a blueprint for creating the locking and unlocking scripts that are crucial for securing and spending bitcoins. These templates encapsulate the logic needed to construct these scripts dynamically, based on the parameters passed to them. This approach allows for a modular and reusable codebase, where common scripting patterns can be defined once and then instantiated as needed across different transactions.

#### Locking Script

The locking script, or output script, specifies the conditions under which the bitcoins can be spent. In the BSV SDK, the `lock` function of a script template is responsible for generating this script. By abstracting the creation of locking scripts into a method that accepts parameters, developers can easily create diverse conditions for spending bitcoins without having to write the low-level script code each time.

For example, a locking script might require the presentation of a public key that matches a certain hash or the fulfillment of a multi-signature condition. The flexibility of passing parameters to the `lock` function enables the creation of locking scripts tailored to specific requirements. This example will require a signature created with a particular ephemeral K-value, [an R-puzzle](https://wiki.bitcoinsv.io/index.php/R-Puzzles).

#### Unlocking Script

The unlocking script, or input script, provides the evidence needed to satisfy the conditions set by the locking script. The `unlock` method in a script template not only generates this script but also offers two key functionalities — it's a function that returns an object with two properties:

1. **`estimate_length`**: Before a transaction is signed and broadcast to the network, it's crucial to estimate its size to calculate the required fee accurately. The `estimateLength` function predicts the length of the unlocking script once it will be created, allowing developers to make informed decisions about fee estimation.
2. **`sign`**: This function generates an unlocking script that includes the necessary signatures or data required to unlock the bitcoins. By accepting a transaction and an input index as arguments, it ensures that the unlocking script is correctly associated with the specific transaction input it intends to fund, allowing signatures to be scoped accordingly.

### Creating a Script Template

To create a script template, developers define a class that adheres to the `ScriptTemplate` interface. This involves implementing the `lock` and `unlock` methods with the specific logic needed for their application.

Now that you understand the necessary components, here's the code for the R-puzzle script template:

```py
class RPuzzle(ScriptTemplate):
    
    def __init__(self, puzzle_type: str = 'raw'):
        """
        Constructs an R Puzzle template instance for a given puzzle type.

        :param puzzle_type: Denotes the type of puzzle to create ('raw', 'SHA1', 'SHA256', 'HASH256', 'RIPEMD160', 'HASH160')
        """
        assert(puzzle_type in ['raw', 'SHA1', 'SHA256', 'HASH256', 'RIPEMD160', 'HASH160'])
        self.type = puzzle_type

    def lock(self, value: bytes) -> Script:
        """
        Creates an R puzzle locking script for a given R value or R value hash.

        :param value: A byte array representing the R value or its hash.
        :returns: An R puzzle locking script.
        """
        chunks = [
            OpCode.OP_OVER,
            OpCode.OP_3,
            OpCode.OP_SPLIT,
            OpCode.OP_NIP,
            OpCode.OP_1,
            OpCode.OP_SPLIT,
            OpCode.OP_SWAP,
            OpCode.OP_SPLIT,
            OpCode.OP_DROP
        ]
        if self.type != 'raw':
            chunks.append(getattr(OpCode, f'OP_{self.type}'))
        chunks.append(encode_pushdata(value))
        chunks.append(OpCode.OP_EQUALVERIFY)
        chunks.append(OpCode.OP_CHECKSIG)
        return Script(b''.join(chunks))
    
    
    def unlock(self, k: int, private_key: Optional[PrivateKey] = PrivateKey(), sign_outputs: str = 'all', anyone_can_pay: bool = False):
        """
        Creates a function that generates an R puzzle unlocking script along with its signature and length estimation.

        :param k: The K-value used to unlock the R-puzzle.
        :param private_key: The private key used for signing the transaction.
        :param sign_outputs: The signature scope for outputs ('all', 'none', 'single').
        :param anyone_can_pay: Flag indicating if the signature allows for other inputs to be added later.
        :returns: An object containing the `sign` and `estimate_length` functions.
        """
        def sign(tx: Transaction, input_index: int) -> Script:
            sighash = SIGHASH.FORKID
            if sign_outputs == 'all':
                sighash |= SIGHASH.ALL
            elif sign_outputs == 'none':
                sighash |= SIGHASH.NONE
            elif sign_outputs == 'single':
                sighash |= SIGHASH.SINGLE
            if anyone_can_pay:
                sighash |= SIGHASH.ANYONECANPAY
                
            tx.inputs[input_index].sighash = sighash

            preimage = tx.preimage(input_index)

            sig = private_key.sign(preimage, hasher=hash256, k=k) + sighash.to_bytes(1, "little")
            pubkey_for_script = private_key.public_key().serialize()

            return Script(encode_pushdata(sig) + encode_pushdata(pubkey_for_script))

        def estimated_unlocking_byte_length() -> int:
            # public key (1+33) + signature (1+71)
            # Note: We add 1 to each element's length because of the associated OP_PUSH
            return 106

        return to_unlock_script_template(sign, estimated_unlocking_byte_length)
```

In this example, `RPuzzle` defines custom logic for creating both locking and unlocking scripts. The opcodes, intermixed with the various template fields, enable end-users to implement R-puzzles into their applications without being concerned with these low-level details. Check out [this guide](EXAMPLE\_COMPLEX\_TX.md) to see an example of this template used in a transaction.

### Conclusion

Script templates in the BSV SDK offer a structured and efficient way to handle the creation of locking and unlocking scripts in Bitcoin transactions. By encapsulating the logic for script generation and providing essential functionalities like signature creation and length estimation, script templates make it easier for developers to implement complex transactional logic. With these tools, template consumers can focus on the higher-level aspects of their blockchain applications, relying on the SDK to manage the intricacies of script handling.
