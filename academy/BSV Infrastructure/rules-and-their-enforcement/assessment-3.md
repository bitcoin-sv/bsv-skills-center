# Assessment 3



### 8/10 <a href="#id-8-10" id="id-8-10"></a>

&#x20;

1. What can happen if a minor change is made in how a node processes opcodes?&#x20;
   1. **Transactions that were committed to the ledger may be rendered unspendable.**
   2. **Such changes may cause irreparable damage to the Bitcoin network’s trust and usability.**
   3. **Disagreements over such changes can result in duplication of the ledger**
   4. Absolutely nothing, nodes are free to process opcodes as desired.
2. True or False: It is vital that every node processes each opcode in the script exactly the same way.
   1. **True**
   2. False
3. &#x20;When script processes items using opcodes that perform mathematical functions, what criteria determines whether the data items are numeric?
   1. They use a single byte pushdata opcode.
   2. **The data item’s length must be less than or equal to 750,000 bytes.**
   3. It must be a floating point number.
   4. There are no limits to which data items can be processed as numbers.
4. What data items can be interpreted as a boolean value?
   1. **Any.**
   2. Any 1, 2, 4 or 8 byte data item
   3. Anything that can be interpreted as a numerical value
   4. There are no boolean values in Bitcoin script.
5. &#x20;How many OP\_ELSE can be between a branching operator and an OP\_ENDIF?
   1. Zero.
   2. **Either one or zero.**
   3. It depends which branching operator is used.
   4. As many as are needed.
6. &#x20;The unlocking scripts used in transaction inputs may only contain \_\_\_\_\_ operations.
   1. OP\_ELSE
   2. OP\_VERNOTIF
   3. SriptSig
   4. **PUSHDATA**
7. &#x20;What does the stack memory usage consensus rule limit?
   1. **The memory usage allowed for the execution of the unlocking and locking script.**
   2. The amount of memory available to be used on the stacks.
   3. The limitations on the network to process transactions containing invalid opcodes.
   4. Allows for unlimited memory for the execution of the unlocking and locking script.
8. &#x20;As needed, node limits have been set so as to be bounded by the hardware/software implementation of the node client. What freedoms does this allow for node operators?
   1. Configuration settings allow each node operator to manage the in-use settings themselves.
   2. Node operators can operate generally how they like as long as it's in agreement with the majority of the network.
   3. Node operators are free to use their own configurations as long as they can make sure their blocks can be managed.
   4. **All of the above.**
9. The value of the Maximum Acceptable Transaction Size policy must be \_\_\_\_\_\_\_\_ to the value of the Maximum Transaction Size Consensus Rule, or it will have no effect.
   1.  equal to

       greater than

       greater than or equal

       **less than or equal**
10. &#x20;The Transaction Evaluation Timeout is a standard policy that defines \_\_\_\_\_\_\_\_ that the software will allow for the evaluation of a transaction \_\_\_\_\_\_\_\_\_.
    1.  the maximum acceptable transaction size policy, by the network

        **the maximum amount of time, before rejecting that transaction**

        the maximum amount of time a node can configure its evaluation so, with complex data.

        the time limit, that is a payment channel.
