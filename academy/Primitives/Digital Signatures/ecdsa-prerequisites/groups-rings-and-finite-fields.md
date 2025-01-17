# Groups, Rings and Finite Fields

In the mathematical operations of cryptography, computations are performed over finite sets, and these sets have significantly different computational rules than in general arithmetic. In cryptography, it can be said that there are three algebraic structures to be considered - Groups, Rings, and Fields.&#x20;

In general arithmetic there are four operations over numbers - addition, subtraction, multiplication, and division. In abstract algebra however, subtraction is not considered a distinct operation and is instead referred to as additive inverse. Similarly, division is not considered a distinct operation either and is instead referred to as the multiplicative inverse.

_Instead of indulging in pure mathematical definitions, we will explain groups, rings, and finite fields conceptually. To do so, we will define a group under one operation, i.e., addition, and build upon it to understand a ring and field. A group can also be defined with the multiplicative operation and its inverse as division._

The group is a set of elements, where when the operation addition and its inverse (i.e., subtraction) are applied to members of the set, the result also lies within the set.&#x20;

Additionally, the group also has an identity element. An identity element is a unique element of the group, to which if any other element is added, it gives the same element as a result.

A ring is a set of elements with all the properties of a group, and additionally, it supports the multiplication operation.

A field is a set of elements with all the properties of ring and which supports the multiplicative inverse (i.e., division). When the set has a finite number of elements, we say we have a _**finite field**_**.**



![](https://bitcoinsv.academy/storage/photos/4318/BSVA-DigitalSignatures-Chapter2-Image002.jpg)

_Note:_

For the sake of simplicity, we used operations - addition, subtraction, etc., but in abstract algebra, these operations can be vastly different. One such example is a group $$Z_p*$$, which is nothing but a set of equivalence classes over modulus prime number $$p$$.

> One such example is a group $$Z_p*$$, which is nothing but a set of equivalence classes over modulus prime number $$p$$.

In ECDSA, we quite often choose $$Z_p*$$ as a set to select an element from.
