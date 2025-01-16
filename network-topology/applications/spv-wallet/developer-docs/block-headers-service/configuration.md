# Configuration

This guide will help you to know the most important configuration options for the Block Headers Service.

## Order of resolving configuration

### The configuration is resolved in the following priority

1. Environment variables - the environment variables are prefixed with `BHS_` and are in uppercase. They have the highest priority when resolving the configuration. You can override any of the configuration options by setting the environment variable with the same name as the configuration option. For example, to override the `http.port` configuration option, you can set the `BHS_HTTP_PORT` environment variable.
2. Configuration file - the configuration file is resolved next. The default configuration file is `config.yaml` in the working directory. You can also specify custom configuration file path using the `-C` flag in the command line.
3. If you don't specify the configuration file and environment variables, the default configuration will be used - it's resolved in `defaults.go` file in the `config` package. Default configuration from `defaults.go` is the same as the configuration from `config.example.yaml`.

## Configuration File

There is an example of the configuration in a file called `config.example.yaml` in the root of the project. You can copy this file to `config.yaml` and modify it to your needs.

The most important configuration options are:

```yaml
# Application Configuration Example

# Database Configuration
db:
  # Database engine [sqlite|postgres] (default: sqlite)
  engine: sqlite
  # Path to the database schema
  schema_path: "./database/migrations"
  # Whether prepared DB is enabled
  prepared_db: false
  # Path to prepared database file
  prepared_db_file_path: "./data/blockheaders.csv.gz"

  #sqlite engine configuration
  sqlite:
    file_path: "./data/blockheaders.db"
  #postgres engine configuration, required when engine=postgres
  postgres:
    host: "localhost"
    port: 5432
    user: "user"
    password: "password"
    db_name: "bhs"
    ssl_mode: "disable" #[disable|enable]

# HTTP Configuration
http:
  # HTTP server port
  port: 8080
  # Authentication token
  auth_token: "mQZQ6WmxURxWz5ch"
  # Flag for enabling additional endpoits for profiling with use of pprof
  debug_profiling: true

# Logging Configuration
logging:
  # Logging level
  level: debug
  # Logging format: console/json
  format: console
  # Instance name shown as parameter in logs
  instance_name: block-header-service
  # Flag for enabling origin parameter in logs
  origin: false

# Prometheus metrics configuration
metrics:
  enabled: false

```

Going through highlighted options:

* The `http` section contains the `auth_token` which is used for admin api authentication. This key is used to authenticate the admin api calls.
* The `db` section contains the `engine` section which can be set to `sqlite` or `postgresql`. The `sqlite` is the default option. You can also define details about your database in this section.
* The `logging` section contains options which are used for logging. You can set the `level` option to `debug`, `info`, `warn` or `error`. The `format` option can be set to `console` or `json`. The `instance_name` option is shown as a parameter in logs.
* The `metrics` section contains the `enabled` option which is used to enable Prometheus metrics.

