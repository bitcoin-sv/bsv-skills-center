# Contract Examples

This module provides practical examples of smart contracts built with sCrypt, demonstrating common use cases and design patterns. Each example includes complete code, explanations, and integration patterns with TypeScript applications.

## 🎯 Learning Objectives

By the end of this module, you'll understand:
- How to implement token contracts and asset management
- Escrow and multi-signature patterns for secure transactions
- State machine implementations for complex logic
- Advanced contract patterns and best practices
- Integration with TypeScript applications

## 💰 Token Contracts and Asset Management

### Fungible Token Contract

This example implements a simple fungible token with transfer and balance tracking capabilities:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    ByteString,
    hash256,
    TxUtils
} from 'scrypt-ts'

export interface TokenState extends StructObject {
    owner: PubKey;
    balances: Map<PubKey, bigint>;
    totalSupply: bigint;
}

export class FungibleToken extends SmartContract<TokenState> {
    // Constructor
    constructor(owner: PubKey, initialSupply: bigint) {
        super(...arguments)
        this.state = {
            owner: owner,
            balances: new Map<PubKey, bigint>(),
            totalSupply: initialSupply
        }
        // Initialize owner's balance
        this.state.balances.set(owner, initialSupply)
    }
    
    // Transfer tokens
    @method()
    public transfer(sender: PubKey, recipient: PubKey, amount: bigint, sig: Sig) {
        // Verify sender's signature
        assert(this.checkSig(sig, sender), 'invalid signature')
        
        // Verify sender has sufficient balance
        const senderBalance = this.state.balances.get(sender) || 0n
        assert(senderBalance >= amount, 'insufficient balance')
        assert(amount > 0n, 'amount must be positive')
        
        // Update balances
        this.state.balances.set(sender, senderBalance - amount)
        
        const recipientBalance = this.state.balances.get(recipient) || 0n
        this.state.balances.set(recipient, recipientBalance + amount)
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount),
            FungibleToken.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // Mint new tokens (only owner)
    @method()
    public mint(recipient: PubKey, amount: bigint, sig: Sig) {
        // Verify owner's signature
        assert(this.checkSig(sig, this.state.owner), 'not authorized')
        assert(amount > 0n, 'amount must be positive')
        
        // Update balances and total supply
        const recipientBalance = this.state.balances.get(recipient) || 0n
        this.state.balances.set(recipient, recipientBalance + amount)
        this.state.totalSupply += amount
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount),
            FungibleToken.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // Burn tokens
    @method()
    public burn(sender: PubKey, amount: bigint, sig: Sig) {
        // Verify sender's signature
        assert(this.checkSig(sig, sender), 'invalid signature')
        
        // Verify sender has sufficient balance
        const senderBalance = this.state.balances.get(sender) || 0n
        assert(senderBalance >= amount, 'insufficient balance')
        assert(amount > 0n, 'amount must be positive')
        
        // Update balances and total supply
        this.state.balances.set(sender, senderBalance - amount)
        this.state.totalSupply -= amount
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount),
            FungibleToken.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
}
```

### Non-Fungible Token (NFT) Contract

This example implements a simple NFT contract with ownership tracking and transfer capabilities:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    ByteString,
    TxUtils
} from 'scrypt-ts'

// Token metadata
interface TokenMetadata {
    name: ByteString;
    description: ByteString;
    uri: ByteString;
}

export interface NFTState extends StructObject {
    owner: PubKey;
    tokenOwners: Map<bigint, PubKey>;
    tokenMetadata: Map<bigint, TokenMetadata>;
    totalTokens: bigint;
}

export class NFT extends SmartContract<NFTState> {
    // Constructor
    constructor(creator: PubKey) {
        super(...arguments)
        this.state = {
            owner: creator,
            tokenOwners: new Map<bigint, PubKey>(),
            tokenMetadata: new Map<bigint, TokenMetadata>(),
            totalTokens: 0n
        }
    }
    
    // Mint new NFT
    @method()
    public mint(recipient: PubKey, name: ByteString, description: ByteString, uri: ByteString, sig: Sig) {
        // Verify creator's signature
        assert(this.checkSig(sig, this.state.owner), 'not authorized')
        
        // Create new token
        const tokenId = this.state.totalTokens + 1n
        this.state.tokenOwners.set(tokenId, recipient)
        
        // Set metadata
        const metadata: TokenMetadata = {
            name: name,
            description: description,
            uri: uri
        }
        this.state.tokenMetadata.set(tokenId, metadata)
        
        // Update total tokens
        this.state.totalTokens += 1n
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount),
            NFT.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // Transfer NFT
    @method()
    public transfer(tokenId: bigint, sender: PubKey, recipient: PubKey, sig: Sig) {
        // Verify sender owns the token
        const currentOwner = this.state.tokenOwners.get(tokenId)
        assert(currentOwner === sender, 'sender does not own token')
        
        // Verify sender's signature
        assert(this.checkSig(sig, sender), 'invalid signature')
        
        // Transfer ownership
        this.state.tokenOwners.set(tokenId, recipient)
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount),
            NFT.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
}
```

