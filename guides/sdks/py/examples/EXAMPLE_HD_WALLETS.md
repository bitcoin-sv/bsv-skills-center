# Example: BIP32 Key Derivation with HD Wallets

For a long time, BIP32 was the standard way to structure a Bitcoin wallet. While [type-42](notion://www.notion.so/yenpoint/EXAMPLE_TYPE_42.md) has since taken over as the standard approach due to its increased privacy and open-ended invoice numbering scheme, it's sometimes still necessary to interact with legacy systems using BIP32 key derivation.

This guide will show you how to generate keys, derive child keys, and convert them to WIF and Bitcoin address formats. At the end, we'll compare BIP32 to the [type-42 system and encourage you to adopt the new approach](notion://www.notion.so/yenpoint/EXAMPLE_TYPE_42.md) to key management.

## Generating BIP32 keys

You can generate a BIP32 seed with the SDK as follows:

```python
from bsv.hd import (
    mnemonic_from_entropy, seed_from_mnemonic, master_xprv_from_seed, Xprv, derive_xprvs_from_mnemonic
)

entropy = 'cd9b819d9c62f0027116c1849e7d497f'  # Or use some randomly generated string...
# snow swing guess decide congress abuse session subway loyal view false zebra
mnemonic: str = mnemonic_from_entropy(entropy)
print(mnemonic)

seed: bytes = seed_from_mnemonic(mnemonic)
print(seed.hex())

master_xprv: Xprv = master_xprv_from_seed(seed)
print(master_xprv)
```

You can also import an existing key as follows:

```python
# Example of importing an existing key (code snippet missing in the original)
# existing_key = Xprv.from_string("xprv...")
```

Now that you've generated or imported your key, you're ready to derive child keys.

## Deriving Child Keys

BIP32 child keys can be derived from a key using the `derive_xprv_from_mnemonic` function. Here's a full example:

```python
keys: List[Xprv] = derive_xprvs_from_mnemonic(mnemonic, path="m/44'/0'/0'", change=1, index_start=0, index_end=5)
for key in keys:
    # XPriv to WIF
    print(key.private_key().wif())
    key_xpub = key.xpub()
```

Any of the standard derivation paths can be passed into the derivation function.

## Converting Between Formats

XPRIV keys can be converted to normal `PrivateKey` instances, and from there to WIF keys. XPUB keys can be converted to normal `PublicKey` instances, and from there to Bitcoin addresses. XPRIV keys can also be converted to XPUB keys:

```python
# XPriv to WIF
print(key.private_key().wif())
# XPriv to XPub
key_xpub = key.xpub()
# XPub to public key
print(key_xpub.public_key().hex())
# XPub to address
print(key_xpub.public_key().address(), '\\n')
```

This guide has demonstrated how to use BIP32 for key derivation and format conversion. You can continue to use BIP32 within BSV wallet applications, but it's important to consider the disadvantages and risks of continued use, which are discussed below.

## Disadvantages and Risks

BIP32 allows anyone to derive child keys if they know an XPUB. The number of child keys per parent is limited to 2^31, and there's no support for custom invoice numbering schemes that can be used when deriving a child, only a simple integer. Finally, BIP32 has no support for private derivation, where two parties share a common key universe no one else can link to them, even while knowing the master public key. It's for these reasons that we recommend the use of type-42 over BIP32. You can read an equivalent guide [here](notion://www.notion.so/yenpoint/EXAMPLE_TYPE_42.md).