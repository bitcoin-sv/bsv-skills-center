---
description: Understanding basics of Script and stack based compilation
---

# Script

Both the input and output contain a program/code written in a new programming language known as Script. The script associated with the transaction output locks the funds, and the script associated with the transaction input unlock the funds. The vital point to consider is which 'funds' do the transaction output lock and which 'funds' do the transaction input unlock. The unlocking happens on the outputs from previous transactions, which are committed to be spent in the current transaction. The locking happens on the outputs of the spending transaction such that the balance can be secured by the script until the party with the correct solution can provide it when they are used as an input in another future transaction.

Script, is a low-level programming language very similar to assembly-level programming coded using operational codes or opcodes (186 in total), which can provide for coding all types of business logic commonly known as “Smart Contracts”. The term ‘Smart’ refers to developers' ability to program logic in transactions allowing programmable contracts. Typically, the output script will lock the funds with certain conditions, and a later transaction will unlock the funds by providing the answer to the specified condition.

For example, let's say we create a transaction where the output will lock funds by a program written in Script, which is – “what is the answer to math equation, 1+2”. The answer to this ‘puzzle’ is 3. So, the next transaction which intends to spend this UTXO, will need an input which provides this answer, “3”. When the transaction spending the funds is submitted to blockchain, the validation process will combine the Input (Answer, 3) with the original question present in the output of last transaction, (what is the answer to math equation, 1+2) and execute this combined sequence of instructions to arrive at a single answer, true or false. The nature is script is such that it will always result in a true or false answer, and due to that is also sometimes said that script is a “predicate”. The compiler (termed as Script Engine) is built such that it uses a stack for the execution of the instructions (op-codes and operands).

<figure><img src="https://github.com/jonesjBSV/bsv-skills-center/blob/master/bsv-skills-center/bsv-protocol-documentation/.gitbook/assets/TransactionLifecycle_Slide03%20(2).png" alt=""><figcaption></figcaption></figure>

As shown on the left side of the diagram, the validation process will validate all other fields and then construct a script evaluation input for the script engine. This script evaluation code (input unlocking funds from locked output script) looks as shown in the diagram (right) for the above example. Internally the compiler uses a data structure called stack for evaluating script execution. It identifies data elements and opcode or operation elements in the Script and acts based on it. If it is a data element, it is pushed on top of the last element in the stack. If it's an opcode, the compiler will know how many operands it takes, so it will take that number of operands from the stack out, apply the opcode to them and store the result on top of the stack. This is demonstrated in the diagram. It will keep doing it until no more data or opcodes are left to execute. The final state of the stack will be the evaluation result of the Script, always a Boolean, in this case, true.

{% hint style="info" %}
In the late 60's Charles 'Chuck' Moore developed FORTH as a fully interactive stack based programming environment that ran on a microcontroller and provided the user with a simple, command line entry based means to enter commands and build FORTH words (operations) and programs (functions).

FORTH is different to many programming languages in that it runs 'live' while the programmer is working on their software, allowing new 'words' to be defined, tested, redefined and debugged without having to recompile or restart the system.

Bitcoin Script is heavily inspired from FORTH in its makeup. It adds some grammar changes and removes capabilities such as jump instructions and loops and is different in that way from FORTH
{% endhint %}
