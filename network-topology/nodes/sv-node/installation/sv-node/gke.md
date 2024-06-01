# GKE

The following directions will walk you through creating a Bitcoin SV node within GKE (Google Kubernetes Engine).

If you wish to run another version of bitcoind, just change the image reference in `bitcoin-deployment.yml`.

Steps:

```bash
1 - Add a new blank disk on GCE called bitcoin-data that is 200GB. You can always expand it later.
2 - Save the following code snippets and place them in a new directory kube.
3 - Change the rpcuser and rpcpass values in bitcoin-secrets.yml. They are base64 encoded. To base64 a string, just run echo -n SOMESTRING | base64.
4 - Run kubectl create -f /path/to/kube
5 - Profit!
```

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  namespace: default
  labels:
    service: bitcoin
  name: bitcoin
spec:
  strategy:
    type: Recreate
  replicas: 1
  template:
    metadata:
      labels:
        service: bitcoin
    spec:
      containers:
      - env:
        - name: BITCOIN_RPC_USER
          valueFrom:
            secretKeyRef:
              name: bitcoin
              key: rpcuser
        - name: BITCOIN_RPC_PASSWORD
          valueFrom:
            secretKeyRef:
              name: bitcoin
              key: rpcpass
        image: bitcoinsv/bitcoin-sv
        name: bitcoin
        volumeMounts:
          - mountPath: /data
            name: bitcoin-data
        resources:
          requests:
            memory: "2Gi"
      restartPolicy: Always
      volumes:
        - name: bitcoin-data
          gcePersistentDisk:
            pdName: bitcoin-data
            fsType: ext4
```

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: bitcoin
type: Opaque
data:
  rpcuser: YWRtaW4=
  rpcpass: aXRvbGR5b3V0b2NoYW5nZXRoaXM=
```

```yaml
apiVersion: v1
kind: Service
metadata:
  name: bitcoin
  namespace: default
spec:
  ports:
    - port: 8333
      targetPort: 8333
  selector:
    service: bitcoin
  type: LoadBalancer
  externalTrafficPolicy: Local
```
