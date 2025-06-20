# Course 3: Ethics of Anonymous Data – Consent, Abuse, and Transparency

### 1. Introduction: Is Anonymous Data Really Harmless?

Anonymous data is often presented as the ethical silver bullet—data that is “safe” because it has no names or personal identifiers. But the truth is more complex.

This course explores the **ethical risks** that arise when so-called anonymous data is used for **marketing, AI training, or research**, often **without informed consent** or sufficient oversight.

We will examine real-world examples that show how anonymised data can be abused, re-identified, or weaponised—unless strict ethical standards are applied.

***

#### **Quiz – Introduction (Multiple Choice)**

What is the main ethical concern with anonymised data?

A. It is too expensive to collect\
B. It cannot be stored securely\
C. It may still harm individuals if misused or re-identified\
D. It slows down machine learning

**Answer**: C

***

### 2. The Myth of Safe Anonymity

It is often assumed that once data is “anonymised”, it no longer carries privacy risks. But studies and scandals have shown that this is a dangerous oversimplification.

**Example 1: Netflix Prize Dataset**\
In 2006, Netflix released anonymised user viewing data for a public competition. Researchers soon cross-referenced it with IMDb ratings and re-identified individual users—including their movie preferences and political leanings.

**Example 2: Strava Heatmaps**\
Strava published anonymised fitness data as a global heatmap. Unfortunately, it revealed patterns of movement around military bases, unintentionally disclosing the locations of secret installations and personnel.

These cases highlight that **data does not need a name to be personal**.

***

#### **Quiz – Anonymity Risks (True/False)**

Anonymous data can sometimes be linked back to individuals through cross-referencing with other datasets.

**Answer**: True

***

### 3. Consent and Purpose Limitation

Even when data is stripped of names, ethical use depends on **informed consent** and **respect for the original context**.

**Example: Facebook Emotion Experiment**\
In 2014, Facebook altered the newsfeeds of nearly 700,000 users to test emotional reactions—without explicit consent. Though the data was anonymised, the users had no idea they were subjects in a psychological study.

**Example: Location Data for COVID-19 Tracking**\
During the pandemic, several governments and companies used anonymised location data to study population movement. But without explicit consent, many citizens were unaware their location data was being sold or analysed.

Data should not be repurposed without user knowledge—**even if it is anonymised**.

***

#### **Quiz – Consent (Multiple Choice)**

Which of the following ensures ethical use of anonymised data?

A. Collecting it without user knowledge\
B. Using it for any purpose as long as names are removed\
C. Obtaining informed consent and limiting use to agreed purposes\
D. Sharing it freely with advertisers

**Answer**: C

***

### 4. Anonymised Data in AI Training: What Are the Risks?

Anonymous datasets are widely used to train artificial intelligence systems. But when data lacks transparency or consent, these systems can reinforce bias or harm real people.

**Example: Healthcare AI and Racial Bias**\
An AI system trained on anonymised healthcare data underestimated the needs of Black patients because historical access to care was lower. Even though no names were used, the system perpetuated systemic inequity.

**Example: Facial Recognition with Scraped Images**\
Some AI developers used “public” images from social media to train facial recognition systems—without consent. Even anonymised, these images fuelled surveillance systems deployed by governments and law enforcement.

The question is not “is the data anonymous?”—it is **“should this data be used this way?”**

***

#### **Quiz – AI Ethics (Matching)**

Match the AI data issue to the harm:

1. Scraped social media photos
2. Biased medical records
3. Predictive policing datasets

A. Reinforces health inequities\
B. Violates public expectations of privacy\
C. Amplifies existing law enforcement bias

**Answers**:\
1 → B\
2 → A\
3 → C

***

### 5. The Re-Identification Problem

Many datasets believed to be anonymous can be **de-anonymised** using modern techniques.

**Example: Mobility Data in Europe**\
A 2013 study showed that 4 random data points were enough to uniquely identify 95% of people in a “fully anonymised” location dataset.

**Example: Browsing History Sale**\
Data brokers have sold anonymised browsing histories that, when combined with timestamps or URLs, can easily point back to individual users—exposing preferences, habits, even medical concerns.

Ethically, releasing data that could be re-identified is no different than sharing personal information.

***

#### **Quiz – Re-Identification (True/False)**

Advances in data science make it easier to reverse-engineer anonymised datasets and re-identify individuals.

**Answer**: True

***

### 6. Designing for Ethical Anonymity

Ethical anonymisation is not just about removing names. It requires:

* **Differential privacy**: Adding statistical noise to data to prevent individual re-identification
* **Data minimisation**: Collecting and storing only what is necessary
* **Purpose binding**: Ensuring data is not reused outside its original context
* **Community review**: Engaging impacted communities before deploying large-scale data projects

**Example: Apple’s Differential Privacy Implementation**\
Apple applies differential privacy to collect usage trends from users without identifying them. It is not perfect—but it demonstrates intent to balance insight with privacy.

***

#### **Quiz – Ethical Design (Multiple Choice)**

Which of the following is **not** an ethical data design principle?

A. Data minimisation\
B. Purpose binding\
C. Adding statistical noise\
D. Maximising data resale value

**Answer**: D

***

### 7. Transparency and Accountability in Data Use

Organisations must disclose:

* What data is collected
* Why it is collected
* Who will use it
* Whether it is anonymised or pseudonymised
* What safeguards exist against misuse or re-identification

**Example: Mozilla’s Data Transparency Reports**\
Mozilla publishes detailed reports on data usage, including anonymisation methods and opt-out options—offering users both clarity and control.

This level of **transparency transforms risk into trust**.

***

#### **Quiz – Data Transparency (True/False)**

Ethical data use requires disclosing how and why anonymised data is collected and used.

**Answer**: True

***

### 8. Conclusion: Privacy Without Accountability Is a Mirage

Anonymised data is not immune to abuse. Without informed consent, purpose limits, and transparency, even nameless data can harm people, reinforce inequality, or breach trust.

True ethics in data use means asking not just “can we?”—but **“should we?”**

In marketing, research, and AI, the future belongs to systems that respect privacy, obtain meaningful consent, and design against harm—even when no names are attached.

