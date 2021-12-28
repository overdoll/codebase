CREATE TABLE IF NOT EXISTS categories
(
    id        text,
    slug      text,
    title     map<text, text>,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS categories_slugs
(
    slug        text,
    category_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS characters
(
    id        text,
    slug      text,
    name      map<text, text>,
    thumbnail text,
    series_id text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS characters_slugs
(
    slug         text,
    series_id    text,
    character_id text,
    primary key ( (slug, series_id) )
);

CREATE TABLE IF NOT EXISTS series
(
    id        text,
    slug      text,
    title     map<text, text>,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS series_slugs
(
    slug      text,
    series_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS audience
(
    id        text,
    slug      text,
    title     map<text, text>,
    thumbnail text,
    standard  int,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS audience_slugs
(
    slug        text,
    audience_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS posts
(
    id                        text,
    state                     text,
    moderator_account_id      text,
    contributor_account_id    text,
    club_id                   text,
    audience_id               text,
    category_ids              list<text>,
    character_ids             list<text>,
    content                   list<text>,
    created_at                timestamp,
    posted_at                 timestamp,
    moderator_reassignment_at timestamp,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS clubs
(
    id               text,
    slug             text,
    slug_aliases     set<text>,
    name             map<text, text>,
    members_count    int,
    thumbnail        text,
    owner_account_id text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS clubs_slugs
(
    slug    text,
    club_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS club_members_by_account
(
    club_id      text,
    account_id   text,
    bucket       timeuuid,
    joined_at    timeuuid,
    is_supporter boolean,
    primary key ( (club_id, account_id) )
);

CREATE TABLE IF NOT EXISTS account_clubs
(
    club_id           text,
    member_account_id text,
    bucket            timeuuid,
    joined_at         timeuuid,
    is_supporter      boolean,
    primary key ( member_account_id, joined_at, club_id )
) WITH CLUSTERING ORDER BY (joined_at ASC, club_id ASC);

CREATE TABLE IF NOT EXISTS club_members
(
    club_id           text,
    bucket            timeuuid,
    member_account_id text,
    joined_at         timeuuid,
    is_supporter      boolean,
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
