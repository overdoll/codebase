CREATE TABLE IF NOT EXISTS accounts
(
    id                             text,
    username                       text,
    email                          text,
    roles                          list<text>,
    avatar_resource                text,
    locked                         boolean,
    locked_until                   timestamp,
    deleting                       boolean,
    scheduled_deletion_at          timestamp,
    scheduled_deletion_workflow_id text,
    deleted                        boolean,
    last_username_edit             timestamp,
    multi_factor_enabled           boolean,
    created_at                     timestamp,
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
) WITH CLUSTERING ORDER BY (email DESC);

CREATE TABLE IF NOT EXISTS account_usernames
(
    account_id text,
    username   text,
    primary key ( username )
);

CREATE TABLE IF NOT EXISTS account_multi_factor_totp
(
    account_id text,
    secret     text,
    primary key ( account_id )
);

CREATE TABLE IF NOT EXISTS account_multi_factor_recovery_codes
(
    account_id text,
    code       text,
    primary key ( account_id, code )
);
