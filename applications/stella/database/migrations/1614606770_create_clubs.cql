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
    deleted           boolean,
    primary key ( (club_id, member_account_id) )
);

CREATE TABLE IF NOT EXISTS club_members_by_account
(
    club_id           text,
    member_account_id text,
    bucket            timeuuid,
    joined_at         timeuuid,
    primary key ( member_account_id, joined_at, club_id )
) WITH CLUSTERING ORDER BY (joined_at ASC, club_id ASC);

CREATE TABLE IF NOT EXISTS club_members_by_club
(
    club_id           text,
    bucket            timeuuid,
    member_account_id text,
    joined_at         timeuuid,
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