### Integration with TypeScript

```typescript
import { FungibleToken } from './contracts/fungibleToken';
import { DefaultProvider, PubKey, bsv } from 'scrypt-ts';

async function deployAndUseToken() {
  // Compile the contract
  await FungibleToken.compile();
  
  // Create a key pair
  const privateKey = bsv.PrivateKey.fromRandom();
  const publicKey = privateKey.publicKey;
  const ownerPubKey = PubKey(publicKey.toString());
  
  // Create a new token with initial supply of 1,000,000
  const initialSupply = 1000000n;
  const token = new FungibleToken(ownerPubKey, initialSupply);
  
  // Connect to provider
  const provider = new DefaultProvider();
  await token.connect(provider);
  
  // Deploy the contract
  const deployTx = await token.deploy(1000);
  console.log(`Token deployed: ${deployTx.id}`);
  
  // Transfer tokens to another address
  const recipientPrivateKey = bsv.PrivateKey.fromRandom();
  const recipientPublicKey = recipientPrivateKey.publicKey;
  const recipientPubKey = PubKey(recipientPublicKey.toString());
  const amount = 1000n;
  
  // Create signature
  const sig = await token.getSignature(privateKey);
  
  // Transfer tokens
  const { tx: transferTx } = await token.methods.transfer(
    ownerPubKey,
    recipientPubKey,
    amount,
    sig
  );
  
  console.log(`Tokens transferred: ${transferTx.id}`);
  console.log(`Recipient balance: ${token.state.balances.get(recipientPubKey)}`);
  
  return token;
}
```

## 🔒 Escrow and Multi-Signature Patterns

### Simple Escrow Contract

This example implements a basic escrow contract for secure transactions between a buyer and seller:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    TxUtils
} from 'scrypt-ts'

export interface EscrowState extends StructObject {
    buyer: PubKey;
    seller: PubKey;
    arbiter: PubKey;
    amount: bigint;
    isReleased: boolean;
    isRefunded: boolean;
}

export class Escrow extends SmartContract<EscrowState> {
    // Constructor
    constructor(buyer: PubKey, seller: PubKey, arbiter: PubKey, amount: bigint) {
        super(...arguments)
        this.state = {
            buyer: buyer,
            seller: seller,
            arbiter: arbiter,
            amount: amount,
            isReleased: false,
            isRefunded: false
        }
    }
    
    // Release funds to seller
    @method()
    public release(sig: Sig) {
        // Verify signature is from buyer or arbiter
        assert(
            this.checkSig(sig, this.state.buyer) || 
            this.checkSig(sig, this.state.arbiter),
            'unauthorized'
        )
        
        // Verify funds haven't been released or refunded
        assert(!this.state.isReleased && !this.state.isRefunded, 'already settled')
        
        // Mark as released
        this.state.isReleased = true
        
        // Build output to seller
        const sellerOutput = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(this.state.seller),
            this.ctx.spentAmount
        )
        
