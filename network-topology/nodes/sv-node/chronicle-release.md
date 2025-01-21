# Chronicle Release



## Background

The Chronicle release is a follow-up of [the Genesis upgrade in 2020](https://www.bsvblockchain.org/releases/changes-for-the-genesis-upgrade) which restored many aspects of the Bitcoin protocol that had been modified in previous software updates, including the removal of most limit-based consensus rules, replacing them with miner configurable settings that give node operators the autonomy needed to set their limits as they determine practical.

The changes introduced in the Chronicle release are detailed in the sections below, outlining the removal of specific restrictions and requirements within the Bitcoin protocol to allow for greater flexibility and configurability for node operators.

## Release Summary

To summarize the Chronicle release, the following points should be outlined:

* **Restoration of Bitcoin's Original Protocol**: The Chronicle release aims to restore the original Bitcoin protocol by re-installing specific opcodes and removing listed restrictions, while also balancing stability for businesses that depend on the current state.
* **Transaction Digest Algorithms**: To address concerns around transaction malleability, the BSV Blockchain will support both the original OTDA (Original Transaction Digest Algorithm) and the BIP143 algorithm (with SIGHASH\_FORKID), ensuring compatibility and flexibility for developers and users. The OTDA algorithm remains sufficient to reintroduce relaxed malleability rules as needed.
* **Selective Malleability Restrictions:** The application of malleability restrictions will depend on the interaction of the FORKID and RELAX sighash bits. Transactions signed without SIGHASH\_FORKID (or with RELAX enabled) will allow relaxed rules, removing strict enforcement of malleability-related constraints. This flexibility is agnostic to the number of signatures in a transaction.
* **Business Impact and Flexibility:** Existing users and applications using the BIP143 digest (with SIGHASH\_FORKID) will remain unaffected by the Chronicle update. For developers aiming to leverage the protocol's original behavior, the Chronicle release offers the option to adopt relaxed malleability rules via the OTDA algorithm or the RELAX sighash bit. These changes ensure minimal disruption while enhancing flexibility.

## Removal of Restrictions

As mentioned above, in the Chronicle release, malleability rules are being adjusted under the concept of "Relax." These changes depend on the interplay of the `FORKID` and `RELAX` Sighash bits. By default, users who do nothing will retain the current behavior (with `FORKID` active and `RELAX` disabled). To align with the original protocol philosophy, the OTDA digest algorithm will reintroduce relaxed rules where needed. It is also important to mention that It doesn't matter if the transaction configuration involves multi-signatures within a script or across multiple inputs. This approach ensures the protocol integrity while enabling optional adoption of relaxed malleability constraints. The table below describes all possible scenarios and their expected results: \


<table data-header-hidden><thead><tr><th width="199">Input/Transaction Config</th><th>FORK_ID</th><th>RELAX</th><th>TDA</th><th>Malleability Rules Enforcement</th></tr></thead><tbody><tr><td>Single input, single signature</td><td>0</td><td>0</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Single input, single signature</td><td>0</td><td>1</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Single input, single signature</td><td>1</td><td>0</td><td>NTDA</td><td>Strict</td></tr><tr><td>Single input, single signature</td><td>1</td><td>1</td><td>NTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>All 0</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>All 1</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>All 0</td><td>NTDA</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>All 1</td><td>NTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 0</td><td>Mixed</td><td>OTDA</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>All 1</td><td>Mixed</td><td>NTDA</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>All 0</td><td>Mixed</td><td>Strict</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>All 1</td><td>Mixed</td><td>Relaxed</td></tr><tr><td>Multiple signatures across one or more inputs.</td><td>Mixed</td><td>Mixed</td><td>Mixed</td><td>Strict</td></tr></tbody></table>

### Minimal Encoding Requirement  Removal

Update the script processing so that numbers are not required to be expressed using the minimum number of bytes.

* Remove `SCRIPT_VERIFY_MINIMALDATA` and associated logic from the software
* Remove `MinimallyEncoded()` and `IsMinimallyEncoded(..)` methods
* Remove `bsv::MinimallyEncoded()` and `bsv::IsMinimallyEncoded(..)` functions.

### Limit on the Size of Script Numbers Removal

The configuration parameter `maxscriptnumlengthpolicy` limits the size of numbers used in scripts. The default is 10,000 bytes with 0 indicating no external limit. &#x20;

The `maxscriptnumlengthpolicy` configuration parameter default will be changed to unlimited (0).

There are to be no restrictions on the max size of script numbers.

### Low S Requirement for Signatures  Removal&#x20;

Remove the requirement that the signature must be the low “s” value. See [BIP-146](https://github.com/bitcoin/bips/blob/master/bip-0146.mediawiki) 

### Clean Stack Policy Removal&#x20;

The script engine should not require that the stack has only a single element on it on completion of the execution of a script.  &#x20;

Remove `SCRIPT_VERIFY_CLEANSTACK` and associated logic from the software. 

### Data Only in Unlocking Script Removal  &#x20;

The node will no longer require that unlocking scripts only include data and associated pushdata op codes. Functional Opcodes will be permitted. \
\
It should be noted that the unlocking script is evaluated, the resulting main stack is kept, but the conditional and alt stacks are cleared. The locking script is then evaluated. Therefore any OP\_RETURN use in the unlocking script simply leads to the end of unlocking script execution - not script execution as a whole.\
\
There are specific use cases for "showing your work" like this in the unlocking script. Typically it is not necessary to include intermediate values, and simply passing the result of any calculation as push data would be sufficient.

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

The rest of the Opcodes remain intact; their description can be found in the [corresponding document](https://docs.bsvblockchain.org/protocol/transaction-lifecycle/opcodes-used-in-script).&#x20;

