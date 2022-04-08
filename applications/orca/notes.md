This is a graphql gateway using apollo federation.

Right now it is running the nodejs federation gateway. However, in the future we should move to the apollo rust-based
federation gateway https://github.com/apollographql/router.

This also contains the rust-based gateway but right now it has a few bugs that prevent us from using it.

Once they're fixed, one plugin needs to be created:

- Accept "node()" queries and send back results in the gateway
