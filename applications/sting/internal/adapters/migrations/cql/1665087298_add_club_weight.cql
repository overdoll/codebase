CREATE TABLE IF NOT EXISTS club_weights
(
    bucket  int,
    club_id text,
    weight  double,
    primary key ( (bucket), club_id )
);
