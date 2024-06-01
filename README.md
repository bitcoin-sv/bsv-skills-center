# Quick Start

## Install

```bash
npm i @bsv/sdk
```

We're using [node.js and npm](https://nodejs.org/en/download/package-manager) on a local machine, once you're ready to start, initialize a project with `npm init -y` and install the BSV Blockchain official SDK.

## Build Your First Transaction

To create your first transcation you need to send some BSV into a locking script you control. Let's set up our local node.js environment with a key we can use.

```javascript
// createKey.js
const { PrivateKey } = require('@bsv/sdk')
const { readFile, writeFile, chmod } = require('fs/promises')
const crypto = require('crypto')
global.self = { crypto }

async function createKey() {
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

Run the above code by copying it into `createKey.js` and running `node createKey.js`

Now you should get something in your console which looks like this:

```bash
{ address: '1E7ZM72qRDSa0rqUhZoMCMb5MAFYFEaKQp' }
```

You can copy and paste the address into any BSV wallet and send a few satoshis to it. If you have zero BSV - go [buy some](https://www.rockwallet.com/), or ask the BSV community on [X](https://x.com/BSVBlockchain) or [discord](https://discord.gg/bsv) to send you a few satoshis.

> Make sure you're sending BSV, and only a few satoshis, so that you don't care if you lose access to it. $0.01 equivalent is perfect.

Once you've sent the funds, grab the whole transaction from [Whats On Chain](https://whatsonchain.com) by pasting in the `txid` to the search box.

There's a green button which says "Raw Tx" which allows you to download the full transaction bytes as a hex string file. That's going to be our sourceTransaction which will fund the transaction we are going to define with the SDK. Copy the hex string into a file in the working directory called `.transactions`. The file contents should look something like this:

```
0100000001270ec3f7d507e2593b02297b57f27e8950a7d1df8247efb8203bb4989ef404f0000000006b483045022100a193f3cf1b65910fcf8535318725947fe3d483b80792a7671ca723276aa1999b022039d478124ce96a8bae0fb8da3ed8eeeb8b300b8810407f6665ce7eee8fdf19cb4121030ca32438b798eda7d8a818f108340a85bf77fefe24850979ac5dd7e15000ee1affffffff0310270000000000001976a914d01b0b702ee90e00944342f97c772a8be83e42a288acbc0b0000000000001976a914bc72926a0f5c078fa666bef3105af7a368a8146a88acb81a0000000000001976a914c4bf2c1f5cbc500c38083ca19b99cefba05e583988ac00000000
```

You can then construct your first transaction by copying the code below into `createTx.js` and running `node createTx.js`.

```javascript
const { readFile, appendFile } = require('fs/promises')
const { Transaction, PrivateKey, P2PKH } = require('@bsv/sdk')
const crypto = require('crypto')
global.self = { crypto }

async function createTx () {
    const WIF = await readFile('.wif')
    const key = PrivateKey.fromWif(WIF.toString())
    const txsFile = await readFile('.transactions')
    const transactions = txsFile.toString().split('\n').filter(x => !!x)
    const sourceTransaction = Transaction.fromHex(transactions.pop())

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

    await tx.fee()
    await tx.sign()
    console.log(tx.toHex())

    const response = await tx.broadcast()

    console.log(response)

    // append new transaction
    await appendFile('.transactions', '\n' + tx.toHex())
}

createTx()
```

You should see a response like this:

```javascript
01000000016dd14cc825fdd4239bae03cd2f7299a7f31f5a4286eac62c47ded0d5c0cd6738000000006a47304402207ce3bddd233f0b2ad04f25e836e69d699d1ad51bd1fdde3c65dab0f7cc13cd94022015c3fc8409145cb60baa483faead2867ac84149b6005a42c1518eb7a77912ba5412102cc6cf85c531f8a27d0d92662c5326d1ddf2941eb0df5fff1921addd37dfc6303ffffffff0150180000000000001976a91421087d3e223806a8c2bea4a1bdaf629a1a3d7efb88ac00000000
{
    "status": "success",
    "txid": "d9c4369a6beec556bec9c5aa3b09e913e91cf8cf2a8fcfd34a10fa3b33296326",
    "message": "SEEN_ON_NETWORK"
}
```

## Congratulations

You're a BSV Developer.&#x20;

You can keep running the same script - it will keep appending new transactions to the `.transactions` file until you run out of funds. BSV is so cheap that this could be a few thousand transactions later.

In the mean time, you can create your own Bitcoin ScriptTemplates by defining your own classes like so:

```javascript
const { LockingScript, UnlockingScript, OP } = require('@bsv/sdk')

class SumScript {
    lock(sum) {
        const ls = new LockingScript()
        ls.writeOpCode(OP.OP_ADD)
        ls.writeNumber(sum)
        ls.writeOpCode(OP.OP_EQUAL)
        return ls
    }

    unlock(a, b) {
        const sign = async () => {
            const us = new UnlockingScript()
            us.writeNumber(a)
            us.writeNumber(b)
            return us
        }
        return { sign, estimateLength: async () => 6 }
    }
}
```

To create this output you simply add the class to an output:

```javascript
tx.addOutput({
    satoshis: 3,
    lockingScript: new SumScript().lock(41)
})
```

Unlocking it in a future transaction you can simply do:

```javascript
tx.addInput({
    sourceTransaction,
    sourceOutputIndex: 0,
    unlockingScriptTemplate: new SumScript.unlock(21, 20)
})
```

To check that the script works you can then run:

```javascript
await tx.verify('scripts only')
```

Ask the AI if you want to learn more, or [join our discord](https://discord.gg/bsv) if you need help from a human.
