// custom middleware to inject a csrf secret into the session -
// the default csurf middleware expects some sort of session storage but
// we also want access to the secret so we can send it on the SSR side
export default (req, res, next) => {
  req.csrf = {};

  if (req.cookies._csrf !== undefined) {
    req.csrf.csrfSecret = req.cookies._csrf;
  }

  next();
};
