This is a graphql gateway using apollo federation.

Right now it is running the nodejs federation gateway. However, in the future we should move to the apollo rust-based
federation gateway https://github.com/apollographql/router.

To migrate to the Rust-based gateway, we need a custom relay plugin:

- The relay plugin needs to take in "node(id: ID!)" requests and return the specific object back, and only allow objects
  that are using the Node interface (see current apollo-gateway.ts implementation)
