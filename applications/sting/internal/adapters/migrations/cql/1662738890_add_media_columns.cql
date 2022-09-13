ALTER table clubs
    add (thumbnail_media text, banner_media text);

ALTER table series
    add (thumbnail_media text, banner_media text);

ALTER table characters
    add (thumbnail_media text, banner_media text);

ALTER table categories
    add (thumbnail_media text, banner_media text);

ALTER table audience
    add (thumbnail_media text, banner_media text);

ALTER table topics
    add (banner_media text);

ALTER table posts
    add (content_media map<text, text>);
