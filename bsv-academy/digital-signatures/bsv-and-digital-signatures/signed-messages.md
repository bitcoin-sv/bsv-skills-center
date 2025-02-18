# Signed Messages

The BSV protocol provides a standard way to sign arbitrary non-transaction data with a BSV private key. The primary use for message signing is for message authentication, such as signing a message to demonstrate access to a particular BSV address. The authentication demonstrates that the party signing the message is in possession of the private key at the specific time of signing.

**Private / Public Key Generation**

Generating private and public keys remains the same as described in bitcoin transactions, and there are few wallets which provide the feature of signing messages using the private keys.

**Signing the message**

The message is prepended with the string "Bitcoin Signed Message:\n" and the length of the data. It is then hashed twice with SHA 256, then signed with ECDSA. The signature is then formatted as $$(i,r,s)$$, which is 65 bytes. The length of i is 1 byte, and the length of both r and s is 32 bytes. Finally, base 64 encoding is applied to the tuple $$(i,r,s)$$.

**Verifying the message**

The address is transmitted along with the message and signed message. As per the parity byte, in the signature $$(i,r,s)$$, either 0,1, 2,3, or 4 candidate public keys can be derived. First, the message is prepended with the string "Bitcoin Signed Message:\n" and hashed twice with SHA 256, before signing. Then, the verification algorithm is executed for each candidate key. If one of the verification iterations for one of the public key yields a True then the signature is considered valid. The public key for which the verification algorithm returns true is converted to an address and validated against the address transmitted by the sender.

Recall an address is the public key, double-hashed by RIPEMD-160(SHA-256(Message)) and then encoded as base58 string.
