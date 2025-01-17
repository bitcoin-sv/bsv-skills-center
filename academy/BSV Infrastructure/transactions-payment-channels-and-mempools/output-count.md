# Output Count

[https://player.vimeo. com/video/674765482](https://player.vimeo.com/video/674765482)

The output count is a 1-9 byte field representing a positive integer in VarInt format. It indicates the number of outputs created by the transaction.

[https://player.vimeo. com/video/650024360](https://player.vimeo.com/video/650024360?h=60f448f23b\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Note that the number of spendable outputs that can be created in a transaction is limited to approimately. 4.3 billion, despite the fact that the Out-counter field can accommodate a much larger value. This limit is due to the fixed 4-byte length of the Previous TxOut-Index field in the transaction inputs, as explained in the previous section.
