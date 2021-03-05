CREATE TABLE categories
(
    id    text,
    title text,
    primary key (id)
);

CREATE TABLE characters
(
    id       text,
    name     text,
    media_id text,
    primary key (id)
);

CREATE TABLE media
(
    id    text,
    title text,
    primary key (id)
);

CREATE TABLE posts
(
    id             text,
    artist_id      text,
    contributor_id text,
    images         list<text>,
    categories     list<text>,
    characters     list<text>,
    posted_at      timestamp,
    primary key ((id), posted_at)
) WITH CLUSTERING ORDER BY (posted_at ASC);

CREATE TABLE posts_pending
(
    id                   text,
    state                text,
    artist_id            text,
    artist_username      text,
    contributor_id       text,
    contributor_username text,
    images               list<text>,
    categories           list<text>,
    characters           list<text>,
    posted_at            timestamp,
    review_required      boolean,
    published_post_id    text,
    primary key ((id), posted_at)
) WITH CLUSTERING ORDER BY (posted_at ASC);