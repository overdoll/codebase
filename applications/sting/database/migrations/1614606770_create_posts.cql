CREATE TABLE IF NOT EXISTS categories
(
    id                    text,
    slug                  text,
    title                 map<text, text>,
    thumbnail_resource_id text,
    total_likes           counter,
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
    total_likes           counter,
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
    total_likes           counter,
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
    total_likes           counter,
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
    id                        text,
    state                     text,
    moderator_account_id      text,
    contributor_account_id    text,
    club_id                   text,
    audience_id               text,
    category_ids              list<text>,
    character_ids             list<text>,
    content_resource_ids      list<text>,
    likes                     counter,
    created_at                timestamp,
    posted_at                 timestamp,
    moderator_reassignment_at timestamp,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS post_likes
(
    post_id          text,
    liked_account_id text,
    liked_at         timeuuid,
    primary key ( (post_id, liked_account_id) )
);
