# Further Discussion

### Ephemeral Keys

The signing in ECDSA relies on choosing an ephemeral key. Therefore, when designing applications that will use ECDSA as the digital signature algorithm, there are two crucial design considerations that we ought to be aware of:

1. Choosing a fresh random value - For security reasons, it is essential to have a defined process to select ephemeral keys with unpredictable randomness. Bias in this process can lead to critical vulnerabilities and attacks. As per the well-defined ECDSA (and DSA) standards, systems generally use entropy pools to obtain the required randomness.
2. Deterministic ephemeral key - Using a fresh random key for every signing has one crucial implication in that the same message signed by Alice, using her private key, will result in a different signed message every time. This means the usage of ephemeral keys makes the ECDSA non-deterministic. As per the well-defined standards for ECDSA (and DSA), systems generally use an HMAC of the private key and the message to obtain a deterministic ephemeral key (HMAC stands for Hashed based Message Authentication Code and is outside the scope of this course. For more details, please refer RFC 6979).

### secp256k1 Specification

Before we move on to the next chapter on how Digital Signatures are applied in Bitcoin, it is good to glance through the specification of ECDSA used in Bitcoin, namely the secp256k1 specification defined in SEC.

The elliptic curve equation is

$$y^2 = (x^3 + 7) \ mod \ p$$

1. coefficients $$a$$ and $$b$$ $$→ a = 0x00 ; b =0x07$$
2. value of $$p → 2^{256} - 2^{32} - 2^9 - 2^8 - 2^7 - 2^6 - 2^4 - 1$$ (_this is a really large number_)
3. base point, generator $$G  →$$ 02 79BE667E F9DCBBAC 55A06295 CE870B07 029BFCDB 2DCE28D9 59F2815B 16F81798 (_compressed hexadecimal format_)
4. order of the group, $$q$$ →FFFFFFFF FFFFFFFF FFFFFFFF FFFFFFFE BAAEDCE6 AF48A03B BFD25E8C D0364141 (_hexadecimal format_)

Above is a standard specification where in real world applications, all of these values are usually encapsulated in well-tested libraries.

### Public Key Recovery From Signature

Given the signatures ($$r, s$$), by applying mathematical computations, it is feasible to extract either 0,1,2,3 or 4 possible values for the public keys. An additional parity byte is added to resolve the ambiguity over how many keys can be extracted from the signature. So, the signature becomes ($$i, r, s$$) instead of ($$r, s$$).

Real-world applications can draw the two benefits of saving bandwidth in the communication channel and conserving storage space when using the signature format ($$i, r, s$$). However, when both the benefits are the priority, applications will need to accept a trade-off on the quality of message authentication, which is an implicit property of digital signatures.

In Bitcoin, the signature format ($$i,r,s$$) is used for Signed Messages, but in that case neither the above benefits nor compromise applies. The details on how Bitcoin uses ($$i,r,s$$) signature format is discussed in detail under lesson - Signed Message.
