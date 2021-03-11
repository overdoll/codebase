CREATE TABLE authentication_cookies
(
    cookie     text,
    email      text,
    session    text,
    redeemed   int,
    expiration timestamp,
    primary key ( cookie, email )
);

CREATE TABLE users
(
    id       text,
    username text,
    email    text,
    roles    list<text>,
    verified boolean,
    avatar   text,
    primary key ( id )
);

CREATE TABLE users_emails
(
    user_id text,
    email   text,
    primary key ( email )
);

CREATE TABLE users_usernames
(
    user_id  text,
    username text,
    primary key ( username )
);
