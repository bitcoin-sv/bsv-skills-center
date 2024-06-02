# SPV Wallet Engine Configuration

SPV Wallet Engine can be configured using special methods described below. They allow functional options to be supplied that overwrite default client options.\
When SPV Wallet client is created in SPV Wallet it is configured with default options but by using `WithXXX()` methods you can adjust it to your needs.

In SPV Wallet file `services.go` you can find the function `loadSPVWallet` which is responsible for creating SPV Wallet client.\
Inside it, you can find logic which checks the config and adjusts SPV Wallet client to it.

Example - setting fee unit in SPV Wallet client using config file `appConfig`:

```go
    if appConfig.Nodes.FeeUnit != nil {
        options = append(options, engine.WithFeeUnit(&utils.FeeUnit{
            Satoshis: appConfig.Nodes.FeeUnit.Satoshis,
            Bytes:    appConfig.Nodes.FeeUnit.Bytes,
        }))
    }
```

## Possible options

The list of possible configuration options can be found in the `engine` package.\

[engine/client_options.go](https://github.com/bitcoin-sv/spv-wallet/blob/master/engine/client_options.go)
