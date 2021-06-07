CREATE TABLE IF NOT EXISTS moderators
(
    user_id                text,
    pending_posts_shuffled int,
    last_selected          timestamp,
    primary key ( (user_id), last_selected ),
) WITH CLUSTERING ORDER BY (last_selected DESC, user_id ASC);

CREATE TABLE IF NOT EXISTS pending_posts_audit_log
(
    id                 text,
    post_id            text,
    moderator_id       text,
    moderator_username text,
    status             text,
    reason             text,
    notes              text,
    reverted           boolean,
    primary key ( (id), post_id, moderator_id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS users_audit_log
(
    id                 text,
    user_id            text,
    user_username      text,
    moderator_id       text,
    moderator_username text,
    infraction_id      text,
    notes              text,
    reverted           boolean,
    primary key ( (id), user_id, moderator_id, infraction_id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS users_infraction_history
(
    id         text,
    user_id    text,
    reason     text,
    expiration timestamp,
    primary key ( (id), user_id, expiration ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS pending_posts_rejection_reasons
(
    id         text,
    reason     text,
    infraction boolean,
    primary key ( (id) ),
) WITH CLUSTERING ORDER BY (id DESC);