CREATE TABLE IF NOT EXISTS categories
(
    id        text,
    slug      text,
    title     text,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS characters
(
    id        text,
    slug      text,
    name      text,
    thumbnail text,
    series_id text,
    primary key ( id)
);

CREATE TABLE IF NOT EXISTS series
(
    id        text,
    slug      text,
    name      text,
    thumbnail text,
    media_id  text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS media
(
    id        text,
    slug      text,
    title     text,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS brands
(
    id        text,
    slug      text,
    name      text,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS posts
(
    id                        text,
    state                     text,
    moderator_account_id      text,
    contributor_account_id    text,
    brand_id                  text,
    category_ids              list<text>,
    character_ids             list<text>,
    content                   list<text>,
    created_at                timestamp,
    posted_at                 timestamp,
    moderator_reassignment_at timestamp,
    primary key ( id )
);