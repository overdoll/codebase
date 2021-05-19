---
description: "\U0001F467"
---

# Eva

**Language:** [Go](https://golang.org/)

**Maintainers:** [nikita-tkachov](https://github.com/nikita-tkachov)

## Introduction

Eva is responsible for handling all user-related database calls, including fetching specific users, creating authentication tokens and updating user details.

## Technology

### GRPC

Like many of other services, Eva uses GRPC as the method of communication. [Check it out](https://grpc.io/)

### Scylla/Cassandra

Eva interacts with the Scylla database. Specifically, it owns the **eva** keyspace

## Layout

The layout consists of the following:

- **migrations** - CQL files with instructions on how to create the keyspace & table ownership
- **proto** - protobuf definition files used to construct functions
- **src**
  - **models** - Models created specifically for the server
  - **server** - Files implementing GRPC functions & calls

###
