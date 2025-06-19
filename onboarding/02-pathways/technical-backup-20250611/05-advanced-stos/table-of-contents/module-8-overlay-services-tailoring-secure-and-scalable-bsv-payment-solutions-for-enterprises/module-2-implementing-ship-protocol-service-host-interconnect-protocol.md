# Module 2: Implementing SHIP Protocol (Service Host Interconnect Protocol)

**Objective**: This module guides students in creating and managing SHIP tokens using the BRC-48 standard, integrating them within the STOstore as metadata-bearing UTXOs for topic-based service discovery. Additionally, this module covers the architecture and validation processes involved in using SHIP tokens for scalable peer discovery.

***

#### **Lesson 1: SHIP Token Architecture and Storage with BRC-48**

In overlay networks, SHIP tokens act as metadata-rich, transferable UTXOs that enable nodes to advertise their availability to manage or host data on specific topics. This lesson will explain how SHIP tokens are created using the BRC-48 standard, stored, and validated.

**1.1 BRC-48 and SHIP Tokens**

The BRC-48 standard is ideal for creating SHIP tokens because it provides a mechanism to encode metadata and maintain a secure lock on tokens using a `P2PK` script. Here’s how BRC-48 applies to SHIP:

* **Metadata Storage**: By pushing arbitrary data elements onto the stack, BRC-48 enables SHIP tokens to carry unique metadata related to service topics or node roles within the network. Each SHIP token can thus include topic identifiers, node information, and ownership details without creating heavy on-chain data loads.
* **Ownership and Transferability**: After embedding metadata, BRC-48 allows the use of OP\_DROP and OP\_2DROP opcodes to discard unnecessary stack data, followed by a `P2PK` lock to secure the token. This structure ensures that the token remains transferable while protecting its metadata.

**Example Script for SHIP Tokens (BRC-48)**

Here’s a sample script that illustrates how metadata is embedded in a SHIP token:

```plaintext
plaintextCopy code<metadata1> <metadata2> <metadata3> OP_DROP OP_2DROP <public_key> OP_CHECKSIG
```

In this script:

* `metadata1`, `metadata2`, and `metadata3` represent data fields that describe the SHIP token’s purpose, such as topic, node role, or timestamp.
* `OP_DROP` and `OP_2DROP` remove metadata from the stack after it has been pushed.
* `P2PK` (`<public_key> OP_CHECKSIG`) locks the token to a specific public key, ensuring that only the token owner can spend it.

This simple yet powerful structure makes SHIP tokens highly adaptable for topic-based services.

***

**1.2 SHIP Token Storage with STOstore**

**STOstore** serves as a comprehensive storage engine for managing data-driven UTXOs in overlay networks, such as SHIP tokens. SHIP tokens stored in the STOstore can be retrieved based on specific topics or node services, providing a distributed, scalable model for service discovery.

**Core Functions of SHIP Token Storage**:

* **Integration with BRC-48 Tokens**: STOstore leverages BRC-48 to handle SHIP tokens as metadata-rich UTXOs, which can be efficiently indexed and retrieved by topic.
* **Secure Token Storage**: STOstore uses the locking public key to verify ownership, ensuring that each SHIP token is only accessible to authorized users.

***

#### **Lesson 2: Managing SHIP Tokens in STOstore**

**Objective**: Learn how to implement and validate SHIP tokens within STOstore, using classes and functions such as `SHIPTopicManager` and `SHIPStorage` to manage metadata, topic indexing, and secure token retrieval.

***

**2.1 SHIPTopicManager and SHIPStorage Classes**

Two main classes handle SHIP tokens within STOstore:

* **SHIPTopicManager**: This class interfaces with STOstore to manage SHIP tokens according to their topics, enabling nodes to identify the right outputs based on topic requirements.
* **SHIPStorage**: Acts as the storage layer for SHIP tokens, where it can perform queries to add, retrieve, or delete SHIP records.

**SHIPTopicManager Methods**

1. **identifyAdmissibleOutputs**: This method processes SHIP tokens by validating their metadata fields and verifying ownership.
   * **Inputs**: Takes metadata fields, previous UTXO references, and public keys.
   * **Outputs**: Returns admissible tokens that match the SHIP token criteria for the specified topic.
