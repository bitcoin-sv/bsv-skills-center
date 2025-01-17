---
description: >-
  Lesson 2 covered the mathematical equations used in ECDSA and there is no need
  for learners to remember these equations.
---

# ECDSA

Consider an elliptic curve E with the above properties, and we have two parties, Alice and Bob, wherein Alice wants to sign a message '$$m$$' and send it to Bob.&#x20;

With no surprise, the protocol Alice and Bob agree to use is ECDSA.

### **Step 1 - Generating Private/Public Key Pair**

Alice generates private and public key pairs.

1. For this, Alice chooses a random integer $$d$$ where $$0 < d < q$$ $$(q \ is \ the \ order \ of \ the \ group)$$. The randomly chosen integer becomes the private key for Alice.
2. Alice computes $$d * G$$, and this value is the public key for Alice, denoted as $$A$$. Alice shares this public key with Bob. (_Recall this computation is done using scalar multiplication, and it is a point on an elliptic curve, so it has an_ $$x$$ _and_ $$y$$ _co-ordinate_)

The keys are now

$$K _{pub} = A = d * G$$\
$$K _{pr} = d$$

Notice that Bob knows the domain parameters $$(p, a, b, q, G)$$, and the public key ($$A$$) is shared with Bob.

### **Step 2 - Signing**

Alice uses a private key to compute the signature for the message '$$m$$':

1\. Alice chooses a random ephemeral key $$K_{EPH}$$ such that $$0 < K_{EPH} < q$$ (_notice this is like choosing a private key in step 1_)

2\. Alice computes $$R = K_{EPH} * G$$ (_notice this is like computing public key in step 1_)

3\. Let $$r = x _R \ mod \ q$$, i.e., the $$x$$-coordinate of point $$R$$ on the elliptic curve

a. If $$r = 0$$, then they need to return to step 1 and start again. (This is because if $$r = 0$$, the value of '$$s$$' calculated in step 5 will be independent of private key '$$d$$', which would imply signing without using the private key. It will defeat the purpose of digital signatures).

4\. Compute the hash of message '$$m$$' by using the hash function '$$h$$,' i.e., $$h(m)$$. \
There are two reasons for performing the hash of the message. The first reason is to manage the arbitrary length of the message and make its length at least as long as $$q$$. Secondly, it makes the signing more secure by preventing a specific attack.

5\. Compute $$s ≡ ( h(m) + d * r ) {K_{EPH} }^{-1} \  mod \ q$$

The signature consists of a pair of integers ($$r, s$$)

_Note_: The value for $$r$$ and $$s$$ needs to be between 1 and $$q$$. i.e.

$$1≤ r < q$$ \
$$1 ≤ s < q$$\
$$r$$ and $$s$$ require to be in the range of $$(1,…,q-1)$$, which is the reason for applying $$mod \ q$$ in steps 3 and 5.

### Step 3 - Verification

For verification, Bob has values $$(m, (r, s) )$$, i.e., the message $$m$$ and the signature $$(r, s )$$ computed during signing. Bob needs to perform three additional calculations (Step 1-3) before he can verify the signature (Step 4,5)

1\. Calculate value $$u ≡ s^{-1} \ mod \ q$$

2\. Using $$u$$, calculate $$v_1 ≡ u * h(m) \ mod \ q$$

3\. Using $$u$$ again, calculate $$v_2 ≡ u * r \ mod \ q$$

4\. Compute $$P = v_1 * G + v_2 * A$$ ($$G$$ is the generator, and $$A$$ is the public key for Alice). Again, as this is a point on the curve, it has an $$x$$ and $$y$$ co-ordinate, i.e., $$P = (x_P, y_P)$$

5\. The verification, denoted as $$verK _{pub}$$ for $$(m, (r, s) )$$, is as follows:

a. if $$x_P ≡ r \ mod \ q$$, it implies the signature is valid

b. if $$x_P ≢  \ r \ mod \ q$$, it indicates the signature is invalid
