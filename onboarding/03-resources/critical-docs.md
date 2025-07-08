# Critical Documentation

This page provides a comprehensive collection of essential technical documentation for BSV blockchain development. These resources form the foundation of technical knowledge required for effective BSV development and serve as authoritative references for protocol details, APIs, standards, and best practices.

## 📜 Protocol Documentation

### Core Protocol

| Document | Description | Format |
|----------|-------------|--------|
| [**BSV Protocol Reference**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/protocol.md) | Comprehensive documentation of the BSV protocol | Markdown |
| [**Block Structure**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/block.md) | Detailed specification of BSV block format | Markdown |
| [**Transaction Format**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/transaction-format.md) | Detailed specification of BSV transaction format | Markdown |
| [**Script Language Reference**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/script.md) | Complete reference for the BSV Script language | Markdown |
| [**Opcodes Reference**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/opcodes.md) | Comprehensive list of Script opcodes with descriptions | Markdown |
| [**Network Protocol**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/p2p-protocol.md) | Documentation of the peer-to-peer network protocol | Markdown |

### Protocol Extensions

| Document | Description | Format |
|----------|-------------|--------|
| [**OP_RETURN Data Protocol**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/op_return.md) | Specification for data storage using OP_RETURN | Markdown |
| [**Extended Transaction Format**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/extended-transactions.md) | Documentation for extended transaction capabilities | Markdown |
| [**Merkle Proof Format**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/merkle-proofs.md) | Specification for Merkle proof format and validation | Markdown |
| [**SPV Protocol Extensions**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/spv-extensions.md) | Documentation for SPV protocol enhancements | Markdown |

### Protocol Updates

| Document | Description | Format |
|----------|-------------|--------|
| [**Genesis Upgrade**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/genesis-upgrade.md) | Comprehensive documentation of the Genesis protocol upgrade | Markdown |
| [**Script Limits Removal**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/script-limits.md) | Documentation on the removal of script size and complexity limits | Markdown |
| [**Transaction Size Limits**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/transaction-limits.md) | Information on transaction size limits and considerations | Markdown |
| [**Protocol Roadmap**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/roadmap.md) | Forward-looking roadmap for protocol development | Markdown |

## 🔌 API References

### Node APIs

