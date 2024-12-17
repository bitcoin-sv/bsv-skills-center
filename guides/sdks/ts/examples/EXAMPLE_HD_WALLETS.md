# BIP32 Key Derivation with HD Wallets

For a long time, BIP32 was the standard way to structure a Bitcoin wallet. While [type-42](EXAMPLE_TYPE_42.md) has since taken over as the standard approach due to its increased privacy and open-ended invoice numbering scheme, it's sometimes still necessary to interact with legacy systems using BIP32 key derivation.

This guide will show you how to generate keys, derive child keys, and convert them to WIF and Bitcoin address formats. At the end, we'll compare BIP32 to the [type-42 system and encourage you to adopt the new approach](EXAMPLE_TYPE_42.md) to key management.

## Generating BIP32 keys

You can generate a BIP32 seed with the SDK as follows:

```typescript
import { HD } from '@bsv/sdk'
const randomKey = HD.fromRandom()

// Convert your "xprv" key to a string
console.log(randomKey.toString())

// Example: xprv9s21ZrQH143K2vF2szsDFhrRehet4iHNCBPWprjymByU9mzN7n687qj3ULQ2YYXdNqFwhVSsKv9W9fM675whM9ATaYrmsLpykQSxMc6RN8V
```

You can also import an existing key as follows:

```typescript
const importedKey = HD.fromString('xprv...')
```

Now that you've generated or imported your key, you're ready to derive child keys.

## Deriving Child Keys

BIP32 child keys can be derived from a key using the `.derive()` method. Here's a full example:

```typescript
const key = HD.fromString('xprv9s21ZrQH143K2vF2szsDFhrRehet4iHNCBPWprjymByU9mzN7n687qj3ULQ2YYXdNqFwhVSsKv9W9fM675whM9ATaYrmsLpykQSxMc6RN8V')
const child = key.derive('m/0/1/2')
console.log(child.toString())
// 'xprv9yGx5dNDfq8pt1DJ9SFCK3gNFhjrL3kTqEj98oDs6xvfaUAUs3nyvVakQzwHAEMrc6gg1c3iaNCDubUruhX75gNHC7HAnFxHuxeiMVgLEqS'
```

Any of the standard derivation paths can be passed into the `.derive()` method.

## Converting Between Formats

XPRIV keys can be converted to normal `PrivateKey` instances, and from there to WIF keys. XPUB keys can be converted to normal `PublicKey` instances, and from there to Bitcoin addresses. XPRIV keys can also be converted to XPUB keys:

```typescript
const key = HD.fromString('xprv9s21ZrQH143K2vF2szsDFhrRehet4iHNCBPWprjymByU9mzN7n687qj3ULQ2YYXdNqFwhVSsKv9W9fM675whM9ATaYrmsLpykQSxMc6RN8V')

// Convert XPRIV to XPUB
const xpubKey = key.toPublic()
console.log(xpubKey.toString());
// xpub661MyMwAqRbcFQKVz2QDcqoACjVNUB1DZQK7dF9bKXWT2aKWfKQNfe3XKakZ1EnxeNP5E4MqZnZZw4P7179rPbeJEjhYbwF5ovkbGkeYPdF

// Convert XPRIV to WIF
console.log(key.privKey.toWif())
// L1MZHeu2yMYRpDr45icTvjN7s3bBK1o7NgsRMkcfhzgRjLzewAhZ

// Convert XPUB to public key
console.log(xpubKey.pubKey.toString())
// 022248d79bf217de60fa4afd4c7841e4f957b6459ed9a8c9c01b61e16cd4da3aae

// Convert XPUB to address
console.log(xpubKey.pubKey.toAddress())
// 1CJXwGLb6GMCF46A721VYW59b21kkoRc5D
```

## Hardened vs Non-Hardened Derivation

Child keys are derived in two ways:

1. **Non-Hardened (Normal) Derivation**
2. **Hardened Derivation**

Both methods are mathematically linked to their parent key, but the **hardened keys** provide an extra layer of security.

### **Non-Hardened Derivation**

* **Path Notation**: `m / 0 / 1 / 2`
* Child keys are derived using **both** the parent **public key** and chain code.
* This means **only the parent public key** (along with the chain code) is required to derive child public keys.

#### **Why Use Non-Hardened Keys?**

* Allows "public key derivation" without exposing the private key.
* Useful for systems where you want to derive **public addresses** but do not need access to private keys (e.g., viewing wallets or watch-only wallets).

#### **Key Weakness**

If someone compromises a parent private key **or** the chain code, they can derive child private keys.

### **Hardened Derivation**

* **Path Notation**: `m / 0' / 1 / 2`
  * Hardened keys are indicated by an apostrophe (`'`).
* Child keys are derived using **only the parent private key** and chain code.
* This means the parent **public key** **cannot** be used to derive hardened child keys.

#### **Why Use Hardened Keys?**

* Adds security: Even if the parent public key is compromised, the child private keys remain secure.
* Prevents "public key-based attacks" where an attacker could deduce the private key of a parent by having access to certain information about child keys.

#### **Key Tradeoff**

To derive hardened child keys, you **must have access to the parent private key** (unlike non-hardened keys, which only need the parent public key).

### **Summary of Differences**

| Aspect                  | Non-Hardened                   | Hardened                        |
| ----------------------- | ------------------------------ | ------------------------------- |
| **Path Notation**       | `m / 0`                        | `m / 0'`                        |
| **Derived From**        | Parent Public Key + Chain Code | Parent Private Key + Chain Code |
| **Public Key Exposure** | Can derive child public keys   | Cannot derive child public keys |
| **Use Case**            | Watch-only wallets             | Secure child key derivation     |
| **Security**            | Less secure                    | More secure                     |

### **Practical Example**

* **Master Key**: `m`
  * Derived hardened key: `m / 0'`
  * Derived non-hardened key: `m / 0`

If you want to generate child public keys for monitoring transactions (e.g., in a viewing wallet), non-hardened derivation is preferred.

If you need more secure child keys for spending or sensitive applications, hardened derivation is safer because it prevents public key-based compromises.

## **Real-World Use**

In wallets, it's common to use hardened keys for **account-level derivation** (like `m/44'/0'/0'`) and non-hardened keys for generating specific addresses (`m/44'/0'/0'/0/0`).

When you hand over an xpub to a counterparty service they will be able to derive non-hardened children of that key only. So it's a way to control who can derive child keys at different levels in your derivation tree.\
\
The hardened branch can be anywhere in the derivation path:

If you share the derived xpub at `m/0'/3` then anyone with that xpub can go on to derive the pubkey at `m/0'/3/1` but if you share the xpub of `m`  only - then only you will be able to derive `m/0'/3/1` since the  hardened step precludes non-xpriv holders from calculating the children thereafter.

## Disadvantages and Risks

This guide has demonstrated how to use BIP32 for key derivation and format conversion. You can continue to use BIP32 within BSV wallet applications, but it's important to consider the disadvantages and risks of continued use, which are discussed below.

BIP32 allows anyone to derive child keys if they know an XPUB. The number of child keys per parent is limited to 2^31, and there's no support for custom invoice numbering schemes that can be used when deriving a child, only a simple integer. Finally, BIP32 has no support for private derivation, where two parties share a common key universe no one else can link to them, even while knowing the master public key. It's for these reasons that we recommend the use of type-42 over BIP32. You can read an equivalent guide [here](EXAMPLE_TYPE_42.md).
