CREATE TABLE IF NOT EXISTS categories
(
    id        text,
    title     text,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS characters
(
    id        text,
    name      text,
    thumbnail text,
    media_id  text,
    primary key ( id)
);

CREATE TABLE IF NOT EXISTS media
(
    id        text,
    title     text,
    thumbnail text,
    primary key ( id )
);

CREATE TABLE IF NOT EXISTS artists
(
    account_id         text,
    do_not_post_reason text,
    primary key ( account_id )
);

CREATE TABLE IF NOT EXISTS posts
(
    id                        text,
    state                     text,
    moderator_account_id      text,
    artist_account_id         text,
    contributor_account_id    text,
    content                   list<text>,
    categories                list<text>,
    characters                list<text>,
    artist_request            text,
    characters_requests       map<text, text>,
    media_requests            list<text>,
    categories_requests       list<text>,
    posted_at                 timestamp,
    moderator_reassignment_at timestamp,
    primary key (id)
);