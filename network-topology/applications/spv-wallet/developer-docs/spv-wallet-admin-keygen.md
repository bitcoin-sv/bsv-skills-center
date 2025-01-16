# SPV Wallet Admin Keygen

## Table of Contents

  - [Overview](#overview)
  - [Usage](#usage)
    - [Running Locally in command line](#running-locally-in-command-line)
    - [Running in Docker](#running-in-docker)
  - [Example](#example)
  
🔗 [GitHub URL](https://github.com/bitcoin-sv/spv-wallet-admin-keygen)

## Overview

This tool generates public and private key pairs for SPV Wallet applications. It can just print those keys or (by default) store it in the Kubernetes secret.

## Usage

### Running in Docker

#### Printing Keys

To print the keys, run the following command:

```bash
docker run bsvb/spv-wallet-admin-keygen:latest --print --no-k8s
```

#### Kubernetes Secret Creation

##### Connect to Kubernetes cluster
To set the keys in kubernetes secret, you need to setup the image to have access to the namespace kubernetes cluster.

You can do this, for example, by creating a dedicated `kubeconfig` file and mounting it to the container.
Simplest way to do this is to mount your `.kube/config` file to the container.

```bash
docker run -v {my/kube/config/file}:/kubeconfig -e KUBECONFIG=/kubeconfig bsvb/spv-wallet-admin-keygen:latest
```

##### Configure the secret name
By default the secret name is `spv-wallet-keys`.
You can change it by using argument `-s` or `--secret`

ℹ️ To configure k8s connection look at the section [connect to kubernetes cluster](#connect-to-kubernetes-cluster)

```bash
docker run bsvb/spv-wallet-admin-keygen:latest --secret my-secret-name
```

If you prefer to use environment variables, you can set the `SECRET_NAME` environment variable instead.

```bash
docker run -e SECRET_NAME=my-secret-name bsvb/spv-wallet-admin-keygen:latest
```

##### Configure the key names
By default, the key names are `admin_xpub` and `admin_xpriv`.
You can change it by using arguments -pb and -pv or --xpub-key and --xprv-key respectively.

ℹ️ To configure k8s connection look at the section [connect to kubernetes cluster](#connect-to-kubernetes-cluster)

```bash
docker run bsvb/spv-wallet-admin-keygen:latest --xpub-key my-xpub-key-name --xprv-key my-xpriv-key-name
```

If you prefer to use environment variables, you can set the `XPUB_KEY_NAME` and `XPRV_KEY_NAME` environment variables instead.

```bash
docker run -e XPUB_KEY_NAME=my-xpub-key-name -e XPRV_KEY_NAME=my-xpriv-key-name bsvb/spv-wallet-admin-keygen:latest
```


### Running from source code

Alternatively, you can generate a key pair directly from the source code.
To use the tool, simply run the following command:

```bash
go run main.go
```

and it will generate a new key pair for you and store it in two files: `xpub_key.txt` and `xpriv_key.txt`.
