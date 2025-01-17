# 01 - Introduction

Bitcoin Script is made up 186 opcodes. Each one carries separate functionality that can be used as an instruction in the Script Evaluation Engine.

{% file src="../.gitbook/assets/BA_BSVA_EDUC_BITCOIN-SCRIPT-CH2VID1_INTRODUCTION-BASIC-SCRIPT-SYNTAX_V1_072023_compressed.mp4" %}

When a script is to be processed, the evaluation engine first loads the data from the scriptSig and processes it using the script contained in the scriptPubKey.&#x20;

The processing power, or CPU needed to execute script is very low. All of the scripts fail or execute in a finite, predictable way in a limited amount of time.&#x20;

As described by Satoshi in one of his earlier writings -

_“The script is actually a predicate. It's just an equation that evaluates to true or false. Predicate is a long and unfamiliar word so I called it script. “_ - Satoshi Nakamoto

During the validation of the transaction, the scriptSig is prefixed to the scriptPubKey from the UTXO being spent to create the full script. The full script is processed and if the final result is evaluated to be true the transaction validation is successful. We will discuss in detail how this happens later in the chapter but for now it's enough to say True is represtented by a state where a single non zero value is at the top of the stack, and False when a zero or null value is at the top of the stack. If the script processing ends with False, or with multiple items on the stack, it means that the transaction validation failed and it can not be timestamped in a block.&#x20;

A good analogy for how this works is that the output scripts are puzzles that specify in which conditions can those bitcoins be spent. The input scripts provide the correct data to make those output scripts evaluate to true. In his early writings, Satoshi Nakamoto called bitcoin scripts predicates. Each output is an incomplete statement needing input data to make it true. This is the reason why processing always ends in a result which is either true or false. False outcomes fail the test and do not get published.
