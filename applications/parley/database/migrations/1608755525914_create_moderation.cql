CREATE TABLE IF NOT EXISTS moderators
(
    bucket        int,
    account_id    text,
    last_selected timestamp,
    primary key ( bucket, account_id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_log
(
    id                     text,
    moderator_account_id   text,
    bucket                 int,
    created_ms             int,
    post_id                text,
    contributor_account_id text,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_logs_by_post
(
    post_id                text,
    id                     text,
    moderator_account_id   text,
    bucket                 int,
    created_ms             int,
    contributor_account_id text,
    primary key ( post_id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_logs_by_moderator
(
    id                           text,
    bucket                       int,
    created_ms                   int,
    post_id                      text,
    contributor_account_id       text,
    contributor_account_username text,
    moderator_account_id         text,
    moderator_account_username   text,
    account_infraction_id        text,
    status                       text,
    reason                       text,
    notes                        text,
    reverted                     boolean,
    primary key ( (moderator_account_id, bucket), created_ms, contributor_account_id, post_id, id ),
) WITH CLUSTERING ORDER BY (created_ms DESC, contributor_account_id DESC, post_id DESC, id DESC);

CREATE INDEX IF NOT EXISTS pending_posts_audit_logs_by_moderator_status on pending_posts_audit_logs_by_moderator (status);

CREATE TABLE IF NOT EXISTS account_infraction_history
(
    id         text,
    account_id text,
    reason     text,
    expiration timestamp,
    primary key ( account_id, id),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS pending_posts_rejection_reasons
(
    bucket     int,
    id         text,
    reason     text,
    infraction boolean,
    primary key ( bucket , id ),
);

