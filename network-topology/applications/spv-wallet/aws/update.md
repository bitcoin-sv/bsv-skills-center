---
description: How to update the deployment to newer version
---

# Update

{% tabs %}
{% tab title="AWS Console" %}
<figure><img src="/.gitbook/assets/spv-wallet-aws-update-step-1-4.png" alt=""><figcaption><p>Steps 1-4</p></figcaption></figure>

### Step 1

Open [AWS console -> Cloud Formation -> Stacks](https://console.aws.amazon.com/cloudformation/home#stacks)

### Step 2

Make sure you're in the same region you chose in [Step 3](installation.md#step-4).

### Step 3

Click your top level stack, the one without the `NESTED` badge.

### Step 4

Click the `Update` button at the top right.

<figure><img src="/.gitbook/assets/spv-wallet-aws-update-step-5-8.png" alt=""><figcaption><p>Steps 5-8</p></figcaption></figure>

### Step 5

Choose the `Replace current template` option

### Step 6

Ensure Template source is set to `Amazon S3 URL`

### Step 7

Use the following URL as the template URL:

```url
https://spv-wallet-template.s3.amazonaws.com/spv-wallet/latest/EksStack.template.json
```

### Step 8

Click `Next` through the form until you reach the summary page

* Wait until
* Check the checkboxes right above buttons at the bottom of the page
* Click "**Submit**" - which will trigger the update.

### Step 9

Wait until status of the stack will reach the value `UPDATE_COMPLETE`
{% endtab %}

{% tab title="AWS CLI" %}
#### Step 1

Make sure you have AWS CLI installed and authenticated

<table data-card-size="large" data-column-title-hidden data-view="cards" data-full-width="false"><thead><tr><th align="center"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center"><strong>Install AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html</a></td></tr><tr><td align="center"><strong>Authenticate AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html">https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html</a></td></tr></tbody></table>

#### Step 2

Replace variables described below with chosen options in the following command and run it to update the stack.

```bash
aws cloudformation update-stack \
--stack-name ${Stack_Name} \
--region ${AWS_Region} \
--template-url https://spv-wallet-template.s3.amazonaws.com/spv-wallet/latest/EksStack.template.json \
--parameters ParameterKey=domainName,UsePreviousValue=true ParameterKey=hostedzoneId,UsePreviousValue=true \
--capabilities CAPABILITY_IAM
```

Where:

* ${Stack\_Name} - is the stack name chosen during installation process
* ${AWS\_Region} - is the region where the stack was installed

### Step 3

Wait until status of the stack will reach the value `UPDATE_COMPLETE`, you can check it by issuing the following command:

```bash
aws cloudformation describe-stacks --stack-name ${Stack_Name} --region ${AWS_Region}
```

Where:

* ${Stack\_Name} - is the stack name chosen during installation process
* ${AWS\_Region} - is the region where the stack was installed
{% endtab %}
{% endtabs %}
