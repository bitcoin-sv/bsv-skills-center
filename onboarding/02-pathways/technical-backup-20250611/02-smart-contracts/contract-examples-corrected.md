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
  ByteString,
  Sig,
  PubKey,
  hash160,
  ScriptContext,
  Utils,
  toByteString,
} from 'scrypt-ts';

export class FungibleToken extends SmartContract {
  // State properties
  @prop()
  readonly owner: PubKey;
  
  @prop(true)
  balances: Map<ByteString, bigint>;
  
  @prop(true)
  totalSupply: bigint;
  
  // Constructor
  constructor(ownerPubKey: PubKey, initialSupply: bigint) {
    super(...arguments);
    this.owner = ownerPubKey;
    
    // Initialize balances map
    this.balances = new Map<ByteString, bigint>();
    
    // Set initial balance for owner
    const ownerPKH = hash160(ownerPubKey);
    this.balances.set(ownerPKH, initialSupply);
    
    this.totalSupply = initialSupply;
  }
  
  // Transfer tokens
  @method()
  public transfer(
    sender: PubKey,
    recipient: PubKey,
    amount: bigint,
    sig: Sig,
    ctx: ScriptContext
  ) {
    // Verify sender's signature
    assert(this.checkSig(sig, sender), 'Invalid signature');
    
    // Get public key hashes
    const senderPKH = hash160(sender);
    const recipientPKH = hash160(recipient);
    
    // Get sender's current balance
    const senderBalance = this.balances.get(senderPKH) || 0n;
    
    // Verify sender has sufficient balance
    assert(senderBalance >= amount, 'Insufficient balance');
    assert(amount > 0n, 'Amount must be positive');
    
    // Update balances
    this.balances.set(senderPKH, senderBalance - amount);
    
    // Get recipient's current balance
    const recipientBalance = this.balances.get(recipientPKH) || 0n;
    this.balances.set(recipientPKH, recipientBalance + amount);
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
    
    // Verify amount is preserved
    assert(output.value === ctx.utxo.value, 'Amount not preserved');
  }
  
  // Mint new tokens (only owner)
  @method()
  public mint(
    recipient: PubKey,
    amount: bigint,
    sig: Sig,
    ctx: ScriptContext
  ) {
    // Verify owner's signature
    assert(this.checkSig(sig, this.owner), 'Not authorized');
    assert(amount > 0n, 'Amount must be positive');
    
    // Get recipient's public key hash
    const recipientPKH = hash160(recipient);
    
    // Get recipient's current balance
    const recipientBalance = this.balances.get(recipientPKH) || 0n;
    
    // Update balances and total supply
    this.balances.set(recipientPKH, recipientBalance + amount);
    this.totalSupply += amount;
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
    
    // Verify amount is preserved
    assert(output.value === ctx.utxo.value, 'Amount not preserved');
  }
  
  // Burn tokens
  @method()
  public burn(
    sender: PubKey,
    amount: bigint,
    sig: Sig,
    ctx: ScriptContext
  ) {
    // Verify sender's signature
    assert(this.checkSig(sig, sender), 'Invalid signature');
    
    // Get sender's public key hash
    const senderPKH = hash160(sender);
    
    // Get sender's current balance
    const senderBalance = this.balances.get(senderPKH) || 0n;
    
    // Verify sender has sufficient balance
    assert(senderBalance >= amount, 'Insufficient balance');
    assert(amount > 0n, 'Amount must be positive');
    
    // Update balances and total supply
    this.balances.set(senderPKH, senderBalance - amount);
    this.totalSupply -= amount;
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
    
    // Verify amount is preserved
    assert(output.value === ctx.utxo.value, 'Amount not preserved');
  }
  
  // Get balance (view method)
  @method()
  public getBalance(address: PubKey): bigint {
    const addressPKH = hash160(address);
    return this.balances.get(addressPKH) || 0n;
  }
  
