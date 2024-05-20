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

In the example, the ticket distributor and the sellers are both overlay services because they're providing a service and tracking sales data (in this way, a merchant can be considered an overlay service). However, they communicate with each other and the event attendees in the same way: P2P.

It's the fact they all understand the ticket transaction that makes them part of the same semantic overlay network for that specific event. The sellers and the ticket distributor can consider themselves part of a more generalized event ticket overlay.

The benefits of doing things this way:

* It maintains the properties of the blockchain by leveraging them through the use of Satoshis. No additional high-level overview tracking needs to be done. Once the TXs have been distributed, they can either get spent at the gate of the event, or they can be refunded back to the seller who can then either resell them or refund them back to the ticket distributor.
* The process can be started by an event group by having the event group provide the necessary Satoshis for each of the tickets along with a payment (This can be the generating TX).
* In addition, SIGHASH flags can be used to allow the tickets to be resold within the same transaction by allowing inputs and outputs to be adjusted:
  * For example, SIGHASH\_NONE/ANYONE\_CAN\_PAY where the seller signs their input but none of the outputs so the event attendee can change the output and sign the change.
  * It doesn't matter who spends the ticket to attend the concert as long as they have the Merkle path from the seller for the gate to check

### Analogy: polymorphism

* Nodes understand shapes
* high-level overlays (like the ticket distributor and sellers) understand shapes such as circles or squares: The event in the example can be associated with the shape of a circle.
  * The nodes only see the circles and square as shapes
* Each event can be analogized as a colour; e.g., the event in the example above can be associated with the colour red.
* So:
  * The nodes, ticket distributor, sellers, and event attendees all understand shapes
  * The ticket distributor, sellers, and event attendees also understand circles
  * The ticket distributor, sellers, and event attendees also understand red circles
  * The ticket distributor and sellers understand blue circles (another event) but the event attendee that bought tickets for the red circle event and not the blue circle event, does not understand blue circles.
  * The event company working the gate understands red circles, but not blue circles, so if an attendee for the blue circle event tried to attend the red circle event, they would not be able to get in because the gate company would not understand the output (via SPV and validation checks)

