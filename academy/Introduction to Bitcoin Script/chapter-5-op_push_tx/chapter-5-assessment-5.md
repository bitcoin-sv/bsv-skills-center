# Chapter 5 assessment 5

1. Bob wants to ensure that his stateful contract only has a certain number of outputs. Which combination of SIGHASH flags can he use?
   * [ ] SIGHASH\_ALL
   * [ ] SIGHASH\_ALL | SIGHASH\_ANYONECANPAY
   * [ ] Either of the above <-
   * [ ] None of the above
2. Alice's transaction has one input with a non-final nSequence value, one output and an nLocktime that is 1000 blocks in the future. What does she need to do to get it into a block as soon as possible?
   * [ ] Resubmit it with a new nLocktime but leave the input’s nSequence value the same
   * [x] Resubmit it with a final nSequence value and updated signature - no need to change nLocktime. <-
   * [ ] Create a new transaction that is final and has another input attached to pay a much larger fee
   * [ ] Send a message to all node operators requesting that her transaction be added to the next block
3. What does SIGHASH\_FORKID do?
   * [ ] Tells nodes that this transaction is not to be used in a 51% attack
   * [ ] It's not a valid SIGHASH and will generate network forks
   * [x] It provides replay protection for transactions so their matching inputs cannot be spent on the BTC network <-
   * [ ] It doesn't do anything and is a bug left in the protocol by Satoshi
