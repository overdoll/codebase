CREATE TABLE categories
(
    id    text,
    title text,
    primary key (id)
);

CREATE TABLE characters
(
    id    text,
    name  text,
    media text,
    primary key (id)
);

CREATE TABLE posts
(
    id            uuid,
    user_id       uuid,
    user_username text,
    categories    list<text>,
    characters    list<text>,
    posted_at     timestamp,
    primary key ((id), posted_at)
) WITH CLUSTERING ORDER BY (posted_at ASC);

CREATE TABLE posts_pending
(
    id            uuid,
    user_id       uuid,
    user_username text,
    images        list<text>,
    categories    list<text>,
    characters    list<text>,
    posted_at     timestamp,
    primary key (id)
) WITH CLUSTERING ORDER BY (posted_at ASC);