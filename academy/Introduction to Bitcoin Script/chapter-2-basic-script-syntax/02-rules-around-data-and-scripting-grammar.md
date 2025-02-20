# 02 - Rules Around Data and Scripting Grammar

All data items in Bitcoin Script are a byte sequence. Some operations interpret their parameters as numeric or boolean values and require the item to fulfil the specifications of those types. Some operations produce items on the stack which are valid numeric or boolean values.

A byte sequence has a length and a value. The length of the byte sequence must be an integer greater or equal to zero and less than or equal to 2^32-1 (UINT32\_MAX).

When a value is being treated as an integer, the most significant bit of the value is used to represent sign, with 1 indicating a negative value, and 0 indicating a positive value. The magnitude of its value is the same regardless of the sign bit's status.

Hexadecimal values 0x80, 0x0080, 0x00000080 are treated by arithmetic opcodes as 'negative zero'. Note the little endian notation. A script that terminates with a negative zero value on its stack will fail.

The byte sequence of length zero is called a “null item”.

Any data item can be interpreted as a boolean value. If the data item consists entirely of bytes with value zero (including negative zero), or the data item is a null item, then the boolean value of the item is false. Otherwise, the boolean value of the item is true.

A data item can be interpreted as a numeric value. The numeric value is encoded in a byte sequence using little-endian notation. When script items are processed using opcodes that perform mathematical functions, the node will treat any byte sequence of up to 750,000 bytes length as a numeric value, allowing for 'bignum' calculations to be performed in script.

### Formal Grammar for Bitcoin Script

The Formal Grammar for Bitcoin Script is defined as part of the Bitcoin protocol. This contains the full set of approved opcodes and their exact spelling and function.

#### Script components

The complete script consists of two sections, the unlockScript (scriptSig) and the lockScript (scriptPubKey). The locking script is from the transaction output that is being spent, while the unlocking script is included in the transaction input that is spending the output.

<figure><img src="../.gitbook/assets/scriptsig.gif" alt=""><figcaption></figcaption></figure>

#### Valid opcodes for unlockScript elements

Current consensus rules state that an unlockScript can only contain the first 96 opcodes, which allow constants and data to be pushed onto the stack. This requirement is a part of Validity of Script Consensus Rule, defined later.

<figure><img src="../.gitbook/assets/unlockingscript.gif" alt=""><figcaption></figcaption></figure>

#### IF loops

A branching operator (OP\_IF or OP\_NOTIF) must have a matching OP\_ENDIF.

<figure><img src="../.gitbook/assets/IFNOTIF.gif" alt=""><figcaption></figcaption></figure>

An OP\_ELSE can only be included between a branching operator and OP\_ENDIF pair. There can only be at most one OP\_ELSE between a branching operator and an OP\_ENDIF.

<figure><img src="../.gitbook/assets/opelse.gif" alt=""><figcaption></figcaption></figure>

#### OP\_RETURN

OP\_RETURN may appear at any location in a valid script. The functionality of OP\_RETURN has been restored and is defined later in the section on opcodes. Grammatically, any bytes after an OP\_RETURN that is not in a branch block are not evaluated and there are no grammatical requirements for those bytes.

Note that disabled operations are part of this grammar. A disabled operation is grammatically correct but will produce a failure if executed.

### Validity of Script Rule

The inputs and outputs of a transaction must be grammatically valid, as defined by the formal grammar rules from the previous page.

The unlocking scripts used in transaction inputs may only contain PUSHDATA operations, as defined by the formal grammar above.

Currently, the following 5 opcodes are disabled: OP\_2MUL, OP\_2DIV, OP\_VER, OP\_VERIF, OP\_VERNOTIF.

### Numeric Value Size Rule

For a byte sequence to validly represent a numeric value, the length of the byte sequence must be less than or equal to 750,000 bytes. A byte sequence that is larger than this is a valid byte sequence but is not a valid numeric value.

<figure><img src="../.gitbook/assets/numericvaluesize.gif" alt=""><figcaption><p>This animation is INCORRECT and must be fixed both here and in Introduction to Infrastructure</p></figcaption></figure>

Note that while some operations require parameters to be valid numeric values, they may produce byte sequences which are not valid numeric values (for example, OP\_MUL may produce a byte sequence which is too large to validly represent a numeric value).

### Clean Stack Rule

The Clean Stack Rule requires that a valid solution leave just one non-zero value on the stack. This means you must remove any other data items from the stack in order to be able to solve a script correctly.

The clean stack rule is a later addition to the node client system and is not a fixed element of the Bitcoin protocol. It is possible that this rule may be removed in future.

### Other rules

There are a multitude of other rules that define usage of the Bitcoin network, which are both set protocol level rules that cannot change, and flexible, consensus generated usage limits that give node operators the flexibility to create a flexible and useful environment for network users. For a deeper insight into these rules, please consider doing Introduction to Bitcoin Infrastructure.
