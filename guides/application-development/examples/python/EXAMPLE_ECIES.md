# Example: Using ECIES Encryption

Electrum ECIES is a protocol for exchanging encrypted data between parties. It has been commonly used in many applications, and while the SDK's native [Message Encryption functionality](EXAMPLE\_ENCRYPT\_DECRYPT\_MESSAGE.md) is the preferred approach for new applications (due to its use of GCM over CBC and aditional layers of security described below), legacy systems still use ECIES and this guide will demonstrate how it can be done.

## Message Encryption

In ECIES, a message can be encrypted directly to the public key of the recipient, either from your private key or from a random private key. The public key can either be included or excluded from the message. Check out the below examples:

```py
from bsv import PrivateKey

private_key = PrivateKey('L5agPjZKceSTkhqZF2dmFptT5LFrbr6ZGPvP7u4A6dvhTrr71WZ9')
public_key = private_key.public_key()

plain = 'hello world'

# use public key to encrypt
encrypted = public_key.encrypt_text(plain)
print(encrypted)

# decrypt with the corresponding private key
print(private_key.decrypt_text(encrypted))
```

## Considerations

This guide has shown how to use Electrum ECIES encryption. While this approach has been used by many legacy systems, the SDK's native encryption has the following benefits:

* **Additional Security Layer**: The native SDK implentation, based on [BRC-78](https://github.com/bitcoin-sv/BRCs/blob/master/peer-to-peer/0078.md), employs an additional layer of security by utilizing a one-off ephemeral key for the encryption process. Even if the key for a particular message is discovered, it does not compromise the private keys of either of the parties. Different keys are used for every message, adding an additional step for attackers.
* **Incompatibility with BRC-43 Invoice Numbers**: The native approach is fully compatible with [BRC-43](https://brc.dev/43) invoice numbers, and the [BRC-2](https://brc.dev/2) encryption process, making it possible for users of the [BRC-56 standard wallet](https://brc.dev/56) able to natively use the system under their MetaNet identities. ECIES is not compatible with these standards.
* **Use of GCM over CBC**: While this is not a security risk, GCM supports range-based encryption and decryption. This may make it better than CBC if you need to send parts of a large encrypted dataset over the network.

Despite these drawbacks, Electrum ECIES still remains a fundamentally secure and robust encryption scheme.
