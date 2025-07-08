# sCrypt Fundamentals

sCrypt is an embedded domain-specific language (DSL) for Bitcoin SV that enables developers to write smart contracts using TypeScript. Unlike standalone languages, sCrypt leverages TypeScript's syntax and tooling while providing specialized decorators, properties, and methods for creating contracts that compile to Bitcoin Script.

## 🎯 Learning Objectives

By the end of this module, you'll understand:
- How sCrypt works as an embedded TypeScript DSL
- The role of decorators, properties, and methods in sCrypt contracts
- Script context handling and execution model
- Stateful contract patterns and implementation
- Development workflow and integration with the BSV ecosystem

## 🧩 sCrypt Language Overview

sCrypt is designed to make Bitcoin smart contract development accessible to developers familiar with TypeScript. It compiles to Bitcoin Script, the native scripting language of the Bitcoin protocol, while providing a much more developer-friendly experience.

### Key Features

- **Embedded TypeScript DSL** - Uses TypeScript syntax with specialized decorators
- **Contract-oriented** - Designed specifically for Bitcoin smart contracts
- **Stateful contracts** - Supports maintaining and updating contract state
- **Script context handling** - Manages the complexities of Bitcoin Script execution
- **Comprehensive tooling** - Leverages TypeScript's development environment

### Language Structure

```mermaid
graph TD
    A[sCrypt Contract] --> B[State Properties]
    A --> C[Constructor]
    A --> D[Public Methods]
    A --> E[Private Methods]
    
    B --> B1[@prop Decorator]
    B --> B2[State Variables]
    
    C --> C1[Initialization Logic]
    
    D --> D1[@method Decorator]
    D --> D2[SigHash Types]
    D --> D3[State Transitions]
    
    E --> E1[Helper Functions]
    E --> E2[Internal Logic]
```

## 📦 Setting Up the Development Environment

### Installation

```bash
# Create a new sCrypt project
npx scrypt-cli create my-first-contract

# Navigate to project directory
cd my-first-contract

# Install dependencies
npm install
```

### Project Structure

A typical sCrypt project structure:

```
my-first-contract/
├── src/
│   ├── contracts/
│   │   └── counter.ts
│   └── app.ts
├── tests/
│   └── counter.test.ts
├── artifacts/
├── tsconfig.json
├── package.json
└── README.md
```

### Development Tools

- **VS Code Extensions**: sCrypt extension for syntax highlighting and code completion
- **scrypt-cli**: Command-line tools for project scaffolding and management
- **scrypt-ts**: The core library for sCrypt contract development

## 🧪 sCrypt as an Embedded DSL

sCrypt is not a standalone language but an embedded DSL within TypeScript. This means you write TypeScript code with special annotations and patterns that the sCrypt compiler understands.

### Contract Class Structure

```typescript
// Import from scrypt-ts, not a separate language
import {
    method,
    prop,
    SmartContract,
    assert,
    SigHash,
    hash256,
    PubKey,
    Sig
} from 'scrypt-ts'

// Extend SmartContract base class
export class Counter extends SmartContract {
    // State properties with @prop decorator
    @prop()
    count: bigint

    // Read-only properties
    @prop()
    readonly owner: PubKey

    // Constructor initializes state
    constructor(count: bigint, owner: PubKey) {
        super(...arguments)
        this.count = count
        this.owner = owner
    }

    // Public method with @method decorator and SigHash type
    @method(SigHash.SINGLE)
    public increment(sig: Sig) {
        // Verify signature
        assert(this.checkSig(sig, this.owner), 'signature check failed')
        
        // Update state
        this.count++
    }
}
```

### Key Decorators and Their Purpose

sCrypt uses TypeScript decorators to annotate classes, properties, and methods:

| Decorator | Purpose | Example |
|-----------|---------|---------|
| `@prop()` | Marks a property as part of contract state | `@prop() count: bigint` |
| `@method()` | Marks a method as callable from outside | `@method() public increment()` |
| `@SmartContract` | Base class for all contracts | `class Counter extends SmartContract` |

## 🔄 Script Context and Execution Model

One of the most important concepts in sCrypt is understanding how it handles script context and the Bitcoin Script execution model.

### Script Context

In Bitcoin, scripts execute in a stack-based environment. sCrypt abstracts this complexity but developers need to understand:

```typescript
// Script context example
@method()
public checkMultiSig(signatures: Sig[], publicKeys: PubKey[]) {
    // This is automatically translated to Bitcoin Script's OP_CHECKMULTISIG
    // with proper handling of the stack
    return this.checkMultiSigInternal(signatures, publicKeys);
}

// Internal helper that handles the actual script context
private checkMultiSigInternal(signatures: Sig[], publicKeys: PubKey[]): boolean {
    // Implementation details handled by sCrypt
    // ...
}
```

### Execution Flow

When a contract method is called:

