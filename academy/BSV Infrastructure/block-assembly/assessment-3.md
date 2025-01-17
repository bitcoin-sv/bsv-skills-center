# Assessment 3



_6 out of 8_

1. In the early days of Bitcoin a problem emerged with nodes generating identical coinbase transactions creating multiple transactions with the same Transaction IDs. How was this problem solved?
   1. Nodes now calculate the coinbase Transaction IDs using a UNIX epoch timestamp to ensure that each coinbase transaction is unique.&#x20;
   2. Coinbase Transaction IDs are now predetermined by the protocol.
   3. Blocks with coinbase Transaction IDs that are identical to a previous Transaction ID are now rejected as invalid.
   4. A consensus rule was created that requires that the first part of the scriptSig string must be a varInt containing the block height.  ✓
2. How do nodes often identify themselves to the rest of the network within a coinbase transaction?
   1. Using the remainder of the input string.  ✓
   2. By inputting a hash of their IP address into the transaction.&#x20;
   3. Using OP\_CHECKSIG.&#x20;
   4. All of the above.&#x20;
3. When can outputs from the coinbase transaction be spent?
   1. Immediately.&#x20;
   2. After two blocks.&#x20;
   3. After one hundred blocks.  ✓
   4. After 1000 blocks.&#x20;
4. What do the outputs of the coinbase transaction have to contain?
   1. Equal or less satoshis then the combined transaction fees and block subsidy.  ✓
   2. Less satoshis then the combined transaction fees but equal satoshis for the block subsidy.&#x20;
   3. Only the satoshis of the Block Subsidy.&#x20;
   4. A FALSE RETURN with a signature hash.&#x20;
5. **Which best describes the Block Subsidy?**
   1. A predetermined distribution of bitcoins to block winning nodes.  ✓
   2. An algorithmically defined distribution of Bitcoins to all nodes over time.&#x20;
   3. The combined sum of the transaction fees and the block reward that is distributed to block winning nodes over time.&#x20;
   4. A continual process by which the network rewards miners equally for producing successful blocks.&#x20;
6. **The Block Subsidy started at \_\_\_\_\_\_ bitcoins in 2009 and reduces by \_\_\_\_\_\_ every\_\_\_\_\_ blocks, steadily decreasing until it reaches zero in around \_\_\_\_.**
   1. 75, 50%, 75,000, 2040
   2. 50, 50%, 210,000, 2140  ✓
   3. 250, 50%, 120,000, 2140
   4. 100, 25%,100,000, 2040&#x20;
7. **What happens if the outputs from a miner’s coinbase transaction are a lower value than the block reward?**
   1. The unclaimed satoshis are redistributed into the next block reward.&#x20;
   2. The unclaimed satoshis are removed from circulation.  ✓
   3. The unclaimed satoshis are returned to the subsidy.&#x20;
   4. The coinbase transaction is invalid.&#x20;
8. **What does a mining candidate consist of?**
   1. ✓
      1. The hashPrevBlock
      2. The block version
      3. The difficulty target for this block
      4. The block template’s Merkle root
      5. The Coinbase transaction and its Merkle path
      6. A timestamp
      7. A UUID for job coordination
   2. &#x20;
      1. A list of compacted transaction IDs
      2. The block header
      3. The hashPrevBlock
      4. The Nonce
      5. A UUID for job coordination
      6. The Coinbase transaction
      7. The time
   3. &#x20;
      1. All the transactions in the block including the coinbase
      2. The full Merkle tree
      3. The Merkle path of the coinbase transaction
      4. The hashPrevBlock
      5. The Nonce
      6. The time
      7. The block version number
   4. &#x20;
      1. The full Merkle tree
      2. The block version number
      3. a UUID for job coordination
      4. The mining candidate’s block hash
      5. The difficulty target for this block
      6. The value of the reward in the Coinbase transaction
      7. The MinerID for the ASIC miner.
