# Sighash Flags

A SIGHASH [flag](https://wiki.bitcoinsv.io/index.php/Flag) is used to indicate which part of the transaction is signed by the [ECDSA signature](https://wiki.bitcoinsv.io/index.php/Elliptic\_Curve\_Digital\_Signature\_Algorithm). The mechanism provides a flexibility in constructing transactions. There are in total 6 different flag combinations that can be added to a digital signature in a transaction. Note that different inputs can use different SIGHASH flags enabling complex compositions of spending conditions.

NOTE: Currently all BitcoinSV transactions require an additional SIGHASH flag called SIGHASH\_FORKID which is 0x40

| Flag                            | <p>Value including SIGHASH_FORKID<br>HEX / BINARY</p> | <p>Value excluding SIGHASH_FORKID<br>HEX / BINARY</p> | Functional Meaning                                    |
| ------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- | ----------------------------------------------------- |
| SIGHASH\_ALL                    | 0x41 / 0100 0001                                      | 0x01 / 0000 0001                                      | Sign all inputs and outputs                           |
| SIGHASH\_NONE                   | 0x42 / 0100 0010                                      | 0x02 / 0000 0010                                      | Sign all inputs and no output                         |
| SIGHASH\_SINGLE                 | 0x43 / 0100 0011                                      | 0x03 / 0000 0011                                      | Sign all inputs and the output with the same index    |
| SIGHASH\_ALL \| ANYONECANPAY    | 0xC1 / 1100 0001                                      | 0x81 / 1000 0001                                      | Sign its own input and all outputs                    |
| SIGHASH\_NONE \| ANYONECANPAY   | 0xC2 / 1100 0010                                      | 0x82 / 1000 0010                                      | Sign its own input and no output                      |
| SIGHASH\_SINGLE \| ANYONECANPAY | 0xC3 / 1100 0011                                      | 0x83 / 1000 0011                                      | Sign its own input and the output with the same index |

\
The tables below illustrate what is signed and what is not signed in an ECDSA siganture depending on the SIGHASH type used.

\
Items that are _always_ signed

The signature on any input always signs the [TXID](https://wiki.bitcoinsv.io/index.php/TXID) and [VOUT](https://wiki.bitcoinsv.io/index.php/VOUT) that comprise the Outpoint being spent as well as the [version](https://wiki.bitcoinsv.io/index.php?title=Version\&action=edit\&redlink=1) of the protocol that the transaction is being evaluated under and the [locktime](https://wiki.bitcoinsv.io/index.php/NLocktime) being applied to the transaction.

<figure><img src="../../.gitbook/assets/image (31).png" alt=""><figcaption></figcaption></figure>

### Items that are _never_ signed

Unlocking scripts are _never_ signed

<figure><img src="../../.gitbook/assets/image (32).png" alt=""><figcaption></figcaption></figure>

### SIGHASH\_ALL

SIGHASH\_ALL signs all inputs and outputs used to build the transaction. Once an input signed with SIGHASH\_ALL is added to a transaction, the transaction's details cannot be changed without that signature being invalidated.

<figure><img src="../../.gitbook/assets/image (33).png" alt=""><figcaption></figcaption></figure>

### SIGHASH\_SINGLE

SIGHASH\_SINGLE signs all inputs and the output that shares the same index as the input being signed. If that output or any inputs are changed that signature becomes invalidated.

<figure><img src="../../.gitbook/assets/image (34).png" alt=""><figcaption></figcaption></figure>

### SIGHASH\_NONE

SIGHASH\_NONE signs all inputs and no outputs. Any output can be changed without invalidating the signature however if any inputs are changed that signature becomes invalidated.

<figure><img src="../../.gitbook/assets/image (35).png" alt=""><figcaption></figcaption></figure>

### SIGHASH\_ALL|ANYONECANPAY

\`Once an input signed with SIGHASH\_ALL|ANYONECANPAY is added to a transaction outputs cannot be changed or added without that signature being invalidated.

<figure><img src="../../.gitbook/assets/image (36).png" alt=""><figcaption></figcaption></figure>

### SIGHASH\_SINGLE|ANYONECANPAY

SIGHASH\_SINGLE|ANYONECANPAY signs the input being signed and the output that shares the same index. If that output is changed that signature becomes invalidated.

<figure><img src="../../.gitbook/assets/image (37).png" alt=""><figcaption></figcaption></figure>

### SIGHASH\_NONE|ANYONECANPAY

SIGHASH\_NONE|ANYONECANPAY signs a single inputs and no outputs. This type of signature can be used to easily assign funds to a person or smart-contract without creating an on-chain action.

<figure><img src="../../.gitbook/assets/image (38).png" alt=""><figcaption></figcaption></figure>

### Use cases

SIGHASH flags are useful when constructing smart contracts and negotiable transactions in payment channels.

#### Use Case 1 - Crowdfunding

Using ALL | ANYONECANPAY allows a transaction to have a fixed output or fixed outputs while keeping the input list open. That is, anyone can add their input with their signature to the transaction without invalidating all existing signatures.

#### Use Case 2 - Blank Check

Using NONE allows anyone to add their desired outputs to the transaction to claim the funds in the input.

#### Use Case 3 - Modular Transaction

Using SINGLE | ANYONECANPAY modularises a transaction. Any number of these transactions can be combined into one transaction.

{% hint style="info" %}
Please note that after the [Chronicle release](https://docs.bsvblockchain.org/network-topology/nodes/sv-node/chronicle-release#id-2.-opcodes), the BSV Blockchain will support both the original TDA and the BIP143 Algorithm (with SIGHASH\_FORKID), allowing flexibility for devs and users. It means that users will be able to decide how to sign transactions
{% endhint %}