        // Verify outputs
        assert(this.checkOutputs(sellerOutput), 'outputs mismatch')
    }
    
    // Refund to buyer
    @method()
    public refund(sig: Sig) {
        // Verify signature is from seller or arbiter
        assert(
            this.checkSig(sig, this.state.seller) || 
            this.checkSig(sig, this.state.arbiter),
            'unauthorized'
        )
        
        // Verify funds haven't been released or refunded
        assert(!this.state.isReleased && !this.state.isRefunded, 'already settled')
        
        // Mark as refunded
        this.state.isRefunded = true
        
        // Build output to buyer
        const buyerOutput = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(this.state.buyer),
            this.ctx.spentAmount
        )
        
        // Verify outputs
        assert(this.checkOutputs(buyerOutput), 'outputs mismatch')
    }
}
```

### Multi-Signature Wallet

This example implements a 2-of-3 multi-signature wallet:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    TxUtils
} from 'scrypt-ts'

export interface MultiSigWalletState extends StructObject {
    owner1: PubKey;
    owner2: PubKey;
    owner3: PubKey;
    requiredSignatures: bigint;
    balance: bigint;
}

export class MultiSigWallet extends SmartContract<MultiSigWalletState> {
    // Constructor
    constructor(owner1: PubKey, owner2: PubKey, owner3: PubKey) {
        super(...arguments)
        this.state = {
            owner1: owner1,
            owner2: owner2,
            owner3: owner3,
            requiredSignatures: 2n, // 2-of-3 multisig
            balance: 0n
        }
    }
    
    // Deposit funds
    @method()
    public deposit(amount: bigint) {
        // Update balance
        this.state.balance += amount
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount + amount),
            MultiSigWallet.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // Withdraw funds
    @method()
    public withdraw(recipient: PubKey, amount: bigint, sig1: Sig, signer1: PubKey, sig2: Sig, signer2: PubKey) {
        // Verify amount is valid
        assert(amount > 0n && amount <= this.state.balance, 'invalid amount')
        
        // Verify signatures are from valid owners
        let validSignatures = 0n
        
        if (signer1 === this.state.owner1 || signer1 === this.state.owner2 || signer1 === this.state.owner3) {
            assert(this.checkSig(sig1, signer1), 'invalid signature 1')
            validSignatures++
        }
        
        if (signer2 === this.state.owner1 || signer2 === this.state.owner2 || signer2 === this.state.owner3) {
            assert(this.checkSig(sig2, signer2), 'invalid signature 2')
            validSignatures++
        }
        
        // Ensure we have enough valid signatures
        assert(validSignatures >= this.state.requiredSignatures, 'not enough signatures')
        
        // Update balance
        this.state.balance -= amount
        
        // Build recipient output
        const recipientOutput = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(recipient),
            amount
        )
        
        // Build state output if balance remains
        let outputs = recipientOutput
        if (this.state.balance > 0n) {
            this.appendStateOutput(
                TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount - amount),
                MultiSigWallet.stateHash(this.state)
            )
            outputs += this.buildStateOutputs()
        }
        
        // Add change output
        outputs += this.buildChangeOutput()
        
        // Verify outputs
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
}
```

### Integration with TypeScript

```typescript
import { Escrow } from './contracts/escrow';
import { DefaultProvider, PubKey, bsv } from 'scrypt-ts';

async function createEscrow() {
  // Compile the contract
  await Escrow.compile();
  
  // Create key pairs
  const buyerPrivateKey = bsv.PrivateKey.fromRandom();
  const sellerPrivateKey = bsv.PrivateKey.fromRandom();
  const arbiterPrivateKey = bsv.PrivateKey.fromRandom();
  
  const buyerPubKey = PubKey(buyerPrivateKey.publicKey.toString());
  const sellerPubKey = PubKey(sellerPrivateKey.publicKey.toString());
  const arbiterPubKey = PubKey(arbiterPrivateKey.publicKey.toString());
  
  // Create escrow with 0.1 BSV
  const escrowAmount = 10000000n; // 0.1 BSV in satoshis
  const escrow = new Escrow(buyerPubKey, sellerPubKey, arbiterPubKey, escrowAmount);
  
  // Connect to provider
  const provider = new DefaultProvider();
  await escrow.connect(provider);
  
  // Deploy the contract with funds
  const deployTx = await escrow.deploy(Number(escrowAmount));
  console.log(`Escrow deployed: ${deployTx.id}`);
  
  // Later, release funds to seller (signed by buyer)
  const buyerSig = await escrow.getSignature(buyerPrivateKey);
  
  const { tx: releaseTx } = await escrow.methods.release(buyerSig);
  
  console.log(`Funds released to seller: ${releaseTx.id}`);
  
  return escrow;
}
```

