CREATE TABLE IF NOT EXISTS post_games
(
    slug    text,
    post_id text,
    primary key ( slug, post_id )
);
