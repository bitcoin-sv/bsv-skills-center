---
description: >-
  Non-Final transactions allow for transactions to be negotiated before being
  timestamped into a block.
---

# Sequence Number and Time Locking

Every input in a transaction contains a field titled nSequence. This is a 4-byte field, i.e., it can hold 2^32 values (0x00000000 to 0xFFFFFFFF). nLockTime allows for the creation of a transaction which will only become valid at a future date and time specified in the field or at a specified block height. Once the date/time mentioned in the nLockTime happens, the transaction, even if it has a non-final state due to a lesser than maximum nSequence value, will be considered final.

Sequence numbers are designed to be used for transaction updates before it is finalised. For example:

* Alice sends a transaction where the nLockTime value is set to a date in the future. It can start at an arbitrary future date, but by convention, it starts at 0.
* The miners will not recognise the transaction to be valid, and thus, “final” until the nLockTime value has either been reached or set to UINT\_MAX: 0xFFFFFFFF. As a result, the transaction will not be included in a block. Most often, this will mean the nodes will drop the transaction as they have no incentive to store it until it is final.
* As the transaction cannot be included in a block until the time specified in the nLockTime is reached, there is a final state that both parties have agreed to and also the ability to send updated transactions. If there is a 2-of-3 address (known as multi-sig), the parties can use an escrow (such as a licensed shared registry) to ensure that a transaction that has been agreed is final. If not, we can also have the parties negotiate and allow a means to “pull out” of the negotiation at any time before the nLockTime deadline. This means if any party tries to submit the transaction, it will not be timestamped into a block.
* Using this method, and prior to when the set nLockTime is reached, users can replace the transaction with a higher-version transaction.

{% hint style="info" %}
A higher sequence number is a newer version that replaces the ones before. That is, the network will accept the highest sequence number for transactions once the nLockTime has been reached, rejecting all others with a lower value.
{% endhint %}

* The negotiations can also be finalised. If a party sets the sequence number to UINT\_MAX, the transaction is considered as being finalised by the miners. No replacement can occur. When the sequence equals UINT\_MAX, miners will no longer accept a replacement transaction even where the nLockTime value remains in the future.
* If you ever want to lock the transaction permanently, you can set the sequence number to UINT\_MAX. Then the transaction is considered to be final, even if the time represented in nLockTime remains in the future.

This feature allows negotiating parties to create and sign a prepared transaction.

* These prepared transactions can be negotiated, agreed, and signed by the the parties allowing them to move money between each other. This can allow for a base agreement and payment stream. This is conducted securely and without fees — the fees paid are to the miners for the settled transaction, not the exchange.
* Extending this would allow for a range of services to be created that involve users withdrawing and depositing funds into a service without waiting for confirmations.
* If the user breaches the contract, the final transaction could be signed with an escrow to ensure compliance and prevent theft.

{% hint style="info" %}
Payment Channels have the potential to be used in trade negotiation scenarios. Usage of such payment channels is until now largely unexplored primarily because the amount of real trade (i.e. exchange of goods and services).
{% endhint %}
