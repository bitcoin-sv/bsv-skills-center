# Block Headers Service

Block Headers Service runs as part of the SPV Wallet, you do not need to deploy it separately. If you want to run it without the rest of the stack, deployment instructions can be found in the README of the repository in Github.

{% embed url="https://github.com/bitcoin-sv/block-headers-service" %}

### **Integration of** Block Headers Service

One significant step in the evolution of the SPV Wallet is the integration of Block Headers Service. Block Headers Service listens to block announcements from mining nodes on the p2p network, requests the block headers, and validates them on receipt to ensure they're part of the longest chain of work. It independently maintains a full history of all block headers, and exposes them via a secure web API. SPV Wallets can use this API to validate the inclusion of a transaction within a particular block.\
This is a critical component of SPV functionality, as it allows confirmation of transactions without downloading the entire blockchain.

{% hint style="success" %}
Block Headers Service keeps track of all block headers, so that we can check Merkle Roots during SPV.
{% endhint %}

{% tabs %}
{% tab title="Example Request" %}
Make a POST request to your Block Headers Service `/api/v1/chain/merkleroot/verify`

```
[
  {
    "blockHeight": 823261,
    "merkleRoot": "66ae4ad9e2bf36ee30da44efaaaf0c07c9e8bd02d79de7553681607b83d96900"
  }
]
```
{% endtab %}

{% tab title="Response" %}
```
{
  "confirmationState": "CONFIRMED",
  "confirmations": [
    {
      "blockHash": "0000000000000000065333e1f380d7512799b67d46eb9b38088ee98fad83eff7",
      "blockHeight": 823261,
      "merkleRoot": "66ae4ad9e2bf36ee30da44efaaaf0c07c9e8bd02d79de7553681607b83d96900",
      "confirmation": "CONFIRMED"
    }
  ]
}
```

You get both individual results for each input, and an overall `confirmationState` which you can use assuming you're validating one transaction with many inputs.
{% endtab %}
{% endtabs %}

{% hint style="info" %}
Some may prefer to use a Java implementation - [HeaderSV](https://github.com/bitcoin-sv/block-headers-client/) which has similar functionality. It lacks an endpoint for Merkle root validation, but could be adapted to work like Block Headers Service.
{% endhint %}
