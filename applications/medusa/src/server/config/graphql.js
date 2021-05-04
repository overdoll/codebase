export default {
  path: '/api/graphql',
  serviceList: [
    { name: 'eva', url: 'http://eva:8000/graphql' },
    { name: 'sting', url: 'http://sting:8000/graphql' },
  ],
  persistedQueries: true,
};
