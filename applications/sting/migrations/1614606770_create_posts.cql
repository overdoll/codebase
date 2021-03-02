CREATE TABLE categories
(
    id    uuid,
    title text,
    primary key (id)
);

CREATE TABLE characters
(
    id       uuid,
    name     text,
    media_id uuid,
    primary key (id)
);

CREATE TABLE media
(
    id    uuid,
    title text,
    primary key (id)
);

CREATE TABLE posts
(
    id             uuid,
    artist_id      uuid,
    contributor_id uuid,
    images         list<text>,
    categories     list<text>,
    characters     list<text>,
    posted_at      timestamp,
    primary key ((id), posted_at)
) WITH CLUSTERING ORDER BY (posted_at ASC);

CREATE TABLE posts_review
(
    id                   uuid,
    artist_id            uuid,
    artist_username      text,
    contributor_id       uuid,
    contributor_username text,
    images               list<text>,
    categories           list<text>,
    characters           list<text>,
    posted_at            timestamp,
    processed_at         timestamp,
    primary key ((id), processed_at)
) WITH CLUSTERING ORDER BY (processed_at ASC);

CREATE TABLE posts_pending
(
    id              uuid,
    artist_id       uuid,
    contributor_id  uuid,
    images          list<text>,
    categories      list<text>,
    characters      list<text>,
    posted_at       timestamp,
    review_required boolean,
    primary key (id)
);