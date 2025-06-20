# Mitigating Strategies

This section focuses on the various approaches used to tackle inherent challenges in distributed systems, including the CAP theorem constraints, latency, coordination complexities, and data management issues. It will detail both traditional methods and the innovative application of blockchain technology.

## **Legacy Mitigating Strategies:**

**Replication and Fault Tolerance**&#x20;

<figure><img src="../../../.gitbook/assets/image (99).png" alt=""><figcaption><p><a href="https://www.imperva.com/learn/availability/fault-tolerance/">https://www.imperva.com/learn/availability/fault-tolerance/</a></p></figcaption></figure>

These techniques involve duplicating data or computational services across multiple nodes to ensure system availability and reliability.

**Data Sharding**

<figure><img src="../../../.gitbook/assets/image (98).png" alt=""><figcaption><p><a href="https://kinsta.com/blog/database-sharding/">https://kinsta.com/blog/database-sharding/</a></p></figcaption></figure>

This strategy partitions data across different nodes, enhancing performance by localizing interactions and reducing latency.

**Load Balancing**&#x20;

Evenly distributing workloads across all nodes prevents any single point from becoming overloaded, thus maintaining system efficiency and resilience.



## **Content Delivery Networks (CDNs)**

{% embed url="https://youtu.be/Bsq5cKkS33I?si=LKkZtWpbcwakUjrO" %}

<figure><img src="../../../.gitbook/assets/image (100).png" alt=""><figcaption><p><a href="https://learn.microsoft.com/en-us/power-pages/configure/configure-cdn">https://learn.microsoft.com/en-us/power-pages/configure/configure-cdn</a></p></figcaption></figure>

* **Purpose and Function:** CDNs are networks of servers that cache copies of web content at various geographical locations closer to users. They are designed to deliver content such as web pages, videos, and images with high availability and performance.
* **Latency Reduction:** By caching content at edge servers located closer to the end-users, CDNs significantly reduce the distance data must travel, thereby minimizing latency and speeding up content delivery.
* **Traffic Management:** CDNs manage and mitigate potential traffic spikes by distributing the load among multiple servers, ensuring that no single server bears too much pressure, which enhances overall system responsiveness.
* **Enhanced User Experience:** Through faster load times and reduced site latency, CDNs improve the user experience, which is crucial for maintaining user engagement and satisfaction in applications like e-commerce and streaming services.

## **Blockchain as a Multipronged Mitigating Strategy**

{% embed url="https://youtu.be/qcuc3rgwZAE?si=VKisfiCkWxXJc_f6" %}

<figure><img src="../../../.gitbook/assets/image (101).png" alt=""><figcaption><p><a href="https://www.frontiersin.org/articles/10.3389/fbloc.2020.497985/full">https://www.frontiersin.org/articles/10.3389/fbloc.2020.497985/full</a></p></figcaption></figure>

* **Distributed Consensus and Coordination:** Blockchain technologies offer novel ways to achieve consensus and coordinate actions across distributed nodes without central control, enhancing system resilience and efficiency.
* **Immutable Ledger for Data Integrity:** Blockchain ensures that data transactions are securely logged in an immutable manner, which is crucial for auditability and trust.
* **Smart Contracts for Automated Management:** By utilizing smart contracts, blockchain can automate complex processes and enforce business rules, which helps in reducing administrative and operational overhead.

\
