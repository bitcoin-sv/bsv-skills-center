# Verification During Attack Situations

> As such, the verification is reliable as long as honest nodes control the network, but is more vulnerable if the network is overpowered by an attacker.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - SPV - Verification During Attack Situations.gif>)

If the network is overpowered by an attacker who is extending the longest chain of proof of work upon an invalid block (either a block that contains an invalid transaction or which doesn’t comply with some other aspect of the network’s rules) user wallets will be unable to determine that the longest chain is not the longest _valid_ chain of proof of work. In this instance it would be possible for the attacker to present information about an invalid transaction that would imply that it had been accepted into the longest chain of proof of work and built upon by the majority of network CPUs.
