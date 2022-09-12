package media

import "overdoll/libraries/media/proto"

type VideoContainer struct {
	url      string
	bitrate  int
	width    int
	height   int
	mimeType proto.MediaMimeType
}

func (i *VideoContainer) Url() string {
	return i.url
}

func (i *VideoContainer) MimeType() proto.MediaMimeType {
	return i.mimeType
}

func (i *VideoContainer) Width() int {
	return i.width
}

func (i *VideoContainer) Height() int {
	return i.height
}

func (i *VideoContainer) Bitrate() int {
	return i.bitrate
}
