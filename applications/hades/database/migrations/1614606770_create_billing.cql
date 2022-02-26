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
    account_id               text,
    club_id                  text,
    status                   text,
    supporter_since          timestamp,
    last_billing_date        date,
    next_billing_date        date,
    billing_amount           double,
    billing_currency         text,

    cancelled_at             timestamp,

    encrypted_payment_method text,

    id                       text,
    ccbill_subscription_id   text,

    updated_at               timestamp,

    cancellation_reason_id   text,

    primary key ( account_id, club_id, id )
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

CREATE TABLE IF NOT EXISTS account_transaction_history
(
    account_id                 text,
    bucket                     int,
    id                         text,

    timestamp                  timestamp,

    transaction_type           text,

    supported_club_id          text,

    encrypted_payment_method   text,

    amount                     double,
    currency                   text,

    is_recurring               boolean,

    billing_failure_retry_date date,

    billed_at_date             date,
    next_billing_date          date,

    ccbill_error_text          text,
    ccbill_error_code          text,
    ccbill_reason              text,
    ccbill_subscription_id     text,
    ccbill_transaction_id      text,

    primary key ( id )
);

CREATE TABLE IF NOT EXISTS account_transaction_history_by_account
(
    account_id                 text,
    bucket                     int,
    id                         text,

    timestamp                  timestamp,

    transaction_type           text,

    supported_club_id          text,

    encrypted_payment_method   text,

    amount                     double,
    currency                   text,

    is_recurring               boolean,

    billing_failure_retry_date date,

    billed_at_date             date,
    next_billing_date          date,

    ccbill_error_text          text,
    ccbill_error_code          text,
    ccbill_reason              text,
    ccbill_subscription_id     text,
    ccbill_transaction_id      text,

    primary key ( (account_id, bucket), id )
);

CREATE TABLE IF NOT EXISTS ccbill_subscription_details
(
    ccbill_subscription_id       text,

    encrypted_payment_method     text,

    supporting_club_id           text,
    initiator_account_id         text,

    updated_at                   timestamp,

    subscription_initial_price   double,
    subscription_recurring_price double,
    subscription_currency        text,

    billed_initial_price         double,
    billed_recurring_price       double,
    billed_currency              text,

    accounting_initial_price     double,
    accounting_recurring_price   double,
    accounting_currency          text,

    idempotency_key              text,

    primary key ( ccbill_subscription_id )
);

CREATE TABLE IF NOT EXISTS receipt_files
(
    id                   text,

    file_path            text,
    temporal_workflow_id text,

    primary key ( id )
);
