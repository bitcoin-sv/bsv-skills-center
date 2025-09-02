# Course 2: Merkle Trees and Selective Disclosure

&#x20;

## 1. Introduction: Revealing Just Enough&#x20;

Imagine being asked to prove you are qualified for a job by sharing your entire educational and employment history. The employer might only need to confirm one specific certification. Providing your full resume reveals far more than necessary.&#x20;

Merkle trees offer a cryptographic way to prove that a specific piece of data exists and is valid—without revealing the rest of the data. This technique, called selective disclosure, is essential to privacy-preserving systems. &#x20;

## 2. What Is a Merkle Tree?&#x20;

A Merkle tree is a cryptographic data structure that organises data into a tree of hashes. Each "leaf" node contains a hashed piece of data. These leaf hashes are then paired and hashed again, layer by layer, until a single top-level hash, called the Merkle root, is formed.&#x20;

This structure enables efficient and secure verification of any individual item in the dataset.&#x20;

<figure><img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXcx7dk7c6QTtiKjoQBiaCbX8qlqrIMpwqPlm6U5Hcgqk-rPhJQnQ0YCQ3Xci5EmJLWRJAEf476oUKOmhXrzUEugDG9SQ79mZrbG2hGXAZUKl994g-qv5kPhPoWfJeb5n_taCD5eag?key=pi2h9VAe6by4Hs_HlR1_yg" alt=""><figcaption></figcaption></figure>

&#x20;

### Example: The Tree of Proof&#x20;

Consider a tree with four data entries:&#x20;

* Entry A: "Proof of address"&#x20;
* Entry B: "Proof of age"&#x20;
* Entry C: "Proof of education"&#x20;
* Entry D: "Proof of citizenship"&#x20;

Each entry is hashed. Then:&#x20;

* Hash A + Hash B = Hash AB&#x20;
* Hash C + Hash D = Hash CD&#x20;
* Hash AB + Hash CD = Merkle Root&#x20;

If someone wants to verify that "Proof of education" is part of this identity, they only need the hash of Entry C, the hash of Entry D, and the Merkle Root. They do not need the actual data for address, age, or citizenship.&#x20;

### Quiz – What Is a Merkle Tree? (Multiple Choice)&#x20;

What is the top-level output of a Merkle tree called?&#x20;

A. Merkle leaf\
B. Merkle root\
C. Summary proof\
D. Data node&#x20;

Answer: B &#x20;

## 3. How Merkle Trees Enable Selective Disclosure&#x20;

{% embed url="https://youtu.be/Ep6hKYihKnA" %}

Merkle trees allow users to generate a "Merkle proof". This is a sequence of hashes that, when combined, reconstruct the Merkle root. If the recomputed root matches the known valid Merkle root, then the specific data item is confirmed as valid.&#x20;

The rest of the data remains hidden.&#x20;

This makes Merkle trees perfect for scenarios where only partial information needs to be proven—without exposing the entire record.&#x20;

### Use Case: Proving Your Surname from a Birth Certificate&#x20;

Instead of sharing your full birth certificate, which includes your parents' names, place of birth, and registration number, a Merkle proof allows you to confirm only your surname.&#x20;

This works by proving that the hashed version of your surname is embedded within a larger, hashed identity document structure. &#x20;

### Quiz – Selective Disclosure (Matching)&#x20;

Match the term with its correct description:&#x20;

1. Merkle proof&#x20;
2. Leaf node&#x20;
3. Merkle root&#x20;

A. A single hashed data element\
B. A sequence of hashes used to confirm inclusion in the Merkle tree\
C. The top-level hash representing the entire dataset&#x20;

Answers:\
1 → B\
2 → A\
3 → C &#x20;

## 4. Merkle Structures in Real-World Identity Systems&#x20;

Selective disclosure using Merkle trees is essential for privacy-first identity systems. These systems avoid oversharing while still allowing entities to verify required attributes.&#x20;

**Use Case: Proving Age Without Date of Birth**&#x20;

At a bar, you may be required to prove you are over 18. A Merkle-based credential could allow you to generate a proof of age status without revealing your actual birthdate or full identity document.&#x20;

**Use Case: Real-Time Data Attestations**&#x20;

In dynamic environments like finance or healthcare, data such as account status or medical allergies may change over time. Merkle trees support modular updates, enabling time-stamped proofs that only show what is needed—nothing more. &#x20;

### Quiz – Merkle Use Cases (Multiple Choice)&#x20;

Why are Merkle trees useful for privacy in identity systems?&#x20;

A. They hide all identity data by default\
B. They prevent identity theft by encrypting names\
C. They allow one to verify specific attributes without exposing the full dataset\
D. They ensure data is deleted after use&#x20;

Answer: C &#x20;

## 5. Advantages of Using Merkle Trees&#x20;

* Scalability: Merkle trees can handle large volumes of data efficiently.&#x20;
* Integrity: Any change to the underlying data changes the Merkle root, making tampering detectable.&#x20;
* Efficiency: Verifiers only need a few hashes, not the full dataset, to confirm validity.&#x20;
* Privacy: Only the necessary attributes are disclosed.&#x20;

Merkle trees combine cryptographic strength with practical privacy protection, making them a cornerstone of blockchain-based identity systems. &#x20;

### Quiz – Merkle Tree Benefits (True/False)&#x20;

Merkle trees require the entire dataset to be revealed during verification.&#x20;

Answer: False&#x20;

## 6. Conclusion: Privacy with Proof&#x20;

Merkle trees offer a smart balance between proof and privacy. They make it possible to verify critical information without oversharing personal data.&#x20;

In the digital world, where data minimisation is a necessity, Merkle structures provide a trusted, cryptographic way to say, "Yes, I am qualified," without having to say anything else.&#x20;

Merkle trees are not just about efficiency—they are about control, discretion, and trust.&#x20;

&#x20;

&#x20;

\
\
