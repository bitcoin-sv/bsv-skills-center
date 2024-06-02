# Engine

## BSV UTXO & xPub Management Engine

It gathers all methods which are used to store and transform information about xpubs and transactions.\
To use SPV Wallet you need a SPV Wallet which will be connected with engine.

* [Configuration](configuration.md)
* [Database](db.md)

SPV Wallet Engine is a part of SPV Wallet.\ It can be also used as a standalone library.

It stores database models and methods to interact with them.\
Moreover it does all of the work related to transaction - broadcasting, syncing, etc.

It interacts with nodes using Arc API (default option). We use [go-broadcast-client](https://github.com/bitcoin-sv/go-broadcast-client) to broadcast, query transactions and ask for miners policy.

This package requires configuration to be set up.\\

As you can see in the example below, you can use `loadBroadcastClientArc` to load broadcast client with arc nodes from the configuration.

```go
func loadBroadcastClientArc(appConfig *AppConfig, options []engine.ClientOps, logger *zerolog.Logger) []engine.ClientOps {
	builder := broadcastclient.Builder()
	var bcLogger zerolog.Logger
	if logger == nil {
		bcLogger = zerolog.Nop()
	} else {
		bcLogger = logger.With().Str("service", "broadcast-client").Logger()
	}
	for _, arcClient := range appConfig.Nodes.toBroadcastClientArc() {
		builder.WithArc(*arcClient, &bcLogger)
	}
	broadcastClient := builder.Build()
	options = append(
		options,
		engine.WithBroadcastClient(broadcastClient),
	)
	return options
}
```

> There is also a possibility to use engine with go-minercraft library and mAPI but it will be deprecated soon.
