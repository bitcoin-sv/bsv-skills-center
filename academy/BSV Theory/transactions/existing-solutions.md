# Existing Solutions

> The problem of course is the payee can't verify that one of the owners did not double-spend the coin. A common solution is to introduce a trusted central authority, or mint, that checks every transaction for double spending. After each transaction, the coin must be returned to the mint to issue a new coin, and only coins issued directly from the mint are trusted not to be double-spent. The problem with this solution is that the fate of the entire money system depends on the company running the mint, with every transaction having to go through them, just like a bank.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../.gitbook/assets/Theory - Transactions - Existing Solutions.gif>)

When payments are made, the simple validation of the signature does not provide a means for the merchant to check that the coins being handed over have not been spent in a separate transaction which would invalidate this transaction. This is a recurring problem in digital currencies and prior to the introduction of Bitcoin a typical solution was for each transaction to be routed back to a central arbiter who is responsible for checking the validity of the transaction using a closed system.

The inherent weakness of this style of system is that the centralised validation system is managed by a single company or entity which operates like a central clearing house through which all transactions must be routed. This creates problems around transparency and scalability as unlike Bitcoin where a competitive system of incentives drives the network to scale organically, the system is reliant on a single entity or team to manage the growth of the central system and for whom competitive pressures do not exist to keep transaction fees as low as economically feasible.
