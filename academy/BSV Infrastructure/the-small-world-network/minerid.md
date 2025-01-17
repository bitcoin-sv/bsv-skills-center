# MinerID

[https://player.vimeo. com/video/674830172](https://player.vimeo.com/video/674830172)

MinerID is a protocol that allows a node operator to embed information inside the coinbase transaction of each block they win to be associated with a real world identity.

[https://player.vimeo. com/video/649875677](https://player.vimeo.com/video/649875677?h=c8bc4ff901\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

A minerID is simply a public key from an ECDSA keypair. These keys are used to sign minerID metadata the node adds into a False Return output. Use of ECDSA cryptography to sign minerID metadata (as opposed to generating unsigned arbitrary data) provides data non-repudiation, linking Miner identity to mined blocks in a reliable way.

MinerID gives node operators a way to provide proof of their activities to regulators and each other. Its use is optional.
