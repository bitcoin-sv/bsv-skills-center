# Course 3: Pruning: Trimming the Digital Fat in Identity Systems

## 1. Introduction: Forgetting with Purpose&#x20;

In physical life, people do not carry every report card, utility bill, or expired licence. Yet in digital identity systems, old and irrelevant data often remains stored indefinitely. This creates unnecessary risks, bloats system storage, and undermines privacy.&#x20;

Pruning is the method by which identity systems can safely and intentionally forget outdated or irrelevant data—without compromising the integrity or verifiability of the system as a whole. &#x20;

### Quiz – Introduction (True/False)&#x20;

Pruning allows identity systems to delete outdated data without compromising trust or structure.&#x20;

Answer: True &#x20;

## 2. What Is Pruning in Identity Systems?&#x20;

Pruning refers to the removal or exclusion of obsolete, unnecessary, or overly revealing data from identity records. It ensures that only current and relevant information is retained while older, redundant data is either removed or not carried forward.&#x20;

This does not mean deleting everything. Rather, it involves thoughtful omission to support privacy, reduce risk, and improve efficiency.&#x20;

**Analogy: The Selective Memory Closet**&#x20;

Think of pruning as cleaning out a closet. You do not discard everything—only what you no longer wear, need, or want others to see. What remains is useful, presentable, and fit for purpose.&#x20;

Digital identities work the same way. Pruning lets you carry forward only the attributes that matter now—and nothing more. &#x20;

### Quiz – What Is Pruning? (Multiple Choice)&#x20;

Which of the following best describes pruning in digital identity systems?&#x20;

A. Encrypting personal data for security \
B. Updating user records with new information \
C. Removing or excluding irrelevant or outdated identity data \
D. Creating duplicate identity trees for backup purposes&#x20;

Answer: C &#x20;

## 3. Why Prune? Key Benefits&#x20;

**1. Enhanced Privacy**&#x20;

Old or unnecessary identity data increases the risk of exposure. Pruning ensures only the most relevant data is accessible, reducing the surface area for data breaches or misuse.&#x20;

**2. Compliance and Regulation**&#x20;

Many data protection laws, including GDPR, require data minimisation and timely deletion. Pruning supports legal compliance.&#x20;

**3. System Efficiency**&#x20;

Removing non-essential data lightens the data load, improving performance and reducing storage costs.&#x20;

**4. Evolving Identity**&#x20;

People change jobs, homes, and roles. Pruning allows an identity to reflect current status without being burdened by obsolete past attributes. &#x20;

### Quiz – Benefits of Pruning (Matching)&#x20;

Match the benefit to its outcome:&#x20;

1. Enhanced privacy&#x20;
2. Legal compliance&#x20;
3. System efficiency&#x20;
4. Evolving identity&#x20;

A. Deletes data that no longer reflects user status \
B. Reduces storage and processing burden \
C. Limits exposure of sensitive or outdated information \
D. Supports GDPR and other regulations&#x20;

Answers: \
1 → C \
2 → D \
3 → B \
4 → A &#x20;

## 4. How Pruning Works in Practice&#x20;

Pruning can occur in several ways:&#x20;

* Data omission: When generating new proofs or credentials, the system selectively includes only the relevant, up-to-date information. For example, a digital identity issued for accessing healthcare services might omit past travel visas, educational credentials, or expired job certificates. This allows a user to present a lean, context-specific proof without exposing their complete history.&#x20;
* Attribute revocation: Credentials that are no longer valid—such as an outdated address or an expired driver’s licence—are explicitly marked as revoked. This status is either published in a revocation registry or omitted from future credential sets. Revocation ensures that verifiers do not mistakenly accept outdated or invalid information.&#x20;
* Snapshotting: Instead of appending data endlessly, identity systems can generate a fresh identity state—a new "snapshot"—that contains only currently valid attributes. This snapshot becomes the new anchor for future proofs. For instance, a student who graduates and relocates might request a new identity snapshot that includes a verified degree and updated residence, leaving out older academic transcripts or previous home addresses.&#x20;

Integrity is maintained through cryptographic links (such as Merkle roots or signed attestations) that prove the completeness and correctness of what remains.&#x20;

**Use Case: Removing Old Job Roles**&#x20;

A digital identity linked to employment history may contain outdated job titles or expired work credentials. These can be pruned when applying for a new position that only requires a specific current certification. &#x20;

### Quiz – Pruning Mechanisms (Multiple Choice)&#x20;

Which technique ensures that pruning does not break data integrity?&#x20;

A. Removing all data from a blockchain \
B. Hashing random data attributes \
C. Using Merkle roots and cryptographic proofs to verify subsets \
D. Updating metadata without user consent&#x20;

Answer: C &#x20;

## 5. When Should Data Be Pruned?

Pruning should be:&#x20;

* Context-aware: Based on what is needed for a given transaction or use case.&#x20;
* Time-based: Triggered when data becomes obsolete (e.g. expired ID, moved address).&#x20;
* User-driven: Empowering individuals to manage and approve what gets removed.&#x20;

In regulated environments, retention schedules and audit requirements may guide pruning policies. &#x20;

### Quiz – Timing of Pruning (True/False)&#x20;

Pruning should be automatic in all identity systems regardless of user needs or legal context.&#x20;

Answer: False &#x20;

## 6. Conclusion: Smart Forgetting&#x20;

Digital identity systems need the ability to forget—selectively, securely, and intelligently.&#x20;

Pruning ensures that identities remain lean, current, and trustworthy. It reduces risks, respects privacy, and enables compliance, while preserving the cryptographic guarantees needed to prove truth without excess.&#x20;

In a world that is rapidly digitising personal records, pruning is not just helpful—it is essential.&#x20;
