# DDOS Mitigation

Operating an SV Node within the BSV Blockchain requires a proactive approach to security, particularly in safeguarding against Distributed Denial of Service (DDoS) attacks. These attacks aim to disrupt service by overwhelming the node with traffic, posing a significant risk to network stability and data integrity. Effective port management is a cornerstone of node security, emphasizing the importance of limiting open ports to those essential for operations. Special consideration should be given to port 8333, the default for peer-to-peer (P2P) communications, which, while not a frequent target, is vulnerable to DDoS attacks due to its critical role in network connectivity.

This guide offers targeted strategies and configurations to fortify SV Nodes against DDoS threats, focusing on optimizing `maxconnections` and `maxconnectionsfromaddr` settings, alongside deploying UFW rules to rate limit incoming traffic on port 8333. Implementing these measures enhances the resilience of the node, ensuring the BSV Blockchain network remains robust and reliable against external disruptions.

## SV Node Configurations

Configuring your SV Node correctly can significantly enhance its resilience against DDoS attacks. Two critical settings, `maxconnections` and `maxconnectionsfromaddr`, play a vital role in controlling the number of connections a node can handle, thus limiting the impact of an attack.

The `maxconnections` parameter specifies the maximum number of connections your SV Node will accept. Setting this to a reasonable value ensures that your node does not get overwhelmed by excessive connections. For most use cases, setting `maxconnections=50` offers a balance between accessibility and protection.

```editorconfig
maxconnections=50
```

This `maxconnectionsfromaddr` parameter limits the number of connections that can be established from a single IP address. By default, setting `maxconnectionsfromaddr=5` prevents a single source from occupying too many connections, thus mitigating the risk of DDoS attacks.

```editorconfig
maxconnectionsfromaddr=5
```

In case of persistent DDoS attempts or unusual network activity, reducing this limit further to `maxconnectionsfromaddr=1` can provide additional protection, albeit at the risk of limiting legitimate connections from shared networks.

## Pending Responses

To further enhance the security of your SV Node against DDoS attacks, adjusting advanced configuration settings related to memory usage and P2P request management is key. The settings `maxpendingresponses_getheaders` and `maxpendingresponses_gethdrsen` allow for control over the queue size for specific P2P requests, reducing the risk of memory exhaustion.

`maxpendingresponses_getheaders` limits the maximum allowed number of pending responses in the sending queue for received GETHEADERS P2P requests before the connection is closed.

`maxpendingresponses_gethdrsen` limits the maximum allowed number of pending responses in the sending queue for received GETHDRSEN P2P requests before the connection is closed.

Both settings are not applicable to whitelisted peers. We recommend the following values to ensure efficient memory use without limiting peer communications from honest nodes.

```editorconfig
maxpendingresponses_getheaders=50
maxpendingresponses_gethdrsen=10
```

## UFW (Uncomplicated Firewall)

UFW, or Uncomplicated Firewall, offers an intuitive way to manage netfilter firewall rules on Unix systems. It simplifies the process of configuring a firewall, making it accessible for users of all levels. Rate limiting connections to your SV Node can effectively mitigate DDoS attack impacts. UFW allows you to easily apply rate limiting to specific ports, which is particularly useful for nodes exposed to the internet.

To protect the SV Node, specifically the port commonly used by Bitcoin-based software (8333), you can use the `ufw limit` command. This command limits the number of incoming connections on port 8333/tcp, reducing the risk of DDoS attacks.

```bash
sudo ufw limit 8333/tcp
```

This command configures UFW to allow connections but limits the rate at which they can be made, helping to prevent your node from being overwhelmed by traffic.

After configuring the rule, ensure that UFW is enabled and that the rule is applied:

```bash
sudo ufw enable
sudo ufw status
```

The status command should show that rate limiting is active on port 8333/tcp, indicating your SV Node is now better protected against DDoS attacks.
