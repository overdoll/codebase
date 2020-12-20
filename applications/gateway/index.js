const { ApolloServer } = require('apollo-server');
const { ApolloGateway } = require('@apollo/gateway');

const gateway = new ApolloGateway({
  serviceList: [{ name: 'go-service', url: 'http://go-service:8000/query' }],
});

const server = new ApolloServer({
  gateway,
  subscriptions: false,
  playground: false,
});

server.listen().then(({ url }) => {});
