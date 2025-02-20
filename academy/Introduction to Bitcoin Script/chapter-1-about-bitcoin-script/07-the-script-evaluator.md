# 07 - The Script Evaluator

In each Bitcoin node is a system element called a script evaluator. When a Bitcoin transaction is received by a node, the evaluator performs a series of checks against it such as looking at its size, the values of its inputs and outputs and more.

During this process, the transaction is broken down into its separate component elements, such as inputs and outputs. Each part must undergo its own separate evaluation with different rules and policies.

As discussed previously, Bitcoin Scripts are processed when a transaction output is being spent as an input to a new transaction. The transaction input that spends the script must contain a valid solution to the predicate contained in the referenced output. Depending on the script used, the input can be very simple, or highly complex.



The transaction processing system must first retrieve the output being spent from the ledger. This is specified by using the TXID and index which are provided as the first part of the input. Once the output's lockScript has been retrieved, the processing system appends the lockScript which makes up the second part of the transaction input to the front of the unlockScript, and inserts an OP\_CODESEPARATOR to demark the boundary between unlockScript and lockScript. This opcode can also be used in the lockScript to segregate elements of the script from parts being signed, offering novel ways to manage contracts and exchange.

The script evaluator evaluates the script from start to finish against a set of rules which are part of the Bitcoin protocol. This means that all nodes must process each script in the exact same manner for consensus to be achieved, or network forks can occur.

Transactions are only valid if all of their inputs finish processing with a single non-zero value on the stack.
