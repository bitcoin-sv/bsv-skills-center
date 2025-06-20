# Module 6: Advanced Locking and Unlocking in Bitcoin Transactions

This module dives into the advanced mechanics of locking (lockScript) and unlocking (unlockScript) within Bitcoin SV, emphasizing how these scripts securely control access to Spendable Transaction Outputs (STOs). Building on the analogy of STOs as “envelopes” within a transaction "mail bag," we explore Bitcoin’s virtual machine (VM) and the stack-based processing that verifies transactions. By examining lockScript and unlockScript logic, learners will see how businesses can employ versatile scripts for applications beyond conventional payments, enabling secure, conditional, and flexible access to digital assets on the blockchain.

***

#### Chapter 1: Fundamental Principles of Locking and Unlocking with Bitcoin Script

**1.1 Overview of lockScript and unlockScript Roles**

**Locking and Unlocking Scripts**

* **lockScript (scriptPubKey):** The lockScript defines the conditions for spending an STO. It acts like a “seal” on an envelope, specifying the cryptographic conditions under which the STO can be accessed.
* **unlockScript (scriptSig):** The unlockScript contains data to satisfy these conditions, “unlocking” the STO when valid. Together, these scripts ensure only authorized entities can spend the STO.

**Example Standard lockScript (Pay-to-Public-Key-Hash, P2PKH):**\
This script model checks for ownership through a signature and a public key, ensuring the sender can authorize spending of the STO.

```typescript
typescriptCopy code// Example lockScript for P2PKH
const lockScript = bsv.Script.fromASM(
    "OP_DUP OP_HASH160 <publicKeyHash> OP_EQUALVERIFY OP_CHECKSIG"
);
```

This lockScript checks that the recipient is the owner of a specific public key hash. The unlockScript then supplies a signature and public key to verify ownership.

***

#### Chapter 2: Stack-Based Script Execution and Bitcoin VM Verification

**2.1 Introduction to Bitcoin’s Stack and Execution Process**

In Bitcoin, both lockScript and unlockScript are pushed onto a stack for verification, processed from left to right, with a code separator `OP_CODESEPARATOR` marking where one script ends and the other begins. The stack-based model enables the VM to evaluate whether the transaction can be completed.

**2.2 Execution Flow with Example Walkthrough**

1. **Combining Scripts:** The unlockScript is combined with the lockScript, separated by `OP_CODESEPARATOR`.
2. **Stack Evaluation:** The VM pushes each element of the scripts onto the stack. Bitcoin opcodes manipulate these elements, performing duplications, cryptographic checks, and logical comparisons.
3. **Validation Outcome:** If a single non-zero value remains on the stack after processing, the transaction is valid. If not, it is rejected.

**Example Process (P2PKH):**

* **lockScript:** Contains `OP_DUP`, `OP_HASH160`, `<publicKeyHash>`, `OP_EQUALVERIFY`, `OP_CHECKSIG`.
* **unlockScript:** Contains `<signature>` and `<publicKey>`.
* **Validation:** The VM duplicates, hashes, and checks the public key against the public key hash, verifying the signature.

***

#### Chapter 3: Customizing Scripts for Conditional and Multi-Purpose STOs

**3.1 Extending lockScript Templates for Business Applications**

Beyond simple payment transactions, lockScripts can be customized to support complex conditions such as data verification, multi-signatures, or even hash-based unlocking, allowing businesses to create diverse transaction workflows.

**Sample lockScript with Conditional Validation:**

```typescript
typescriptCopy code// lockScript requiring either a data payload or its hash
const lockScript = bsv.Script.fromASM(
    "OP_DUP OP_SHA256 OP_SWAP OP_HASH256 <doubleHash> OP_DUP OP_ROT OP_EQUAL OP_ROT OP_EQUAL OP_OR"
);
```

