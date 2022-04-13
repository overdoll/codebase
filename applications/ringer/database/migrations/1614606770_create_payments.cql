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

CREATE TABLE IF NOT EXISTS club_payments
(
    id                          text,
    source                      text,
    status                      text,
    state                       text,
    settlement_date             timestamp,
    source_account_id           text,
    destination_club_id         text,
    base_amount                 bigint,
    base_currency               text,
    platform_fee_amount         bigint,
    final_amount                bigint,
    is_deduction                boolean,
    deduction_source_payment_id text,
    primary key ( id ),
);
