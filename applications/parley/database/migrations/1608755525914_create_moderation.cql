CREATE TABLE IF NOT EXISTS moderators
(
    bucket        text,
    user_id       text,
    last_selected timestamp,
    primary key ( bucket, user_id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_log
(
    id                        text,
    bucket                    int,
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
    primary key ( (moderator_user_id, bucket), contributor_user_id, post_id, id ),
) WITH CLUSTERING ORDER BY (contributor_user_id DESC, post_id DESC, id DESC);

CREATE INDEX IF NOT EXISTS pending_posts_audit_log_status on pending_posts_audit_log (status);

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
    bucket     text,
    id         text,
    reason     text,
    infraction boolean,
    primary key ( bucket , id ),
);

