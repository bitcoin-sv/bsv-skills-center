# Getting Started

To get started, we'll introduce some of the core concepts by building a simple ticket tranche creation web application using the ts-sdk and react.&#x20;

{% hint style="info" %}
This tutorial assumes you have Nodejs installed
{% endhint %}

#### Step 1: Set Up the React Application

First, set up a new Ract app:

```bash
npx create-react-app ticket-tranche-app --template typescript
cd ticket-tranche-app
```

#### Step 2: Install Dependencies

```bash
npm install react @bsv/sdk big.js
```

#### Step 3: Create the Ticket Form Component

```typescript
// src/components/TicketForm.js
import React, { useState } from 'react';

const TicketForm = ({ onAddTicket }: any) => {
  const [ticketInfo, setTicketInfo] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onAddTicket(ticketInfo);
    setTicketInfo('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={ticketInfo}
        onChange={(e) => setTicketInfo(e.target.value)}
        placeholder="Enter ticket information"
        required
      />
      <button type="submit">Add Ticket</button>
    </form>
  );
};

export default TicketForm;

```

#### Step 4: Create the Main App Component

```typescript
// src/App.js
import React, { useState } from 'react';
import TicketForm from './components/TicketForm';
import { createTrancheTransaction } from './components/TransactionUtils';

const App = () => {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticketInfo: never) => {
    setTickets([...tickets, ticketInfo]);
  };

  const handleCreateTranche = async () => {
    try {
      const transaction = await createTrancheTransaction(tickets);
      console.log('Transaction created:', transaction);
    } catch (error) {
      console.error('Error creating transaction:', error);
    }
  };

  return (
    <div>
      <h1>Ticket Tranche App</h1>
      <TicketForm onAddTicket={addTicket} />
      <button onClick={handleCreateTranche}>Create Tranche</button>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={index}>{ticket}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

```

#### Step 5: Create Utility Functions for Transactions

```typescript
// src/utils/transactionUtils.js
import { PrivateKey, PublicKey, Transaction, BigNumber, Hash, Point, P2PKH } from '@bsv/sdk';

// Function to hash ticket information
const hashTicket = (ticketInfo: string) => {
  return Hash.sha256(ticketInfo).toString();
};

// Function to add a hash to a public key
const addHashToPublicKey = (pubKey: PublicKey, hash: BigNumber) => {
  const pubKeyHash = Hash.sha256(pubKey.toDER());
  const hashNum = new BigNumber(pubKeyHash, 16);
  const currentPoint = pubKey;
  const newX = currentPoint.getX().add(hashNum).umod(pubKey.curve.p);
  const newY = currentPoint.getY();
  const newPoint = new Point(newX, newY, newY.isEven());
  return new PublicKey(newPoint);
};

// Function to create a tranche transaction
export const createTrancheTransaction = async (tickets: string[]) => {
  const privateKey = PrivateKey.fromRandom();
  const publicKey = privateKey.toPublicKey();

  const transaction = tickets.map((ticket) => {
    const ticketHash = hashTicket(ticket);
    const newPubKey = addHashToPublicKey(publicKey, BigNumber.fromHex(ticketHash));
    const lockingScript = new P2PKH().lock(newPubKey.toAddress());
    const tx = new Transaction();
    
    tx.addOutput({
      lockingScript: lockingScript,
      satoshis: 1000, // Example value, adjust as needed
    });

    return tx;
  });

  return transaction;
};

```

#### Step 6: Run the Application

```bash
npm start
```
