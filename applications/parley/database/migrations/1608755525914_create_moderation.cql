CREATE TABLE IF NOT EXISTS moderators
(
    user_id       text,
    last_selected timestamp,
    primary key ( user_id ),
);

CREATE TABLE IF NOT EXISTS pending_posts_audit_log
(
    id                        text,
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
    primary key ( moderator_user_id, id ),
);

CREATE TABLE IF NOT EXISTS users_audit_log
(
    id                      text,
    user_id                 text,
    user_username           text,
    moderator_user_id       text,
    moderator_user_username text,
    infraction_id           text,
    notes                   text,
    reverted                boolean,
    primary key ( user_id, id ),
);

CREATE TABLE IF NOT EXISTS users_infraction_history
(
    id         text,
    user_id    text,
    reason     text,
    expiration timestamp,
    primary key ( user_id, id, expiration),
);

CREATE TABLE IF NOT EXISTS pending_posts_rejection_reasons
(
    id         text,
    reason     text,
    infraction boolean,
    primary key ( (id) ),
);