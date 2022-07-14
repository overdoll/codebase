ALTER table posts
    add (description map<text, text>);

ALTER table characters
    add (club_id text);

ALTER table characters_slugs
    rename series_id to series_or_club_id;

ALTER table characters_slugs
    add (is_club_id boolean);

ALTER table clubs
    add (characters_enabled boolean, characters_limit int);

CREATE TABLE IF NOT EXISTS club_characters
(
    club_id      text,
    character_id text,
    primary key ( club_id, character_id )
);
