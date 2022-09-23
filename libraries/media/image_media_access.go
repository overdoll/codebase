package media

type ImageMediaAccess struct {
	url    string
	width  int
	height int
}

func (i *ImageMediaAccess) Url() string {
	return i.url
}

func (i *ImageMediaAccess) Width() int {
	return i.width
}

func (i *ImageMediaAccess) Height() int {
	return i.height
}
