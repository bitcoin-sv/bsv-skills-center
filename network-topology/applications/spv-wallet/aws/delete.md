# Delete

You can delete resources by deleting the CloudFormation stack.

All data within SPV Wallet will be deleted.

Manual delete is required for log groups.

{% hint style="danger" %}
**WARNING**\
\
Deleting the deployment will result in **TOTAL LOSS OF FUNDS** held by all accounts in the wallet. Although users _should_ keep their 12 word mnemonics displayed at the time of account creation, in practice this is often skipped, and there is no way to even know which transactions belong to the user thereafter, nevermind regaining control of the funds.\
\
Please ensure all funds are sent out of hosted wallets, and a record of all transactions has been exported prior to deletion of the deployment.
{% endhint %}

{% tabs %}
{% tab title="AWS Console" %}
<figure><img src="../../../wallets/spv-wallet/installation/.gitbook/assets/image%20(11).png" alt=""><figcaption></figcaption></figure>

### Step 1

Open [AWS console -> Cloud Formation -> Stacks](https://console.aws.amazon.com/cloudformation/home#stacks)

### Step 2

Make sure you're in the same region you chose in [Step 3](installation.md#step-4) of installation

### Step 3

Click your top level stack, the one without the `NESTED` badge.

### Step 4

Click the `Delete` button at the top right.

### Step 5

Confirm that you want to delete the stack.

{% hint style="danger" %}
**WARNING**\
\
Deleting the deployment will result in **TOTAL LOSS OF FUNDS** held by all accounts in the wallet. Although users _should_ keep their 12 word mnemonics displayed at the time of account creation, in practice this is often skipped, and there is no way to even know which transactions belong to the user thereafter, nevermind regaining control of the funds.\
\
Please ensure all funds are sent out of hosted wallets, and a record of all transactions has been exported prior to deletion of the deployment.
{% endhint %}

### Step 6

Wait until status of the stack will reach the value `DELETE_COMPLETE`

{% hint style="info" %}
In some rare cases, it can happen that deletion will end up with error. Often this is because AWS is trying to delete resources in wrong order. In such a case you need to check which resources deletion failed and delete them manually, then try again deleting whole stack (go back to [Step 1](delete.md#step-1))
{% endhint %}
{% endtab %}

{% tab title="AWS CLI" %}
### Step 1

Make sure you have AWS CLI installed and authenticated

<table data-card-size="large" data-column-title-hidden data-view="cards" data-full-width="true"><thead><tr><th align="center"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center"><strong>Install AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html</a></td></tr><tr><td align="center"><strong>Authenticate AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html">https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html</a></td></tr></tbody></table>

### Step 2

Replace variables described below with previously chosen options in the following command and run it to delete the stack.

{% hint style="danger" %}
**WARNING**\
\
Deleting the deployment will result in **TOTAL LOSS OF FUNDS** held by all accounts in the wallet. Although users _should_ keep their 12 word mnemonics displayed at the time of account creation, in practice this is often skipped, and there is no way to even know which transactions belong to the user thereafter, nevermind regaining control of the funds.\
\
Please ensure all funds are sent out of hosted wallets, and a record of all transactions has been exported prior to deletion of the deployment.
{% endhint %}

```bash
aws cloudformation delete-stack --stack-name ${Stack_Name} --region ${AWS_Region}
```

Where:

* ${Stack\_Name} - is the stack name chosen during installation process
* ${AWS\_Region} - is the region where the stack was installed

### Step 3

Check the status of the stack (wait until following command will return error that stack dosn't exist)

```bash
aws cloudformation describe-stacks --stack-name ${Stack_Name} --region ${AWS_Region}
```

{% hint style="info" %}
In some rare cases, it can happen that deletion will end up with error. Often this is because AWS is trying to delete resources in wrong order. In such a case you need to check which resources deletion failed and delete them manually, then try again deleting whole stack (go back to [Step 1](delete.md#step-1-1))
{% endhint %}
{% endtab %}
{% endtabs %}
