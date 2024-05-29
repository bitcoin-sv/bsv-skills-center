# Quick Start

## Install
Let's start in node.js
```bash
npm i @bsv/sdk
```

## Build Your First Transaction

To create your first transcation you need to send some BSV into a locking script you control. Let's set up our local node.js environment with a key we can use.

```javascript
// createKey.js
import { readFile, writeFile, chmod } from 'node:fs/promises'
import { PrivateKey } from '@bsv/sdk'
import crypto from 'crypto'
global.self = { crypto }

export async function createKey() {
    try {
        const WIF = await readFile('.wif')
        const key = PrivateKey.fromWif(WIF.toString())
        console.error('You already have a key file, delete .wif manually if you know what you\'re doing.')
        console.log({ address: key.toAddress() })
    } catch (error) {
        const key = PrivateKey.fromRandom()
        const WIF = key.toWif()
        await writeFile('.wif', WIF)
        await chmod('.wif', 0o400)
        console.log({ address: key.toAddress() })
    }
}

createKey()
```

Run the above code by copying it into `createKey.mjs` and running `node createKey.js`

Now you should get something in your console which looks like this:
```bash
{ address: '1E7ZM72qRDSa0rqUhZoMCMb5MAFYFEaKQp' }
```

You can copy and paste the address into any BSV wallet and send a few satoshis to it. If you have zero BSV - go buy some, or ask the BSV community on X or discord to send you a few satoshis.

> Make sure you're sending BSV, and only a few satoshis, so that you don't care if you lose access to it. $0.01 equivalent is perfect.

Once you've sent the funds, grab the whole transaction from [Whats On Chain](https://whatsonchain.com) by pasting in the `txid` to the search box.

There's a green button which says "Raw Tx" which allows you to download the full transaction bytes as a hex string file. It'll looks something like this:

```
0100000001270ec3f7d507e2593b02297b57f27e8950a7d1df8247efb8203bb4989ef404f0000000006b483045022100a193f3cf1b65910fcf8535318725947fe3d483b80792a7671ca723276aa1999b022039d478124ce96a8bae0fb8da3ed8eeeb8b300b8810407f6665ce7eee8fdf19cb4121030ca32438b798eda7d8a818f108340a85bf77fefe24850979ac5dd7e15000ee1affffffff0310270000000000001976a914d01b0b702ee90e00944342f97c772a8be83e42a288acbc0b0000000000001976a914bc72926a0f5c078fa666bef3105af7a368a8146a88acb81a0000000000001976a914c4bf2c1f5cbc500c38083ca19b99cefba05e583988ac00000000
```

That's going to be our sourceTransaction for the first one we create ourselves.

```javascript
import { PrivateKey, Transaction, P2PKH } from '@bsv/sdk'

const key = readFromFile()
const tx = new Transaction()

tx.addInput({
    sourceTransaction,
    sourceOutputIndex: 0,
    unlockingScriptTemplate: new P2PKH().unlock(key)
})

tx.addOutput({
    change: true,
    lockingScript: new P2PKH().lock(key.toAddress())
})
```