  // Get total supply (view method)
  @method()
  public getTotalSupply(): bigint {
    return this.totalSupply;
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
  ByteString,
  Sig,
  PubKey,
  hash160,
  ScriptContext,
  Utils,
  toByteString,
} from 'scrypt-ts';

// Token metadata interface
interface TokenMetadata {
  name: ByteString;
  description: ByteString;
  uri: ByteString;
}

export class NFT extends SmartContract {
  // State properties
  @prop()
  readonly owner: PubKey;
  
  @prop(true)
  tokenOwners: Map<bigint, ByteString>;
  
  @prop(true)
  totalTokens: bigint;
  
  @prop(true)
  tokenMetadata: Map<bigint, TokenMetadata>;
  
  // Constructor
  constructor(creatorPubKey: PubKey) {
    super(...arguments);
    this.owner = creatorPubKey;
    this.tokenOwners = new Map<bigint, ByteString>();
    this.tokenMetadata = new Map<bigint, TokenMetadata>();
    this.totalTokens = 0n;
  }
  
  // Mint new NFT
  @method()
  public mint(
    recipient: PubKey,
    name: ByteString,
    description: ByteString,
    uri: ByteString,
    sig: Sig,
    ctx: ScriptContext
  ) {
    // Verify creator's signature
    assert(this.checkSig(sig, this.owner), 'Not authorized');
    
    // Create new token
    const tokenId = this.totalTokens + 1n;
    const recipientPKH = hash160(recipient);
    this.tokenOwners.set(tokenId, recipientPKH);
    
    // Set metadata
    const metadata: TokenMetadata = {
      name,
      description,
      uri
    };
    this.tokenMetadata.set(tokenId, metadata);
    
    // Update total tokens
    this.totalTokens += 1n;
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
    
    // Verify amount is preserved
    assert(output.value === ctx.utxo.value, 'Amount not preserved');
  }
  
  // Transfer NFT
  @method()
  public transfer(
    tokenId: bigint,
    sender: PubKey,
    recipient: PubKey,
    sig: Sig,
    ctx: ScriptContext
  ) {
    // Get sender's public key hash
    const senderPKH = hash160(sender);
    
    // Verify sender owns the token
    assert(this.tokenOwners.get(tokenId) === senderPKH, 'Not the token owner');
    
    // Verify sender's signature
    assert(this.checkSig(sig, sender), 'Invalid signature');
    
    // Transfer ownership
    const recipientPKH = hash160(recipient);
    this.tokenOwners.set(tokenId, recipientPKH);
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
    
    // Verify amount is preserved
    assert(output.value === ctx.utxo.value, 'Amount not preserved');
  }
  
  // Get token owner (view method)
  @method()
  public getTokenOwner(tokenId: bigint): ByteString {
    assert(tokenId > 0n && tokenId <= this.totalTokens, 'Invalid token ID');
    return this.tokenOwners.get(tokenId) as ByteString;
  }
  
  // Get token metadata (view method)
  @method()
  public getTokenMetadata(tokenId: bigint): TokenMetadata {
    assert(tokenId > 0n && tokenId <= this.totalTokens, 'Invalid token ID');
    return this.tokenMetadata.get(tokenId) as TokenMetadata;
  }
}
```

### Integration with TypeScript

```typescript
import { FungibleToken } from './contracts/FungibleToken';
import { 
  findSig, 
  PubKey, 
  bsv, 
  toByteString,
  MethodCallOptions
} from 'scrypt-ts';

async function deployAndUseToken() {
  // Load the contract artifact
  await FungibleToken.loadArtifact();
  
  // Get signer
  const privateKey = bsv.PrivateKey.fromWIF('...');
  const signer = new bsv.KeyPair(privateKey);
  const ownerPubKey = PubKey(signer.publicKey.toString());
  
  // Create a new token with initial supply of 1,000,000
  const initialSupply = 1000000n;
  const token = new FungibleToken(ownerPubKey, initialSupply);
  
  // Connect to signer
  await token.connect(signer);
  
  // Deploy the contract
  const deployTx = await token.deploy(1000n); // 1000 satoshis
  console.log(`Token deployed: ${deployTx.id}`);
  
  // Transfer tokens to another address
  const recipientPrivateKey = bsv.PrivateKey.fromWIF('...');
  const recipientSigner = new bsv.KeyPair(recipientPrivateKey);
  const recipientPubKey = PubKey(recipientSigner.publicKey.toString());
  const amount = 1000n;
  
  // Call options
  const options: MethodCallOptions<FungibleToken> = {
    changeAddress: privateKey.toAddress().toString()
  };
  
  // Call the transfer method
  const transferTx = await token.methods.transfer(
    ownerPubKey,
    recipientPubKey,
    amount,
    (sigResps) => findSig(sigResps, signer.publicKey),
    options
  );
  
  console.log(`Tokens transferred: ${transferTx.id}`);
  
  // Get recipient balance
  const balance = await token.methods.getBalance(recipientPubKey);
  console.log(`Recipient balance: ${balance}`);
  
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
  ByteString,
  Sig,
  PubKey,
  hash160,
  ScriptContext,
  Utils,
} from 'scrypt-ts';

export class Escrow extends SmartContract {
  // State properties
  @prop()
  readonly buyer: PubKey;
  
