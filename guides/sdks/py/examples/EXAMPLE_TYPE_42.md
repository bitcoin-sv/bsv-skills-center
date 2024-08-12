# Example: Using Type 42 Key Derivation for Bitcoin Wallet Management

Welcome to this type-42 key derivation guide! We're glad you're here, especially if you're migrating from an older key derivation system. Type-42 is more private, more elegant and it's easy to understand.

This guide will walk you through using type-42 keys in the context of a Bitcoin wallet.

## Type 42 Key Derivation

In type-42 systems, you provide a counterparty key when deriving, as well as your own. There is always one public key and one private key. It's either:

* Your private key and the public key of your counterparty are used to derive one of your private keys, or
* Your private key and the public key of your counterparty are used to derive one of their public keys

When you and your counterparty use the same invoice number to derive keys, the public key you derive for them will correspond to the private key they derive for themselves. A private key that you derive for yourself will correspond to the public key they derived for you.

Once you understand those concepts, we're ready to jump into some code!

### Alice and Bob

Let's consider the scenario of Alice and Bob, who want to exchange some Bitcoin. How can Alice send Bitcoins to Bob?

1. Alice learns Bob's master public key, and they agree on the Bitcoin aount to exchange.
2. They also agree on an invoice number.
3. Alice uses Bob's master public key with her private key to derive the payment key she will use.
4. Alice creates a Bitcoin transaction and pays Bob the money.
5. Bob uses Alice's public key and his own private key to derive the corresponding private key, verifying it matches the transaction Alice sent him.

Here's an example:

```py
# Master private keys:
alice = PrivateKey()
bob = PrivateKey()

# Master public keys:
alice_pub = alice.public_key()
bob_pub = bob.public_key()

# To pay Alice, they agree on an invoice number and then Bob derives a key where he can pay Alice.
payment_key = alice_pub.derive_child(bob, 'AMZN-44-1191213')

# The key can be converted to an address if desired...
print(payment_key.address())

# To unlock the coins, Alice derives the private key with the same invoice number, using Bob's public key.
payment_priv = alice.derive_child(bob_pub, 'AMZN-44-1191213')

# The key can be converted to WIF if desired...
print(payment_priv.wif())

# To check, Alice can convert the private key back into an address.
assert(payment_priv.public_key().address() == payment_key.address())
```

This provides privacy for Alice and Bob, even if eeryone in the world knows Alice and Bob's master public keys.

## Going Further: Public Derivation

Sometimes, there is a legitimate reason to do "public key derivation" from a key, so that anyone can link a master key to a child key, like in BIP32. To accomplish this, rather than creating a new algorithm, we just use a private key that everyone already knows: the number `1`.

```py
print('Public keys:')
print(alice_pub.derive_child(PrivateKey(1), '1').hex())
print(alice_pub.derive_child(PrivateKey(1), '2').hex())
print(alice_pub.derive_child(PrivateKey(1), 'Bitcoin SV').hex())
print(alice_pub.derive_child(PrivateKey(1), '2-tempo-1').hex())
```

Because everyone knows the number `1`, everyone can derive Alice's public keys with these invoice numbers. But only Alice can derive the corresponding private keys:

```py
print('Private keys:')
print(alice.derive_child(PrivateKey(1).public_key(), '1').hex())
print(alice.derive_child(PrivateKey(1).public_key(), '2').hex())
print(alice.derive_child(PrivateKey(1).public_key(), 'Bitcoin SV').hex())
print(alice.derive_child(PrivateKey(1).public_key(), '2-tempo-1').hex())
```

The type-42 system enables both public and private key derivation, all while providing a more flexible and open-ended invoice numbering scheme than BIP32.
