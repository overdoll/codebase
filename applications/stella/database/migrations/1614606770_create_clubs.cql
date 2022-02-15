CREATE TABLE IF NOT EXISTS account_clubs
(
    account_id text,
    club_id    text,
    primary key ( account_id, club_id )
);

CREATE TABLE IF NOT EXISTS clubs
(
    id                    text,
    slug                  text,
    slug_aliases          set<text>,
    name                  map<text, text>,
    suspended             boolean,
    suspended_until       timestamp,
    members_count         int,
    thumbnail_resource_id text,
    owner_account_id      text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS clubs_slugs
(
    slug    text,
    club_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS club_members
(
    club_id           text,
    member_account_id text,
    bucket            timeuuid,
    joined_at         timeuuid,
    is_supporter      boolean,
    supporter_since   timestamp,
    deleted           boolean,
    primary key ( (club_id, member_account_id) )
);

CREATE TABLE IF NOT EXISTS club_members_by_account
(
    club_id           text,
    member_account_id text,
    bucket            timeuuid,
    joined_at         timeuuid,
    is_supporter      boolean,
    supporter_since   timestamp,
    primary key ( member_account_id, joined_at, club_id )
) WITH CLUSTERING ORDER BY (joined_at ASC, club_id ASC);

CREATE TABLE IF NOT EXISTS club_members_by_club
(
    club_id           text,
    bucket            timeuuid,
    member_account_id text,
    joined_at         timeuuid,
    is_supporter      boolean,
    supporter_since   timestamp,
    primary key ( (club_id, bucket), joined_at, member_account_id )
) WITH CLUSTERING ORDER BY (joined_at ASC);

CREATE TABLE IF NOT EXISTS club_members_partitions
(
    club_id              text,
    bucket               timeuuid,
    last_joined_at_count timeuuid,
    members_count        int,
    max_members_count    int,
    primary key ( club_id, bucket )
);

CREATE TABLE IF NOT EXISTS account_clubs_support
(
    account_id             text,
    club_id                text,
    status                 text,
    supporter_since        timestamp,
    last_billing_date      timestamp,
    next_billing_date      timestamp,
    billing_amount         text,
    billing_currency       text,

    address_line_1         text,
    city                   text,
    state                  text,
    country                text,
    postal_code            text,

    first_name             text,
    last_name              text,
    phone_number           text,
    email                  text,

    card_bin               text,
    card_type              text,
    card_last4             text,
    card_expiration        text,

    ccbill_subscription_id text,

    primary key ( account_id, club_id, ccbill_subscription_id )
);

CREATE TABLE IF NOT EXISTS account_saved_payment_methods
(
    account_id      text,
    id              text,

    address_line_1  text,
    city            text,
    state           text,
    country         text,
    postal_code     text,

    first_name      text,
    last_name       text,
    phone_number    text,
    email           text,

    card_bin        text,
    card_type       text,
    card_last4      text,
    card_expiration text,

    is_ccbill       boolean,
    primary key ( account_id, id )
);

CREATE TABLE IF NOT EXISTS account_transaction_history
(
    ccbill_subscription_id     text,
    ccbill_transaction_id      text,

    account_id                 text,
    bucket                     text,
    id                         text,

    transaction_type           text,

    supporting_club_id         text,

    address_line_1             text,
    city                       text,
    state                      text,
    country                    text,
    postal_code                text,

    first_name                 text,
    last_name                  text,
    phone_number               text,
    email                      text,

    card_bin                   text,
    card_type                  text,
    card_last4                 text,
    card_expiration            text,

    amount                     text,
    currency                   text,

    is_recurring               boolean,

    billing_failure_retry_date timestamp,

    billed_at_date             timestamp,
    next_billing_date          timestamp,

    ccbill_error_text          text,
    ccbill_error_code          text,
    ccbill_reason              text,
    primary key ( (account_id, bucket), id )
);

CREATE TABLE IF NOT EXISTS ccbill_subscription_billing_details_mapping
(
    ccbill_subscription_id text,

    address_line_1         text,
    city                   text,
    state                  text,
    country                text,
    postal_code            text,

    first_name             text,
    last_name              text,
    phone_number           text,
    email                  text,

    card_bin               text,
    card_type              text,
    card_last4             text,
    card_expiration        text,

    supporting_club_id     text,
    initiator_account_id   text,
    primary key ( ccbill_subscription_id )
);
