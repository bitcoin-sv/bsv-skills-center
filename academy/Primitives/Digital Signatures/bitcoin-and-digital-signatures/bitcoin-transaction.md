# Bitcoin Transaction

Bitcoin is a fusion of data (Bit) and money (Coin). While the monetary token, i.e., the coin, is the most notable feature of Bitcoin, the real potential lies in its data capabilities. Thus, an abstract way to describe Bitcoin is as a global, immutable record of events. Some examples of these type of events are payment processing, e-KYC, tracking shipment in supply chain management, or an e-commerce app.

The events are recorded or persisted on the public Bitcoin ledger as transactions. The transactions are organized in blocks; which are a group of events that occurred during a certain time interval, timestamped together.

A transaction in bitcoin is a data structure with fields such as Version Number, nLockTime, Transaction Inputs, and Transaction Outputs. For the scope of the discussion, our area of focus is on the Transaction Inputs & Outputs. A transaction can contain multiple inputs and outputs.

Transaction Inputs include fields that refer to the previous transactions which designated the funds which are now being spent and an unlocking script to allow them to be spent. The Transaction Outputs are relatively straightforward and only have two fields, namely the amount and the locking script.

Overall, the conceptual association between different entities can be described as below.

GIF

### Scenario Setup

We now elaborate on Transaction Input, Output, and specifically the locking and unlocking scripts. To do so, we demonstrate a basic example of a fund transfer.

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-DigitalSignatures-Chapter4-Image002.gif)

Consider a timeline with three timestamps, t1, t2, t3, where transactions T1, T2, and T3 were recorded in blocks B1, B2, B3.

* Transaction T1 represents a transfer of funds from Alice to Bob; Alice has 51 BSV and transfers 50 BSV to Bob;
* Transaction T2 represents a transfer of funds from Bob to Carol; Bob has 50 BSV received from Alice and transfers 49 BSV to Carol.
* Transaction T3 represents a transfer of funds from Carol to Dave; Carol has 49 BSV received from Bob and transfers 48BSV to Dave.

_Note_ - _In Bitcoin, funds are not transferred; rather, the ownership is transferred. For simplicity however, we will use the abstraction of transferring funds interchangeably_.

Alice, Bob, Carol, and Dave have their private-public key pairs as $$[k_{pr A}, k _{pub A}]$$,$$[k_{pr B}, k_{pub B}]$$, $$[k_{pr C}, k_{pub C}]$$,$$[k_{pr D}, k_{pub D}]$$ respectively.

### Transaction Inputs & Outputs

The data structures for transaction inputs and outputs are provided in the image below. As transactions can have multiple inputs and outputs, each input and output is enumerated or indexed.

_Please keep in mind that only the required concepts and terms have been included, and details are kept sufficient for beginner-level know-how._

![](https://bitcoinsv.academy/storage/photos/4318/BSVA-DigitalSignatures-Chapter4-Image003.gif)

<mark style="color:blue;">All Transaction Inputs are inextricably associated with the previous transaction, and all Transaction Outputs will contain details of the conditions which need to be satisfied for future spending</mark>.

An easier way to understand this would be to view it as analogous to transferring fiat currency in the current financial ecosystem. When a conventional currency transfer occurs, there are two parts - the amount is debited from a payers' account and credited to a payee's account. In bitcoin, '_debited from_' (payer) details are contained in the _Transaction Input_, and the details of '_credited to_' (payee) are included in the _Transaction Output_. The difference here is the Transaction Inputs have the information of the source of the funds. For example, consider transaction T2, where Bob transfers funds to Carol. Transaction Input of T2 will be associated with previous transaction T1, i.e., transaction via Bob received funds from Alice.

\


![](https://bitcoinsv.academy/storage/photos/4318/BSVA-DigitalSignatures-Chapter4-Image004.gif)

The output contains only the amount in the above image, so the next logical question is, how is payee identity associated with the output? This brings us to the next topic, Script.

### Script

An intriguing field which both transaction inputs and outputs have is the script. The script is analogous to assembly language and contains operands, opcodes, and commands. The script associated with the transaction output locks the funds, and the script associated with the transaction input unlock the funds. The vital point to consider is which 'funds' do the transaction output lock and which 'funds' do the transaction input unlock.

The unlocking happens on the outputs from previous transactions which are committed to be spent in the current transaction. The locking happens on the outputs of the spending transaction such that the balance can be secured by the script until the party with the correct solution can provide it when they are used as an input in another future transaction.\
\
Let us consider the flow of funds from Alice to Dave. Each transaction will have an input/s and output/s. Each input will have an unlocking script, and each transaction output will have a locking script.

GIF

In the above image, we have the following:

1. Locking script of T1 locks the fund transferred to Bob
2. Unlocking script of T2 unlocks the locking script of T1
3. Similarly, the locking script of T2 locks the fund transferred to Carol, and the unlocking script of T3 unlocks the locking script of T2

### Script Evaluation

<mark style="color:blue;">The locking script is analogous to a puzzle for which the unlocking script provides the solution.</mark> For example, if the locking script is five minus three equals, the unlocking script must be two. The puzzle is written in an assembly language called Script using operands and opcodes.

Once the transaction is broadcasted to nodes, nodes validate the script by combining the current transaction's input's unlocking script with the previous transaction's output's locking script. The expected output of the script evaluation is either True or False. The node proceeds with further validation if the output is True. For example, when transaction T2 reaches a node for verification, the unlocking script provided in T2 is appended to the locking script of T1. The node evaluates the combined script to obtain a boolean True or False as a result.

_Implication_ - The above high-level understanding of the script evaluation is significant in that it is a fascinating application of a private-public key pair in the unlocking and locking script. A transaction in Bitcoin creates a lock on the funds by associating it with a specific public key or derivation thereof. In other words, the payee's identity is associated with the public key and provided in the locking script. The fact that public keys are used for identifying the user , and a user can generate as many fresh public-private key pairs as they like enables <mark style="color:blue;">pseudonymity</mark> in Bitcoin.

To spend the funds further, it becomes imperative to sign the funds using a private key. Hence, the public key and signature are included in the script as well as the operand to verify the signature.

### Transaction Templates

Generally, transactions are standardized using templates in Bitcoin. This implies that a standard script is used in a transaction input and transaction output. For example, one of the most widely used transaction templates is the "Pay-to-Public Key Hash (P2PKH)." To provide some insight into what the script looks like, below is the unlocking and locking script of a P2PKH script -

> _`Unlocking Script - <Signature> <Public Key>`_\
> \&#xNAN;_`Locking Script - OP_DUP OP_HASH160 <Public Key Hash> OP_EQUALVERIFY OP_CHECKSIG`_
>
> \
> \&#xNAN;_`<Signature>, <Public Key>, <Public Key Hash> are operands and the remaining are opcodes`_

_Note_: _The opcode OP\_CHECKSIG is relevant for digital signatures, as it is used for verifying digital signatures._
