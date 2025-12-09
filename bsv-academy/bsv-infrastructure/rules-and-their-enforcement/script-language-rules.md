# Script Language Rules

## The Bitcoin Scripting Language and its Specification

One of the aspects of Bitcoin which gives it such a broad range of applicability and function is its scripting language. Based on Forth, the language is stack based and uses Reverse Polish Notation as the means to enter and process data. While the language appears simple, when used properly it can provide a Turing complete environment within which complex and diverse applications can be built.

The scripting language is made up of a set of 186 opcodes which each instruct operations on the processing stack. Any node that wishes to process transactions on the Bitcoin network must ensure that their node client implementation is processing each of the opcodes in a way that exactly matches the outcomes expected by every other node on the network at that time, including whether or not those opcodes are enabled or not.

Even a minor change in the way opcodes are processed can result in transactions that were committed to the ledger being rendered unspendable and causing irreparable damage to the system’s integrity and usability. It is because of these reasons that it is of vital importance that every node processes each opcode in the script in exactly the same manner.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 10.gif" alt=""><figcaption></figcaption></figure>

Interestingly, this also means that bugs that existed in the execution algorithms must also be upheld. Notably, a bug in the OP\_CHECKMULTISIG opcode requires that an extra data item be added to the stack before the first signature or the opcode will fail to execute properly. For this reason, anyone spending an output with OP\_CHECKMULTISIG in it must add one extra data item to their script. Additionally, any node clients that did not take this known bug into account would incorrectly validate scripts that use the opcode, potentially causing them to reject transactions or blocks that should be considered valid, or accepting transactions and blocks which the rest of the network considers invalid.

The following rules are applied for all transactions:\\

## Data Types

All data items in Bitcoin Script are a byte sequence. Some operations interpret their parameters as numeric or boolean values and require the item to fulfil the specifications of those types. Some operations produce items on the stack which are valid numeric or boolean values.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 11.gif" alt=""><figcaption></figcaption></figure>

A byte sequence has a length and a value. The length of the byte sequence must be an integer greater or equal to zero and less than or equal to $$2^{32-1}$$(UINT32\_MAX).

The byte sequence of length zero is called the “null value”.

Any data item can be interpreted as a boolean value. If the data item consists entirely of bytes with value zero, or the data item is the null value, then the boolean value of the item is **false**. Otherwise, the boolean value of the item is **true**.

A data item can be interpreted as a numeric value. The numeric value is encoded in a byte sequence using little-endian notation. When script items are processed using opcodes that perform mathematical functions, the node will treat any byte sequence of up to 7500 bytes long as a numeric value, allowing for 'bignum' calculations to be performed in script.

## Formal Grammar for Bitcoin Script

The Formal Grammar for Bitcoin Script is set by node operators. This contains the full set of approved opcodes and their exact spelling and function.

It’s also worth highlighting the following features of this formal grammar:

* The complete script consists of two sections, the unlocking script (scriptSig) and the locking script (scriptPubKey). The locking script is from the transaction output that is being spent, while the unlocking script is included in the transaction input that is spending the output.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 12.gif" alt=""><figcaption></figcaption></figure>

* Current consensus rules state that an unlocking script can only contain the first 96 opcodes, which allow constants and data to be pushed onto the stack. This requirement is a part of the Validity of Script Consensus Rule, defined later.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 12A.gif" alt=""><figcaption></figcaption></figure>

* A branching operator (OP\_IF or OP\_NOTIF) must have a matching OP\_ENDIF.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 12B.gif" alt=""><figcaption></figcaption></figure>

* An OP\_ELSE can only be included between a branching operator and OP\_ENDIF pair. There can only be at most one OP\_ELSE between a branching operator and an OP\_ENDIF.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 12C.gif" alt=""><figcaption></figcaption></figure>

* OP\_RETURN may appear at any location in a valid script. The functionality of OP\_RETURN has been restored and is defined later in the section OP\_RETURN Functionality. Grammatically, any bytes after an OP\_RETURN that is not in a branch block are not evaluated and there are no grammatical requirements for those bytes.

Note that disabled operations are part of this grammar. A disabled operation is grammatically correct but will produce a failure if executed.

## Validity of Script Rule

The locking and unlocking scripts for every input of a transaction must be grammatically valid, as defined by the formal grammar rules from the previous page.

Also note that the scripts must be grammatically valid when they are spent. It is not required that the output scripts of a transaction are grammatically valid although it is highly recommended that client software implement this restriction as a policy.

The unlocking scripts used in transaction inputs may only contain PUSHDATA operations, as defined by the formal grammar above.

Currently, the following 5 opcodes are disabled: OP\_2MUL, OP\_2DIV, OP\_VER, OP\_VERIF, OP\_VERNOTIF yet will soon be enabled with the Chronicle Release.

## Numeric Value Size Rule

For a byte sequence to validly represent a numeric value, the length of the byte sequence must be less than or equal to 750,000 bytes. A byte sequence that is larger than this is a valid byte sequence but is not a valid numeric value.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 16.gif" alt=""><figcaption></figcaption></figure>

Note that while some operations require parameters to be valid numeric values, they may produce byte sequences which are not valid numeric values (for example, OP\_MUL may produce a byte sequence which is too large to validly represent a numeric value).

## Stack Memory Usage Rule

The stack memory usage consensus rule limits the amount of memory that can be used on the stacks. This rule is evaluated against the sum of the memory used by the stack and the alt-stack.

If the execution of the unlocking and locking script for an input uses more memory than defined in this rule, then the transaction is invalid.

<figure><img src="../../../.gitbook/assets/CHAPTER 2 GIF 17.gif" alt=""><figcaption></figcaption></figure>

The memory usage of a stack is calculated using a specific formula, so that it can be coordinated across software implementations. The formula for calculating the memory usage of a stack is:

```
usage = sum of (for each element: 32 + size in bytes of element)
```

where "size in bytes of element" is the size in bytes of the element when serialized in the Bitcoin Serialization Format.

This is a configurable consensus rule, with a default value that is formally unlimited but will in practice depend on the capabilities of the system that is evaluating the script.

**Miners are expected to reach consensus on this value and configure it manually.**

## Other Rules

There are some other less important, but equally set-in-stone rules which are checked. These include the sunsetting of Pay to Script Hash (P2SH), the return of the original OP\_RETURN functionality and the removal of many limits and restrictions that have previously been applied at the protocol level. Where required, node limits have been tuned to numbers only bounded by the hardware/software implementation of the node client, with configuration settings allowing each node operator to manage the in-use settings themselves. This is generally in loose agreement with the rest of the network. Node operators are free to use their own configurations, and to reach out to other known node enterprise organisations to ensure their blocks can be managed.
