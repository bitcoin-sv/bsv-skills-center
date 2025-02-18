# Summary

The explanation in the previous lesson can be very overwhelming for practitioners new to BSV, so below is the summary of what we have covered so far:

1. BSV transactions are signed using ECDSA(secp256k1)
2. Transactions can have multiple inputs and outputs; each input has an unlocking script and each output has a locking script
3. The signature and verification within a transaction is instructed via arguments in script
4. The locking scripts, in the transaction outputs, associates the public key of the party, to which custody of funds is transferred
5. The unlocking script, in the transaction inputs, provides a mechanism where the party can provide a signature with the private key associated with the public key or derivativation thereof, that the funds were locked against.
6. BSV transactions use the format \[DER, SIGHASH] instead of $$[r,s]$$. The sighash flag provides the specifications of the input and output that needs to be signed
