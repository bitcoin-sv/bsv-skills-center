# Validity of Script Rule

{% embed url="https://youtu.be/yo5pnLyjqTI" %}

The locking and unlocking scripts for every input of a transaction must be grammatically valid, as defined by the formal grammar rules from the previous page.

Also note that the scripts must be grammatically valid when they are spent. It is not required that the output scripts of a transaction are grammatically valid although it is highly recommended that client software implement this restriction as a policy.

The unlocking scripts used in transaction inputs may only contain PUSHDATA operations, as defined by the formal grammar above.

Currently, the following 5 opcodes are disabled: OP\_2MUL, OP\_2DIV, OP\_VER, OP\_VERIF, OP\_VERNOTIF.
