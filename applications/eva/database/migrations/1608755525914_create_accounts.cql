CREATE TABLE IF NOT EXISTS accounts
(
    id                 text,
    username           text,
    email              text,
    roles              list<text>,
    verified           boolean,
    avatar             text,
    locked             boolean,
    locked_until       int,
    locked_reason      text,
    last_username_edit int,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS account_emails
(
    account_id text,
    email      text,
    primary key ( email )
);

CREATE TABLE IF NOT EXISTS emails_by_account
(
    account_id text,
    email      text,
    status     int,
    primary key ( account_id, email )
);

CREATE TABLE IF NOT EXISTS account_usernames
(
    account_id text,
    username   text,
    primary key ( username )
);

CREATE TABLE IF NOT EXISTS usernames_by_account
(
    account_id text,
    username   text,
    primary key ( account_id )
);