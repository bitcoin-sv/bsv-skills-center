# Course 1: Zero-Knowledge Proofs - Privacy Without Disclosure

## 1. Introduction: Verifying Without Revealing

Imagine needing to prove you are over 18 to enter a venue. You are asked to present your driver's licence. That licence reveals not just your age, but your full name, home address, ID number, and licence history. You gave away far more than needed.&#x20;

Zero-Knowledge Proofs (ZKPs) offer a revolutionary alternative. They allow you to prove a fact—such as being over 18—without revealing why it is true or sharing any supporting documents.&#x20;

This is the essence of privacy without disclosure.&#x20;

### Quiz – Introduction (Multiple Choice)&#x20;

What is the main advantage of Zero-Knowledge Proofs?&#x20;

A. They store personal data on a secure server\
B. They allow facts to be verified without revealing the underlying data\
C. They allow users to generate fake identities\
D. They require biometric authentication&#x20;

Answer: B&#x20;

## 2. What is a Zero-Knowledge Proof?

A Zero-Knowledge Proof is a cryptographic method that allows one party (the prover) to demonstrate to another party (the verifier) that a statement is true—without revealing anything apart from the truth of the statement itself.&#x20;

The concept originates from mathematical proof systems but has now been applied to real-world digital systems, including identity verification, finance, and compliance.&#x20;

### Real-World Example: Proving Your Income&#x20;

A tenant applying to rent an apartment needs to prove they earn above a certain threshold. Instead of submitting full bank statements or salary slips, a ZKP allows the tenant to provide a mathematical proof that they meet the income requirement—without revealing the actual amount or source. &#x20;

### Quiz – What is a ZKP? (True/False)&#x20;

A Zero-Knowledge Proof can verify a person’s claim without revealing the underlying data.&#x20;

Answer: True &#x20;

## 3. How Zero-Knowledge Proofs Work&#x20;

The core principle of Zero-Knowledge Proofs is “convincing without revealing.”&#x20;

A ZKP allows the prover to convince a verifier that a claim is true without disclosing the actual data that supports it.&#x20;

This process depends on three foundational properties:&#x20;

* Completeness: If the claim is true, the verifier will be convinced.&#x20;
* Soundness: If the claim is false, the verifier cannot be tricked into believing it is true.&#x20;
* Zero-knowledge: The verifier learns nothing except that the statement is true.&#x20;

Let us illustrate this using two famous thought experiments.&#x20;

### Analogy 1: The Colour-Blind Test&#x20;

Imagine you are speaking to a colour-blind friend. You have two balls: one red, one green, but otherwise identical. Your friend cannot tell the colours apart. You want to prove to your friend that the balls are, in fact, different colours, without revealing which is which.&#x20;

You give the two balls to your friend. They place one behind their back and then, without you seeing, either keep it in the same hand or switch it. They then show you the ball again and ask, "Did I switch it?"&#x20;

Because you can see colours, you can always answer correctly. Repeating this test many times, your consistent success convinces your friend that the balls are different colours—without you ever telling them which colour is which.&#x20;

The point is: you proved a claim (the balls are different) without revealing the specific distinguishing data (which ball is red or green). That is the heart of a zero-knowledge proof. &#x20;

### Analogy 2: Where’s Wally?

A playful and powerful example comes from the children's puzzle “Where’s Wally?” (also known as “Where’s Waldo?” in some countries).&#x20;

Alice wants to prove to her friend Bob that she knows where Wally is hidden in a crowded illustration—without giving away his location or letting them see Wally themselves.&#x20;

Here is how the Zero-Knowledge version of this scenario works:&#x20;

1. Alice takes a large piece of cardboard and cuts a small viewing window in it—just large enough to reveal Wally.&#x20;
2. Alice places the cardboard over the image, so that only Wally is visible through the hole, and nothing else from the image is shown.&#x20;
3. Alice presents this to Bob. Bob sees that Wally is there, but they cannot tell where in the image you found him.&#x20;

Alice has now proven that you know where Wally is—without revealing his location or helping Bob solve the puzzle. Repeat the process, and the trust in your claim builds.&#x20;

This playful demonstration captures the essence of a ZKP: truth is verified without disclosure.&#x20;

<figure><img src="../../../.gitbook/assets/image.png" alt=""><figcaption></figcaption></figure>

&#x20;

### Quiz – ZKP Properties (Matching)

Match each property with its definition:&#x20;

