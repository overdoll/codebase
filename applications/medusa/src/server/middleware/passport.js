// Passport middleware will add the passport from the session store into the request body,
// and modify the session's passport if the response contains a passport in the body
// NOTE: this should only be done in the GraphQL API gateway, since our graphql services will issue or modify the passport
export default (req, res, next) => {
  if (!req.body.passport) {
    req.body.passport = req.session.passport;
  }

  if (res.body.passport) {
    req.session.passport = res.body.passport;
    req.session.save(function(err) {});
    delete res.body.passport;
  }

  next();
};
