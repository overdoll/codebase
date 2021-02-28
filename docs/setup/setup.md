---
description: This page will document the tools you need to download
---

# Download Tools

To begin developing, you will require the following tools:

#### Bazel

Bazel can be easily installed through [bazelisk](https://www.npmjs.com/package/@bazel/bazelisk), which allows us to control the version that is used on the repository. You can either install it through the npm package `npm install -g @bazel/bazelisk` or compile the Go binary.

#### Tilt

To run our local environments, we will use tilt to orchestrate all of our services. Just follow the installation instructions [here](https://docs.tilt.dev/install.html)

#### K3D

We have a local development orchestrator, tilt. However, we need a place to run our services. We run all of our stuff on Kubernetes, so we will use K3D to run our cluster. You can easily download K3D with this script

```text
wget -q -O - https://raw.githubusercontent.com/rancher/k3d/main/install.sh | TAG=v1.7.0 bash
```

#### Kubectl

To interact with your cluster \(and for Tilt to work properly\), you need to install kubectl. Follow the instructions [here](https://kubernetes.io/docs/tasks/tools/install-kubectl/)

**Helm**

We use Helm to create and store all of our configurations. You should download it [here](https://helm.sh/docs/intro/install/)

Also, make sure to add the **traefik** and **stable** repositories, as those contain charts that we use:

```text
helm repo add traefik https://helm.traefik.io/traefik
helm repo add stable https://charts.helm.sh/stable
```



That's it! The rest of the tools are built by Bazel, so we don't have to worry about downloading them.

Follow the next section on how to setup the rest of the environment.





