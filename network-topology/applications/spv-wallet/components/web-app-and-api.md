---
description: Example application
---

# 👆 Web App & API

The frontend web wallet application allows users to register, make transactions, and see their balance. This is what we'd expect you to replace with your own application front end, but is included in the deployment to provide a working demo for basic payment functionality.

<figure><img src="/.gitbook/assets/Web%20App%20SPV%20Wallet.png" alt=""><figcaption><p>SPV Wallet - Web App</p></figcaption></figure>

### Front End

{% embed url="https://github.com/bitcoin-sv/spv-wallet-web-frontend" %}

### Back End

The backend API is coupled with the web wallet, and demonstrates use of the Wallet Client library.

{% embed url="https://github.com/bitcoin-sv/spv-wallet-web-backend" %}

### Clients

The client libraries themselves are available separately such that integrating with your own front end should be straightforward.

#### Golang

{% embed url="https://github.com/bitcoin-sv/spv-wallet-go-client" %}

#### JavaScript

{% embed url="https://github.com/bitcoin-sv/spv-wallet-js-client" %}
