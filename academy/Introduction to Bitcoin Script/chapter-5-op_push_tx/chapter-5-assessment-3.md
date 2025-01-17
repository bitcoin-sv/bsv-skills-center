# Chapter 5 assessment 3

1. What is the first field in the transaction pre-image message?
   * [ ] nLocktime
   * [ ] hashPrevouts
   * [ ] nVersion <-
   * [ ] prevOutpoint
2. What value is hashed to make hashPrevouts if SIGHASH\_ANYONECANPAY is used?
   * [ ] Just the parent outpoint for this input
   * [ ] All outpoints being spent in this transaction
   * [ ] Nothing is hashed. Instead a 32 byte null string is inserted in the field <-
   * [ ] Only the input index value is hashed
3. If the sequence value of an input is updated, what happens to a previously created signature
   * [ ] The sequence value is updated in the message but the signature is still valid
   * [ ] The signature becomes invalid and the input must be re-signed <-
   * [ ] The signature can be updated without having to re-do the elliptic curve mathematics
   * [ ] As long as a node is told beforehand, the signature stays valid
4. Bob wants to generate a signature that will remain valid even if the sequence number on another input is updated. What SIGHASH flag does he need to use?
   * [ ] SIGHASH\_ALL
   * [ ] SIGHASH\_SINGLE
   * [ ] SIGHASH\_NONE
   * [x] SIGHASH\_ALL | SIGHASH\_ANYONECANPAY <-
