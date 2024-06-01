# Installation

Deployment of Bitcoind can be done in many ways, depending on the requirements of your deployment, it could be fairly minimal, or very involved.

Before undertaking such a process, it is important to consider if you really need a Bitcoin node.  Services such as ARC provide transaction processing and informational services to merchants, exchanges and anyone else who needs to interact with the blockchain without the encumbrance of running a Bitcoin node themselves.

If you are a Miner, at the bare minimum you will need to [setup your Bitcoin node](./) by running bitcoind and setup the [Alert System](../alert-system/running-the-alert-system/).

## Recommendation for non-mining entities

The BSV Association has been advocating for non-mining entities (exchanges and other applications) to remove their reliance on the SV Node software for daily operations because of the constantly increasing traffic on the BSV network.&#x20;

The BSV Association strongly believes in the scaling roadmap laid out in the Bitcoin Whitepaper, which specifies that non-mining entities should use Simplified Payment Verification (SPV) to transact on the BSV network. We strongly encourage any non-mining entities that currently operate the node software for their daily operations to reach out to us as the BSV Association to learn about the SPV Wallet reference implementation to replace their reliance on the mining node software.

For non-mining businesses that insist on continuing to run the node software, we strongly encourage installation and connection of the Alert System to remain in sync with the valid longest chain.&#x20;

For non-mining businesses that do not want to run the Alert System, we recommend modifying the following configuration in your bitcoin.conf file:

```editorconfig
enableassumewhitelistedblockdepth=1
assumewhitelistedblockdepth=6
```

This ensures that your peer remains in sync with any validly processed DAR Alert Messages.
