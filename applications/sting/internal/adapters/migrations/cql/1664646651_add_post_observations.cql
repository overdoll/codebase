CREATE TABLE IF NOT EXISTS account_post_observations
(
    bucket              int,
    post_id             text,
    observer_account_id text,
    observed_at         timestamp,
    primary key ( (bucket, observer_account_id), post_id )
);

CREATE TABLE IF NOT EXISTS account_post_observations_buckets
(
    bucket              int,
    observer_account_id text,
    primary key ( observer_account_id, bucket )
);
