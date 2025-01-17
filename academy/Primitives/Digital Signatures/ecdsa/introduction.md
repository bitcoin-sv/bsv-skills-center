---
coverY: 0
---

# Introduction

The Elliptic Curve Digital Signature Algorithm is based on Elliptic curve cryptography, which utilizes the DLP that exists for certain elliptic curves. In practice, for security reasons one needs to know the exact number of points on the elliptic curve. However, it turns out finding the precise number of points on the elliptic curve is computationally hard. Therefore, for real-time applications, well-known elliptic curves are used which are standardized by the well-established consortiums. Specifically, Bitcoin uses an elliptic curve - secp256k1, defined in Standards for Efficient Cryptography (SEC).

Recall from Digital Signatures Protocol that we established the following steps:

* Generate private/public key pair
* Signing Algorithm (mathematical transformation). In practice, the message is first hashed and then signed or hashed as part of the signing algorithm.
* Verification algorithm (another transformation)&#x20;

Also, re-visiting required pre-requisites, when choosing elliptic curve, we will know the below values:&#x20;

&#x20;  **a.** coefficients $$a$$ and $$b$$ (refer equation (1) of an elliptic curve in the previous chapter)

&#x20;  **b.** $$modulus \ p$$ (refer equation (1) of the elliptic curve)

&#x20;  **c.** the point $$G$$, which generates the cyclic group (all the elements can be expressed as the group operation repeatedly applied to the generator)

&#x20;  **d.** the order of the group $$q$$. The order of the group is the distinct number    after which the elements of the group repeat themselves when group operation is applied repeatedly on the generator $$G$$.

We will now look at ECDSA specifically.