## ⚙️ State Machine Implementations

### Auction Contract

This example implements an auction as a state machine:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    ByteString,
    TxUtils
} from 'scrypt-ts'

// State enum
enum State {
    CREATED,
    ACTIVE,
    ENDED,
    CLAIMED
}

export interface AuctionState extends StructObject {
    seller: PubKey;
    itemDescription: ByteString;
    startingPrice: bigint;
    endTime: bigint;
    currentState: State;
    highestBidder: PubKey;
    highestBid: bigint;
}

export class Auction extends SmartContract<AuctionState> {
    // Constructor
    constructor(
        seller: PubKey,
        description: ByteString,
        startPrice: bigint,
        duration: bigint
    ) {
        super(...arguments)
        this.state = {
            seller: seller,
            itemDescription: description,
            startingPrice: startPrice,
            endTime: BigInt(Math.floor(Date.now() / 1000)) + duration,
            currentState: State.CREATED,
            highestBidder: seller, // Default to seller
            highestBid: 0n
        }
    }
    
    // Start the auction
    @method()
    public start(sig: Sig) {
        // Verify seller's signature
        assert(this.checkSig(sig, this.state.seller), 'not authorized')
        
        // Verify auction is in CREATED state
        assert(this.state.currentState === State.CREATED, 'invalid state')
        
        // Transition to ACTIVE state
        this.state.currentState = State.ACTIVE
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.ctx.spentAmount),
            Auction.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // Place a bid
    @method()
    public bid(bidder: PubKey, bidAmount: bigint) {
        // Verify auction is active
        assert(this.state.currentState === State.ACTIVE, 'auction not active')
        
        // Verify auction hasn't ended
        const currentTime = BigInt(Math.floor(Date.now() / 1000))
        assert(currentTime < this.state.endTime, 'auction ended')
        
        // Verify bid is higher than current highest bid
        assert(bidAmount > this.state.highestBid, 'bid too low')
        
        // Update highest bid information
        this.state.highestBidder = bidder
        this.state.highestBid = bidAmount
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, bidAmount),
            Auction.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // End the auction
    @method()
    public end() {
        // Verify auction is active
        assert(this.state.currentState === State.ACTIVE, 'auction not active')
        
        // Verify auction time has passed
        const currentTime = BigInt(Math.floor(Date.now() / 1000))
        assert(currentTime >= this.state.endTime, 'auction not ended')
        
        // Transition to ENDED state
        this.state.currentState = State.ENDED
        
        // Save state
        this.appendStateOutput(
            TxUtils.buildOutput(this.ctx.spentScript, this.state.highestBid),
            Auction.stateHash(this.state)
        )
        
        // Verify outputs
        const outputs = this.buildStateOutputs() + this.buildChangeOutput()
        assert(this.checkOutputs(outputs), 'outputs mismatch')
    }
    
    // Claim auction proceeds
    @method()
    public claim(sig: Sig) {
        // Verify seller's signature
        assert(this.checkSig(sig, this.state.seller), 'not authorized')
        
        // Verify auction has ended
        assert(this.state.currentState === State.ENDED, 'auction not ended')
        
        // Transition to CLAIMED state
        this.state.currentState = State.CLAIMED
        
        // Build output to seller
        const sellerOutput = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(this.state.seller),
            this.state.highestBid
        )
        
