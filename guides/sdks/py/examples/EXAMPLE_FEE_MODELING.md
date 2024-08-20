# Example: Creating a Custom Transaction Fee Model

Bitcoin miners accept transactions into a block when they pay an appropriate fee. The transaction fee is simply the difference between the amounts used as input, and the amounts claimed by transaction outputs. This is to say, any amount of Bitcoins that are unclaimed (left over) after all transaction outputs have been fulfilled is given to the miner who solves the block in which the transaction is included.

To date, fees have generally been measured in satoshis per kilobyte of block space used by the transaction. However, the SDK allows you to create custom fee models that take other factors into account. This guide will show you the default fee model, and discuss how it might be customized in the future. Note that you'll need to consult with various miners if considering an alternative fee model, to make sure your transactions would still be included in the blockchain.

## Default Fee Model

The `.fee()` method on a `Transaction` object takes a fee model as an optional parameter. The function of a fee model is to compute the number of satoshis that the transaction should pay in fees. Here's the interface all fee models need to follow:

```py
class FeeModel(ABC):
    """
    Represents the interface for a transaction fee model.
    This interface defines a standard method for computing a fee when given a transaction.

    @interface
    @property {function} compute_fee - A function that takes a Transaction object and returns an integer representing the number of satoshis the transaction should cost.
    """
    
    @abstractmethod
    def compute_fee(self, transaction) -> int:
        pass
```

In short, a fee model is an object with a `compute_fee` function that, when called with a `Transaction` as its first and only parameter, will return the number of satoshis.

The default fee model, used if no other model is provided, looks like this:

```py
class SatoshisPerKilobyte(FeeModel):
    """
    Represents the "satoshis per kilobyte" transaction fee model.
    """
    
    def __init__(self, value: int):
        """
        Constructs an instance of the sat/kb fee model.
        
        :param value: The number of satoshis per kilobyte to charge as a fee.
        """
        self.value = value

    def compute_fee(self, tx) -> int:
        """
        Computes the fee for a given transaction.
        
        :param tx: The transaction for which a fee is to be computed.
        :returns: The fee in satoshis for the transaction.
        """
        def get_varint_size(i: int) -> int:
            if i > 2 ** 32:
                return 9
            elif i > 2 ** 16:
                return 5
            elif i > 253:
                return 3
            else:
                return 1

        # Compute the (potentially estimated) size of the transaction
        size = 4  # version
        size += get_varint_size(len(tx.inputs))  # number of inputs

        for tx_input in tx.inputs:
            size += 40  # txid, output index, sequence number
            if tx_input.unlocking_script:
                script_length = len(tx_input.unlocking_script.serialize())
            elif tx_input.unlocking_script_template:
                script_length = tx_input.unlocking_script_template.estimated_unlocking_byte_length()
            else:
                raise ValueError('All inputs must have an unlocking script or an unlocking script template for sat/kb fee computation.')
            size += get_varint_size(script_length)  # unlocking script length
            size += script_length  # unlocking script

        size += get_varint_size(len(tx.outputs))  # number of outputs

        for tx_output in tx.outputs:
            size += 8  # satoshis
            length = len(tx_output.locking_script.serialize())
            size += get_varint_size(length)  # script length
            size += length  # script

        size += 4  # lock time

        # We'll use math.ceil to ensure the miners get the extra satoshi.
        fee = math.ceil((size / 1000) * self.value)
        return fee
```

Here, you can see we're computing the size of the transaction in bytes, then computing the number of satoshis based on the number of kilobytes.

## Making Adjustments

Let's modify our fee model to check for a few custom cases, just as a purely theoretical example:

* If the version of the transaction is 3301, the transaction is free.
* If there are more than 3x as many inputs as there are outputs (the transaction is helping shrink the number of UTXOs), the transaction gets a 20% discount.
* If there are more than 5x as many outputs as there are inputs, the transaction is 10% more expensive.
* Other than that, the rules are the same as the Satoshis per Kilobyte fee model.

With these rules in place, let's build a custom fee model!

```py
class ExampleFeeModel(FeeModel):
    """
    Represents the "satoshis per kilobyte" transaction fee model.
    Additionally, if the transactions version number is equal to 3301,
    then no fees are paid to the miner.
    """

    def __init__(self, value: int):
        self.value = value

    def compute_fee(self, tx) -> int:
        """
        Computes the fee for a given transaction.

        :param tx: The transaction for which a fee is to be computed.
        :returns: The fee in satoshis for the transaction.
        """

        def get_varint_size(i: int) -> int:
            if i > 2**32:
                return 9
            elif i > 2**16:
                return 5
            elif i > 253:
                return 3
            else:
                return 1

        # Version 3301 transactions are free :)
        if tx.version == 3301:
            return 0

        # Compute the (potentially estimated) size of the transaction
        size = 4  # version
        size += get_varint_size(len(tx.inputs))  # number of inputs

        for tx_input in tx.inputs:
            size += 40  # txid, output index, sequence number
            if tx_input.unlocking_script:
                script_length = len(tx_input.unlocking_script.serialize())
            elif tx_input.unlocking_script_template:
                script_length = (
                    tx_input.unlocking_script_template.estimated_unlocking_byte_length()
                )
            else:
                raise ValueError(
                    "All inputs must have an unlocking script or an unlocking script template for sat/kb fee computation."
                )
            size += get_varint_size(script_length)  # unlocking script length
            size += script_length  # unlocking script

        size += get_varint_size(len(tx.outputs))  # number of outputs

        for tx_output in tx.outputs:
            size += 8  # satoshis
            length = len(tx_output.locking_script.serialize())
            size += get_varint_size(length)  # script length
            size += length  # script

        size += 4  # lock time

        # We'll use math.ceil to ensure the miners get the extra satoshi.
        fee = math.ceil((size / 1000) * self.value)
        return fee
```

Now when you create a new transaction and call the `.fee()` method with this fee model, it will follow the rules we have set above!
