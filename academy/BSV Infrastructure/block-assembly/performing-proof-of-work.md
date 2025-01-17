# Performing Proof-of-Work

[https://player.vimeo. com/video/674783239](https://player.vimeo.com/video/674783239)

To perform this proof-of-work function, each node distributes the mining candidate to one or more pool-miners, which will typically manage a set of ASIC-based (Application Specific Integrated Circuit) hashing machines. These so-called ‘ASIC-miners' take a supplied block header and cycle through nonce values. Each time the nonce is changed, the resultant serialised string of the block header is put through a double SHA256 hash function. If the resultant hash is less than or equal to the difficulty target, the block header is valid and can be added to the chain.

[https://player.vimeo. com/video/649540410](https://player.vimeo.com/video/649540410?h=68d2330220\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Because pool miners know how much Bitcoin is awarded in the Coinbase transaction, they can also calculate the proportional rewards they will receive per hash operation performed. This allows them to determine the profitability of operating certain hash machinery at any given moment. This can be calculated based on instantaneous energy costs, energy consumption of ASIC-miners and the operational and capital expenditure of their enterprise. This allows the best pool miners to make the most economically sensible decision available to them at any given moment.

[https://player.vimeo. com/video/649540546](https://player.vimeo.com/video/649540546?h=1e97ec3155\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

Each pool-miner uses their mining candidate to generate unique block headers and coinbase transactions for the ASIC-miners it controls. Each miner performs a cycle of up to 4.3 billion nonces on each header candidate in an attempt to find a winning solution to the hash puzzle.
