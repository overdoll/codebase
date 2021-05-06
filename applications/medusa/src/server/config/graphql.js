export default {
  path: '/api/graphql',
  serviceList: [
    { name: 'eva', url: 'http://eva:8080/graphql' },
    { name: 'sting', url: 'http://sting:8080/graphql' },
  ],
  persistedQueries: true,
};
