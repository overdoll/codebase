// Passport middleware will add the passport from the session store into the request body,
// and modify the session's passport if the response contains a passport in the body
// NOTE: this should only be done in the GraphQL API gateway, since our graphql endpoints may modify the passport
export default (req, res) => {
  res.json({
    coverage: global.__coverage__ || null,
  });
};
