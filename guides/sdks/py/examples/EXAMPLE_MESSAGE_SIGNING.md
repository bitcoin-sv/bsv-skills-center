# Example: Message Signing

This guide walks through the necessary steps for both public and private message signing.

## Overview

Message signing is a mechanism that preserves the integrity of secure communications, enabling entities to verify the authenticity of a message's origin. This document emphasizes two primary types of message signing: private and public.

Private message signing is used when a message needs to be verified by a _specific recipient_. In this scenario, the sender creates a unique signature using their private key combined with the recipient's public key. The recipient, using their private key, can then verify the signature and thereby the message's authenticity.

On the other hand, public message signing creates a signature that can be verified by _anyone_, without the need for any specific private key. This is achieved by the sender using only their private key to create the signature.

The choice between private and public message signing hinges on the specific requirements of the communication. For applications that require secure communication where authentication is paramount, private message signing proves most effective. Conversely, when the authenticity of a message needs to be transparent to all parties, public message signing is the go-to approach. Understanding these differences will enable developers to apply the correct method of message signing depending on their specific use case.

### 1. Example Code - Private Message Signing

To get started, you will first want to import the required functions / classes.

```py
from bsv import PrivateKey, verify_signed_text
```

Next, you will want to configure who the sender is, the recipient, and what message you would like to sign.

```py
sender = PrivateKey()
recipient = PrivateKey()

message = 'Hello world!'
```

Now we can sign the message and generate a signature that can only be verified by our specified recipient.

```py
address, signature = sender.sign_text(message)

verified = verify_signed_text(message, address, signature)
print('Verified:': verified)
```

### 2. Example Code - Public Message Signing

To create a signature that anyone can verify, the code is very similar to the first example, just without a specified recipient. This will allow anyone to verify the signature generated without requiring them to know a specific private key.

```ts
signer = PrivateKey()

message = 'I like big blocks and I cannot lie!'

address, signature = signer.sign_text(message)
verified = verify_signed_text(message, address, signature)
print('Verified:': verified)
```

## Considerations

While these private signing functions are built on industry standards and well-tested code, there are considerations to keep in mind when integrating them into your applications.

* **Private Key Security**: Private keys must be stored securely to prevent unauthorized access, as they can be used to sign fraudulent messages.
* **Use Case Analysis**: As stated in the overview, you should carefully evaluate whether you need a private or publicly verifiable signature based on your use case.
* **Implications of Signature Verifiability**: When creating signatures that anyone can verify, consider the implications. While transparency is achieved, sensitive messages should only be verifiable by intended recipients.

By understanding and applying these considerations, you can ensure a secure implementation of private signing within your applications.
