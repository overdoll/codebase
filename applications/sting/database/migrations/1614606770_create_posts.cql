CREATE TABLE IF NOT EXISTS categories
(
    id        text,
    title     text,
    thumbnail text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS characters
(
    id        text,
    name      text,
    thumbnail text,
    media_id  text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS media
(
    id        text,
    title     text,
    thumbnail text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS artists
(
    user_id       text,
    user_username text,
    user_avatar   text,
    primary key ( user_id )
);

CREATE TABLE IF NOT EXISTS posts
(
    id                  text,
    artist_user_id      text,
    contributor_user_id text,
    content             list<text>,
    categories          list<text>,
    characters          list<text>,
    posted_at           timestamp,
    primary key (id)
) WITH CLUSTERING ORDER BY (posted_at ASC);

CREATE TABLE IF NOT EXISTS pending_posts
(
    id                   text,
    state                text,
    moderator_user_id    text,
    artist_user_id       text,
    artist_user_username text,
    contributor_user_id  text,
    content              list<text>,
    categories           list<text>,
    characters           list<text>,
    characters_requests  map<text, text>,
    media_requests       list<text>,
    categories_requests  list<text>,
    posted_at            timestamp,
    primary key (id)
);

CREATE INDEX IF NOT EXISTS pending_posts_state on pending_posts (state);