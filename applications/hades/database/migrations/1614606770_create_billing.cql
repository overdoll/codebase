CREATE TABLE IF NOT EXISTS account_club_supporter_subscriptions
(
    account_id               text,
    club_id                  text,
    status                   text,
    supporter_since          timestamp,
    last_billing_date        timestamp,
    next_billing_date        timestamp,
    billing_amount           float,
    billing_currency         text,

    cancelled_at             timestamp,

    encrypted_payment_method text,

    id                       text,
    ccbill_subscription_id   text,

    updated_at               timestamp,

    primary key ( account_id, club_id, id )
);

CREATE TABLE IF NOT EXISTS account_saved_payment_methods
(
    account_id               text,
    id                       text,

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

    amount                     float,
    currency                   text,

    is_recurring               boolean,

    billing_failure_retry_date timestamp,

    billed_at_date             timestamp,
    next_billing_date          timestamp,

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

    subscription_initial_price   float,
    subscription_recurring_price float,
    subscription_currency        text,

    billed_initial_price         float,
    billed_recurring_price       float,
    billed_currency              text,

    accounting_initial_price     float,
    accounting_recurring_price   float,
    accounting_currency          text,

    idempotency_key              text,

    primary key ( ccbill_subscription_id )
);