* **Explanation:** This lockScript validates an STO if the spender provides either the original data or its double hash. This flexibility supports cases where access may need to be conditionally granted based on data presence or proof of hashing.

**3.2 Templates for Conditional Access: Multi-Signature, Time-Locked, and Data-Driven**

1. **Multi-Signature Requirements (e.g., 2-of-3 signatures):** Useful for joint accounts or business funds.
2. **Time-Locked Outputs:** Specify a future block height or timestamp, ideal for deferred payments.
3. **Data-Driven Transactions:** Allow unlocking if a specific data hash or payload is provided, supporting audit and verification processes.

**Example: Time-Locked lockScript**

```typescript
typescriptCopy code// Requires transaction to be included only after a certain timestamp
const timeLockScript = bsv.Script.fromASM(
    "<lockTime> OP_CHECKLOCKTIMEVERIFY OP_DROP <pubKeyHash> OP_CHECKSIG"
);
```

***

#### Chapter 4: Locking and Unlocking Process – Applying Sighash and Transaction Integrity

**4.1 Role of Sighash Schemes for Flexible Script Usage**

Sighash flags determine which parts of a transaction are signed, allowing for modular transaction components that can be updated or fixed in multi-party workflows.

* **SIGHASH\_ALL:** Signs all inputs and outputs, securing the entire transaction.
* **SIGHASH\_NONE:** Signs only inputs, making outputs adjustable by others.
* **SIGHASH\_SINGLE:** Signs specific inputs and outputs for workflows needing partial signatures.
* **SIGHASH\_ANYONECANPAY:** Limits signing to specific inputs, allowing other parties to add their inputs.

**Example Code for Signing an Input with Sighash:**

```typescript
typescriptCopy code// Signing a transaction input with a specific sighash type
stoInputs.forEach((sto, index) => {
    const sighashType = bsv.crypto.Signature.SIGHASH_ALL;
    const privateKey = new bsv.PrivateKey();
    const signature = bsv.Transaction.sighash.sign(txContainer, privateKey, sighashType, index);
    txContainer.inputs[index].setScript(bsv.Script.buildPublicKeyHashIn(privateKey.publicKey, signature, sighashType));
});
```

This flexibility allows businesses to create versatile transaction structures, enabling workflows from multi-signature contracts to multi-phase STOs.

***

#### Chapter 5: Validating Custom Locking and Unlocking with Bitcoin’s VM

**5.1 Code Separator and Execution: Handling LockScript and UnlockScript on the Stack**

The VM processes lockScript and unlockScript with the code separator `OP_CODESEPARATOR`, marking a boundary that clarifies the start and end of each script. Once both scripts have been executed, the VM checks the final stack state:

1. **lockScript Execution:** Defines the access conditions.
2. **unlockScript Execution:** Supplies the input to meet these conditions.
3. **Final Check:** A single non-zero value at the top of the stack indicates success, completing the STO’s spendability check.

**Sample Script Execution Process:**

```typescript
typescriptCopy code// Example process: Creating lockScript/unlockScript for a data-based STO
const lockScript = bsv.Script.fromASM("OP_HASH256 <dataHash> OP_EQUAL");
const unlockScript = bsv.Script.fromASM("<data>");

// Executing the combined scripts
stack.push(unlockScript);
stack.push(lockScript);
const isValid = bsv.Script.evaluate(stack).isValid();
console.log("Transaction Valid:", isValid);
```

This process ensures security in data-based STOs, where only correct data values can access specific transaction outputs.

***

#### Conclusion: Ensuring STO Security and Flexibility

This module demonstrates that by constructing robust lockScript and unlockScript pairs, businesses can create versatile, secure STOs to serve applications from secure payments to data-driven audits. With sighash flexibility and advanced script templates, Bitcoin SV enables secure, conditional transactions that fit a broad range of business models. Through clear explanations of VM-based validation, conditional scripting, and sighash configurations, learners are empowered to design complex transaction workflows that meet evolving blockchain needs.
