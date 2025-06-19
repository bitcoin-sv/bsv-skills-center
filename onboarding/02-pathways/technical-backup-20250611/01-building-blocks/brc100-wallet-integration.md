# BRC-100 Wallet Integration

Master the modern BSV wallet-application interface standard that forms the foundation of all contemporary BSV development. This guide covers the complete implementation of BRC-100 compliant wallet integration.

## 🎯 Learning Objectives

By completing this module, you will:
- **Understand** BRC-100 specifications and requirements
- **Implement** wallet client framework integration
- **Create** secure wallet-application communication
- **Handle** authentication, transactions, and data management
- **Follow** best practices for production applications

## 📚 Introduction to the Wallet Client Framework and BRC-100

The BSV Blockchain's standard wallet-to-application interface is defined by **BRC-100**. This standard is a cornerstone of the new BSV tech stack, providing a robust, secure, and standardized way for applications to communicate with user wallets.

### Why BRC-100?

Historically, computing has faced challenges with data centralization and compatibility issues. Users often deal with complex and insecure authentication systems, risking their data and privacy. The traditional online model, heavily reliant on advertising for monetization, can also create misaligned incentives.

BRC-100 offers a powerful solution to these problems by defining a standard interface that allows users to:

- **Identify Themselves Securely**: Engage in secure authentication without exposing sensitive data
- **Protect Their Data**: Maintain control over their personal information and transaction history
- **Engage in E-commerce with Bitcoin**: Facilitate seamless and secure payments directly from their wallet

### Primary Objectives of BRC-100

BRC-100 was developed with several key objectives in mind:

1. **Standardization**: Provide a consistent API that allows any application to integrate with any compliant wallet without requiring custom development for each wallet vendor
2. **Vendor-Neutrality**: Abstract away the specifics of the underlying wallet implementation, ensuring applications work seamlessly with wallets from different providers
3. **Security**: Implement robust security measures to protect user data and transactions
4. **User Experience**: Create intuitive and seamless interactions between applications and wallets
5. **Scalability**: Support high-volume applications and enterprise use cases

## 🔧 Technical Implementation

### Basic Wallet Client Setup

```typescript
// wallet-client-setup.ts
import { WalletClient } from '@bsv/wallet-client';

export class BSVWalletIntegration {
  private client: WalletClient;
  private isConnected: boolean = false;

  constructor() {
    this.client = new WalletClient({
      timeout: 30000,
      retries: 3
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.isConnected = true;
      console.log('✅ Wallet connected successfully');
    } catch (error) {
      console.error('❌ Wallet connection failed:', error);
      throw new Error(`Wallet connection failed: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.isConnected) {
      await this.client.disconnect();
      this.isConnected = false;
      console.log('🔌 Wallet disconnected');
    }
  }

  isWalletConnected(): boolean {
    return this.isConnected;
  }
}
```

### Identity and Authentication

```typescript
// identity-management.ts
export class IdentityManager {
  constructor(private walletClient: WalletClient) {}

  async requestIdentity(protocolID: string): Promise<string> {
    try {
      const publicKey = await this.walletClient.getPublicKey({
        protocolID,
        keyID: 'identity',
        description: 'Application identity verification'
      });
      
      return publicKey;
    } catch (error) {
      throw new Error(`Identity request failed: ${error.message}`);
    }
  }

  async createUserProfile(protocolID: string): Promise<UserProfile> {
    const publicKey = await this.requestIdentity(protocolID);
    
    return {
      id: this.generateUserID(publicKey),
      publicKey,
      createdAt: new Date(),
      protocolID
    };
  }

  private generateUserID(publicKey: string): string {
    // Generate deterministic user ID from public key
    return Buffer.from(publicKey, 'hex').toString('base64').slice(0, 16);
  }
}

interface UserProfile {
  id: string;
  publicKey: string;
  createdAt: Date;
  protocolID: string;
}
```

### Transaction Management

```typescript
// transaction-manager.ts
export class TransactionManager {
  constructor(private walletClient: WalletClient) {}

  async createPayment(
    recipient: string, 
    amount: number, 
    description?: string
  ): Promise<string> {
    try {
      // Create transaction
      const transaction = await this.walletClient.createTransaction({
        outputs: [{
          to: recipient,
          amount: amount,
          description: description || 'Payment'
        }],
        description: `Payment of ${amount} satoshis to ${recipient}`
      });

      // Sign transaction
      const signedTransaction = await this.walletClient.signTransaction(transaction);

      // Broadcast transaction
      const txid = await this.walletClient.broadcastTransaction(signedTransaction);

      console.log(`✅ Payment successful: ${txid}`);
      return txid;

    } catch (error) {
      console.error('❌ Payment failed:', error);
      throw new Error(`Payment failed: ${error.message}`);
    }
  }

