# 03 - The Stacks

There are 2 stacks that are accessible to users from within Bitcoin Script programs, the main stack and alt stack. The main stack is where all opcodes take their operands from, and place the results on to (where needed). For example, the code OP\_ADD performs addition of the two topmost stack items, removing them from the stack and replacing them with a single data item representing the outcome.

{% file src="../.gitbook/assets/BA_BSVA_EDUC_BITCOIN-SCRIPT-CH2VID2_STACKS-IN-BITCOIN_V1_072023_compressed.mp4" %}

There are a series of opcodes that are for the direct manipulation of data items that are on the stack, allowing the programmer to duplicate, change the order of, or remove entirely data items from the main stack. These opcodes and the rest are covered in the Introduction to Bitcoin Script short course available on BitcoinSV academy now. Further information can be found at

### Data items on the stack

There is no limit to how large a stack item can be within Bitcoin Script, however the evaluation of the script must still adhere to network limits such as stack usage and transaction size. There is also a limit on the size of an individual item that can be pushed to the stack in Bitcoin script which is approximately 4.3GB as defined by the OP\_PUSHDATA4 opcode. It is however valid within the Bitcoin protocol to push multiple 4.3GB segments onto the stack and concatenate them to create a larger item which may be hashed to validate a timestamp. Imagination is the only boundary here.&#x20;

### Using the AltStack

The Altstack is a First In Last Out (FILO) stack that can be used to track useful values like counters, or a set of indexed parameters being extracted in-order. The only opcodes that interact with the altstack are OP\_TOALTSTACK which moves the topmost item on the main stack to the top of the altstack, and OP\_FROMALTSTACK which removes the topmost item from the Altstack and place it on the top of the main stack. There are no restrictions on usage of the Altstack outside of those imposed through rules such as the total stack memory usage rule. These rules are covered in detail with many others in Introduction to Bitcoin Infrastructure.

### Clean Stack Rule

The clean stack rule asserts a requirement that upon completion of a script's processing there can only be one value remaining on the stack. If there is more than one data item remaining on the stack, the script's execution fails regardless of whether the topmost item it is a zero or non-zero value. This rule is extended to the altstack, requiring that no data be left on the altstack at the termination of a script or the execution fails.
