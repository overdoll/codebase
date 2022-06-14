CREATE TABLE IF NOT EXISTS categories
(
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           int,
    total_posts           int,
    created_at            timestamp,
    primary key ( id )
);

-- CALL create_categories_index;

CREATE TABLE IF NOT EXISTS categories_slugs
(
    slug        text,
    category_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS characters
(
    id                    text,
    slug                  text,
    name                  map<text, text>,
    thumbnail_resource_id text,
    series_id             text,
    total_likes           int,
    total_posts           int,
    created_at            timestamp,
    primary key ( id )
);

-- CALL create_characters_index;

CREATE TABLE IF NOT EXISTS characters_slugs
(
    slug         text,
    series_id    text,
    character_id text,
    primary key ( (slug, series_id) )
);

CREATE TABLE IF NOT EXISTS series
(
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           int,
    total_posts           int,
    created_at            timestamp,
    primary key ( id )
);

-- CALL create_series_index;

CREATE TABLE IF NOT EXISTS series_slugs
(
    slug      text,
    series_id text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS audience
(
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           int,
    total_posts           int,
    standard              int,
    created_at            timestamp,
    primary key ( id )
);

-- CALL create_audience_index;

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
    posted_at                           timestamp,
    primary key ( id )
);

-- CALL create_posts_index;

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

CREATE TABLE IF NOT EXISTS terminated_clubs
(
    bucket  int,
    club_id text,
    primary key ( bucket, club_id )
);
