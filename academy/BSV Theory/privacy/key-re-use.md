# Key Re-Use

> As an additional firewall, a new key pair should be used for each transaction to keep them from being linked to a common owner.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Privacy - Key Re-use.gif>)

In situations where a user is receiving all of their funds into a re-used locking script, it becomes much easier to see what funds that user has received, and when they are spending them as a locking script is tied to a private key that would typically be held by a single person. In order to mitigate against this risk, the user can simply choose a new private key every time new funds are being received in order to separate the digital coins on the ledger.

Most wallets are capable of doing this through techniques collectively known as Hierarchically Deterministic Keychains which allow the wallet to generate an effectively unlimited number of keypairs from a predetermined seed. This ostensibly allows the user to ‘recover’ their wallet through re-creation of the original seed in the event the wallet is lost or destroyed.

Learn more about Deterministic wallets here: [http://wiki.bitcoinsv.io/index.php/Deterministic\_wallet](http://wiki.bitcoinsv.io/index.php/Deterministic_wallet)
