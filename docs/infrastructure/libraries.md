---
description: >-
  This section covers the standard of communication. This includes inter-service
  communication and client-to-server data protocols.
---

# Libraries

### GRPC

We use GRPC for synchronous API calls between services. [Learn more here](https://grpc.io/)

### Protobuf

We use protobuf for our GRPC payloads. However, protobufs are very useful for event-driven microservices, as we can easily define messages and create jobs to consume them.

