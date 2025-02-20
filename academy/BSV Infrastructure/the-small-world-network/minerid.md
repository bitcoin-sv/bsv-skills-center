# MinerID

MinerID is a protocol that allows a node operator to embed information inside the coinbase transaction of each block they win to be associated with a real world identity.

<figure><img src="../../../.gitbook/assets/Chapter 5 GIF 12.gif" alt=""><figcaption></figcaption></figure>

A minerID is simply a public key from an ECDSA keypair. These keys are used to sign minerID metadata the node adds into a False Return output. Use of ECDSA cryptography to sign minerID metadata (as opposed to generating unsigned arbitrary data) provides data non-repudiation, linking Miner identity to mined blocks in a reliable way.

MinerID gives node operators a way to provide proof of their activities to regulators and each other. Its use is optional.
