CREATE TABLE users
(
    username text,
    primary key ( username )
);

CREATE TABLE users_emails
(
    email    text,
    username text,
    primary key ( email, username )
);

CREATE TABLE authentication_cookies
(
    cookie     uuid,
    email      text,
    redeemed   int,
    expiration timestamp,
    primary key ( cookie, email )
);