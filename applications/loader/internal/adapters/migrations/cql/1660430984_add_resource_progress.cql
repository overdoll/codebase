CREATE TABLE IF NOT EXISTS resource_progress
(
    item_id     text,
    resource_id text,
    progress    double,
    primary key ( item_id, resource_id )
);