1. The transaction is constructed with inputs and outputs
2. The method's script is generated and included in the transaction
3. When the transaction is validated, the script executes
4. If all assertions pass, the transaction is valid

```typescript
// Execution flow example
@method()
public purchase(sig: Sig, buyer: PubKey) {
    // 1. Verify signature
    assert(this.checkSig(sig, buyer), 'invalid signature')
    
    // 2. Check conditions
    assert(this.ctx.utxo.value >= this.price, 'insufficient payment')
    
    // 3. If all assertions pass, the transaction is valid
    // and the state transition occurs
}
```

## 🧠 Stateful Contracts

One of sCrypt's most powerful features is its support for stateful contracts, which allow the contract's state to persist and change across multiple transactions.

### State Properties

State properties are marked with the `@prop()` decorator:

```typescript
export class Token extends SmartContract {
    // State properties
    @prop()
    supply: bigint
    
    @prop()
    balances: Map<PubKey, bigint>
    
    // Constructor initializes state
    constructor(initialSupply: bigint, issuer: PubKey) {
        super(...arguments)
        this.supply = initialSupply
        this.balances = new Map<PubKey, bigint>()
        this.balances.set(issuer, initialSupply)
    }
}
```

### State Transitions

State transitions occur when a contract method is called and the transaction is validated:

```typescript
@method()
public transfer(sender: PubKey, recipient: PubKey, amount: bigint, sig: Sig) {
    // Verify sender's signature
    assert(this.checkSig(sig, sender), 'invalid signature')
    
    // Check sender has sufficient balance
    const senderBalance = this.balances.get(sender) || 0n
    assert(senderBalance >= amount, 'insufficient balance')
    
    // Update balances
    this.balances.set(sender, senderBalance - amount)
    
    const recipientBalance = this.balances.get(recipient) || 0n
    this.balances.set(recipient, recipientBalance + amount)
    
    // The updated state is preserved in the new UTXO
}
```

### Handling State Persistence

sCrypt handles state persistence by:

1. Serializing the contract state into the transaction output
2. When the output is spent, the state is deserialized
3. After method execution, the new state is serialized into a new output

```typescript
// This happens automatically when you deploy or call a contract
const token = new Token(1000n, myPubKey)

// Deploy creates a transaction with the serialized state
const deployTx = await token.deploy()

// Call a method, which creates a new transaction with updated state
const transferTx = await token.methods.transfer(
    myPubKey,
    recipientPubKey,
    100n,
    mySig
)
```

## 🔄 For Loops and Control Flow

sCrypt has special handling for loops and control flow due to Bitcoin Script's limitations.

### For Loop Handling

For loops in sCrypt are unrolled at compile time, which means:
- Loop bounds must be known at compile time
- Loops cannot have dynamic iteration counts

```typescript
// Correct: Fixed iteration count
@method()
public sumArray(arr: bigint[]) {
    let sum = 0n
    
    // This works because the array length is known at compile time
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    
    return sum
}

// Incorrect: Dynamic iteration count
@method()
public badLoop(n: bigint) {
    let sum = 0n
    
    // This will fail because n is not known at compile time
    for (let i = 0; i < n; i++) {
        sum += i
    }
    
    return sum
}
```

### Loop Alternatives

When dynamic iteration is needed, use recursive patterns or other techniques:

```typescript
// Using array methods instead of loops
@method()
public sumArrayAlternative(arr: bigint[]) {
    // Using reduce (which is handled specially by sCrypt)
    return arr.reduce((sum, val) => sum + val, 0n)
}
```

## 📝 Integration with TypeScript Applications

### Contract Instantiation and Deployment

```typescript
import { Counter } from './contracts/counter'
import { DefaultProvider, PubKey, bsv } from 'scrypt-ts'

async function deployCounter() {
    // Connect to a BSV provider
    const provider = new DefaultProvider()
    
    // Compile the contract
    await Counter.compile()
    
    // Create a key pair
    const privateKey = bsv.PrivateKey.fromRandom()
    const publicKey = privateKey.publicKey
    
    // Create a new counter instance
    const counter = new Counter(
        0n, // Initial count
        PubKey(publicKey.toString())
    )
    
    // Connect to signer
    await counter.connect(provider)
    
    // Deploy the contract
    const deployTx = await counter.deploy(1000)
    console.log(`Counter deployed: ${deployTx.id}`)
    
    return counter
}
```

### Calling Contract Methods

```typescript
async function incrementCounter(counter: Counter, privateKey: bsv.PrivateKey) {
    // Create a signature for the method call
    const sig = await counter.getSignature(privateKey)
    
    // Call the increment method
    const { tx } = await counter.methods.increment(sig)
    
    console.log(`Counter incremented: ${tx.id}`)
    console.log(`New count: ${counter.count}`)
    
    return counter
}
```

### Watching Contract State

