---
description: Some low level explainers and examples to improve understanding.
---

# 💦 Deep Dive

## Size Matters

Storage gets really expensive when you have billions of transactions to store - just ask any miner.

The total cumulative size of all blockheaders is currently \~68MB. When comparing this to storing the whole blockchain, the advantage becomes obvious. The total size of the BSV blockchain at time of writing is over 10TB.

<figure><picture><source srcset="../.gitbook/assets/RPReplay_Final1702566030-ezgif.com-effects.gif" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/RPReplay_Final1702566030.gif" alt=""></picture><figcaption><p>Some blocks in the past have been 4GB in size. This is expected to increase dramatically in future. <br>In contrast, the block header will always and forever be 80 bytes exactly.</p></figcaption></figure>

### What's in a Block Header?

A block header is an 80 byte data structure which describes one block. As a hex string it looks like this:

{% code overflow="wrap" %}
```
0020372d395bfcfc03b467e747f873da7e4f4fd0afcc89301787b10a0000000000000000724ab3c241848b826766b46947e008e022b95877629498ec3e7dd85f1ae0b383f8f8826566280d184b11f02a
```
{% endcode %}

Here's a breakdown of what all that means:

<table><thead><tr><th width="202">Field</th><th width="438.3333333333333">Purpose</th><th>Size (Bytes)</th></tr></thead><tbody><tr><td>Version</td><td>Defines the version of this encoding format</td><td>4</td></tr><tr><td><mark style="color:green;"><strong>Previous Block Hash</strong></mark></td><td><mark style="color:green;"><strong>Hash of the previous block header</strong></mark></td><td><mark style="color:green;"><strong>32</strong></mark></td></tr><tr><td><mark style="color:blue;"><strong>Merkle Root</strong></mark></td><td><mark style="color:blue;"><strong>Hash encapsulating all transaction in the block</strong></mark></td><td><mark style="color:blue;"><strong>32</strong></mark></td></tr><tr><td>Time</td><td>Timestamp of when this block was created</td><td>4</td></tr><tr><td>Bits</td><td>Difficulty target used by miners</td><td>4</td></tr><tr><td>Nonce</td><td>Random number iterated while mining</td><td>4</td></tr></tbody></table>

#### Example Block Header

0020372d<mark style="color:green;">395bfcfc03b467e747f873da7e4f4fd0afcc89301787b10a0000000000000000</mark><mark style="color:blue;">724ab3c241848b826766b46947e008e022b95877629498ec3e7dd85f1ae0b383</mark>f8f8826566280d184b11f02a

```
0020372d // version
395bfcfc03b467e747f873da7e4f4fd0afcc89301787b10a0000000000000000 // previous blockhash
724ab3c241848b826766b46947e008e022b95877629498ec3e7dd85f1ae0b383 // merkle root
f8f88265 // time
66280d18 // bits
4b11f02a // nonce
```

### Previous Block Hash

The <mark style="color:green;">**Previous Block Hash**</mark> allows us to link the chain of blocks together all the way back to Genesis.&#x20;

<div data-full-width="false">

<figure><picture><source srcset="../.gitbook/assets/headers-ezgif.com-effects.gif" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/headers.gif" alt=""></picture><figcaption><p>The headers are all linked, each pointing to the previous header.</p></figcaption></figure>

</div>

You might ask how do I know that the block header is valid if I don't have all the transactions? The easy way to detect fake block headers is to hash it, and if it doesn't have a bunch of zeros at the end then it is not legitimate. Creating a block header which hashes to a low number requires a boatload of ASIC machines iterating the nonce and hashing until a low output is found. Expensive to fake.

In MacOS Terminal we can copy paste the following to double sha256 the data and output the hash.

{% code overflow="wrap" %}
```bash
echo -n "0020372d395bfcfc03b467e747f873da7e4f4fd0afcc89301787b10a0000000000000000724ab3c241848b826766b46947e008e022b95877629498ec3e7dd85f1ae0b383f8f8826566280d184b11f02a" | xxd -r -p | shasum -a 256 -b | xxd -r -p | shasum -a 256
```
{% endcode %}

The result of which is below. See the bunch of zeros on the end? Seems legitimate.

```
1ed677a4c6dc5a09b539e1c3b66cb60eef2fa6e164b54f010000000000000000
```

#### Fake Block Header

Let's attempt to fake the Merkle Root to show how difficult it would be to get away with.

```
0020372d
395bfcfc03b467e747f873da7e4f4fd0afcc89301787b10a0000000000000000
5df6e0e2761359d30a8275058e299fcc0381534545f55cf43e41983f5d4c9456 // fake merkle root
f8f88265
66280d18
4b11f02a
```

Again let's copy paste that into Terminal so that we can check the double sha256 block hash.

{% code overflow="wrap" %}
```bash
echo -n "0020372d395bfcfc03b467e747f873da7e4f4fd0afcc89301787b10a00000000000000005df6e0e2761359d30a8275058e299fcc0381534545f55cf43e41983f5d4c9456f8f8826566280d184b11f02a" | xxd -r -p | shasum -a 256 -b | xxd -r -p | shasum -a 256
```
{% endcode %}

The result makes the forgery obvious, no zeros at the end.

```
dbfcdb4e330a99a8516b3b2b32fc9760c929a21530afbd58fac59ba9774d1f3b
```

If we fake this one block header and use some ASIC machines to hash it a bunch until we eventually get a low hash value, then we would need to do the same for every block header thereafter since they're all chained together. This quickly becomes infeasible.

### Merkle Root

The <mark style="color:blue;">**Merkle Root**</mark> is what we compare to the calculated value we get from our txid and Merkle Path. If it matches, then we have definitive proof that the transaction was indeed included within the block with that header.

<div data-full-width="false">

<figure><picture><source srcset="../.gitbook/assets/ezgif.com-effects.gif" media="(prefers-color-scheme: dark)"><img src="../.gitbook/assets/merkle proof.gif" alt=""></picture><figcaption><p>Getting from a txid to a Merkle root.</p></figcaption></figure>

</div>