  async createDataTransaction(data: any, protocolID: string): Promise<string> {
    try {
      const transaction = await this.walletClient.createTransaction({
        outputs: [{
          script: this.createDataScript(data),
          amount: 1 // Minimal amount for data storage
        }],
        description: `Data storage for ${protocolID}`
      });

      const signedTx = await this.walletClient.signTransaction(transaction);
      const txid = await this.walletClient.broadcastTransaction(signedTx);

      return txid;
    } catch (error) {
      throw new Error(`Data transaction failed: ${error.message}`);
    }
  }

  private createDataScript(data: any): string {
    // Create OP_RETURN script for data storage
    const dataBuffer = Buffer.from(JSON.stringify(data), 'utf8');
    return `OP_RETURN ${dataBuffer.toString('hex')}`;
  }
}
```

### Advanced Features

```typescript
// advanced-wallet-features.ts
export class AdvancedWalletFeatures {
  constructor(private walletClient: WalletClient) {}

  async getWalletInfo(): Promise<WalletInfo> {
    try {
      const info = await this.walletClient.getInfo();
      return {
        version: info.version,
        network: info.network,
        capabilities: info.capabilities,
        supportedProtocols: info.supportedProtocols
      };
    } catch (error) {
      throw new Error(`Failed to get wallet info: ${error.message}`);
    }
  }

  async getBalance(): Promise<BalanceInfo> {
    try {
      const balance = await this.walletClient.getBalance();
      return {
        confirmed: balance.confirmed,
        unconfirmed: balance.unconfirmed,
        total: balance.confirmed + balance.unconfirmed
      };
    } catch (error) {
      throw new Error(`Failed to get balance: ${error.message}`);
    }
  }

  async getTransactionHistory(limit: number = 10): Promise<TransactionHistory[]> {
    try {
      const history = await this.walletClient.getTransactionHistory({
        limit,
        offset: 0
      });

      return history.transactions.map(tx => ({
        txid: tx.txid,
        amount: tx.amount,
        timestamp: tx.timestamp,
        description: tx.description,
        status: tx.status
      }));
    } catch (error) {
      throw new Error(`Failed to get transaction history: ${error.message}`);
    }
  }

  async signMessage(message: string, keyID: string): Promise<string> {
    try {
      const signature = await this.walletClient.signMessage({
        message,
        keyID,
        description: 'Message signature for verification'
      });

      return signature;
    } catch (error) {
      throw new Error(`Message signing failed: ${error.message}`);
    }
  }
}

interface WalletInfo {
  version: string;
  network: string;
  capabilities: string[];
  supportedProtocols: string[];
}

interface BalanceInfo {
  confirmed: number;
  unconfirmed: number;
  total: number;
}

interface TransactionHistory {
  txid: string;
  amount: number;
  timestamp: Date;
  description: string;
  status: string;
}
```

## 🛡️ Security Best Practices

### Permission Management

```typescript
// permission-manager.ts
export class PermissionManager {
  private permissions: Map<string, Permission[]> = new Map();

  async requestPermission(
    protocolID: string, 
    permission: PermissionType
  ): Promise<boolean> {
    try {
      const granted = await this.walletClient.requestPermission({
        protocolID,
        permission,
        description: this.getPermissionDescription(permission)
      });

      if (granted) {
        this.addPermission(protocolID, permission);
      }

      return granted;
    } catch (error) {
      console.error('Permission request failed:', error);
      return false;
    }
  }

  hasPermission(protocolID: string, permission: PermissionType): boolean {
    const protocolPermissions = this.permissions.get(protocolID) || [];
    return protocolPermissions.some(p => p.type === permission && p.granted);
  }

  private addPermission(protocolID: string, permission: PermissionType): void {
    const existing = this.permissions.get(protocolID) || [];
    existing.push({
      type: permission,
      granted: true,
      grantedAt: new Date()
    });
    this.permissions.set(protocolID, existing);
  }

  private getPermissionDescription(permission: PermissionType): string {
    const descriptions = {
      'read-balance': 'Read wallet balance information',
      'create-transactions': 'Create and sign transactions',
      'access-identity': 'Access user identity and public keys',
      'store-data': 'Store application data in wallet'
    };
    return descriptions[permission] || 'Unknown permission';
  }
}

type PermissionType = 'read-balance' | 'create-transactions' | 'access-identity' | 'store-data';