  @prop()
  readonly seller: PubKey;
  
  @prop()
  readonly arbiter: PubKey;
  
  @prop()
  readonly amount: bigint;
  
  @prop(true)
  isReleased: boolean;
  
  @prop(true)
  isRefunded: boolean;
  
  // Constructor
  constructor(buyerPubKey: PubKey, sellerPubKey: PubKey, arbiterPubKey: PubKey, escrowAmount: bigint) {
    super(...arguments);
    this.buyer = buyerPubKey;
    this.seller = sellerPubKey;
    this.arbiter = arbiterPubKey;
    this.amount = escrowAmount;
    this.isReleased = false;
    this.isRefunded = false;
  }
  
  // Release funds to seller
  @method()
  public release(sig: Sig, ctx: ScriptContext) {
    // Verify signature is from buyer or arbiter
    const isBuyerSig = this.checkSig(sig, this.buyer);
    const isArbiterSig = this.checkSig(sig, this.arbiter);
    assert(isBuyerSig || isArbiterSig, 'Unauthorized');
    
    // Verify funds haven't been released or refunded
    assert(!this.isReleased && !this.isRefunded, 'Already settled');
    
    // Mark as released
    this.isReleased = true;
    
    // Ensure proper payment to seller
    const output = ctx.tx.outputs[0];
    const sellerPKH = hash160(this.seller);
    const sellerScript = Utils.buildPublicKeyHashScript(sellerPKH);
    
    // Verify output pays to seller
    assert(output.script === sellerScript, 'Output not to seller');
    
    // Verify amount
    assert(output.value === this.amount, 'Incorrect amount');
  }
  
  // Refund to buyer
  @method()
  public refund(sig: Sig, ctx: ScriptContext) {
    // Verify signature is from seller or arbiter
    const isSellerSig = this.checkSig(sig, this.seller);
    const isArbiterSig = this.checkSig(sig, this.arbiter);
    assert(isSellerSig || isArbiterSig, 'Unauthorized');
    
    // Verify funds haven't been released or refunded
    assert(!this.isReleased && !this.isRefunded, 'Already settled');
    
    // Mark as refunded
    this.isRefunded = true;
    
    // Ensure proper payment to buyer
    const output = ctx.tx.outputs[0];
    const buyerPKH = hash160(this.buyer);
    const buyerScript = Utils.buildPublicKeyHashScript(buyerPKH);
    
    // Verify output pays to buyer
    assert(output.script === buyerScript, 'Output not to buyer');
    
    // Verify amount
    assert(output.value === this.amount, 'Incorrect amount');
  }
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
  ByteString,
  Sig,
  PubKey,
  hash160,
  ScriptContext,
  Utils,
  toByteString,
} from 'scrypt-ts';

// State enum
enum AuctionState {
  CREATED,
  ACTIVE,
  ENDED,
  CLAIMED
}

export class Auction extends SmartContract {
  // State properties
  @prop()
  readonly seller: PubKey;
  
