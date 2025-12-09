# Controlling the Block Discovery Rate

To compensate for increasing hardware speed and varying interest in running nodes over time, the proof-of-work difficulty is determined by a moving average targeting an average number of blocks per hour. If they're generated too fast, the difficulty increases.

\- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Proof of Work - Controlling the Block Discovery Rate.gif>)

In order to allow for node operators who invest in more efficient hardware to help discover more valid blocks through the proof of work process, the network uses an algorithm that adjusts the network difficulty to maintain a steady rate of block discovery no matter how many CPU cycles are applied to the proof of work process.

_The original Bitcoin client updated the difficulty target every 2016 blocks to try and control the block discovery rate to a speed as close to 6 blocks per hour as possible, however the current difficulty adjustment algorithm changes the rate every block in an attempt to compensate for the dynamics of the multiple competing SHA256 chains that currently exist. The difficulty algorithm will be adjusted back to the original 2016 block adjustment rate in the near future._

This results in an ideal average of 144 blocks per day and means that the nodes would update the difficulty target every 2 weeks in a case where the network hashrate remained relatively static. The reality is that the block discovery process is a randomised process and can result in blocks being discovered at constantly changing rates.