1. Completeness&#x20;
2. Soundness&#x20;
3. Zero-knowledge&#x20;

A. The verifier learns nothing except the statement is true\
B. If the statement is false, it cannot be proven convincingly\
C. If the statement is true, the proof will convince the verifier&#x20;

Answers:\
1 → C\
2 → B\
3 → A &#x20;

## 4. Applications of ZKPs in Identity

Zero-Knowledge Proofs can be used in identity verification systems to prove personal attributes without sharing actual identity documents.&#x20;

Use Case: Proving Eligibility for Financial Services&#x20;

Financial regulations often require someone to prove they are an accredited investor. Instead of submitting a full financial portfolio, a ZKP can be generated using a signed attestation from a bank or accountant stored on a blockchain. The proof confirms eligibility without revealing net worth, income, or asset details.&#x20;

Use Case: Proving Residence Without Revealing Location&#x20;

When signing up for local services, proving residency is often required. Using ZKPs, a person can prove they live in a region without revealing the street or postal address. The verifier only sees a validated proof that the person meets the regional requirement.&#x20;

### Quiz – ZKP Applications (Multiple Choice)&#x20;

Which of the following is NOT a use case for Zero-Knowledge Proofs?&#x20;

A. Proving investor accreditation\
B. Revealing a full employment history\
C. Proving a minimum income level\
D. Verifying age eligibility&#x20;

Answer: B &#x20;

### 5. Advantages of Zero-Knowledge Proofs&#x20;

Zero-Knowledge Proofs provide several advantages over traditional identity systems:&#x20;

* Enhanced Privacy: No unnecessary information is disclosed.&#x20;
* Data Minimisation: Sensitive data is never shared or stored by the verifier.&#x20;
* Reduced Risk: Limits the surface area for identity theft and fraud.&#x20;
* Verifiability: Proofs can be stored on immutable systems like BSV blockchain for future reference.&#x20;

ZKPs help individuals control their data while still meeting compliance and verification requirements. &#x20;

### Quiz – Benefits of ZKPs (True/False)

ZKPs increase the risk of identity theft because they obscure user details.&#x20;

Answer: False&#x20;

## 6. The Role of Blockchain&#x20;

ZKPs achieve even greater power when combined with blockchain.&#x20;

On a blockchain like BSV, an individual’s verified identity attributes can be stored immutably and referenced by ZKPs. This means that:&#x20;

* A person can generate fresh proofs over time, each one timestamped and independently verifiable.&#x20;
* Blockchain guarantees that no one can tamper with the verified record or its associated ZKPs.&#x20;
* Verification becomes trustless—there is no need to contact the original verifier.&#x20;

### Use Case: Cross-Border Employment&#x20;

A software engineer moving between countries can share ZKPs that prove their qualifications and work history, referencing blockchain-anchored attestations from previous employers—without ever sending a CV or transcript. &#x20;

### Quiz – Blockchain and ZKPs (Multiple Choice)&#x20;

How does blockchain enhance the utility of Zero-Knowledge Proofs?&#x20;

A. It hides all personal data by default\
B. It automatically creates digital identities\
C. It ensures the immutability and timestamping of verified proofs\
D. It requires identity information to be stored off-chain&#x20;

Answer: C &#x20;

## 7. Ethical and Legal Considerations&#x20;

Zero-Knowledge Proofs offer strong privacy but must also support legal and ethical transparency.&#x20;

They should:&#x20;

* Allow lawful auditability in regulated environments&#x20;
* Include mechanisms for optional disclosure when necessary (e.g., during criminal investigations or tax audits)&#x20;
* Be part of broader identity systems that respect cultural and jurisdictional differences&#x20;

ZKPs are not a substitute for trust—they are a tool for improving trust in decentralised, digital ecosystems. &#x20;

### Quiz – Ethical Use (True/False)&#x20;

Zero-Knowledge Proofs should always guarantee absolute secrecy, even in cases of fraud or law enforcement.&#x20;

Answer: False&#x20;

## 8. Conclusion: Trust Without Exposure

Zero-Knowledge Proofs represent a fundamental shift in digital privacy. They enable individuals to prove who they are or what they qualify for—without revealing anything more.&#x20;

In a world increasingly concerned with data misuse and identity theft, ZKPs allow privacy and trust to coexist.&#x20;

They are not only a cryptographic innovation but a societal one—protecting people’s information while preserving their right to participate in digital life.&#x20;

&#x20;

&#x20;

&#x20;

\
