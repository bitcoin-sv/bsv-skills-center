# Chapter 4 assessment 2

1. To spend a UTXO with a P2PKH script, what is needed in the scriptSig?
   * [ ] A valid digital signature and the parent TXID
   * [ ] The hash of the public key in the output scriptPubKey
   * [x] A valid digital signature and the public key corresponding to the public key hash
   * [ ] The hash of the digital signature that spends the output and a public key
2. Why do we need to add a junk data item in a P2MS script?
   * [x] Because the protocol was fixed with a bug in it which can't be removed because it is set in stone
   * [ ] Because we need a way to insert arbitrary data into multisig transactions
   * [ ] It's not actually junk, but part of a hidden feature that Satoshi never finished
   * [ ] It helps to solve threshold signature calculations
3. What is the limit of keys/signatures that a P2MS script can check?
   * [ ] 2 signatures checked against 3 keys
   * [ ] 10 signatures checked against 10 keys
   * [ ] 100 signatures against 200 keys
   * [x] There is no limit within the protocol
4. What benefit does the P2PKH script have over P2PK and P2SH
   * [ ] In P2PKH it is much more difficult to guess the correct signature and steal funds
   * [ ] Both P2PK and P2SH have proven security issues and should never be used
   * [x] P2PKH enhances the user's privacy by blending the best of both P2PK and P2SH
   * [ ] There is no benefit, and the choice is all about utility



