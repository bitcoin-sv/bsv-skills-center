# Common Distributed Systems

Distributed systems come in various forms and serve multiple purposes depending on the needs of the application. Understanding these common patterns helps clarify how these systems can be designed and implemented effectively.

## **Distributed System Patterns**

### **Client-Server Model**

<figure><img src="../../../.gitbook/assets/image (46).png" alt=""><figcaption><p><a href="https://en.wikipedia.org/wiki/Client%E2%80%93server_model">https://en.wikipedia.org/wiki/Client%E2%80%93server_model</a></p></figcaption></figure>

* **Description:** The most basic form of a distributed system where many clients (users or computers) request and receive services from a centralized server.
* **Application:** Web applications where a web server serves the pages requested by users' browsers.

### **Three-Tier Architecture**

<figure><img src="../../../.gitbook/assets/image (47).png" alt=""><figcaption><p><a href="https://docs.aws.amazon.com/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/three-tier-architecture-overview.html">https://docs.aws.amazon.com/whitepapers/latest/serverless-multi-tier-architectures-api-gateway-lambda/three-tier-architecture-overview.html</a></p></figcaption></figure>

* **Description:** A more complex model that divides functions into three layers: presentation, application logic, and data storage.
* **Application:** E-commerce platforms where the user interface, business processing, and database management are handled separately to enhance scalability and manageability.

### **Peer-to-Peer Networks**

<figure><img src="../../../.gitbook/assets/image (48).png" alt=""><figcaption><p><a href="https://en.wikipedia.org/wiki/Peer-to-peer">https://en.wikipedia.org/wiki/Peer-to-peer</a></p></figcaption></figure>

* **Description:** A distributed model where each node, or peer, acts both as a client and a server, sharing resources without a central coordinator.
* **Application:** File-sharing systems like BitTorrent or blockchain applications where data integrity and availability are maintained without a central authority.

### **Microservices Architecture**

<figure><img src="../../../.gitbook/assets/image (49).png" alt=""><figcaption></figcaption></figure>

* **Description:** An approach where an application is built as a collection of small, independent services that communicate over a network.
* **Application:** Large-scale web services like those offered by Netflix and Amazon, where different services manage different aspects of the business and can be updated independently.

## **Distributed Systems in the Cloud**

{% embed url="https://youtu.be/nH4qjmP2KEE?si=fRavAaSiUyMwyauX" %}

Cloud computing platforms utilize distributed systems to provide scalable and flexible services to their customers. These platforms manage vast amounts of data and provide computational power through distributed networks globally.

### **Service Providers Like AWS:**

* **AWS Services:** AWS offers a range of distributed services such as Amazon EC2 for scalable computing capacity, Amazon S3 for scalable storage, and Amazon DynamoDB for a distributed database.
* **Benefits:** These services allow users to easily implement scalable applications without managing physical hardware, adjusting resources dynamically to meet demand, and paying only for what they use.

\
