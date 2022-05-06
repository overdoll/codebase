CREATE TABLE IF NOT EXISTS cancellation_reasons
(
    bucket     int,
    id         text,
    title      map<text, text>,
    deprecated boolean,
    primary key ( bucket, id ),
) WITH CLUSTERING ORDER BY (id DESC);

CREATE TABLE IF NOT EXISTS account_club_supporter_subscriptions
(
    account_id                      text,
    club_id                         text,
    status                          text,
    supporter_since                 timestamp,
    last_billing_date               date,
    next_billing_date               date,
    billing_amount                  bigint,
    billing_currency                text,

    created_at                      timestamp,
    cancelled_at                    timestamp,
    expired_at                      timestamp,

    failed_at                       timestamp,
    ccbill_error_text               text,
    ccbill_error_code               text,
    billing_failure_next_retry_date date,

    encrypted_payment_method        text,

    id                              text,
    ccbill_subscription_id          text,

    updated_at                      timestamp,

    cancellation_reason_id          text,

    primary key ( id )
);

CREATE TABLE IF NOT EXISTS club_active_supporter_subscriptions
(
    bucket                 int,
    club_id                text,
    id                     text,
    ccbill_subscription_id text,
    primary key ( (bucket, club_id), id )
);

CREATE TABLE IF NOT EXISTS account_club_supporter_subscriptions_by_account
(
    account_id                      text,
    club_id                         text,
    status                          text,
    supporter_since                 timestamp,
    last_billing_date               date,
    next_billing_date               date,
    billing_amount                  bigint,
    billing_currency                text,

    created_at                      timestamp,
    cancelled_at                    timestamp,
    expired_at                      timestamp,

    failed_at                       timestamp,
    ccbill_error_text               text,
    ccbill_error_code               text,
    billing_failure_next_retry_date date,

    encrypted_payment_method        text,

    id                              text,
    ccbill_subscription_id          text,

    updated_at                      timestamp,

    cancellation_reason_id          text,

    primary key ( account_id, id )
);

CREATE INDEX account_club_supporter_subscriptions_by_account_status ON account_club_supporter_subscriptions_by_account (status);

CREATE TABLE IF NOT EXISTS exp_account_club_supporter_subscriptions_by_acc
(
    account_id             text,
    club_id                text,
    supporter_since        timestamp,
    expired_at             timestamp,
    cancelled_at           timestamp,
    ccbill_subscription_id text,
    primary key ( account_id, club_id )
);

CREATE TABLE IF NOT EXISTS account_saved_payment_methods
(
    account_id               text,
    id                       text,

    currency                 text,

    encrypted_payment_method text,

    updated_at               timestamp,

    ccbill_subscription_id   text,
    primary key ( account_id, id )
);

CREATE TABLE IF NOT EXISTS account_transactions
(
    id                             text,
    account_id                     text,

    timestamp                      timestamp,

    transaction_type               text,

    club_supporter_subscription_id text,

    encrypted_payment_method       text,

    amount                         bigint,
    currency                       text,

    voided_at                      timestamp,
    void_reason                    text,

    billed_at_date                 date,
    next_billing_date              date,

    ccbill_subscription_id         text,
    ccbill_transaction_id          text,

    events                         list<text>,

    primary key ( id )
);

CREATE TABLE IF NOT EXISTS ccbill_subscription_details
(
    ccbill_subscription_id       text,

    encrypted_payment_method     text,

    supporting_club_id           text,
    initiator_account_id         text,

    updated_at                   timestamp,

    subscription_initial_price   bigint,
    subscription_recurring_price bigint,
    subscription_currency        text,

    billed_initial_price         bigint,
    billed_recurring_price       bigint,
    billed_currency              text,

    accounting_initial_price     bigint,
    accounting_recurring_price   bigint,
    accounting_currency          text,

    idempotency_key              text,
    duplicate                    boolean,

    primary key ( ccbill_subscription_id )
);

CREATE TABLE IF NOT EXISTS receipt_files
(
    id                           text,

    account_transaction_id       text,
    account_transaction_event_id text,

    file_path                    text,
    temporal_workflow_id         text,

    primary key ( id )
);

CREATE TABLE IF NOT EXISTS club_all_transactions
(
    club_id   text,
    bucket    int,
    timestamp timeuuid,
    id        text,
    amount    bigint,
    currency  text,
    primary key ( (club_id, bucket), timestamp, id )
) WITH CLUSTERING ORDER BY (timestamp ASC);

CREATE TABLE IF NOT EXISTS club_refund_transactions
(
    club_id   text,
    bucket    int,
    timestamp timeuuid,
    id        text,
    amount    bigint,
    currency  text,
    primary key ( (club_id, bucket), timestamp, id )
) WITH CLUSTERING ORDER BY (timestamp ASC);

CREATE TABLE IF NOT EXISTS club_chargeback_transactions
(
    club_id   text,
    bucket    int,
    timestamp timeuuid,
    id        text,
    amount    bigint,
    currency  text,
    primary key ( (club_id, bucket), timestamp, id )
) WITH CLUSTERING ORDER BY (timestamp ASC);

CREATE TABLE IF NOT EXISTS club_transaction_metrics
(
    club_id                                text,
    timestamp                              timestamp,
    bucket                                 int,

    currency                               text,

    total_transactions_count               bigint,
    total_transactions_amount              bigint,
    total_transactions_last_update_id      timeuuid,

    chargeback_transactions_count          bigint,
    chargeback_transactions_amount         bigint,
    chargeback_transactions_last_update_id timeuuid,

    refund_transactions_count              bigint,
    refund_transactions_amount             bigint,
    refund_transactions_last_update_id     timeuuid,
    primary key ( (club_id, bucket) )
);

CREATE TABLE IF NOT EXISTS club_transaction_metrics_buckets
(
    club_id text,
    bucket  int,
    primary key ( (club_id), bucket )
);

CREATE TABLE IF NOT EXISTS club_chargeback_suspensions
(
    club_id text,
    bucket  int,
    primary key ( (club_id, bucket) )
);
