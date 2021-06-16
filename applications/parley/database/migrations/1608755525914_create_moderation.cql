CREATE TABLE IF NOT EXISTS moderators
(
    bucket        int,
    user_id       text,
    last_selected timestamp,
    primary key ( bucket, user_id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_log
(
    id                  text,
    moderator_user_id   text,
    bucket              int,
    created_ms          int,
    post_id             text,
    contributor_user_id text,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_logs_by_post
(
    post_id             text,
    id                  text,
    moderator_user_id   text,
    bucket              int,
    created_ms          int,
    contributor_user_id text,
    primary key ( post_id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_logs_by_moderator
(
    id                        text,
    bucket                    int,
    created_ms                int,
    post_id                   text,
    contributor_user_id       text,
    contributor_user_username text,
    moderator_user_id         text,
    moderator_user_username   text,
    user_infraction_id        text,
    status                    text,
    reason                    text,
    notes                     text,
    reverted                  boolean,
    primary key ( (moderator_user_id, bucket), created_ms, contributor_user_id, post_id, id ),
) WITH CLUSTERING ORDER BY (created_ms DESC, contributor_user_id DESC, post_id DESC, id DESC);

CREATE INDEX IF NOT EXISTS pending_posts_audit_logs_by_moderator_status on pending_posts_audit_logs_by_moderator (status);

CREATE TABLE IF NOT EXISTS users_infraction_history
(
    id         text,
    user_id    text,
    reason     text,
    expiration timestamp,
    primary key ( user_id, id),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS pending_posts_rejection_reasons
(
    bucket     int,
    id         text,
    reason     text,
    infraction boolean,
    primary key ( bucket , id ),
);

