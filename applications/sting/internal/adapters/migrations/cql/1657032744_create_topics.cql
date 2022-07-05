ALTER table categories
    add (topic_id text, alternative_titles list<text>);

CREATE TABLE IF NOT EXISTS topics
(
    id              text,
    slug            text,
    title           map<text, text>,
    description     map<text, text>,
    banner_resource text,
    weight          int,
    created_at      timestamp,
    updated_at      timestamp,
    primary key ( id )
);
