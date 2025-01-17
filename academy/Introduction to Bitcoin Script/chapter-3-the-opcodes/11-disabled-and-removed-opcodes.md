# 11 - Disabled and Removed Opcodes

Due to changes made to the scripting language between 2010 and 2018, there are a small number of opcodes that have been disabled or permanently removed from the Bitcoin scriping language.

Removed opcodes are those who's hexadecimal instruction code has been re-used for opcodes with different functionality. The functionality expressed by all removed opcodes can be replicated with combinations of both new and existing opcodes, albeit with some cost in terms of the size of the script in certain cases. Since these opcodes no longer appear in the opcode set, we will not look any further at these.

Disabled opcodes retain their hexadecimal codes and are listed in the opcode set, however transactions that try to create outputs that use them are considered invalid and will be rejected by the network. There is no schedule for their re-introduction into the Bitcoin protocol, and the disablement may be permanent however the functionality they enabled is can be generated using combinations of other available opcodes.

### OP\_2MUL, OP\_2DIV

OP\_2MUL and OP\_2DIV provide shortcuts for performing arithmetic functions on the stack.

To replicate the functionality of OP\_2MUL, the following snippet can be used:

`OP_2 OP_MUL`

To replicate the functionality of OP\_2DIV, the following snippet can be used:

`OP_2 OP_DIV`

### OP\_VER, OP\_VERIF, OP\_VERNOTIF

OP\_VER's original functionality pushes the version number of the transaction onto the top of the stack. The technique required to replicate the function of this opcode is complicated, and will be covered in Chapter 5.

OP\_VERIF's original functionality compares the version number of the transaction to the value on top of the stack, and causes the script to enter an IF loop if the transaction version is the same as the value on top of the stack. The technique required to replicate the function of this opcode is complicated, and will be covered in Chapter 5.

OP\_VERNOTIF's original functionality compares the version number of the transaction to the value on top of the stack, and causes the script to enter an IF loop if the transaction version is different to the value on top of the stack. The technique required to replicate the function of this opcode is complicated, and will be covered in Chapter 5.
