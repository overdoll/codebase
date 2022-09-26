package upload

type Upload struct {
	fileId          string
	fileName        string
	isPossibleVideo bool
}

func NewUpload(fileId, fileName string, isPossibleVideo bool) (*Upload, error) {
	return &Upload{
		fileId:          fileId,
		fileName:        fileName,
		isPossibleVideo: isPossibleVideo,
	}, nil
}

func (u *Upload) FileId() string {
	return u.fileId
}

func (u *Upload) FileName() string {
	return u.fileName
}

func (u *Upload) IsPossibleVideo() bool {
	return u.isPossibleVideo
}
