# CAP Theorem

{% embed url="https://youtu.be/eWMgsk7mpFc?si=jHau83MaFnBgpgSl" %}

<figure><img src="../../../.gitbook/assets/image (93).png" alt=""><figcaption><p><a href="https://www.educba.com/cap-theorem/">https://www.educba.com/cap-theorem/</a></p></figcaption></figure>

The CAP Theorem, also known as Brewer's Theorem, posits that it is impossible for a distributed system to simultaneously provide all three of the following guarantees:

* **Consistency:** Every read from the database receives the most recent write or an error.
* **Availability:** Every request receives a response, without guaranteeing that it contains the most recent write.
* **Partition Tolerance:** The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

## **Significance of the CAP Theorem**

The CAP Theorem is a fundamental principle that helps system designers understand the trade-offs involved when building distributed systems. It states that in the presence of a network partition, one has to choose between consistency and availability. This decision affects how systems are architected based on application-specific requirements.

* **Consistency:** Achieving strong consistency in distributed systems often involves techniques like replication and complex coordination protocols to ensure that all nodes see the same data at the same time.
* **Availability:** To maximize availability, systems often must allow operations to continue even when some parts of the system are down or when network partitions occur.
* **Partition Tolerance:** Given the realities of network failures, partition tolerance is not optional in most real-world applications. Systems must be designed to handle partitions gracefully without complete failure.

## **Trade-offs and Decision Making:**

Discussing how different systems prioritize these properties based on their specific needs is crucial. For example, a banking system might favor consistency over availability, while a social media platform might prioritize availability to ensure a smooth user experience even if it means occasional inconsistency in data.

***

\
