# Chronicle Release

## Background

The Chronicle release is a follow-up of [the Genesis upgrade in 2020](https://www.bsvblockchain.org/releases/changes-for-the-genesis-upgrade) which restored many aspects of the Bitcoin protocol that had been modified in previous software updates, including the removal of most limit-based consensus rules, replacing them with miner configurable settings that give node operators the autonomy needed to set their limits as they determine practical.

The changes introduced in the Chronicle release are detailed in the sections below, outlining the removal of specific restrictions and requirements within the Bitcoin protocol to allow for greater flexibility and configurability for node operators.

## Release Summary

To summarize the Chronicle release, the following points should be outlined:

* **Restoration of Bitcoin's Original Protocol**: The Chronicle release aims to restore the original Bitcoin protocol by re-installing specific opcodes and removing listed restrictions, while also balancing stability for businesses that depend on the current state.
* **Transaction Digest Algorithms**: The BSV Blockchain will now support both the Original Transaction Digest Algorithm (OTDA) and the BIP143 digest algorithm (with SIGHASH\_FORKID), ensuring compatibility and flexibility for developers and users. This restores the original Bitcoin transaction digest algorithm, enabling developers to have greater flexibilty in utilizing Bitcoin Script.
* **Selective Malleability Restrictions:** The Chronicle Release removes restrictions that were put in place to prevent transaction malleability. To address concerns about the reintroduction of sources of transaction malleability, the application of malleability restrictions will depend on the interaction of the FORKID \[`0x40`] and RELAX \[`0x20`] sighash bits. Transactions signed without SIGHASH\_FORKID (or with RELAX enabled) will allow relaxed rules, removing strict enforcement of malleability-related constraints. This flexibility is agnostic to the number of signatures in a transaction. The restrictions relevant to the RELAX flag are:
  * Minimal Encoding Requirement
  * Low S Requirement for Signatures
  * Clean Stack Requirement
  * Data Only in Unlocking Script Requirement
* **Business Impact and Flexibility:** In line with the BSV Blockchain's commitment to stability, existing users and applications using the BIP143 digest (with SIGHASH\_FORKID) will remain unaffected by the Chronicle update. For developers aiming to leverage the original protocol's behavior, the Chronicle release offers the option to utilize the Original Transaction Digest Algorithm (OTDA) and the flexibility to determine malleability-related restrictions for transactions.

## 1. Transaction Digest Algorithms and Selective Malleability Restrictions

As mentioned above, in the Chronicle release, malleability rules are being adjusted under the concept of "Relax."

These changes depend on the interplay of the `FORKID` \[`0x40`] and `RELAX` \[`0x20`] Sighash bits. By default, users who do nothing will retain the current behavior (with `FORKID` active and `RELAX` disabled). The OTDA will reintroduce relaxed rules where needed. It is also important to mention that it doesn't matter if the transaction configuration involves multiple signatures within a script or across multiple inputs. This approach enables optional adoption of relaxed malleability constraints. The table below describes all possible scenarios and their expected results:

<table><thead><tr><th width="199">Input/Transaction Config</th><th>FORK_ID</th><th>RELAX</th><th>TDA</th><th>Malleability Rules Enforcement</th></tr></thead><tbody><tr><td>Single input, single signature</td><td>0</td><td>0</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Single input, single signature</td><td>0</td><td>1</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Single input, single signature</td><td>1</td><td>0</td><td>BIP143</td><td>Strict</td></tr><tr><td>Single input, single signature</td><td>1</td><td>1</td><td>BIP143</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>All 0</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>All 1</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>All 0</td><td>BIP143</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>All 1</td><td>BIP143</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>Mixed</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>Mixed</td><td>BIP143</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>All 0</td><td>Mixed</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>All 1</td><td>Mixed</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>Mixed</td><td>Mixed</td><td>Strict</td></tr></tbody></table>

### Minimal Encoding Requirement  Removal

Update the script processing so that numbers are not required to be expressed using the minimum number of bytes.

* Remove `SCRIPT_VERIFY_MINIMALDATA` and associated logic from the software
* Remove `MinimallyEncoded()` and `IsMinimallyEncoded(..)` methods
* Remove `bsv::MinimallyEncoded()` and `bsv::IsMinimallyEncoded(..)` functions.

### Limit on the Size of Script Numbers Removal

The configuration parameter `maxscriptnumlengthpolicy` limits the size of numbers used in scripts. The default is 10,000 bytes with 0 indicating no external limit. 

The `maxscriptnumlengthpolicy` configuration parameter default will be changed to unlimited (0).

There are to be no restrictions on the max size of script numbers.

### Low S Requirement for Signatures  Removal

Remove the requirement that the signature must be the low “s” value. See [BIP-146](https://github.com/bitcoin/bips/blob/master/bip-0146.mediawiki) 

### Clean Stack Policy Removal

The script engine should not require that the stack has only a single element on it on completion of the execution of a script.  

Remove `SCRIPT_VERIFY_CLEANSTACK` and associated logic from the software. 

### Data Only in Unlocking Script Removal  

The node will no longer require that unlocking scripts only include data and associated pushdata op codes. Functional Opcodes will be permitted.

It should be noted that the unlocking script is evaluated, the resulting main stack is kept, but the conditional and alt stacks are cleared. The locking script is then evaluated. Therefore any OP\_RETURN use in the unlocking script simply leads to the end of unlocking script execution - not script execution as a whole.

There are specific use cases for "showing your work" like this in the unlocking script. Typically it is not necessary to include intermediate values, and simply passing the result of any calculation as push data would be sufficient.

## 2. Opcodes 

The opcodes listed below will be re-instated.  

* Implementation should exhibit standard behavior. i.e. If the opcode produces an error, the code should immediately return the result of a call to set\_error with the appropriate error message and code.
* Opcodes do not check if the supplied operands are of the expected type. Rather if an opcode expects a particular data type on top of the stack (tos), it will interpret whatever it finds as that data type.
* If an opcode expects values on the stack and they are not present, then an error should be returned. 

### OP\_VER 

Opcode number 98 , hex `0x62`

`OP_VER` pushes the executing transaction’s version onto the stack. The transaction version is the first four bytes of the transaction containing the executing script. 

```
Inputs: none
Outputs: tos = transaction version
```

### OP\_VERIF 

Opcode number 101 , hex `0x65`

Compares the `tos` with the executing transaction’s version as part of the following traditional if-then-else expression:  `OP_VERIF [statements] [OP_ELSE [statements]] OP_ENDIF` 

Logically equivalent to `OP_VER OP_IF`.

```
Inputs: comparison value → tos.  
```

### OP\_VERNOTIF 

Opcode number 102, hex `0x66`

Compares the `tos` with the executing transaction’s version as part of the following expression: \
`OP_VERNOTIF [statements] [OP_ELSE [statements]] OP_ENDIF`

Logically equivalent to `OP_VER OP_NOTIF`

```
Inputs: comparison value → tos
```

### OP\_SUBSTR 

Originally opcode number 127. Now has value 179, hex `0xb3`

Returns substring defined by start index and length.

A zero-length source string generates an error.  A negative length generates an error. If the specified length is greater than the source string, the opcode generates an error.

E.g. executing the script below would remove the desired length and start index of the substring. 

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

### OP\_LEFT 

Originally opcode number 128. Now has value 180, hex `0xb4`

Produces a substring consisting only of the specified number of leftmost characters. 

E.g. Executing the script below would leave “BSV” on the top of the stack.

```
"BSV Blockchain" OP_3 OP_LEFT
```

Zero-length strings are allowed. 

```
Inputs:   
tos → desired length of substring.  
tos-1 → string.  
Output: tos = string [0, substring length - 1]  
```

### OP\_RIGHT 

Originally opcode number 129. Now has value 181, hex `0xb5`

Produces a substring consisting only of the specified number of rightmost characters. 

E.g. Executing the script below would leave “chain” on the top of the stack.

```
"BSV Blockchain" OP_5 OP_RIGHT
```

Zero-length strings are allowed. 

```
Inputs:   
tos → desired length of substring.  
tos-1 → string.  
Output:
start index = string.length – desired substring length - 1  
tos = string [start index, string length - 1]  
```

### OP\_2MUL 

Opcode number 141, hex `0x8d`

Multiplies the number on the top of the stack by 2.

```
Inputs: The number to be multiplied by 2 → tos 
Output: tos = input number x 2  
```

### OP\_2DIV 

Opcode number 142, `0x8e`

Divides the number on the top of the stack by 2.

```
Inputs: The number to be divided by 2 → tos
Output: tos = Input number / 2 
```

The rest of the Opcodes remain intact; their description can be found in the [corresponding document](https://docs.bsvblockchain.org/protocol/transaction-lifecycle/opcodes-used-in-script).