```typescript
async function watchCounter(counter: Counter) {
    // Watch for contract state changes
    counter.watch((newState: Counter) => {
        console.log(`Counter updated: ${newState.count}`)
    })
}
```

## 🔒 Security Considerations

### Script Size Limitations

Bitcoin has limitations on script size, which affects sCrypt contracts:

```typescript
// Keep methods small and focused
@method()
public smallMethod() {
    // Simple logic that compiles to a small script
}

// Break complex logic into multiple methods
@method()
public complexOperation() {
    // Call multiple smaller methods instead of one large method
    const result1 = this.smallerOperation1()
    const result2 = this.smallerOperation2()
    return this.combineResults(result1, result2)
}
```

### Gas Optimization

Although BSV doesn't have "gas" like Ethereum, there are still fee considerations:

```typescript
// Optimize for script size and execution efficiency
@method()
public optimizedMethod() {
    // Use bitwise operations where possible
    const result = (this.value & 0xFFn) | (this.otherValue << 8n)
    
    // Avoid unnecessary computations
    return result
}
```

### Security Best Practices

```typescript
// Always verify signatures
@method()
public secureMethod(sig: Sig, pubKey: PubKey) {
    // Verify signature before any state changes
    assert(this.checkSig(sig, pubKey), 'invalid signature')
    
    // Proceed with method logic
}

// Use explicit type checking
@method()
public typeCheckedMethod(value: bigint) {
    // Ensure value is within expected range
    assert(value > 0n && value < 1000n, 'value out of range')
    
    // Proceed with method logic
}
```

## 🚀 Development Workflow

### 1. Define Contract

```typescript
// src/contracts/token.ts
import { method, prop, SmartContract, assert, PubKey, Sig } from 'scrypt-ts'

export class Token extends SmartContract {
    @prop()
    supply: bigint
    
    @prop()
    owner: PubKey
    
    constructor(supply: bigint, owner: PubKey) {
        super(...arguments)
        this.supply = supply
        this.owner = owner
    }
    
    @method()
    public mint(amount: bigint, sig: Sig) {
        assert(this.checkSig(sig, this.owner), 'invalid signature')
        this.supply += amount
    }
}
```

### 2. Write Tests

```typescript
// tests/token.test.ts
import { expect } from 'chai'
import { Token } from '../src/contracts/token'
import { PubKey, bsv, DefaultProvider, findSig } from 'scrypt-ts'

describe('Token', () => {
    let token: Token
    let privateKey: bsv.PrivateKey
    
    before(async () => {
        await Token.compile()
        privateKey = bsv.PrivateKey.fromRandom()
        const publicKey = privateKey.publicKey
        
        token = new Token(
            1000n,
            PubKey(publicKey.toString())
        )
        
        const provider = new DefaultProvider()
        await token.connect(provider)
    })
    
    it('should mint new tokens', async () => {
        const oldSupply = token.supply
        const mintAmount = 500n
        
        // Call the mint method
        const { tx } = await token.methods.mint(
            mintAmount,
            (sigResponses) => findSig(sigResponses, privateKey.publicKey)
        )
        
        // Verify the transaction was accepted
        expect(tx.id).to.be.a('string')
        
        // Verify the state was updated
        expect(token.supply).to.equal(oldSupply + mintAmount)
    })
})
```

### 3. Deploy and Interact

```typescript
// src/app.ts
import { Token } from './contracts/token'
import { PubKey, bsv, DefaultProvider } from 'scrypt-ts'

async function main() {
    // Compile the contract
    await Token.compile()
    
    // Create a key pair
    const privateKey = bsv.PrivateKey.fromRandom()
    const publicKey = privateKey.publicKey
    
    // Create a new token instance
    const token = new Token(
        1000n,
        PubKey(publicKey.toString())
    )
    
    // Connect to a provider
    const provider = new DefaultProvider()
    await token.connect(provider)
    
    // Deploy the contract
    const deployTx = await token.deploy(1000)
    console.log(`Token deployed: ${deployTx.id}`)
    
    // Mint new tokens
    const { tx } = await token.methods.mint(
        500n,
        (sigResponses) => findSig(sigResponses, privateKey.publicKey)
    )
    
    console.log(`Tokens minted: ${tx.id}`)
    console.log(`New supply: ${token.supply}`)
}

main().catch(console.error)
```

## 🔗 Next Steps

Now that you understand sCrypt fundamentals, you're ready to explore:

- [Contract Examples](contract-examples.md) - Learn from practical contract implementations
- [Advanced sCrypt Patterns](../03-advanced-topics/advanced-scrypt.md) - Discover advanced techniques
- [BSV Ecosystem Components](../../BSV_ECOSYSTEM_COMPONENTS.md) - Understand how sCrypt fits into the broader ecosystem

---

**Next:** [Contract Examples](contract-examples.md)