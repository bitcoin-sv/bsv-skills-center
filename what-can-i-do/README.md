# What Can I Do?

BSV Blockchain has a few properties which allow us to solve a vast number of problems across many applications. The two fundamentals are tokenization and data integrity.

## Tokenization

BSV Blockchain is a massively scalable utxo based system. What this means is that each transaction output can be dealt with independently by different systems, without worrying about any global state. This means transaction throughput is theoretically unbounded.

There have been many token protocols defined on top of BSV over the years. The most basic way to create a token system on BSV is to simply use an Overlay Service to track specific utxos which have been "minted" as tokens via some tokenization method.

### Single Use

If we don't care to track tokens beyond their first spend we could build some simple logic into an overlay which defines a the token as "any utxo which has this specific txid". That way any transaction will be accepted by the overlay so long as it is spending one of a specific set of outputs from a single transaction. You could imagine the use case is a redeemable voucher for $5 off from a local store as part of some promotion.

```javascript
// minting transaction pseudocode
{ 
    version: 1, 
    locktime: 0,
    inputs: [...fundingUtxos], 
    outputs: [
        {
            script: 'OP_DUP OP_HASH160 {pkh} OP_EQUALVERIFY OP_CHECKSIG',
            satoshis: 1
        },
        ... // repeated x 1000
    ]
}
```

Say it yields the txid `76730e3d92afcf6a28f8a43bb2c6783685b18170a8da31168364c7b73c9893f3` then we can set the overlay to accept transactions only if one or more inputs contain that txid.

This limits us to either knowing the desired owners of each token at the time on minting, setting the public key hash accordingly; or using a server side private key which pre-signs the utxos with sighash `none` & `anyone can pay` before delivering them to a particular owner. This allows them to pass this information around as they see fit, eventually constructing a transaction which spends the utxo using that existing signature, simply adding an arbitrary output when needed.

You can see from this simple example that the meaning of the token is defined by the issuer, and is only redeemable with them.

### Multi Use

Creating tokens which can be transferred multiple times while retaining their meaning involves tracing their outputs from one to another.

This can be handled again by a simple overlay which accepts minting transactions as well as transfer transactions and burn transactions.

How you consider the tokens to exist and transfer can be in a push data denomination, or an ordinals approach.

#### Push Data approach

The idea here is that you mint tokens by pushing a blob of data to denominate the value the token represents while not really caring how many satoshis are associated. In other words 1 satoshi is sufficient for any denomination.

For example a JSON push data might look like:
```json
{
  "asset": "sometoken",
  "amount": 1000
}
```

This would be pushed to the script as a blob of data which is then dropped off the stack prior to executing a regular locking script function.

Thereafter, these tokens are spendable only within the context of the token's issuing overlay. In other words, each spend needs to be send to that overlay such that the new token outputs can be noted for eventual redemption / burning at the end of the token lifecycle.


## Data Integrity

