# Transaction Lock Time (nLockTime)

[https://player.vimeo. com/video/674765614](https://player.vimeo.com/video/674765614)

The final field of a transaction contains a 4-byte nLockTime value.

[https://player.vimeo. com/video/650024425](https://player.vimeo.com/video/650024425?h=d3a6f69930\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

If nLockTime < 500,000,000, the integer value is interpreted as the block height. Otherwise the integer is interpreted as the UNIX timestamp. If any of the transaction’s inputs have a non-final nSequence number, nLockTime represent the earliest time at which the transaction can be timestamped in a block.

[https://player.vimeo. com/video/650024458](https://player.vimeo.com/video/650024458?h=d275c37c76\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

[https://wiki.bitcoinsv.io/index.php/NLocktime\_and\_nSequence#nLockTime](https://wiki.bitcoinsv.io/index.php/NLocktime_and_nSequence#nLockTime)

Note that the nLockTime of a transaction is ignored if all the transaction inputs have the maximum nSequence value (UINT\_MAX). In this case, the transaction may be included in any valid block, irrespective of its nLockTime value.
