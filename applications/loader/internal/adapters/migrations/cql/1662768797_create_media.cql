CREATE TABLE IF NOT EXISTS media_storage
(
    linked_id text,
    id        text,
    data      blob,
    primary key ( linked_id, id )
);
