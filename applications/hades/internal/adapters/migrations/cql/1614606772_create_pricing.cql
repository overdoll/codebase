CREATE TABLE IF NOT EXISTS club_supporter_subscription_pricing
(
    club_id  text,
    price    bigint,
    currency text,
    primary key ( club_id ),
);
