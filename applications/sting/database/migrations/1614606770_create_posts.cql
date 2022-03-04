CREATE TABLE IF NOT EXISTS categories
(
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           int,
    total_posts           int,
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
    id                    text,
    slug                  text,
    name                  map<text, text>,
    thumbnail_resource_id text,
    series_id             text,
    total_likes           int,
    total_posts           int,
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
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           int,
    total_posts           int,
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
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           int,
    total_posts           int,
    standard              int,
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
    supporter_only_status               text,
    moderator_account_id                text,
    contributor_account_id              text,
    club_id                             text,
    audience_id                         text,
    category_ids                        list<text>,
    character_ids                       list<text>,
    series_ids                          list<text>,
    content_resource_ids                list<text>,
    content_supporter_only              map<text, boolean>,
    content_supporter_only_resource_ids map<text, text>,
    created_at                          timestamp,
    posted_at                           timestamp,
    moderator_reassignment_at           timestamp,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS post_likes_counter
(
    post_id text,
    likes   counter,
    primary key ( post_id )
);

CREATE TABLE IF NOT EXISTS post_likes
(
    post_id          text,
    liked_account_id text,
    liked_at         timestamp,
    primary key ( (post_id, liked_account_id) )
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