        // Verify outputs
        assert(this.checkOutputs(sellerOutput), 'outputs mismatch')
    }
}
```

## 🧩 Advanced Contract Patterns

### Oracle Integration

This example demonstrates how to integrate with an external data oracle using the script context:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    ByteString,
    TxUtils
} from 'scrypt-ts'

export interface WeatherBetState extends StructObject {
    bettor: PubKey;
    counterParty: PubKey;
    oracle: PubKey;
    location: ByteString;
    temperature: bigint;
    betAmount: bigint;
    isSettled: boolean;
}

export class WeatherBet extends SmartContract<WeatherBetState> {
    // Constructor
    constructor(
        bettor: PubKey,
        counterParty: PubKey,
        oracle: PubKey,
        location: ByteString,
        temperature: bigint,
        amount: bigint
    ) {
        super(...arguments)
        this.state = {
            bettor: bettor,
            counterParty: counterParty,
            oracle: oracle,
            location: location,
            temperature: temperature,
            betAmount: amount,
            isSettled: false
        }
    }
    
    // Settle bet based on oracle data
    @method()
    public settle(actualTemperature: bigint, oracleSig: Sig) {
        // Verify oracle signature
        assert(this.checkSig(oracleSig, this.state.oracle), 'invalid oracle signature')
        
        // Verify bet hasn't been settled
        assert(!this.state.isSettled, 'already settled')
        
        // Mark as settled
        this.state.isSettled = true
        
        // Determine winner
        let winner: PubKey
        if (actualTemperature >= this.state.temperature) {
            winner = this.state.bettor
        } else {
            winner = this.state.counterParty
        }
        
        // Build output to winner
        const winnerOutput = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(winner),
            this.ctx.spentAmount
        )
        
        // Verify outputs
        assert(this.checkOutputs(winnerOutput), 'outputs mismatch')
    }
}
```

### Atomic Swap Contract

This example implements an atomic swap between two different assets, using the script context to verify transaction outputs:

```typescript
import {
    method,
    prop,
    SmartContract,
    assert,
    PubKey,
    Sig,
    ByteString,
    sha256,
    TxUtils
} from 'scrypt-ts'

export interface AtomicSwapState extends StructObject {
    party1: PubKey;
    party2: PubKey;
    asset1Id: ByteString;
    asset2Id: ByteString;
    amount1: bigint;
    amount2: bigint;
    secretHash: ByteString;
    timelock: bigint;
    isCompleted: boolean;
}

export class AtomicSwap extends SmartContract<AtomicSwapState> {
    // Constructor
    constructor(
        party1: PubKey,
        party2: PubKey,
        asset1: ByteString,
        asset2: ByteString,
        amount1: bigint,
        amount2: bigint,
        hashOfSecret: ByteString,
        lockTime: bigint
    ) {
        super(...arguments)
        this.state = {
            party1: party1,
            party2: party2,
            asset1Id: asset1,
            asset2Id: asset2,
            amount1: amount1,
            amount2: amount2,
            secretHash: hashOfSecret,
            timelock: lockTime,
            isCompleted: false
        }
    }
    
    // Complete swap by revealing secret
    @method()
    public complete(secret: ByteString) {
        // Verify secret matches hash
        assert(sha256(secret) === this.state.secretHash, 'invalid secret')
        
        // Verify swap hasn't been completed
        assert(!this.state.isCompleted, 'already completed')
        
        // Mark as completed
        this.state.isCompleted = true
        
        // Build outputs for both parties
        const party1Output = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(this.state.party1),
            this.state.amount2
        )
        
        const party2Output = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(this.state.party2),
            this.state.amount1
        )
        
        // Verify outputs
        assert(this.checkOutputs(party1Output + party2Output), 'outputs mismatch')
    }
    
    // Refund after timelock expires
    @method()
    public refund(sig: Sig) {
        // Verify party1's signature
        assert(this.checkSig(sig, this.state.party1), 'not authorized')
        
        // Verify timelock has expired
        const currentTime = BigInt(Math.floor(Date.now() / 1000))
        assert(currentTime >= this.state.timelock, 'timelock not expired')
        
        // Verify swap hasn't been completed
        assert(!this.state.isCompleted, 'already completed')
        
        // Mark as completed (to prevent further refunds)
        this.state.isCompleted = true
        
        // Build refund output to party1
        const party1Output = TxUtils.buildP2PKHOutput(
            TxUtils.pubKeyToPKH(this.state.party1),
            this.state.amount1
        )
        
        // Verify outputs
        assert(this.checkOutputs(party1Output), 'outputs mismatch')
    }
}
```

## 🔗 Next Steps

Now that you understand various contract examples, you're ready to explore:

- [Advanced Topics](../03-advanced-topics/README.md) - Learn about SPV proofs, identity, and scaling patterns
- [Example Projects](../04-examples/README.md) - See complete project implementations
- [BSV Ecosystem Components](../../BSV_ECOSYSTEM_COMPONENTS.md) - Understand how contracts fit into the broader ecosystem

---

**Next:** [Advanced Topics](../03-advanced-topics/README.md)