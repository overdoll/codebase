CREATE TABLE authentication_cookies
(
    cookie     uuid,
    email      text,
    session    text,
    redeemed   int,
    expiration timestamp,
    primary key ( cookie, email )
);

CREATE TABLE users
(
    id       uuid,
    username text,
    primary key ( id )
);

CREATE TABLE users_emails
(
    user_id  uuid,
    email    text,
    username text,
    primary key ( email, username )
);
