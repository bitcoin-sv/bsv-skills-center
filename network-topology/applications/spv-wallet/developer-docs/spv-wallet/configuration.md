# Configuration

This guide will help you to know the most important configuration options for SPV Wallet.

## Order of resolving configuration

### The configuration is resolved in the following priority

1. Environment variables - the environment variables are prefixed with `SPVWALLET_` and are in uppercase. They have the highest priority when resolving the configuration.
2. Configuration file - the configuration file is resolved next. The default configuration file is `config.yaml` in the working directory. You can also specify custom configuration file path using C flag in the command line.
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
arc:
  url: https://arc.taal.com
  token: mainnet_06770f425eb00298839a24a49cbdc02c
  # deployment id used annotating api calls in XDeployment-ID header - this value will be randomly generated if not set
  _deployment_id: spv-wallet-deployment-id
  callback:
    enabled: false
    host: https://example.com
    # token to authenticate callback calls - default callback token will be generated from the Admin Key
    _token: 44a82509
# custom fee unit used for calculating fees (if not set, a unit from ARC policy will be used)
_custom_fee_unit:
  satoshis: 1
  bytes: 1000
  
block_headers_service:
  auth_token: mQZQ6WmxURxWz5ch
  # URL used to communicate with Block Headers Service (BHS)
  url: http://localhost:8080
  
paymail:
  beef:
    use_beef: true
  domains:
    - localhost

# Prometheus metrics configuration
metrics:
  enabled: false
```

Going throught highlighted options:

* The `auth` section contains the `admin_key` which is used for admin api authentication. This key is used to authenticate the admin api calls.
* The `cache` section contains the `engine` option which can be set to `freecache` or `redis`. The `freecache` is the default option.
* The `db` section contains the `datastore` section which contains the `engine` option which can be set to `sqlite` or `postgresql`. The `sqlite` is the default option. You can also define details about your database in this section.
* The `arc` section contains: 
  * the `url` and `token` which are used for getting and broadcasting transactions. 
  * the `callback` section which is used to receive notifications about broadcasted transactions from ARC.
  * the `deployment_id` option is used to define the deployment id used annotating api calls in XDeployment-ID header. This value will be randomly generated if not set.
* The `custom_fee_unit` option is used for transaction fee calculation. The `fee_unit` option is used as the fee value if `custom_fee_unit` is configured.
* The `block_headers_service` section contains the `auth_token` and `url` options used to communicate with Block Headers Service to make SPV.

> Callback is an Arc feature that allows the wallet to receive notifications about broadcasted transactions. It is useful because it limits the need for polling the node for transaction status.

* The `paymail` section contains the `domains` option which is used to define the list of domains.
* The `beef` section with the `use_beef` option is used to enable or disable beef paymail capability support.

> You can read more about the SPV and BEEF in the [SPV and BEEF](./README.md#spv-and-beef) section.

* The `metrics` section allows to enable or disable Prometheus metrics.

## Environment Variables

You can also set the configuration options using environment variables. The environment variables are prefixed with `SPVWALLET_` and are in uppercase. For example, the `auth.admin_key` can be set using the `SPVWALLET_AUTH_ADMIN_KEY` environment variable.
