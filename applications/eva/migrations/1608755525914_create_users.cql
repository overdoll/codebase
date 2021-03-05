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
    email    text,
    roles    list<text>,
    verified boolean,
    primary key ( id )
);

CREATE TABLE users_emails
(
    user_id uuid,
    email   text,
    primary key ( email )
);

CREATE TABLE users_usernames
(
    user_id  uuid,
    username text,
    primary key ( username )
);
