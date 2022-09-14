ALTER table clubs
    add (thumbnail blob, banner_media blob);

ALTER table series
    add (banner_media blob);

ALTER table characters
    add (banner_media blob);

ALTER table categories
    add (banner_media blob);

ALTER table audience
    add (banner_media blob);

ALTER table topics
    add (banner_media blob);

ALTER table posts
    add (content_media map<text, blob>);
