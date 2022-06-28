ALTER table categories
    add (banner_resource text);

ALTER table characters
    add (banner_resource text);

ALTER table audience
    add (banner_resource text);

ALTER table series
    add (banner_resource text);

CREATE TABLE IF NOT EXISTS posts_occupied_resources
(
    bucket      int,
    post_id     text,
    resource_id text,
    primary key ( bucket, post_id, resource_id )
);
