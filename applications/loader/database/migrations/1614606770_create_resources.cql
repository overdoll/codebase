CREATE TABLE IF NOT EXISTS resources
(
    item_id         text,
    resource_id     text,
    type            int,
    mime_types      list<text>,
    video_thumbnail text,
    processed       boolean,
    processed_id    text,
    primary key ( item_id, resource_id )
);
