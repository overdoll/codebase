CREATE TABLE IF NOT EXISTS curated_posts_feed_posts
(
    account_id text,
    post_id    text,
    primary key ( account_id, post_id )
);


CREATE TABLE IF NOT EXISTS curated_posts_feed_data
(
    account_id             text,
    generated_at           timestamp,
    next_regeneration_time timestamp,
    viewed_at              timestamp,
    primary key ( account_id )
);
