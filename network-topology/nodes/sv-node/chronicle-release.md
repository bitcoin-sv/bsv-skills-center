# Chronicle Release

The Chronicle release is a follow-up of [the Genesis upgrade in 2020](https://www.bsvblockchain.org/releases/changes-for-the-genesis-upgrade) which restored many aspects of the Bitcoin protocol that had been modified in previous software updates, including the removal of most limit-based consensus rules, replacing them with miner configurable settings that give node operators the autonomy needed to set their limits as they determine practical.

The changes introduced in the Chronicle release are detailed in the sections below, outlining the removal of specific restrictions and requirements within the Bitcoin protocol to allow for greater flexibility and configurability for node operators.

## 1. Remove Restrictions &#x20;

### Remove Minimal Encoding Requirement 

Update the script processing so that there is no requirement for numbers to be expressed using the minimum number of bytes.

* Remove `SCRIPT_VERIFY_MINIMALDATA` and associated logic from the software
* Remove `MinimallyEncoded()` and `IsMinimallyEncoded(..)` methods
* Remove `bsv::MinimallyEncoded()` and `bsv::IsMinimallyEncoded(..)` functions.

### Remove Limits on the size of script numbers

The configuration parameter `maxscriptnumlengthpolicy` limits the size of numbers used in scripts. The default is 10,000 bytes with 0 indicating no external limit. &#x20;

The `maxscriptnumlengthpolicy` configuration parameter default will be changed to unlimited (0).

The consensus max script number length is `MAX_SCRIPT_NUM_LENGTH_AFTER_GENESIS` bytes = 750,000 bytes. There is no associated configuration parameter. 

There is to be no restrictions on the max size of script numbers.  &#x20;

All logic associated with `MAX_SCRIPT_NUM_LENGTH_AFTER_GENESIS` is to be removed 

### Remove Low S requirement for signatures  &#x20;

Remove the requirement that the signature must be the low “s” value. See [BIP-146](https://github.com/bitcoin/bips/blob/master/bip-0146.mediawiki) 

### Remove Clean Stack Policy &#x20;

The script engine should not require that the stack has only a single element on it on completion of the execution of a script.  &#x20;

Remove `SCRIPT_VERIFY_CLEANSTACK` and associated logic from the software. 

### Remove PUSHDATA only requirement in Unlocking Scripts  &#x20;

The current version of the node requires that most opcodes are not allowed in unlocking scripts. The node software automatically reads opcodes as data pushes.

## 2. Opcodes 

The opcodes listed below will be re-instated.  &#x20;

* Implementation should exhibit standard behavior. i.e. If the opcode produces an error, the code should immediately return the result of a call to set\_error with the appropriate error message and code.
* Opcodes do not check if the supplied operands are of the expected type. Rather if an opcode expects a particular data type on top of the stack (tos), it will interpret whatever it finds as that data type.
* If an opcode expects values on the stack and they are not present, then an error should be returned. 

### OP\_VER &#x20;

Opcode number 98 , hex `0x62`

`OP_VER` pushes the executing transaction’s version onto the stack. The transaction version is the first four bytes of the transaction containing the executing script. 

```
Inputs: none
Outputs: tos = transaction version
```

### OP\_VERIF &#x20;

Opcode number 101 , hex `0x65`

Compares the `tos` with the executing transaction’s version as part of the following traditional if-then-else expression:  `OP_VERIF [statements] [OP_ELSE [statements]] OP_ENDIF` &#x20;

Logically equivalent to `OP_VER OP_IF`.

```
Inputs: comparison value → tos.  
```

### OP\_VERNOTIF &#x20;

Opcode number 102, hex `0x66`

Compares the `tos` with the executing transaction’s version as part of the following expression:  \
`OP_VERNOTIF [statements] [OP_ELSE [statements]] OP_ENDIF`

Logically equivalent to `OP_VER OP_NOTIF`

```
Inputs: comparison value → tos
```

### OP\_SUBSTR &#x20;

Originally opcode number 127. Now has value 179, hex `0xb3`

Returns substring defined by start index and length.

A zero-length source string generates an error.  A negative length generates an error. If the specified length is greater than the source string, the opcode generates an error.&#x20;

E.g. executing the script below would remove the desired length and start index of the substring. &#x20;

The string “BSV Blockchain” would be replaced by “Block” on the top of the stack.

```
"BSV Blockchain" OP_4 OP_5 OP_SUBSTR   
```

```
Inputs:   
desired length of substring → tos  
start index of substring → tos-1  
string → tos-2.  
Output: tos = string [start index, size]  
```

### OP\_LEFT &#x20;

Originally opcode number 128. Now has value 180, hex `0xb4`

Produces a substring consisting only of the specified number of leftmost characters. &#x20;

E.g. Executing the script below would leave “BSV” on the top of the stack.

```
"BSV Blockchain" OP_3 OP_LEFT
```

Zero-length strings are allowed. &#x20;

```
Inputs:   
tos → desired length of substring.  
tos-1 → string.  
Output: tos = string [0, substring length - 1]  
```

### OP\_RIGHT &#x20;

Originally opcode number 129. Now has value 181, hex `0xb5`

Produces a substring consisting only of the specified number of rightmost characters. &#x20;

E.g. Executing the script below would leave “chain” on the top of the stack.

```
"BSV Blockchain" OP_5 OP_RIGHT
```

Zero-length strings are allowed. &#x20;

```
Inputs:   
tos → desired length of substring.  
tos-1 → string.  
Output:
start index = string.length – desired substring length - 1  
tos = string [start index, string length - 1]  
```

### OP\_2MUL &#x20;

Opcode number 141, hex `0x8d`

Multiplies the number on the top of the stack by 2.

```
Inputs: The number to be multiplied by 2 → tos 
Output: tos = input number x 2  
```

### OP\_2DIV &#x20;

Opcode number 142, `0x8e`

Divides the number on the top of the stack by 2.

```
Inputs: The number to be divided by 2 → tos
Output: tos = Input number / 2 
```
