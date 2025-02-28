# Hash Functions and BSV's Security Model

![](../.gitbook/assets/BSVA-HashFunctions_Ch7L2_DA1.gif)

To understand the role hash functions play in BSV's security, it's important to understand the overall approach to security BSV takes first. Although BSV uses the same primitives as current Public Key Infrastructure (PKI), it employs them in a much more granular and effective way. In all current information systems in use today, whenever any type of information is transferred, it’s sent from one account to another, and its most often fully end-to-end encrypted. By using UTXOs, BSV firewalls identity from network activity.

## What is PKI?

Public Key Infrastructure or PKI is the set of elements and practices used to secure network communications. It's used to secure everything from email and web communication to bank transfers, digitally signing software, encryption, and smart card authentication.

To secure communication between two network participants, PKI uses certificates issued by a trusted 3rd party that form the basis of asynchronous end-to-end encryption between two participants.

PKI has 4 main elements: digital certificates, a certificate authority, a registration authority, and a certificate store.

### **Digital Certificate**

Digital certificates work like passports. They're a form of electronic identification for websites and organizations. Two parties can be sure of each other's identities when they're both able to provide a trusted digital certificate to each other saying who they are.

For local area networks (LANs) or internal networks, internal digital certificates can be created locally. For commercial wide area network infrastructure like public websites, a digital certificate is obtained via a trusted 3rd party issuer called a Certificate Authority.

### **Certificate Authority**

Certificate authorities are the arbiters of PKI systems. It's their job to authenticate the digital identities of the system participants.

Similar to a federal government issuing a passport, Certificate Authorities vet the system participants who are applying to get a trusted certificate. If the participant passes the Certificate Authority's vetting process, they're issued a trusted certificate, and the other participants in the system will communicate with the newly trusted entity based on the fact they were issued a trusted certificate by the Certificate Authority.

### **Registration Authority**

Registration Authorities are actually a sub-part of Certificate Authorities. They interact with network participants and instruct Certificate Authorities to issue certificates. The purpose of Registration Authorities is to help make the PKI system more efficient. Instead of a single Certificate Authority handling all requests directly, participants interact with strategically distributed Registration Authorities.

### **Certificate Store**

Certificate Stores are central repositories that hold all the certificate history and information related to the PKI system including issued certificates and private encryption keys. An example is Google Wallet.

## The Problems With PKI

You may have noticed there are a couple of major security problems with PKI systems:

1. If an attacker gains control of the Certificate Authority, they then gain the ability to infiltrate all network participants' systems because they can issue themselves a trusted certificate and none of the network participants would be able to tell they're actually communicating with an attacker.
2. Storing all sensitive information in a single location creates a big incentive to attack or try to infiltrate said location because a single attack can gain the attackers access to all the private keys on the network.

However, there is one other security hole in PKI systems you may not have considered. Since all network communication is encrypted, if an attacker is able to convince a participant within the network to open a secure communication channel with them, the attacker is then able to send malware to and steal data from that participant and any others they're able to gain access to using the participant's trusted certificate because network administrators can't tell what's happening by looking at network traffic -- they have no idea what's being passed between two participants on the network.

This type of attack is called **shovelling in the shell** and it's a common attack vector used for many common cyber- crimes today like **ransomware attacks** or **data exfiltration**.

## What are HMACs?

An HMAC (keyed-hash message authentication code or hash-based message authentication code) is a type of message authentication code (MAC) that uses a good hash function and a secret key. As with any message digest or MAC, it can be used to verify the authenticity and integrity of a message.

HMACs provide message authentication and integrity using a symmetric shared secret rather than asymmetric digital signatures. Instead of PKI, HMACs delegate the exchange of the shared secret to the communicating parties prior to messages being sent.

Any good hash function can be used for an HMAC. For example, if SHA-256 was used, the message would be an HMAC-SHA-256 message.

An HMAC doesn't encrypt the message. Rather, it's sent along with the message which can be encrypted or not, but its authenticity and integrity will be computable using the HMAC as long as the receiving party has the shared secret.

## The Problem With HMAC's

HMACs have one major problem which is the communication of the shared secret between the two parties. If an attacker were to discover or intercept the shared secret, they can setup a **man-in-the-middle-attack** and, as with PKI, deploy a ransomware payload or exfiltrate sensitive information.

## BSV's Approach to Security Using Hash Functions and Blockchain

BSV solves all the problems with PKI and HMACs by doing away with certificate authorities altogether, and making communications public.

BSV is a Write-Once-Read-Many (WORM) system. It's also an immutable time stamp service. As a result, once a transaction on the BSV blockchain has been widely distributed, its authenticity is no longer at risk. The first-seen-rule for transactions ensures the first transaction that spends a particular UTXO seen on the network is the accepted transaction.

Section 10. _Privacy_ of the Bitcoin white paper describes BSV's new privacy model: "The public can see that someone is sending an amount to someone else, but without information linking the transaction to anyone. This is similar to the level of information released by stock exchanges, where the time and size of individual trades, the "tape", is made public, but without telling who the parties were."

Instead of having to rely on accounts, UTXOs allow for the encapsulation of each informational event – down to the packet. Rather than each individual using accounts which hold the entirety of each respective communication history like a Facebook or Google account, BSV allows each ‘post’, ‘like’, ‘email’, etc. to be an atomic event unto itself which is publicly recorded, yet occluded. Each UTXO is a record of ownership between individuals, but those individuals are only linked to the transactional event pseudonymously. This means illegal and nefarious actions are publicly time-stamped and traceable, but individual identity and activity remains private.

This also means that with BSV, it’s no longer necessary to communicate through an intermediary server or application which stewards each account-based ecosystem or network. With BSV's UTXO model, individuals can communicate directly – from “IP to IP”. Instead of sending an email to Google or Microsoft servers to be routed to its intended recipient which is expensive, and makes Google and Microsoft prime targets for data exfiltration, email can be sent directly from one individual’s email client to another’s.

For example, in 2011, DigiNotar, one of the largest certificate authorities in existence at the time, was hacked, and its root certificate key was compromised. This meant the entirety of all TLS/SSL encryption used by Microsoft, Google, and any other websites using a certificate issued by DigiNotar were also compromised. [The problem was first publicly reported by a user in Iran](https://security.googleblog.com/2011/08/update-on-attempted-man-in-middle.html) who was the victim of a Man-In-The-Middle attack on Google servers which allowed the attacker to create a relay connection between users and Google – meaning they could see all internet traffic being sent to and from Google servers. It was such a serious breach that DigiNotar was nationalized by the Dutch government (where it resided), and dissolved within a month. Bitcoin solves the “crunchy shell” model of certificate authorities like DigiNotar.

Instead of the account-based model which requires a central authority to manage network activity and looks at events as occurring after a connection between the relevant parties has been made, BSV's UTXO model allows the identities of the relevant parties to be packaged into the event itself. This change in perspective creates the necessary pressures to cause the formation of a densely connected small-world network of nodes, which in turn, allows blocks sizes to grow and transaction fees to decrease.

It’s this scalability of the network – driven by the economic incentives and UTXO basis – that makes the BSV network so secure and efficient. Like the metaphorical cables of a suspension bridge, hash functions, Merkle trees, digital signatures, UTXOs, economic incentives, and the small-world emergent network formation all work in unison to make the BSV network the most secure and efficient system design in operation today.
