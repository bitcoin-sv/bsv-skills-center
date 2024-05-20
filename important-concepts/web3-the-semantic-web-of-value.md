# Web3: The Semantic Web of Value

### What is Web3?

* Shift from pure computer networks to semantic networks
* Individual devices maintin their own state (could be cloud, local, or hybrid)
* Direct e2e communication (P2P
* micro-transactions for every interaction
* Every device has its own filters/language which makes them part of a semantic network of other devices that filter/understand the same transaction types
* UTXO model: every transaction is atomic, so TXs become native metadata to each interaction
* Every device is unique yet can still be part of a network or community
* communication is agnostic to the physical medium the transaction is communicated over
* Syncing is optional because every Satoshi lives as a unique double-spend protected commodity token regardless of what it's transfer is capturing

### Ticket Distributor example

1. Distributor creates tranches of tickets and combines the hash of each ticket with pubKey from a public-private EC-keypair.

* This can be done by converting the key and the hash to big numbers, combining them (either by adding, multiplying, subtracting, or xoring) and multiplying the result by the generator point of the curve, G.
* Each tranche only need to be 1 transaction and each output is associated with a ticket.
* Tickets are unique
* Tranches provide a way for distribution attributes to be included such as early-bird pricing

2. The distributor distributes the tickets to sellers by spending the ticket outputs to outputs each of the sellers control. They also give the sellers the ticket hashes, the ticket information, and the Merkle paths which the sellers can use to perform an SPV check.
3. The sellers sell the tickets repeating the same process that was used to give them tickets with each sale.
4. Event attendees can then spend their ticket at the gate using the same process

The benefits of doing things this way:

* It maintains the properties of the blockchain by leveraging them through the use of Satoshis. No additional high-level overview tracking needs to be done. Once the TXs have been distributed, they can either get spent at the gate of the event, or they can be refunded back to the seller who can then either resell them or refund them back to the ticket distributor.
* The process can be started by an event group by having the event group provide the necessary Satoshis for each of the tickets along with a payment (This can be the generating TX).
* In addition, SIGHASH flags can be used to allow the tickets to be resold within the same transaction by allowing inputs and outputs to be adjusted:
  * For example, SIGHASH\_NONE/ANYONE\_CAN\_PAY where the seller signs their input but none of the outputs so the event attendee can change the output and sign the change.
  * It doesn't matter who spends the ticket to attend the concert as long as they have the Merkle path from the seller for the gate to check
