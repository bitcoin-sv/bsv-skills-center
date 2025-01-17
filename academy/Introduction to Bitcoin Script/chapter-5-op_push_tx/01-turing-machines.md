---
description: >-
  Despite much dispute over the years, there are now several known methods of
  using Bitcoin script to create Turing complete programs and scripts. This
  chapter looks at the OP_PUSH_TX method.
---

# 01 - Turing Machines

A Turing machine is defined as a machine that manipulates symbols on a tape according to a set of rules. Despite the simplicity of this definition, Turing machines can be complex, and have been shown capable of performing any mathematical or computing function.

The tape used by a Turing machine is unbounded in size and divided into discrete cells, each of which holds one symbol from a finite set. The machine has a 'head' which is positioned over these cells, the contents of which defines the current state, and is used to calculate the next state. The machine moves in both directions on the tape, modifying each cell depending on the current state and the cell's contents. Once the calculation is complete, the process halts, ending the process.

In Bitcoin, we treat the ledger as the unbounded tape and use Bitcoin transactions as the cells. Each output that is part of the Turing machine contains script that reflects the current state and the evaluation process that determines the next state based on the transaction inputs. In this way, complex, multi-step operations can be developed which are programmed to move to one of a finite set of valid next states. This type of operation can also be called a 'Finite State Machine'.

{% file src="../.gitbook/assets/BA_BSVA_EDUC_BITCOIN-SCRIPT-CH5VID1_TURING-MACHINES_V4_072123_compressed.mp4" %}

There are several explanations and examples of Turing completeness in Bitcoin script, including the following:

{% embed url="https://craigwright.net/blog/math/infinite-and-unbounded/" %}

[https://papers.ssrn.com/sol3/papers.cfm?abstract\_id=3160279](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3160279)

{% embed url="https://craigwright.net/blog/bitcoin-blockchain-tech/a-proof-of-turing-completeness-in-bitcoin-script/" %}

{% embed url="https://medium.com/coinmonks/turing-machine-on-bitcoin-7f0ebe0d52b1" %}

Each of these examples leverages a technique called `OP_PUSH_TX` which uses the properties of Bitcoin's digital signatures to discover the current state of a process, evaluate inputs and determine the next state. An agent is always required, and features such as payment channels can be leveraged to deliver demand based services within simple contracts.

In this chapter we will look at how this technique works, and evaluate the components of the Elliptic Curve signatures that enable these powerful applications to be developed.
