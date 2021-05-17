export default {
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    path: '/',
    httpOnly: true,
    secure: false,
    maxAge: 28800000,
    signed: true,
  },
};
