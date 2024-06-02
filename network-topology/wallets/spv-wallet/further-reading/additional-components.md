---
description: Not used in the SPV Wallet
---

# ⛏ Additional Components

The journey towards the current reference implementation for the SPV Wallet has not been an easy one. A few attempts have been made to put forward a standard wallet for SPV transactions.

For this reason, there are a number of components in the SPV Toolbox (Formerly the "LiteClient Toolbox") which go unused in the current SPV Wallet implementation. It is possible that some of the components will be useful to other developers despite moving away from them for the reference.

<details>

<summary>Peer Channels Server</summary>

Peer Channels Server is a UDP secure message box service which in the original Lite Client Toolbox was used to capture Merkle Proofs from MAPI for asynchronous delivery to both payment counterparties. This flow has since been deprecated in favor of standard web APIs to reduce complexity.\
\
There is potential to make use of the Peer Channels Server for message box functionality in future, in particular for Mobile to Mobile secure asynchronous communications. This is being considered for our 2024 roadmap. There is some overlap in functionality between Peer Channels and IPv6 Multicast Group Addresses, which may be an even better technology for delivering transactions status updates to multiple counterparties.\
\
Worth mentioning that a few wallet vendors have opted to implement Peer Channels and are doing so in novel ways which fit their business needs. We love to see it.

</details>

<details>

<summary>DPP Proxy</summary>

This server acts as a gateway to devices which are otherwise behind NAT, facilitating Direct Payment Protocol, which saw little to no adoption and has therefore been deprecated.&#x20;

</details>

