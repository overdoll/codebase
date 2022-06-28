CREATE TABLE IF NOT EXISTS moderators
(
    bucket        int,
    account_id    text,
    last_selected timestamp,
    primary key ( bucket, account_id ),
);

CREATE TABLE IF NOT EXISTS account_post_moderators_queue
(
    account_id      text,
    sort_key        timeuuid,
    post_id         text,
    placed_at       timestamp,
    reassignment_at timestamp,
    primary key ( account_id, sort_key ),
) WITH CLUSTERING ORDER BY (sort_key DESC);

CREATE TABLE IF NOT EXISTS post_moderators
(
    account_id      text,
    post_id         text,
    sort_key        timeuuid,
    placed_at       timestamp,
    reassignment_at timestamp,
    primary key ( post_id ),
);

CREATE TABLE IF NOT EXISTS rules
(
    bucket      int,
    id          text,
    title       map<text, text>,
    description map<text, text>,
    deprecated  boolean,
    infraction  boolean,
    primary key ( bucket, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS club_infraction_history
(
    id                     text,
    club_id                text,
    issuer_account_id      text,
    rule_id                text,
    source                 text,
    club_suspension_length int,
    issued_at              timestamp,
    expires_at             timestamp,
    primary key ( club_id, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_rules
(
    post_id text,
    rule_id text,
    primary key ( post_id ),
);

CREATE TABLE IF NOT EXISTS post_audit_logs
(
    id                   text,
    bucket               int,
    post_id              text,
    moderator_account_id text,
    action               text,
    rule_id              text,
    notes                text,
    created_at           timestamp,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS post_audit_logs_by_post
(
    post_id              text,
    id                   text,
    moderator_account_id text,
    bucket               int,
    action               text,
    rule_id              text,
    notes                text,
    created_at           timestamp,
    primary key ( post_id, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_audit_logs_by_moderator
(
    id                   text,
    bucket               int,
    post_id              text,
    moderator_account_id text,
    action               text,
    rule_id              text,
    notes                text,
    created_at           timestamp,
    primary key ( (moderator_account_id, bucket), id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_audit_logs_by_moderator_buckets
(
    moderator_account_id text,
    bucket               int,
    primary key ( (moderator_account_id), bucket ),
) WITH CLUSTERING ORDER BY (bucket DESC);

CREATE TABLE IF NOT EXISTS post_reports
(
    post_id              text,
    bucket               int,
    reporting_account_id text,
    rule_id              text,
    created_at           timestamp,
    primary key ( (post_id, reporting_account_id) ),
);

CREATE TABLE IF NOT EXISTS post_report_by_account_buckets
(
    reporting_account_id text,
    bucket               int,
    primary key ( reporting_account_id, bucket ),
);

CREATE TABLE IF NOT EXISTS post_report_by_account
(
    post_id              text,
    reporting_account_id text,
    bucket               int,
    rule_id              text,
    created_at           timestamp,
    primary key ( (bucket, reporting_account_id), post_id ),
);
