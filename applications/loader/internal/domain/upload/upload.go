package upload

type Upload struct {
	itemId      string
	uploadIds   []string
	token       string
	isPrivate   bool
	allowImages bool
	allowVideos bool
}

func NewUpload(itemId string, uploadIds []string, token string, isPrivate, allowImages, allowVideos bool) (*Upload, error) {
	return &Upload{
		itemId:      itemId,
		uploadIds:   uploadIds,
		token:       token,
		isPrivate:   isPrivate,
		allowImages: allowImages,
		allowVideos: allowVideos,
	}, nil
}

func (u *Upload) ItemId() string {
	return u.itemId
}

func (u *Upload) UploadIds() []string {
	return u.uploadIds
}

func (u *Upload) Token() string {
	return u.token
}

func (u *Upload) IsPrivate() bool {
	return u.isPrivate
}

func (u *Upload) AllowImages() bool {
	return u.allowImages
}

func (u *Upload) AllowVideos() bool {
	return u.allowVideos
}
