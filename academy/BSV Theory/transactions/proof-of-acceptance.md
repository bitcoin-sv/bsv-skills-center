# Proof of Acceptance

> The payee needs proof that at the time of each transaction, the majority of nodes agreed it was the first received.
>
> \- Satoshi Nakamoto, Bitcoin Whitepaper

![](<../../../.gitbook/assets/Theory - Introduction - Proof of Acceptance.gif>)

For merchants to have confidence in funds received via the Bitcoin network, there must be a means for them to be able to query the nodes who validate the transaction to ensure that it is not double spending valid inputs. This can be achieved in a variety of ways including:

* Querying a selection of nodes for a transaction output that meets the merchant’s requirements
* By the merchant sending the transaction on the sender’s behalf, and receiving notification of the transaction’s validity from the nodes it uses
* Through double-spend alarm systems that notify any parties to transactions that double spend an input

Without these systems, it becomes much harder for merchants to accept Bitcoin payments for goods or services without waiting for them to be confirmed in a valid block secured by proof of work.

Learn more about the First seen rule here: [http://wiki.bitcoinsv.io/index.php/First\_seen\_rule](http://wiki.bitcoinsv.io/index.php/First_seen_rule)
