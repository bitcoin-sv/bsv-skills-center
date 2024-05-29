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
const fs = require('fs')
const { PrivateKey } = require('@bsv/sdk')

const key = PrivateKey.fromRandom()
try {
    const envFile = fs.openSync('.wif', 'w')
    fs.writeSync(envFile, key.toWif())
    fs.fchmodSync(envFile, 0o400)
    fs.closeSync(envFile)
    console.log({ address: key.toAddress() })
} catch (error) {
    const WIF = fs.readFileSync('.wif')
    const key = PrivateKey.fromWif(WIF.toString())
    console.error('You already have a key file, delete .wif manually if you know what you\'re doing.')
    console.log({ address: key.toAddress() })
}
```

Run the above code by copying it into `makeKey.js` and running `node makeKey.js`