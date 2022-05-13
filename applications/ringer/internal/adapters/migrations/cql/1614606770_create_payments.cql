CREATE TABLE IF NOT EXISTS club_balance
(
    club_id        text,
    currency       text,
    amount         bigint,
    last_insert_id timeuuid,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS club_pending_balance
(
    club_id        text,
    currency       text,
    amount         bigint,
    last_insert_id timeuuid,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS club_platform_fee
(
    club_id text,
    percent int,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS club_payments_by_transaction_id
(
    account_transaction_id text,
    id                     text,
    primary key ( account_transaction_id ),
);

CREATE TABLE IF NOT EXISTS club_payments
(
    id                          text,
    source                      text,
    status                      text,
    settlement_date             timestamp,
    source_account_id           text,
    club_payout_ids             list<text>,
    account_transaction_id      text,
    destination_club_id         text,
    currency                    text,
    base_amount                 bigint,
    platform_fee_amount         bigint,
    final_amount                bigint,
    is_deduction                boolean,
    deduction_source_payment_id text,
    created_at                  timestamp,
    primary key ( id ),
);

-- CALL create_club_payments_index;

CREATE TABLE IF NOT EXISTS club_payments_by_payout
(
    payout_id  text,
    payment_id text,
    primary key ( payout_id, payment_id ),
);

CREATE TABLE IF NOT EXISTS club_ready_payments
(
    club_id      text,
    payment_id   text,
    currency     text,
    is_deduction boolean,
    final_amount bigint,
    primary key ( club_id, payment_id ),
);

CREATE TABLE IF NOT EXISTS account_payout_method
(
    account_id  text,
    method      text,
    paxum_email text,
    primary key ( account_id ),
);

CREATE TABLE IF NOT EXISTS club_payouts
(
    id                   text,
    status               text,
    deposit_date         timestamp,
    club_id              text,
    amount               bigint,
    currency             text,
    payout_account_id    text,
    deposit_request_id   text,
    created_at           timestamp,
    events               list<text>,
    temporal_workflow_id text,
    primary key ( id ),
);

-- CALL create_club_payouts_index;

CREATE TABLE IF NOT EXISTS club_locked_payout
(
    club_id   text,
    payout_id text,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS deposit_requests
(
    bucket                int,
    id                    text,
    last_date_for_deposit timestamp,
    base_amount           bigint,
    estimated_fee_amount  bigint,
    total_amount          bigint,
    currency              text,
    payout_method         text,
    payout_ids            list<text>,
    created_at            timestamp,
    last_insert_id        timeuuid,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS deposit_requests_by_month
(
    bucket                int,
    id                    text,
    last_date_for_deposit timestamp,
    base_amount           bigint,
    estimated_fee_amount  bigint,
    total_amount          bigint,
    currency              text,
    payout_method         text,
    payout_ids            list<text>,
    created_at            timestamp,
    last_insert_id        timeuuid,
    primary key ( bucket, id ),
);

CREATE TABLE IF NOT EXISTS deposit_requests_by_month_buckets
(
    init   int,
    bucket int,
    primary key ( init, bucket ),
) WITH CLUSTERING ORDER BY (bucket DESC);

CREATE TABLE IF NOT EXISTS account_details
(
    account_id                          text,
    first_name                          text,
    last_name                           text,
    country_of_residence_iso3166_alpha3 text,
    primary key ( account_id ),
);
