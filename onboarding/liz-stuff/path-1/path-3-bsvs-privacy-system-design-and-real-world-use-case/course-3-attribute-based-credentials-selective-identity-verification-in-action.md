# Course 3: Attribute-Based Credentials – Selective Identity Verification in Action

### 1. Introduction: Identity Without Oversharing

Imagine proving you are eligible to vote, attend an event, or access a financial product—without handing over your entire identity. Traditional systems often require full exposure: birth certificates for age, passports for nationality, or bank statements for wealth.

**Attribute-Based Credentials (ABCs)** offer a smarter solution. These credentials let individuals prove specific facts—like "I am over 18" or "I am a citizen"—without revealing more than is needed. They shift the focus from identity-as-a-whole to **identity-by-attribute**.

***

#### **Quiz – Introduction (Multiple Choice)**

What is the key benefit of attribute-based credentials?

A. They permanently store all personal attributes\
B. They prove individual facts without revealing unrelated information\
C. They eliminate the need for digital identity systems\
D. They allow anyone to access full identity records

**Answer**: B

***

### 2. The Concept: Verifying the Claim, Not the Person

Attribute-based credentials separate identity verification into discrete, verifiable claims. Instead of showing a driver’s licence to prove age, you can present a **cryptographic attestation**: “Over 18” is true—and that is all the verifier learns.

Each attribute can be bound to cryptographic proof (like a digital signature, Merkle proof, or ZKP) and issued by a trusted authority—such as a government, bank, or university.

The result is more control, less exposure, and better alignment with privacy laws like GDPR.

***

#### **Quiz – Attribute Thinking (True/False)**

Attribute-based credentials allow someone to prove they meet a requirement without exposing full identity documents.

**Answer**: True

***

### 3. Use Case: Age Verification Without Birthdate

Bars, cinemas, and online platforms often need to confirm someone’s age. Today, this is usually done by exposing a document showing **birthdate**, **full name**, and **ID number**.

With attribute-based credentials, an individual presents a signed claim: “Over 18 as of \[date]”. This proof can be issued by a government authority and verified cryptographically.

Technologies like Merkle trees and zero-knowledge proofs ensure that **only** the relevant attribute—age status—is visible. The rest stays hidden.

***

#### **Quiz – Age Verification (Multiple Choice)**

Which method provides the **least** privacy?

A. Showing a birth certificate\
B. Presenting a cryptographic “Over 18” credential\
C. Generating a Merkle proof for age\
D. Using a ZKP to prove age status

**Answer**: A

***

### 4. Use Case: Financial Accreditation Without Portfolio Disclosure

Investment regulations require individuals to be “accredited investors”. This status typically involves proving net worth or income, which exposes sensitive financial records.

Attribute-based credentials solve this by allowing a bank or accountant to issue a signed statement: “Accredited Investor = Yes”. A verifier sees the credential, but not the income, asset classes, or financial statements.

A zero-knowledge proof or Merkle-path-based inclusion can confirm the claim without disclosing underlying data.

***

#### **Quiz – Financial Accreditation (Matching)**

Match the verification method with its privacy level:

1. Full bank statement
2. Accountant-signed cryptographic credential
3. Zero-knowledge proof of investor status

A. Verifies without showing any financial data\
B. Reveals full income and accounts\
C. Shares only status from trusted authority

**Answers**:\
1 → B\
2 → C\
3 → A

***

### 5. Use Case: Citizenship Without Document Exposure

International services and borderless platforms may need to confirm citizenship or residency. Traditionally, this requires scanning and storing passports, visas, or national ID documents.

With attribute-based credentials, the government (or a civil registrar) can issue an attestation of citizenship. When verification is required, the individual presents only that claim—no passport numbers, no photos, no residential history.

Merkle trees support efficient disclosure of just the relevant attribute, while pruning ensures that outdated attributes—such as expired residency—are excluded.

***

#### **Quiz – Citizenship (True/False)**

Using attribute-based credentials, a person can prove citizenship status without sharing their full passport.

**Answer**: True

***

### 6. Combining Technologies: How It All Works

Attribute-based credentials often combine multiple privacy-enhancing technologies:

* **Zero-Knowledge Proofs**: Enable verification of facts without disclosing data
* **Merkle Trees**: Structure multiple identity claims so that each can be shared independently
* **Pruning**: Removes outdated or irrelevant claims from future disclosures
* **Blockchain Anchoring**: Ensures credentials are tamper-proof and traceable without being exposed

Together, these tools enable **context-specific proof**. You share the right detail at the right time—never more, never less.

***

#### **Quiz – Tech Match (Matching)**

Match each technology with its function:

1. Merkle tree
2. Zero-knowledge proof
3. Pruning
4. Blockchain anchoring

A. Ensures no data tampering after issuance\
B. Confirms a claim is valid without revealing the data\
C. Allows independent verification of one identity attribute\
D. Removes outdated identity data

**Answers**:\
1 → C\
2 → B\
3 → D\
4 → A

***

### 7. Ethical and Regulatory Considerations

Attribute-based credentials support legal compliance by aligning with **data minimisation principles** in laws like GDPR, POPIA, and CCPA.

However, designers must also consider:

* Who can issue a credential?
* How are revocations handled?
* What if a verifier asks for more than is necessary?

A privacy-first system puts the user in control—granting disclosure on a need-to-know basis, not a want-to-know basis.

***

#### **Quiz – Ethics (True/False)**

Attribute-based credential systems should always prioritise user control over what is shared.

**Answer**: True

***

### 8. Conclusion: Power in Precision

Attribute-based credentials bring **precision** to digital identity. Instead of offering everything, individuals can prove **just enough**.

Whether confirming age, financial status, or citizenship, this approach offers what today’s identity systems lack: **trust without oversharing**.

In a world where identity theft, data breaches, and regulatory risks are rising, selective verification is not only more secure—it is smarter.

