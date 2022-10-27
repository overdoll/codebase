CREATE TABLE IF NOT EXISTS post_views_counter
(
    post_id text,
    views   counter,
    primary key ( post_id )
);

CREATE TABLE IF NOT EXISTS post_views_counter_bucketed
(
    bucket  int,
    post_id text,
    views   counter,
    primary key ( (bucket, post_id) )
);
