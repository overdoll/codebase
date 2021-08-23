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

CREATE TABLE IF NOT EXISTS brands
(
    id        text,
    slug      text,
    name      map<text, text>,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS brands_slugs
(
    slug     text,
    brand_id text,
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
    slug text,
    id   text,
    primary key ( slug )
);

CREATE TABLE IF NOT EXISTS posts
(
    id                        text,
    state                     text,
    moderator_account_id      text,
    contributor_account_id    text,
    brand_id                  text,
    audience_id               text,
    category_ids              list<text>,
    character_ids             list<text>,
    content                   list<text>,
    posted_at                 timestamp,
    moderator_reassignment_at timestamp,
    primary key ( id )
);