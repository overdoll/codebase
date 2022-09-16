ALTER table clubs
    add (thumbnail_media text, banner_media text);

ALTER table series
    add (banner_media text);

ALTER table characters
    add (banner_media text);

ALTER table categories
    add (banner_media text);

ALTER table audience
    add (banner_media text);

ALTER table topics
    add (banner_media text);

ALTER table posts
    add (content_media map<text, text>);
