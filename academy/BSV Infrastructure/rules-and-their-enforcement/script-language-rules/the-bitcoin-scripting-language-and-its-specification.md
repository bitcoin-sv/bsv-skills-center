# The Bitcoin Scripting Language and its Specification

One of the aspects of Bitcoin which gives it such a broad range of applicability and function is its scripting language. Based on Forth, the language is stack based and uses Reverse Polish Notation as the means to enter and process data. While the language appears simple, when used properly it can provide a Turing complete environment within which complex and diverse applications can be built.

The scripting language is made up of a set of 186 opcodes which each instruct operations on the processing stack. Any node that wishes to process transactions on the Bitcoin network must ensure that their node client implementation is processing each of the opcodes in a way that exactly matches the outcomes expected by every other node on the network at that time, including whether or not those opcodes are enabled or not.

Even a minor change in the way opcodes are processed can result in transactions that were committed to the ledger being rendered unspendable and causing irreparable damage to the system’s integrity and usability. It is because of these reasons that it is of vital importance that every node processes each opcode in the script in exactly the same manner.

<figure><img src="../../.gitbook/assets/CHAPTER 2 GIF 10.gif" alt=""><figcaption></figcaption></figure>

Interestingly, this also means that bugs that existed in the execution algorithms must also be upheld. Notably, a bug in the OP\_CHECKMULTISIG opcode requires that an extra data item be added to the stack before the first signature or the opcode will fail to execute properly. For this reason, anyone spending an output with OP\_CHECKMULTISIG in it must add one extra data item to their script. Additionally, any node clients that did not take this known bug into account would incorrectly validate scripts that use the opcode, potentially causing them to reject transactions or blocks that should be considered valid, or accepting transactions and blocks which the rest of the network considers invalid.

The following rules are applied for all transactions
