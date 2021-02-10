---
description: "\U0001F47F"
---

# Hades

**Language:** [Go](https://golang.org/)

**Maintainers:** [nikita-tkachov](https://github.com/nikita-tkachov)

## Introduction

Hades is responsible as the entryway to all API calls and functions. Hades builds resolvers for each GraphQL call with Go, and determines which service will handle the call, depending on the action. Hades does not interact with databases, instead it uses various services to handle a mutation or a query action.

## Technology

### GQLGen

gqlgen is the GraphQL framework used by Hades. [Check it out](https://gqlgen.com/)

### Gin

Gin is the router used by Hades. Gin allows us to easily write middleware to handle authentication & authorization through microservices. [Check it out](https://github.com/gin-gonic/gin)

## Layout

The layout consists of the following:

* **schemas** - gqlgen schema files. Using these files, Go functions are generated which are then implemented
* **src** 
  * **authentication** - Code to handle authentication & authorization
  * **directives** - GraphQL directive implementations
  * **extensions** - Custom GraphQL extensions, such as Automatic Persisted Queries
  * **helpers** - Any helper functions
  * **middleware** - Custom-written middleware
  * **models** - GraphQL models & custom models
  * **resolvers** - GraphQL resolvers
  * **services** - Registered services for microservices



