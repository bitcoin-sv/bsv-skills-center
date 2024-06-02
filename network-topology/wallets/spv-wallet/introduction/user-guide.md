---
description: Send and Receive funds using SPV Wallet
---

# 💸 Use it

### Account Setup

After initial setup of the SPV Wallet you will need to set up an account within the context of your own wallet such that you can receive the initial funds.

The simplest way to set up a new account is with the example Wallet App. Technically you can register an xpub with the Admin Console, CLI, or with your own application using the go-client or js-client (see the [Dev Docs](https://app.gitbook.com/o/XRhTy6ZTa7k6aGkXcfRv/s/XXlVD1d5DMU8RH6DWSb7/) for details) but let's keep it simple here.

{% tabs %}
{% tab title="Wallet" %}
To begin, navigate to **https://wallet.**_**yourdomain.tld**_ replacing the latter part with your own domain, keeping only the subdomain `wallet`. Hit the "Sign up now!" link to create a new account.

<figure><img src="/.gitbook/assets/Untitled 2.jpg" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Signup" %}
Here you must fill in all of the fields as instructed. Use any email address, and a strong password. Agree to the terms and conditions and privacy policy, these are nonsense placeholder documents for demonstration purposes only. Hit the Sign up button.

<figure><img src="/.gitbook/assets/image (3).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Backup" %}
Then you will be shown the instructions for securely storing your mnemonic, and given a paymail which will allow you to receive funds.

<figure><img src="/.gitbook/assets/image (4).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}

### Receiving Funds

First to operate you need funds. This can be from any Paymail wallet which supports [p2p payment destination](https://bsv.brc.dev/payments/0028), and either [receive raw transaction](https://bsv.brc.dev/payments/0028), or [receive BEEF transaction](https://bsv.brc.dev/payments/0070). &#x20;

This includes BSV wallets such as HandCash, Tokenized, Centi, Signavera, Relysia, and others.

Simply copy the paymail of the account you just created. It will likely be something which looks like your email address, but the domain will be the domain you just set up for the wallet to use.

Use the regular payment interface of the external wallet to make a direct payment into the wallet. It should show up within 2 seconds.

### Sending Funds

You can send to counterparty wallets using the Wallet App.

{% tabs %}
{% tab title="Set Up Payment" %}
Defining a counterparty by paymail, and setting the amount to send is the first step to define a draft transaction.

<figure><img src="/.gitbook/assets/image (5).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Approve" %}
Filling in your password is required to generate a local private key which can spend the BSV in the draft transaction. Thereafter it is sent to the counterparty Wallet server.

<figure><img src="/.gitbook/assets/image (8).png" alt=""><figcaption></figcaption></figure>
{% endtab %}

{% tab title="Confirmation" %}
Transaction history is displayed capturing both inbound and outbound payments. One of the details included is the confirmation status. When the transaction is mined the status will turn green which confirms the wallet's ability to form valid BEEF encoded transactions using the outputs contained therein.

<figure><img src="/.gitbook/assets/image (7).png" alt=""><figcaption></figcaption></figure>
{% endtab %}
{% endtabs %}
