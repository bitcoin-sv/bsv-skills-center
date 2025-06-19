# Advanced API strategies

APIs are critical for the efficient operation of distributed systems, enabling modular, scalable, and flexible interactions between different system components. As systems scale and become more complex, the strategies to manage and secure APIs become increasingly important.

## **API Communication Patterns**

**Client-Server Model**&#x20;

<figure><img src="../../../.gitbook/assets/image (81).png" alt=""><figcaption><p><a href="https://medium.com/@hemilturakhia/rest-api-introduction-eda7dd2c97e8">https://medium.com/@hemilturakhia/rest-api-introduction-eda7dd2c97e8</a></p></figcaption></figure>

The foundational pattern where clients send requests to a server which then responds. It's widely used for handling user interactions with back-end services.

### **Service-Oriented Architecture (SOA)**

<figure><img src="../../../.gitbook/assets/image (82).png" alt=""><figcaption><p><a href="https://blogs.mulesoft.com/learn-apis/api-led-connectivity/api-led-connectivity-vs-soa/">https://blogs.mulesoft.com/learn-apis/api-led-connectivity/api-led-connectivity-vs-soa/</a></p></figcaption></figure>

Involves building applications as a collection of services that communicate via APIs. This pattern allows for services to be independently maintained, tested, and scaled.

## **Microservices Architecture**

{% embed url="https://youtu.be/CdBtNQZH8a4?si=jePEQ_d1HvuX6H5P" %}

<figure><img src="../../../.gitbook/assets/image (83).png" alt=""><figcaption><p><a href="https://medium.com/design-microservices-architecture-with-patterns/api-gateway-pattern-8ed0ddfce9df">https://medium.com/design-microservices-architecture-with-patterns/api-gateway-pattern-8ed0ddfce9df</a></p></figcaption></figure>

An evolution of SOA that structures applications as collections of loosely coupled services. Microservices communicate through APIs, enhancing a system’s scalability and agility.

## **API Gateways**

{% embed url="https://youtu.be/hWRRdICvMNs?si=0bsDo6HB5joS3m6Z" %}

<figure><img src="../../../.gitbook/assets/image (80).png" alt=""><figcaption><p><a href="https://microservices.io/patterns/microservices.html">https://microservices.io/patterns/microservices.html</a></p></figcaption></figure>

* **Function:** An API gateway acts as a reverse proxy to accept all API calls, aggregate the various services required to fulfill them, and return the appropriate result. It provides a centralized entry point for all API requests.
* **Benefits:** Includes simplified client interaction, improved response consistency, and enhanced security by offloading authentication and encryption tasks from backend services.

### **Load Balancing**

{% embed url="https://youtu.be/sCR3SAVdyCc?si=kRfRxiJNr97zmWlB" %}

<figure><img src="../../../.gitbook/assets/image (85).png" alt=""><figcaption><p><a href="https://k21academy.com/google-cloud/google-cloud-load-balancing/">https://k21academy.com/google-cloud/google-cloud-load-balancing/</a></p></figcaption></figure>

* **Purpose:** Distributes incoming API traffic across multiple server instances to optimize resource use, maximize throughput, improve response times, and ensure fault tolerance.
* **Techniques:** Common techniques include round-robin, IP-hash, least connections, and more sophisticated dynamic balancing that considers server load and response time.

### **Authentication and Security**

<figure><img src="../../../.gitbook/assets/image (86).png" alt=""><figcaption><p><a href="https://www.postman.com/api-platform/api-authentication/">https://www.postman.com/api-platform/api-authentication/</a></p></figcaption></figure>

* **Authentication:** Ensures that only legitimate users can access APIs. Common methods include token-based authentication (like OAuth), API keys, and JWT (JSON Web Tokens).
* **Security:** Beyond authentication, securing APIs involves implementing HTTPS for secure data transmission, using quotas and throttling to prevent abuse, and ensuring data validation to protect against injection attacks.

