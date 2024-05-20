# Overlays

In computer networking, an overlay is a network that run on top of an underlay network such as a tunnel or VPN. The overlay uses the underlay's connections by wrapping data in a package the underlay understands even if the underlay doesn't understand the information within the package. The key concept overlays take advantage of is layering. They wrap a information the underlay doesn't understand with information it does understand so it can be communicated over the existing infrastructure.

BSV utilizes the same concept by using specific transaction formats called transaction templates as well as unique identifiers that can be added to a transaction within the version field.

Overlays and SPV wallets are responsible for maintaining their own data, but they can also decide which kind of information they'll accept.

The benefit of doing things this way is the creation of a semantic network that's agnostic to the underlay network being used: adhering to the P2P nature of the blockchain.

P2P networks are distributed networks where individual components can provide the same services but operate independently. The major advantages they provide are concurrency and parallelism.

The constituent components an overlay requires are:

* UTXO management; e.g., a UTXO store that provides an API&#x20;
* TX store; unlike nodes which don't need to store TX data, overlays do need to store transaction data whether it be to provide TX history or as part of a service mechanism.
* TX validator: Nodes validate the general transaction type while overlays add a further, more specific, validation as a filtering mechanism.