  @prop()
  readonly itemDescription: ByteString;
  
  @prop()
  readonly startingPrice: bigint;
  
  @prop()
  readonly endTime: bigint;
  
  @prop(true)
  currentState: AuctionState;
  
  // Bidding information
  @prop(true)
  highestBidder: PubKey;
  
  @prop(true)
  highestBid: bigint;
  
  // Constructor
  constructor(sellerPubKey: PubKey, description: ByteString, startPrice: bigint, duration: bigint) {
    super(...arguments);
    this.seller = sellerPubKey;
    this.itemDescription = description;
    this.startingPrice = startPrice;
    this.endTime = BigInt(Math.floor(Date.now() / 1000)) + duration;
    this.currentState = AuctionState.CREATED;
    this.highestBidder = sellerPubKey; // Default to seller
    this.highestBid = 0n;
  }
  
  // Start the auction
  @method()
  public start(sig: Sig, ctx: ScriptContext) {
    // Verify seller's signature
    assert(this.checkSig(sig, this.seller), 'Not authorized');
    
    // Verify auction is in CREATED state
    assert(this.currentState === AuctionState.CREATED, 'Invalid state');
    
    // Transition to ACTIVE state
    this.currentState = AuctionState.ACTIVE;
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
  }
  
  // Place a bid
  @method()
  public bid(bidder: PubKey, bidAmount: bigint, ctx: ScriptContext) {
    // Verify auction is active
    assert(this.currentState === AuctionState.ACTIVE, 'Auction not active');
    
    // Verify auction hasn't ended
    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    assert(currentTime < this.endTime, 'Auction ended');
    
    // Verify bid is higher than current highest bid
    assert(bidAmount > this.highestBid, 'Bid too low');
    
    // Update highest bid information
    this.highestBidder = bidder;
    this.highestBid = bidAmount;
    
    // Ensure proper state transition
    const output = ctx.tx.outputs[0];
    const nextInstance = this.next();
    
    // Verify output contains the updated state
    assert(output.script === nextInstance.lockingScript, 'Invalid state transition');
  }
}
```

## 🧩 Advanced Contract Patterns

### Oracle Integration

This example demonstrates how to integrate with an external data oracle:

```typescript
import {
  method,
  prop,
  SmartContract,
  assert,
  ByteString,
  Sig,
  PubKey,
  hash160,
  ScriptContext,
  Utils,
} from 'scrypt-ts';

export class WeatherBet extends SmartContract {
  // State properties
  @prop()
  readonly bettor: PubKey;
  
  @prop()
  readonly counterParty: PubKey;
  
  @prop()
  readonly oracle: PubKey;
  
  @prop()
  readonly temperature: bigint;
  
  @prop()
  readonly betAmount: bigint;
  
  @prop(true)
  isSettled: boolean;
  
  // Constructor
  constructor(
    bettorPubKey: PubKey,
    counterPartyPubKey: PubKey,
    oraclePubKey: PubKey,
    targetTemperature: bigint,
    amount: bigint
  ) {
    super(...arguments);
    this.bettor = bettorPubKey;
    this.counterParty = counterPartyPubKey;
    this.oracle = oraclePubKey;
    this.temperature = targetTemperature;
    this.betAmount = amount;
    this.isSettled = false;
  }
  
