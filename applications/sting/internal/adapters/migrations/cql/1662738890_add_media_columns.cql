ALTER table clubs
    add (thumbnail_media blob, banner_media blob);

ALTER table series
    add (thumbnail_media blob, banner_media blob);

ALTER table characters
    add (thumbnail_media blob, banner_media blob);

ALTER table categories
    add (thumbnail_media blob, banner_media blob);

ALTER table audience
    add (thumbnail_media blob, banner_media blob);

ALTER table topics
    add (banner_media blob);

ALTER table posts
    add (content_media map<text, blob>);
