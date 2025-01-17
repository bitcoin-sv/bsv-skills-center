# 03 - IF Loops

Flow control opcodes are opcodes that allow a script to either execute or ignore particular sections of code, or to terminate the script process depending on the value of the topmost stack items.

There are a variety of OPCODES available to trigger entry into IF loops including:

`OP_IF, OP_NOTIF, OP_ELSE`



### IF / NOTIF statements

IF statements are used to allow Bitcoin script to do comparative analysis on stack data items to control entry into IF loops. IF loops are the only means provided in Bitcoin script to perform different operations depending on previous processing.

The format of a simple IF loop is as follows:

`<Expression>`

`OP_IF`

&#x20;   `<True action>`

`OP_ENDIF`

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-IFAnimation (2).gif" alt=""><figcaption></figcaption></figure>

In this example, if the operations performed in `<expression>` leave a non-zero item at the top of the stack, then the code in `<True action>` will be executed. Otherwise the script will jump to the opcode immediately after `OP_ENDIF`.

The alternative to `OP_IF` is `OP_NOTIF`.&#x20;

`<Expression>`

`OP_NOTIF`

&#x20;   `<False action>`

`OP_ENDIF`

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-NOTIFAnimation.gif" alt=""><figcaption></figcaption></figure>

When using `OP_NOTIF`, if the operations performed in `<expression>` leave a zero-value item at the top of the stack, then the code in `<False action>` will be executed. Otherwise the script will jump to the opcode immediately after `OP_ENDIF`.

Bitcoin grammar rules require that every `OP_IF / OP_NOTIF` must have a corresponding `OP_ENDIF`. Transactions that try to create outputs that do not adhere to this scripting rule are considered invalid and will not be accepted by the network.

### Using OP\_ELSE

Any IF loop can contain an ELSE statement which will cause the script to branch into one of two paths depending on the outcome of the expression being evaluated.

`<Expression>`

`OP_IF`

&#x20;   `<True action>`

`OP_ELSE`

&#x20;   `<False action>`

`OP_ENDIF`

### Multi-condition loops / Case statements

Using OP\_ELSE, IF loops can be nested allowing for complex nested functions to be developed. This allows for similar functionality to a case statement to be implemented.

`<Case 1 check>`

`OP_IF`

&#x20;   `<When 1 action>`

`OP_ELSE`

&#x20;   `<Case 2 check>`

&#x20;   `OP_IF`

&#x20;       `<When 2 action>`

&#x20;   `OP_ELSE`

&#x20;       `<Else action>`

&#x20;   `OP_ENDIF`

`OP_ENDIF`

<figure><img src="../.gitbook/assets/BSVA-BitcoinScript_Chapter3-IFELSEAnimation.gif" alt=""><figcaption></figcaption></figure>

An alternative method to nested IF loops is repeating IF loops in the code, although care must be taken to ensure that any 'ELSE' case is captured in an IF loop separately.

`<Case 1 check>`

`OP_IF`

&#x20;   `<When 1 action>`

`OP_ENDIF`

`<Case 2 check>`

`OP_IF`

&#x20;   `<When 2 action>`

`OP_ENDIF`

`<else check>`

`OP_IF`

&#x20;   `<Else action>`

`OP_ENDIF`

