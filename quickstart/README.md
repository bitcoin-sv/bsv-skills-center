# Quick Start

## Install
Let's start in node.js
```bash
npm i @bsv/sdk
```

## Build Your First Transaction

To create your first transcation you need to send some BSV into a locking script you control. Let's set up our local node.js environment with a key we can use.

```javascript
// makeKey.js
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

Run the above code by copying it into `makeKey.js` and running `node makeKey.js`