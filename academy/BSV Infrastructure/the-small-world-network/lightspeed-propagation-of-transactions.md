# Lightspeed Propagation of Transactions

[https://player.vimeo. com/video/674831645](https://player.vimeo.com/video/674831645)

One of the core innovations of the Bitcoin design is the way it incentivises the rapid propagation of transactions among nodes as a solution to identifying double spends. It is a huge priority for any node that receives a transaction to make sure that every other node knows about that transaction in order to be aware of if it is the first time the inputs that it uses have been spent on the network. If a node was unaware that another transaction had already spent the coin there is a chance that other nodes on the network would reject any block they tried to propagate on the basis of it containing a double spent (and therefore invalid) transaction.

[https://player.vimeo. com/video/649875222](https://player.vimeo.com/video/649875222?h=2f04c8ca43\&badge=0\&autopause=0\&player_id=0\&app_id=58479\&loop=1\&autoplay=1\&muted=1)

By propagating valid transactions as quickly as possible, nodes ensure they have the best chance of seeing the same version of a transaction first as the greatest majority of other nodes. Because of the ultra dense interconnectivity of the small world network, a double spend introduced to the network any more than a second after the original spend has almost zero chance of being validated by honest nodes.
