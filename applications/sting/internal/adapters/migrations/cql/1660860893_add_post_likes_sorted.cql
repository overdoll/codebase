CREATE TABLE IF NOT EXISTS account_post_likes_sorted
(
    bucket           int,
    post_id          text,
    liked_account_id text,
    liked_at         timestamp,
    primary key ( (bucket, liked_account_id), liked_at, post_id )
) WITH CLUSTERING ORDER BY (liked_at desc);

