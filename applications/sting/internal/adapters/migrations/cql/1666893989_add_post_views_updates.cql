CREATE TABLE IF NOT EXISTS post_views_counter
(
    post_id text,
    views   counter,
    primary key ( post_id )
);

CREATE TABLE IF NOT EXISTS post_updates_queue
(
    bucket  int,
    post_id text,
    primary key ( bucket, post_id )
);

CREATE TABLE IF NOT EXISTS post_updates_queue_bucket
(
    id     int,
    bucket int,
    primary key ( id, bucket )
);
