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
    post_rejection_reason  text,
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
    post_rejection_reason  text,
    notes                  text,
    reverted               boolean,
    primary key ( (moderator_account_id, bucket), id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS account_infraction_history
(
    id                       text,
    account_id               text,
    post_rejection_reason_id text,
    expiration               timestamp,
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
    id                    text,
    post_id               text,
    bucket                int,
    reporting_account_id  text,
    post_report_reason_id text,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS post_reports_by_post
(
    post_id               text,
    bucket                int,
    id                    text,
    reporting_account_id  text,
    post_report_reason_id text,
    primary key ( (post_id, bucket), id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_report_for_account_and_post
(
    post_id               text,
    reporting_account_id  text,
    bucket                int,
    id                    text,
    post_report_reason_id text,
    primary key ( (post_id, reporting_account_id) ),
);