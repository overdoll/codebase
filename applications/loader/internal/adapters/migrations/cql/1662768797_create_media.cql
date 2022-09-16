CREATE TABLE IF NOT EXISTS media_storage
(
    linked_id text,
    id        text,
    data      text,
    primary key ( linked_id, id )
);
