# Chronicle Release

## Background

The Chronicle release is a follow-up of [the Genesis upgrade in 2020](https://www.bsvblockchain.org/releases/changes-for-the-genesis-upgrade) which restored many aspects of the Bitcoin protocol that had been modified in previous software updates, including the removal of most limit-based consensus rules, replacing them with miner configurable settings that give node operators the autonomy needed to set their limits as they determine practical.

The changes introduced in the Chronicle release are detailed in the sections below, outlining the removal of specific restrictions and requirements within the Bitcoin protocol to allow for greater flexibility and configurability for node operators.

## Release Summary

To summarize the Chronicle release, the following points should be outlined:

* **Restoration of Bitcoin's Original Protocol**: The Chronicle release aims to restore the original Bitcoin protocol by re-installing specific opcodes and removing listed restrictions, while also balancing stability for businesses that depend on the current state.
* **Transaction Digest Algorithms**: The BSV Blockchain will now support the Original Transaction Digest Algorithm (OTDA), in addition to the current BIP143 digest algorithm, ensuring compatibility and flexibility for developers and users. This restores the original Bitcoin transaction digest algorithm, enabling developers to have greater flexibility in utilizing Bitcoin Script. Usage of the OTDA will require setting the new CHRONICLE \[`0x20`] sighash flag.
* **Selective Malleability Restrictions:** The Chronicle Release removes restrictions that were put in place to prevent transaction malleability. To address concerns about the reintroduction of sources of transaction malleability, the application of malleability restrictions will depend on the usage of the new CHRONICLE \[`0x20`] sighash flag. Transactions signed with CHRONICLE enabled will allow relaxed rules, removing strict enforcement of malleability-related constraints. This flexibility is agnostic to the number of signatures in a transaction. The restrictions relevant to the CHRONICLE flag are:
  * Minimal Encoding Requirement
  * Low S Requirement for Signatures
  * NULLFAIL and NULLDUMMY check for `OP_CHECKSIG` and `OP_CHECKMULTISIG`
  * MINIMALIF Requirement for `OP_IF` and `OP_NOTIF`
  * Clean Stack Requirement
  * Data Only in Unlocking Script Requirement
* **Business Impact and Flexibility:** In line with the BSV Blockchain's commitment to stability, existing users and applications using the BIP143 digest (without CHRONICLE) will remain unaffected by the Chronicle update. For developers aiming to leverage the original protocol's behavior, the Chronicle release offers the option to utilize the Original Transaction Digest Algorithm (OTDA) and the flexibility to determine malleability-related restrictions for transactions.

## 1. Transaction Digest Algorithms and Selective Malleability Restrictions

As mentioned above, in the Chronicle release, malleability-related rules are being adjusted dependent on how transactions are signed.

These changes depend on the usage of the new `CHRONICLE` \[`0x20`] Sighash bit. By default, users who do nothing will retain the current behavior (with `CHRONICLE` disabled). The OTDA will reintroduce relaxed rules where needed. It is also important to mention that it doesn't matter if the transaction configuration involves multiple signatures within a script or across multiple inputs. This approach enables optional adoption of relaxed malleability constraints. The table below describes all possible scenarios and their expected results:

<table><thead><tr><th width="199">Input/Transaction Config</th><th>CHRONICLE</th><th>TDA</th><th>Malleability Rules Enforcement</th></tr></thead><tbody><tr><td>Single input, single signature</td><td>0</td><td>BIP143</td><td>Strict</td></tr><tr><td>Single input, single signature</td><td>1</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>BIP143</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>Mixed</td><td>Strict</td></tr></tbody></table>

### Minimal Encoding Requirement Removal

Update the script processing so that numbers are not required to be expressed using the minimum number of bytes.

* Remove `SCRIPT_VERIFY_MINIMALDATA` and associated logic from the software
* Remove `MinimallyEncoded()` and `IsMinimallyEncoded(..)` methods
* Remove `bsv::MinimallyEncoded()` and `bsv::IsMinimallyEncoded(..)` functions.

### Limit on the Size of Script Numbers Removal

The configuration parameter `maxscriptnumlengthpolicy` limits the size of numbers used in scripts. The default is 10,000 bytes with 0 indicating no external limit. 

The `maxscriptnumlengthpolicy` configuration parameter default will be changed to unlimited (0).

There are to be no restrictions on the max size of script numbers.

### Low S Requirement for Signatures Removal

Remove the requirement that the signature must be the low “s” value. See [BIP-146](https://github.com/bitcoin/bips/blob/master/bip-0146.mediawiki) 

### NULLFAIL and NULLDUMMY check for `OP_CHECKSIG` and `OP_CHECKMULTISIG` Removal

Remove the requirement that if an `OP_CHECKSIG` is trying to return a `FALSE` value to the stack, that the relevant signature must be an empty byte array. Also remove the requirement that if an `OP_CHECKMULTISIG` is trying to return a `FALSE` value to the stack, that all signatures passing to this `OP_CHECKMULTISIG` must be empty byte arrays.

Remove the requirement that the dummy stack item used in `OP_CHECKMULTISIG` is an empty byte array. 

The following examples are the combined results of the removal of the LOW_S and NULLFAIL rules.

Notation:

```
  CO       : curve order = 0xFFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE BAAEDCE6 AF48A03B BFD25E8C D0364141
  HCO      : half curve order = CO / 2 = 0x7FFFFFFF FFFFFFFF FFFFFFFF FFFFFFFF 5D576E73 57A4501D DFE92F46 681B20A0
  P1, P2   : valid, serialized, public keys
  S1L, S2L : low S value signatures using respective keys P1 and P2 (1 ≤ S ≤ HCO)
  S1H, S2H : signatures with high S value  using respective keys P1 and P2 (HCO < S < CO)
  F        : any BIP66-compliant non-empty byte array but not a valid signature
```

These scripts will return a `TRUE` to the stack as before:

```
  S1L P1 CHECKSIG
  0 S1L S2L 2 P1 P2 2 CHECKMULTISIG
```

These scripts will return a `FALSE` to the stack as before:

```
  0 P1 CHECKSIG
  0 0 0 2 P1 P2 2 CHECKMULTISIG
```

These scripts that previously failed immediately will return `TRUE` under the Chronicle rules:

```
  S1H P1 CHECKSIG
  0 S1H S2L 2 P1 P2 2 CHECKMULTISIG
  0 S1L S2H 2 P1 P2 2 CHECKMULTISIG
  0 S1H S2H 2 P1 P2 2 CHECKMULTISIG
  F S1H S2H 2 P1 P2 2 CHECKMULTISIG
```

These scripts that previously failed immediately will return `FALSE` under the Chronicle rules:

```
  F P1 CHECKSIG
  0 S2L S1L 2 P1 P2 2 CHECKMULTISIG
  0 S1L F   2 P1 P2 2 CHECKMULTISIG
  0 F   S2L 2 P1 P2 2 CHECKMULTISIG
  0 S1L 0   2 P1 P2 2 CHECKMULTISIG
  0 0   S2L 2 P1 P2 2 CHECKMULTISIG
  0 F   0   2 P1 P2 2 CHECKMULTISIG
  0 0   F   2 P1 P2 2 CHECKMULTISIG
  F 0   F   2 P1 P2 2 CHECKMULTISIG
```
### MINIMALIF Requirement Removal

The input argument to the `OP_IF` and `OP_NOTIF` opcodes is no longer required to be exactly 1 (the one-byte vector with value 1) to be evaluated as TRUE. 

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
