CREATE TABLE IF NOT EXISTS moderators
(
    bucket        int,
    account_id    text,
    last_selected timestamp,
    primary key ( bucket, account_id ),
);

CREATE TABLE IF NOT EXISTS post_audit_logs
(
    id                   text,
    moderator_account_id text,
    bucket               int,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS post_audit_logs_by_post
(
    post_id                text,
    id                     text,
    moderator_account_id   text,
    bucket                 int,
    contributor_account_id text,
    account_infraction_id  text,
    action                 text,
    rejection_reason       text,
    notes                  text,
    reverted               boolean,
    primary key ( post_id, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_audit_logs_by_moderator
(
    id                     text,
    bucket                 int,
    post_id                text,
    contributor_account_id text,
    moderator_account_id   text,
    account_infraction_id  text,
    action                 text,
    rejection_reason       text,
    notes                  text,
    reverted               boolean,
    primary key ( (moderator_account_id, bucket), id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS account_infraction_history
(
    id                    text,
    account_id            text,
    post_rejection_reason text,
    expiration            timestamp,
    primary key ( account_id, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_rejection_reasons
(
    bucket     int,
    id         text,
    reason     text,
    infraction boolean,
    primary key ( bucket, id ),
);

CREATE TABLE IF NOT EXISTS post_report_reasons
(
    bucket int,
    id     text,
    reason text,
    primary key ( bucket, id ),
);

CREATE TABLE IF NOT EXISTS post_reports
(
    id                   text,
    reporting_account_id text,
    post_id              text,
    bucket               int,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS post_reports_by_post_and_reporting_account
(
    post_id              text,
    bucket               int,
    id                   text,
    reporting_account_id text,
    reason               text,
    primary key ( (post_id, bucket), reporting_account_id, id ),
) WITH CLUSTERING ORDER BY (reporting_account_id DESC, id DESC);