---
description: >-
  This page will detail the external services that we use to make our
  infrastructure run
---

# External Providers

### Scylla

We use Scylla as our main NoSQL database. Scylla is a re-write of Apache Cassandra in C++. Scylla is faster and less resource intensive than Cassandra, and is fully compatible with Cassandra libraries. Scylla allows us to serve more traffic while keeping costs low. [Check it out](https://www.scylladb.com/)

### RabbitMQ

We use RabbitMQ as our queue broker - for creating long-running jobs and running jobs. [Check it out ](https://www.rabbitmq.com/)

### Kafka

We use Apache Kafka for inter-service event-driven communication. All services that are asynchronous and event driven use Kafka messages for communication.[ Check it out](https://kafka.apache.org/)





