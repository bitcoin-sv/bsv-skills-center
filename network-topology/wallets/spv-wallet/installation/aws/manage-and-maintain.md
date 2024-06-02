---
description: 'How to: get access to EKS, get admin keys, read logs'
---

# Manage & Maintain

## Accessing EKS cluster&#x20;

### AWS Console

<figure><img src="..//.gitbook/assets/image (12).png" alt=""><figcaption></figcaption></figure>

#### Step 1

Open [AWS console -> Cloud Formation -> Stacks](https://console.aws.amazon.com/cloudformation/home#stacks)

#### Step 2

Make sure you're in the same region you chose in installation [Step 3](installation.md#step-4).

#### Step 3

Click the name (link like) of your top level stack, the one without the `NESTED` badge.

#### Step 4

Open Outputs tab and copy the value of the `EKSConstructClusterMasterRoleOutput***` , starting just after the `role/`

{% hint style="info" %}
In the example from picture above the value which you should copy would be:\
`spv-wallet-EKSConstructEksMastersRole***3-J***t`
{% endhint %}

#### Step 5

<figure><img src="..//.gitbook/assets/image (15).png" alt=""><figcaption></figcaption></figure>

Open user menu at the right top corner and click `Switch role` button

{% hint style="info" %}
If you're setting role to switch for the first time, additional view will be displayed. All you need to do there is to click another **`Switch role`** button
{% endhint %}

#### Step 6

<figure><img src="..//.gitbook/assets/image (16).png" alt=""><figcaption></figcaption></figure>

Fill the form with:

* Account - account number of your AWS account
* Role - the role that you copied in [Step 5](manage-and-maintain.md#step-5)
* Display Name - whatever name meaningful for you (it will be listed later in the user menu)

After filling the form, click `Switch Role` button. If everything is correct, you will be switched to that role (otherwise after clicking the button, it looks like nothing happend - so you need to fix the values provided in the form).

<figure><img src="..//.gitbook/assets/image (17).png" alt=""><figcaption></figcaption></figure>

After switchin the role the user menu after clicking the role name at the top right should look like on the picture above.

Notice the role name and color of the badge at instead of user name.

{% hint style="info" %}
If you want to switch back to your original role (which doesn't have permissions to access EKS but has different permissions) use the **`Switch back`** button
{% endhint %}

{% hint style="info" %}
Next time when you want to use this EKS Master Role, all you need to do is to open this menu again and click the role name on the Role history list.
{% endhint %}

#### Step 6

Navigate to [Amazon Elastic Kubernetes Service (EKS) ](https://eu-central-1.console.aws.amazon.com/eks/home#/clusters)

Choose your active cluster.

Now in the tab Resources you can see all the pods, deployments, config maps that were created for you during the installation process.

<div align="left">

<figure><img src="..//.gitbook/assets/image (18).png" alt=""><figcaption></figcaption></figure>

</div>

### Terminal (kubectl)

#### Step 1

Make sure you have **AWS CLI** installed and authenticated

<table data-card-size="large" data-column-title-hidden data-view="cards" data-full-width="false"><thead><tr><th align="center"></th><th data-hidden data-card-target data-type="content-ref"></th></tr></thead><tbody><tr><td align="center"><strong>Install AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html">https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html</a></td></tr><tr><td align="center"><strong>Authenticate AWS CLI</strong></td><td><a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html">https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html</a></td></tr></tbody></table>

#### Step 2

Make sure you have **kubectl** installed

{% embed url="https://kubernetes.io/docs/tasks/tools/" %}

#### Step 3

Now you need to obtain "update kubeconfig command" from outputs of the installed stack.

{% tabs %}
{% tab title="AWS Console" %}
<figure><img src="..//.gitbook/assets/image (13).png" alt=""><figcaption></figcaption></figure>

#### Step 3a

Open [AWS console -> Cloud Formation -> Stacks](https://console.aws.amazon.com/cloudformation/home#stacks)

#### Step 3b

Make sure you're in the same region you chose in [Step 3](installation.md#step-4).

#### Step 3c

Click name of your top level stack, the one without the `NESTED` badge. This should open the details of the stack.

#### Step 3d

Open `Outputs` tab

#### Step 3e

Copy the `aws eks update-kubeconfig` command from the `EKSConstructClusterConfgi***` value.
{% endtab %}

{% tab title="AWS CLI" %}
#### Step 3a

Issue the following command, replacing variables with chosen values during installation. And copy the result

```bash
aws cloudformation describe-stacks \
 --stack-name ${Stack_Name} \
 --region ${AWS_Region} \
 --query "Stacks[0].Outputs[?starts_with(OutputKey, 'EKSConstructClusterConfig')].OutputValue" \
 --output text
```

Where:

* ${Stack\_Name} - is the stack name chosen during installation process
* ${AWS\_Region} - is the region where the stack was installed
{% endtab %}
{% endtabs %}

#### Step 4

Issue copied command from the the previous step. It should look like this:

```bash
aws eks update-kubeconfig --name EKSConstructEKSCluster*** --role-arn=arn:aws:iam::22******67:role/spv-wallet-EKSConstructEksMastersRole*** --region eu-central-1
```

This will configure  your **kubectl**  context and use it, so just after issuing the command you should be able to use **kubectl** to manage your cluster.

{% hint style="info" %}
If you have multiple kubectl contexts, you can also setup different name of the created context and of the created user configuration.

To do so, before you issue the coppied command, add those additional arguments to it:

`--alias myContextName` - It will set the name of created context to the myContextName

`--user-alias myUserConfigName` - it will set the name of created context config for user to the myUserConfigName
{% endhint %}

#### Step 5

Check if everything is configured properly configure by issueing any **kubectl** command, for example:

```bash
kubectl get pods
```

If everything is ok you should get the output like this:

```bash
NAME                                           READY   STATUS      RESTARTS        AGE
bsv-block-headers-service-7644cb6c75-8qsgs     1/1     Running     1 (2h ago)      2h
bsv-postgresql-block-headers-service-0         1/1     Running     0               2h
bsv-postgresql-spv-wallet-0                    1/1     Running     0               2h
bsv-postgresql-web-wallet-0                    1/1     Running     0               2h
bsv-redis-spv-wallet-master-0                  1/1     Running     0               2h
bsv-spv-wallet-6b6f49c468-f82pb                1/1     Running     2 (2h ago)      2h
bsv-spv-wallet-admin-649ff79f8b-vh8df          1/1     Running     1 (1h ago)      2h
bsv-spv-wallet-admin-keygen-95w42              0/1     Completed   0               2h
bsv-spv-wallet-web-backend-6646797b4b-znzt4    1/1     Running     1 (2h ago)      2h
bsv-spv-wallet-web-frontend-7d45fff896-gvjd2   1/1     Running     0               2h

```

## Retrieving SPV Wallet Admin Keys

In order to maintain the application you may need to access the Admin Console using admin private key.&#x20;

Also in case of developing own integration with SPV Wallet, it is common to have a need for authenticating as admin.

&#x20;Admin keys are generated and stored in k8s secret during deployment by an automated script.

To retrieve it follow instructions below

{% tabs %}
{% tab title="AWS Console" %}
### Prerequisites

You need to have ability to Switch Role in AWS Console like in the instruction in the section [#aws-console](manage-and-maintain.md#aws-console "mention")

Ensure that you switched the role to the "EKS Master" role.

<figure><img src="..//.gitbook/assets/image (19).png" alt=""><figcaption><p>Steps 2 - 4</p></figcaption></figure>

### Step 1

Navigate to [Amazon Elastic Kubernetes Service (EKS) ](https://eu-central-1.console.aws.amazon.com/eks/home#/clusters)and choose your active cluster (click its name)

### Step 2

Open `Resources` tab.

### Step 3

Choose `Secrets` from the left menu

### Step 4

Find `spv-wallet-keys` on the list and click the name to see details

### Step 5

<figure><img src="..//.gitbook/assets/image (21).png" alt=""><figcaption></figcaption></figure>

Check the options to decode the values. And then you can copy admin xpriv and xpub values.
{% endtab %}

{% tab title="kubectl" %}
### Prerequisites

You need to have **kubectl** installed and configured like in the instruction in the section [#terminal-kubectl](manage-and-maintain.md#terminal-kubectl "mention")

### Command to get admin private key

<pre class="language-bash"><code class="lang-bash"><strong>kubectl get secret spv-wallet-keys -o jsonpath="{.data.admin_xpriv}" | base64 --decode
</strong></code></pre>

### Command to get admin public key

```bash
kubectl get secret spv-wallet-keys -o jsonpath="{.data.admin_xpub}" | base64 --decode
```
{% endtab %}
{% endtabs %}

## Retrieving Block Headers Service API key

In order to maintain or query Block Headers Service you may need to retrieve API key required for authentication within Block Headers Service. Below you can find instruction how to obtain this key.

{% tabs %}
{% tab title="AWS Console" %}
<figure><img src="..//.gitbook/assets/image (22).png" alt=""><figcaption><p>Steps 2-4</p></figcaption></figure>

### Step 1

Navigate to [Amazon Elastic Kubernetes Service (EKS) ](https://eu-central-1.console.aws.amazon.com/eks/home#/clusters)and choose your active cluster (click its name)

### Step 2

Open `Resources` tab.

### Step 3

Choose `Secrets` from the left menu

### Step 4

Find `block-headers-service-secret` on the list and click the name to see details

### Step 5

<figure><img src="..//.gitbook/assets/image (23).png" alt=""><figcaption></figcaption></figure>

Check the options to decode the values. And then you can copy value of block-headers-service-auth-token.
{% endtab %}

{% tab title="kubectl" %}
### Prerequisites

You need to have **kubectl** installed and configured like in the instruction in the section [#terminal-kubectl](manage-and-maintain.md#terminal-kubectl "mention")

### Command

```bash
kubectl get secret block-headers-service-secret -o jsonpath='{.data.block-headers-service-auth-token}' | base64 --decode
```
{% endtab %}
{% endtabs %}

## Accessing logs

Below you can find instructions how to access components logs.

{% hint style="warning" %}
We don't provide any integration with logs collectors / viewers, like Kibana or Cloud Watch. Although we're trying to output the logs in a format consumable by them, it is up to you to setup those tools correctly and collect the logs from the applications.
{% endhint %}

{% tabs %}
{% tab title="kubectl" %}
### Prerequisites

You need to have **kubectl** installed and configured like in the instruction in the section [#terminal-kubectl](manage-and-maintain.md#terminal-kubectl "mention")

### Step 1

First get the list of available deployments

```
kubectl get deployments
```

It should output something like this:

```
NAME                          READY   UP-TO-DATE   AVAILABLE   AGE
bsv-block-headers-service     1/1     1            1           3h
bsv-spv-wallet                1/1     1            1           3h
bsv-spv-wallet-admin          1/1     1            1           3h
bsv-spv-wallet-web-backend    1/1     1            1           3h
bsv-spv-wallet-web-frontend   1/1     1            1           3h
```

### Step 2

Now choose and copy the name from the list of the component you want to see the logs,&#x20;

For example `bsv-spv-wallet`

### Step 3

Issue the following command to get the logs of that component:

```
kubectl logs deployment/${name}
```

Where&#x20;

${name} - is the deployment name you choose in [Step 2](manage-and-maintain.md#step-2-2)

{% hint style="info" %}
You can add the flag `--follow` at the and of this command to follow the logs from the application.
{% endhint %}
{% endtab %}
{% endtabs %}

