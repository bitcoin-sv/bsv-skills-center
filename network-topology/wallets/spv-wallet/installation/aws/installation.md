---
description: Deployment guide to run your own SPV Wallet
---

# Installation

### Step 1

Set up your own [AWS account](https://portal.aws.amazon.com/billing/signup) with sufficient credit or a valid payment method.

### Step 2

[Register a root domain name](https://aws.amazon.com/route53/) you would like to use for the wallet. This will be how counterparties address users of your wallet: `person@yourdomain.com` The domain will be used as a root domain, and the cloud formation template will create subdomains under it.

{% embed url="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/domain-register.html" fullWidth="false" %}

### Step 3

Pick the AWS region closest to your customer(s). To determine which region is closest to your current location you can use a service like [Cloud Ping](https://www.cloudping.info/).&#x20;

{% tabs %}
{% tab title="AWS Console" %}
### Step 4

&#x20;Launch the software using one of the CloudFormation template links below for your chosen region.

<table><thead><tr><th width="106">Region</th><th>CloudFormation template link</th></tr></thead><tbody><tr><td>AP</td><td><a href="https://ap-south-1.console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ap-south-1</a> <a href="https://ap-northeast-1.console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ap-northeast-1</a> <a href="https://ap-northeast-2.console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ap-northeast-2</a> <a href="https://ap-northeast-3.console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ap-northeast-3</a> <a href="https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ap-southeast-1</a> <a href="https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ap-southeast-2</a></td></tr><tr><td>CA</td><td><a href="https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">ca-central-1</a></td></tr><tr><td>EU</td><td><a href="https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">eu-central-1</a> <a href="https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">eu-west-1</a> <a href="https://eu-west-2.console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">eu-west-2</a> <a href="https://eu-west-3.console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">eu-west-3</a> <a href="https://eu-north-1.console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">eu-north-1</a></td></tr><tr><td>SA</td><td><a href="https://sa-east-1.console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">sa-east-1</a></td></tr><tr><td>US</td><td><a href="https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">us-east-1</a> <a href="https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">us-east-2</a> <a href="https://us-west-1.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">us-west-1</a> <a href="https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json">us-west-2</a></td></tr></tbody></table>

If you don't know which link to pick, just use [us-east-1](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://spv-wallet-template.s3.eu-central-1.amazonaws.com/spv-wallet/latest/EksStack.template.json).

### Step 5

Fill in the required template settings:

* Stack name - this name will be dispayed on the list of Cloud Formation stacks in the AWS console
* Domain name - type the domain nama that you registered at the step 2
* Hosted zone ID for domain - choose exactly the one that is matching the domain name above

### Step 6

After submitting stack creation it will take up to 30 minutes to create all resources. You can check the status in the Resources tab.
{% endtab %}

{% tab title="AWS CLI" %}
### Prerequisite

Make sure you have AWS CLI installed and authenticated

<table data-card-size="large" data-column-title-hidden data-view="cards" data-full-width="true"><thead><tr><th align="center"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center"><strong>Install AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html</a></td></tr><tr><td align="center"><strong>Authenticate AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html">https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html</a></td></tr></tbody></table>

### Step 4

Issue the following command and find hosted zone id for registered domain in the [Step 2](installation.md#step-2).

:information\_source:Make sure to use the id without the prefix `/hostedzone/`

```bash
 aws route53 list-hosted-zones --query "HostedZones[*].[Id,Name]" --output text
```

### Step 5

Replace variables described below with chosen options in the following command and run it to deploy the stack.

```bash
aws cloudformation create-stack \
--stack-name ${Stack_Name} \
--region ${AWS_Region} \
--parameters ParameterKey=domainName,ParameterValue=${Domain_Name} ParameterKey=hostedzoneId,ParameterValue=${Hosted_Zone_Id} \
--template-url https://spv-wallet-template.s3.amazonaws.com/spv-wallet/latest/EksStack.template.json --capabilities CAPABILITY_IAM
```

Where:

* ${Stack\_Name} - this name will be used to refer the stack in any following command
* ${AWS\_Region} - region you choose in the [Step 3](installation.md#step-3)
* ${Domain\_Name} - domain name you registered in the [Step 2](installation.md#step-2)
* ${Hosted\_Zone\_Id} - hosted zone id found in [Step 4](installation.md#step-4-1)

### Step 6

After submitting stack creation it will take up to 30 minutes to create all resources. You can check the status by issuing the following command.

```
aws cloudformation describe-stacks --stack-name ${Stack_Name} --region ${AWS_Region}
```
{% endtab %}
{% endtabs %}



{% hint style="info" %}
These subdomains will be created for the application

* **wallet.**_yourdomain.com_
* **admin.**_yourdomain.com_
* **api.**_yourdomain.com_
* _**headers**.yourdomain.com_
{% endhint %}

<details>

<summary>What resources are created?</summary>

·       VPC with CIDR 10.0.0.0/16

·       EKS Cluster with a Single Node Group (2 x t3.small instances)

·       Wildcard certificate in ACM for provided domain

·       Route53 entries for Bux components

·       Load Balancer Controller for EKS

·       SPV Wallet Components:

o  Web App & API

o  SPV Wallet Server

o  PostgreSQL Database

o  Web Admin

o  Block Headers Service

</details>
