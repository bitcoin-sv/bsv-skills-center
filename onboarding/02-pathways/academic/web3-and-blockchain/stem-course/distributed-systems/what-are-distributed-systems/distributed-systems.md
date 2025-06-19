# Distributed Systems

<figure><img src="../../../.gitbook/assets/image (38).png" alt=""><figcaption><p><a href="https://towardsdatascience.com/lets-build-a-simple-distributed-computing-system-for-modern-cloud-part-one-e2b745126211">https://towardsdatascience.com/lets-build-a-simple-distributed-computing-system-for-modern-cloud-part-one-e2b745126211</a></p></figcaption></figure>

Distributed systems consist of multiple computers or nodes that work cooperatively to provide a unified service or perform complex computations. These systems are distributed across various physical locations and are interconnected through networks, enabling them to function as a cohesive unit despite geographical dispersion.

## **Why Use Distributed Systems?**

### **Scalability**

<figure><img src="../../../.gitbook/assets/image (90).png" alt=""><figcaption><p><a href="https://inspector.dev/how-i-handled-the-scalability-of-the-sql-database-at-inspector/">https://inspector.dev/how-i-handled-the-scalability-of-the-sql-database-at-inspector/</a></p></figcaption></figure>

Distributed systems allow for the expansion of services across multiple nodes in an economical way, enabling them to handle increasing demands efficiently. This setup prevents any single point of failure from disrupting the entire system.

### **Resilience**

<figure><img src="../../../.gitbook/assets/image (41).png" alt=""><figcaption><p><a href="https://www.atlassian.com/microservices/microservices-architecture/distributed-architecture">https://www.atlassian.com/microservices/microservices-architecture/distributed-architecture</a></p></figcaption></figure>

The architecture of distributed systems enhances fault tolerance. If one node encounters an issue, the system can automatically reroute tasks to other nodes, maintaining continuous operations without significant downtime.

**Resource Sharing**

<figure><img src="../../../.gitbook/assets/image (43).png" alt=""><figcaption><p><a href="https://www.spiceworks.com/tech/cloud/articles/what-is-distributed-computing/">https://www.spiceworks.com/tech/cloud/articles/what-is-distributed-computing/</a></p></figcaption></figure>

These systems enable multiple users and applications to access and share resources remotely, optimizing resource utilization and operational flexibility.

## **Expanded Concepts in Distributed Systems**



<figure><img src="../../../.gitbook/assets/image (44).png" alt=""><figcaption><p><a href="https://www.sitepoint.com/premium/books/distributed-systems-for-practitioners/read/1/kj26kxsn/">https://www.sitepoint.com/premium/books/distributed-systems-for-practitioners/read/1/kj26kxsn/</a></p></figcaption></figure>

### **Nodes and Their Roles**

Each node in a distributed system performs specific tasks, operating semi-autonomously. Nodes are often specialized by function, which optimizes performance and efficiency.

### **Network Communication**&#x20;

Robust and secure communication channels are vital for the effective operation of distributed systems. These systems rely on protocols like TCP/IP to ensure reliable data transfer and synchronization across nodes.

### **Concurrency and Coordination**

One of the primary challenges in distributed systems is managing the concurrency of operations across multiple nodes. Mechanisms like locks, semaphores, and transactional memory are employed to prevent data conflicts and ensure integrity. Blockchain with can offer immense assistance in the ability to order events.

## **Advantages**

### **Load Balancing**&#x20;

<figure><img src="../../../.gitbook/assets/image (45).png" alt=""><figcaption><p><a href="https://www.geeksforgeeks.org/load-balancing-approach-in-distributed-system/">https://www.geeksforgeeks.org/load-balancing-approach-in-distributed-system/</a></p></figcaption></figure>

Distributed systems excel in balancing loads across multiple nodes. This capability not only enhances system responsiveness but also optimizes resource use by distributing tasks in a way that prevents any single node from being overwhelmed.

### **System Flexibility**&#x20;

The dynamic nature of distributed systems means they can be scaled up or down with minimal impact on ongoing operations. This flexibility is crucial for businesses that experience variable workloads.

### **Increased Service Availability**

The spread out nature of distributed systems significantly boosts the availability of applications. Techniques like redundancy and failover strategies ensure that services are always accessible, even in the event of hardware or software failures.

