# Running the Alert System

The following instructions describe running the Bitcoin SV Alert System using tools available in most mainstream Linux distributions. The assumption has been made that you are using a Bourne-like shell such as `bash`.

## Infrastructure Considerations

Hosting an Alert System that uses a P2P IPFS layer on some infrastructure providers like Hetzner could lead to problems due to their abuse detection mechanisms. The IPFS layer involves port scanning to find peers, which Hetzner might mistake for malicious activity. This can trigger Hetzner's automated systems to block or restrict your account.&#x20;

Since continuous operation is crucial for an Alert System, Hetzner's sensitivity to port scanning makes it an unsuitable hosting choice for such an application. Please note that the Alert System only requires RPC access to a node and as such can run on different infrastructure than your node. Make sure to configure the proper security rules to restrict access to the RPC interface, for example using Hetzner's firewall rules.

## Running the Alert System <a href="#running-the-alert-system" id="running-the-alert-system"></a>

In order to run the Alert System for each given network, there are some environment variables that should be set.

#### Server Configuration

<table><thead><tr><th width="366">Environment Variable</th><th width="216">Description</th><th>Example Values</th></tr></thead><tbody><tr><td><code>ALERT_SYSTEM_ENVIRONMENT</code></td><td>The environment to start the Alert System with. Set this to the network type you'd like to run on.</td><td><p><code>mainnet</code></p><p><code>testnet</code></p><p><code>stn</code></p></td></tr><tr><td><code>ALERT_SYSTEM_BITCOIN_CONFIG_PATH</code></td><td>Path to a valid <code>bitcoin.conf</code> file. Alert System will read the RPC configuration values from this file to communicate to the Bitcoin node.</td><td><code>/home/user/.bitcoin/bitcoin.conf</code></td></tr><tr><td><code>ALERT_SYSTEM_DISABLE_RPC_VERIFICATION</code></td><td>If this is set to true, then the Alert System will not attempt to verify the provided RPC credentials on startup. This is useful if <code>bitcoind</code> is not running.</td><td><code>false</code></td></tr><tr><td><code>ALERT_SYSTEM_ALERT_WEBHOOK_URL</code></td><td>Webhook URL for the Alert System to send human readable alert messages to. See later in the doc for details.</td><td><code>http://example.com/webhook</code></td></tr><tr><td><code>ALERT_SYSTEM_P2P__PORT</code></td><td>Port for libp2p to serve on. (Defaults to <code>9906</code>)</td><td><code>9906</code></td></tr><tr><td><code>ALERT_SYSTEM_WEB_SERVER__PORT</code></td><td>Port for the local apiserver to serve on. (Defaults to <code>3000</code>)</td><td><code>3000</code></td></tr><tr><td><code>ALERT_SYSTEM_LOG_OUTPUT_FILE</code></td><td>Rather than logging to stdout, configure the server to log directly to a file on disk.</td><td><code>/var/log/alert-system</code></td></tr><tr><td><code>ALERT_SYSTEM_DATASTORE__SQLITE__DATABASE_PATH</code></td><td>Path to where the SQLite3 database for the alert-system should be saved. (Defaults to <code>./alert_system_datastore.db</code></td><td><code>/home/user/.bitcoin/alert_system_datastore.db</code></td></tr></tbody></table>

With the proper environment variables set, the `alert-system` binary can be run directly without any arguments.&#x20;

```bash
ALERT_SYSTEM_ENVIRONMENT=mainnet \
ALERT_SYSTEM_BITCOIN_CONFIG_PATH=/home/user/bitcoin-data/bitcoin.conf \
./alert-system
```

## Systemd

To start the install of the Alert System, make sure you use an account that can use `su` or `sudo` to install software into directories owned by the root user.

Download the zipped release of your choosing from the [Github release](https://github.com/bitcoin-sv/alert-system/releases) page, for this example we are using 0.1.1 which is the latest release at the time of writing:

<pre class="language-sh"><code class="lang-sh">
<strong>wget https://github.com/bitcoin-sv/alert-system/releases/download/v0.1.1/alert_system_0.1.1_linux_amd64.zip
</strong></code></pre>

Locate the file you downloaded and extract it using the `unzip` command:

```bash
# sudo apt-get install unzip -y
mkdir -p alert-system-0.1.1
unzip alert_system_0.1.1_linux_amd64.zip -d alert-system-0.1.1
```

Create a symbolic link from a new directory called `alert-system` to the alert-system-0.1.1 directory you just made by unzipping for easier use and updates:

```bash
ln -s alert-system-0.1.1 alert-system
```

To run the alert system, pass in the location of the bitcoind configuration file so that it can connect over RPC:

```bash
cd alert-system
# Example based on user
ALERT_SYSTEM_BITCOIN_CONFIG_PATH=/home/user/bitcoin-data/bitcoin.conf \
ALERT_SYSTEM_ENVIRONMENT=mainnet \
/home/user/alert-system/alert-system
```

Create the `alert-system.service` file:

```bash
sudo vim /etc/systemd/system/alert-system.service
```

```systemd
[Unit]
Description=BSV Alert System service
After=network.target
[Service]
Type=simple
# Make sure to replace username
Environment="ALERT_SYSTEM_BITCOIN_CONFIG_PATH=/home/user/bitcoin-data/bitcoin.conf"
Environment="ALERT_SYSTEM_ENVIRONMENT=mainnet"
Environment="ALERT_SYSTEM_DATASTORE__SQLITE__DATABASE_PATH=/home/user/alert-system/alert_system_datastore.db"
ExecStart=/home/user/alert-system/alert-system
TimeoutStopSec=1
KillMode=process
Restart=on-abnormal
PrivateTmp=true
# Make sure to replace username
User=user
[Install]
WantedBy=multi-user.target
```

Then start:

```bash
sudo systemctl start alert-system.service
sudo systemctl enable alert-system.service
```

Follow the logs using `journalctl`

```bash
sudo journalctl -xeu alert-system.service -f
```

## Multiple nodes and remote Alert Systems

If you are hosting the Alert System on the same host as the `bitcoind`, make sure only 1 instance of the Alert System is running on that host.

You can host multiple Alert Systems on a single instance or Kubernetes cluster, but then you will need to make sure they all run on a unique port and take care of any firewall considerations. For these setups it's easier to use a `config.json` to define the port and RPC credentials for the nodes. An example config can be found in the alert-system repo at [app/config/envs/mainnet.json](https://github.com/bitcoin-sv/alert-system/blob/master/app/config/envs/mainnet.json).

```bash
ALERT_SYSTEM_CONFIG_FILEPATH=path/to/file/config.json ./alert-system
```

Docker images for the Alert System can be found on [Docker Hub](https://hub.docker.com/repository/docker/bsvb/alert-key/general).
