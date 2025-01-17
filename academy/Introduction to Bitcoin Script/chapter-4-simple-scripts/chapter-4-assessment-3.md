# Chapter 4 assessment 3

1. What is the benefit of P2MSH over P2MS?
   * [ ] The number of signatures needed can be adjusted after the output is created, making the solution more flexible
   * [ ] The public keys of the participants are not revealed until the output is spent, improving privacy <-
   * [ ] The signatures generated are more secure
   * [ ] The public keys stay secret forever allowing for anonymous transactions
2. What specific actions did nodes need to take to enable P2MSH scripts to be supported?
   * [ ] They needed to create special templates to detect P2MSH transactions and check the solutions
   * [ ] They needed to publish wallet guidelines so that developers could correctly implement P2MSH
   * [ ] They needed to create a peer-to-peer protocol for wallets to use to correctly distribute the partial solutions for signing
   * [ ] They didn't need to do anything <-
3. What does the user's wallet need to do in order to create and then solve an R-Puzzle?
   * [ ] &#x20;Generate a secret r-value for use in the scriptSig so that it can be hashed when building the solution
   * [x] Choose a non-random k-value and use the corresponding r value to generate the script Sig, and to generate the subsequent signature that spends the UTXO <-
   * [ ] Pre-calculate the signature before the transaction output is created and hold it in the user's wallet
   * [ ] Extract r from the user's public key when the signature is being created and submit it as a separate part of the solution
4. Which of the following lists correctly defines the elements of a signature encoded for use in Bitcoin?
   * [x] &#x20;<-
     1. 0x30 - DER signature header
     2. Length of signature (excluding SIGHASH)
     3. 0x02 - Integer value header
     4. Length of r
     5. r as a big-endian integer
     6. 0x02 - Integer value header
     7. Length of s
     8. s as a big-endian integer
     9. 1 byte sighash flag
   *
   [ ]   1. 0x30 - DER signature header
     2. Length of signature (including SIGHASH)
     3. 0x02 - Integer value header
     4. Length of r
     5. r as a big-endian integer
     6. 0x02 - Integer value header
     7. Length of s
     8. s as a big-endian integer
     9. 1 byte sighash flag
   *
   [ ]   1. 0x30 - DER signature header
     2. Length of signature (excluding SIGHASH)
     3. 0x02 - Integer value header
     4. Length of r
     5. r as a little-endian integer
     6. 0x02 - Integer value header
     7. Length of s
     8. s as a little-endian integer
     9. 1 byte sighash flag
   *
   [ ]   1. 0x30 - DER signature header
     2. Length of signature (including SIGHASH)
     3. 0x02 - Integer value header
     4. Length of r
     5. r as a little-endian integer
     6. 0x02 - Integer value header
     7. Length of s
     8. s as a little-endian integer
     9. 1 byte sighash flag
