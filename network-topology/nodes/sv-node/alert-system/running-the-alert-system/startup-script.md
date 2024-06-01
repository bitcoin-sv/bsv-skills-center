# Startup script

For convenience, there is a helper script with the SV Node software release that will automate the startup of the Alert System in conjunction with the SV Node daemon. This script will startup the Alert System and wait for it to be synced and healthy prior to starting the `bitcoind` daemon. To view the help for the script, run:

```bash
$ python3 start_aks_bsv.py -h
```

This script assumes that the `alert-system`, `bitcoind`, `bitcoin-cli` binaries are in the system's `PATH`.&#x20;

Example when using the [sv-node](../../installation/sv-node/ "mention") installation guide:

```bash
# ~/.bashrc
export PATH="$HOME/bitcoin/bin:$PATH"
export PATH="$HOME/alert-system:$PATH"
```

It also expects that the user has configured the needed environment variables as outlined above for the user-specific configuration.&#x20;

Example call

```bash
ALERT_SYSTEM_DISABLE_RPC_VERIFICATION=true \
ALERT_SYSTEM_BITCOIN_CONFIG_PATH=/home/user/bitcoin-data/bitcoin.conf \
ALERT_SYSTEM_ENVIRONMENT=mainnet \
./start_aks_bsv.py \
-conf=/home/user/bitcoin-data/bitcoin.conf \
-datadir=/home/user/bitcoin-data
```
