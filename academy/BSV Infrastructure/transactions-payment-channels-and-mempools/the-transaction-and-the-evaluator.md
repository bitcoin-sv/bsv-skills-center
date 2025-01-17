# The Transaction and the Evaluator

[https://player.vimeo. com/video/648430549](https://player.vimeo.com/video/648430549)

A transaction is the basic message format used to create an entry on the Bitcoin ledger. It is presented as the serialisation of a set of fields, where some fields are of fixed length and others of variable length.

[https://player.vimeo. com/video/650024160](https://player.vimeo.com/video/650024160?h=28e45a2b52\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

The fields contained within a transaction are the following:

1. Version no. (4 bytes)
2. Input count (1-9 bytes)
3. Input list (Variable length)
4. Output count (1-9 bytes)
5. Output list (Variable length)
6. nLocktime (4 bytes)

At its most simple abstraction, a transaction represents a proposed entry to the Bitcoin ledger. When a transaction is received by a node, it is put through a set of rule checks and tests to ensure it is valid before determining what to do with it.
