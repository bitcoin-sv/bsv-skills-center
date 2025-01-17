# 03 - From FORTH to Bitcoin Script

FORTH is the parent of Bitcoin Script, which adds some grammar changes and removes capabilities such as jump instructions and loops.&#x20;

In transactions on the Bitcoin ledger, each output contains a predicate called a scriptPubKey. This predicate is written in Bitcoin script and evaluates an input against a set of conditions. When a transaction output is spent, the user provides a set of input data called the scriptSig which is loaded onto the stack before the scriptPubKey processes it. If the evaluation finishes with a single non-zero value on the stack, the scriptSig is valid and the tokens contained in the output can be spent in the transaction. For a transaction to be valid, every input must have a valid scriptSig and every new scriptPubKey must meet the Bitcoin grammar rules we will cover in chapter 2.&#x20;

{% file src="../.gitbook/assets/BA_BSVA_EDUC_BITCOIN-SCRIPT-CH1VID2_BASICS-BITCOIN-TRANSACTIONS_V1_072023_compressed.mp4" %}

Bitcoin script predicates can only contain opcodes defined within the Bitcoin protocol itself. The evaluation ends when any of the following conditions are met:

* The script reaches an OP\_RETURN opcode
* The script fails an OP\_VERIFY check
* The scriptSig is incomplete or invalid
* The end of the script is reached
* The script exceeds a policy such as the maximum stack memory policy (for more information on policies, please see the BitcoinSV wiki, or consider taking Introduction to Bitcoin Infrastructure)

Bitcoin script cannot jump back to a previous instruction. For an input to a transaction to be valid its script must process without halting until it ends.
