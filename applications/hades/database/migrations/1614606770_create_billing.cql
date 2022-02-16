CREATE TABLE IF NOT EXISTS account_clubs_support
(
    account_id               text,
    club_id                  text,
    status                   text,
    supporter_since          timestamp,
    last_billing_date        timestamp,
    next_billing_date        timestamp,
    billing_amount           float,
    billing_currency         text,

    encrypted_payment_method text,

    ccbill_subscription_id   text,

    primary key ( account_id, club_id )
);

CREATE TABLE IF NOT EXISTS account_saved_payment_methods
(
    account_id               text,
    id                       text,

    encrypted_payment_method text,

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

CREATE TABLE IF NOT EXISTS ccbill_subscription_billing_details_mapping
(
    ccbill_subscription_id   text,

    encrypted_payment_method text,

    supporting_club_id       text,
    initiator_account_id     text,
    primary key ( ccbill_subscription_id )
);
