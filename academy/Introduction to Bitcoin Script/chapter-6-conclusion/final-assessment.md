# Final Assessment

1. What language is the Bitcoin scripting language based on?
   * [ ] Fortran
   * [ ] Forth <-
   * [ ] Java
   * [ ] Function Block Diagram
2. What is the stack notation used in Bitcoin script called?
   * [ ] Inverse romanian notation
   * [ ] Push Before Opcode notation
   * [ ] Reverse Polish Notation <-
   * [ ] Satoshi Script Notation
3. True or False: Node operators have the right to change the opcode list at any time
   * [ ] True
   * [ ] False <-
4. When looking at a raw transaction, what do the last 4 bytes represent?
   * [ ] nVersion
   * [ ] nValue
   * [ ] nSequence
   * [ ] nLocktime <-
5. When nLocktime has a value less than 500,000,000, what is used to determine when the transaction can be mined?
   * [ ] This is a very early date in the Unix epoch so the transaction will be automatically final
   * [ ] Values less than 500,000,000 refer to a block-height instead of a time <-
   * [ ] It refers to the number of seconds that the transaction must wait in the mempool for
   * [ ] Such a transaction would be invalid
6. Under what conditions is a transaction valid and final?
   * [ ] The transaction's nLocktime is in the past but all its inputs are valid and have non-final nSequence values <-
   * [ ] Only one input is valid but all inputs are final and nLocktime is in the past
   * [ ] All inputs are valid and non-final and nLocktime is in 10 minutes
   * [ ] The only non-final input is invalid but the rest are final and nLocktime is in the past
7. Which of the following stack configurations will result in a valid input (final value is top of stack)?
   1. 0x01, 0x01, 0x01, 0x00
   2. 0x81
   3. 0x80
   4. 0x01
      * [ ] 1 and 3
      * [x] 2 and 4 <-
      * [ ] 4&#x20;
      * [ ] 2, 3 and 4
8. How many OP\_ELSE statements can go into an IF loop?
   * [ ] 0
   * [ ] 1
   * [x] Either of the above <-
   * [ ] There is no limit
9. What will OP\_FALSE/OP\_0 push onto the stack?
   * [x] A null vector of zero length <-
   * [ ] A single byte containing 0x00
   * [ ] It depends if you use OP\_FALSE or OP\_0 - They are different!
   * [ ] It doesn't push anything to the stack
10. What does OP\_NOP do?
    * [ ] It tells the evaluation engine to exit the script
    * [x] It doesn't do anything <-
    * [ ] It checks if the top stack value is FALSE
    * [ ] It's a spare opcode and should not be used
11. What does OP\_RETURN do?
    * [ ] OP\_RETURN is just a type of output which carries data
    * [x] OP\_RETURN exits the script, with the top stack value determining whether it is valid or not <-
    * [ ] OP\_RETURN exits an IF loop early
    * [ ] OP\_RETURN returns the funds to the parent transaction
12. Which opcode copies the top stack item and places it behind the second from top stack item?
    * [ ] OP\_2DUP
    * [ ] OP\_ROT
    * [ ] OP\_OVER
    * [x] OP\_TUCK <-
13. &#x20;What does OP\_SIZE do?
    * [ ] Returns the length of the stack
    * [ ] Returns the size of the transaction
    * [x] Returns the size of the item on the top of the stack <-
    * [ ] Returns the value of the input being spent
14. Which of the following is a P2PKH script?
    * [ ] OP\_DUP OP\_SHA256 OP\_EQUAL
    * [ ] OP\_DUP OP\_3 OP\_SPLIT OP\_DROP OP\_1 OP\_SPLIT OP\_SWAP OP\_SPLIT OP\_SWAP OP\_SPLIT OP\_DROP
    * [ ] OP\_2 \<pubkey1> \<pubkey2> \<pubkey3> OP\_3 OP\_CHECKMULTISIG
    * [x] OP\_DUP OP\_HASH160 \<hash> OP\_EQUALVERIFY OP\_CHECKSIG <-
15. Which value do I need to know to validly solve an R-Puzzle?
    * [ ] The private key
    * [x] k <-
    * [ ] r
    * [ ] s
16. Which opcode can be used to reduce the size of the scriptSig component in a transaction pre-image?
    * [ ] OP\_SIZE
    * [ ] OP\_PUSH\_TX
    * [x] OP\_CODESEPARATOR <-
    * [ ] OP\_RETURN
17. When using OP\_PUSH\_TX how does the pre-image get generated?
    * [x] You must generate it and insert it into the scriptSig prior to the transaction being submitted on-chain <-
    * [ ] Nodes will generate the pre-image for you
    * [ ] You don't need a pre-image because that's included as part of the OP\_PUSH\_TX opcode
    * [ ] It is part of the scriptPubKey being spent
18. Does using OP\_PUSH\_TX make Bitcoin Turing complete?
    * [ ] Yes it does
    * [x] No. Bitcoin was already Turing complete, and OP\_PUSH\_TX is just a more advanced way of using this feature <-
    * [ ] Bitcoin is not Turing complete on its own, however OP\_PUSH\_TX is not the only way to make it turing complete
    * [ ] No. It is not possible to make Bitcoin Turing complete.
19. Which hash function is used to create hashPrevouts, hashSequence and hashOutputs in the transaction pre-image?
    * [x] Double SHA256 <-
    * [ ] SHA512
    * [ ] RIPEMD-160 then SHA256
    * [ ] SHA1 then SHA256
20. Which SIGHASH flag must you ALWAYS use?
    * [ ] SIGHASH\_ALL
    * [ ] SIGHASH\_SINGLE
    * [ ] SIGHASH\_ANYONECANPAY
    * [x] SIGHASH\_FORKID <-
