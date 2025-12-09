# RIPEMD-160

![](<../../../../.gitbook/assets/BSVA-HashFunctions_Ch5L1_DA1 (1).gif>)

## A Brief History of Race Integrity Primitives Evaluation: RIPEMD

In the 1990s, the European Union established the RIPE (Race Integrity Primitives Evaluation) consortium. The consortium was tasked developing better integrity primitives – ways to ensure data integrity – namely hash functions. The most popular hash functions of the time were Ron Rivest’s MD4 and MD5. After evaluating MD4 and MD5, the consortium proposed a stronger version of MD4 called RIPEMD.

RIPEMD is essentially two parallel versions of MD4 run in tandem along with improvements to how bits are shifted and how words are ordered within the message schedules.

Not long after RIPEMD was proposed, the NSA’s SHA-1 was published by NIST as an improvement to MD5.

## RIPEMD-160

In early 1995, H. Dobbertin found collisions for the last two out of three rounds of RIPEMD, so in 1996, Dobbertin et al. proposed a better version RIPEMD replete with a longer message digest called RIPEMD-160 and RIPEMD-128 (corresponding to the bit length of their outputs). RIPEMD-160 and RIPEMD-128 are still considered secure hash functions today.

Dobbertin chose to base RIPEMD-160 on MD5, like SHA-1, as opposed to MD4. Using MD5, and the longer bit length of the message digest, provides a trade-off between better security for a slight performance hit. Today, with modern processors, this performance hit is negligible.

The basic design philosophy of RIPEMD-160 is to build on the parallel iterations from RIPEMD with more rounds of compression, and in an optimized order. The design secured RIPEMD by making as few changes as possible to RIPEMD so the confidence gained by RIPEMD, MD5, and MD4 was maintained (e.g. keeping message block size consistent). It takes the following approach:

* Increase the bit size of the message digest to 160 bits
* Increase the number of rounds from three to five
* Bit shifts chosen between 5 and 15
* Every message block is rotated over different amounts
* The shifts applied to each register can’t have a special pattern (e.g. not divisible by 32)
* Not too many shift constants divisible by four.

Dobbertin et al. found RIPEMD-160 to be 15% slower than SHA-1, half as fast as RIPEMD, and four times slower than MD4.

Apart from Bitcoin, the most notable use of RIPEMD-160 is within the [PGP (Pretty Good Privacy)](https://www.openpgp.org/about/history/) email encryption standard.

#### Activity – Generate a RIPEMD-160 message digest

Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), generate a RIPEMD-160 message digest in hexadecimal (HEX) for each of the following ASCII input strings:

```markup
hash functions map an arbitrary length input to a fixed length output
```

```markup
I'm a short string
```

## HASH-160: RIPEMD-160(SHA-256)

HASH-160 is the BSV specific double hash function of RIPEMD-160(SHA-256)).

In BSV, HASH-160 is used to:

* Generate a BSV address by hashing the compressed x coordinate of a public key of an ECDSA public-private key-pair and converting the result to Base58 then Base58Check.

#### Activity – Generate a HASH-160 message digest

Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), generate a HASH-160 message digest in hexadecimal (HEX) for each of the following ASCII input strings:

```markup
hash functions map an arbitrary length input to a fixed length output
```

```markup
I'm a short string
```
