# What is Base58 and How Does BSV Use it?

![](<../.gitbook/assets/BSVA-HashFunctions_Ch2L2_DA1 (1).gif>)

The "check" of Base58Check refers to a shortened hash, or 'checksum', which is appended to the end of the Base58 encoded data.

The checksum provides another step to ensure the integrity of the Base58 encoded data by providing a comparison value that can be used to automatically detect typographical errors. That way, if any data changes, the checksum value will reflect the change and a data integrity check will fail before any data is transmitted.

For example, Alice wants to send some BSV to Bob. She uses a wallet on her mobile phone to scan a QR code corresponding to Bob's address. As soon as Alice scan's Bob's address, her wallet saves the checksum bytes of Bob's address. Unbeknownst to Alice, a link her grandmother sent her on social media had malware in it that targets wallet addresses. Right before Alice is about to send BSV to Bob, the malware changes the address to an address the attacker controls. But, before posting the transaction to the chain, the wallet performs an integrity check using the saved checksum from when Alice first scanned Bob's address. The send fails, and Alice is able to clean the malware off her phone and send the BSV to Bob in a subsequent transaction.

Base58Check has the following features:

* An arbitrarily sized payload or input data.
* A set of 58 alphanumeric symbols that are easily distinguishable
* One byte of version/application information.  Addresses use 0x00 for this byte but may use 0x05 in future.
* Four bytes (32 bits) of a SHA256-based error checking to auto-detect and possibly correct typographical errors.
* An extra step to preserve leading zeros in the data.

BSV uses Base58Check to encode addresses, and when exporting and importing private keys to and from different wallets.&#x20;

More specifically, Base58Check is used to encode public keys during the address creation process, and to encode private keys in a Wallet Import Format (WIF); making copying them to and from different wallets easier and more secure.&#x20;

You can find out more about generating addresses and WIFs by following the links below to the BitcoinSV wiki:

* [Encoding a Bitcoin Address in Base58Check](https://wiki.bitcoinsv.io/index.php/Base58Check_encoding)
* [Wallet Import Format](https://wiki.bitcoinsv.io/index.php/Wallet_Import_Format_\(WIF\))

#### Activity - Encode a public key hash in Base58Check

Using the [hash calculator](https://bitcoinsv.academy/hash-calculator), encode the following hash (displayed in HEX) in Base58Check:

```markup
094d77441cfead50daa8e9ce893698962dbcbbce
```
