# Linked Keys

The system known as "type-42," based on the BRC-42 technical standard introduces a sophisticated method of key derivation that enhances privacy and enables what are known as "private signatures." This document aims to elucidate the principles of type-42 derivation, demonstrate its role in enabling private signatures, and explore its broader implications within the BSV ecosystem.

## Understanding Key Derivation

Before delving into the specifics of type-42, it is essential to understand the concept of key derivation in cryptographic systems. Key derivation is a process that generates one or more keys from a single master key, which can then be used for various cryptographic purposes, such as encryption, decryption, and digital signing. Traditional key derivation methods like BIP32 offer limited flexibility and privacy because they restrict the number of derivable keys and allow anyone to see all the derived children, even those computed by others.

## The Type-42 Key Derivation Method

Type-42 improves upon traditional approaches by allowing two parties to independently generate a series of secret keys for each other using shared information that remains confidential between them. It improves upon BIP32 because instead of having one single public key derivation universe the entire world can see, each set of two parties who are communicating with one another share their own unique, private key derivation universe only the two of them can access. This method utilizes the following components and steps:

1. **Identity Keys**: Each party maintains a master private key and a master public key. The whole world can know the master public key.
2. **Shared Secret Computation**: When two parties wish to interact, sign or validate messages, they first compute a shared secret. This is achieved by one party using their private key and the other party's public key in elliptic curve point multiplication.
3. **Key Generation Using Invoice Numbers**: To generate a unique key for a payment, message or any other purpose, the parties agree upon a specific invoice number as an identifier. An HMAC (Hash-based Message Authentication Code) is computed over this invoice number using the shared secret as the key, ensuring that each key is unique and known only to the involved parties. One party could generate the invoice number and send it to the other. Publishing the invoice number doesn't compromise security because of the HMAC.
4. **Private and Public Key Derivation**: The HMAC output is used to derive new child keys—both private and public—ensuring that both transactional privacy and security are maintained.

## Enabling Private Signatures with Type-42

Private signatures are a crucial application of type-42 derivation. In traditional digital signature schemes, anyone with access to the signer's public key can verify the signature. However, with Type-42:

* **Enhanced Privacy**: The signature can only be verified by someone who knows the specific shared secret used to derive the keys involved in the signature. This means that outside parties cannot verify the signature or link it back to the signer without access to the shared secret, enhancing the privacy of the exchange.
* **Security Against Replay Attacks**: Since each transaction uses a unique key derived from a different invoice number, the risk of replay attacks (where a valid data transmission is maliciously or fraudulently repeated) is minimized. This is especially true when rolling or time-based invoice numbering schemes are used.
* **Auditable by Design**: For situations requiring transparency (e.g., audits), the shared secrets or the HMAC outputs can be disclosed to specific entities, like tax agencies, without compromising the overall security of the system, or of unrelated transactions.

## Broader Applications

Beyond private signatures, type-42 key derivation can be applied in various other contexts within BSV transactions. These include secure message exchanges, private invoicing systems, and more flexible wallet architectures that support a multitude of applications and services without compromising security or privacy.

Type-42 not only facilitates more secure and private digital signatures but also heralds a new era of cryptographic flexibility and interoperability in digital asset transactions. You can check out a tutorial leveraging the new TypeScript SDK's type-42 features [here](../../guides/sdks/ts/examples/EXAMPLE\_TYPE\_42.md).
