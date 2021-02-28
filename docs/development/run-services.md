---
description: This section will point you to how to access external services
---

# Access Services

### Accessing Scylla

You can easily access scylla by using the following credentials:

**host**: localhost:9042 \(or 127.0.0.1:9042\)

**username**: ****test

**password**: test

or if you prefer, you can use the cql command line directly:

```text
kubectl exec -n scylla -it simple-cluster-us-east-1-us-east-1a-0 -- cqlsh
```

### Accessing RabbitMQ

You can easily access RabbitMQ by using the following credentials \(open the host in your brows:

**host**: localhost:15672 \(or 127.0.0.1:15672\)

**username**: ****test

**password**: test

### Accessing Redis

You can access Redis through your client with the following credentials

**host**: localhost:6379 \(or 127.0.0.1:6379\)

No password or username required!

