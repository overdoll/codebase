## Dependencies

- https://github.com/tilt-dev/ctlptl
- https://kind.sigs.k8s.io/
- https://tilt.dev/
- https://ngrok.com/ (only if you need to tunnel for webhooks) (requires you to register on their site)
- https://www.telepresence.io/ (only if you need to do front-end development)

## Setup

To set up a local environment, here are the instructions (from the root of the repo):

- `./scripts/local/create-cluster.sh` and wait for the cluster to finish creating
- `./scripts/local/installation.sh` to install everything in the cluster
- **OPTIONAL** `./scripts/local/export-certificates.sh` to export certificates (if you plan on working locally) (
  certificate is found under ./development/local-files/CA.crt and should be imported into Chrome/Firefox)
- `./scripts/local/fresh_installation_setup.sh` for a fresh installation setup (**required**)
- `tilt up` to start up all the services and get them ready
- `./scripts/setup_services.sh` to finish services setup, including running all migration files

## Webhooks

In order to have webhooks function, you must install **ngrok** and open a tunnel with `./scripts/start_tunnel.sh`.

Then, enter your webhooks URL into the appropriate software (CCBill, etc...) (Ngrok will tell you the url)