2. **getMetaData**: Provides metadata about the SHIP topic, such as its name, icon, and description, to ensure clarity when tokens are stored and retrieved within the network.

**SHIPStorage Methods**

1. **storeSHIPRecord**: Adds a SHIP token to the database, linking it to a specific topic and public key.
2. **findRecord**: Queries the SHIP token store based on topic, enabling easy discovery of nodes associated with that topic.
3. **deleteSHIPRecord**: Removes a SHIP token from storage, helping manage active and inactive node advertisements.

**Code Sample**:

```javascript
javascriptCopy codeexport class SHIPTopicManager implements TopicManager {
    async identifyAdmissibleOutputs(metadataFields: Buffer[], previousUTXOs: Buffer[]): Promise<AdmittanceInstructions> {
        // Validate metadata fields and previous UTXO references
    }
    async getMetaData(): Promise<{ name: string; shortDescription: string; iconURL?: string; }> {
        return { name: "SHIP Topic Manager", shortDescription: "Manages SHIP tokens for service discovery." };
    }
}

export class SHIPStorage {
    async storeSHIPRecord(txid: string, outputIndex: number, publicKey: string, topic: string): Promise<void> {
        // Store the SHIP token in the STOstore database
    }
    async findRecord(query: { topic: string; }): Promise<UTXOReference[]> {
        // Retrieve SHIP tokens by topic
    }
}
```

This setup provides a modular approach to managing SHIP tokens, supporting the indexing, validation, and retrieval of metadata-based UTXOs.

***

#### **Lesson 3: SHIP Lookup Service with STOstore**

**Objective**: Explore the SHIPLookupService to understand how topic-based service discovery operates in the overlay network, allowing nodes to query, validate, and connect based on SHIP tokens.

***

**3.1 Using SHIPLookupService for Topic Discovery**

The **SHIPLookupService** is designed to enable decentralized service discovery based on SHIP tokens within STOstore. It provides methods for querying stored SHIP tokens by topic and validating their metadata for network coherence and security.

**Key Functions of SHIPLookupService**:

* **Topic-Based Queries**: Users can query STOstore to discover SHIP tokens associated with specific topics.
* **Validation of Metadata**: The service ensures all SHIP tokens returned in response to a query have valid metadata, signatures, and public keys to confirm authenticity.

**Example Workflow for SHIPLookupService**

1. **Adding Outputs**: When a SHIP token is created and stored in STOstore, `outputAdded` verifies the metadata and public key, ensuring the token meets the topic criteria.
2. **Querying for Topics**: Users can query the lookup service with a specific topic, allowing them to find nodes that advertise their service using SHIP tokens.
3. **Validating Tokens**: Each retrieved SHIP token is checked for metadata integrity and ownership by matching the locking key and verifying the digital signature.

**Code Sample**:

```javascript
javascriptCopy codeexport class SHIPLookupService implements LookupService {
    constructor(public storage: SHIPStorage) {}

    async outputAdded(txid: string, outputIndex: number, topic: string): Promise<void> {
        // Process and validate new SHIP token
    }

    async lookup(query: { topic: string }): Promise<UTXOReference[]> {
        // Retrieve matching SHIP tokens for the topic
        return await this.storage.findRecord(query);
    }
}
```

This structured approach allows SHIPLookupService to efficiently handle topic-based discovery by querying the STOstore, validating metadata, and returning topic-relevant tokens.

***

#### **Summary of Module 2**

In this module, we covered the full implementation and management of SHIP tokens within the STOstore. By utilizing BRC-48, we ensured SHIP tokens could carry rich metadata while retaining security and transferability. Integrating these tokens into the STOstore allows for scalable, topic-based service discovery across the overlay network. The SHIPLookupService provides an efficient, validated means of locating relevant services by querying topics, setting up the overlay network for decentralized and secure communication.

4owindow.\_\_oai\_logHTML?window.\_\_oai\_logHTML():window.\_\_oai\_SSR\_HTML=window.\_\_oai\_SSR\_HTML||Date.now();requestAnimationFrame((function(){window.\_\_oai\_logTTI?window.\_\_oai\_logTTI():window.\_\_oai\_SSR\_TTI=window.\_\_oai\_SSR\_TTI||Date.now()}))

\


ChatGPT can make mistakes. Check important info.