  // Settle bet based on oracle data
  @method()
  public settle(actualTemperature: bigint, oracleSig: Sig, ctx: ScriptContext) {
    // Verify oracle signature
    assert(this.checkSig(oracleSig, this.oracle), 'Invalid oracle signature');
    
    // Verify bet hasn't been settled
    assert(!this.isSettled, 'Already settled');
    
    // Mark as settled
    this.isSettled = true;
    
    // Determine winner
    let winner: PubKey;
    if (actualTemperature >= this.temperature) {
      winner = this.bettor;
    } else {
      winner = this.counterParty;
    }
    
    // Ensure proper payment to winner
    const output = ctx.tx.outputs[0];
    const winnerPKH = hash160(winner);
    const winnerScript = Utils.buildPublicKeyHashScript(winnerPKH);
    
    // Verify output pays to winner
    assert(output.script === winnerScript, 'Output not to winner');
    
    // Verify amount (double the bet amount)
    assert(output.value === this.betAmount * 2n, 'Incorrect amount');
  }
}
```

### Atomic Swap Contract

This example implements an atomic swap between two different assets:

```typescript
import {
  method,
  prop,
  SmartContract,
  assert,
  ByteString,
  Sig,
  PubKey,
  hash160,
  ScriptContext,
  Utils,
  sha256,
} from 'scrypt-ts';

export class AtomicSwap extends SmartContract {
  // State properties
  @prop()
  readonly party1: PubKey;
  
  @prop()
  readonly party2: PubKey;
  
  @prop()
  readonly secretHash: ByteString;
  
  @prop()
  readonly timelock: bigint;
  
  @prop()
  readonly amount: bigint;
  
  @prop(true)
  isCompleted: boolean;
  
  // Constructor
  constructor(
    party1PubKey: PubKey,
    party2PubKey: PubKey,
    hashOfSecret: ByteString,
    lockTime: bigint,
    swapAmount: bigint
  ) {
    super(...arguments);
    this.party1 = party1PubKey;
    this.party2 = party2PubKey;
    this.secretHash = hashOfSecret;
    this.timelock = lockTime;
    this.amount = swapAmount;
    this.isCompleted = false;
  }
  
  // Complete swap by revealing secret
  @method()
  public complete(secret: ByteString, ctx: ScriptContext) {
    // Verify secret matches hash
    assert(sha256(secret) === this.secretHash, 'Invalid secret');
    
    // Verify swap hasn't been completed
    assert(!this.isCompleted, 'Already completed');
    
    // Mark as completed
    this.isCompleted = true;
    
    // Ensure proper payment to party2
    const output = ctx.tx.outputs[0];
    const party2PKH = hash160(this.party2);
    const party2Script = Utils.buildPublicKeyHashScript(party2PKH);
    
    // Verify output pays to party2
    assert(output.script === party2Script, 'Output not to party2');
    
    // Verify amount
    assert(output.value === this.amount, 'Incorrect amount');
  }
  
  // Refund after timelock expires
  @method()
  public refund(sig: Sig, ctx: ScriptContext) {
    // Verify party1's signature
    assert(this.checkSig(sig, this.party1), 'Not authorized');
    
    // Verify timelock has expired
    const currentTime = BigInt(Math.floor(Date.now() / 1000));
    assert(currentTime >= this.timelock, 'Timelock not expired');
    
    // Verify swap hasn't been completed
    assert(!this.isCompleted, 'Already completed');
    
    // Mark as completed (to prevent further refunds)
    this.isCompleted = true;
    
    // Ensure proper refund to party1
    const output = ctx.tx.outputs[0];
    const party1PKH = hash160(this.party1);
    const party1Script = Utils.buildPublicKeyHashScript(party1PKH);
    
    // Verify output pays to party1
    assert(output.script === party1Script, 'Output not to party1');
    
    // Verify amount
    assert(output.value === this.amount, 'Incorrect amount');
  }
}
```

## 🔗 Next Steps

Now that you understand how to implement various smart contract patterns with sCrypt, you're ready to explore:

- [sCrypt Basics](scrypt-basics-corrected.md) - Review the fundamentals of sCrypt as an embedded DSL
- [TypeScript SDK](../01-building-blocks/ts-sdk-updated.md) - Learn how to interact with the blockchain
- [Wallet Infrastructure](../01-building-blocks/wallet-infrastructure.md) - Understand the server-side components
- [BRC-103 Authentication](../03-advanced-topics/brc103-authentication.md) - Explore peer-to-peer authentication
- [BSV Ecosystem Components](../../BSV_ECOSYSTEM_COMPONENTS.md) - See how everything fits together

---

**Next:** [Advanced Topics](../03-advanced-topics/README.md)