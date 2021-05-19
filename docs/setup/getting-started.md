---
description: This section will document how to get started on development
---

# Getting Started

To get started with development, you will first need to run a couple of scripts.

From the root repository, run the following command:

```text
./development/scripts/create-cluster.sh
```

This will create a Kubernetes cluster that is compatible with our environment. You should add this kubernetes configuration to your kubeconfig, found in `~/.kube/config`. You can find the configuration by running this command:

```text
k3d get-kubeconfig --name=overdoll
```

Once this is done, you need to install a few configurations:

```text
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v0.16.1/cert-manager.yaml
```

This will install cert-manager, which is required by the Scylla database. After this is done, you need to install the Scylla operator:

```text
kubectl apply -f development/scylla/scylla-operator.yaml
```

This will allow Scylla to run in the environment.

We're done with the scripts! The last thing you need to do is setup the domain.

Open your `/etc/hosts` file, and assign a domain to localhost: `127.0.0.1 overdoll.test`

Finally, you need to also accept the generated certificates found in `deployments/ssl` in your browser, so you don't get any errors.

With everything finished, all you need to do is switch to your new kubernetes config by running `kubectl config use-context overdoll` and run `tilt up`
