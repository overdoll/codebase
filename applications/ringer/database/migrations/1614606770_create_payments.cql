CREATE TABLE IF NOT EXISTS club_balance
(
    club_id                text,
    currency               text,
    amount                 bigint,
    pending_payment_id     text,
    pending_payment_amount bigint,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS club_pending_balance
(
    club_id                text,
    currency               text,
    amount                 bigint,
    pending_payment_id     text,
    pending_payment_amount bigint,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS club_platform_fee
(
    club_id     text,
    fee_percent int,
    primary key ( club_id ),
);

CREATE TABLE IF NOT EXISTS payments_by_transaction_id
(
    account_transaction_id text,
    id                     text,
    primary key ( account_transaction_id ),
);

CREATE TABLE IF NOT EXISTS payments
(
    id                          text,
    source                      text,
    status                      text,
    state                       text,
    settlement_date             timestamp,
    source_account_id           text,
    account_transaction_id      text,
    destination_club_id         text,
    base_amount                 bigint,
    base_currency               text,
    platform_fee_amount         bigint,
    final_amount                bigint,
    is_deduction                boolean,
    deduction_source_payment_id text,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS club_ready_payments
(
    club_id      text,
    payment_id   text,
    final_amount bigint,
    primary key ( club_id, payment_id ),
);

CREATE TABLE IF NOT EXISTS account_payout_method
(
    id             text,
    account_id     text,
    kind           text,
    opennode_email text,
    is_default     boolean,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS account_payout_method_by_account
(
    id             text,
    account_id     text,
    kind           text,
    opennode_email text,
    is_default     boolean,
    primary key ( account_id, id ),
);

CREATE TABLE IF NOT EXISTS payouts
(
    id                       text,
    status                   text,
    payout_date              timestamp,
    club_id                  text,
    total_amount             bigint,
    currency                 text,
    account_payout_method_id text,
    primary key ( id ),
);

CREATE TABLE IF NOT EXISTS payouts_by_club
(
    club_id                  text,
    id                       text,
    status                   text,
    payout_date              timestamp,
    total_amount             bigint,
    currency                 text,
    account_payout_method_id text,
    primary key ( club_id, id ),
);

CREATE TABLE IF NOT EXISTS payments_by_payout
(
    payout_id                   text,
    payment_id                  text,
    source                      text,
    status                      text,
    state                       text,
    settlement_date             timestamp,
    source_account_id           text,
    account_transaction_id      text,
    destination_club_id         text,
    base_amount                 bigint,
    base_currency               text,
    platform_fee_amount         bigint,
    final_amount                bigint,
    is_deduction                boolean,
    deduction_source_payment_id text,
    primary key ( payout_id, payment_id ),
);

CREATE TABLE IF NOT EXISTS deposit_requests_by_month
(
    bucket                     int,
    id                         text,
    last_date_for_deposit      timestamp,
    total_amount               bigint,
    currency                   text,
    account_payout_method_kind text,
    primary key ( bucket, id ),
);

CREATE TABLE IF NOT EXISTS payouts_by_deposit_requests
(
    requested_deposit_id     text,
    id                       text,
    status                   text,
    payout_date              timestamp,
    club_id                  text,
    total_amount             bigint,
    currency                 text,
    account_payout_method_id text,
    primary key ( requested_deposit_id, id ),
);
