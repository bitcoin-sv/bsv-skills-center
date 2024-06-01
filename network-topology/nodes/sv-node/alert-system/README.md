# Alert System

## Alert System

Version 1.1 reintroduces the Alert System. The Alert System, originally implemented in the v0.3.10 Bitcoin release, enables the BSV Association to send signed messages to the network. Messages can be of an informational or directive nature. This release also contains native support for Digital Asset Recovery alerts. Alongside the release of the Alert System, the BSV Association has released the Network Access Rules of the BSV network. The Network Access Rules specify the terms and conditions by which nodes (miners) in the BSV network operate. As stated in the Network Access Rules, it is expected that all nodes in the network process validly signed Alert Messages broadcast to the network. The Network Access Rules can be read in their entirety here: [bsvblockchain.org/network-access-rules](https://www.bsvblockchain.org/network-access-rules)

The Alert System connects to other nodes using the libp2p protocol, the same peer to peer protocol that will be used in Teranode, and is currently used in IPFS. Libp2p is a modular system of protocols, specifications, and libraries that enable the development of peer-to-peer network applications. The Alert System uses a distributed publish/subscribe (pubsub) mechanism for communication. Alert Generator – the alert publisher – sends an alert to a predefined topic. To receive a published alert, all the Alert System nodes – the alert receivers –subscribe to that topic. The following topics are used for communication:\


<table><thead><tr><th width="114">Network</th><th width="312">Topic</th><th>Protocol ID</th></tr></thead><tbody><tr><td>Mainnet</td><td><code>bitcoin_alert_system</code></td><td><code>/bitcoin/alert-system/1.0.0</code></td></tr><tr><td>Testnet</td><td><code>bitcoin_alert_system_testnet</code></td><td><code>/bitcoin-testnet/alert-system/0.0.1</code></td></tr><tr><td>STN</td><td><code>bitcoin_alert_system_stn</code></td><td><code>/bitcoin-stn/alert-system/0.0.1</code></td></tr></tbody></table>

## Alert Messages

Read more about the type of alert messages being sent in [alert-messages.md](alert-messages.md "mention")

## How to run the Alert System

Instruction and installation guide available in [running-the-alert-system](running-the-alert-system/ "mention")

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
