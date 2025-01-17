# Chapter 5 assessment 1

1. What calculations is a Turing complete machine limited to?
   * [ ] It is limited to simple arithmetic
   * [ ] It can calculate complex mathematics but is not useful for things such as machine learning
   * [ ] It can perform any type of calculation within the bounds of the bit width of the CPU architecture on which it runs (e.g. 64 bits)
   * [ ] There are no limits. <-
2. What part of the Bitcoin system is analagous to the tape in a Turing machine?
   * [ ] The scriptSig is the tape
   * [ ] Each transaction is a separate tape
   * [ ] The ledger is the tape <-
   * [ ] The chain of block headers is the tape
3. What is the maximum length of an ECDSA signature in Bitcoin
   * [ ] 72 bytes
   * [x] 73 bytes <-
   * [ ] 74 bytes
   * [ ] 75 bytes
4. What determines the length of the scriptPubKey element used in the formation of the transaction pre-image?
   * [ ] The length of the script in the output being spent
   * [ ] The size of the parent transaction
   * [x] The placement of the preceding OP\_CODESEPARATOR opcode within the scriptPubKey <-
   * [ ] The satoshi value of the input