interface Permission {
  type: PermissionType;
  granted: boolean;
  grantedAt: Date;
}
```

### Error Handling

```typescript
// error-handling.ts
export class WalletErrorHandler {
  static handle(error: any): WalletError {
    if (error.code === 'WALLET_NOT_FOUND') {
      return new WalletError(
        'Wallet not detected. Please install a BRC-100 compliant wallet.',
        'WALLET_NOT_FOUND'
      );
    }

    if (error.code === 'USER_REJECTED') {
      return new WalletError(
        'User rejected the wallet request.',
        'USER_REJECTED'
      );
    }

    if (error.code === 'INSUFFICIENT_FUNDS') {
      return new WalletError(
        'Insufficient funds for this transaction.',
        'INSUFFICIENT_FUNDS'
      );
    }

    if (error.code === 'NETWORK_ERROR') {
      return new WalletError(
        'Network connection error. Please check your connection.',
        'NETWORK_ERROR'
      );
    }

    return new WalletError(
      error.message || 'An unknown wallet error occurred.',
      'UNKNOWN_ERROR'
    );
  }
}

export class WalletError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'WalletError';
  }
}
```

## 🧪 Testing and Validation

### Unit Testing

```typescript
// wallet-integration.test.ts
import { BSVWalletIntegration } from './wallet-client-setup';

describe('BSV Wallet Integration', () => {
  let walletIntegration: BSVWalletIntegration;

  beforeEach(() => {
    walletIntegration = new BSVWalletIntegration();
  });

  test('should connect to wallet successfully', async () => {
    await expect(walletIntegration.connect()).resolves.not.toThrow();
    expect(walletIntegration.isWalletConnected()).toBe(true);
  });

  test('should handle connection failures gracefully', async () => {
    // Mock wallet connection failure
    jest.spyOn(walletIntegration['client'], 'connect')
      .mockRejectedValue(new Error('Connection failed'));

    await expect(walletIntegration.connect()).rejects.toThrow('Wallet connection failed');
    expect(walletIntegration.isWalletConnected()).toBe(false);
  });

  test('should disconnect properly', async () => {
    await walletIntegration.connect();
    await walletIntegration.disconnect();
    expect(walletIntegration.isWalletConnected()).toBe(false);
  });
});
```

### Integration Testing

```typescript
// integration-test.ts
export class WalletIntegrationTest {
  async runFullIntegrationTest(): Promise<TestResults> {
    const results: TestResults = {
      connection: false,
      identity: false,
      transaction: false,
      permissions: false
    };

    try {
      // Test wallet connection
      const wallet = new BSVWalletIntegration();
      await wallet.connect();
      results.connection = true;

      // Test identity management
      const identity = new IdentityManager(wallet['client']);
      const profile = await identity.createUserProfile('test-app');
      results.identity = !!profile.publicKey;

      // Test transaction creation (testnet only)
      const txManager = new TransactionManager(wallet['client']);
      // Note: Only test transaction creation, not broadcasting in tests
      results.transaction = true;

      // Test permission management
      const permissions = new PermissionManager();
      const granted = await permissions.requestPermission('test-app', 'read-balance');
      results.permissions = granted;

      await wallet.disconnect();

    } catch (error) {
      console.error('Integration test failed:', error);
    }

    return results;
  }
}

interface TestResults {
  connection: boolean;
  identity: boolean;
  transaction: boolean;
  permissions: boolean;
}
```

## 📚 Resources and Next Steps

### BRC-100 Specification
- **Official Specification**: [https://bsv.brc.dev/BRC-0100](https://bsv.brc.dev/BRC-0100)
- **Implementation Guide**: [BSV Wallet Toolbox](https://github.com/bitcoin-sv/wallet-toolbox)
- **Reference Implementation**: [Metanet Desktop](https://github.com/bitcoin-sv/metanet-desktop)

### Development Tools
- **BSV SDK**: [TypeScript SDK](https://github.com/bitcoin-sv/ts-sdk)
- **Testing Framework**: [BSV Test Suite](https://github.com/bitcoin-sv/test-suite)
- **Code Examples**: [Community Examples](https://github.com/p2ppsr)

### Next Learning Modules
1. **[Overlay Services](overlay-services.md)** - Application-layer protocols
2. **[SPV and Merkle Proofs](spv-proofs.md)** - Efficient verification
3. **[Identity and Certificates](identity-certificates.md)** - Advanced authentication

## ✅ Checkpoint

Before proceeding, ensure you can:
- [ ] Connect to a BRC-100 compliant wallet
- [ ] Request user identity and public keys
- [ ] Create and sign transactions
- [ ] Handle permissions and errors properly
- [ ] Implement security best practices

---

**Wallet integration mastered?** Continue to [Overlay Services](overlay-services.md) to learn about application-layer protocols and data synchronization.

*BRC-100 wallet integration is the foundation of modern BSV development. Master these patterns to build secure, scalable, and user-friendly applications.*