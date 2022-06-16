CREATE TABLE IF NOT EXISTS resources
(
    item_id                   text,
    resource_id               text,
    type                      int,
    resource_token            text,
    is_private                boolean,
    mime_types                list<text>,
    processed                 boolean,
    processed_id              text,
    video_duration            int,
    video_thumbnail           text,
    video_thumbnail_mime_type text,
    width                     int,
    height                    int,
    preview                   text,
    primary key ( item_id, resource_id )
);
