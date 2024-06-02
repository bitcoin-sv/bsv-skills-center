# Mockchain Stack

Working with SPV means you rely on a Chain Tracker to validate a chain of headers, and a Broadcaster to confirm new submissions. Working off-chain for development purposes is simply a case of mocking these two things and perhaps exposing a simple explorer to inspect your work thereafter.

## Mocking a Broadcaster

The general idea here is that you submit a transaction using this class, it will be evaluated based on its scripts only and otherwise assumed to be valid.

Extending it to include a UTXO lookup for its own transactions would make it behave exactly like main net for application purposes.

```typescript
import { MerklePath, Transaction, Utils, Hash } from '@bsv/sdk'
import { BroadcastResponse, BroadcastFailure, Broadcaster } from '@bsv/sdk/transaction/Broadcaster'

const hash = (m: string): string => Utils.toHex((
    Hash.hash256(Utils.toArray(m, 'hex').reverse()) as number[]
  ).reverse())

export default class Mock implements Broadcaster {
    transactions: {}
    blockheaders: {}
    height: number

    constructor() {
        this.transactions = {}
        this.blockheaders = {}
        this.height = 0
    }

    async broadcast(tx: Transaction): Promise<BroadcastResponse | BroadcastFailure> {
        const txid = tx.id('hex') as string
        this.height++
        const faked = Utils.toHex(Hash.sha256('faked', 'utf8'))
        tx.merklePath = new MerklePath(this.height, [[{ txid: true, hash: txid, offset: 0 }, { hash: faked, offset: 1 }]])
        this.transactions[txid] = tx
        this.blockheaders[this.height] = { merkleroot: hash(faked + txid) }
        return {
            status: 'success',
            txid,
            message: 'ok'
        }
    }
}
```

## Mocking a Chain Tracker

We can easily mock a Block Header Service by adding a new block header for each transaction broadcast. We can then store the txid as a new merkle root at the next height. The isValidRootForHeight then works witha simple object key lookup.

```typescript
import { ChainTracker } from "@bsv/sdk"

export default class MockHeaderClient implements ChainTracker {
    mock: { blockheaders: {} }
    constructor(mock) {
        this.mock = mock
    }
    async isValidRootForHeight(root: string, height: number): Promise<boolean> {
        return this.mock.blockheaders[String(height)].merkleroot === root
    }
}
```