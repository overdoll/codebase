CREATE TABLE IF NOT EXISTS account_post_likes_sorted
(
    bucket           int,
    post_id          text,
    liked_account_id text,
    liked_at         timestamp,
    primary key ( (bucket, liked_account_id), post_id, liked_at )
) WITH CLUSTERING ORDER BY (post_id asc, liked_at desc);

