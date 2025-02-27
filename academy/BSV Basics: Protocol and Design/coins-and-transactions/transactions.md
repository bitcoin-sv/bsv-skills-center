# Transactions

Since the **BSV blockchain** is foremost a digital cash system, understanding how coins are transferred from one person to another is critical to understanding the system. Ultimately, there are various ways coins can be transferred from owner to owner. Since the BSV blockchain implements a complex scripting system called **Bitcoin Script**, coins can be moved in intricate and innovative ways. While the nature of this scripting system is outside the scope of this course, we will focus on the simplest way coins can be transferred: by using public and private key pairs.

Using the image from the Bitcoin white paper, this analogy helps explain how coins are transferred:

* If **Owner 1** wants to send coins to **Owner 2**, they obtain Owner 2’s public key (similar to a username) and use the private key (similar to a password) associated with Owner 1’s public key to authorize the transfer.
* Once the coins are transferred to Owner 2, only Owner 2 can use their private key to transfer those same coins to someone else.

All transactions not yet written to the **BSV blockchain** are collected by nodes to be included in the next block. As shown in the graphic, it is possible to trace coins from owner to owner. To preserve privacy, it is recommended that owners avoid reusing public keys.

Since the **BSV blockchain** is foremost a digital cash system, understanding how coins are transferred from one person to another is critical to understanding the system. Ultimately, there are various ways coins can be transferred from owner to owner. Since the BSV blockchain implements a complex scripting system called **Bitcoin Script**, coins can be moved in intricate and innovative ways. While the nature of this scripting system is outside the scope of this course, we will focus on the simplest way coins can be transferred: by using public and private key pairs.

[![](https://github.com/todriguez/BSV-Academy/raw/main/BSV%20Basics%20-%20Protocol%20and%20Design/.gitbook/assets/Transactions%20FINAL%20\(1\).jpeg)](../../BSV%20Basics%20-%20Protocol%20and%20Design/.gitbook/assets/Transactions%20FINAL%20\(1\).jpeg)

In cryptography, public and private key pairs are widely used, and the closest analogy is a username/password combination. In an application, your username is public, while your password is private and known only to you. To authorize changes to anything associated with your username, your password must be used.

Using the image from the Bitcoin white paper, this analogy helps explain how coins are transferred:

* If **Owner 1** wants to send coins to **Owner 2**, they obtain Owner 2’s public key (similar to a username) and use the private key (similar to a password) associated with Owner 1’s public key to authorize the transfer.
* Once the coins are transferred to Owner 2, only Owner 2 can use their private key to transfer those same coins to someone else.

All transactions not yet written to the **BSV blockchain** Ledger are collected by nodes to be included in the next block. As shown in the graphic, it is possible to trace coins from owner to owner. To preserve privacy, it is recommended that owners avoid reusing public keys.
