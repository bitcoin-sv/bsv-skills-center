# What are distributed systems?

{% embed url="https://youtu.be/CESKgdNiKJw?si=CLufwHTcM_mZ61s5" %}

When a single computer system is tasked with increasingly complex or voluminous workloads, it eventually reaches its physical and operational limits. Even after upgrading components like RAM or storage, there comes a point where the architecture of a single machine cannot handle the demands placed upon it. This section explores how businesses and technologies evolve from using a single system to employing distributed systems to meet growing demands.

## **The Limitations of Scaling Up:**

* **Hardware Limits:** There are practical limits to how much memory (RAM) can be added to a single machine, dictated by the motherboard's slots. Similarly, there are limits to the number of storage devices that can be directly attached.
* **Performance Bottlenecks:** Even with the best configurations, a single CPU or server has finite processing capabilities. As demands increase, these resources can become bottlenecks, degrading performance and reliability.

## **Beyond Single Machine Solutions:**

#### **RAID Systems**

<figure><img src="../../../.gitbook/assets/image (36).png" alt=""><figcaption><p><a href="https://www.magicuneraser.com/press/types_of_raid_arrays.php">https://www.magicuneraser.com/press/types_of_raid_arrays.php</a></p></figcaption></figure>

&#x20;Initially, systems might integrate multiple hard drives using Redundant Array of Independent Disks (RAID) configurations to increase storage capacity and improve data redundancy. This is an early form of trying to enhance a system's capacity internally.

#### **Supercomputers**

<figure><img src="../../../.gitbook/assets/image (37).png" alt=""><figcaption><p><a href="https://www.researchgate.net/figure/Schematic-of-typical-architecture-of-a-modern-supercomputer_fig1_328946498">https://www.researchgate.net/figure/Schematic-of-typical-architecture-of-a-modern-supercomputer_fig1_328946498</a></p></figcaption></figure>

For high-performance needs, supercomputers link multiple processors to work together, forming a primitive distributed system. These setups are designed to handle complex computations that are beyond the capability of a single processor.

## **Transitioning to Distributed Systems:**

As organizations grow and data and processing needs expand, the move to distributed systems becomes inevitable. Distributed systems utilize networks to connect multiple computers, allowing them to work together as a single system. This setup not only increases capacity but also adds redundancy and resilience, ensuring that the failure of one component does not bring down the entire system.



\
