---
description: Help me Todd. Please.
---

# Chapter 1 assessment 3

#### Question 1

The time is 1673585961 as a UNIX epoch and the block height is 774471. \
\
A transaction is made that spends three inputs with UINTMAX nSequences, one input with an nSequence of 0x000000FF and an nLockTime of 0x000BD1D7. Assuming regular 10 minute block intervals, after which time will the transaction be included in a block if broadcast ?

* [ ] Now
* [ ] 12 hours
* [x] 24 hours
* [ ] 48 hours
* [ ] 72 hours
* [ ] Not until input 4's nSequence is UINTMAX.

#### Question 2

| Flag                            | SIGHASH Value    | Functional Meaning                                    |
| ------------------------------- | ---------------- | ----------------------------------------------------- |
| SIGHASH\_ALL                    | 0x41 / 0100 0001 | Sign all inputs and outputs                           |
| SIGHASH\_NONE                   | 0x42 / 0100 0010 | Sign all inputs and no output                         |
| SIGHASH\_SINGLE                 | 0x43 / 0100 0011 | Sign all inputs and the output with the same index    |
| SIGHASH\_ALL \| ANYONECANPAY    | 0xC1 / 1100 0001 | Sign its own input and all outputs                    |
| SIGHASH\_NONE \| ANYONECANPAY   | 0xC2 / 1100 0010 | Sign its own input and no output                      |
| SIGHASH\_SINGLE \| ANYONECANPAY | 0xC3 / 1100 0011 | Sign its own input and the output with the same index |

A transaction input has the following raw hexidecimal data:\
b272ec0ffa4cfd1f3446d87927004fa97177cb1569cf2008c57360a584306062320000006b483045022100c80b04357fd4daf4a0a8743bee485e40181ddc47ec81307dc1e9756ef6becc0402200d834912b5e7d071581d49373682130cd9a1f293f0552ac0194c25e7741107b04121020824bb65d1cc92de2a37410e4279211a0d53788140a528b17f7ada7f4ad8a9a9ffffffff\
\
What is the index of the UTXO being consumed in the transaction, what is the byte length of the DER signature (excluding SIGHASH flag) and which SIGHASH flag was used?

* [ ] 32, 106 , SIGHASH\_ALL
* [ ] 32, 71, SIGHASH\_SINGLE
* [ ] 50, 70, SIGHASH\_ALL|SIGHASH\_ANYONECANPAY
* [x] 50, 71, SIGHASH\_ALL
* [ ] 50, 106, SIGHASH\_NONE



\
