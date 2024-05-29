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