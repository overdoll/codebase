CREATE TABLE IF NOT EXISTS authentication_cookies
(
    cookie     text,
    email      text,
    session    text,
    redeemed   int,
    expiration timestamp,
    primary key ( cookie, email )
);

CREATE TABLE IF NOT EXISTS users
(
    id            text,
    username      text,
    email         text,
    roles         list<text>,
    verified      boolean,
    avatar        text,
    locked        boolean,
    locked_until  int,
    locked_reason text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS users_emails
(
    user_id text,
    email   text,
    primary key ( email )
);

CREATE TABLE IF NOT EXISTS users_usernames
(
    user_id  text,
    username text,
    primary key ( username )
);
