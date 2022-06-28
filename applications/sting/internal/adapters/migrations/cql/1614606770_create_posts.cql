CREATE TABLE IF NOT EXISTS terminated_clubs
(
    bucket  int,
    club_id text,
    primary key ( bucket, club_id )
);

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
    thumbnail_resource              text,
    owner_account_id                text,
    next_supporter_post_time        timestamp,
    has_created_supporter_only_post boolean,
    terminated                      boolean,
    terminated_by_account_id        text,
    created_at                      timestamp,
    updated_at                      timestamp,
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
    joined_at         timestamp,
    is_supporter      boolean,
    supporter_since   timestamp,
    primary key ( (club_id, member_account_id) )
);

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

CREATE TABLE IF NOT EXISTS categories
(
    id                 text,
    slug               text,
    title              map<text, text>,
    thumbnail_resource text,
    total_likes        int,
    total_posts        int,
    created_at         timestamp,
    updated_at         timestamp,
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
    id                 text,
    slug               text,
    name               map<text, text>,
    thumbnail_resource text,
    series_id          text,
    total_likes        int,
    total_posts        int,
    created_at         timestamp,
    updated_at         timestamp,
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
    id                 text,
    slug               text,
    title              map<text, text>,
    thumbnail_resource text,
    total_likes        int,
    total_posts        int,
    created_at         timestamp,
    updated_at         timestamp,
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
    id                 text,
    slug               text,
    title              map<text, text>,
    thumbnail_resource text,
    total_likes        int,
    total_posts        int,
    standard           int,
    created_at         timestamp,
    updated_at         timestamp,
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
    id                                  text,
    state                               text,
    likes                               bigint,
    likes_last_update_id                timeuuid,
    supporter_only_status               text,
    contributor_account_id              text,
    club_id                             text,
    audience_id                         text,
    category_ids                        list<text>,
    character_ids                       list<text>,
    series_ids                          list<text>,
    content_resource_ids                list<text>,
    content_resources                   map<text, text>,
    content_supporter_only              map<text, boolean>,
    content_supporter_only_resource_ids map<text, text>,
    created_at                          timestamp,
    updated_at                          timestamp,
    posted_at                           timestamp,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS post_likes
(
    bucket           int,
    post_id          text,
    liked_account_id text,
    liked_at         timestamp,
    primary key ( (post_id, liked_account_id) )
);

CREATE TABLE IF NOT EXISTS account_post_likes
(
    bucket           int,
    post_id          text,
    liked_account_id text,
    liked_at         timestamp,
    primary key ( (bucket, liked_account_id), post_id )
);

CREATE TABLE IF NOT EXISTS account_post_likes_buckets
(
    liked_account_id text,
    bucket           int,
    primary key ( liked_account_id, bucket )
);

CREATE TABLE IF NOT EXISTS curation_profile
(
    account_id            text,
    date_of_birth         date,
    audience_ids          list<text>,
    category_ids          list<text>,
    date_of_birth_skipped boolean,
    audience_ids_skipped  boolean,
    category_ids_skipped  boolean,
    primary key ( account_id )
);
