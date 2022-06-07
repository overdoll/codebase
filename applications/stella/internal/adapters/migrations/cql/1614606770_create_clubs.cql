CREATE TABLE IF NOT EXISTS account_clubs
(
    account_id text,
    club_id    text,
    primary key ( account_id, club_id )
);

CREATE TABLE IF NOT EXISTS account_supported_clubs
(
    account_id text,
    club_id    text,
    primary key ( account_id, club_id )
);

CREATE TABLE IF NOT EXISTS clubs
(
    id                              text,
    slug                            text,
    slug_aliases                    set<text>,
    name                            map<text, text>,
    suspended                       boolean,
    suspended_until                 timestamp,
    members_count                   int,
    members_count_last_update_id    timeuuid,
    thumbnail_resource_id           text,
    owner_account_id                text,
    next_supporter_post_time        timestamp,
    has_created_supporter_only_post boolean,
    terminated                      boolean,
    terminated_by_account_id        text,
    created_at                      timestamp,
    primary key ( id )
);

-- CALL create_clubs_index;

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
    joined_at         timestamp,
    is_supporter      boolean,
    supporter_since   timestamp,
    primary key ( (club_id, member_account_id) )
);

-- CALL create_club_members_index;

CREATE TABLE IF NOT EXISTS club_members_by_account
(
    club_id           text,
    member_account_id text,
    primary key ( member_account_id, club_id )
);

CREATE TABLE IF NOT EXISTS club_suspension_log
(
    club_id               text,
    id                    text,
    action_account_id     text,
    is_suspension_removal boolean,
    reason                text,
    suspended_until       timestamp,
    primary key ( club_id, id )
) WITH CLUSTERING ORDER BY (id ASC);
