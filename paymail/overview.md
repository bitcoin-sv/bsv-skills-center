# Overview

**paymail** is a collection of protocols for Bitcoin SV wallets that allow for a set of simplified user experiences to be delivered across all wallets in the ecosystem.

❌ No more complicated `17Dx2iAnGWPJCdqVvRFr45vL9YvT86TDsn` addresses

✅ Simple payment handles like `<alias>@<domain>.<tld>`

The goals of the paymail protocol are:

* User friendly payment destinations through memorable handles
* Permissionless implementation
* Self-hosted or delegated to a managed service
* Automatic service discovery/location
* PKI infrastructure
* Cross-wallet exchange of single-use transaction output scripts of any construction
* Request and response authentication
* Security and policy management
* Capability extensibility and discovery

## bsvalias

The family of related protocols are collectively referred to as the `bsvalias` protocols. At the time of writing, these include:

* [BRFC Specifications](brfc-specifications/)
* [Service Discovery](service-discovery/)
* [Public Key Infrastructure](public-key-infrastructure.md)
* [Payment Addressing](payment-addressing/)

## paymail

**paymail** is the name for the implementation of the following protocols:

* [Service Discovery](service-discovery/)
* [Public Key Infrastructure](public-key-infrastructure.md)
* [Basic Address Resolution](payment-addressing/basic-address-resolution.md) from the [Payment Addressing](payment-addressing/) protocol group

The **paymail** brand is reserved for products and services that, at a minimum, implement each of the above.

## Extension Protocols

As defined in the [BRFC Specifications](brfc-specifications/), anybody can propose an extension to the `bsvalias` and paymail protocols, and as per the [Capability Discovery](service-discovery/capability-discovery.md) section of the [Service Discovery](service-discovery/) protocol, implementations can declare support for extensions to allow for cross-wallet processes.

Extension protocols are the collection of protocols not contained within the core paymail set defined above, but that are fully compatible with `bsvalias` protocols and paymail implementations. Notable examples presently include:

* [Sender Validation](payment-addressing/sender-validation.md)
* [Receiver Approvals](payment-addressing/receiver-approvals.md)
* [PayTo Protocol Prefix](payment-addressing/payto-protocol-prefix.md)
* MultiSig authorisations
* Threshold signature group secret setup and message signing
* Payment channels
