# Configuration

This guide will help you to know the most important configuration options for SPV Wallet.

## Order of resolving configuration

### The configuration is resolved in the following priority

1. Environment variables - the environment variables are prefixed with `SPVWALLET_` and are in uppercase. They have the highest priority when resolving the configuration.
2. Configuration file - the configuration file is resolved next. The default configuration file is `config.yaml` in the root of the project. You can also specify custom configuration file path using C flag in the command line.
3. If you don't specify the configuration file and environment variables, the default configuration will be used - it's resolved in `defaults.go` file in the `config` package. Default configuration from `defaults.go` is the same as the configuration from `config.example.yaml`.

## Configuration File

We store the configuration in a file called `config.example.yaml` in the root of the project. You can copy this file to `config.yaml` and modify it to your needs.

The most important configuration options are:

```yaml
auth:
  # xpub used for admin api authentication
  admin_key: xpub661MyMwAqRbcFgfmdkPgE2m5UjHXu9dj124DbaGLSjaqVESTWfCD4VuNmEbVPkbYLCkykwVZvmA8Pbf8884TQr1FgdG2nPoHR8aB36YdDQh
  # ...
  # other auth options
cache:
  # cache engine - freecache/redis
  engine: freecache
  # ...
  # other cache options
db:
  datastore:
  # enable datastore debug mode
  debug: false
  # datastore engine - sqlite/postgresql/mysql/mongodb (experimental)
  engine: sqlite
  # in this section you can define details about your database
  # ...
nodes:
  # deployment id used annotating api calls in XDeployment-ID header - this value will be randomly generated if not set
  _deployment_id: spv-wallet-deployment-id
  callback:
    callback_host: https://xyz.com
    # token to authenticate callback calls - default callback token will be generated from the Admin Key
    _callback_token: 44a82509
  # protocol - arc/mapi (arc is default)
  protocol: arc
  # list of apis used for getting and broadcasting transactions
  apis:
    # gorillapool can be used as well
    # - arc_url: https://arc.gorillapool.io
    # - token: ""
    - arc_url: https://api.taal.com/arc
      token: mainnet_06770f425eb00298839a24a49cbdc02c
  # use fee quotes for transaction fee calculation
  use_fee_quotes: true
  # used as the fee value if 'use_fee_quotes' is set to false
  fee_unit:
    satoshis: 1
    bytes: 1000
  # other nodes options
paymail:
  beef:
    block_headers_service_auth_token: mQZQ6WmxURxWz5ch
    # url to Block Headers Service, used for merkle root verification
    block_headers_service_url: http://localhost:8080/api/v1/chain/merkleroot/verify
    use_beef: false
  domains:
    - localhost
  enabled: true
# Prometheus metrics configuration
metrics:
  enabled: false
```

Going throught highlighted options:

* The `auth` section contains the `admin_key` which is used for admin api authentication. This key is used to authenticate the admin api calls.
* The `cache` section contains the `engine` option which can be set to `freecache` or `redis`. The `freecache` is the default option.
* The `db` section contains the `datastore` section which contains the `engine` option which can be set to `sqlite`, `postgresql`, `mysql` or `mongodb` (experimental). The `sqlite` is the default option. You can also define details about your database in this section.
* The `nodes` section contains the `protocol` option which can be set to `arc` or `mapi` (arc is default). The `apis` section contains the list of apis used for getting and broadcasting transactions. The `use_fee_quotes` option is used for transaction fee calculation. The `fee_unit` option is used as the fee value if `use_fee_quotes` is set to false.
* In the `nodes` section, the `callback` section contains the `callback_host` option which is used to define the callback host. The `_callback_token` option is used to authenticate callback calls. The `_deployment_id` option is used to define the deployment id used annotating api calls in XDeployment-ID header. This value will be randomly generated if not set.

> Callback is an Arc feature that allows the wallet to receive notifications about broadcasted transactions. It is useful because it limits the need for polling the node for transaction status.

* The `paymail` section contains the `enabled` option which is used to enable or disable paymail. The `domains` option is used to define the list of domains.
* The `beef` section contains the `use_beef` option which is used to enable or disable beef. The `block_headers_service_url` option is used to define the url to Block Headers Service, used for merkle root verification. The `block_headers_service_auth_token` option is used to authenticate the Block Headers Service calls.

You can read more about the SPV and BEEF in the [SPV and BEEF](../../../../wallets/spv-wallet/developer-docs/spv-wallet/spv\_and\_beef.md) section.

## Environment Variables

You can also set the configuration options using environment variables. The environment variables are prefixed with `SPVWALLET_` and are in uppercase. For example, the `auth.admin_key` can be set using the `SPVWALLET_AUTH_ADMIN_KEY` environment variable.
