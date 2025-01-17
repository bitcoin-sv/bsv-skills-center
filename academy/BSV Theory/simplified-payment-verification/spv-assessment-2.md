# SPV - Assessment 2



1. By being able to \_\_\_\_\_\_\_\_ i) of the transaction itself (the TXID) can be \_\_\_\_\_\_\_\_ ii) a block that has been accepted and built upon by the network, a user can safely say that the \_\_\_\_\_\_\_\_\_\_ iii).
   1. i) validate the merkle root, ii) shown to have existed in, iii) Merkle tree is valid
   2. i) hash the parent and child, ii) timestamped by, iii) transaction is immutable.
   3. i) show the hash, ii) can be safely removed from, iii) transaction is no longer needed.
   4. i) validate that the hash, ii) provenly shown to exist in, iii) transaction is valid.
2. &#x20;What does being able to verify a transaction allow users to do?
   1. Using block headers, a user can build a verifiable history of transactions according to needs that can serve to demonstrates proof to others.
   2. A user can spend that transaction using that verification as proof of ownership.
   3. A user can search the ledger in order to see which wallet controls the coins that were transacted.
   4. None of the above.
3. &#x20;In what scenario is it possible for an attacker to present information about an invalid transaction that would imply that it had been accepted into the longest chain of proof of work and built upon by the majority of the network?
   1. If an attacker achieves 51% of the network hashpower they can force nodes to accept double spent transactions which would be impossible for honest nodes to detect and may ultimately destroy trust in the network.
   2. If an attacker overpowers the network and extends the longest chain of proof of work upon a block containing an invalid transaction or doesn’t comply with network rules, users wallets will be unable to determine that the longest chain is not valid.
   3. An attacker can easily deceive a lightweight node by feeding it incorrect transaction records thereby isolating it from the rest of the network.
   4. All of the above.
4. &#x20;For how long can an attacker make an invalid transaction appear valid and how is the attack reversible?
   1. An invalid transaction made to appear valid can be maintained indefinitely and once built upon constitutes a poisoned block which, due to the non-reversibility of the chain of blocks, practically guarantees chain-death if not first identified and rejected by honest nodes.
   2. Such an attack can be maintained for as long as the attacking node can trick other nodes into accepting it’s blocks. As soon as the honest chain of blocks overtakes the dishonest chain, user systems will reject the invalid chain and jump across to the now longer valid chain, rendering the attacker’s transactions void and destroying the investment in the proof of work used to build the chain.
   3. Such an attack can be maintained for as long as the attacking node can prevent new blocks from being built. As soon as the honest nodes are able to build new blocks, user systems will reject the invalid chain and begin building a new chain, rendering the attacker’s transactions void and destroying the investment in the proof of work used to build the chain.
   4. Such an attack can be maintained for as long as the attacking node can afford to control the majority of the network’s hashpower. As soon as the honest chain of blocks overtakes the dishonest chain, user systems will reject the invalid chain and jump across to the now longer valid chain, rendering the attacker’s transactions void and destroying the investment in the proof of work used to build the chain.
5. &#x20;This strategy and illusion making invalid transactions appear valid can only be maintained for as long as the attacking node can \_\_\_\_\_\_\_\_\_\_ i). As soon as the honest chain of blocks overtakes the dishonest chain, user systems will \_\_\_\_\_\_\_\_\_ ii) to the now longer valid chain, rendering the attacker’s transactions \_\_\_\_\_\_\_\_\_\_\_\_ iii). A dishonest attack of this form is enormously costly, and must be conducted in a way that is \_\_\_\_\_\_\_\_\_\_\_\_ iv), making it extremely risky for the operators of dishonest nodes to participate in such attacks on the network’s validity.
   1. i) afford to maintain a majority of the network hash, ii) reject the invalid chain and jump across, iii) void and destroying the investment in the proof of work used to build the chain, iv) fully visible to the public
   2. i) perform denial of service attacks to prevent new blocks from being accepted, ii) revert, iii) frozen, iv) secretive
   3. i) have it’s blocks accepted, ii) reject the dishonest blocks and jump, iii) null, iv) private
   4. i) reap block rewards,ii) ban the attacking node from the network and revert, iii) frozen, iv) fully public and expensive
