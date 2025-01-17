# Chapter 5 assessment 4

1. What are the values which together comprise the 'outpoint'?
   * [ ] The parent TXID and the input's index number in the current transaction
   * [ ] The parent TXID and the index number of the output in the parent transaction <-
   * [ ] The current TXID and the input's index number in the current transaction
   * [ ] The current TXID with the index of the output from the parent transaction
2. What is the maximum possible length of a scriptPubKey?
   * [ ] 65,535 bytes (2^16 - 1)
   * [ ] 4,294,836,225 bytes (2^32 - 1)
   * [x] 18,446,744,073,709,551,615 bytes (2^64 - 1) <-
   * [ ] There is no limit
3. What is the format of the nValue parameter?
   * [ ] It is a 4 byte integer
   * [x] It is an 8 byte integer <-
   * [ ] It is a varInt
   * [ ] It is a floating point value where 1.00000000 is equivalent to 1 Bitcoin
4. How many times can a transaction input's nSequence number be updated?
   * [ ] Just once
   * [ ] Up to 65,535 times
   * [x] Up to 4,294,836,255 times <-
   * [ ] There is no limit