| API | Description | Format |
|-----|-------------|--------|
| [**JSON-RPC API Reference**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/json-rpc.md) | Complete reference for the BSV node JSON-RPC API | Markdown |
| [**REST API Reference**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/rest-api.md) | Documentation for the BSV node REST API | Markdown |
| [**ZeroMQ Interface**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/zmq.md) | Documentation for the ZeroMQ notification interface | Markdown |
| [**Wallet RPC API**](https://github.com/bitcoin-sv/bitcoin-sv/blob/master/doc/wallet-rpc.md) | Reference for the wallet-related RPC commands | Markdown |

### Service APIs

| API | Description | Format |
|-----|-------------|--------|
| [**WhatsOnChain API**](https://developers.whatsonchain.com/) | Comprehensive blockchain data and transaction API | Web / OpenAPI |
| [**TAAL API**](https://docs.taal.com/core-products/transaction-processing) | Transaction processing and miner API | Web / OpenAPI |
| [**Merchant API (mAPI)**](https://github.com/bitcoin-sv/merchantapi-reference) | Reference implementation of the Merchant API specification | GitHub / OpenAPI |
| [**MetaStreme API**](https://metastreme.com/docs/api) | High-volume transaction processing API | Web / OpenAPI |

### SDK APIs

| API | Description | Format |
|-----|-------------|--------|
| [**TypeScript SDK API**](https://github.com/bitcoin-sv/ts-sdk) | API documentation for the BSV TypeScript SDK | TypeDoc / Markdown |
| [**bsv.js Library**](https://github.com/moneybutton/bsv) | Documentation for the bsv.js JavaScript library | JSDoc / Markdown |
| [**Wallet Toolbox API**](https://github.com/bitcoin-sv/wallet-toolbox) | API reference for the Wallet Toolbox | TypeDoc / Markdown |
| [**sCrypt Library API**](https://scrypt.io/docs/reference/) | API documentation for the sCrypt smart contract library | Web / Markdown |

## 📋 Standards & Specifications

### Data Standards

| Standard | Description | Status |
|----------|-------------|--------|
| [**Bitcoin Data Format (BDF)**](https://bdf.info/) | Standard for structured data in BSV transactions | Draft |
| [**B Protocol**](https://github.com/b-protocol/specification) | Protocol for binary data encoding in transactions | Implemented |
| [**Bitcom Protocols**](https://bitcom.bitdb.network/) | Registry of OP_RETURN protocols and prefixes | Active |
| [**Run Protocol**](https://run.network/docs/) | Protocol for tokens and smart contracts on BSV | Implemented |

### Identity Standards

| Standard | Description | Status |
|----------|-------------|--------|
| [**Metanet Protocol**](https://metanet.id/docs/) | Protocol for creating identity and data structures | Implemented |
| [**BSV Identity Protocol**](https://github.com/bitcoin-sv/identity-protocol) | Standard for identity management on BSV | Draft |
| [**Paymail Protocol**](https://bsvalias.org/01-02-paymail.html) | Protocol for human-readable payment addresses | Implemented |
| [**DIDS on BSV**](https://github.com/bitcoin-sv/dids-specification) | Decentralized Identifiers implementation for BSV | Draft |

### Transaction Standards

| Standard | Description | Status |
|----------|-------------|--------|
| [**Merchant API Specification**](https://github.com/bitcoin-sv/merchantapi-specification) | Standard for transaction submission to miners | Implemented |
| [**Simple Payment Verification (SPV)**](https://github.com/bitcoin-sv/spv-specification) | Specification for lightweight client verification | Implemented |
| [**Transaction Signing Protocol**](https://github.com/bitcoin-sv/transaction-signing-protocol) | Standard for multi-party transaction signing | Draft |
| [**Fee Specification**](https://github.com/bitcoin-sv/fee-specification) | Standard for fee calculation and communication | Implemented |

### Application Standards

| Standard | Description | Status |
|----------|-------------|--------|
| [**Tokenization Protocol**](https://github.com/bitcoin-sv/token-protocol) | Standard for token creation and management | Draft |
| [**Smart Contract Interface**](https://github.com/bitcoin-sv/smart-contract-interface) | Standard interface for smart contract interaction | Draft |
| [**Data Storage Protocol**](https://github.com/bitcoin-sv/data-storage-protocol) | Standard for large data storage on BSV | Implemented |
| [**Application Interoperability**](https://github.com/bitcoin-sv/app-interop) | Standards for application interoperability | Draft |

## 📚 Best Practices

### Development Best Practices

| Document | Description | Target Audience |
|----------|-------------|----------------|
| [**Transaction Construction Guide**](https://github.com/bitcoin-sv/transaction-construction-guide) | Best practices for constructing transactions | Developers |
| [**UTXO Management**](https://github.com/bitcoin-sv/utxo-management) | Guidelines for effective UTXO management | Developers |
| [**Script Optimization**](https://github.com/bitcoin-sv/script-optimization) | Techniques for optimizing Script code | Developers |
| [**Fee Calculation Strategies**](https://github.com/bitcoin-sv/fee-strategies) | Approaches to fee calculation and management | Developers |

### Security Best Practices

| Document | Description | Target Audience |
|----------|-------------|----------------|
| [**Key Management Guide**](https://github.com/bitcoin-sv/key-management-guide) | Best practices for private key management | Developers, Operators |
| [**Transaction Security**](https://github.com/bitcoin-sv/transaction-security) | Guidelines for secure transaction handling | Developers |
| [**Smart Contract Security**](https://github.com/bitcoin-sv/smart-contract-security) | Security considerations for smart contracts | Developers |
| [**Node Security**](https://github.com/bitcoin-sv/node-security) | Best practices for securing BSV nodes | Operators |

### Performance Best Practices

| Document | Description | Target Audience |
|----------|-------------|----------------|
| [**Scaling Guidelines**](https://github.com/bitcoin-sv/scaling-guidelines) | Best practices for building scalable applications | Developers, Architects |
| [**Transaction Throughput**](https://github.com/bitcoin-sv/transaction-throughput) | Techniques for high-throughput transaction processing | Developers |
| [**Data Optimization**](https://github.com/bitcoin-sv/data-optimization) | Approaches to optimizing data storage on BSV | Developers |
| [**Network Efficiency**](https://github.com/bitcoin-sv/network-efficiency) | Guidelines for efficient network utilization | Developers, Operators |

### Operational Best Practices

| Document | Description | Target Audience |
|----------|-------------|----------------|
| [**Node Operation Guide**](https://github.com/bitcoin-sv/node-operation) | Best practices for operating BSV nodes | Operators |
| [**Monitoring and Alerting**](https://github.com/bitcoin-sv/monitoring-guide) | Guidelines for monitoring BSV applications | Operators |
| [**Backup and Recovery**](https://github.com/bitcoin-sv/backup-recovery) | Best practices for backup and disaster recovery | Operators |
| [**Compliance Guidelines**](https://github.com/bitcoin-sv/compliance-guidelines) | Guidance for regulatory compliance | Business, Legal |

## 📖 Technical Whitepapers

### Foundational Papers

| Paper | Author | Year | Description |
|-------|--------|------|-------------|
| [**Bitcoin: A Peer-to-Peer Electronic Cash System**](https://bitcoinsv.io/bitcoin.pdf) | Satoshi Nakamoto | 2008 | The original Bitcoin whitepaper |
| [**The Bitcoin Whitepaper: Restored to Original Form**](https://bitcoinsv.io/bitcoin-whitepaper-restored.pdf) | Bitcoin SV | 2019 | Restored version of the original whitepaper |
| [**Theory of Bitcoin**](https://bitcoinsv.io/theory-of-bitcoin.pdf) | Craig S. Wright | 2019 | Theoretical foundations of Bitcoin |
| [**Small World: How Network Topology Affects Miner Performance**](https://bitcoinsv.io/small-world.pdf) | nChain Research | 2018 | Analysis of mining network topology |

### Technical Research Papers

| Paper | Author | Year | Description |
|-------|--------|------|-------------|
| [**Scaling Bitcoin: On-chain Scaling Solutions**](https://bitcoinsv.io/scaling-bitcoin.pdf) | Bitcoin SV | 2020 | Research on on-chain scaling approaches |
| [**Teranode: Architecture for a Trillion-Transaction Network**](https://bitcoinsv.io/teranode.pdf) | nChain Research | 2021 | Architecture for high-throughput node implementation |
| [**Miner ID: Protocol for Miner Identification and Authentication**](https://bitcoinsv.io/miner-id.pdf) | Bitcoin SV | 2019 | Protocol for miner identification |
| [**Simplified Payment Verification in a World of Pruned Nodes**](https://bitcoinsv.io/spv-pruning.pdf) | nChain Research | 2020 | SPV functionality with pruned blockchain data |

## 🔍 Reference Implementations

### Node Implementations

| Implementation | Language | Description | Repository |
|----------------|----------|-------------|------------|
| [**Bitcoin SV Node**](https://github.com/bitcoin-sv/bitcoin-sv) | C++ | Reference implementation of the BSV node | GitHub |
| [**Teranode**](https://github.com/bitcoin-sv/teranode) | Various | High-performance enterprise node implementation | GitHub |
| [**Bitcoin SV Header-Only Client**](https://github.com/bitcoin-sv/header-client) | C++ | Lightweight header-only client implementation | GitHub |
| [**SPV Node Reference**](https://github.com/bitcoin-sv/spv-node) | Various | Reference implementation of an SPV node | GitHub |

### Library Implementations

| Implementation | Language | Description | Repository |
|----------------|----------|-------------|------------|
| [**TypeScript SDK**](https://github.com/bitcoin-sv/ts-sdk) | TypeScript | Official TypeScript SDK for BSV development | GitHub |
| [**bsv.js**](https://github.com/moneybutton/bsv) | JavaScript | JavaScript library for BSV development | GitHub |
| [**Wallet Toolbox**](https://github.com/bitcoin-sv/wallet-toolbox) | TypeScript | Tools for wallet integration and management | GitHub |
| [**sCrypt**](https://github.com/scrypt-sv/scryptlib) | TypeScript | Library for smart contract development | GitHub |

### Protocol Implementations

| Implementation | Language | Description | Repository |
|----------------|----------|-------------|------------|
| [**Merchant API Reference**](https://github.com/bitcoin-sv/merchantapi-reference) | Various | Reference implementation of the Merchant API | GitHub |
| [**Paymail Reference**](https://github.com/bitcoin-sv/paymail-reference) | Various | Reference implementation of the Paymail protocol | GitHub |
| [**Metanet Node**](https://github.com/bitcoin-sv/metanet-node) | Various | Reference implementation of a Metanet node | GitHub |
| [**SPV Wallet**](https://github.com/bitcoin-sv/spv-wallet) | Various | Reference implementation of an SPV wallet | GitHub |

## 📋 Documentation Roadmap

The BSV documentation ecosystem is continuously evolving. The following areas are currently under development:

1. **Protocol Standardization**: Formal standardization of protocol extensions and improvements
2. **Developer Guides**: Comprehensive guides for common development scenarios
3. **Integration Patterns**: Documentation of integration patterns for various use cases
4. **Performance Benchmarks**: Standardized performance benchmarks and metrics
5. **Security Frameworks**: Comprehensive security frameworks and audit methodologies

## 🔗 Additional Resources

For additional documentation resources:

- [**BSV Wiki**](https://wiki.bitcoinsv.io/): Community-maintained wiki with technical information
- [**BSV DevCon Presentations**](https://bitcoinsv.io/devcon/): Technical presentations from BSV developer conferences
- [**Technical Blog Posts**](https://bitcoinsv.io/technical-blog/): Technical articles and updates from the BSV team
- [**Academic Papers**](https://bitcoinsv.io/research/): Academic research papers related to BSV technology

## 📚 Documentation Contribution

To contribute to BSV documentation:

1. **Identify Gaps**: Identify areas where documentation is missing or incomplete
2. **Create Content**: Develop clear, accurate, and comprehensive documentation
3. **Submit Contributions**: Submit your contributions through the appropriate channels
4. **Review Process**: Participate in the review and refinement process

For more information on contributing to documentation, see the [Community Resources](community.md) page.

---

**Note:** While we strive to maintain accurate links, some documentation URLs may change over time. If you encounter a broken link, please check the main [BSV Developer Portal](https://bitcoinsv.io/developers/) for updated resources.