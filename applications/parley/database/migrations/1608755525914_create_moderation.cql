CREATE TABLE IF NOT EXISTS moderators
(
    bucket        int,
    account_id    text,
    last_selected timestamp,
    primary key ( bucket, account_id ),
);

CREATE TABLE IF NOT EXISTS rules
(
    bucket      int,
    id          text,
    title       map<text, text>,
    description map<text, text>,
    deprecated  boolean,
    infraction  boolean,
    options     text,
    primary key ( bucket, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS club_infraction_history
(
    id                     text,
    club_id                text,
    issuer_account_id      text,
    infraction_id          text,
    source                 text,
    club_suspension_length int,
    issued_at              timestamp,
    expires_at             timestamp,
    primary key ( club_id, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_audit_logs
(
    id                   text,
    bucket               int,
    post_id              text,
    moderator_account_id text,
    action               text,
    rule_id              text,
    notes                text,
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
    primary key ( (moderator_account_id, bucket), id ),
) WITH CLUSTERING ORDER BY (id DESC);


CREATE TABLE IF NOT EXISTS post_reports
(
    id                   text,
    post_id              text,
    bucket               int,
    reporting_account_id text,
    rule_id              text,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS post_reports_by_post
(
    post_id              text,
    bucket               int,
    id                   text,
    reporting_account_id text,
    rule_id              text,
    primary key ( (post_id, bucket), id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS post_report_for_account_and_post
(
    post_id              text,
    reporting_account_id text,
    bucket               int,
    id                   text,
    rule_id              text,
    primary key ( (post_id, reporting_account_id) ),
);
