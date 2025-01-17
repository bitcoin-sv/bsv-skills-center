# Input Count

[https://player.vimeo. com/video/674764676](https://player.vimeo.com/video/674764676)

Input count is a 1-9 byte field representing a positive integer in VarInt format, which defines how many inputs the transaction has. The upper bound on this field (approx. 1.8x10^(19)) is many times larger than the total number of satoshis (approx. 2.1x10^(15)). This means that the upper bound on the input counter size does not present a practical limitation. The value of Input count tells the validation engine how many UTXOs are being spent in the transaction.

[https://player.vimeo. com/video/650024270](https://player.vimeo.com/video/650024270?h=962c7e1129\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

This indicates to the node how many distinct UTXOs must be retrieved from its UTXO set in order to validate the transaction.

